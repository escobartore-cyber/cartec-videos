import React from 'react';
import { LOGO_RED, LOGO_ROOF, LOGO_TAGLINE, LOGO_VIEWBOX, LOGO_VIEWBOX_COMPACT, LOGO_WHITE } from '../brand/logoPaths';
import { COLOR } from '../system/tokens';

/**
 * Logo oficial CAR-TEC por partes. `roof` (0–1) revela la línea del techo de
 * izquierda a derecha; `letters` y `tagline` controlan la opacidad de cada bloque.
 */
export const Logo: React.FC<{
  height: number;
  tagline?: boolean;
  roof?: number;
  letters?: number;
  taglineOpacity?: number;
  ink?: string;
}> = ({ height, tagline = false, roof = 1, letters = 1, taglineOpacity = 1, ink = COLOR.blanco }) => {
  const vb = tagline ? LOGO_VIEWBOX : LOGO_VIEWBOX_COMPACT;
  const [x, y, w, h] = vb;
  const id = React.useId().replace(/:/g, '');
  return (
    <svg viewBox={vb.join(' ')} height={height} width={(height * w) / h} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <clipPath id={`roof-${id}`}>
          <rect x={x} y={y} width={w * roof} height={h} />
        </clipPath>
      </defs>
      <g fill={ink} clipPath={`url(#roof-${id})`}>
        {LOGO_ROOF.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g opacity={letters}>
        <g fill={ink}>
          {LOGO_WHITE.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g fill={COLOR.rojo}>
          {LOGO_RED.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      </g>
      {tagline ? (
        <g fill={ink} fillRule="evenodd" opacity={taglineOpacity}>
          {LOGO_TAGLINE.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
      ) : null}
    </svg>
  );
};
