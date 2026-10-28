import React from 'react';
import { Logo } from '../../../components/Logo';
import { T as Txt } from '../../../components/Type';
import { COLOR } from '../../../system/tokens';
import { ease, mix, prog } from '../../../system/motion';
import { W } from '../timeline';

/** S12 — Cierre de marca: se traza el techo del logo, entran las letras y el claim. */
export const S12Logo: React.FC<{ T: number }> = ({ T }) => {
  const t0 = W.finVoz;
  const roof = prog(T, t0 + 0.05, 0.6, ease.trazo);
  const letters = prog(T, t0 + 0.45, 0.35, ease.entrada);
  const tagline = prog(T, t0 + 0.8, 0.4, ease.entrada);
  const scale = mix(0.96, 1.0, prog(T, t0, 2, ease.camara));
  return (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', transform: `scale(${scale})` }}>
        <Logo height={330} tagline roof={roof} letters={letters} taglineOpacity={tagline} />
      </div>
      <Txt s="micro" color={COLOR.gris} style={{ position: 'absolute', left: 0, right: 0, top: 1150, textAlign: 'center', opacity: tagline }}>
        EP.01 — CPC · Mercedes-AMG
      </Txt>
    </>
  );
};
