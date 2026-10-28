import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { T as Txt } from '../../../components/Type';
import type { Camera } from '../../../draw/line3d';
import { Line3D } from '../../../draw/Line3D';
import { CalibrationMap, mapAxesAnchors } from '../../../parts/CalibrationMap';
import { controlUnit } from '../../../parts/controlUnit';
import { Padlock } from '../../../parts/Padlock';
import { BAND, COLOR, SAFE } from '../../../system/tokens';
import { ease, mix, prog, shake, shot } from '../../../system/motion';
import { W } from '../timeline';

/** S09 — Desbloqueo del CPC (se abre el candado) y recalibración de su mapa de límites. */
export const S09Unlock: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.desbloquear, W.recalibrar]);
  if (s === 2) {
    const camera: Camera = { yaw: -38 + (T - W.recalibrar) * 10, elev: 30, dist: 160, target: [0, 4, 0], scale: 17, cx: 540, cy: 960 };
    const level = prog(T, W.recalibrar + 0.1, 0.9, ease.camara);
    const ax = mapAxesAnchors(camera);
    return (
      <>
        <TitleReveal T={T} start={W.recalibrar} lines={['Recalibración']} style={{ left: SAFE.left, top: BAND.titulo }} />
        <FadeUp T={T} start={W.recalibrar + 0.15} style={{ left: SAFE.left, top: BAND.titulo + 130 }}>
          <Txt s="etiqueta" color={COLOR.gris}>
            Mapa de límites del CPC
          </Txt>
        </FadeUp>
        <CalibrationMap camera={camera} level={level} draw={prog(T, W.recalibrar, 0.4)} sweep={level < 1 ? prog(T, W.recalibrar + 0.1, 0.9, ease.lineal) : undefined} />
        <Txt s="micro" color={COLOR.gris} style={{ position: 'absolute', left: ax.rpm[0], top: ax.rpm[1] + 10 }}>
          rpm
        </Txt>
        <Txt s="micro" color={COLOR.gris} style={{ position: 'absolute', left: ax.carga[0] + 10, top: ax.carga[1] }}>
          Carga
        </Txt>
        <FadeUp T={T} start={W.elCpcFin} style={{ left: SAFE.left, top: 1200 }}>
          <Txt s="etiqueta">
            <span style={{ color: COLOR.rojo }}>→ </span>Límites ajustados al nuevo motor
          </Txt>
        </FadeUp>
      </>
    );
  }
  // Planos A y B: el CPC con el candado, que se abre en "desbloquear".
  const yaw = 24 + (T - W.porEso) * 12;
  const camera: Camera = { yaw, elev: 32, dist: 110, target: [0, 2, 0], scale: 19, cx: 540, cy: 1060 };
  const open = prog(T, W.desbloquear, 0.28, ease.entrada);
  const unlocked = T >= W.desbloquear;
  const { parts } = controlUnit({ variant: 'cpc', style: unlocked ? 'line' : 'accent', draw: prog(T, W.porEso, 0.5) });
  return (
    <>
      <TitleReveal T={T} start={W.porEso} lines={['Desbloqueo']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <FadeUp T={T} start={W.determinados} style={{ left: SAFE.left, top: BAND.titulo + 130 }}>
        <Txt s="entradilla" color={COLOR.gris}>
          En determinados AMG
        </Txt>
      </FadeUp>
      <Cam scale={s === 1 ? 1.12 : mix(1, 1.05, prog(T, W.porEso, 2, ease.lineal))} x={shake(T, W.desbloquear, 10)} origin={[540, 900]}>
        <Line3D parts={parts} camera={camera} />
        <Padlock cx={540} cy={800} size={180} open={open} draw={prog(T, W.porEso, 0.4)} color={unlocked ? COLOR.blanco : COLOR.rojo} />
      </Cam>
      <FadeUp T={T} start={unlocked ? W.desbloquear + 0.1 : W.amgNecesario} style={{ left: SAFE.left, top: 1200 }}>
        <Txt s="etiqueta">
          <span style={{ color: COLOR.rojo }}>Estado · </span>
          {unlocked ? 'desbloqueado' : 'bloqueado'}
        </Txt>
      </FadeUp>
    </>
  );
};
