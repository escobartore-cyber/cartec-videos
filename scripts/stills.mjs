// Renderiza los fotogramas de revisión (todas las <Still> o una lista) con un
// único empaquetado y genera una hoja de contactos.
// Uso: node scripts/stills.mjs [prefijo] [carpeta-salida] [tiempos]
//   node scripts/stills.mjs EP01 out/stills              → todas las <Still> que empiezan por EP01
//   node scripts/stills.mjs EP01 out/qa 0.6,5.2,15.3     → fotogramas de la composición EP01 en esos segundos
import { bundle } from '@remotion/bundler';
import { getCompositions, renderStill } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [, , prefix = '', outDir = 'out/stills', times] = process.argv;
const browserExecutable = process.env.REMOTION_BROWSER ?? null;
fs.mkdirSync(outDir, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.resolve('src/index.ts') });
const all = await getCompositions(serveUrl, { browserExecutable });
const jobs = times
  ? times.split(',').map((t) => {
      const composition = all.find((c) => c.id === prefix);
      return { composition, frame: Math.round(Number(t) * composition.fps), name: `${prefix}-t${Number(t).toFixed(2)}` };
    })
  : all.filter((c) => c.durationInFrames === 1 && c.id.startsWith(prefix)).map((composition) => ({ composition, frame: 0, name: composition.id }));
const files = [];
for (const { composition, frame, name } of jobs) {
  const output = path.join(outDir, `${name}.png`);
  await renderStill({ composition, frame, serveUrl, output, browserExecutable });
  files.push(output);
  console.log('✓', output);
}
if (files.length > 1) {
  const sheet = path.join(outDir, '_hoja.png');
  execFileSync('montage', [...files, '-tile', '5x', '-geometry', '360x640+8+8', '-background', '#0C0C0C', sheet]);
  console.log('Hoja de contactos:', sheet);
}
