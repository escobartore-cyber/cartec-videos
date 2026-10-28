// Alzado lateral a partir de un dibujo vectorizado con scripts/trace-art.py.
// Los trazos se dibujan de atrás adelante, las ruedas giran y la silueta superior
// se refuerza con el grosor de silueta del sistema.
import React from 'react';
import { COLOR, STROKE } from '../../system/tokens';

type Pt = [number, number];
export type CarArtData = {
  length: number;
  pxPerM: number;
  wheels: { x: number; y: number; r: number }[];
  silhouette: Pt[];
  outline: Pt[];
  paths: { d: Pt[]; len: number; wheel: number | null; closed: boolean }[];
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * (x, y): píxel del suelo bajo la trasera; k: px por metro.
 * `draw` 0–1 barre el dibujo de atrás adelante; `spin` gira las llantas (grados).
 */
export const CarArt: React.FC<{ art: CarArtData; x: number; y: number; k: number; draw?: number; spin?: number; color?: string }> = ({
  art,
  x,
  y,
  k,
  draw = 1,
  spin = 0,
  color = COLOR.blanco,
}) => {
  const px = (p: Pt) => `${(x + p[0] * k).toFixed(1)} ${(y - p[1] * k).toFixed(1)}`;
  const d = (pts: Pt[], close = false) => `M${pts.map(px).join('L')}${close ? 'Z' : ''}`;
  const reveal = (u: number) => clamp01((draw * 1.35 - u) / 0.35);
  const dash = (p: number) => (p < 1 ? { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - p } : {});
  const body = art.paths.filter((p) => p.wheel === null);
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <path d={d(art.silhouette, true)} fill={COLOR.negro} opacity={draw > 0 ? 1 : 0} />
      <g fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
        {body.map((p, i) => {
          const r = reveal(p.d[0][0] / art.length);
          return r > 0 ? <path key={i} d={d(p.d)} strokeWidth={STROKE.arista} strokeOpacity={0.92} {...dash(r)} /> : null;
        })}
        <path d={d(art.outline)} strokeWidth={STROKE.silueta} {...dash(clamp01(draw / 0.8))} />
        {art.wheels.map((w, wi) => {
          const r = reveal(w.x / art.length);
          if (r <= 0) return null;
          return (
            <g key={wi} transform={`rotate(${spin.toFixed(2)} ${(x + w.x * k).toFixed(1)} ${(y - w.y * k).toFixed(1)})`}>
              {art.paths
                .filter((p) => p.wheel === wi)
                .map((p, i) => (
                  <path key={i} d={d(p.d)} strokeWidth={p.len > w.r * 4 ? STROKE.silueta : STROKE.detalle + 0.2} strokeOpacity={0.95} {...dash(r)} />
                ))}
            </g>
          );
        })}
      </g>
    </svg>
  );
};
