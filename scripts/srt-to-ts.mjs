// Convierte un SRT (ya corregido) en un módulo TS con los cues en segundos.
// Uso: node scripts/srt-to-ts.mjs public/episodes/01-cpc/subtitulos.srt src/episodes/ep01-cpc/cues.ts
import fs from 'node:fs';
import path from 'node:path';

const [, , srcPath, outPath] = process.argv;
const toSec = (t) => {
  const [h, m, rest] = t.trim().split(':');
  const [s, ms] = rest.split(',');
  return +h * 3600 + +m * 60 + +s + +ms / 1000;
};
const cues = fs
  .readFileSync(srcPath, 'utf8')
  .replace(/\r/g, '')
  .trim()
  .split(/\n\s*\n/)
  .map((block) => {
    const lines = block.trim().split('\n');
    const [a, b] = lines[1].split('-->');
    return { start: toSec(a), end: toSec(b), text: lines.slice(2).join(' ').trim() };
  });
const body = cues.map((c) => `  { start: ${c.start.toFixed(3)}, end: ${c.end.toFixed(3)}, text: ${JSON.stringify(c.text)} },`).join('\n');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(
  outPath,
  `// Generado por scripts/srt-to-ts.mjs desde ${srcPath}. No editar a mano: corregir el SRT y regenerar.
import type { Cue } from '../../components/Subtitles';

export const CUES: Cue[] = [
${body}
];
`,
);
console.log(`${cues.length} cues -> ${outPath}`);
