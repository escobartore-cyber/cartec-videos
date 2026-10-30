// BF-02 — Black Friday · Golf R. Capa de gráficos con transparencia para montar en
// Premiere encima del vídeo del cliente (IMG_5444, 46,4 s). Sin logos de CAR-TEC.
// Entre 8,46 y 21,2 s el vídeo original está en negro: ahí la capa pone fondo, retícula
// y una ventana 16:9 vacía (WINDOW) para meter debajo los clips horizontales.
// Todo lo nuestro queda por encima de y = 1480 para dejar sitio a los subtítulos.
import React from 'react';
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FadeUp, TitleReveal } from '../../components/Anim';
import { T as Txt, typeCss } from '../../components/Type';
import { ALPHA, COLOR, SAFE, STROKE } from '../../system/tokens';
import { ease, mix, prog, shake } from '../../system/motion';
import ENV from './envelope.json';

export const GOLFR_DURATION = 46.41;

/** Hueco para los clips horizontales (px a 1080 × 1920; ×2 en 4K). */
export const WINDOW = { x: 72, y: 560, w: 936, h: 527 };
export const BLACK = { from: 8.46, to: 21.2 };

// Instantes (s) del SRT del cliente.
const W = {
  r: 0.57,
  quinientos: 1.4,
  teExplico: 2.32,
  deFabrica: 4.24,
  trescientos: 5.0,
  carTec: 6.12,
  alcanzar: 7.27,
  quinientos40: 7.64,
  hemosBuscado: 15.17,
  conduccion: 16.77,
  sonido: 17.92,
  peroCada: 18.49,
  adaptar: 19.24,
  enseñar: 21.32,
  rev: 23.9,
  revFin: 28.35,
  voy: 28.4,
  marcha: 32.0,
  marchaFin: 40.6,
  siEstabas: 40.69,
  bestia: 42.64,
  ahora: 43.19,
  comenta: 43.91,
  black: 44.2,
  contacto: 45.0,
};

/** Piezas en el orden en que las dice. Marcas tal y como suenan: confirmar grafía. */
const MODS = [
  { t: 9.04, name: 'Admisión', brand: 'Racingline' },
  { t: 9.99, name: 'Downpipe', brand: 'Drakonic' },
  { t: 11.04, name: 'Turbo', brand: 'LM540' },
  { t: 12.68, name: 'Intercooler', brand: 'Frontal' },
  { t: 13.51, name: 'Electrónica', brand: 'A medida' },
];

const on = (T: number, a: number, b: number) => (T >= a && T < b ? prog(T, a, 0.12) * (1 - prog(T, b - 0.15, 0.15, ease.salida)) : 0);

const Label: React.FC<{ i?: string; children: React.ReactNode; color?: string }> = ({ i, children, color = COLOR.blanco }) => (
  <Txt s="etiqueta" color={color}>
    {i ? <span style={{ color: COLOR.rojo }}>{i}&nbsp;&nbsp;</span> : null}
    {children}
  </Txt>
);

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

/** Viñeta suave arriba y abajo para leer el texto sobre el vídeo (fuera del tramo negro). */
const Vignette: React.FC<{ T: number }> = ({ T }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity: 1 - on(T, BLACK.from, BLACK.to),
      background: 'linear-gradient(to bottom, rgba(12,12,12,0.4) 0%, rgba(12,12,12,0) 20%, rgba(12,12,12,0) 46%, rgba(12,12,12,0.78) 70%, rgba(12,12,12,0.5) 100%)',
    }}
  />
);

/** 0–4,2 s — «+500 CV». */
const Hook: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, 0, W.deFabrica - 0.02);
  if (!o) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o, transform: `translateX(${shake(T, W.quinientos + 0.14, 10)}px)` }}>
      <FadeUp T={T} start={W.r - 0.15} style={{ left: SAFE.left, top: 1080 }}>
        <Label i="01">Volkswagen Golf R</Label>
      </FadeUp>
      {T >= W.quinientos ? <TitleReveal T={T} start={W.quinientos} lines={['+500', 'CV']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" size={150} style={{ left: SAFE.left, top: 1140 }} /> : null}
      <FadeUp T={T} start={W.teExplico} style={{ left: SAFE.left, top: 1440 }}>
        <Txt s="micro" color={COLOR.gris}>
          Ficha de preparación →
        </Txt>
      </FadeUp>
    </div>
  );
};

