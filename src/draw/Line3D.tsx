import React from 'react';
import { CANVAS, COLOR, STROKE } from '../system/tokens';
import { Camera, Part, renderScene } from './line3d';

/** Dibuja una escena de piezas 3D en línea blanca sobre negro (SVG a pantalla completa). */
export const Line3D: React.FC<{ parts: Part[]; camera: Camera; style?: React.CSSProperties }> = ({ parts, camera, style }) => {
  const layers = renderScene(parts, camera, { silueta: STROKE.silueta, arista: STROKE.arista, detalle: STROKE.detalle });
  return (
    <svg width={CANVAS.width} height={CANVAS.height} style={{ position: 'absolute', inset: 0, overflow: 'visible', ...style }}>
      {layers.map((layer, i) => (
        <g key={i} opacity={layer.opacity} strokeLinecap="round" strokeLinejoin="round">
          {layer.solid && layer.fill.length ? (
            <path d={layer.fill.join('')} fill={COLOR.negro} stroke={COLOR.negro} strokeWidth={1} />
          ) : null}
          {layer.strokes.map((s, j) =>
            s.d ? (
              <path
                key={j}
                d={s.d}
                fill="none"
                stroke={s.color === 'accent' ? COLOR.rojo : COLOR.blanco}
                strokeWidth={s.width}
                strokeOpacity={s.opacity}
                strokeDasharray={s.dash}
              />
            ) : null,
          )}
        </g>
      ))}
    </svg>
  );
};
