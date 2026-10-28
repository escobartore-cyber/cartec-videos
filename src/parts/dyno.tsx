// Banco de potencia de rodillos (alzado 2D) y gráfica de banco. Ilustrativos y sin
// cifras: las curvas tienen la forma típica de un motor turbo, no datos medidos.
import React from 'react';
import { monotone } from '../charts/TorqueChart';
import { T as Txt } from '../components/Type';
import { COLOR, STROKE } from '../system/tokens';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const dash = (p: number) => (p < 1 ? { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - clamp01(p) } : {});

/** Rodillo visto de lado con radios para que se lea el giro. */
const Roller: React.FC<{ cx: number; cy: number; r: number; spin: number; p: number }> = ({ cx, cy, r, spin, p }) => (
  <g opacity={clamp01(p * 2)}>
    <circle cx={cx} cy={cy} r={r} fill={COLOR.negro} stroke={COLOR.blanco} strokeWidth={STROKE.silueta} {...dash(p)} />
    <g transform={`rotate(${spin.toFixed(1)} ${cx} ${cy})`}>
      {[0, 60, 120].map((a) => (
        <path key={a} d={`M${cx - Math.cos((a * Math.PI) / 180) * r * 0.8} ${cy - Math.sin((a * Math.PI) / 180) * r * 0.8}L${cx + Math.cos((a * Math.PI) / 180) * r * 0.8} ${cy + Math.sin((a * Math.PI) / 180) * r * 0.8}`} stroke={COLOR.blanco} strokeWidth={STROKE.detalle} strokeOpacity={0.6} />
      ))}
    </g>
    <circle cx={cx} cy={cy} r={r * 0.14} fill={COLOR.negro} stroke={COLOR.blanco} strokeWidth={STROKE.detalle} />
  </g>
);

/**
 * Banco en el suelo `y`. `wheels`: x en px de los ejes del coche (un par de rodillos
 * bajo cada rueda). `spin` en grados; `draw` 0–1; `fan` muestra el ventilador en `fanX`.
 */
export const DynoRig: React.FC<{ y: number; wheels: number[]; r?: number; spin: number; draw?: number; fanX?: number; accent?: boolean }> = ({ y, wheels, r = 26, spin, draw = 1, fanX, accent }) => {
  const pitW = r * 4.2;
  return (
    <g>
      {wheels.map((x, i) => (
        <g key={i}>
          <path d={`M${x - pitW / 2} ${y}V${y + r * 2.6}H${x + pitW / 2}V${y}`} fill="none" stroke={accent ? COLOR.rojo : COLOR.blanco} strokeWidth={STROKE.arista} {...dash(draw)} />
          <Roller cx={x - r * 1.05} cy={y + r * 0.25} r={r} spin={spin} p={draw} />
          <Roller cx={x + r * 1.05} cy={y + r * 0.25} r={r} spin={spin} p={draw} />
        </g>
      ))}
      {fanX !== undefined ? (
        <g opacity={clamp01((draw - 0.4) * 2)}>
          <rect x={fanX - 40} y={y - 230} width={80} height={230} fill={COLOR.negro} stroke={COLOR.blanco} strokeWidth={STROKE.silueta} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={`g${i}`} d={`M${fanX - 30} ${y - 190 + i * 16}H${fanX + 30}`} stroke={COLOR.blanco} strokeWidth={STROKE.detalle} strokeOpacity={0.35} />
          ))}
          <g transform={`rotate(${(spin * 1.6).toFixed(1)} ${fanX} ${y - 150})`}>
            {[0, 60, 120, 180, 240, 300].map((a) => {
              const r0 = (a * Math.PI) / 180;
              const r1 = r0 + 0.5;
              return <path key={a} d={`M${fanX} ${y - 150}Q${fanX + Math.cos(r0) * 22} ${y - 150 + Math.sin(r0) * 22} ${fanX + Math.cos(r1) * 28} ${y - 150 + Math.sin(r1) * 28}`} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.arista} />;
            })}
          </g>
        </g>
      ) : null}
    </g>
  );
};

type Pt = [number, number];
/** Par normalizado (forma típica de un turbo) para una prueba; `gain` desplaza la meseta. */
const torqueShape = (gain: number): Pt[] => [
  [1500, 0.42 + gain * 0.05], [2000, 0.7 + gain * 0.12], [2500, 0.8 + gain * 0.16], [3500, 0.8 + gain * 0.16], [4500, 0.78 + gain * 0.13], [5500, 0.64 + gain * 0.08], [6500, 0.42 + gain * 0.04],
];

