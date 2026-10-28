"""Biblioteca de efectos de sonido CAR-TEC, sintetizados con código (numpy + scipy).

Cada función devuelve un array estéreo float32 de forma (n, 2) a SR Hz, con pico ≈ 1.
Ver CARTEC_DESIGN_SYSTEM.md §11. Reutilizable entre episodios.
"""
from __future__ import annotations

import numpy as np
from scipy import signal

SR = 48000
RNG = np.random.default_rng(7)


# ---------------------------------------------------------------- utilidades
def t_axis(dur: float) -> np.ndarray:
    return np.arange(int(dur * SR)) / SR


def norm(x: np.ndarray, peak: float = 1.0) -> np.ndarray:
    m = np.max(np.abs(x)) or 1.0
    return (x / m * peak).astype(np.float32)


def stereo(mono: np.ndarray, pan: float = 0.0) -> np.ndarray:
    """pan -1 (izquierda) … 1 (derecha), ley de potencia constante."""
    a = (pan + 1) * np.pi / 4
    return np.stack([mono * np.cos(a), mono * np.sin(a)], axis=1).astype(np.float32)


def pan_sweep(mono: np.ndarray, p0: float, p1: float) -> np.ndarray:
    p = np.linspace(p0, p1, len(mono))
    a = (p + 1) * np.pi / 4
    return np.stack([mono * np.cos(a), mono * np.sin(a)], axis=1).astype(np.float32)


def lowpass(x, fc, order=4):
    return signal.sosfilt(signal.butter(order, fc, 'low', fs=SR, output='sos'), x)


def highpass(x, fc, order=4):
    return signal.sosfilt(signal.butter(order, fc, 'high', fs=SR, output='sos'), x)


def bandpass(x, f0, f1, order=2):
    return signal.sosfilt(signal.butter(order, [f0, f1], 'band', fs=SR, output='sos'), x)


def env_ad(n: int, attack: float, decay: float, curve: float = 4.0) -> np.ndarray:
    """Envolvente ataque/caída exponencial (segundos)."""
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    d = np.exp(-np.clip(t - attack, 0, None) * curve / max(decay, 1e-4))
    return a * d


def pink(n: int) -> np.ndarray:
    """Ruido rosa por filtrado del ruido blanco en frecuencia (1/sqrt(f))."""
    w = RNG.standard_normal(n)
    f = np.fft.rfft(w)
    k = np.arange(len(f))
    k[0] = 1
    return np.fft.irfft(f / np.sqrt(k), n)


def sweep_bandpass(x: np.ndarray, f_start: float, f_peak: float, f_end: float, q: float = 1.2, block: int = 512) -> np.ndarray:
    """Paso banda cuyo centro recorre f_start → f_peak → f_end (por bloques)."""
    out = np.zeros_like(x)
    n = len(x)
    zi = None
    for i in range(0, n, block):
        p = i / n
        fc = f_start + (f_peak - f_start) * (p / 0.5) if p < 0.5 else f_peak + (f_end - f_peak) * ((p - 0.5) / 0.5)
        lo, hi = fc / (1 + 1 / (2 * q)), fc * (1 + 1 / (2 * q))
        sos = signal.butter(2, [max(lo, 30), min(hi, SR / 2 - 100)], 'band', fs=SR, output='sos')
        if zi is None:
            zi = np.zeros((sos.shape[0], 2))
        out[i:i + block], zi = signal.sosfilt(sos, x[i:i + block], zi=zi)
    return out


# ---------------------------------------------------------------- motor V8
FIRING_ORDER = [1, 5, 4, 2, 6, 3, 7, 8]  # V8 de cigüeñal cruzado (orden habitual en los V8 de Mercedes)
BANK = {c: (0 if c <= 4 else 1) for c in range(1, 9)}  # 1–4 una bancada, 5–8 la otra


