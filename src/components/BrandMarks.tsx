// Marcas de terceros (Mercedes-Benz y AMG) para uso descriptivo y discreto: identifican
// el vehículo del que habla el vídeo. Siempre pequeñas, en blanco y nunca más
// grandes que la firma CAR-TEC. Ver CARTEC_DESIGN_SYSTEM.md §7.
import React from 'react';
import { AMG_D, AMG_VIEWBOX } from '../brand/amgPaths';
import { COLOR } from '../system/tokens';

/** Estrella de tres puntas en línea, construida geométricamente. */
export const MercedesStar: React.FC<{ size: number; color?: string; opacity?: number }> = ({ size, color = COLOR.blanco, opacity = 1 }) => {
  const R = 50;
  const at = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return `${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
  };
  const tips = [-90, 30, 150];
  const star = tips.flatMap((t) => [at(t, R * 0.86), at(t + 60, R * 0.15)]);
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block', opacity }}>
      <circle cx={50} cy={50} r={R - 2} fill="none" stroke={color} strokeWidth={3.2} />
      <circle cx={50} cy={50} r={R * 0.86} fill="none" stroke={color} strokeWidth={1.2} strokeOpacity={0.6} />
      <path d={`M${star.join('L')}Z`} fill="none" stroke={color} strokeWidth={2.4} strokeLinejoin="miter" />
      {/* Aristas de las tres puntas: mitad rellena para el relieve. */}
      {tips.map((t) => (
        <path key={t} d={`M50 50L${at(t, R * 0.86)}L${at(t + 60, R * 0.15)}Z`} fill={color} fillOpacity={0.35} />
      ))}
    </svg>
  );
};

/** Logotipo ///AMG relleno (vectorizado con scripts/trace-logo.py). */
export const AmgWordmark: React.FC<{ height: number; color?: string; opacity?: number }> = ({ height, color = COLOR.blanco, opacity = 1 }) => (
  <svg viewBox={AMG_VIEWBOX.join(' ')} height={height} width={(height * AMG_VIEWBOX[2]) / AMG_VIEWBOX[3]} style={{ display: 'block', opacity }}>
    <path d={AMG_D} fill={color} fillRule="evenodd" />
  </svg>
);

/** Fila de marcas: estrella + ///AMG, alineadas por el centro. */
export const BrandMarks: React.FC<{ star: number; amg: number; gap?: number; opacity?: number }> = ({ star, amg, gap = 18, opacity = 0.9 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap }}>
    <MercedesStar size={star} opacity={opacity} />
    <AmgWordmark height={amg} opacity={opacity} />
  </div>
);
