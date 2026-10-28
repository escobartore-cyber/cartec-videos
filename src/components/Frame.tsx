import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { ALPHA, CANVAS, COLOR, GRID } from '../system/tokens';

const { width: W, height: H } = CANVAS;

/** Retícula técnica de fondo: celda menor 40 px, mayor 120 px. */
export const Grid: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  const minor: string[] = [];
  const major: string[] = [];
  for (let x = 0; x <= W; x += GRID.celdaMenor) (x % GRID.celdaMayor === 0 ? major : minor).push(`M${x} 0V${H}`);
  for (let y = 0; y <= H; y += GRID.celdaMenor) (y % GRID.celdaMayor === 0 ? major : minor).push(`M0 ${y}H${W}`);
  return (
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0, opacity }}>
      <path d={minor.join('')} stroke={COLOR.blanco} strokeOpacity={ALPHA.reticulaMenor} strokeWidth={1} />
      <path d={major.join('')} stroke={COLOR.blanco} strokeOpacity={ALPHA.reticulaMayor} strokeWidth={1} />
    </svg>
  );
};

/** Grano de película animado: cambia de semilla cada fotograma. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0, opacity, mixBlendMode: 'screen', pointerEvents: 'none' }}>
      <filter id="cartec-grain">
        <feTurbulence type="fractalNoise" baseFrequency={0.85} numOctaves={2} seed={frame % 97} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width={W} height={H} filter="url(#cartec-grain)" />
    </svg>
  );
};

/** Viñeta: oscurece bordes para concentrar la mirada. */
export const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: 'radial-gradient(ellipse 85% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)',
      pointerEvents: 'none',
    }}
  />
);

/** Marcas de registro en las esquinas y cruces de corte, como en una lámina técnica. */
export const RegistrationMarks: React.FC = () => {
  const m = 40;
  const l = 28;
  const corners = [
    `M${m} ${m + l}V${m}H${m + l}`,
    `M${W - m - l} ${m}H${W - m}V${m + l}`,
    `M${m} ${H - m - l}V${H - m}H${m + l}`,
    `M${W - m - l} ${H - m}H${W - m}V${H - m - l}`,
  ];
  const cross = (x: number, y: number, s = 14) => `M${x - s} ${y}H${x + s}M${x} ${y - s}V${y + s}`;
  return (
    <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
      <path d={corners.join('')} stroke={COLOR.blanco} strokeOpacity={0.5} strokeWidth={1.5} fill="none" />
      <path d={cross(W - 112, H - 112) + cross(112, 112)} stroke={COLOR.blanco} strokeOpacity={0.35} strokeWidth={1} />
    </svg>
  );
};

/**
 * Lienzo base de toda escena CAR-TEC: negro, retícula, contenido, viñeta, grano y marcas.
 * Ninguna escena se compone fuera de este marco.
 */
export const Frame: React.FC<{ children?: React.ReactNode; grid?: number; marks?: boolean }> = ({
  children,
  grid = 1,
  marks = true,
}) => (
  <AbsoluteFill style={{ backgroundColor: COLOR.negro, overflow: 'hidden' }}>
    <Grid opacity={grid} />
    {children}
    <Vignette />
    <Grain />
    {marks ? <RegistrationMarks /> : null}
  </AbsoluteFill>
);
