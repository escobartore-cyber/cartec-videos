// Reglas de movimiento del sistema (ver CARTEC_DESIGN_SYSTEM.md §10).
// Todo se expresa en segundos de la línea de tiempo global del episodio (T),
// para poder sincronizar con los tiempos del SRT sin conversiones.
import { Easing } from 'remotion';
import { EASE } from './tokens';

export const ease = {
  entrada: Easing.bezier(...EASE.entrada),
  salida: Easing.bezier(...EASE.salida),
  trazo: Easing.bezier(...EASE.trazo),
  camara: Easing.bezier(...EASE.camara),
  lineal: (x: number) => x,
};

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Progreso 0–1 entre `start` y `start + dur` (segundos), con curva. */
export const prog = (T: number, start: number, dur: number, curve: (x: number) => number = ease.trazo) =>
  curve(clamp01((T - start) / dur));

/** Interpolación lineal. */
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;

/** Índice del plano activo: `cuts` son los instantes de corte (inicio de cada plano salvo el primero). */
export const shot = (T: number, cuts: number[]) => cuts.filter((c) => T >= c).length;

/** Deriva continua de cámara: nada está quieto. */
export const drift = (T: number, start: number, perSec = 0.025) => 1 + Math.max(0, T - start) * perSec;

/** Sacudida amortiguada (impacto del limitador, golpe del candado). */
export const shake = (T: number, at: number, amp = 14, dur = 0.35) => {
  const t = T - at;
  if (t < 0 || t > dur) return 0;
  return amp * Math.sin(t * 90) * (1 - t / dur) ** 2;
};

/** Duraciones de transición en segundos (6 fotogramas de barrido a 30 fps). */
export const WHIP_IN = 0.2;
export const WHIP_OUT = 0.14;