def _pulse_kernel(rpm_hint: float = 2000) -> np.ndarray:
    """Pulso de escape: ruido corto filtrado + modos resonantes graves."""
    n = int(0.045 * SR)
    t = np.arange(n) / SR
    k = (
        0.9 * np.sin(2 * np.pi * 85 * t) * np.exp(-t * 55)
        + 0.5 * np.sin(2 * np.pi * 170 * t + 0.6) * np.exp(-t * 70)
        + 0.25 * np.sin(2 * np.pi * 330 * t + 1.1) * np.exp(-t * 90)
    )
    burst = bandpass(RNG.standard_normal(n), 120, 1400) * np.exp(-t * 160)
    return k + 0.6 * burst


def v8(rpm: np.ndarray, load: np.ndarray | None = None, cut: np.ndarray | None = None) -> np.ndarray:
    """Motor V8 a partir de una curva de rpm por muestra.

    load (0–1) escala la fuerza de cada combustión; cut (bool) suprime
    combustiones (corte de encendido del limitador).
    """
    n = len(rpm)
    load = np.ones(n) if load is None else load
    theta = np.cumsum(rpm / 60 * 360 / SR)  # ángulo de cigüeñal en grados
    trains = np.zeros((2, n))
    idx = np.nonzero(np.diff(np.floor(theta / 90)) > 0)[0] + 1  # una combustión cada 90°
    for i in idx:
        k = int(np.floor(theta[i] / 90)) % 8
        cyl = FIRING_ORDER[k]
        if cut is not None and cut[i]:
            continue
        trains[BANK[cyl], i] += load[i] * (0.85 + 0.3 * RNG.random())
    kernel = _pulse_kernel()
    banks = [signal.fftconvolve(tr, kernel)[:n] for tr in trains]
    mono_l, mono_r = banks
    # El escape filtra más los agudos a bajas vueltas; se abre al subir de rpm.
    out = []
    for b in (mono_l, mono_r):
        dark = lowpass(b, 900)
        bright = lowpass(b, 4200)
        mixw = np.clip((rpm - 1200) / 5000, 0, 1)
        y = dark * (1 - mixw) + bright * mixw
        y = np.tanh(2.2 * y / (np.max(np.abs(y)) + 1e-9))  # saturación suave
        out.append(y)
    # Componente de admisión: ruido filtrado que sigue a las rpm.
    intake = bandpass(RNG.standard_normal(n), 300, 2500) * (rpm / 7000) ** 2 * 0.25
    res = np.stack([out[0] + intake, out[1] + intake], axis=1)
    return norm(res, 1.0)


def rpm_curve(points: list[tuple[float, float]], dur: float) -> np.ndarray:
    """Curva de rpm por tramos (segundos, rpm) suavizada."""
    t = t_axis(dur)
    xs, ys = zip(*points)
    r = np.interp(t, xs, ys)
    return signal.savgol_filter(r, 2001, 2) if len(r) > 2001 else r


def engine_start(dur: float = 2.4) -> np.ndarray:
    """Motor de arranque, el V8 coge y se asienta al ralentí."""
    t = t_axis(dur)
    n = len(t)
    crank = int(0.42 * SR)
    # Motor de arranque: zumbido con pulsos de compresión.
    st = t[:crank]
    whine = (np.sin(2 * np.pi * 190 * st) + 0.4 * np.sin(2 * np.pi * 380 * st)) * (0.6 + 0.4 * np.sin(2 * np.pi * 9 * st))
    starter = np.zeros(n)
    starter[:crank] = whine * np.minimum(1, st / 0.03) * 0.35
    rpm = rpm_curve([(0, 220), (0.4, 260), (0.5, 1700), (0.9, 1300), (1.4, 850), (dur, 800)], dur)
    load = np.interp(t, [0, 0.4, 0.5, 0.9, dur], [0.15, 0.2, 1.0, 0.7, 0.55])
    eng = v8(rpm, load)
    eng[:crank] *= 0.15
    eng = eng * np.minimum(1, (dur - t) / 0.6)[:, None]
    return norm(eng + stereo(starter), 1.0)


