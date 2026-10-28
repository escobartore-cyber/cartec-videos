// Utilidades de trazado 2D: todas reciben una función que pasa de unidades de
// dibujo (metros) a píxeles, para que el grosor de línea y pathLength funcionen
// sin escalar el SVG.
export type P = [number, number];

export const arcPts = (cx: number, cy: number, r: number, a0: number, a1: number, n = 28): P[] =>
  [...Array(n + 1).keys()].map((i) => {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

export const makePen = (toPx: (p: P) => P) => {
  const fmt = (p: P) => {
    const q = toPx(p);
    return `${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
  };
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
      d += `${i === 0 ? `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)}` : ''}C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d;
  };
  const poly = (pts: P[], close = false) => `M${pts.map(fmt).join('L')}${close ? 'Z' : ''}`;
  const circle = (cx: number, cy: number, r: number, n = 64) => poly(arcPts(cx, cy, r, 0, 360, n), true);
  return { fmt, spline, poly, circle, toPx };
};
export type Pen = ReturnType<typeof makePen>;
