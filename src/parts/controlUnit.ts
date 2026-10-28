// Centralita genérica (ECU / CPC / TCU) en unidades de cm. Es un esquema
// ilustrativo de la anatomía de una unidad de control, no la réplica de una
// pieza concreta: carcasa, placa de circuito, componentes, conector y tapa.
import type { Decal, Mesh, Part, Style, V3 } from '../draw/line3d';
import { place } from '../draw/line3d';
import { box, cylinder, roundedBox, SIDE, TOP, topRect, withDecals } from '../draw/primitives';

export type UnitVariant = 'ecu' | 'cpc' | 'tcu';

const DIMS: Record<UnitVariant, { w: number; d: number; base: number; cover: number; pins: number }> = {
  ecu: { w: 22, d: 16, base: 3.2, cover: 1.6, pins: 2 },
  cpc: { w: 17, d: 13, base: 2.6, cover: 1.4, pins: 1 },
  tcu: { w: 15, d: 15, base: 2.2, cover: 1.2, pins: 1 },
};

const circleAt = (x: number, y: number, z: number, r: number, seg = 18): V3[] =>
  [...Array(seg + 1).keys()].map((i) => [x + r * Math.cos((i / seg) * Math.PI * 2), y, z + r * Math.sin((i / seg) * Math.PI * 2)]);

/** Rejilla de pines vista en la cara frontal (+z) de un conector. */
const pinGrid = (face: number, w: number, h: number, z: number, y0: number, cols: number, rows: number): Decal[] => {
  const out: Decal[] = [];
  const sx = (w * 0.8) / cols;
  const sy = (h * 0.6) / rows;
  for (let c = 0; c < cols; c++)
    for (let r = 0; r < rows; r++) {
      const x = -w * 0.4 + sx * (c + 0.5);
      const y = y0 + h * 0.2 + sy * (r + 0.5);
      const s = Math.min(sx, sy) * 0.22;
      out.push({ face, closed: true, weight: 0.8, pts: [[x - s, y - s, z], [x + s, y - s, z], [x + s, y + s, z], [x - s, y + s, z]] });
    }
  return out;
};

export type UnitOptions = {
  variant: UnitVariant;
  /** 0 = cerrada, 1 = despiece completo. */
  explode?: number;
  style?: Style;
  /** 0–1 trazado progresivo de todas las piezas. */
  draw?: number;
  offset?: V3;
  rotation?: V3;
};

export type UnitAnchors = { tapa: V3; placa: V3; micro: V3; conector: V3 };

