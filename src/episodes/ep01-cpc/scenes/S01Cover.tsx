import React from 'react';
import { Frame } from '../../../components/Frame';
import { Signature } from '../../../components/Signature';
import { Subtitles } from '../../../components/Subtitles';
import { RedRule, T } from '../../../components/Type';
import { CAR_AXLES, CarSide, GroundAndAxes } from '../../../parts/CarSide';
import { BAND, COLOR, SAFE } from '../../../system/tokens';
import { EP01 } from '../config';
import { CUES } from '../cues';

/** S01 — Portada: titular Mercedes-AMG y alzado lateral del coche, recortado por el encuadre. */
export const S01Cover: React.FC<{ time: number; carX?: number }> = ({ time, carX = -345 }) => {
  const k = 280; // px por metro
  const ground = 1200;
  const ax = (m: number) => carX + m * k;
  return (
    <Frame>
      <Signature episode={EP01.code} figure={EP01.fig(1)} />

      <div style={{ position: 'absolute', left: SAFE.left, top: BAND.titulo }}>
        <RedRule />
        <T s="portada" style={{ marginTop: 28 }}>
          Mercedes
        </T>
        <T s="portada" color={COLOR.rojo}>
          -AMG
        </T>
      </div>

      <div style={{ position: 'absolute', left: 676, top: BAND.titulo + 176, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {['Motor', 'Transmisión', 'Cadena cinemática', 'Electrónica'].map((s) => (
          <T key={s} s="micro" color={COLOR.gris}>
            {s}
          </T>
        ))}
      </div>

      <GroundAndAxes x={carX} y={ground} k={k} from={0} to={1080} />
      <CarSide x={carX} y={ground} k={k} />

      <T s="micro" color={COLOR.gris} style={{ position: 'absolute', right: 1080 - ax(CAR_AXLES.front) + 14, top: ground + 30 }}>
        Eje delantero
      </T>
      <T s="micro" color={COLOR.gris} style={{ position: 'absolute', left: Math.max(SAFE.left, ax(CAR_AXLES.rear) + 14), top: ground + 30 }}>
        Eje trasero
      </T>

      <Subtitles cues={CUES} time={time} keywords={[...EP01.keywords]} />

      <T s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
        Alzado lateral · esquema ilustrativo
      </T>
    </Frame>
  );
};
