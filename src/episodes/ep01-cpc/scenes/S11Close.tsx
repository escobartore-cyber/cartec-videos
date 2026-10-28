import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { BrandMarks } from '../../../components/BrandMarks';
import { T as Txt, typeCss } from '../../../components/Type';
import { AMG_GT_C190 as CAR } from '../../../parts/cars/amgGtC190';
import { CarSide, GroundAndAxes } from '../../../parts/cars/CarSide';
import { BAND, COLOR, SAFE } from '../../../system/tokens';
import { ease, mix, prog, shot } from '../../../system/motion';
import { W } from '../timeline';

const CHECKS = [
  { id: '01', unit: 'ECU', what: 'Motor', at: W.cadaVehiculo + 0.05 },
  { id: '02', unit: 'CPC', what: 'Límites', at: W.cadaVehiculo + 0.45 },
  { id: '03', unit: 'TCU', what: 'Cambio', at: W.cadaVehiculo + 0.85 },
];

/** S11 — Cierre: diagnóstico del AMG GT (barrido rojo) y comprobación de cada unidad. */
export const S11Close: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.cadaVehiculo]);
  const k = s === 0 ? 225 : 175;
  const ground = s === 0 ? 1180 : 860;
  const carX = (1080 - CAR.length * k) / 2 + (s === 0 ? 10 : 0);
  // Barrido de diagnóstico: una línea roja recorre el coche de atrás adelante.
  const scan = prog(T, W.enCartec + 0.15, 1.15, ease.camara);
  const scanX = mix(carX - 20, carX + CAR.length * k + 20, scan);
  return (
    <>
      <TitleReveal T={T} start={W.enCartec} lines={['Diagnóstico']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <FadeUp T={T} start={W.enCartec + 0.2} style={{ left: SAFE.left, top: BAND.titulo + 130 }}>
        <Txt s="etiqueta" color={COLOR.gris}>
          Cada vehículo, antes de reprogramar
        </Txt>
      </FadeUp>
      <Cam scale={mix(1, 1.04, prog(T, s === 0 ? W.enCartec : W.cadaVehiculo, 2.4, ease.lineal))} origin={[540, ground - 200]}>
        <GroundAndAxes car={CAR} x={carX} y={ground} k={k} from={0} to={1080} />
        <CarSide car={CAR} x={carX} y={ground} k={k} />
        {s === 0 && scan > 0 && scan < 1 ? (
          <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <linearGradient id="scan-glow" x1="0" x2="1">
                <stop offset="0" stopColor={COLOR.rojo} stopOpacity={0} />
                <stop offset="1" stopColor={COLOR.rojo} stopOpacity={0.28} />
              </linearGradient>
            </defs>
            <rect x={scanX - 140} y={ground - 1.45 * k} width={140} height={1.45 * k} fill="url(#scan-glow)" />
            <path d={`M${scanX} ${ground - 1.55 * k}V${ground + 20}`} stroke={COLOR.rojo} strokeWidth={3} />
          </svg>
        ) : null}
      </Cam>
      {s === 0 ? (
        <FadeUp T={T} start={W.enCartec + 0.4} style={{ right: 1080 - SAFE.right, top: 780 }}>
          <BrandMarks star={40} amg={16} gap={14} opacity={0.8} />
        </FadeUp>
      ) : null}
      {s === 1 ? (
        <div style={{ position: 'absolute', left: SAFE.left, top: 960, width: SAFE.rightRail.x - SAFE.left }}>
          {CHECKS.map((c) => {
            const p = prog(T, c.at, 0.3, ease.entrada);
            const ok = prog(T, c.at + 0.25, 0.2, ease.entrada);
            return (
              <div
                key={c.id}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 18,
                  padding: '14px 0',
                  borderTop: `1px solid rgba(255,255,255,${0.25 * p})`,
                  opacity: p,
                  transform: `translateX(${(1 - p) * -24}px)`,
                  ...typeCss('etiqueta'),
                  fontSize: 26,
                }}
              >
                <span style={{ color: COLOR.rojo }}>{c.id}</span>
                <span style={{ color: COLOR.blanco, width: 100 }}>{c.unit}</span>
                <span style={{ color: COLOR.gris, flex: 1 }}>{c.what}</span>
                <span style={{ color: COLOR.blanco, opacity: ok }}>Comprobado</span>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};
