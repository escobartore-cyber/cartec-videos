"""Vectoriza un dibujo de línea blanca sobre negro (alzado lateral de un coche) en
trazos animables para Remotion.

- Esqueletiza las líneas y las convierte en polilíneas (se pueden trazar con
  pathLength), en vez de contornos rellenos.
- Detecta las ruedas (Hough) y separa sus trazos para poder girarlas.
- Calcula la silueta exterior (para el relleno negro y la línea gruesa).
- Exporta en metros, con origen en el suelo bajo la trasera y eje Y hacia arriba.

Uso:
  python3 scripts/trace-art.py <imagen> <salida.json> --length 4.546 \
      [--mask cx,cy,r ...] [--wheel-radius min,max]
"""
from __future__ import annotations

import argparse
import json

import numpy as np
from scipy import ndimage, signal
from skimage import color, io, measure, morphology, transform

UP = 2  # sobremuestreo para un esqueleto más suave


def rdp(pts: np.ndarray, eps: float) -> np.ndarray:
    """Simplificación Ramer–Douglas–Peucker."""
    if len(pts) < 3:
        return pts
    a, b = pts[0], pts[-1]
    ab = b - a
    n = np.hypot(*ab) or 1e-9
    d = np.abs(ab[0] * (pts[:, 1] - a[1]) - ab[1] * (pts[:, 0] - a[0])) / n
    i = int(np.argmax(d))
    if d[i] > eps:
        return np.vstack([rdp(pts[: i + 1], eps)[:-1], rdp(pts[i:], eps)])
    return np.vstack([a, b])


def chaikin(pts: np.ndarray, it: int = 2, closed: bool = False) -> np.ndarray:
    for _ in range(it):
        if len(pts) < 3:
            return pts
        p = np.vstack([pts, pts[:1]]) if closed else pts
        q = 0.75 * p[:-1] + 0.25 * p[1:]
        r = 0.25 * p[:-1] + 0.75 * p[1:]
        mid = np.empty((2 * len(q), 2))
        mid[0::2], mid[1::2] = q, r
        pts = mid if closed else np.vstack([pts[:1], mid, pts[-1:]])
    return pts


