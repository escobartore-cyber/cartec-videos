// Piezas de animación reutilizables: entrada de títulos, fundidos, cámara y
// barrido entre escenas. Todas reciben T (segundos globales).
import React from 'react';
import { COLOR, TypeStyle } from '../system/tokens';
import { ease, mix, prog, WHIP_IN, WHIP_OUT } from '../system/motion';
import { typeCss } from './Type';

/** Título que entra línea a línea desde una máscara, con la marca roja creciendo antes. */
export const TitleReveal: React.FC<{
  T: number;
  start: number;
  lines: string[];
  s?: TypeStyle;
  color?: string;
  colors?: string[];
  rule?: boolean;
  style?: React.CSSProperties;
  size?: number;
}> = ({ T, start, lines, s = 'titulo', color = COLOR.blanco, colors, rule = true, style, size }) => (
  <div style={{ position: 'absolute', ...style }}>
    {rule ? <div style={{ width: 48 * prog(T, start, 0.25, ease.entrada), height: 4, backgroundColor: COLOR.rojo, marginBottom: 28 }} /> : null}
    {lines.map((line, i) => {
      const p = prog(T, start + 0.06 + i * 0.08, 0.38, ease.entrada);
      return (
        <div key={i} style={{ overflow: 'hidden', paddingBottom: 6, marginBottom: -6 }}>
          <div style={{ ...typeCss(s), ...(size ? { fontSize: size } : {}), color: colors?.[i] ?? color, transform: `translateY(${(1 - p) * 105}%)`, whiteSpace: 'pre' }}>
            {line}
          </div>
        </div>
      );
    })}
  </div>
);

/** Aparición suave: sube 12 px y funde. */
export const FadeUp: React.FC<{ T: number; start: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties; dist?: number }> = ({
  T,
  start,
  dur = 0.3,
  children,
  style,
  dist = 12,
}) => {
  const p = prog(T, start, dur, ease.entrada);
  return <div style={{ position: 'absolute', opacity: p, transform: `translateY(${(1 - p) * dist}px)`, ...style }}>{children}</div>;
};

/** Cámara 2D: escala y desplazamiento alrededor de un punto de interés. */
export const Cam: React.FC<{ scale?: number; x?: number; y?: number; origin?: [number, number]; rotate?: number; children: React.ReactNode }> = ({
  scale = 1,
  x = 0,
  y = 0,
  origin = [540, 960],
  rotate = 0,
  children,
}) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
      transformOrigin: `${origin[0]}px ${origin[1]}px`,
    }}
  >
    {children}
  </div>
);

/**
 * Contenedor de escena con barrido de entrada y salida: desplazamiento lateral
 * con desenfoque de movimiento horizontal (6 fotogramas de entrada, 4 de salida).
 */
export const SceneShell: React.FC<{ T: number; from: number; to: number; id: string; enter?: boolean; exit?: boolean; children: React.ReactNode }> = ({
  T,
  from,
  to,
  id,
  enter = true,
  exit = true,
  children,
}) => {
  const pin = enter ? prog(T, from, WHIP_IN, ease.entrada) : 1;
  const pout = exit ? prog(T, to - WHIP_OUT, WHIP_OUT, ease.salida) : 0;
  const x = mix(260, 0, pin) + mix(0, -260, pout);
  const blur = (1 - pin) * 38 + pout * 38;
  const opacity = Math.min(mix(0.2, 1, pin), mix(1, 0.2, pout));
  return (
    <div style={{ position: 'absolute', inset: 0, transform: `translateX(${x}px)`, opacity, filter: blur > 0.5 ? `url(#whip-${id})` : undefined }}>
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <filter id={`whip-${id}`} x="-20%" y="-5%" width="140%" height="110%">
          <feGaussianBlur stdDeviation={`${blur.toFixed(1)} 0`} />
        </filter>
      </svg>
      {children}
    </div>
  );
};