/** 4,2–8,4 s — De serie frente a objetivo. */
const Power: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, W.deFabrica, BLACK.from);
  if (!o) return null;
  const maxW = 936;
  const rows = [
    { t: W.deFabrica, label: 'De serie', v: 320, color: COLOR.gris, from: 0 },
    { t: W.quinientos40, label: 'Objetivo CAR-TEC', v: 540, color: COLOR.rojo, from: 320 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o, transform: `translateX(${shake(T, W.quinientos40 + 0.3, 8)}px)` }}>
      {rows.map((r, i) => {
        const p = prog(T, r.t, 0.7, ease.camara);
        if (T < r.t) return null;
        const v = Math.round(mix(r.from, r.v, p));
        const top = 1110 + i * 170;
        return (
          <div key={r.label}>
            <FadeUp T={T} start={r.t} style={{ left: SAFE.left, top }}>
              <Label i={`0${i + 1}`} color={i ? COLOR.blanco : COLOR.gris}>
                {r.label}
              </Label>
            </FadeUp>
            <div style={{ position: 'absolute', left: SAFE.left, top: top + 44, width: (maxW * mix(r.from, r.v, p)) / 540, height: i ? 10 : 6, background: r.color }} />
            <div style={{ position: 'absolute', left: SAFE.left, top: top + 70, ...typeCss('titulo'), fontSize: 72, color: i ? COLOR.blanco : COLOR.gris, fontVariantNumeric: 'tabular-nums' }}>
              {v} <span style={{ fontSize: 40 }}>CV</span>
            </div>
          </div>
        );
      })}
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <path d={`M${SAFE.left + 936} 1140V1470`} stroke={COLOR.blanco} strokeWidth={1} opacity={0.35} strokeDasharray="22 6 3 6" />
      </svg>
    </div>
  );
};

/** Fondo con retícula y la ventana recortada (evenodd). */
const Board: React.FC<{ T: number }> = ({ T }) => {
  const { x, y, w, h } = WINDOW;
  const grid: string[] = [];
  for (let gx = 0; gx <= 1080; gx += 40) grid.push(`M${gx} 0V1920`);
  for (let gy = 0; gy <= 1920; gy += 40) grid.push(`M0 ${gy}H1080`);
  const major: string[] = [];
  for (let gx = 0; gx <= 1080; gx += 120) major.push(`M${gx} 0V1920`);
  for (let gy = 0; gy <= 1920; gy += 120) major.push(`M0 ${gy}H1080`);
  const p = prog(T, BLACK.from, 0.5, ease.trazo);
  const l = 36;
  const c = `M${x - 14} ${y - 14 + l}V${y - 14}H${x - 14 + l}M${x + w + 14 - l} ${y - 14}H${x + w + 14}V${y - 14 + l}M${x - 14} ${y + h + 14 - l}V${y + h + 14}H${x - 14 + l}M${x + w + 14 - l} ${y + h + 14}H${x + w + 14}V${y + h + 14 - l}`;
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <clipPath id="outside">
          <path clipRule="evenodd" d={`M0 0H1080V1920H0Z M${x} ${y}V${y + h}H${x + w}V${y}Z`} />
        </clipPath>
      </defs>
      <g clipPath="url(#outside)">
        <rect width={1080} height={1920} fill={COLOR.negro} />
        <path d={grid.join('')} stroke={COLOR.blanco} strokeWidth={1} opacity={ALPHA.reticulaMenor} />
        <path d={major.join('')} stroke={COLOR.blanco} strokeWidth={1} opacity={ALPHA.reticulaMayor} />
      </g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.arista} opacity={0.7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      <path d={c} fill="none" stroke={COLOR.rojo} strokeWidth={3} opacity={prog(T, BLACK.from + 0.2, 0.3)} />
    </svg>
  );
};