/** Devuelve las piezas y puntos de anclaje (en coordenadas de escena) para las llamadas. */
export const controlUnit = ({
  variant,
  explode = 0,
  style = 'line',
  draw = 1,
  offset = [0, 0, 0],
  rotation = [0, 0, 0],
}: UnitOptions): { parts: Part[]; anchors: UnitAnchors } => {
  const D = DIMS[variant];
  const gap = 4.2 * explode;
  const yPcb = D.base - 0.6 + gap;
  const yCover = D.base + gap * 2.6;
  const meshes: { m: Mesh; order: number }[] = [];
  const add = (m: Mesh, order: number) => meshes.push({ m, order });

  // Carcasa inferior con pestañas de anclaje.
  add(roundedBox(D.w, D.base, D.d, 1.1), 1);
  for (const sx of [-1, 1]) {
    const tab = withDecals(box(2.6, 0.45, 4, 0.2), [{ face: TOP, closed: true, weight: 1, pts: circleAt(0, 0.65, 0, 0.55) }]);
    add(place(tab, { t: [sx * (D.w / 2 + 1.1), 0, -D.d * 0.15] }), 0.5);
  }

  // Placa de circuito con pistas y patillas del microcontrolador.
  const pcbW = D.w - 1.6;
  const pcbD = D.d - 1.6;
  const top = yPcb + 0.22;
  const mcu = 3.6;
  const mcuZ = -pcbD * 0.08;
  const traces: Decal[] = [
    { face: TOP, weight: 0.7, pts: [[-pcbW * 0.42, top, -pcbD * 0.3], [-pcbW * 0.1, top, -pcbD * 0.3], [-pcbW * 0.02, top, -pcbD * 0.15]] },
    { face: TOP, weight: 0.7, pts: [[pcbW * 0.4, top, -pcbD * 0.38], [pcbW * 0.15, top, -pcbD * 0.38], [pcbW * 0.08, top, -pcbD * 0.2]] },
    { face: TOP, weight: 0.7, pts: [[-pcbW * 0.38, top, pcbD * 0.05], [-pcbW * 0.15, top, pcbD * 0.05], [-pcbW * 0.08, top, pcbD * 0.18]] },
    { face: TOP, weight: 0.7, pts: [[pcbW * 0.36, top, pcbD * 0.1], [pcbW * 0.2, top, pcbD * 0.1], [pcbW * 0.12, top, pcbD * 0.22]] },
    ...[-0.35, 0.35].map((sx): Decal => ({ face: TOP, closed: true, weight: 0.8, pts: circleAt(sx * pcbW, top, -pcbD * 0.42, 0.35, 12) })),
  ];
  for (let i = 0; i < 9; i++) {
    const t = -mcu * 0.4 + (mcu * 0.8 * i) / 8;
    const pin = (a: V3, b: V3): Decal => ({ face: TOP, weight: 0.6, pts: [a, b] });
    traces.push(
      pin([t, top, mcuZ + mcu / 2], [t, top, mcuZ + mcu / 2 + 0.45]),
      pin([t, top, mcuZ - mcu / 2], [t, top, mcuZ - mcu / 2 - 0.45]),
      pin([mcu / 2, top, mcuZ + t], [mcu / 2 + 0.45, top, mcuZ + t]),
      pin([-mcu / 2, top, mcuZ + t], [-mcu / 2 - 0.45, top, mcuZ + t]),
    );
  }
  add(withDecals(box(pcbW, 0.22, pcbD, yPcb), traces), 2);
  add(
    withDecals(box(mcu, 0.45, mcu, top), [{ face: TOP, closed: true, weight: 0.8, pts: circleAt(-mcu * 0.3, top + 0.45, -mcu * 0.3, 0.22, 10) }]),
    3,
  );
  meshes[meshes.length - 1].m = place(meshes[meshes.length - 1].m, { t: [0, 0, mcuZ] });

  // Componentes secundarios: memorias, condensadores, cristal.
  for (const [x, z] of [[-pcbW * 0.3, -pcbD * 0.18], [pcbW * 0.3, -pcbD * 0.2], [-pcbW * 0.3, pcbD * 0.22]] as const)
    add(place(box(2.2, 0.35, 1.3, top), { t: [x, 0, z] }), 3);
  for (const [x, z] of [[pcbW * 0.28, pcbD * 0.25], [pcbW * 0.38, pcbD * 0.25], [pcbW * 0.33, pcbD * 0.02]] as const)
    add(place(cylinder(0.55, 1.1, top, 24), { t: [x, 0, z] }), 3.2);

  // Conector de la placa (cabezal) en el borde frontal.
  const hw = D.d * 0.62;
  const hh = 2 + 0.4 * D.pins;
  const header = withDecals(box(hw, hh, 2.2, top), pinGrid(SIDE(0), hw, hh, 1.1, top, 12, 2 * D.pins));
  add(place(header, { t: [pcbW / 2 - 1.1, 0, 0], r: [0, 90, 0] }), 3.5);

  // Tapa superior con etiqueta.
  const lid = withDecals(roundedBox(D.w, D.cover, D.d, 1.1, yCover), [
    { face: TOP, closed: true, weight: 1, pts: topRect(-D.w * 0.12, -D.d * 0.05, D.w * 0.46, D.d * 0.42, yCover + D.cover) },
    ...[0, 1, 2].map((i): Decal => ({
      face: TOP,
      weight: 0.8,
      pts: [
        [-D.w * 0.32, yCover + D.cover, -D.d * 0.17 + i * 1.2],
        [-D.w * (i === 2 ? 0.12 : 0.02), yCover + D.cover, -D.d * 0.17 + i * 1.2],
      ],
    })),
  ]);
  add(lid, 6);

  // Conector del mazo, separado hacia delante en el despiece.
  const plugX = pcbW / 2 + 2.6 + gap * 1.5;
  const plug = withDecals(roundedBox(hw + 0.8, hh + 0.6, 3.6, 0.4, top - 0.3), [
    ...[0.25, 0.5, 0.75].map((t): Decal => ({
      face: TOP,
      weight: 0.8,
      pts: [
        [-(hw + 0.8) / 2 + 0.6, top + hh + 0.3, -1.8 + 3.6 * t],
        [(hw + 0.8) / 2 - 0.6, top + hh + 0.3, -1.8 + 3.6 * t],
      ],
    })),
  ]);
  add(place(plug, { t: [plugX, 0, 0], r: [0, 90, 0] }), 7);

  const tf = (p: V3): V3 => place({ v: [p], f: [] }, { t: offset, r: rotation }).v[0];
  return {
    parts: meshes.map(({ m, order }) => ({ mesh: place(m, { t: offset, r: rotation }), style, draw, order })),
    anchors: {
      tapa: tf([-D.w * 0.3, yCover + D.cover, -D.d * 0.25]),
      placa: tf([-pcbW * 0.44, top, pcbD * 0.05]),
      micro: tf([mcu * 0.25, top + 0.45, mcuZ + mcu * 0.25]),
      conector: tf([plugX + 1.8, top - 0.3, -(hw + 0.8) / 2]),
    },
  };
};

