// BF-01 — Black Friday. Vídeo grabado por el cliente (C63 S en la nave) con gráficos
// superpuestos en el estilo de la serie. Sin firma ni logo de CAR-TEC (lo pidió el
// cliente) y sin subtítulos propios: el vídeo ya los trae quemados abajo (y ≈ 1810),
// así que todo lo nuestro queda por encima de y = 1480.
import React from 'react';
import { Audio, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FadeUp, TitleReveal } from '../../components/Anim';
import { T as Txt, typeCss } from '../../components/Type';
import { COLOR, SAFE, STROKE } from '../../system/tokens';
import { ease, mix, prog, shake } from '../../system/motion';
import ENV from './envelope.json';

export const BF01_DURATION = 20.1;

// Instantes (s) del SRT del cliente.
const W = {
  modificar: 0.63,
  teInteresa: 1.5,
  blackFriday: 2.1,
  corte: 3.63,
  c63: 4.13,
  comoEste: 5.4,
  stage: 6.23,
  stage3: 6.67,
  tuMomento: 7.43,
  traerlo: 7.83,
  enseñar: 8.8,
  suena: 9.3,
  interior: 9.93,
  arranque: 14.1,
  comenta: 17.33,
  black: 17.6,
  contacto: 19.27,
};

/** Visible solo entre a y b, con fundido de salida corto. */
const on = (T: number, a: number, b: number) => (T >= a && T < b ? 1 - prog(T, b - 0.15, 0.15, ease.salida) : 0);

/** Escuadras de registro en las esquinas, como en la serie. */
const Marks: React.FC = () => {
  const m = 40;
  const l = 28;
  const d = `M${m} ${m + l}V${m}H${m + l}M${1080 - m - l} ${m}H${1080 - m}V${m + l}M${m} ${1920 - m - l}V${1920 - m}H${m + l}M${1080 - m - l} ${1920 - m}H${1080 - m}V${1920 - m - l}`;
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
      <path d={d} fill="none" stroke={COLOR.blanco} strokeWidth={2} opacity={0.6} />
    </svg>
  );
};

/** Viñeta negra arriba y abajo para que el texto se lea sobre el vídeo. */
const Vignette: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to bottom, rgba(12,12,12,0.45) 0%, rgba(12,12,12,0) 22%, rgba(12,12,12,0) 52%, rgba(12,12,12,0.7) 82%, rgba(12,12,12,0.55) 100%)',
    }}
  />
);

const Label: React.FC<{ i?: string; children: React.ReactNode; color?: string }> = ({ i, children, color = COLOR.blanco }) => (
  <Txt s="etiqueta" color={color}>
    {i ? <span style={{ color: COLOR.rojo }}>{i}&nbsp;&nbsp;</span> : null}
    {children}
  </Txt>
);

/** 0–3,6 s — Gancho: «¿Modificar tu coche?» y BLACK FRIDAY con sello. */
const Hook: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, 0, W.corte);
  if (!o) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o, transform: `translateX(${shake(T, W.blackFriday + 0.12, 10)}px)` }}>
      <FadeUp T={T} start={W.modificar - 0.2} style={{ left: SAFE.left, top: 1110 }}>
        <Label i="?">Modificar tu coche</Label>
      </FadeUp>
      {T >= W.teInteresa ? <TitleReveal T={T} start={W.teInteresa} lines={['Black', 'Friday']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" size={132} style={{ left: SAFE.left, top: 1170 }} /> : null}
    </div>
  );
};

/** 4,1–6,2 s — Llamada técnica al C63 S. */
const Callout: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, W.c63, W.stage);
  if (!o) return null;
  const p = prog(T, W.c63, 0.5);
  const pt: [number, number] = [470, 1222];
  const elbow: [number, number] = [400, 1424];
  const end: [number, number] = [SAFE.left, 1424];
  const d = `M${pt[0]} ${pt[1]}L${elbow[0]} ${elbow[1]}H${end[0]}`;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={pt[0]} cy={pt[1]} r={7} fill={COLOR.negro} stroke={COLOR.rojo} strokeWidth={2.5} opacity={p > 0 ? 1 : 0} />
        <circle cx={pt[0]} cy={pt[1]} r={7 + 18 * prog(T, W.c63, 0.6, ease.entrada)} fill="none" stroke={COLOR.rojo} strokeWidth={1.5} opacity={1 - prog(T, W.c63, 0.6)} />
        <path d={d} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.arista} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      </svg>
      <FadeUp T={T} start={W.c63 + 0.3} style={{ left: SAFE.left, top: 1440 }}>
        <Label i="01">Mercedes-AMG C63 S</Label>
      </FadeUp>
      <FadeUp T={T} start={W.comoEste} style={{ left: SAFE.left, top: 1478 }}>
        <Txt s="micro" color={COLOR.gris}>
          V8 biturbo · 4.0
        </Txt>
      </FadeUp>
    </div>
  );
};