/** 8,5–21,2 s — Ficha de piezas con la ventana para los clips. */
const Ficha: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, BLACK.from, BLACK.to);
  if (!o) return null;
  const idx = MODS.filter((m) => T >= m.t).length; // pieza activa (1..5)
  const summary = T >= W.hemosBuscado;
  const title = T >= W.peroCada ? ['A tu', 'medida'] : summary ? ['Conducción', '+ sonido'] : ['Lo que', 'lleva'];
  const titleAt = T >= W.peroCada ? W.peroCada : summary ? W.hemosBuscado : BLACK.from + 0.1;
  const fig = summary ? (T >= W.peroCada ? 7 : 6) : Math.max(1, idx);
  const { x, y, w, h } = WINDOW;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <Board T={T} />
      <TitleReveal key={titleAt} T={T} start={titleAt} lines={title} colors={[COLOR.blanco, COLOR.rojo]} size={96} style={{ left: SAFE.left, top: 236 }} />
      <FadeUp T={T} start={BLACK.from + 0.2} style={{ left: x, top: y - 46, width: w, display: 'flex', justifyContent: 'space-between' }}>
        <Txt s="micro" color={COLOR.gris}>
          Volkswagen Golf R · preparación CAR-TEC
        </Txt>
        <Txt s="micro" color={COLOR.gris}>
          {`Fig. ${String(fig).padStart(2, '0')} / 07`}
        </Txt>
      </FadeUp>
      {MODS.map((m, i) => {
        const top = y + h + 56 + i * 60;
        const p = prog(T, m.t, 0.3, ease.entrada);
        const active = !summary && i === idx - 1;
        const dim = T >= W.peroCada ? 0.3 : summary ? 0.8 : active ? 1 : 0.45;
        if (T < m.t) return null;
        return (
          <div key={m.name} style={{ position: 'absolute', left: SAFE.left, top, width: 936, opacity: p * dim, transform: `translateX(${(1 - p) * -24}px)` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 22 }}>
              <span style={{ ...typeCss('etiqueta'), color: COLOR.rojo, width: 40 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ ...typeCss('dato'), color: active ? COLOR.blanco : COLOR.blanco, width: 330 }}>{m.name}</span>
              <span style={{ ...typeCss('etiqueta'), color: active ? COLOR.blanco : COLOR.gris }}>{m.brand}</span>
            </div>
            <div style={{ position: 'absolute', left: 0, top: 50, height: 1, width: 936, background: COLOR.grisOscuro }} />
            {active ? <div style={{ position: 'absolute', left: 0, top: 49, height: 3, width: 936 * prog(T, m.t, 0.4, ease.entrada), background: COLOR.rojo }} /> : null}
          </div>
        );
      })}
      {summary && T < W.peroCada ? (
        <>
          <FadeUp T={T} start={W.conduccion} style={{ left: x + 24, top: y + h - 60 }}>
            <Label i="06">Conducción</Label>
          </FadeUp>
          <FadeUp T={T} start={W.sonido} style={{ left: x + 330, top: y + h - 60 }}>
            <Label i="+">Sonido</Label>
          </FadeUp>
        </>
      ) : null}
      {T >= W.adaptar ? (
        <FadeUp T={T} start={W.adaptar} style={{ left: SAFE.left, top: y + h + 56 + 5 * 60 + 14 }}>
          <Label i="→">Cada preparación, a lo que quieras potenciar</Label>
        </FadeUp>
      ) : null}
    </div>
  );
};

/** Onda de línea que sigue el sonido real del coche. */
const Wave: React.FC<{ T: number; frame: number; a: number; b: number; i: string; label: string; note: string }> = ({ T, frame, a, b, i, label, note }) => {
  const o = on(T, a, b);
  if (!o) return null;
  const env = ENV as number[][];
  const span = 36;
  const x0 = SAFE.left;
  const x1 = 1008;
  const n = span * 16;
  const yc = 1300;
  const pts: string[] = [];
  for (let k = 0; k <= n; k++) {
    const f = frame - span + Math.floor(k / 16);
    const amp = f >= 0 && f < env.length ? env[f][k % 16] : 0;
    const px = x0 + ((x1 - x0) * k) / n;
    pts.push(`${k ? 'L' : 'M'}${px.toFixed(1)} ${(yc - Math.sin(k * 1.9) * amp * 110).toFixed(1)}`);
  }
  const peak = env[Math.min(frame, env.length - 1)].reduce((m, v) => Math.max(m, v), 0);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <path d={`M${x0} ${yc}H${x1}`} stroke={COLOR.blanco} strokeWidth={1} opacity={0.25} strokeDasharray="22 6 3 6" />
        <path d={pts.join('')} fill="none" stroke={COLOR.blanco} strokeWidth={2} strokeLinejoin="round" />
        <circle cx={x1} cy={yc} r={5 + peak * 10} fill={COLOR.rojo} />
      </svg>
      <FadeUp T={T} start={a + 0.1} style={{ left: SAFE.left, top: 1160 }}>
        <Label i={i}>{label}</Label>
      </FadeUp>
      <FadeUp T={T} start={a + 0.4} style={{ left: SAFE.left, top: 1430 }}>
        <Txt s="micro" color={COLOR.gris}>
          {note}
        </Txt>
      </FadeUp>
    </div>
  );
};

