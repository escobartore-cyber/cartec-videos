// Episodio 01 — CPC. Datos editoriales del episodio (no de estilo).
export const EP01 = {
  code: 'EP.01 — CPC',
  durationSec: 38,
  audio: 'episodes/01-cpc/voz.mp3',
  /** Mezcla final (voz + efectos) generada por scripts/sfx/mix.py. */
  mix: 'episodes/01-cpc/mezcla.wav',
  /** Palabras que van en rojo en los subtítulos (sin puntuación; da igual mayúsculas). */
  keywords: ['AMG', 'limitada', 'CPC', 'par', 'límites', 'Stage', 'desbloquear', 'recalibrar', 'CAR-TEC'],
  /** Figura n.º / total para la firma de cada escena. */
  fig: (n: number) => `FIG. ${String(n).padStart(2, '0')} / 12`,
} as const;
