// Primitivas convexas para construir piezas. Todas devuelven mallas en unidades
// de escena (1 = 1 cm salvo que la pieza diga otra cosa), eje Y hacia arriba.
import type { Decal, Mesh, V3 } from './line3d';

type P2 = [number, number];

/** Extruye un perfil convexo del plano XZ a lo largo de +Y, desde y0 hasta y0+h. */
export const extrude = (profile: P2[], h: number, y0 = 0, crease = 28): Mesh => {
  const n = profile.length;
  const v: V3[] = [
    ...profile.map(([x, z]): V3 => [x, y0, z]),
    ...profile.map(([x, z]): V3 => [x, y0 + h, z]),
  ];
  const f: number[][] = [
    [...Array(n).keys()].reverse(),
    [...Array(n).keys()].map((i) => i + n),
    ...[...Array(n).keys()].map((i) => [i, (i + 1) % n, ((i + 1) % n) + n, i + n]),
  ];
  return { v, f, crease };
};

/** Rectángulo de esquinas redondeadas centrado en el origen. */
export const roundedRect = (w: number, d: number, r: number, seg = 5): P2[] => {
  const pts: P2[] = [];
  const corners: [number, number, number][] = [
    [w / 2 - r, d / 2 - r, 0],
    [-w / 2 + r, d / 2 - r, 90],
    [-w / 2 + r, -d / 2 + r, 180],
    [w / 2 - r, -d / 2 + r, 270],
  ];
  for (const [cx, cz, a0] of corners) {
    for (let i = 0; i <= seg; i++) {
      const a = ((a0 + (90 * i) / seg) * Math.PI) / 180;
      pts.push([cx + r * Math.cos(a), cz + r * Math.sin(a)]);
    }
  }
  return pts;
};

export const rect = (w: number, d: number): P2[] => [
  [w / 2, d / 2],
  [-w / 2, d / 2],
  [-w / 2, -d / 2],
  [w / 2, -d / 2],
];

export const circle = (r: number, seg = 40): P2[] =>
  [...Array(seg).keys()].map((i) => [r * Math.cos((i / seg) * Math.PI * 2), r * Math.sin((i / seg) * Math.PI * 2)]);

/** Caja centrada en X/Z, apoyada en y0. */
export const box = (w: number, h: number, d: number, y0 = 0): Mesh => extrude(rect(w, d), h, y0);

/** Caja con cantos verticales redondeados. */
export const roundedBox = (w: number, h: number, d: number, r: number, y0 = 0): Mesh => extrude(roundedRect(w, d, r), h, y0);

export const cylinder = (r: number, h: number, y0 = 0, seg = 40): Mesh => extrude(circle(r, seg), h, y0);

/** Índice de la cara superior de una malla creada con extrude(). */
export const TOP = 1;
export const BOTTOM = 0;
/** Índice de la cara lateral i-ésima de una malla creada con extrude(). */
export const SIDE = (i: number) => 2 + i;

export const withDecals = (m: Mesh, decals: Decal[]): Mesh => ({ ...m, decals: [...(m.decals ?? []), ...decals] });

/** Rectángulo en el plano horizontal y = y0 (para dibujar sobre caras superiores). */
export const topRect = (x: number, z: number, w: number, d: number, y: number): V3[] => [
  [x - w / 2, y, z - d / 2],
  [x + w / 2, y, z - d / 2],
  [x + w / 2, y, z + d / 2],
  [x - w / 2, y, z + d / 2],
];
