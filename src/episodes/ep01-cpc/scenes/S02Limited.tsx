import React from 'react';
import { TagBelow } from '../../../components/Callout';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { T as Txt, typeCss } from '../../../components/Type';
import { Gauge } from '../../../parts/Gauge';
import { BAND, COLOR, SAFE } from '../../../system/tokens';
import { ease, mix, prog, shake, shot } from '../../../system/motion';
import { W } from '../timeline';

const CX = 540;
const CY = 880;
const R = 300;
const LIMIT = 0.66;

/** S02 — La aguja sube y choca contra un tope electrónico en "limitada". */
export const S02Limited: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.limitada, W.electronicamente]);
  const draw = prog(T, W.ySeguir, 0.45);
  // Sube acelerando hasta el tope; después rebota contra él, como un limitador.
  const rise = prog(T, W.ySeguir + 0.35, W.limitada - W.ySeguir - 0.35, (x) => x * x);
  const bounce = T > W.limitada ? Math.abs(Math.sin((T - W.limitada) * 38)) * 0.045 * Math.exp(-(T - W.limitada) * 2.2) : 0;
  const value = Math.min(LIMIT, mix(0.04, LIMIT, rise)) - bounce;
  const hit = T >= W.limitada ? 1 : 0;
  const stamp = prog(T, W.limitada, 0.22, ease.entrada);
  const a = ((135 + 270 * LIMIT) * Math.PI) / 180;
  const stop: [number, number] = [CX + R * Math.cos(a), CY + R * Math.sin(a)];
  const camScale = s === 1 ? 1.35 : s === 2 ? 1.02 : mix(1, 1.06, prog(T, W.ySeguir, 1.2, ease.lineal));
  const sx = shake(T, W.limitada, 16);
  return (
    <>
      <TitleReveal T={T} start={W.ySeguir} lines={['Potencia']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Cam scale={camScale} origin={s === 1 ? stop : [CX, CY]} x={sx}>
        <Gauge cx={CX} cy={CY} r={R} value={value} limit={LIMIT} draw={draw} alert={hit} label="Potencia" sublabel={hit ? 'Limitada' : 'Entrega'} />
      </Cam>
      <div
        style={{
          position: 'absolute',
          left: 600,
          top: BAND.titulo + 110,
          transform: `scale(${mix(1.6, 1, stamp)}) rotate(-6deg)`,
          opacity: stamp,
          border: `4px solid ${COLOR.rojo}`,
          padding: '10px 18px 6px',
          ...typeCss('subtitulos'),
          fontSize: 54,
          color: COLOR.rojo,
        }}
      >
        Limitada
      </div>
      {s === 2 ? <TagBelow from={[stop[0] - 6, stop[1] + 40]} y={CY + R + 40} index="!" label="Límite electrónico" accent progress={prog(T, W.electronicamente, 0.45)} /> : null}
      <FadeUp T={T} start={W.ySeguir + 0.3} style={{ left: SAFE.left, top: BAND.titulo + 150 }}>
        <Txt s="etiqueta" color={COLOR.gris}>
          Salida del motor
        </Txt>
      </FadeUp>
    </>
  );
};
