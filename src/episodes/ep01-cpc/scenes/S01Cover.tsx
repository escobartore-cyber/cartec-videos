import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { T as Txt } from '../../../components/Type';
import { AMG_GT_C190 as CAR } from '../../../parts/cars/amgGtC190';
import { CarSide, GroundAndAxes } from '../../../parts/cars/CarSide';
import { BAND, COLOR, SAFE } from '../../../system/tokens';
import { ease, mix, prog, shot } from '../../../system/motion';
import { W } from '../timeline';

const K = 250; // px por metro
const GROUND = 1200;

/** S01 — Portada: el AMG GT se traza solo; en "un Mercedes-AMG" corta a plano general con el titular. */
export const S01Cover: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.mercedesAmg]);
  // El coche avanza despacio hacia la derecha y las llantas giran en proporción.
  const travel = T * 26;
  const carX = -150 + travel;
  const spin = (travel / (2 * Math.PI * CAR.tireR * K)) * 360;
  const draw = prog(T, 0.0, 1.0, ease.trazo);
  const front: [number, number] = [carX + CAR.frontAxle * K, GROUND - 260];
  const cam =
    s === 0
      ? { scale: mix(1.75, 1.85, prog(T, 0, W.mercedesAmg, ease.lineal)), origin: front, y: -330 }
      : { scale: mix(1, 1.03, prog(T, W.mercedesAmg, 1, ease.lineal)), origin: [540, 960] as [number, number], y: 0 };
  return (
    <>
      <Cam scale={cam.scale} origin={cam.origin} y={cam.y}>
        <GroundAndAxes car={CAR} x={carX} y={GROUND} k={K} from={0} to={1080} draw={prog(T, 0, 0.8)} />
        <CarSide car={CAR} x={carX} y={GROUND} k={K} draw={draw} spin={spin} />
        <Txt s="micro" color={COLOR.gris} style={{ position: 'absolute', left: carX + CAR.frontAxle * K + 16, top: GROUND + 30, opacity: draw }}>
          Eje delantero
        </Txt>
        <Txt s="micro" color={COLOR.gris} style={{ position: 'absolute', left: Math.max(SAFE.left, carX + CAR.rearAxle * K + 16), top: GROUND + 30, opacity: draw }}>
          Eje trasero
        </Txt>
      </Cam>
      {s === 1 ? (
        <>
          <TitleReveal T={T} start={W.mercedesAmg} lines={['Mercedes', '-AMG']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" style={{ left: SAFE.left, top: BAND.titulo }} />
          <FadeUp T={T} start={W.mercedesAmg + 0.25} style={{ left: 676, top: BAND.titulo + 176 }}>
            {['AMG GT', 'Coupé · C190', 'Motor V8 biturbo', 'Transaxle trasero'].map((t) => (
              <Txt key={t} s="micro" color={COLOR.gris}>
                {t}
              </Txt>
            ))}
          </FadeUp>
        </>
      ) : null}
      <Txt s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
        Mercedes-AMG GT · alzado lateral · esquema ilustrativo
      </Txt>
    </>
  );
};
