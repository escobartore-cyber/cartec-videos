// Motor V8 biturbo a 90° con los turbos dentro de la V ("hot inside V"), como el
// V8 del AMG GT. Dibujo ilustrativo en cm: bloque, bancadas, tapas de balancines,
// turbos, colectores de admisión exteriores, distribución, poleas y campana.
import type { Decal, Mesh, Part, Style, V3 } from '../draw/line3d';
import { place } from '../draw/line3d';
import { box, cylinderZ, prismXY, withDecals } from '../draw/primitives';

type P2 = [number, number];
const L = 50; // longitud del bloque (eje Z)
const c = Math.SQRT1_2;

/** Bancada (culata) a 45°: lado -1 izquierda, 1 derecha. Comparte el plano de junta con el bloque. */
const bank = (side: number): P2[] => {
  const u: P2 = [side * c, c]; // eje de los cilindros, hacia fuera y arriba
  const p0: P2 = [side * 2, 22]; // borde interior del plano de junta
  const p1: P2 = [side * 14.73, 9.27]; // borde exterior del plano de junta (18 cm de junta)
  return [p0, p1, [p1[0] + 20 * u[0], p1[1] + 20 * u[1]], [p0[0] + 20 * u[0], p0[1] + 20 * u[1]]];
};

/** Tapa de balancines sobre la bancada, 6 cm de alto y 1,5 cm de retranqueo. */
const camCover = (side: number): P2[] => {
  const [, , outer, inner] = bank(side);
  const u: P2 = [side * c, c];
  const t: P2 = [side * c, -c]; // a lo largo del borde superior, de dentro afuera
  const A: P2 = [inner[0] + 1.5 * t[0], inner[1] + 1.5 * t[1]];
  const B: P2 = [outer[0] - 1.5 * t[0], outer[1] - 1.5 * t[1]];
  return [A, B, [B[0] + 6 * u[0], B[1] + 6 * u[1]], [A[0] + 6 * u[0], A[1] + 6 * u[1]]];
};

export const v8Engine = ({ style = 'line', draw = 1, offset = [0, 0, 0] as V3, rotation = [0, 0, 0] as V3, turboStyle }: { style?: Style; draw?: number; offset?: V3; rotation?: V3; turboStyle?: Style } = {}): Part[] => {
  const meshes: { m: Mesh; style?: Style }[] = [];
  const add = (m: Mesh, s?: Style) => meshes.push({ m, style: s });

  // Cárter seco y bloque (perfil con la V en la parte superior).
  add(box(30, 8, L - 4, -14));
  add(prismXY([[-16, -6], [16, -6], [16, 8], [14.73, 9.27], [2, 22], [-2, 22], [-14.73, 9.27], [-16, 8]], -L / 2, L / 2));
  for (const side of [-1, 1]) {
    add(prismXY(bank(side), -L / 2 + 1, L / 2 - 1));
    // Tapa de balancines con las cuatro bobinas de encendido en su cara superior (cara 4: borde C→D).
    const [, , C, D] = camCover(side);
    const at = (t: number): [number, number] => [C[0] + (D[0] - C[0]) * t, C[1] + (D[1] - C[1]) * t];
    const coils: Decal[] = [-18, -6, 6, 18].map((z) => {
      const [a, b] = [at(0.28), at(0.72)];
      return { face: 4, closed: true, weight: 1, pts: [[a[0], a[1], z - 3], [b[0], b[1], z - 3], [b[0], b[1], z + 3], [a[0], a[1], z + 3]] };
    });
    add(withDecals(prismXY(camCover(side), -L / 2 + 3, L / 2 - 3, 20), coils));
    // Admisión por el exterior de cada bancada.
    add(place(box(7, 9, L - 10), { t: [side * 31, 8, 0] }));
  }
  // Turbos en la V (eje longitudinal) con su carcasa de compresor.
  for (const side of [-1, 1]) {
    add(cylinderZ(side * 6, 37, 5.5, -8, 3), turboStyle);
    add(cylinderZ(side * 6, 37, 4.2, 3, 9), turboStyle);
  }
  // Distribución y poleas delante, campana detrás.
  add(prismXY([[-15, -5], [15, -5], [15, 10], [2, 22], [-2, 22], [-15, 10]], L / 2, L / 2 + 3));
  add(cylinderZ(0, 2, 7, L / 2 + 3, L / 2 + 6));
  add(cylinderZ(0, 15, 4.5, L / 2 + 3, L / 2 + 5.5));
  add(cylinderZ(12, 17, 4, L / 2 + 3, L / 2 + 5.5));
  add(cylinderZ(0, 4, 18, -L / 2 - 6, -L / 2));

  return meshes.map(({ m, style: s }) => ({ mesh: place(m, { t: offset, r: rotation }), style: s ?? style, draw }));
};
