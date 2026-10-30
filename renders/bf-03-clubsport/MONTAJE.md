# BF-03 · Golf R y GTI Clubsport · Hoja de montaje en Premiere

Vídeo base: `IMG_5472` (2160 × 3840, 30 fps, 27,17 s).

## Archivos

| Archivo | Qué es |
|---|---|
| `BF03_CLUBSPORT_CAPA_4K_RELLENO.mp4` | Capa de gráficos 2160 × 3840 (el color), 30 fps, sin audio |
| `BF03_CLUBSPORT_CAPA_4K_MATE.mp4` | Su transparencia (blanco = se ve, negro = transparente) |
| `BF03_CLUBSPORT_SFX.wav` | Solo los efectos de sonido, 48 kHz, ya ajustados a tu voz. Se pone en 00:00 |
| `BF03_CLUBSPORT_VISTA_PREVIA.mp4` | Vista previa 1080 con tu vídeo, la capa y la mezcla. Solo es de referencia |

## Cómo montarlo

1. Secuencia 2160 × 3840 a 30 fps.
2. **V1:** tu vídeo `IMG_5472` en 00:00.
3. **V2:** los clips horizontales, solo entre 16,10 y 20,70 s (ver la tabla).
4. **V3:** `BF03_CLUBSPORT_CAPA_4K_RELLENO.mp4` en 00:00.
5. **V4:** `BF03_CLUBSPORT_CAPA_4K_MATE.mp4` en 00:00, con el **ojo de la pista apagado**.
6. En el clip de V3: efecto **Mate de seguimiento** (*Track Matte Key*) → Mate: **Vídeo 4** · Composición mediante: **Mate de luminancia**.
7. **A2:** `BF03_CLUBSPORT_SFX.wav` en 00:00. Al exportar, normaliza la mezcla a −14 LUFS.

## Qué hay en el tramo negro (7,17 s → 20,70 s)

| Entra | Sale | Locución | En pantalla |
|---|---|---|---|
| 7,17 | 11,87 | «Hablamos del EA888…» | Título EA888 y el motor dibujado en línea girando. «2.0 TSI · turbo · 4 cilindros» |
| 11,87 | 16,10 | «Su robustez y el margen…» | ROBUSTEZ + MARGEN, turbo marcado en rojo, barra de margen ilustrativa (sin cifras) |
| 16,10 | 20,70 | «…día a día… bestia cuando pisas el acelerador» | DÍA A DÍA + BESTIA, **ventana 16:9 para tus clips** y barra de acelerador |

El motor va dibujado en línea, como el resto de la serie. No uso las fotos de referencia: el sistema de diseño no admite fotos, y esas imágenes son de terceros.

## La ventana para clips horizontales (16,10 s → 20,70 s)

| | 4K (2160 × 3840) |
|---|---|
| Hueco | x 144 · y 1120 · 1872 × 1054 px |
| Centro (Posición en Premiere) | **1080 · 1647** |
| Escala si el clip es 4K (3840 × 2160) | **49 %** |
| Escala si el clip es 1080p (1920 × 1080) | **98 %** |

Clips sugeridos: 16,10–18,87 conduciendo con calma («día a día») y 18,87–20,70 aceleración fuerte («bestia»). En 19,3 s suena un acelerón sintetizado: si tu clip trae el sonido real del motor, baja o quita ese efecto.

## Para confirmar

- +70 CV «sin cambiar ni una sola pieza» y bloques que aguantan 500 CV salen de tu locución. En pantalla van tal cual.
