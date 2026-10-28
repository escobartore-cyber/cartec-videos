// Alzado lateral de una berlina deportiva (proporciones tipo AMG, sin logotipos),
// en metros. Frontal hacia la derecha. Es un dibujo ilustrativo, no un plano de
// fabricante: no lleva cotas numéricas.
import React from 'react';
import { COLOR, STROKE } from '../system/tokens';

type P = [number, number];

const WHEELBASE = 2.94;
const FRONT_AXLE = 4.06;
const REAR_AXLE = FRONT_AXLE - WHEELBASE;
const TIRE_R = 0.345;
const ARCH_R = 0.375;
const SILL_Y = 0.2;

// Todas las coordenadas se pasan a píxeles antes de construir los trazados, para
// que pathLength y el trazado progresivo funcionen sin escalar el grosor.
let toPx = (p: P): P => p;

/** Catmull-Rom → Bézier cúbica (abierta). */
const spline = (raw: P[], tension = 0.5): string => {
  const pts = raw.map(toPx);
  let d = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1: P = [p1[0] + ((p2[0] - p0[0]) * tension) / 3, p1[1] + ((p2[1] - p0[1]) * tension) / 3];
    const c2: P = [p2[0] - ((p3[0] - p1[0]) * tension) / 3, p2[1] - ((p3[1] - p1[1]) * tension) / 3];
    d += `${i === 0 ? `M${p1[0]} ${p1[1]}` : ''}C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
};

const arcPts = (cx: number, cy: number, r: number, a0: number, a1: number, n = 28): P[] =>
  [...Array(n + 1).keys()].map((i) => {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
const fmt = (p: P) => `${toPx(p)[0].toFixed(1)} ${toPx(p)[1].toFixed(1)}`;
const poly = (pts: P[], close = false) => `M${pts.map(fmt).join('L')}${close ? 'Z' : ''}`;
const circle = (cx: number, cy: number, r: number) => poly(arcPts(cx, cy, r, 0, 360, 64), true);

const archAngle = (Math.asin((SILL_Y - TIRE_R) / ARCH_R) * 180) / Math.PI; // ≈ -20.7°

const BODY_UPPER: P[] = [
  [0.1, 0.24], [0.02, 0.4], [0, 0.62], [0.04, 0.88], [0.1, 0.975], [0.45, 1.0], [0.82, 1.03],
  [1.25, 1.24], [1.68, 1.395], [2.15, 1.45], [2.6, 1.425], [3.0, 1.24], [3.38, 1.03],
];
const HOOD: P[] = [[3.38, 1.03], [3.9, 0.985], [4.45, 0.9], [4.8, 0.8], [4.95, 0.68], [4.99, 0.55], [4.97, 0.4], [4.93, 0.26], [4.86, 0.19]];

/** Silueta completa: techo, capó, frontal, pasos de rueda y talonera. */
export const bodyPath = () => {
  const front = arcPts(FRONT_AXLE, TIRE_R, ARCH_R, archAngle, 180 - archAngle);
  const rear = arcPts(REAR_AXLE, TIRE_R, ARCH_R, archAngle, 180 - archAngle);
  return [
    spline(BODY_UPPER),
    spline(HOOD).replace(/^M[^C]+/, ''),
    ...front.map((p) => `L${fmt(p)}`),
    ...rear.map((p) => `L${fmt(p)}`),
    `L${fmt([0.1, 0.24])}`,
  ].join('');
};

const detailPaths = () => ({
  ventanas: spline([[1.2, 1.085], [1.52, 1.28], [1.92, 1.385], [2.4, 1.385], [2.76, 1.3], [3.13, 1.065]]) + `L${fmt([1.2, 1.085])}`,
  pilarB: poly([[2.3, 1.06], [2.33, 1.385]]) + poly([[2.38, 1.06], [2.41, 1.385]]),
  ventanilla: poly([[1.55, 1.08], [1.6, 1.3]]),
  hombro: spline([[4.4, 0.85], [3.4, 0.83], [2.4, 0.825], [1.2, 0.84], [0.35, 0.87], [0.06, 0.885]]),
  faldon: spline([[3.62, 0.36], [2.6, 0.345], [1.56, 0.36]]),
  puertaDel: spline([[3.2, 1.035], [3.42, 0.86], [3.49, 0.6], [3.5, 0.3]]),
  puertaTras: poly([[2.345, 1.06], [2.345, 0.3]]),
  puertaFin: spline([[1.3, 1.08], [1.42, 0.86], [1.6, 0.6], [1.62, 0.3]]),
  bajoPuertas: poly([[3.5, 0.3], [1.62, 0.3]]),
  tiradores: poly([[2.86, 0.875], [3.04, 0.875], [3.04, 0.9], [2.86, 0.9]], true) + poly([[1.76, 0.885], [1.94, 0.885], [1.94, 0.91], [1.76, 0.91]], true),
  retrovisor: spline([[3.14, 1.04], [3.08, 1.13], [2.95, 1.14], [2.9, 1.08], [2.97, 1.035]]),
  faro: poly([[4.5, 0.86], [4.88, 0.76], [4.95, 0.69], [4.86, 0.7], [4.55, 0.795]], true),
  piloto: poly([[0.04, 0.9], [0.42, 0.96], [0.46, 0.92], [0.03, 0.84]], true),
  toma: spline([[4.985, 0.45], [4.84, 0.4], [4.76, 0.3], [4.74, 0.22]]),
  difusor: poly([[0.05, 0.32], [0.55, 0.3]]),
  capo: spline([[3.45, 1.0], [4.0, 0.955], [4.5, 0.875]]),
});

const wheel = (cx: number) => {
  const cy = TIRE_R;
  // Cinco radios dobles en cuña, del buje a la llanta.
  const spokes: string[] = [];
  for (let i = 0; i < 5; i++) {
    for (const off of [-9, 9]) {
      const a = i * 72 + off + 18;
      const at = (r: number, da: number): P => [cx + r * Math.cos(((a + da) * Math.PI) / 180), cy + r * Math.sin(((a + da) * Math.PI) / 180)];
      spokes.push(poly([at(0.07, -7), at(0.232, -2.6), at(0.232, 2.6), at(0.07, 7)]));
    }
  }
  return {
    tire: circle(cx, cy, TIRE_R),
    sidewall: circle(cx, cy, 0.29),
    rim: circle(cx, cy, 0.258) + circle(cx, cy, 0.238),
    hub: circle(cx, cy, 0.07) + circle(cx, cy, 0.03),
    disc: circle(cx, cy, 0.19),
    caliper: spline(arcPts(cx, cy, 0.215, 120, 175, 8)) + spline(arcPts(cx, cy, 0.15, 175, 120, 8)).replace('M', 'L') + 'Z',
    spokes: spokes.join(''),
  };
};

export const CAR_AXLES = { front: FRONT_AXLE, rear: REAR_AXLE, tire: TIRE_R };

/**
 * Coche en alzado lateral. (x, y) es la posición en px del punto de suelo bajo el
 * paragolpes trasero; `k` = px por metro. `draw` (0–1) traza las líneas.
 */
export const CarSide: React.FC<{ x: number; y: number; k: number; draw?: number; details?: number }> = ({ x, y, k, draw = 1, details = 1 }) => {
  toPx = (p: P): P => [x + p[0] * k, y - p[1] * k];
  const line = (d: string, w: number, o = 1, extra: React.SVGProps<SVGPathElement> = {}) => (
    <path
      d={d}
      fill="none"
      stroke={COLOR.blanco}
      strokeWidth={w}
      strokeOpacity={o}
      pathLength={1}
      strokeDasharray={draw < 1 ? 1 : undefined}
      strokeDashoffset={draw < 1 ? 1 - draw : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...extra}
    />
  );
  const wf = wheel(FRONT_AXLE);
  const wr = wheel(REAR_AXLE);
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <g>
        <path d={bodyPath() + 'Z'} fill={COLOR.negro} />
        {line(bodyPath(), STROKE.silueta)}
        <g opacity={details}>
          {Object.values(detailPaths()).map((d, i) => (
            <React.Fragment key={i}>{line(d, STROKE.arista, 0.9)}</React.Fragment>
          ))}
        </g>
        {[wf, wr].map((w, i) => (
          <g key={i}>
            <path d={w.tire} fill={COLOR.negro} />
            {line(w.tire, STROKE.silueta)}
            {line(w.sidewall, STROKE.detalle, 0.35)}
            {line(w.disc, STROKE.detalle, 0.45)}
            <path d={w.caliper} fill={COLOR.negro} />
            {line(w.caliper, STROKE.detalle, 0.7)}
            {line(w.rim, STROKE.arista)}
            <path d={w.spokes} fill={COLOR.negro} />
            {line(w.spokes, STROKE.detalle)}
            {line(w.hub, STROKE.detalle)}
          </g>
        ))}
      </g>
    </svg>
  );
};

/** Línea de suelo con rayado técnico y ejes de rueda (trazo-punto). */
export const GroundAndAxes: React.FC<{ x: number; y: number; k: number; from: number; to: number; labels?: boolean }> = ({
  x,
  y,
  k,
  from,
  to,
}) => {
  const hatch: string[] = [];
  for (let px = from; px < to; px += 18) hatch.push(`M${px} ${y + 2}l-14 14`);
  const axis = (ax: number) => {
    const X = x + ax * k;
    return `M${X} ${y + 60}V${y - (TIRE_R * 2 + 0.2) * k}`;
  };
  const cross = (ax: number) => {
    const X = x + ax * k;
    const Y = y - TIRE_R * k;
    return `M${X - 26} ${Y}H${X + 26}`;
  };
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
      <path d={`M${from} ${y}H${to}`} stroke={COLOR.blanco} strokeWidth={STROKE.arista} />
      <path d={hatch.join('')} stroke={COLOR.blanco} strokeOpacity={0.28} strokeWidth={1} />
      <path
        d={axis(FRONT_AXLE) + axis(REAR_AXLE) + cross(FRONT_AXLE) + cross(REAR_AXLE)}
        stroke={COLOR.blanco}
        strokeOpacity={0.45}
        strokeWidth={1}
        strokeDasharray="22 6 3 6"
      />
    </svg>
  );
};
