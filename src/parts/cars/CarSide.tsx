// Alzado lateral de un coche a partir de su CarProfile. Frontal hacia la derecha.
import React from 'react';
import { arcPts, makePen, P, Pen } from '../../draw/pen';
import { COLOR, STROKE } from '../../system/tokens';
import { CarArt } from './CarArt';
import type { CarProfile } from './types';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const bodyPath = (car: CarProfile, pen: Pen) => {
  const a = (Math.asin((car.sillY - car.tireR) / car.archR) * 180) / Math.PI;
  const front = arcPts(car.frontAxle, car.tireR, car.archR, a, 180 - a);
  const rear = arcPts(car.rearAxle, car.tireR, car.archR, a, 180 - a);
  return [
    pen.spline(car.side.upper),
    pen.spline(car.side.hood).replace(/^M[^C]+/, ''),
    ...front.map((p) => `L${pen.fmt(p)}`),
    ...rear.map((p) => `L${pen.fmt(p)}`),
    `L${pen.fmt(car.side.rearBottom)}`,
  ].join('');
};

const wheelPaths = (pen: Pen, cx: number, cy: number, r: number, spin: number) => {
  const s = r / 0.34; // escala respecto a una rueda de 0,34 m de radio
  const spokes: string[] = [];
  for (let i = 0; i < 5; i++) {
    for (const off of [-9, 9]) {
      const a = i * 72 + off + 18 - spin;
      const at = (rr: number, da: number): P => [cx + rr * s * Math.cos(((a + da) * Math.PI) / 180), cy + rr * s * Math.sin(((a + da) * Math.PI) / 180)];
      spokes.push(pen.poly([at(0.07, -7), at(0.232, -2.6), at(0.232, 2.6), at(0.07, 7)]));
    }
  }
  return {
    tire: pen.circle(cx, cy, r),
    sidewall: pen.circle(cx, cy, 0.29 * s),
    rim: pen.circle(cx, cy, 0.258 * s) + pen.circle(cx, cy, 0.238 * s),
    hub: pen.circle(cx, cy, 0.07 * s) + pen.circle(cx, cy, 0.03 * s),
    disc: pen.circle(cx, cy, 0.19 * s),
    caliper: pen.spline(arcPts(cx, cy, 0.215 * s, 120, 175, 8)) + pen.spline(arcPts(cx, cy, 0.15 * s, 175, 120, 8)).replace('M', 'L') + 'Z',
    spokes: spokes.join(''),
  };
};

/**
 * Coche en alzado lateral. (x, y): píxel del suelo bajo la trasera; k: px por metro.
 * `draw` (0–1) traza silueta → ruedas → detalles. `spin` gira las llantas (grados).
 */
export const CarSide: React.FC<{ car: CarProfile; x: number; y: number; k: number; draw?: number; spin?: number; color?: string; sweep?: 'rear' | 'front' }> = ({
  car,
  x,
  y,
  k,
  draw = 1,
  spin = 0,
  color = COLOR.blanco,
  sweep,
}) => {
  if (car.sideArt) return <CarArt art={car.sideArt} x={x} y={y} k={k} draw={draw} spin={spin} color={color} sweep={sweep} />;
  const pen = makePen((p) => [x + p[0] * k, y - p[1] * k]);
  const pBody = clamp01(draw / 0.55);
  const pWheels = clamp01((draw - 0.2) / 0.5);
  const pDetails = clamp01((draw - 0.4) / 0.6);
  const line = (d: string, w: number, p: number, o = 1) => (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={w}
      strokeOpacity={o}
      pathLength={1}
      strokeDasharray={p < 1 ? 1 : undefined}
      strokeDashoffset={p < 1 ? 1 - p : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
  const body = bodyPath(car, pen);
  const wheels = [car.frontAxle, car.rearAxle].map((ax) => wheelPaths(pen, ax, car.tireR, car.tireR, spin));
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <path d={body + 'Z'} fill={COLOR.negro} opacity={pBody > 0 ? 1 : 0} />
      {line(body, STROKE.silueta, pBody)}
      {car.side.details.map((d) => (
        <React.Fragment key={d.name}>
          {line(d.kind === 'spline' ? pen.spline(d.closed ? [...d.pts, d.pts[0]] : d.pts) : pen.poly(d.pts, d.closed), STROKE.arista, pDetails, 0.9)}
        </React.Fragment>
      ))}
      {wheels.map((w, i) => (
        <g key={i} opacity={pWheels > 0 ? 1 : 0}>
          <path d={w.tire} fill={COLOR.negro} />
          {line(w.tire, STROKE.silueta, pWheels)}
          {line(w.sidewall, STROKE.detalle, pWheels, 0.35)}
          {line(w.disc, STROKE.detalle, pWheels, 0.45)}
          <path d={w.caliper} fill={COLOR.negro} opacity={pWheels} />
          {line(w.caliper, STROKE.detalle, pWheels, 0.7)}
          {line(w.rim, STROKE.arista, pWheels)}
          <path d={w.spokes} fill={COLOR.negro} opacity={pWheels} />
          {line(w.spokes, STROKE.detalle, pWheels)}
          {line(w.hub, STROKE.detalle, pWheels)}
        </g>
      ))}
    </svg>
  );
};

/** Ejes del alzado: los del dibujo vectorizado si existe, si no los del perfil. */
export const sideAxles = (car: CarProfile) =>
  car.sideArt
    ? { rear: car.sideArt.wheels[0].x, front: car.sideArt.wheels[1].x, tireR: car.sideArt.wheels[0].r }
    : { rear: car.rearAxle, front: car.frontAxle, tireR: car.tireR };

/** Línea de suelo con rayado técnico y ejes de rueda (trazo-punto). */
export const GroundAndAxes: React.FC<{ car: CarProfile; x: number; y: number; k: number; from: number; to: number; draw?: number }> = ({
  car,
  x,
  y,
  k,
  from,
  to,
  draw = 1,
}) => {
  const hatch: string[] = [];
  const end = from + (to - from) * draw;
  for (let px = from; px < end; px += 18) hatch.push(`M${px} ${y + 2}l-14 14`);
  const { front, rear, tireR } = sideAxles(car);
  const axis = (ax: number) => `M${x + ax * k} ${y + 60}V${y - (tireR * 2 + 0.2) * k}`;
  const cross = (ax: number) => `M${x + ax * k - 26} ${y - tireR * k}H${x + ax * k + 26}`;
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <path d={`M${from} ${y}H${end}`} stroke={COLOR.blanco} strokeWidth={STROKE.arista} />
      <path d={hatch.join('')} stroke={COLOR.blanco} strokeOpacity={0.28} strokeWidth={1} />
      <path
        d={axis(front) + axis(rear) + cross(front) + cross(rear)}
        stroke={COLOR.blanco}
        strokeOpacity={0.45 * draw}
        strokeWidth={1}
        strokeDasharray="22 6 3 6"
      />
    </svg>
  );
};
