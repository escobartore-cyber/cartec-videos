// Piezas 2D del escape: downpipe, recorrido completo y turbo en sección. Dibujos
// ilustrativos (sin cotas numéricas). Los tubos se dibujan con doble trazo
// (contorno blanco + interior negro) para que se lean como conductos.
import React from 'react';
import { COLOR, STROKE } from '../system/tokens';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const dash = (p: number) => (p < 1 ? { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - clamp01(p) } : {});

/** Conducto de grosor `w` siguiendo `d`; `p` revela el trazado; `accent` lo pinta en rojo. */
export const Tube: React.FC<{ d: string; w: number; p?: number; accent?: boolean; inner?: string }> = ({ d, w, p = 1, accent = false, inner = COLOR.negro }) =>
  p <= 0 ? null : (
    <>
      <path d={d} fill="none" stroke={accent ? COLOR.rojo : COLOR.blanco} strokeWidth={w + STROKE.silueta * 2} strokeLinecap="butt" {...dash(p)} />
      <path d={d} fill="none" stroke={inner} strokeWidth={w} strokeLinecap="butt" {...dash(p)} />
    </>
  );

/** Flujo de gas: trazos discontinuos que avanzan por el recorrido. `t` en segundos. */
export const Flow: React.FC<{ d: string; t: number; speed?: number; color?: string; opacity?: number; gap?: number; width?: number }> = ({ d, t, speed = 260, color = COLOR.blanco, opacity = 0.8, gap = 34, width = 3 }) => (
  <path d={d} fill="none" stroke={color} strokeWidth={width} strokeOpacity={opacity} strokeLinecap="round" strokeDasharray={`14 ${gap}`} strokeDashoffset={-t * speed} />
);

/** Catalizador: cuerpo con conos y panal interior. (x, y): centro; l, h en px. */
export const Catalyst: React.FC<{ x: number; y: number; l: number; h: number; p?: number; accent?: boolean }> = ({ x, y, l, h, p = 1, accent }) => {
  if (p <= 0) return null;
  const c = accent ? COLOR.rojo : COLOR.blanco;
  const cone = h * 0.35;
  const body = `M${x - l / 2} ${y - h / 2}H${x + l / 2}L${x + l / 2 + cone} ${y - h / 4}V${y + h / 4}L${x + l / 2} ${y + h / 2}H${x - l / 2}L${x - l / 2 - cone} ${y + h / 4}V${y - h / 4}Z`;
  const cells = [...Array(9).keys()].map((i) => `M${x - l / 2 + ((i + 1) * l) / 10} ${y - h / 2 + 6}V${y + h / 2 - 6}`).join('');
  return (
    <g opacity={clamp01(p * 2)}>
      <path d={body} fill={COLOR.negro} stroke={c} strokeWidth={STROKE.silueta} {...dash(p)} />
      <path d={cells} stroke={c} strokeWidth={STROKE.detalle} strokeOpacity={0.55} opacity={clamp01((p - 0.5) * 2)} />
    </g>
  );
};

/**
 * Downpipe de perfil: brida del turbo arriba a la izquierda, bajada, curva y tramo
 * con catalizador hacia la derecha. `variant` serie (curva cerrada, sección menor)
 * o flujo (curva abierta, sección mayor). (x, y): brida; `s` escala.
 */
export const downpipePath = (x: number, y: number, s: number, variant: 'serie' | 'flujo') => {
  const r = variant === 'serie' ? 70 : 140;
  return `M${x} ${y}V${y + (260 - r) * s}C${x} ${y + (260 - r * 0.45) * s} ${x + r * 0.45 * s} ${y + 260 * s} ${x + r * s} ${y + 260 * s}H${x + 520 * s}`;
};
export const Downpipe: React.FC<{ x: number; y: number; s?: number; variant?: 'serie' | 'flujo'; p?: number; accent?: boolean; cat?: boolean }> = ({ x, y, s = 1, variant = 'serie', p = 1, accent, cat = true }) => {
  const w = (variant === 'serie' ? 42 : 60) * s;
  const flange = `M${x - w * 0.9} ${y}H${x + w * 0.9}`;
  return (
    <g>
      <Tube d={downpipePath(x, y, s, variant)} w={w} p={p} accent={accent} />
      <path d={flange} stroke={accent ? COLOR.rojo : COLOR.blanco} strokeWidth={STROKE.silueta * 2} opacity={p > 0 ? 1 : 0} />
      {cat ? <Catalyst x={x + 360 * s} y={y + 260 * s} l={150 * s} h={w * 1.7} p={(p - 0.6) / 0.4} /> : null}
    </g>
  );
};

