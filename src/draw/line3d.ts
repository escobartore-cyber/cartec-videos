// Motor de dibujo técnico en línea: proyecta mallas 3D convexas a SVG.
// - Cada malla es convexa: con ocultación de caras traseras basta para que sus
//   caras visibles no se solapen entre sí.
// - Entre mallas se pinta de atrás hacia delante (orden explícito o profundidad).
// - Se dibujan siluetas (gruesas) y aristas vivas (finas); las facetas de
//   superficies curvas no se dibujan.

export type V3 = [number, number, number];
export type V2 = [number, number];

export type Mesh = {
  v: V3[];
  f: number[][];
  /** Ángulo (grados) a partir del cual una arista entre caras visibles se dibuja. */
  crease?: number;
  /** Polilíneas pegadas a una cara: solo se ven si esa cara es visible. */
  decals?: Decal[];
};
export type Decal = { face: number; pts: V3[]; closed?: boolean; accent?: boolean; weight?: number };

export type Style = 'line' | 'accent' | 'ghost';

export type Part = {
  mesh: Mesh;
  style?: Style;
  /** 0–1: trazado progresivo de las aristas. */
  draw?: number;
  opacity?: number;
  /** Orden de pintado explícito (mayor = delante). Si falta, se ordena por profundidad. */
  order?: number;
  /** Rellenar caras de negro (oculta lo de detrás). */
  solid?: boolean;
};

export type Camera = {
  yaw: number; // grados, giro alrededor del eje vertical
  elev: number; // grados, elevación (positivo = vista desde arriba)
  dist: number; // distancia al objetivo (unidades de escena); Infinity = ortográfica
  target: V3;
  scale: number; // px por unidad en el plano del objetivo
  cx: number;
  cy: number;
};