/** 21,3–23,9 s — «Te voy a enseñar cómo suena». */
const Listen: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, W.enseñar, W.rev);
  if (!o) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <FadeUp T={T} start={W.enseñar} style={{ left: SAFE.left, top: 1300, display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width={44} height={32}>
          {[0, 1, 2, 3, 4].map((k) => {
            const hh = 8 + 22 * Math.abs(Math.sin(T * 9 + k * 1.3));
            return <rect key={k} x={k * 9} y={16 - hh / 2} width={4} height={hh} fill={k === 2 ? COLOR.rojo : COLOR.blanco} />;
          })}
        </svg>
        <Label>Sube el volumen</Label>
      </FadeUp>
    </div>
  );
};

/** 40,7–46,4 s — Black Friday y llamada. */
const Cta: React.FC<{ T: number }> = ({ T }) => {
  if (T < W.siEstabas) return null;
  const first = on(T, W.siEstabas, W.comenta);
  return (
    <>
      {first ? (
        <div style={{ position: 'absolute', inset: 0, opacity: first }}>
          <FadeUp T={T} start={W.siEstabas} style={{ left: SAFE.left, top: 1100 }}>
            <Label i="?">Preparar tu coche</Label>
          </FadeUp>
          {T >= W.ahora ? <TitleReveal T={T} start={W.ahora} lines={['Black', 'Friday']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" size={132} style={{ left: SAFE.left, top: 1160 }} /> : null}
        </div>
      ) : null}
      {T >= W.comenta ? (
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${shake(T, W.black + 0.1, 9)}px)` }}>
          <TitleReveal T={T} start={W.comenta} lines={['Comenta', '«Black»']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" size={128} style={{ left: SAFE.left, top: 1130 }} />
          <FadeUp T={T} start={W.contacto - 0.3} style={{ left: SAFE.left, top: 1420 }}>
            <Label i="→">Y te contactamos</Label>
          </FadeUp>
        </div>
      ) : null}
    </>
  );
};

/** Solo la capa de gráficos, con fondo transparente. */
export const GolfROverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const T = frame / fps;
  return (
    <AbsoluteFill>
      <Vignette T={T} />
      <Ficha T={T} />
      <Marks />
      <Hook T={T} />
      <Power T={T} />
      <Listen T={T} />
      <Wave T={T} frame={frame} a={W.rev} b={W.revFin} i="01" label="Sonido" note="Golf R · sonido real" />
      <Wave T={T} frame={frame} a={W.marcha} b={W.marchaFin} i="02" label="En marcha" note="Golf R · sonido real · en carretera" />
      <Cta T={T} />
    </AbsoluteFill>
  );
};

/** Vista previa: vídeo del cliente + un clip de muestra en la ventana + capa. */
export const GolfRPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const T = frame / 30;
  const inBlack = T >= BLACK.from && T < BLACK.to;
  return (
    <AbsoluteFill style={{ background: COLOR.negro }}>
      <OffthreadVideo src={staticFile('episodes/bf-02-golf/base.mp4')} style={{ width: 1080, height: 1920 }} />
      {inBlack ? (
        <div style={{ position: 'absolute', left: WINDOW.x, top: WINDOW.y, width: WINDOW.w, height: WINDOW.h, background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Txt s="etiqueta" color={COLOR.gris}>
            Aquí va tu clip horizontal
          </Txt>
        </div>
      ) : null}
      <GolfROverlay />
    </AbsoluteFill>
  );
};