def rev(dur: float, r0: float, r1: float, hold: float = 0.0, fall: float | None = None) -> np.ndarray:
    """Acelerón de r0 a r1 rpm (y opcionalmente caída final)."""
    pts = [(0, r0), (dur - hold - (0.25 if fall else 0), r1)]
    if hold:
        pts.append((dur - (0.25 if fall else 0), r1))
    if fall:
        pts.append((dur, fall))
    rpm = rpm_curve(pts, dur)
    load = np.clip(0.5 + (rpm - r0) / max(r1 - r0, 1), 0.4, 1.0)
    y = v8(rpm, load)
    t = t_axis(dur)
    return y * (np.minimum(1, t / 0.08) * np.minimum(1, (dur - t) / 0.12))[:, None]


def limiter(dur: float = 0.8, rpm_at: float = 6600, rate: float = 13.0) -> np.ndarray:
    """Corte de encendido rítmico del limitador, con petardeo."""
    t = t_axis(dur)
    rpm = rpm_at + 220 * np.sin(2 * np.pi * rate * t)
    cut = (np.sin(2 * np.pi * rate * t) > 0.15)
    y = v8(rpm, np.ones(len(t)), cut)
    pops = np.zeros(len(t))
    for k in range(int(dur * rate)):
        i = int((k / rate + 0.02) * SR)
        if i < len(t):
            m = min(len(t) - i, int(0.03 * SR))
            pops[i:i + m] += highpass(RNG.standard_normal(m), 600) * np.exp(-np.arange(m) / SR * 120) * 0.5
    out = y + stereo(pops)
    return out * np.minimum(1, (dur - t) / 0.15)[:, None]


def turbo(dur: float = 1.0) -> np.ndarray:
    """Silbido de turbo subiendo de vueltas."""
    t = t_axis(dur)
    f = 2500 + 6500 * (t / dur) ** 1.6
    ph = 2 * np.pi * np.cumsum(f) / SR
    tone = np.sin(ph) * 0.35 + 0.15 * np.sin(2 * ph)
    hiss = bandpass(RNG.standard_normal(len(t)), 2000, 9000) * 0.25
    e = np.minimum(1, t / 0.2) * np.minimum(1, (dur - t) / 0.1)
    return stereo(norm((tone + hiss) * e))


# ---------------------------------------------------------------- interfaz
def whoosh(dur: float = 0.42, direction: int = -1) -> np.ndarray:
    """Barrido de transición: ruido rosa con paso banda en barrido y paneo."""
    n = int(dur * SR)
    x = sweep_bandpass(pink(n), 250, 2600, 500, q=0.9)
    t = np.arange(n) / SR
    e = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.6
    return pan_sweep(norm(x * e), 0.7 * -direction, 0.7 * direction)


def click(level: float = 1.0) -> np.ndarray:
    """Clic de relé: transitorio, resonancia metálica y golpe grave."""
    n = int(0.09 * SR)
    t = np.arange(n) / SR
    tr = highpass(RNG.standard_normal(n), 2000) * np.exp(-t * 900)
    ring = np.sin(2 * np.pi * 2900 * t) * np.exp(-t * 110) * 0.35
    thunk = np.sin(2 * np.pi * 130 * t) * np.exp(-t * 60) * 0.5
    return stereo(norm(tr + ring + thunk, level))


def tick(level: float = 0.6) -> np.ndarray:
    n = int(0.03 * SR)
    t = np.arange(n) / SR
    return stereo(norm(highpass(RNG.standard_normal(n), 4000) * np.exp(-t * 1500) + 0.3 * np.sin(2 * np.pi * 4200 * t) * np.exp(-t * 300), level))


def blips(count: int = 8, spacing: float = 0.055, seed: int = 3) -> np.ndarray:
    """Pitidos de datos: senos cortos de una escala pentatónica."""
    rng = np.random.default_rng(seed)
    notes = [1760, 1976, 2349, 2637, 3136]
    dur = count * spacing + 0.08
    out = np.zeros(int(dur * SR))
    for k in range(count):
        f = notes[rng.integers(len(notes))]
        n = int(0.028 * SR)
        t = np.arange(n) / SR
        b = np.sin(2 * np.pi * f * t) * np.minimum(1, t / 0.002) * np.exp(-t * 60)
        i = int(k * spacing * SR)
        out[i:i + n] += b
    return stereo(norm(out))


