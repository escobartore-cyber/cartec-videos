// Gráfica par / rpm. Es ilustrativa: el eje de par no lleva cifras y las curvas
// muestran la forma típica de un motor turbo, no datos de banco de un coche.
import React from 'react';
import { COLOR, STROKE, TYPE } from '../system/tokens';
import { typeCss } from '../components/Type';

type Pt = [number, number]; // [rpm, par normalizado 0–1]

/** Interpolación cúbica monótona (Fritsch–Carlson): sin rebotes entre puntos. */
export const monotone = (pts: Pt[]) => {
  const n = pts.length;
  const dx = pts.slice(1).map((p, i) => p[0] - pts[i][0]);
  const m = pts.slice(1).map((p, i) => (p[1] - pts[i][1]) / dx[i]);
  const t = pts.map((_, i) => (i === 0 ? m[0] : i === n - 1 ? m[n - 2] : m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2));
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
      continue;
    }
    const a = t[i] / m[i];
    const b = t[i + 1] / m[i];
    const h = Math.hypot(a, b);
    if (h > 3) {
      t[i] = (3 * a * m[i]) / h;
      t[i + 1] = (3 * b * m[i]) / h;
    }
  }
  return (x: number) => {
    if (x <= pts[0][0]) return pts[0][1];
    if (x >= pts[n - 1][0]) return pts[n - 1][1];
    let i = 0;
    while (x > pts[i + 1][0]) i++;
    const h = dx[i];
    const s = (x - pts[i][0]) / h;
    const s2 = s * s;
    const s3 = s2 * s;
    return (
      (2 * s3 - 3 * s2 + 1) * pts[i][1] + (s3 - 2 * s2 + s) * h * t[i] + (-2 * s3 + 3 * s2) * pts[i + 1][1] + (s3 - s2) * h * t[i + 1]
    );
  };
};

/** Forma de referencia de un motor turbo preparado (petición de la ECU tras Stage 2). */
export const REQUEST_STAGE2: Pt[] = [
  [900, 0.3], [1500, 0.6], [2100, 0.86], [2600, 0.95], [3500, 0.965], [4600, 0.95], [5500, 0.87], [6300, 0.76], [7000, 0.66],
];

export type ChartBox = { x0: number; x1: number; y0: number; y1: number; rpmMax: number };
export const CHART_BOX: ChartBox = { x0: 150, x1: 930, y0: 660, y1: 1130, rpmMax: 7000 };

