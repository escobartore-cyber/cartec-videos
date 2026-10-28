// Mapa de calibración en malla 3D (rpm × carga → límite). Ilustrativo y sin
// cifras: `level` 0 = límites originales, 1 = límites adaptados (la meseta sube).
import React from 'react';
import { Camera, makeProjector, V3 } from '../draw/line3d';
import { COLOR, STROKE } from '../system/tokens';

const NX = 14; // rpm
const NY = 9; // carga

const smooth = (t: number) => t * t * (3 - 2 * t);

/** Altura normalizada de la celda (i, j) según el nivel de calibración. */
const height = (i: number, j: number, level: number) => {
  const rpm = i / (NX - 1);
  const load = j / (NY - 1);
  const rise = smooth(Math.min(1, rpm / 0.3)) * (1 - 0.35 * smooth(Math.max(0, (rpm - 0.75) / 0.25)));
  const shape = rise * (0.25 + 0.75 * load);
  const cap = 0.55 + 0.4 * level; // la meseta del límite sube con la recalibración
  return Math.min(shape, cap) + 0.04 * Math.sin(i * 1.3 + j * 0.7) * load;
};

export const CalibrationMap: React.FC<{ camera: Camera; level: number; draw?: number; sweep?: number }> = ({ camera, level, draw = 1, sweep }) => {
  const P = makeProjector(camera);
  const W = 30;
  const D = 20;
  const H = 12;
  const pt = (i: number, j: number): V3 => [(i / (NX - 1) - 0.5) * W, height(i, j, level) * H, (j / (NY - 1) - 0.5) * D];
  const proj = (p: V3) => P.project(p);
  const fmt = (p: [number, number]) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const rows: string[] = [];
  const cols: string[] = [];
  const nRows = Math.ceil(NY * draw);
  for (let j = 0; j < nRows; j++) rows.push(`M${[...Array(NX).keys()].map((i) => fmt(proj(pt(i, j)))).join('L')}`);
  for (let i = 0; i < Math.ceil(NX * draw); i++) cols.push(`M${[...Array(NY).keys()].map((j) => fmt(proj(pt(i, j)))).join('L')}`);
  const base = [[-W / 2, 0, -D / 2], [W / 2, 0, -D / 2], [W / 2, 0, D / 2], [-W / 2, 0, D / 2]].map((p) => fmt(proj(p as V3)));
  // Línea de barrido roja: la columna que se está reescribiendo.
  const sweepCol = sweep !== undefined ? Math.round(sweep * (NX - 1)) : -1;
  const sweepPath = sweepCol >= 0 ? `M${[...Array(NY).keys()].map((j) => fmt(proj(pt(sweepCol, j)))).join('L')}` : '';
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <path d={`M${base.join('L')}Z`} fill="none" stroke={COLOR.blanco} strokeOpacity={0.3} strokeWidth={1} strokeDasharray="6 6" />
      <path d={rows.join('')} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.detalle} strokeOpacity={0.85} />
      <path d={cols.join('')} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.detalle} strokeOpacity={0.6} />
      {sweepPath ? <path d={sweepPath} fill="none" stroke={COLOR.rojo} strokeWidth={4} strokeLinecap="round" /> : null}
    </svg>
  );
};

export const mapAxesAnchors = (camera: Camera) => {
  const P = makeProjector(camera);
  return { rpm: P.project([15, 0, 11]), carga: P.project([16, 0, -2]), limite: P.project([-15, 9, -10]) };
};