const rad = (d: number) => (d * Math.PI) / 180;
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: V3): V3 => {
  const l = Math.hypot(...a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
const avg = (pts: V3[]): V3 => {
  const s: V3 = [0, 0, 0];
  for (const p of pts) {
    s[0] += p[0];
    s[1] += p[1];
    s[2] += p[2];
  }
  return [s[0] / pts.length, s[1] / pts.length, s[2] / pts.length];
};

/** Rota un punto con ángulos de Euler en grados (orden X, Y, Z). */
export const rotate = (p: V3, r: V3): V3 => {
  let [x, y, z] = p;
  const [ax, ay, az] = r.map(rad);
  [y, z] = [y * Math.cos(ax) - z * Math.sin(ax), y * Math.sin(ax) + z * Math.cos(ax)];
  [x, z] = [x * Math.cos(ay) + z * Math.sin(ay), -x * Math.sin(ay) + z * Math.cos(ay)];
  [x, y] = [x * Math.cos(az) - y * Math.sin(az), x * Math.sin(az) + y * Math.cos(az)];
  return [x, y, z];
};

/** Coloca una malla: escala, rota (grados) y traslada. */
export const place = (m: Mesh, { t = [0, 0, 0], r = [0, 0, 0], s = 1 }: { t?: V3; r?: V3; s?: number | V3 }): Mesh => {
  const sv: V3 = typeof s === 'number' ? [s, s, s] : s;
  const tf = (p: V3): V3 => {
    const q = rotate([p[0] * sv[0], p[1] * sv[1], p[2] * sv[2]], r);
    return [q[0] + t[0], q[1] + t[1], q[2] + t[2]];
  };
  return { ...m, v: m.v.map(tf), decals: m.decals?.map((d) => ({ ...d, pts: d.pts.map(tf) })) };
};

export const makeProjector = (cam: Camera) => {
  const ortho = !Number.isFinite(cam.dist);
  const cy = Math.cos(rad(cam.yaw));
  const sy = Math.sin(rad(cam.yaw));
  const ce = Math.cos(rad(cam.elev));
  const se = Math.sin(rad(cam.elev));
  const toView = (p: V3): V3 => {
    const [x0, y0, z0] = sub(p, cam.target);
    const x1 = x0 * cy + z0 * sy;
    const z1 = -x0 * sy + z0 * cy;
    const y2 = y0 * ce + z1 * se;
    const z2 = -y0 * se + z1 * ce;
    return [x1, y2, z2];
  };
  const toScreen = (v: V3): V2 => {
    const k = ortho ? cam.scale : (cam.scale * cam.dist) / (v[2] + cam.dist);
    return [cam.cx + v[0] * k, cam.cy - v[1] * k];
  };
  const eye: V3 = [0, 0, -cam.dist];
  const facing = (center: V3, n: V3) => (ortho ? n[2] < 0 : dot(n, sub(eye, center)) > 0);
  return { toView, toScreen, facing, project: (p: V3) => toScreen(toView(p)) };
};

export type Stroke = { d: string; width: number; color: 'line' | 'accent'; opacity: number; dash?: string };
export type Layer = { fill: string[]; strokes: Stroke[]; opacity: number; solid: boolean };

const fmt = (p: V2) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
const lerp2 = (a: V2, b: V2, t: number): V2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

/** Calcula las capas SVG (rellenos y trazos) de una escena. */
export const renderScene = (parts: Part[], cam: Camera, widths = { silueta: 2.6, arista: 1.4, detalle: 1 }): Layer[] => {
  const P = makeProjector(cam);
  const items = parts.map((part, i) => {
    const view = part.mesh.v.map(P.toView);
    const center = avg(view);
    return { part, view, depth: center[2], i, center };
  });
  items.sort((a, b) => {
    if (a.part.order !== undefined || b.part.order !== undefined) return (a.part.order ?? 0) - (b.part.order ?? 0);
    return b.depth - a.depth;
  });

  return items.map(({ part, view, center }) => {
    const { mesh } = part;
    const style = part.style ?? 'line';
    const color = style === 'accent' ? 'accent' : 'line';
    const draw = part.draw ?? 1;
    const crease = Math.cos(rad(mesh.crease ?? 28));
    const scr = view.map(P.toScreen);

    // Normales hacia fuera (malla convexa: se orientan respecto al centro).
    const normals = mesh.f.map((face) => {
      const pts = face.map((k) => view[k]);
      let n = norm(cross(sub(pts[1], pts[0]), sub(pts[2], pts[0])));
      if (dot(n, sub(avg(pts), center)) < 0) n = [-n[0], -n[1], -n[2]];
      return n;
    });
    const visible = mesh.f.map((face, fi) => P.facing(avg(face.map((k) => view[k])), normals[fi]));

    // Mapa arista -> caras.
    const edgeFaces = new Map<string, number[]>();
    mesh.f.forEach((face, fi) =>
      face.forEach((a, j) => {
        const b = face[(j + 1) % face.length];
        const key = a < b ? `${a}_${b}` : `${b}_${a}`;
        const list = edgeFaces.get(key) ?? [];
        list.push(fi);
        edgeFaces.set(key, list);
      }),
    );

    const fill: string[] = [];
    mesh.f.forEach((face, fi) => {
      if (visible[fi]) fill.push(`M${face.map((k) => fmt(scr[k])).join('L')}Z`);
    });

    const sil: string[] = [];
    const feat: string[] = [];
    const seg = (a: number, b: number) => `M${fmt(scr[a])}L${fmt(lerp2(scr[a], scr[b], draw))}`;
    edgeFaces.forEach((faces, key) => {
      const [a, b] = key.split('_').map(Number);
      const vis = faces.filter((fi) => visible[fi]);
      if (!vis.length) return;
      if (faces.length === 1 || vis.length === 1) sil.push(seg(a, b));
      else if (dot(normals[faces[0]], normals[faces[1]]) < crease) feat.push(seg(a, b));
    });

    const strokes: Stroke[] = [];
    if (draw > 0) {
      strokes.push({ d: feat.join(''), width: widths.arista, color, opacity: 1 });
      strokes.push({ d: sil.join(''), width: widths.silueta, color, opacity: 1 });
      for (const dc of mesh.decals ?? []) {
        if (!visible[dc.face]) continue;
        const pts = dc.pts.map(P.project);
        const n = Math.max(2, Math.ceil(pts.length * draw));
        const shown = pts.slice(0, n);
        strokes.push({
          d: `M${shown.map(fmt).join('L')}${dc.closed && draw >= 1 ? 'Z' : ''}`,
          width: (dc.weight ?? 1) * widths.detalle,
          color: dc.accent ? 'accent' : color,
          opacity: 0.85,
        });
      }
    }
    return { fill, strokes, opacity: (part.opacity ?? 1) * (style === 'ghost' ? 0.35 : 1), solid: part.solid ?? true };
  });
};

/** Proyecta polilíneas 3D sueltas (ejes, cotas, líneas de construcción) sin ocultación. */
export const projectPolyline = (pts: V3[], cam: Camera) => {
  const P = makeProjector(cam);
  return pts.map(P.project);
};

/** Caja envolvente en pantalla de un conjunto de piezas. */
export const projectedBounds = (parts: Part[], cam: Camera) => {
  const P = makeProjector(cam);
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const part of parts)
    for (const v of part.mesh.v) {
      const [x, y] = P.project(v);
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    }
  return { x0, y0, x1, y1 };
};
