import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';
import { FONT } from './tokens';

// Aspekta: Light 300, Bold 700, Heavy 900. JetBrains Mono: 400, 500, 700.
const faces = [
  { family: FONT.display, file: 'fonts/Aspekta-300.otf', weight: '300', format: 'opentype' },
  { family: FONT.display, file: 'fonts/Aspekta-700.otf', weight: '700', format: 'opentype' },
  { family: FONT.display, file: 'fonts/Aspekta-900.otf', weight: '900', format: 'opentype' },
  { family: FONT.mono, file: 'fonts/JetBrainsMono-400.woff2', weight: '400', format: 'woff2' },
  { family: FONT.mono, file: 'fonts/JetBrainsMono-500.woff2', weight: '500', format: 'woff2' },
  { family: FONT.mono, file: 'fonts/JetBrainsMono-700.woff2', weight: '700', format: 'woff2' },
] as const;

export const fontsReady = Promise.all(
  faces.map((f) => loadFont({ family: f.family, url: staticFile(f.file), weight: f.weight, format: f.format })),
);
