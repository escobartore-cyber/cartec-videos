import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { T as Txt } from '../../../components/Type';
import type { Camera } from '../../../draw/line3d';
import { Line3D } from '../../../draw/Line3D';
import { controlUnit } from '../../../parts/controlUnit';
import { Padlock } from '../../../parts/Padlock';
import { BAND, COLOR, SAFE } from '../../../system/tokens';
import { ease, mix, prog, shake, shot } from '../../../system/motion';
import { W } from '../timeline';

/** S07 — El CPC sigue con sus límites originales: un candado se cierra sobre él. */
export const S07Locked: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.manteniendo]);
  const yaw = 20 + (T - W.elCpc) * 22;
  const camera: Camera =
    s === 0
      ? { yaw, elev: 32, dist: 110, target: [0, 2, 0], scale: 30, cx: 540, cy: 900 }
      : { yaw, elev: 32, dist: 110, target: [0, 2, 0], scale: 19, cx: 540, cy: 1060 };
  const { parts } = controlUnit({ variant: 'cpc', style: 'accent', draw: prog(T, W.elCpc, 0.5) });
  // El arco baja y encaja justo en "límites".
  const open = 1 - prog(T, W.limitesOrig - 0.28, 0.28, (x) => x * x * x);
  const locked = T >= W.limitesOrig;
  return (
    <>
      {s === 0 ? (
        <>
          <TitleReveal T={T} start={W.elCpc} lines={['CPC']} s="portada" color={COLOR.rojo} style={{ left: SAFE.left, top: BAND.titulo }} />
          <FadeUp T={T} start={W.elCpc + 0.2} style={{ left: SAFE.left, top: BAND.titulo + 190 }}>
            <Txt s="etiqueta" color={COLOR.gris}>
              Sin modificar
            </Txt>
          </FadeUp>
        </>
      ) : (
        <TitleReveal T={T} start={W.manteniendo} lines={['Límites', 'originales']} style={{ left: SAFE.left, top: BAND.titulo }} />
      )}
      <Cam scale={mix(1, 1.05, prog(T, W.elCpc, 2.4, ease.lineal))} x={shake(T, W.limitesOrig, 12)} origin={[540, 960]}>
        <Line3D parts={parts} camera={camera} />
        {s === 1 ? <Padlock cx={540} cy={800} size={180} open={open} draw={prog(T, W.manteniendo, 0.35)} color={locked ? COLOR.rojo : COLOR.blanco} /> : null}
      </Cam>
      {s === 1 ? (
        <FadeUp T={T} start={W.limitesOrig} style={{ left: SAFE.left, top: 1200 }}>
          <Txt s="etiqueta">
            <span style={{ color: COLOR.rojo }}>Estado · </span>bloqueado · valores de fábrica
          </Txt>
        </FadeUp>
      ) : null}
    </>
  );
};
