// Candado en línea: `open` 0 = cerrado, 1 = abierto (el arco sube y gira).
import React from 'react';
import { COLOR, STROKE } from '../system/tokens';

export const Padlock: React.FC<{ cx: number; cy: number; size: number; open?: number; draw?: number; color?: string }> = ({
  cx,
  cy,
  size,
  open = 0,
  draw = 1,
  color = COLOR.blanco,
}) => {
  const w = size;
  const h = size * 0.78;
  const r = size * 0.08;
  const top = cy - h / 2;
  const sw = w * 0.62; // ancho del arco
  const lift = open * size * 0.28;
  const shackleH = size * 0.5;
  // El arco gira sobre su pata derecha al abrirse.
  const pivotX = cx + sw / 2;
  const rot = -open * 28;
  const shackle = `M${cx - sw / 2} ${top}V${top - shackleH + sw / 2}A${sw / 2} ${sw / 2} 0 0 1 ${cx + sw / 2} ${top - shackleH + sw / 2}V${top}`;
  const inner = sw - size * 0.16;
  const shackleIn = `M${cx - inner / 2} ${top}V${top - shackleH + sw / 2}A${inner / 2} ${inner / 2} 0 0 1 ${cx + inner / 2} ${top - shackleH + sw / 2}V${top}`;
  const dash = (p: number) => ({ pathLength: 1, strokeDasharray: p < 1 ? 1 : undefined, strokeDashoffset: p < 1 ? 1 - p : undefined });
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <g transform={`translate(0 ${-lift}) rotate(${rot} ${pivotX} ${top})`} fill="none" stroke={color} strokeLinecap="round">
        <path d={shackle} strokeWidth={STROKE.silueta} {...dash(draw)} />
        <path d={shackleIn} strokeWidth={STROKE.arista} strokeOpacity={0.7} {...dash(draw)} />
      </g>
      <rect x={cx - w / 2} y={top} width={w} height={h} rx={r} fill={COLOR.negro} stroke={color} strokeWidth={STROKE.silueta} {...dash(draw)} />
      <rect x={cx - w / 2 + 14} y={top + 14} width={w - 28} height={h - 28} rx={r * 0.6} fill="none" stroke={color} strokeOpacity={0.4} strokeWidth={1} {...dash(draw)} />
      <g opacity={draw >= 1 ? 1 : 0} fill="none" stroke={color} strokeWidth={STROKE.arista}>
        <circle cx={cx} cy={cy - h * 0.06} r={size * 0.07} />
        <path d={`M${cx} ${cy - h * 0.06 + size * 0.07}V${cy + h * 0.2}`} strokeWidth={STROKE.silueta} />
      </g>
    </svg>
  );
};
