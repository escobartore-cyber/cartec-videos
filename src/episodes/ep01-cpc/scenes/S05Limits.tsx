import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { TagBelow } from '../../../components/Callout';
import { T as Txt } from '../../../components/Type';
import { Gauge } from '../../../parts/Gauge';
import { BAND, COLOR, SAFE } from '../../../system/tokens';
import { ease, mix, prog, shake, shot } from '../../../system/motion';
import { W } from '../timeline';

const CX = 540;
const CY = 900;
const R = 270;

/** Aguja que sube y se queda clavada en el límite con un pequeño rebote. */
const needle = (T: number, start: number, hit: number, limit: number) => {
  const rise = prog(T, start, hit - start, (x) => x * x);
  const bounce = T > hit ? Math.abs(Math.sin((T - hit) * 34)) * 0.035 * Math.exp(-(T - hit) * 2.5) : 0;
  return Math.min(limit, mix(0.05, limit, rise)) - bounce;
};

/** S05 — Las dos funciones que cita el guion: límite de par y, según modelo, velocidad máxima. */
export const S05Limits: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.segun]);
  const start = s === 0 ? W.entreEllas : W.segun;
  const hit = s === 0 ? W.parMotor + 0.1 : W.maxima;
  const limit = s === 0 ? 0.62 : 0.8;
  const drawn = prog(T, start, 0.4);
  return (
    <>
      <FadeUp T={T} start={start} style={{ left: 790, top: BAND.titulo + 36 }}>
        <Txt s="dato" color={COLOR.rojo}>
          {s === 0 ? '01 / 02' : '02 / 02'}
        </Txt>
      </FadeUp>
      <TitleReveal
        key={s}
        T={T}
        start={start}
        lines={s === 0 ? ['Límite', 'de par motor'] : ['Velocidad', 'máxima']}
        style={{ left: SAFE.left, top: BAND.titulo + 10 }}
      />
      <Cam scale={mix(1, 1.06, prog(T, start, 1.6, ease.lineal))} x={shake(T, hit, 10)} origin={[CX, CY]}>
        <Gauge cx={CX} cy={CY + 60} r={R} value={needle(T, start + 0.25, hit, limit)} limit={limit} draw={drawn} alert={T >= hit ? 1 : 0} label={s === 0 ? 'Par motor' : 'Velocidad'} sublabel={T >= hit ? 'Al límite' : ''} />
      </Cam>
      {s === 1 ? <TagBelow from={[CX + R * 0.62, CY - R * 0.35]} y={CY + R + 20} index="*" label="Según modelo" accent progress={prog(T, W.segun + 0.15, 0.4, ease.lineal)} /> : null}
    </>
  );
};