def impact(size: float = 1.0) -> np.ndarray:
    """Impacto grave: seno con caída de tono, transitorio y cola."""
    dur = 1.2 * size
    t = t_axis(dur)
    f = 58 * np.exp(-t * 2.2) + 32
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t * 3.2 / size)
    hit = lowpass(RNG.standard_normal(len(t)), 2500) * np.exp(-t * 45) * 0.5
    y = np.tanh(1.6 * (body + hit))
    return stereo(norm(y))


def lock_clunk() -> np.ndarray:
    """Candado que se cierra: golpe metálico con resonancias."""
    dur = 0.6
    t = t_axis(dur)
    thump = np.sin(2 * np.pi * 95 * t) * np.exp(-t * 28)
    metal = sum(a * np.sin(2 * np.pi * f * t + p) * np.exp(-t * d) for a, f, p, d in [(0.5, 1230, 0.2, 14), (0.35, 2610, 1.0, 18), (0.25, 3920, 2.1, 24), (0.15, 5300, 0.7, 30)])
    tr = highpass(RNG.standard_normal(len(t)), 1500) * np.exp(-t * 400)
    return stereo(norm(thump + 0.6 * metal + 0.8 * tr))


def unlock() -> np.ndarray:
    """Desbloqueo: dos clics y el muelle del arco liberándose."""
    dur = 0.7
    t = t_axis(dur)
    out = np.zeros(len(t))
    for at in (0.0, 0.07):
        c = click()[:, 0]
        i = int(at * SR)
        out[i:i + len(c)] += c[: len(out) - i]
    f = 950 - 350 * np.clip(t / 0.4, 0, 1)
    spring = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7) * 0.4
    return stereo(norm(out + spring))


def needle(dur: float = 0.8) -> np.ndarray:
    """Servo de aguja que sube durante `dur` segundos y se clava en el tope (golpe al final)."""
    t = t_axis(dur)
    f = 240 + 700 * (t / dur) ** 2
    ph = 2 * np.pi * np.cumsum(f) / SR
    servo = lowpass((np.sin(ph) + 0.3 * signal.sawtooth(ph)) * 0.25 * np.minimum(1, t / 0.05), 2500)
    return stereo(norm(np.concatenate([servo, lock_clunk()[:, 0] * 0.6])))


def hum(dur: float) -> np.ndarray:
    """Zumbido eléctrico de fondo (50 Hz y armónicos) con leve modulación."""
    t = t_axis(dur)
    y = sum(a * np.sin(2 * np.pi * f * t) for a, f in [(1, 50), (0.5, 100), (0.35, 150), (0.2, 250), (0.08, 1000)])
    y *= 0.8 + 0.2 * np.sin(2 * np.pi * 0.7 * t)
    y += bandpass(RNG.standard_normal(len(t)), 2000, 6000) * 0.04
    e = np.minimum(1, t / 0.4) * np.minimum(1, (dur - t) / 0.4)
    return stereo(norm(y * e))


def rise(dur: float = 0.9) -> np.ndarray:
    """Barrido ascendente (el límite que sube)."""
    t = t_axis(dur)
    f = 180 * 2 ** (2.2 * t / dur)
    ph = 2 * np.pi * np.cumsum(f) / SR
    y = lowpass(signal.sawtooth(ph) * 0.5 + np.sin(ph), 1800) + 0.3 * sweep_bandpass(pink(len(t)), 300, 1500, 3000, q=1.5)
    e = np.minimum(1, t / 0.1) * np.minimum(1, (dur - t) / 0.08)
    return stereo(norm(y * e))


def scan(dur: float = 1.15) -> np.ndarray:
    """Barrido de diagnóstico de atrás adelante."""
    n = int(dur * SR)
    x = sweep_bandpass(pink(n), 800, 3500, 6000, q=3)
    t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * 3200 * t) * 0.15 * (0.5 + 0.5 * np.sin(2 * np.pi * 24 * t))
    e = np.minimum(1, t / 0.08) * np.minimum(1, (dur - t) / 0.12)
    return pan_sweep(norm((x + tone) * e), -0.8, 0.8)


