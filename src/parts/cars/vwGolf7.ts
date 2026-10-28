// Volkswagen Golf VII de 5 puertas (2012–2020), motor EA888 2.0 TSI transversal.
// Medidas generales del fabricante: largo ≈4258 mm, batalla ≈2637 mm, ancho ≈1799 mm.
// Alzado: dibujo de referencia entregado por el cliente (brand-src/coches/vw-golf-7-alzado.png),
// vectorizado con scripts/trace-art.py y sin los logotipos de los bujes. La planta es un
// esquema geométrico con esas proporciones.
import type { CarArtData } from './CarArt';
import type { CarProfile } from './types';
import sideArt from './art/vwGolf7.json';

const REAR_AXLE = 0.729;
const FRONT_AXLE = 3.43;

export const VW_GOLF_7: CarProfile = {
  id: 'vw-golf-7',
  nombre: 'Volkswagen Golf',
  codigo: 'VII · 2.0 TSI EA888',
  length: 4.258,
  width: 1.799,
  rearAxle: REAR_AXLE,
  frontAxle: FRONT_AXLE,
  tireR: 0.313,
  archR: 0.35,
  sillY: 0.2,
  sideArt: sideArt as unknown as CarArtData,

  // Solo se usa si no hay sideArt; se deja una silueta mínima coherente.
  side: {
    upper: [[0.05, 0.3], [0.02, 0.6], [0.1, 1.0], [0.4, 1.38], [1.2, 1.45], [2.2, 1.44], [2.75, 1.08]],
    hood: [[2.75, 1.08], [3.5, 0.98], [4.1, 0.86], [4.25, 0.6], [4.22, 0.25]],
    rearBottom: [0.05, 0.3],
    details: [],
  },

  top: {
    outline: [[0, 0], [0.03, 0.55], [0.2, 0.86], [0.7, 0.9], [2.0, 0.89], [3.3, 0.9], [3.95, 0.82], [4.2, 0.55], [4.258, 0]],
    greenhouse: [[0.4, 0.52], [1.0, 0.62], [2.0, 0.63], [2.75, 0.6]],
    glassBreaks: [1.0, 2.0],
    track: { front: 1.54, rear: 1.51 },
    tire: { width: 0.225, length: 0.63 },
  },

  drivetrain: {
    layout: 'convencional',
    engine: { from: 3.25, to: 3.95, halfWidth: 0.34, label: 'Motor EA888 2.0 TSI' },
    shaft: { from: 3.2, to: 3.25, halfWidth: 0.04, label: 'Palieres' },
    gearbox: { from: 3.2, to: 3.6, halfWidth: 0.2, label: 'Caja de cambios' },
    differential: { x: FRONT_AXLE, r: 0.1, label: 'Diferencial' },
  },
};
