import React from 'react';
import { COLOR, SAFE, STROKE, TYPE } from '../system/tokens';
import { typeCss } from './Type';

const t = TYPE.etiqueta;
/** Ancho de una etiqueta en JetBrains Mono (avance fijo de 0,6 em + tracking). */
export const labelWidth = (text: string) => text.length * t.size * (0.6 + t.tracking);

/**
 * Llamada técnica: punto en la pieza → codo fuera de la silueta → hombro
 * horizontal → etiqueta en el margen (izquierdo o derecho de la zona segura).
 * `progress` (0–1) dibuja la línea y después muestra el texto.
 */
export const Callout: React.FC<{
  from: [number, number];
  /** Altura de la etiqueta y del hombro. */
  y: number;
  /** X del codo: debe quedar fuera de la silueta de la pieza. */
  elbowX: number;
  label: string;
  index?: string;
  side?: 'left' | 'right';
  accent?: boolean;
  progress?: number;
}> = ({ from, y, elbowX, label, index, side = 'right', accent = false, progress = 1 }) => {
  const text = index ? `${index}  ${label}` : label;
  const w = labelWidth(text);
  const gap = 14;
  const textX = side === 'right' ? SAFE.rightRail.x - w : SAFE.left;
  const endX = side === 'right' ? textX - gap : textX + w + gap;
  const elbow: [number, number] = [side === 'right' ? Math.min(elbowX, endX - 24) : Math.max(elbowX, endX + 24), y];
  const len = Math.hypot(elbow[0] - from[0], elbow[1] - from[1]) + Math.abs(endX - elbow[0]);
  const lineP = Math.min(1, progress / 0.7);
  const textP = Math.max(0, (progress - 0.55) / 0.45);
  const color = accent ? COLOR.rojo : COLOR.blanco;
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <polyline
          points={`${from.join(',')} ${elbow.join(',')} ${endX},${y}`}
          fill="none"
          stroke={color}
          strokeWidth={STROKE.detalle}
          strokeDasharray={len}
          strokeDashoffset={len * (1 - lineP)}
        />
        <circle cx={from[0]} cy={from[1]} r={5} fill={COLOR.negro} stroke={color} strokeWidth={2} opacity={lineP > 0 ? 1 : 0} />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: y - (t.size * t.lineHeight) / 2,
          left: textX,
          ...typeCss('etiqueta'),
          color: COLOR.blanco,
          opacity: textP,
          whiteSpace: 'pre',
        }}
      >
        {index ? <span style={{ color: COLOR.rojo }}>{index}  </span> : null}
        {label}
      </div>
    </>
  );
};

/** Etiqueta bajo la pieza: línea vertical desde el punto hasta el texto. */
export const TagBelow: React.FC<{
  from: [number, number];
  y: number;
  label: string;
  index?: string;
  accent?: boolean;
  progress?: number;
}> = ({ from, y, label, index, accent = false, progress = 1 }) => {
  const text = index ? `${index}  ${label}` : label;
  const w = labelWidth(text);
  const left = Math.max(SAFE.left, Math.min(SAFE.rightRail.x - w, from[0] - w / 2));
  const lineP = Math.min(1, progress / 0.6);
  const textP = Math.max(0, (progress - 0.5) / 0.5);
  const color = accent ? COLOR.rojo : COLOR.blanco;
  const len = y - from[1];
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <path
          d={`M${from[0]} ${from[1]}V${y}M${left} ${y}H${left + w}`}
          fill="none"
          stroke={color}
          strokeWidth={STROKE.detalle}
          strokeDasharray={len + w}
          strokeDashoffset={(len + w) * (1 - lineP)}
        />
        <circle cx={from[0]} cy={from[1]} r={5} fill={COLOR.negro} stroke={color} strokeWidth={2} opacity={lineP > 0 ? 1 : 0} />
      </svg>
      <div style={{ position: 'absolute', top: y + 10, left, ...typeCss('etiqueta'), color: COLOR.blanco, opacity: textP, whiteSpace: 'pre' }}>
        {index ? <span style={{ color: COLOR.rojo }}>{index}  </span> : null}
        {label}
      </div>
    </>
  );
};
