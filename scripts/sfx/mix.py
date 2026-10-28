"""Mezcla de un episodio: voz + efectos sintetizados, con ducking y normalización.

Uso:
  python3 scripts/sfx/mix.py public/episodes/01-cpc/voz.mp3 src/episodes/ep01-cpc/sonido.json public/episodes/01-cpc/mezcla.wav 38

- Los efectos se describen en un JSON: [{"t": s, "fx": nombre, "db": ganancia, "args": {...}}].
- Los efectos bajan ~5 dB mientras suena la voz (ducking por envolvente).
- Máster normalizado a -14 LUFS integrados y -1 dBTP con ffmpeg loudnorm (dos pasadas).
Requiere numpy, scipy y ffmpeg.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import tempfile

import numpy as np
from scipy import signal
from scipy.io import wavfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import synth  # noqa: E402

SR = synth.SR
BUS_GAIN = 10 ** (4 / 20)  # el bus de efectos va 4 dB por encima de las ganancias del JSON


def load_audio(path: str) -> np.ndarray:
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).copy()


def duck_gain(vo: np.ndarray, depth_db: float = 5.0) -> np.ndarray:
    """Ganancia del bus de efectos: baja depth_db cuando hay voz (ataque 20 ms, relajación 250 ms)."""
    env = np.abs(vo).mean(axis=1)
    env = signal.sosfilt(signal.butter(2, 12, 'low', fs=SR, output='sos'), env)
    active = np.clip(env / (np.percentile(env, 90) * 0.35 + 1e-9), 0, 1)
    # Seguidor de envolvente asimétrico.
    a_att = np.exp(-1 / (0.02 * SR))
    a_rel = np.exp(-1 / (0.25 * SR))
    out = np.empty_like(active)
    g = 0.0
    for i, x in enumerate(active):
        a = a_att if x > g else a_rel
        g = a * g + (1 - a) * x
        out[i] = g
    return 10 ** (-depth_db * out / 20)


def loudnorm(inp: str, out: str, target: float = -14.0, tp: float = -1.0) -> dict:
    first = subprocess.run(
        ['ffmpeg', '-hide_banner', '-i', inp, '-af', f'loudnorm=I={target}:TP={tp}:LRA=11:print_format=json', '-f', 'null', '-'],
        capture_output=True, text=True, check=True,
    ).stderr
    m = json.loads(first[first.rindex('{'):first.rindex('}') + 1])
    af = (
        f"loudnorm=I={target}:TP={tp}:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
        f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true"
    )
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', inp, '-af', af, '-ar', str(SR), '-c:a', 'pcm_s16le', out], check=True)
    return m


def main() -> None:
    voice_path, cues_path, out_path, dur = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4])
    n = int(dur * SR)
    vo = np.zeros((n, 2), np.float32)
    v = load_audio(voice_path)
    vo[: min(n, len(v))] = v[:n]

    bus = np.zeros((n, 2), np.float32)
    cues = json.load(open(cues_path))
    for c in cues:
        fx = getattr(synth, c['fx'])(**c.get('args', {}))
        i = int(c['t'] * SR)
        m = min(len(fx), n - i)
        if m > 0:
            bus[i:i + m] += fx[:m] * 10 ** (c.get('db', -12) / 20)
    bus *= BUS_GAIN * duck_gain(vo, depth_db=4.0)[:, None]
    if os.environ.get('STEMS'):
        # Pistas sueltas para revisar niveles: STEMS=carpeta python3 scripts/sfx/mix.py …
        os.makedirs(os.environ['STEMS'], exist_ok=True)
        wavfile.write(os.path.join(os.environ['STEMS'], 'efectos.wav'), SR, bus)
        wavfile.write(os.path.join(os.environ['STEMS'], 'voz.wav'), SR, vo)
    mix = vo + bus
    # Limitador blando antes de normalizar, para que loudnorm no tenga picos aislados.
    mix = np.tanh(mix * 1.2) / 1.2

    with tempfile.TemporaryDirectory() as d:
        tmp = os.path.join(d, 'pre.wav')
        wavfile.write(tmp, SR, mix.astype(np.float32))
        m = loudnorm(tmp, out_path)
    print(f"{len(cues)} efectos · entrada {m['input_i']} LUFS → -14 LUFS · {out_path}")


if __name__ == '__main__':
    main()