def skeleton_paths(skel: np.ndarray) -> list[np.ndarray]:
    """Recorre el esqueleto (8-conectividad) y devuelve polilíneas entre nodos."""
    ys, xs = np.nonzero(skel)
    pix = set(zip(ys.tolist(), xs.tolist()))
    nbrs = lambda p: [(p[0] + dy, p[1] + dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1) if (dy or dx) and (p[0] + dy, p[1] + dx) in pix]
    deg = {p: len(nbrs(p)) for p in pix}
    nodes = {p for p, d in deg.items() if d != 2}
    seen: set[tuple] = set()
    paths = []

    def walk(start, nxt):
        path = [start, nxt]
        seen.add((start, nxt))
        seen.add((nxt, start))
        prev, cur = start, nxt
        while cur not in nodes:
            cand = [q for q in nbrs(cur) if q != prev and (cur, q) not in seen]
            if not cand:
                break
            q = cand[0]
            seen.add((cur, q))
            seen.add((q, cur))
            path.append(q)
            prev, cur = cur, q
            if cur == start:
                break
        return path

    for n in nodes:
        for q in nbrs(n):
            if (n, q) not in seen:
                paths.append(walk(n, q))
    # Bucles cerrados sin nodos.
    for p in pix:
        if deg[p] == 2 and not any((p, q) in seen for q in nbrs(p)):
            q = nbrs(p)[0]
            paths.append(walk(p, q))
    return [np.array([[x, y] for y, x in pth], float) for pth in paths]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('image')
    ap.add_argument('out')
    ap.add_argument('--length', type=float, required=True, help='largo real del coche en metros')
    ap.add_argument('--mask', action='append', default=[], help='círculo a borrar: cx,cy,r (px de la imagen)')
    ap.add_argument('--threshold', type=float, default=0.3)
    ap.add_argument('--wheel-radius', default='0.2,0.25', help='radio del neumático como fracción del alto de la imagen: min,max')
    args = ap.parse_args()

    g = color.rgb2gray(io.imread(args.image)[..., :3] / 255.0)
    yy, xx = np.mgrid[: g.shape[0], : g.shape[1]]
    for m in args.mask:
        cx, cy, r = map(float, m.split(','))
        g[(xx - cx) ** 2 + (yy - cy) ** 2 <= r * r] = 0

    # Ruedas: dos círculos de neumático (Hough sobre la imagen original).
    edges = g > 0.35
    rmin, rmax = map(float, args.wheel_radius.split(','))
    radii = np.arange(int(g.shape[0] * rmin), int(g.shape[0] * rmax))  # neumático, no la llanta
    hs = transform.hough_circle(edges, radii)
    _, cxs, cys, rs = transform.hough_circle_peaks(hs, radii, total_num_peaks=2, min_xdistance=int(g.shape[1] * 0.3))
    wheels = sorted(zip(cxs.tolist(), cys.tolist(), rs.tolist()))

    big = transform.rescale(g, UP, order=3, anti_aliasing=False)
    binary = big > args.threshold
    binary = morphology.remove_small_objects(binary, max_size=6)
    skel = morphology.skeletonize(binary)
    raw = skeleton_paths(skel)

    # Silueta exterior: envolvente por columnas (perfil superior e inferior), suavizada.
    body = morphology.remove_small_objects(binary, max_size=40)
    xs_ = np.nonzero(body.any(axis=0))[0]
    top = np.array([np.nonzero(body[:, x])[0].min() for x in xs_], float)
    bot = np.array([np.nonzero(body[:, x])[0].max() for x in xs_], float)
    win = min(len(xs_) // 2 * 2 - 1, 31)
    top, bot = signal.savgol_filter(top, win, 2), signal.savgol_filter(bot, win, 2)
    contour = np.vstack([np.stack([xs_, top], 1), np.stack([xs_[::-1], bot[::-1]], 1)])

    cols = np.nonzero(binary.any(axis=0))[0]
    x0, x1 = cols.min() / UP, cols.max() / UP
    ground = max(cy + r for _, cy, r in wheels)
    k = (x1 - x0) / args.length  # px por metro
    to_m = lambda p: [round((p[0] / UP - x0) / k, 4), round((ground - p[1] / UP) / k, 4)]

    out_paths = []
    for p in raw:
        length = float(np.sum(np.hypot(*np.diff(p, axis=0).T))) if len(p) > 1 else 0
        if length < 10:
            continue
        closed = np.hypot(*(p[0] - p[-1])) < 2.5
        q = chaikin(rdp(p, 0.75), 2, closed=False)
        wheel = None
        for wi, (cx, cy, r) in enumerate(wheels):
            if np.all(np.hypot(p[:, 0] / UP - cx, p[:, 1] / UP - cy) <= r * 1.04):
                wheel = wi
        out_paths.append({'d': [to_m(pt) for pt in q], 'len': round(length / UP / k, 4), 'wheel': wheel, 'closed': bool(closed)})

    sil = rdp(contour, 0.8)
    data = {
        'source': args.image,
        'length': args.length,
        'pxPerM': round(k, 3),
        'wheels': [{'x': round(float(cx - x0) / k, 4), 'y': round(float(ground - cy) / k, 4), 'r': round(float(r) / k, 4)} for cx, cy, r in wheels],
        'silhouette': [to_m(pt) for pt in sil],
        'outline': [to_m(pt) for pt in rdp(np.stack([xs_, top], 1), 0.8)],
        'paths': sorted(out_paths, key=lambda p: min(pt[0] for pt in p['d'])),
    }
    json.dump(data, open(args.out, 'w'), separators=(',', ':'))
    print(f"{len(out_paths)} trazos · ruedas {data['wheels']} · {k:.1f} px/m · silueta {len(sil)} puntos")


if __name__ == '__main__':
    main()