export type DynoBox = { x0: number; x1: number; y0: number; y1: number };
export const DYNO_BOX: DynoBox = { x0: 150, x1: 930, y0: 640, y1: 1140 };
const RPM0 = 1500;
const RPM1 = 6500;

/** Curvas de potencia y par de una prueba (0–1 en Y). */
export const dynoCurves = (gain = 0) => {
  const tq = monotone(torqueShape(gain));
  const pw = (rpm: number) => (tq(rpm) * rpm) / 5200;
  return { tq, pw };
};

/**
 * Gráfica de banco: eje rpm, curvas de potencia (gruesa) y par (fina), cursor de
 * barrido. `runs`: pruebas a dibujar ({gain, draw, color, dashed}). `cursor` 0–1 posición del barrido.
 */
export const DynoChart: React.FC<{
  box?: DynoBox;
  axes?: number;
  runs: { gain: number; draw: number; color?: string; dashed?: boolean; label?: string }[];
  cursor?: number;
  dropZone?: number;
}> = ({ box = DYNO_BOX, axes = 1, runs, cursor, dropZone = 0 }) => {
  const X = (rpm: number) => box.x0 + ((rpm - RPM0) / (RPM1 - RPM0)) * (box.x1 - box.x0);
  const Y = (v: number) => box.y1 - v * (box.y1 - box.y0);
  const path = (g: (r: number) => number, upto: number) => {
    const n = Math.max(2, Math.round(120 * upto));
    return [...Array(n + 1).keys()].map((i) => {
      const r = RPM0 + ((RPM1 - RPM0) * upto * i) / n;
      return `${i ? 'L' : 'M'}${X(r).toFixed(1)} ${Y(g(r)).toFixed(1)}`;
    }).join('');
  };
  const ticks = [2000, 3000, 4000, 5000, 6000];
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <g opacity={axes}>
          <path d={`M${box.x0} ${box.y0 - 20}V${box.y1}H${box.x1 + 20}`} fill="none" stroke={COLOR.gris} strokeWidth={STROKE.arista} />
          {ticks.map((t) => (
            <path key={t} d={`M${X(t)} ${box.y1}v10`} stroke={COLOR.gris} strokeWidth={STROKE.detalle} />
          ))}
        </g>
        {dropZone > 0 ? <rect x={X(5200)} y={box.y0 - 20} width={X(RPM1) - X(5200)} height={box.y1 - box.y0 + 20} fill={COLOR.rojo} opacity={0.12 * dropZone} /> : null}
        {runs.map((run, i) => {
          const { tq, pw } = dynoCurves(run.gain);
          const c = run.color ?? COLOR.blanco;
          return run.draw > 0 ? (
            <g key={i}>
              <path d={path(pw, run.draw)} fill="none" stroke={c} strokeWidth={STROKE.curva} strokeLinecap="round" strokeDasharray={run.dashed ? '14 10' : undefined} />
              <path d={path(tq, run.draw)} fill="none" stroke={c} strokeWidth={2} strokeOpacity={0.7} strokeDasharray={run.dashed ? '8 8' : undefined} />
            </g>
          ) : null;
        })}
        {cursor !== undefined && cursor > 0 && cursor < 1 ? <path d={`M${X(RPM0 + (RPM1 - RPM0) * cursor)} ${box.y0 - 20}V${box.y1}`} stroke={COLOR.rojo} strokeWidth={STROKE.arista} /> : null}
      </svg>
      <div style={{ position: 'absolute', left: box.x0, top: box.y1 + 22, width: box.x1 - box.x0, opacity: axes }}>
        {ticks.map((t) => (
          <Txt key={t} s="micro" color={COLOR.gris} style={{ position: 'absolute', left: X(t) - box.x0 - 24 }}>
            {t}
          </Txt>
        ))}
        <Txt s="micro" color={COLOR.gris} style={{ position: 'absolute', left: box.x1 - box.x0 - 10, top: 26 }}>
          rpm
        </Txt>
      </div>
      <div style={{ position: 'absolute', left: box.x0, top: box.y0 - 70, display: 'flex', gap: 28, opacity: axes }}>
        <Txt s="micro">━ Potencia</Txt>
        <Txt s="micro" color={COLOR.gris}>
          ─ Par
        </Txt>
      </div>
    </>
  );
};