/** Recorrido del escape: turbo → downpipe → catalizador → intermedio → silencioso → salida. */
export const ROUTE = {
  turbo: [150, 0] as [number, number],
  path: (x: number, y: number) =>
    `M${x + 150} ${y + 40}V${y + 150}C${x + 150} ${y + 230} ${x + 200} ${y + 260} ${x + 280} ${y + 260}H${x + 900}`,
  downpipe: (x: number, y: number) => `M${x + 150} ${y + 40}V${y + 150}C${x + 150} ${y + 230} ${x + 200} ${y + 260} ${x + 280} ${y + 260}H${x + 420}`,
};
export const ExhaustRoute: React.FC<{ x: number; y: number; p?: number; t: number; flow?: number; highlight?: number }> = ({ x, y, p = 1, t, flow = 0, highlight = 0 }) => (
  <g>
    <circle cx={x + 150} cy={y} r={46} fill={COLOR.negro} stroke={COLOR.blanco} strokeWidth={STROKE.silueta} opacity={clamp01(p * 3)} />
    <circle cx={x + 150} cy={y} r={20} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.detalle} opacity={clamp01(p * 3)} />
    <Tube d={ROUTE.path(x, y)} w={34} p={p} />
    {highlight > 0 ? <Tube d={ROUTE.downpipe(x, y)} w={34} p={highlight} accent /> : null}
    <Catalyst x={x + 490} y={y + 260} l={110} h={58} p={(p - 0.4) / 0.4} />
    <rect x={x + 700} y={y + 225} width={150} height={70} rx={30} fill={COLOR.negro} stroke={COLOR.blanco} strokeWidth={STROKE.silueta} opacity={clamp01((p - 0.6) * 3)} />
    {flow > 0 ? <Flow d={ROUTE.path(x, y)} t={t} opacity={0.75 * flow} /> : null}
  </g>
);

/** Rueda de álabes vista de frente; `spin` en grados. */
const Wheel: React.FC<{ cx: number; cy: number; r: number; spin: number; n?: number; color?: string }> = ({ cx, cy, r, spin, n = 11, color = COLOR.blanco }) => (
  <g transform={`rotate(${spin.toFixed(1)} ${cx} ${cy})`}>
    {[...Array(n).keys()].map((i) => {
      const a = (i / n) * Math.PI * 2;
      const b = a + 0.55;
      return <path key={i} d={`M${cx + Math.cos(a) * r * 0.22} ${cy + Math.sin(a) * r * 0.22}Q${cx + Math.cos(a + 0.35) * r * 0.7} ${cy + Math.sin(a + 0.35) * r * 0.7} ${cx + Math.cos(b) * r} ${cy + Math.sin(b) * r}`} fill="none" stroke={color} strokeWidth={STROKE.arista} />;
    })}
    <circle cx={cx} cy={cy} r={r * 0.2} fill={COLOR.negro} stroke={color} strokeWidth={STROKE.arista} />
  </g>
);

/** Voluta (carcasa en caracol) alrededor de una rueda. */
const volute = (cx: number, cy: number, r: number, dir: 1 | -1) => {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * Math.PI * 1.9 * dir - Math.PI / 2;
    const rr = r * (1 + 0.32 * (i / 40));
    pts.push(`${i ? 'L' : 'M'}${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return pts.join('');
};

/**
 * Turbo en sección esquemática: turbina (izquierda, gases calientes) y compresor
 * (derecha, aire) unidos por el eje. `hot`/`air` 0–1 encienden los flujos.
 */
export const TurboSection: React.FC<{ cx: number; cy: number; s?: number; spin: number; p?: number; t: number; hot?: number; air?: number; focus?: 'turbina' | 'compresor' }> = ({ cx, cy, s = 1, spin, p = 1, t, hot = 0, air = 0, focus }) => {
  const tx = cx - 200 * s;
  const kx = cx + 200 * s;
  const r = 95 * s;
  const op = clamp01(p * 2);
  return (
    <g opacity={op}>
      <path d={volute(tx, cy, r * 1.12, -1)} fill="none" stroke={focus === 'turbina' ? COLOR.rojo : COLOR.blanco} strokeWidth={STROKE.silueta} {...dash(p)} />
      <path d={volute(kx, cy, r * 1.12, 1)} fill="none" stroke={focus === 'compresor' ? COLOR.rojo : COLOR.blanco} strokeWidth={STROKE.silueta} {...dash(p)} />
      <rect x={tx + r * 1.3} y={cy - 34 * s} width={kx - tx - r * 2.6} height={68 * s} fill={COLOR.negro} stroke={COLOR.blanco} strokeWidth={STROKE.arista} />
      <path d={`M${tx} ${cy}H${kx}`} stroke={COLOR.blanco} strokeWidth={4 * s} strokeDasharray="22 6 3 6" strokeOpacity={0.55} />
      <Wheel cx={tx} cy={cy} r={r * 0.85} spin={spin} n={9} />
      <Wheel cx={kx} cy={cy} r={r * 0.85} spin={-spin} n={12} />
      {hot > 0 ? <Flow d={`M${tx - r * 2.2} ${cy - r * 1.45}H${tx}V${cy + r * 2.3}`} t={t} color={COLOR.rojo} opacity={0.9 * hot} width={4} /> : null}
      {air > 0 ? <Flow d={`M${kx} ${cy + r * 2.3}V${cy}H${kx + r * 2.2}`} t={t} opacity={0.8 * air} width={4} /> : null}
    </g>
  );
};
