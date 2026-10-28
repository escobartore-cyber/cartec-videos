// Línea de tiempo del EP.03 (s), sacada del SRT corregido de public/episodes/03-downpipe.
import type { SceneDef } from '../common/episode';

export const W = {
  paraQue: 0.04,
  downpipe: 0.8,
  hayUna: 1.24,
  escape: 1.68,
  rendimiento: 3.24,
  motorTurbo: 3.96,
  seLlama: 4.68,
  situada: 5.48,
  justoDespues: 6.16,
  cuandoGases: 7.24,
  atraviesan: 8.08,
  hacenGirar: 8.96,
  turbina: 9.48,
  compresor: 10.24,
  introducir: 11.16,
  despues: 12.52,
  abandonar: 13.48,
  laDownpipe: 14.92,
  recorrido: 16.04,
  diseno: 16.6,
  capacidad: 17.04,
  resistencia: 18.52,
  salida: 20.32,
  determinadas: 21.4,
  reducir: 22.56,
  mejorar: 24.04,
  peroTambien: 25.4,
  emisiones: 26.6,
  temperatura: 27.12,
  calibracion: 27.76,
  stage2: 28.92,
  componentes: 30.48,
  conjuntamente: 31.88,
  finVoz: 32.96,
} as const;

export const EP03_DURATION = 35;

export const SCENES: SceneDef[] = [
  { id: 'S01', from: 0, to: W.hayUna, fig: 1 },
  { id: 'S02', from: W.hayUna, to: W.seLlama, fig: 2 },
  { id: 'S03', from: W.seLlama, to: W.cuandoGases, fig: 3 },
  { id: 'S04', from: W.cuandoGases, to: W.despues, fig: 4 },
  { id: 'S05', from: W.despues, to: W.diseno, fig: 5 },
  { id: 'S06', from: W.diseno, to: W.determinadas, fig: 6 },
  { id: 'S07', from: W.determinadas, to: W.peroTambien, fig: 7 },
  { id: 'S08', from: W.peroTambien, to: W.stage2, fig: 8 },
  { id: 'S09', from: W.stage2, to: W.finVoz, fig: 9 },
  { id: 'S10', from: W.finVoz, to: EP03_DURATION, fig: 10 },
];
