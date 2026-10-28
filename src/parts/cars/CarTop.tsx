// Vista en planta de un coche con su cadena cinemática (frontal hacia arriba).
// Carrocería en línea continua, neumáticos como líneas ocultas (discontinuas) y
// los órganos de la transmisión dibujados encima.
import React from 'react';
import { makePen, P } from '../../draw/pen';
import { COLOR, STROKE } from '../../system/tokens';
import type { CarProfile } from './types';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Mapeo planta → píxeles: x del coche (m) hacia arriba, semiancho hacia la derecha. */
export const topMapper = (car: CarProfile, cx: number, cy: number, k: number) => (p: P): P => [cx + p[1] * k, cy - (p[0] - car.length / 2) * k];

export type TopAnchors = { motor: P; tubo: P; caja: P; diferencial: P; ruedaTrasera: P };

export const topAnchors = (car: CarProfile, cx: number, cy: number, k: number): TopAnchors => {
  const m = topMapper(car, cx, cy, k);
  const d = car.drivetrain;
  return {
    motor: m([(d.engine.from + d.engine.to) / 2, -d.engine.halfWidth]),
    tubo: m([(d.shaft.from + d.shaft.to) / 2, -d.shaft.halfWidth]),
    caja: m([d.gearbox.from + 0.08, -d.gearbox.halfWidth]),
    diferencial: m([d.differential.x, d.differential.r]),
    ruedaTrasera: m([car.rearAxle, car.top.track.rear / 2 + car.top.tire.width / 2]),
  };
};

/**
 * `draw` traza la carrocería; `parts` (0–1) revela motor → tubo → caja → palieres;
 * `flow` (0–1) hace avanzar un pulso rojo desde el motor hasta las ruedas.
 */
