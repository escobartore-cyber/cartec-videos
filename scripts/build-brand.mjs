// Genera los logos limpios (sin rectángulo de fondo, viewBox ajustado) y
// src/brand/logoPaths.ts para animar el logo por partes (techo, letras, claim).
// Fuente: brand-src/Logo_Blanco_Vector.svg (versión oficial con claim).
import fs from 'node:fs';
import { createRequire } from 'node:module';

// Playwright viene preinstalado de forma global: ejecutar con NODE_PATH=$(npm root -g).
const { chromium } = createRequire(import.meta.url)('playwright');

const src = fs.readFileSync('brand-src/Logo_Blanco_Vector.svg', 'utf8');
const paths = [...src.matchAll(/<path class="(cls-\d)" d="([^"]+)"\/>/g)].map((m) => ({ cls: m[1], d: m[2] }));

// Orden del archivo original: 0-1 techo, 2-26 letras y claim, 27-29 contraformas del claim (cls-2).
const roof = paths.slice(0, 2).map((p) => p.d);
const counters = paths.filter((p) => p.cls === 'cls-2').map((p) => p.d);
const body = paths.slice(2).filter((p) => p.cls !== 'cls-2');

const browser = await chromium.launch();
const page = await browser.newPage();
const bbox = async (ds) => {
  await page.setContent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1189 841" width="1189" height="841"><g>${ds.map((d) => `<path d="${d}"/>`).join('')}</g></svg>`);
  return page.$eval('g', (g) => { const b = g.getBBox(); return { x: b.x, y: b.y, w: b.width, h: b.height }; });
};
const boxes = [];
for (const p of body) boxes.push({ ...p, box: await bbox([p.d]) });
const counterBoxes = [];
for (const d of counters) counterBoxes.push({ d, box: await bbox([d]) });
const all = await bbox(paths.map((p) => p.d));
const compact = await bbox([...roof, ...boxes.filter((b) => b.box.y < 500).map((b) => b.d)]);
await browser.close();

// Contraformas: cada una va con la letra cuya caja la contiene (O, O, A del claim).
const inside = (c, b) => c.x >= b.x && c.y >= b.y && c.x + c.w <= b.x + b.w && c.y + c.h <= b.y + b.h;
for (const b of boxes) {
  const holes = counterBoxes.filter((c) => inside(c.box, b.box));
  if (holes.length) b.d = [b.d, ...holes.map((h) => h.d)].join(' ');
}

const tagline = boxes.filter((b) => b.box.y >= 500).map((b) => b.d);
const white = boxes.filter((b) => b.box.y < 500 && b.cls === 'cls-1').map((b) => b.d);
const red = boxes.filter((b) => b.box.y < 500 && b.cls === 'cls-3').map((b) => b.d);

const pad = 4;
const vb = (b) => [b.x - pad, b.y - pad, b.w + pad * 2, b.h + pad * 2].map((n) => +n.toFixed(2));
const vbFull = vb(all);
const vbCompact = vb(compact);

const svg = (viewBox, ink, withTagline) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.join(' ')}">
  <g fill="${ink}">${[...roof, ...white].map((d) => `\n    <path d="${d}"/>`).join('')}
  </g>
  <g fill="#FF0707">${red.map((d) => `\n    <path d="${d}"/>`).join('')}
  </g>${withTagline ? `\n  <g fill="${ink}" fill-rule="evenodd">${tagline.map((d) => `\n    <path d="${d}"/>`).join('')}\n  </g>` : ''}
</svg>
`;
fs.mkdirSync('public/brand', { recursive: true });
fs.writeFileSync('public/brand/cartec-logo-blanco.svg', svg(vbFull, '#FFFFFF', true));
fs.writeFileSync('public/brand/cartec-logo-blanco-compacto.svg', svg(vbCompact, '#FFFFFF', false));
fs.writeFileSync('public/brand/cartec-logo-negro.svg', svg(vbFull, '#0C0C0C', true));
fs.writeFileSync('public/brand/cartec-logo-negro-compacto.svg', svg(vbCompact, '#0C0C0C', false));

const ts = `// Generado por scripts/build-brand.mjs. No editar a mano.
// Logo oficial CAR-TEC separado por partes para poder animarlo.
export const LOGO_VIEWBOX = ${JSON.stringify(vbFull)} as const;
export const LOGO_VIEWBOX_COMPACT = ${JSON.stringify(vbCompact)} as const;
/** Línea del techo del coche (dos trazos rellenos). */
export const LOGO_ROOF: string[] = ${JSON.stringify(roof, null, 2)};
/** Letras blancas: "c" inicial y "c" final. */
export const LOGO_WHITE: string[] = ${JSON.stringify(white, null, 2)};
/** Letras rojas: "ar-te". */
export const LOGO_RED: string[] = ${JSON.stringify(red, null, 2)};
/** Claim "AUTOMOTIVE ENGINEERING" (usar fill-rule evenodd). */
export const LOGO_TAGLINE: string[] = ${JSON.stringify(tagline, null, 2)};
`;
fs.mkdirSync('src/brand', { recursive: true });
fs.writeFileSync('src/brand/logoPaths.ts', ts);
console.log({ vbFull, vbCompact, roof: roof.length, white: white.length, red: red.length, tagline: tagline.length, counters: counters.length });
