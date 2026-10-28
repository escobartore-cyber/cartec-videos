import React from 'react';
import { COLOR, TYPE, TypeStyle } from '../system/tokens';

export const typeCss = (style: TypeStyle): React.CSSProperties => {
  const t = TYPE[style];
  return {
    fontFamily: `'${t.family}'`,
    fontWeight: t.weight,
    fontSize: t.size,
    lineHeight: t.lineHeight,
    letterSpacing: `${t.tracking}em`,
    textTransform: t.upper ? 'uppercase' : 'none',
    fontFeatureSettings: '"tnum" 1',
  };
};

/** Texto tipado por el sistema: el estilo siempre viene de TYPE, nunca a mano. */
export const T: React.FC<{
  s: TypeStyle;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ s, color = COLOR.blanco, opacity = 1, style, children }) => (
  <div style={{ ...typeCss(s), color, opacity, whiteSpace: 'pre-line', ...style }}>{children}</div>
);

/** Marca roja de sección: barra de 48×4 px. */
export const RedRule: React.FC<{ width?: number; style?: React.CSSProperties }> = ({ width = 48, style }) => (
  <div style={{ width, height: 4, backgroundColor: COLOR.rojo, ...style }} />
);

/** Etiqueta técnica con índice opcional en rojo: "04 — LÍMITES DE PAR". */
export const Label: React.FC<{ index?: string; children: React.ReactNode; color?: string; style?: React.CSSProperties }> = ({
  index,
  children,
  color = COLOR.gris,
  style,
}) => (
  <div style={{ ...typeCss('etiqueta'), color, display: 'flex', gap: 14, ...style }}>
    {index ? <span style={{ color: COLOR.rojo }}>{index}</span> : null}
    <span>{children}</span>
  </div>
);