export const CarTop: React.FC<{ car: CarProfile; cx: number; cy: number; k: number; draw?: number; parts?: number; flow?: number }> = ({
  car,
  cx,
  cy,
  k,
  draw = 1,
  parts = 1,
  flow = 0,
}) => {
  const toPx = topMapper(car, cx, cy, k);
  const pen = makePen(toPx);
  const half = car.top.outline;
  const mirror = (pts: P[]): P[] => pts.map(([x, w]) => [x, -w]);
  const outline = pen.spline([...half, ...mirror(half).reverse().slice(1)]);
  const gh = car.top.greenhouse;
  const greenhouse = pen.spline([...gh, ...mirror(gh).reverse()]) + `L${pen.fmt(gh[0])}`;
  const breaks = car.top.glassBreaks
    .map((x) => {
      const w = gh.reduce((acc, [gx, gw]) => (gx <= x ? gw : acc), gh[0][1]);
      return pen.poly([[x, -w], [x, w]]);
    })
    .join('');
  const tire = (ax: number, side: number, track: number) => {
    const { width, length } = car.top.tire;
    const c = (side * track) / 2;
    return pen.poly([[ax - length / 2, c - width / 2], [ax + length / 2, c - width / 2], [ax + length / 2, c + width / 2], [ax - length / 2, c + width / 2]], true);
  };
  const tires = [-1, 1].flatMap((s) => [tire(car.frontAxle, s, car.top.track.front), tire(car.rearAxle, s, car.top.track.rear)]).join('');
  const domes = pen.spline([[2.85, 0.24], [3.6, 0.27], [4.15, 0.24]]) + pen.spline([[2.85, -0.24], [3.6, -0.27], [4.15, -0.24]]);

  const d = car.drivetrain;
  const rect = (from: number, to: number, hw: number) => pen.poly([[from, -hw], [to, -hw], [to, hw], [from, hw]], true);
  const engine = rect(d.engine.from, d.engine.to, d.engine.halfWidth);
  const banks = [-1, 1]
    .map((s) => pen.poly([[d.engine.from + 0.06, s * 0.08], [d.engine.to - 0.06, s * 0.08], [d.engine.to - 0.06, s * (d.engine.halfWidth - 0.05)], [d.engine.from + 0.06, s * (d.engine.halfWidth - 0.05)]], true))
    .join('');
  const cyl = [-1, 1]
    .flatMap((s) => [0, 1, 2, 3].map((i) => pen.circle(d.engine.from + 0.14 + i * ((d.engine.to - d.engine.from - 0.28) / 3), s * (d.engine.halfWidth * 0.55), 0.055, 20)))
    .join('');
  const shaft = rect(d.shaft.from, d.shaft.to, d.shaft.halfWidth);
  const gearbox = rect(d.gearbox.from, d.gearbox.to, d.gearbox.halfWidth);
  const diff = pen.circle(d.differential.x, 0, d.differential.r, 32);
  const halfShafts = [-1, 1].map((s) => pen.poly([[d.differential.x, s * d.differential.r], [car.rearAxle, (s * car.top.track.rear) / 2 - (s * car.top.tire.width) / 2]])).join('');
  const frontAxle = pen.poly([[car.frontAxle, -(car.top.track.front / 2 - car.top.tire.width / 2)], [car.frontAxle, car.top.track.front / 2 - car.top.tire.width / 2]]);

  // Recorrido del par: motor → tubo → caja → diferencial → rueda trasera derecha.
  const flowPts: P[] = [
    [(d.engine.from + d.engine.to) / 2, 0],
    [d.shaft.to, 0],
    [d.shaft.from, 0],
    [d.differential.x, 0],
    [car.rearAxle, car.top.track.rear / 2],
  ];
  const flowPath = pen.poly(flowPts);
  const flowPathL = pen.poly([...flowPts.slice(0, 4), [car.rearAxle, -car.top.track.rear / 2]]);

  const pBody = clamp01(draw);
  const step = (i: number) => clamp01(parts * 4 - i);
  const line = (dd: string, w: number, p: number, o = 1, dash?: string, col: string = COLOR.blanco) => (
    <path
      d={dd}
      fill="none"
      stroke={col}
      strokeWidth={w}
      strokeOpacity={o}
      pathLength={dash ? undefined : 1}
      strokeDasharray={dash ?? (p < 1 ? 1 : undefined)}
      strokeDashoffset={dash ? undefined : p < 1 ? 1 - p : undefined}
      opacity={dash ? p : 1}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      {line(tires, STROKE.detalle, pBody, 0.5, '8 6')}
      {line(outline, STROKE.silueta, pBody)}
      {line(greenhouse, STROKE.arista, pBody, 0.7)}
      {line(breaks, STROKE.detalle, pBody, 0.5)}
      {line(domes, STROKE.detalle, pBody, 0.4)}
      {line(frontAxle, STROKE.detalle, pBody, 0.35, '22 6 3 6')}

      <path d={engine} fill={COLOR.negro} opacity={step(0) > 0 ? 1 : 0} />
      {line(engine, STROKE.silueta, step(0))}
      {line(banks, STROKE.detalle, step(0), 0.8)}
      {line(cyl, STROKE.detalle, step(0), 0.6)}
      <path d={shaft} fill={COLOR.negro} opacity={step(1) > 0 ? 1 : 0} />
      {line(shaft, STROKE.arista, step(1))}
      <path d={gearbox} fill={COLOR.negro} opacity={step(2) > 0 ? 1 : 0} />
      {line(gearbox, STROKE.silueta, step(2))}
      {line(diff, STROKE.arista, step(2))}
      {line(halfShafts, STROKE.arista, step(3))}

      {flow > 0 ? (
        <>
          <path d={flowPath} fill="none" stroke={COLOR.rojo} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray="0.12 1" strokeDashoffset={-(flow * 1.12 - 0.12)} />
          <path d={flowPathL} fill="none" stroke={COLOR.rojo} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray="0.12 1" strokeDashoffset={-(flow * 1.12 - 0.12)} />
        </>
      ) : null}
    </svg>
  );
};