/** 6,2–8,5 s — Escalera de stages: el 3 se enciende; después, TU MOMENTO. */
const Stages: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, W.stage, W.enseñar);
  if (!o) return null;
  const rows = ['Stage 1', 'Stage 2', 'Stage 3'];
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      {rows.map((r, i) => {
        const hot = i === 2 && T >= W.stage3;
        const p = prog(T, W.stage + i * 0.12, 0.3, ease.entrada);
        return (
          <div key={r} style={{ position: 'absolute', left: SAFE.left, top: 720 + i * 56, opacity: p * (hot || T < W.stage3 ? 1 : 0.45), transform: `translateX(${(1 - p) * -30}px)`, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: hot ? 48 * prog(T, W.stage3, 0.25, ease.entrada) : 0, height: 4, background: COLOR.rojo }} />
            <span style={{ ...typeCss('dato'), color: hot ? COLOR.rojo : COLOR.blanco }}>{r}</span>
          </div>
        );
      })}
      {T >= W.tuMomento ? <TitleReveal T={T} start={W.tuMomento} lines={['Tu momento']} rule={false} size={92} style={{ left: SAFE.left, top: 900 }} /> : null}
    </div>
  );
};

/** 8,8–9,9 s — «Te voy a enseñar cómo suena». */
const Listen: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, W.enseñar, W.interior);
  if (!o) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <FadeUp T={T} start={W.enseñar} style={{ left: SAFE.left, top: 1330, display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width={44} height={32}>
          {[0, 1, 2, 3, 4].map((i) => {
            const h = 8 + 22 * Math.abs(Math.sin(T * 9 + i * 1.3));
            return <rect key={i} x={i * 9} y={16 - h / 2} width={4} height={h} fill={i === 2 ? COLOR.rojo : COLOR.blanco} />;
          })}
        </svg>
        <Label>Escucha</Label>
      </FadeUp>
    </div>
  );
};

/** 12,5–16,4 s — El arranque: onda de línea que sigue al sonido real del V8. */
const Engine: React.FC<{ T: number; frame: number }> = ({ T, frame }) => {
  const o = on(T, 12.4, 16.37);
  if (!o) return null;
  const env = ENV as number[][];
  const span = 36; // fotogramas visibles en la onda (1,2 s)
  const pts: string[] = [];
  const x0 = SAFE.left;
  const x1 = 1008;
  const n = span * 16;
  for (let k = 0; k <= n; k++) {
    const f = frame - span + Math.floor(k / 16);
    const a = f >= 0 && f < env.length ? env[f][k % 16] : 0;
    const x = x0 + ((x1 - x0) * k) / n;
    const y = 1290 - Math.sin(k * 1.9) * a * 120;
    pts.push(`${k ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  const fired = T >= W.arranque;
  const peak = env[Math.min(frame, env.length - 1)].reduce((a, b) => Math.max(a, b), 0);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <path d={`M${x0} 1290H${x1}`} stroke={COLOR.blanco} strokeWidth={1} opacity={0.25} strokeDasharray="22 6 3 6" />
        <path d={pts.join('')} fill="none" stroke={fired ? COLOR.blanco : COLOR.gris} strokeWidth={2} strokeLinejoin="round" />
        <circle cx={x1} cy={1290} r={5 + peak * 10} fill={fired ? COLOR.rojo : COLOR.grisOscuro} />
      </svg>
      <FadeUp T={T} start={12.6} style={{ left: SAFE.left, top: 1150 }}>
        <Label i="02">{fired ? 'Arranque' : 'Escucha'}</Label>
      </FadeUp>
      <FadeUp T={T} start={W.arranque} style={{ left: SAFE.left, top: 1420 }}>
        <Txt s="micro" color={COLOR.gris}>
          V8 biturbo · sonido real
        </Txt>
      </FadeUp>
    </div>
  );
};

/** 17,3–20,1 s — Llamada: COMENTA «BLACK». */
const Cta: React.FC<{ T: number }> = ({ T }) => {
  if (T < W.comenta) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, transform: `translateX(${shake(T, W.black + 0.1, 9)}px)` }}>
      <TitleReveal T={T} start={W.comenta} lines={['Comenta', '«Black»']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" size={128} style={{ left: SAFE.left, top: 1130 }} />
      <FadeUp T={T} start={W.contacto - 0.4} style={{ left: SAFE.left, top: 1420 }}>
        <Label i="→">Y te contactamos</Label>
      </FadeUp>
    </div>
  );
};

export const Bf01Video: React.FC<{ audio: string }> = ({ audio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const T = frame / fps;
  const settle = mix(1.04, 1, prog(T, 0, 0.8, ease.camara));
  return (
    <div style={{ position: 'absolute', inset: 0, background: COLOR.negro, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${settle})` }}>
        <OffthreadVideo src={staticFile('episodes/bf-01/base.mp4')} muted style={{ width: 1080, height: 1920 }} />
      </div>
      <Vignette />
      <Marks />
      <Hook T={T} />
      <Callout T={T} />
      <Stages T={T} />
      <Listen T={T} />
      <Engine T={T} frame={frame} />
      <Cta T={T} />
      <Audio src={staticFile(audio)} />
    </div>
  );
};
