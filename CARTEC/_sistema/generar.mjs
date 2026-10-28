// Genera, a partir de recursos.mjs y de los archivos que ya hay en las carpetas:
//   CARTEC/LISTA_MAESTRA.md
//   CARTEC/EPISODES/<EP>/ASSET_REQUEST.md y ASSET_STATUS.md
//   CARTEC/SHARED_ASSETS/<CATEGORÍA>/README.md
// Uso (desde la raíz del repositorio): node CARTEC/_sistema/generar.mjs
// Un recurso cuenta como recibido si en su carpeta hay un archivo cuyo nombre empieza
// por su código (p. ej. «SH-TUR-01_lado-compresor.jpg»).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CARPETAS_COMPARTIDAS, EPISODIOS, PRIORIDADES, RECURSOS, TIPOS } from './recursos.mjs';

const CARTEC = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAIZ = path.resolve(CARTEC, '..');
const HOY = new Date().toISOString().slice(0, 10);
const CABECERA = `> Generado por \`node CARTEC/_sistema/generar.mjs\` el ${HOY}. No editar a mano: los cambios van en \`CARTEC/_sistema/recursos.mjs\`.`;

const ESTADO = {
  disponible: 'Disponible',
  pendiente: 'Pendiente',
  reemplazable: 'Reemplazable por ilustración conceptual',
  verificar: 'Requiere verificación',
};

const ordenEp = (id) => EPISODIOS.findIndex((e) => e.id === id);
const primerEp = (r) => [...r.episodios].sort((a, b) => ordenEp(a) - ordenEp(b))[0];
const ordenar = (a, b) => a.prioridad.localeCompare(b.prioridad) || ordenEp(primerEp(a)) - ordenEp(primerEp(b)) || a.id.localeCompare(b.id);

/** Archivos de la carpeta del recurso cuyo nombre empieza por su código (o por su prefijo fijo). */
const recibidos = (r) => {
  if (!r.carpeta) return [];
  const dir = path.join(RAIZ, r.carpeta);
  if (!fs.existsSync(dir)) return [];
  const inicio = (r.prefijo ?? r.id).toUpperCase();
  return fs.readdirSync(dir).filter((f) => f.toUpperCase().startsWith(inicio));
};

const estadoDe = (r) => {
  if (r.tipo === 'validacion') return r.verificado ? ESTADO.disponible : ESTADO.verificar;
  const llegado = recibidos(r).length > 0 || Boolean(r.respuesta) || Boolean(r.disponibleEn);
  if (llegado) return r.verificar && !r.verificado ? ESTADO.verificar : ESTADO.disponible;
  if (!r.alternativa) return ESTADO.pendiente;
  return r.reemplazo ? `Reemplazable por ${r.reemplazo}` : ESTADO.reemplazable;
};
const esReemplazable = (r) => estadoDe(r).startsWith('Reemplazable');
const cuentaEstado = (lista, e) => lista.filter((r) => (e === ESTADO.reemplazable ? esReemplazable(r) : estadoDe(r) === e)).length;

const ubicacion = (r) => {
  if (r.disponibleEn) {
    const enRepo = fs.existsSync(path.join(RAIZ, r.disponibleEn));
    return enRepo ? `\`${r.disponibleEn}\`` : `\`${r.disponibleEn}\` (entregado en la sesión del EP01; aún no está en el repositorio)`;
  }
  if (!r.carpeta) return 'Respuesta por chat';
  const archivos = recibidos(r);
  if (archivos.length) return archivos.map((f) => `\`${r.carpeta}/${f}\``).join(', ');
  return `\`${r.carpeta}/${r.archivo}\``;
};

const notaDe = (r) =>
  [
    r.respuesta && `Respuesta: ${r.respuesta}`,
    r.nota,
    r.verificar && !r.verificado && `Verificar: ${r.verificar}`,
    !recibidos(r).length && !r.respuesta && !r.disponibleEn && r.alternativa && `Si falta: ${r.alternativa}`,
  ]
    .filter(Boolean)
    .join(' · ');

const celda = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const tabla = (cols, filas) =>
  [`| ${cols.join(' | ')} |`, `|${cols.map(() => '---').join('|')}|`, ...filas.map((f) => `| ${f.map(celda).join(' | ')} |`)].join('\n');

const escenasTexto = (r, soloEp) =>
  Object.entries(r.escena)
    .filter(([e]) => !soloEp || e === soloEp)
    .map(([e, t]) => `${e}: ${t}`)
    .join(' · ') || (soloEp ? 'Todo el episodio' : '—');