def ok() -> np.ndarray:
    """Confirmación: dos tonos cortos ascendentes."""
    out = []
    for f in (1318.5, 1760):
        n = int(0.07 * SR)
        t = np.arange(n) / SR
        out.append(np.sin(2 * np.pi * f * t) * np.minimum(1, t / 0.003) * np.exp(-t * 30))
    return stereo(norm(np.concatenate(out)))


def servo_slide(dur: float = 0.8) -> np.ndarray:
    """Movimiento mecánico suave (despiece de la centralita)."""
    n = int(dur * SR)
    x = sweep_bandpass(pink(n), 200, 900, 300, q=2)
    t = np.arange(n) / SR
    e = np.sin(np.pi * np.clip(t / dur, 0, 1))
    return stereo(norm(x * e))


def i4(rpm: np.ndarray, load: np.ndarray | None = None) -> np.ndarray:
    """4 cilindros en línea (EA888): una combustión cada 180°, regular y más aguda que el V8."""
    n = len(rpm)
    load = np.ones(n) if load is None else load
    theta = np.cumsum(rpm / 60 * 360 / SR)
    train = np.zeros(n)
    idx = np.nonzero(np.diff(np.floor(theta / 180)) > 0)[0] + 1
    train[idx] = load[idx] * (0.9 + 0.2 * RNG.random(len(idx)))
    nk = int(0.035 * SR)
    t = np.arange(nk) / SR
    kernel = (np.sin(2 * np.pi * 120 * t) * np.exp(-t * 70) + 0.6 * np.sin(2 * np.pi * 260 * t + 0.4) * np.exp(-t * 95)
              + 0.5 * bandpass(RNG.standard_normal(nk), 200, 2200) * np.exp(-t * 180))
    y = signal.fftconvolve(train, kernel)[:n]
    mixw = np.clip((rpm - 1200) / 5000, 0, 1)
    y = lowpass(y, 1100) * (1 - mixw) + lowpass(y, 5000) * mixw
    y = np.tanh(2.0 * y / (np.max(np.abs(y)) + 1e-9))
    whistle = np.sin(2 * np.pi * np.cumsum(2500 + rpm * 0.9) / SR) * (rpm / 7000) ** 2 * 0.06  # silbido del turbo
    intake = bandpass(RNG.standard_normal(n), 400, 3000) * (rpm / 7000) ** 2 * 0.22
    m = y + intake + whistle
    return norm(np.stack([m, m], axis=1), 1.0)


def rev4(dur: float, r0: float, r1: float, hold: float = 0.0, fall: float | None = None) -> np.ndarray:
    """Acelerón del 4 cilindros de r0 a r1 rpm (y caída opcional)."""
    pts = [(0, r0), (dur - hold - (0.25 if fall else 0), r1)]
    if hold:
        pts.append((dur - (0.25 if fall else 0), r1))
    if fall:
        pts.append((dur, fall))
    rpm = rpm_curve(pts, dur)
    y = i4(rpm, np.clip(0.5 + (rpm - r0) / max(r1 - r0, 1), 0.4, 1.0))
    t = t_axis(dur)
    return y * (np.minimum(1, t / 0.08) * np.minimum(1, (dur - t) / 0.12))[:, None]


def start4(dur: float = 2.0) -> np.ndarray:
    """Arranque del 4 cilindros: motor de arranque, pico de vueltas y ralentí."""
    rpm = rpm_curve([(0, 250), (0.35, 300), (0.6, 1900), (1.0, 1100), (dur, 850)], dur)
    y = i4(rpm, np.clip(rpm / 1900, 0.35, 1.0))
    t = t_axis(dur)
    starter = bandpass(RNG.standard_normal(len(t)), 300, 1500) * (t < 0.45) * 0.3
    return norm(y + np.stack([starter, starter], 1) * 0.5, 0.9) * np.minimum(1, (dur - t) / 0.3)[:, None]
