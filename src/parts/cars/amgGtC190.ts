// Mercedes-AMG GT coupé, generación C190 (2014–2021).
// Medidas generales del fabricante: largo 4546 mm, batalla 2630 mm, alto ≈1287 mm,
// ancho 1939 mm. La silueta es un dibujo ilustrativo hecho a mano con esas
// proporciones: no es un plano de fabricante y no lleva logotipos.
// Disposición: motor delantero-central (V8 biturbo), tubo de transmisión y caja
// de doble embrague en el eje trasero (transaxle), propulsión trasera.
import type { CarProfile } from './types';

const REAR_AXLE = 0.966;
const FRONT_AXLE = REAR_AXLE + 2.63;

export const AMG_GT_C190: CarProfile = {
  id: 'amg-gt-c190',
  nombre: 'Mercedes-AMG GT',
  codigo: 'C190 · Coupé 2014–2021',
  length: 4.546,
  width: 1.939,
  rearAxle: REAR_AXLE,
  frontAxle: FRONT_AXLE,
  tireR: 0.34,
  archR: 0.372,
  sillY: 0.19,

  side: {
    // De la parte baja del paragolpes trasero hasta la base del parabrisas.
    upper: [
      [0.1, 0.28], [0.03, 0.4], [0.01, 0.58], [0.04, 0.78], [0.1, 0.88], [0.22, 0.925], [0.45, 0.968],
      [0.8, 1.06], [1.15, 1.17], [1.5, 1.252], [1.8, 1.287], [2.05, 1.272], [2.3, 1.185], [2.55, 1.045], [2.72, 0.972],
    ],
    // Del parabrisas al morro y al bajo del paragolpes delantero.
    hood: [[2.72, 0.972], [3.2, 0.927], [3.75, 0.862], [4.15, 0.792], [4.4, 0.712], [4.51, 0.62], [4.546, 0.5], [4.53, 0.36], [4.48, 0.24], [4.42, 0.19]],
    rearBottom: [0.1, 0.28],
    details: [
      { name: 'ventanilla', kind: 'spline', closed: true, pts: [[1.18, 1.095], [1.45, 1.205], [1.78, 1.242], [2.05, 1.226], [2.3, 1.13], [2.55, 0.998]] },
      { name: 'puertaDelante', kind: 'spline', pts: [[2.55, 0.998], [2.62, 0.8], [2.66, 0.45], [2.66, 0.27]] },
      { name: 'puertaDetras', kind: 'spline', pts: [[1.34, 1.085], [1.42, 0.85], [1.48, 0.55], [1.5, 0.27]] },
      { name: 'bajoPuerta', kind: 'poly', pts: [[2.66, 0.27], [1.5, 0.27]] },
      { name: 'hombro', kind: 'spline', pts: [[4.1, 0.8], [3.4, 0.79], [2.6, 0.765], [1.9, 0.772], [1.3, 0.83], [0.7, 0.88], [0.25, 0.892]] },
      { name: 'faldon', kind: 'spline', pts: [[3.24, 0.31], [2.4, 0.292], [1.36, 0.31]] },
      { name: 'branquias', kind: 'poly', closed: true, pts: [[2.95, 0.56], [3.22, 0.585], [3.22, 0.685], [2.95, 0.66]] },
      { name: 'branquia1', kind: 'poly', pts: [[2.97, 0.595], [3.2, 0.617]] },
      { name: 'branquia2', kind: 'poly', pts: [[2.97, 0.628], [3.2, 0.65]] },
      { name: 'tirador', kind: 'poly', closed: true, pts: [[1.68, 0.83], [1.88, 0.83], [1.88, 0.85], [1.68, 0.85]] },
      { name: 'retrovisor', kind: 'spline', pts: [[2.62, 1.0], [2.56, 1.072], [2.45, 1.087], [2.4, 1.04], [2.47, 0.996]] },
      { name: 'faro', kind: 'poly', closed: true, pts: [[3.95, 0.83], [4.38, 0.732], [4.47, 0.66], [4.36, 0.672], [4.0, 0.787]] },
      { name: 'piloto', kind: 'poly', closed: true, pts: [[0.03, 0.8], [0.3, 0.875], [0.33, 0.85], [0.04, 0.765]] },
      { name: 'toma', kind: 'spline', pts: [[4.535, 0.42], [4.42, 0.38], [4.36, 0.28], [4.35, 0.21]] },
      { name: 'capo', kind: 'spline', pts: [[2.8, 0.955], [3.5, 0.888], [4.1, 0.795]] },
      { name: 'aleron', kind: 'poly', pts: [[0.13, 0.905], [0.42, 0.955]] },
      { name: 'difusor', kind: 'poly', pts: [[0.06, 0.33], [0.55, 0.3]] },
    ],
  },

  top: {
    // Semiancho (m) a lo largo del coche, de la trasera (x=0) al morro.
    outline: [
      [0, 0], [0.02, 0.45], [0.08, 0.78], [0.25, 0.92], [0.6, 0.965], [1.0, 0.97], [1.5, 0.94], [2.1, 0.905], [2.7, 0.92],
      [3.3, 0.955], [3.8, 0.935], [4.2, 0.83], [4.42, 0.62], [4.52, 0.36], [4.546, 0],
    ],
    greenhouse: [[0.4, 0.4], [0.9, 0.55], [1.5, 0.6], [2.2, 0.6], [2.72, 0.63]],
    glassBreaks: [1.45, 2.3],
    track: { front: 1.68, rear: 1.65 },
    tire: { width: 0.27, length: 0.68 },
  },

  drivetrain: {
    layout: 'transaxle',
    engine: { from: 2.85, to: 3.62, halfWidth: 0.36, label: 'Motor V8 biturbo' },
    shaft: { from: 1.36, to: 2.85, halfWidth: 0.05, label: 'Tubo de transmisión' },
    gearbox: { from: 0.7, to: 1.36, halfWidth: 0.27, label: 'Caja de cambios · transaxle' },
    differential: { x: REAR_AXLE, r: 0.12, label: 'Diferencial' },
  },
};
