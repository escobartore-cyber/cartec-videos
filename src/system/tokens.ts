// Tokens del sistema de diseño CAR-TEC. Fuente única de verdad: cualquier valor
// visual de una escena sale de aquí. Documentado en CARTEC_DESIGN_SYSTEM.md.

export const CANVAS = { width: 1080, height: 1920, fps: 30 } as const;

export const COLOR = {
  negro: '#0C0C0C', // fondo (mismo negro que el logo oficial)
  grafito: '#161616', // paneles y relleno de piezas
  blanco: '#FFFFFF', // línea principal y texto principal
  gris: '#A3A3A3', // texto secundario
  grisOscuro: '#5C5C5C', // líneas secundarias, ejes
  rojo: '#FF0707', // rojo oficial CAR-TEC: único acento
} as const;

/** Opacidades de línea sobre negro. */
export const ALPHA = {
  linea: 1,
  secundaria: 0.55,
  construccion: 0.28,
  oculta: 0.22,
  reticulaMenor: 0.035,
  reticulaMayor: 0.07,
  sombraRoja: 0.2,
} as const;

/** Grosores de trazo en px a 1080×1920. */
export const STROKE = {
  silueta: 2.6,
  arista: 1.4,
  detalle: 1,
  construccion: 1,
  curva: 5, // curvas de gráficas
} as const;

export const FONT = {
  display: 'Aspekta',
  mono: 'JetBrains Mono',
} as const;

/** Escala tipográfica (px a 1080×1920). */
export const TYPE = {
  portada: { family: FONT.display, weight: 900, size: 150, lineHeight: 0.86, tracking: -0.025, upper: true },
  titulo: { family: FONT.display, weight: 900, size: 104, lineHeight: 0.9, tracking: -0.015, upper: true },
  subtituloEscena: { family: FONT.display, weight: 700, size: 52, lineHeight: 1, tracking: 0, upper: true },
  entradilla: { family: FONT.display, weight: 300, size: 36, lineHeight: 1.22, tracking: 0, upper: false },
  subtitulos: { family: FONT.display, weight: 900, size: 68, lineHeight: 1.02, tracking: -0.01, upper: true },
  etiqueta: { family: FONT.mono, weight: 500, size: 22, lineHeight: 1.45, tracking: 0.1, upper: true },
  dato: { family: FONT.mono, weight: 700, size: 30, lineHeight: 1.2, tracking: 0.04, upper: true },
  micro: { family: FONT.mono, weight: 400, size: 16, lineHeight: 1.5, tracking: 0.16, upper: true },
} as const;
export type TypeStyle = keyof typeof TYPE;

/** Retícula: 6 columnas sobre 936 px útiles, módulo base de 8 px. */
export const GRID = {
  margen: 72,
  columnas: 6,
  columna: 136,
  medianil: 24,
  base: 8,
  celdaMenor: 40,
  celdaMayor: 120,
} as const;
export const col = (n: number) => GRID.margen + n * (GRID.columna + GRID.medianil);
export const span = (n: number) => n * GRID.columna + (n - 1) * GRID.medianil;

/**
 * Zona segura común a Reels, TikTok y Shorts. Texto y datos críticos siempre dentro.
 * El carril derecho (botones) solo molesta entre y=760 e y=1480.
 */
export const SAFE = {
  top: 220,
  bottom: 1480,
  left: 72,
  right: 1008,
  rightRail: { x: 930, from: 760, to: 1480 },
} as const;

/** Bandas verticales fijas de la composición. */
export const BAND = {
  firma: 236, // logo + meta del episodio
  titulo: 330, // arranque del bloque de título
  subtitulos: 1300, // primera línea de subtítulos
} as const;

/** Curvas de animación (cubic-bezier) y duraciones en fotogramas a 30 fps. */
export const EASE = {
  entrada: [0.16, 1, 0.3, 1], // expo out
  salida: [0.7, 0, 0.84, 0], // expo in
  trazo: [0.65, 0, 0.35, 1], // in-out cúbica
  camara: [0.33, 0, 0.67, 1], // in-out suave
} as const;

export const DUR = {
  textoEntrada: 10,
  textoSalida: 6,
  trazoCorto: 14,
  trazoLargo: 28,
  barrido: 6,
  anticipacionCorte: 2, // el corte llega 2 fotogramas antes de la palabra
} as const;
