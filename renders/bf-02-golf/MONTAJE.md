# BF-02 · Golf R · Hoja de montaje en Premiere

Vídeo base: `IMG_5444` (2160 × 3840, 59,94 fps, 46,41 s).

## Archivos

| Archivo | Qué es |
|---|---|
| `BF02_GOLFR_CAPA_4K_RELLENO.mp4` | Capa de gráficos 2160 × 3840 (el color), 30 fps, 46,41 s, sin audio |
| `BF02_GOLFR_CAPA_4K_MATE.mp4` | Su transparencia en blanco y negro (blanco = se ve, negro = transparente) |
| `BF02_GOLFR_VISTA_PREVIA.mp4` | Vista previa 1080 con tu vídeo debajo y una caja gris donde van los clips. Solo es de referencia: no se publica |

## Cómo montarlo

1. Secuencia 2160 × 3840 a 59,94 fps (la de tu vídeo).
2. **V1:** tu vídeo `IMG_5444` en 00:00.
3. **V2:** los clips horizontales (ver la tabla de abajo).
4. **V3:** `BF02_GOLFR_CAPA_4K_RELLENO.mp4` en 00:00.
5. **V4:** `BF02_GOLFR_CAPA_4K_MATE.mp4` en 00:00, con el **ojo de la pista apagado**.
6. En el clip de V3: efecto **Mate de seguimiento** (*Track Matte Key*) → Mate: **Vídeo 4** · Composición mediante: **Mate de luminancia**.
7. Si añades subtítulos, déjalos por debajo de y ≈ 3000 (en 4K). Los gráficos no bajan de ahí.

> ¿Por qué dos archivos? Un ProRes 4444 con alfa en 4K pesaba más de 3 GB. Así son dos H.264 de pocos MB con la misma calidad de borde. Si prefieres la secuencia PNG con transparencia, pídemela.

## La ventana para los clips horizontales (8,46 s → 21,20 s)

Mientras tu vídeo está en negro, la capa pone su propio fondo con la retícula y deja un **hueco 16:9**. Todo lo que pongas en V2 se ve solo a través de ese hueco. El resto lo tapa la capa, así que no hace falta recortar nada.

| | 4K (2160 × 3840) |
|---|---|
| Hueco | x 144 · y 1120 · 1872 × 1054 px |
| Centro (Posición en Premiere) | **1080 · 1647** |
| Escala si el clip es 4K (3840 × 2160) | **49 %** |
| Escala si el clip es 1080p (1920 × 1080) | **98 %** |

Pasarse un poco de escala no importa, porque lo que sobra queda tapado. Quedarse corto sí se nota: se vería un borde negro dentro del marco.

## Qué clip va en cada tramo

Los cortes coinciden con la palabra de la locución. En la capa, la fila de la pieza se enciende en rojo en ese instante.

| # | Entra | Sale | Dura | Locución | Clip sugerido |
|---|---|---|---|---|---|
| 01 | 8,46 | 9,99 | 1,5 s | «…una admisión Racingline» | Admisión / filtro, capó abierto |
| 02 | 9,99 | 11,04 | 1,0 s | «una downpipe Drakonic» | Downpipe o escape por debajo |
| 03 | 11,04 | 12,68 | 1,6 s | «un turbo LM540» | Turbo |
| 04 | 12,68 | 13,51 | 0,8 s | «y un intercooler frontal» | Frontal / intercooler |
| 05 | 13,51 | 15,17 | 1,7 s | «todo acompañado de electrónica a medida» | Portátil, OBD o centralita |
| 06 | 15,17 | 18,49 | 3,3 s | «…la experiencia de conducción como al sonido» | En marcha / escape sonando |
| 07 | 18,49 | 21,20 | 2,7 s | «cada preparación se puede adaptar…» | Plano bonito del coche (cierre) |

En 59,94 fps: 8,46 s = 00:00:08:28 · 21,20 s = 00:00:21:12.

## Para confirmar antes de publicar

- La grafía de las marcas tal y como aparecen en pantalla: **RACINGLINE**, **DRAKONIC**, **LM540**. Las he puesto como suenan en el SRT.
- Las cifras salen de tu locución: 320 CV de serie y 540 CV como **objetivo**. En pantalla pone «Objetivo CAR-TEC», no «medido». Si tenéis la cifra de banco, se cambia.
