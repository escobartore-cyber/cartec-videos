// Esfera de instrumento genérica, sin cifras: arco de 270°, marcas, aguja y,
// opcionalmente, un tope rojo (límite) con la zona prohibida rayada.
import React from 'react';
import { COLOR, STROKE } from '../system/tokens';
import { typeCss } from '../components/Type';

const A0 = 135; // ángulo inicial (grados, sentido horario desde +x en pantalla)
const SWEEP = 270;

const polar = (cx: number, cy: number, r: number, t: number): [number, number] => {
  const a = ((A0 + SWEEP * t) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
const arc = (cx: number, cy: number, r: number, t0: number, t1: number) => {
  const [x0, y0] = polar(cx, cy, r, t0);
  const [x1, y1] = polar(cx, cy, r, t1);
  const large = (t1 - t0) * SWEEP > 180 ? 1 : 0;
  return `M${x0} ${y0}A${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
};

/** Sector anular entre los radios r0 (interior) y r1 (exterior), de t0 a t1. */
const sector = (cx: number, cy: number, r0: number, r1: number, t0: number, t1: number) => {
  const large = (t1 - t0) * SWEEP > 180 ? 1 : 0;
  const [ax, ay] = polar(cx, cy, r1, t0);
  const [bx, by] = polar(cx, cy, r1, t1);
  const [ix, iy] = polar(cx, cy, r0, t1);
  const [jx, jy] = polar(cx, cy, r0, t0);
  return `M${ax} ${ay}A${r1} ${r1} 0 ${large} 1 ${bx} ${by}L${ix} ${iy}A${r0} ${r0} 0 ${large} 0 ${jx} ${jy}Z`;
};

/**
 * `value` 0–1 posición de la aguja; `limit` 0–1 posición del tope (opcional);
 * `draw` 0–1 trazado del arco y marcas; `alert` 0–1 enciende la zona limitada.
 */
export const Gauge: React.FC<{
  cx: number;
  cy: number;
  r: number;
  value: number;
  limit?: number;
  draw?: number;
  alert?: number;
  label: string;
  sublabel?: string;
}> = ({ cx, cy, r, value, limit, draw = 1, alert = 0, label, sublabel }) => {
  const ticks: string[] = [];
  const minor: string[] = [];
  const n = 40;
  for (let i = 0; i <= n * draw; i++) {
    const t = i / n;
    const major = i % 5 === 0;
    const [x0, y0] = polar(cx, cy, r - (major ? 34 : 18), t);
    const [x1, y1] = polar(cx, cy, r - 4, t);
    (major ? ticks : minor).push(`M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`);
  }
  const needle = Math.min(value, limit ?? 1);
  const [nx, ny] = polar(cx, cy, r - 46, needle);
  const [bx, by] = polar(cx, cy, 26, needle + 0.5);
  const hatchId = `gauge-hatch-${Math.round(cx)}-${Math.round(cy)}`;
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <pattern id={hatchId} patternUnits="userSpaceOnUse" width={10} height={10} patternTransform="rotate(45)">
            <path d="M0 0V10" stroke={COLOR.rojo} strokeWidth={2} />
          </pattern>
        </defs>
        <path d={arc(cx, cy, r, 0, Math.max(0.001, draw))} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.silueta} />
        <path d={arc(cx, cy, r + 14, 0, Math.max(0.001, draw))} fill="none" stroke={COLOR.blanco} strokeOpacity={0.3} strokeWidth={1} />
        <path d={minor.join('')} stroke={COLOR.blanco} strokeOpacity={0.45} strokeWidth={1.2} />
        <path d={ticks.join('')} stroke={COLOR.blanco} strokeWidth={STROKE.silueta} />
        {limit !== undefined && draw >= 1 ? (
          <g>
            <path d={sector(cx, cy, r - 60, r - 4, limit, 1)} fill={`url(#${hatchId})`} opacity={0.25 + 0.6 * alert} />
            <path d={arc(cx, cy, r, limit, 1)} fill="none" stroke={COLOR.rojo} strokeWidth={STROKE.silueta + 2} />
            <path
              d={`M${polar(cx, cy, r - 70, limit).join(' ')}L${polar(cx, cy, r + 26, limit).join(' ')}`}
              stroke={COLOR.rojo}
              strokeWidth={5}
              strokeLinecap="round"
            />
          </g>
        ) : null}
        <g opacity={draw >= 1 ? 1 : 0}>
          <path d={`M${bx} ${by}L${nx} ${ny}`} stroke={alert > 0.5 ? COLOR.rojo : COLOR.blanco} strokeWidth={5} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={16} fill={COLOR.negro} stroke={COLOR.blanco} strokeWidth={STROKE.silueta} />
          <circle cx={cx} cy={cy} r={5} fill={COLOR.blanco} />
        </g>
      </svg>
      <div style={{ position: 'absolute', left: cx - 200, width: 400, top: cy + r * 0.38, textAlign: 'center', ...typeCss('etiqueta'), color: COLOR.blanco, opacity: draw }}>
        {label}
      </div>
      {sublabel ? (
        <div style={{ position: 'absolute', left: cx - 200, width: 400, top: cy + r * 0.38 + 36, textAlign: 'center', ...typeCss('micro'), color: COLOR.gris, opacity: draw }}>
          {sublabel}
        </div>
      ) : null}
    </>
  );
};