export const TorqueChart: React.FC<{
  box?: ChartBox;
  request?: Pt[];
  /** Límite del CPC en par normalizado (0–1). Animable: sube en el desbloqueo. */
  limit: number;
  limitLabel: string;
  limitLabelSide?: 'left' | 'right';
  /** Progresos 0–1 de cada capa. */
  axes?: number;
  requestDraw?: number;
  limitDraw?: number;
  delivered?: number;
  hatch?: number;
}> = ({ box = CHART_BOX, request = REQUEST_STAGE2, limit, limitLabel, limitLabelSide = 'left', axes = 1, requestDraw = 1, limitDraw = 1, delivered = 1, hatch = 1 }) => {
  const f = monotone(request);
  const X = (rpm: number) => box.x0 + (rpm / box.rpmMax) * (box.x1 - box.x0);
  const Y = (v: number) => box.y1 - v * (box.y1 - box.y0);
  const rpm0 = request[0][0];
  const samples = [...Array(141).keys()].map((i) => rpm0 + ((box.rpmMax - rpm0) * i) / 140);
  const path = (g: (r: number) => number) => samples.map((r, i) => `${i ? 'L' : 'M'}${X(r).toFixed(1)} ${Y(g(r)).toFixed(1)}`).join('');
  const deliveredFn = (r: number) => Math.min(f(r), limit);

  // Zona recortada: entre la petición y el límite donde la petición lo supera.
  const over = samples.filter((r) => f(r) > limit);
  const clipped =
    over.length > 1
      ? `M${X(over[0])} ${Y(limit)}${over.map((r) => `L${X(r).toFixed(1)} ${Y(f(r)).toFixed(1)}`).join('')}L${X(over[over.length - 1])} ${Y(limit)}Z`
      : '';

  const grid: string[] = [];
  for (let r = 1000; r <= box.rpmMax; r += 1000) grid.push(`M${X(r)} ${box.y0}V${box.y1}`);
  for (let v = 0.25; v <= 1; v += 0.25) grid.push(`M${box.x0} ${Y(v)}H${box.x1}`);

  const draw = (p: number) => ({ pathLength: 1, strokeDasharray: p < 1 ? 1 : undefined, strokeDashoffset: p < 1 ? 1 - p : undefined });
  const micro = typeCss('micro');
  const hatchId = 'cartec-hatch';
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <defs>
          <pattern id={hatchId} patternUnits="userSpaceOnUse" width={12} height={12} patternTransform="rotate(45)">
            <path d="M0 0V12" stroke={COLOR.rojo} strokeWidth={2} />
          </pattern>
        </defs>
        <g opacity={axes}>
          <path d={grid.join('')} stroke={COLOR.blanco} strokeOpacity={0.08} strokeWidth={1} />
          <path d={`M${box.x0} ${box.y0 - 30}V${box.y1}H${box.x1 + 20}`} stroke={COLOR.blanco} strokeOpacity={0.7} strokeWidth={STROKE.arista} fill="none" />
          <path d={`M${box.x0 - 7} ${box.y0 - 18}L${box.x0} ${box.y0 - 32}L${box.x0 + 7} ${box.y0 - 18}`} stroke={COLOR.blanco} strokeOpacity={0.7} strokeWidth={STROKE.arista} fill="none" />
          {[0, 2000, 4000, 6000].map((r) => (
            <path key={r} d={`M${X(r)} ${box.y1}v10`} stroke={COLOR.blanco} strokeOpacity={0.7} />
          ))}
        </g>
        {clipped ? (
          <g opacity={hatch}>
            <path d={clipped} fill={COLOR.rojo} fillOpacity={0.12} />
            <path d={clipped} fill={`url(#${hatchId})`} opacity={0.55} />
          </g>
        ) : null}
        <path d={path(f)} fill="none" stroke={COLOR.rojo} strokeWidth={STROKE.curva - 1} strokeLinecap="round" {...draw(requestDraw)} />
        <path
          d={`M${box.x0} ${Y(limit)}H${box.x1}`}
          fill="none"
          stroke={COLOR.blanco}
          strokeWidth={2}
          strokeDasharray="14 10"
          strokeDashoffset={0}
          opacity={limitDraw}
        />
        <path d={path(deliveredFn)} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.curva} strokeLinecap="round" {...draw(delivered)} />
      </svg>

      <div style={{ position: 'absolute', opacity: axes, left: box.x0 + 18, top: box.y0 - 42, ...micro, color: COLOR.gris, textTransform: 'none' }}>
        PAR MOTOR (Nm)
      </div>
      {[0, 2000, 4000, 6000].map((r) => (
        <div key={r} style={{ position: 'absolute', opacity: axes, top: box.y1 + 18, left: X(r) - 40, width: 80, textAlign: 'center', ...typeCss('etiqueta'), fontSize: 20, color: COLOR.gris }}>
          {r}
        </div>
      ))}
      <div style={{ position: 'absolute', opacity: axes, top: box.y1 + 54, left: X(3500) - 60, width: 120, textAlign: 'center', ...micro, color: COLOR.gris }}>
        RPM
      </div>
      <div
        style={{
          position: 'absolute',
          opacity: limitDraw,
          top: Y(limit) + (limitLabelSide === 'left' ? -32 : 10),
          ...(limitLabelSide === 'left' ? { left: box.x0 + 14 } : { right: 1080 - box.x1 }),
          ...typeCss('etiqueta'),
          fontSize: TYPE.micro.size + 2,
          color: COLOR.blanco,
        }}
      >
        {limitLabel}
      </div>
    </>
  );
};
