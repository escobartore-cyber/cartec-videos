// Motor de 4 cilindros en línea turbo, tipo VW EA888 2.0 TSI (transversal): dibujo
// ilustrativo en cm. Admisión por delante (+X), escape y turbo por detrás (-X),
// cigüeñal en Z. Cárter, bloque, culata, tapa con cuatro bobinas, colector de
// admisión, turbo, distribución con polea y campana del cambio.
import type { Decal, Mesh, Part, Style, V3 } from '../draw/line3d';
import { place } from '../draw/line3d';
import { box, cylinderZ, prismXY, withDecals } from '../draw/primitives';

const L = 46; // longitud del bloque (eje Z)

export const INLINE4_ANCHORS = {
  turbo: [-25, 20, 4] as V3,
  admision: [20, 30, 0] as V3,
  bobinas: [0, 38, 0] as V3,
  inyectores: [15, 24, 0] as V3,
};

export const inline4Engine = ({
  style = 'line',
  draw = 1,
  offset = [0, 0, 0] as V3,
  rotation = [0, 0, 0] as V3,
  turboStyle,
  coilStyle,
}: { style?: Style; draw?: number; offset?: V3; rotation?: V3; turboStyle?: Style; coilStyle?: Style } = {}): Part[] => {
  const meshes: { m: Mesh; style?: Style }[] = [];
  const add = (m: Mesh, s?: Style) => meshes.push({ m, style: s });

  add(box(28, 9, L - 4, -15)); // cárter
  add(prismXY([[-14, -6], [14, -6], [13, 22], [-13, 22]], -L / 2, L / 2)); // bloque
  add(prismXY([[-15, 22], [15, 22], [14, 32], [-14, 32]], -L / 2 + 1, L / 2 - 1)); // culata
  // Tapa de balancines con las cuatro bobinas en la cara superior (cara 4: borde C→D).
  const coils: Decal[] = [-15, -5, 5, 15].map((z) => ({ face: 4, closed: true, weight: 1, accent: coilStyle === 'accent', pts: [[-4, 38, z - 3], [4, 38, z - 3], [4, 38, z + 3], [-4, 38, z + 3]] }));
  add(withDecals(prismXY([[-12, 32], [12, 32], [10, 38], [-10, 38]], -L / 2 + 3, L / 2 - 3, 20), coils));
  // Colector de admisión por delante y raíl de inyectores bajo él.
  add(place(box(8, 14, L - 8), { t: [20, 18, 0] }));
  add(cylinderZ(15, 24, 1.4, -L / 2 + 6, L / 2 - 6));
  // Turbo por detrás, colgado del colector de escape integrado en la culata.
  add(cylinderZ(-25, 20, 6.5, -4, 4), turboStyle);
  add(cylinderZ(-25, 20, 5, 4, 11), turboStyle);
  add(cylinderZ(-25, 9, 3.2, -2, 2), turboStyle); // salida a la downpipe
  // Distribución y polea a un lado, campana del cambio al otro.
  add(prismXY([[-14, -6], [14, -6], [14, 30], [-14, 30]], L / 2, L / 2 + 3));
  add(cylinderZ(0, 0, 7, L / 2 + 3, L / 2 + 6));
  add(cylinderZ(0, 3, 17, -L / 2 - 6, -L / 2));

  return meshes.map(({ m, style: s }) => ({ mesh: place(m, { t: offset, r: rotation }), style: s ?? style, draw }));
};
