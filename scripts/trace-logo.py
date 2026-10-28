"""Vectoriza un logotipo plano (claro sobre oscuro) en contornos rellenos para SVG.

Uso: python3 scripts/trace-logo.py <imagen> <salida.ts> <NOMBRE_CONSTANTE>
Genera un módulo TS con el viewBox y el atributo d (usar fill-rule evenodd).
"""
import sys

import numpy as np
from skimage import color, io, measure, transform

UP = 4


def rdp(pts, eps):
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


src, out, name = sys.argv[1:4]
img = io.imread(src)
g = color.rgb2gray(img[..., :3]) if img.ndim == 3 else img / 255.0
big = transform.rescale(g, UP, order=3)
contours = [c[:, ::-1] / UP for c in measure.find_contours(big, 0.5) if len(c) > 20]
xs = np.concatenate([c[:, 0] for c in contours])
ys = np.concatenate([c[:, 1] for c in contours])
x0, y0 = xs.min(), ys.min()
w, h = xs.max() - x0, ys.max() - y0


def rdp_closed(c, eps):
    # Contorno cerrado: se parte por el punto más lejano al inicio y se simplifica cada mitad.
    k = int(np.argmax(np.hypot(*(c - c[0]).T)))
    return np.vstack([rdp(c[: k + 1], eps)[:-1], rdp(c[k:], eps)])


d = ''.join('M' + 'L'.join(f'{p[0] - x0:.2f} {p[1] - y0:.2f}' for p in rdp_closed(c, 0.12)) + 'Z' for c in contours)
open(out, 'w').write(
    f"// Generado por scripts/trace-logo.py desde {src}. No editar a mano.\n"
    f"export const {name}_VIEWBOX = [0, 0, {w:.2f}, {h:.2f}] as const;\n"
    f"export const {name}_D = '{d}';\n"
)
print(f'{len(contours)} contornos · {w:.0f}×{h:.0f}')
