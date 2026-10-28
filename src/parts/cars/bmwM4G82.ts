// BMW M4 Coupé (G82, 2021–): motor 6 en línea biturbo delantero, propulsión trasera.
// Medidas generales del fabricante: largo ≈4794 mm, batalla ≈2857 mm, ancho ≈1887 mm.
// Alzado: dibujo de referencia del cliente (brand-src/coches/bmw-m4-g82-alzado.png),
// vectorizado con scripts/trace-art.py y sin los logotipos de los bujes.
import type { CarArtData } from './CarArt';
import type { CarProfile } from './types';
import sideArt from './art/bmwM4G82.json';

const REAR_AXLE = 0.961;
const FRONT_AXLE = 3.839;

export const BMW_M4_G82: CarProfile = {
  id: 'bmw-m4-g82',
  nombre: 'BMW M4',
  codigo: 'G82 · 6 en línea biturbo',
  length: 4.794,
  width: 1.9,
  rearAxle: REAR_AXLE,
  frontAxle: FRONT_AXLE,
  tireR: 0.36,
  archR: 0.39,
  sillY: 0.18,
  sideArt: sideArt as unknown as CarArtData,
  side: { upper: [[0.05, 0.3], [0.3, 1.0], [1.5, 1.3], [2.6, 1.2]], hood: [[2.6, 1.2], [4.0, 0.85], [4.5, 0.4]], rearBottom: [0.05, 0.3], details: [] },
  top: {
    outline: [[0, 0], [0.05, 0.6], [0.4, 0.95], [1.2, 0.95], [2.6, 0.88], [3.6, 0.9], [4.2, 0.75], [4.794, 0]],
    greenhouse: [[1.0, 0.55], [2.0, 0.6], [2.7, 0.6]],
    glassBreaks: [1.6, 2.3],
    track: { front: 1.6, rear: 1.65 },
    tire: { width: 0.3, length: 0.7 },
  },
  drivetrain: {
    layout: 'convencional',
    engine: { from: 0.2, to: 1.0, halfWidth: 0.4, label: 'Motor 6 en línea biturbo' },
    shaft: { from: 1.0, to: 3.5, halfWidth: 0.04, label: 'Árbol de transmisión' },
    gearbox: { from: 1.0, to: 1.6, halfWidth: 0.2, label: 'Caja de cambios' },
    differential: { x: REAR_AXLE, r: 0.1, label: 'Diferencial' },
  },
};
