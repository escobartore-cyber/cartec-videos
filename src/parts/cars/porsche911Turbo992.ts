// Porsche 911 Turbo (992, 2020–): motor bóxer biturbo trasero, tracción total.
// Medidas generales del fabricante: largo ≈4535 mm, batalla ≈2450 mm, ancho ≈1900 mm.
// Alzado: dibujo de referencia del cliente (brand-src/coches/porsche-911-turbo-992-alzado.png),
// vectorizado con scripts/trace-art.py y sin los escudos de los bujes.
import type { CarArtData } from './CarArt';
import type { CarProfile } from './types';
import sideArt from './art/porsche911Turbo992.json';

const REAR_AXLE = 0.944;
const FRONT_AXLE = 3.512;

export const PORSCHE_911_TURBO_992: CarProfile = {
  id: 'porsche-911-turbo-992',
  nombre: 'Porsche 911 Turbo',
  codigo: '992 · bóxer biturbo',
  length: 4.535,
  width: 1.9,
  rearAxle: REAR_AXLE,
  frontAxle: FRONT_AXLE,
  tireR: 0.354,
  archR: 0.39,
  sillY: 0.18,
  sideArt: sideArt as unknown as CarArtData,
  side: { upper: [[0.05, 0.3], [0.3, 1.0], [1.5, 1.3], [2.6, 1.2]], hood: [[2.6, 1.2], [4.0, 0.85], [4.5, 0.4]], rearBottom: [0.05, 0.3], details: [] },
  top: {
    outline: [[0, 0], [0.05, 0.6], [0.4, 0.95], [1.2, 0.95], [2.6, 0.88], [3.6, 0.9], [4.2, 0.75], [4.535, 0]],
    greenhouse: [[1.0, 0.55], [2.0, 0.6], [2.7, 0.6]],
    glassBreaks: [1.6, 2.3],
    track: { front: 1.6, rear: 1.65 },
    tire: { width: 0.3, length: 0.7 },
  },
  drivetrain: {
    layout: 'convencional',
    engine: { from: 0.2, to: 1.0, halfWidth: 0.4, label: 'Motor bóxer biturbo' },
    shaft: { from: 1.0, to: 3.5, halfWidth: 0.04, label: 'Árbol a eje delantero' },
    gearbox: { from: 1.0, to: 1.6, halfWidth: 0.2, label: 'Caja PDK' },
    differential: { x: REAR_AXLE, r: 0.1, label: 'Diferencial' },
  },
};