const ficha = (r, soloEp) => {
  const otros = r.episodios.filter((e) => e !== soloEp);
  const lineas = [
    `### ${r.id} — ${r.nombre}`,
    '',
    `- **Archivo solicitado:** ${r.carpeta ? `\`${r.carpeta}/${r.archivo}\`` : r.archivo ?? 'No es un archivo: respóndelo en el chat.'}`,
    `- **Episodio:** ${soloEp ? `${soloEp}${otros.length ? ` (también ${otros.join(', ')})` : ''}` : r.episodios.join(', ')}`,
    `- **Tipo de recurso:** ${TIPOS[r.tipo]}`,
    `- **Qué debe verse:** ${r.ve}`,
    `- **Ángulo o perspectiva:** ${r.angulo}`,
    `- **Resolución mínima:** ${r.resolucion}`,
    `- **Formato recomendable:** ${r.formato}`,
    `- **Fondo transparente:** ${r.transparente}`,
    `- **Escena:** ${escenasTexto(r, soloEp)}`,
    `- **Partes separadas para animar:** ${r.capas}`,
    `- **Prioridad:** ${r.prioridad} · ${PRIORIDADES[r.prioridad]}`,
    `- **Reutilizable en otros episodios:** ${r.reutilizable}`,
  ];
  if (r.alternativa) lineas.push(`- **Si falta:** ${r.alternativa}`);
  if (r.verificar) lineas.push(`- **Requiere verificación:** ${r.verificar}`);
  if (r.nota) lineas.push(`- **Nota:** ${r.nota}`);
  lineas.push(`- **Estado:** ${estadoDe(r)}`);
  return lineas.join('\n');
};

const COMO_ENTREGAR = `## Cómo entregar el material

1. **Desde el móvil:** adjúntalo en el chat de Claude y di su código (por ejemplo, «esto es SH-TUR-01» o «locución del EP02»). Yo lo renombro y lo coloco en su carpeta.
2. **Desde el ordenador:** súbelo a la carpeta indicada con un nombre que empiece por el código. Si son varias fotos del mismo recurso, añade un sufijo: \`SH-TUR-01_lado-compresor.jpg\`, \`SH-TUR-01_perfil.jpg\`. La locución y el SRT van con el nombre fijo del flujo de producción: \`public/episodes/NN-tema/voz.wav\` y \`subtitulos.srt\`.
3. **Decisiones y datos en texto:** contéstalos en el chat citando el código.

Las referencias para dibujar **no salen en el vídeo**: pueden ser fotos de móvil, imágenes del catálogo del fabricante o despieces de recambios. Sirven para que las piezas dibujadas tengan la forma real.`;

// ───────────────────────── Lista maestra ─────────────────────────
const listaMaestra = () => {
  const todos = [...RECURSOS].sort(ordenar);
  const porEstado = Object.values(ESTADO).map((e) => `${e}: ${cuentaEstado(todos, e)}`).join(' · ');
  const porPrioridad = Object.entries(PRIORIDADES)
    .map(([p, t]) => `${p} ${t}: ${todos.filter((r) => r.prioridad === p).length}`)
    .join(' · ');
  const secciones = Object.entries(PRIORIDADES)
    .map(([p, t]) => {
      const grupo = todos.filter((r) => r.prioridad === p);
      return grupo.length ? [`## ${p} · ${t}`, '', ...grupo.map((r) => ficha(r) + '\n')].join('\n') : '';
    })
    .filter(Boolean);
  return `# Lista maestra de material · Temporada 01

${CABECERA}

Todo lo que necesito de ti para producir los ocho episodios, ordenado por prioridad. Cada recurso se pide **una sola vez** aunque se use en varios episodios.

- **Peticiones:** ${todos.length} (${porPrioridad})
- **Estado:** ${porEstado}

## Lo que ya no te pido

Se siguen las decisiones aprobadas en la sesión del EP01: no hay fotos ni metraje en pantalla, todo es dibujo técnico de línea hecho con código, ningún espacio del taller es reconocible y los efectos de sonido se sintetizan. Por eso no pido fotos para montar, metraje del taller, capturas de software de calibración ni bibliotecas de efectos. Logotipos, tipografías, la locución y el SRT del EP01 ya están entregados.

${COMO_ENTREGAR}

## Índice

${tabla(
  ['Prioridad', 'Código', 'Recurso', 'Episodios', 'Tipo', 'Dónde va', 'Estado'],
  todos.map((r) => [r.prioridad, r.id, r.nombre, r.episodios.join(' '), TIPOS[r.tipo], ubicacion(r), estadoDe(r)]),
)}

${secciones.join('\n')}`;
};

// ───────────────────────── Por episodio ─────────────────────────
const assetRequest = (ep) => {
  const propios = RECURSOS.filter((r) => r.episodios.includes(ep.id)).sort(ordenar);
  const nuevos = propios.filter((r) => primerEp(r) === ep.id);
  const yaPedidos = propios.filter((r) => primerEp(r) !== ep.id);
  return `# ASSET_REQUEST · ${ep.id} · ${ep.titulo}

${CABECERA}

Material que necesito para producir el ${ep.id}. Las escenas (S01, S02…) son las de \`STORYBOARD.md\`.

${COMO_ENTREGAR}

## Resumen

${tabla(
  ['Código', 'Recurso', 'Prioridad', 'Estado'],
  propios.map((r) => [r.id, r.nombre, `${r.prioridad} · ${PRIORIDADES[r.prioridad]}`, estadoDe(r)]),
)}

## Peticiones nuevas en este episodio

${nuevos.length ? nuevos.map((r) => ficha(r, ep.id)).join('\n\n') : 'Ninguna: todo lo de este episodio se pidió antes.'}

## Ya pedido en un episodio anterior: no lo envíes otra vez

${
  yaPedidos.length
    ? tabla(
        ['Código', 'Recurso', 'Pedido en', 'Uso en este episodio', 'Estado'],
        yaPedidos.map((r) => [r.id, r.nombre, primerEp(r), escenasTexto(r, ep.id), estadoDe(r)]),
      )
    : 'Nada.'
}
`;
};

const assetStatus = (ep) => {
  const propios = RECURSOS.filter((r) => r.episodios.includes(ep.id)).sort(ordenar);
  const cuenta = Object.values(ESTADO).map((e) => `**${e}:** ${cuentaEstado(propios, e)}`).join(' · ');
  return `# ASSET_STATUS · ${ep.id} · ${ep.titulo}

${CABECERA}

${cuenta}

${tabla(
  ['Código', 'Recurso', 'Prioridad', 'Estado', 'Ubicación', 'Notas'],
  propios.map((r) => [r.id, r.nombre, r.prioridad, estadoDe(r), ubicacion(r), notaDe(r)]),
)}

**Estados.** Disponible: recibido y listo. Pendiente: falta y no tiene sustituto. Reemplazable por ilustración conceptual: falta, pero se puede producir con un dibujo genérico rotulado como «Esquema ilustrativo · no a escala» (en sonidos, con sonido sintetizado; en el sello legal, con un texto genérico). Requiere verificación: hay que confirmar el dato con el responsable del taller antes de publicar.
`;
};

// ───────────────────────── SHARED_ASSETS ─────────────────────────
const readmeCarpeta = (cat, descripcion) => {
  const aqui = RECURSOS.filter((r) => r.carpeta === `CARTEC/SHARED_ASSETS/${cat}`).sort(ordenar);
  const cuerpo = aqui.length
    ? tabla(
        ['Código', 'Archivo', 'Episodios', 'Prioridad', 'Estado'],
        aqui.map((r) => [r.id, `\`${r.archivo}\``, r.episodios.join(' '), r.prioridad, estadoDe(r)]),
      )
    : 'De momento no se pide nada para esta carpeta.';
  return `# SHARED_ASSETS/${cat}

${CABECERA}

${descripcion}

${cuerpo}

Cada archivo empieza por su código. La ficha completa de cada uno está en \`CARTEC/LISTA_MAESTRA.md\`.
`;
};

const escribir = (rel, contenido) => {
  const destino = path.join(CARTEC, rel);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, contenido);
  console.log(`  ${path.relative(RAIZ, destino)}`);
};

const ids = RECURSOS.map((r) => r.id);
const repetidos = ids.filter((id, i) => ids.indexOf(id) !== i);
if (repetidos.length) throw new Error(`Códigos repetidos en recursos.mjs: ${repetidos.join(', ')}`);

console.log('Generando documentos de recursos:');
escribir('LISTA_MAESTRA.md', listaMaestra());
for (const ep of EPISODIOS) {
  escribir(`EPISODES/${ep.carpeta}/ASSET_REQUEST.md`, assetRequest(ep));
  escribir(`EPISODES/${ep.carpeta}/ASSET_STATUS.md`, assetStatus(ep));
}
for (const [cat, descripcion] of Object.entries(CARPETAS_COMPARTIDAS)) escribir(`SHARED_ASSETS/${cat}/README.md`, readmeCarpeta(cat, descripcion));
