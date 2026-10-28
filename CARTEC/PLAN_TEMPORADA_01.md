# Plan de la temporada 01

Ocho episodios técnicos en vertical (1080 × 1920, 30 fps) para Reels, TikTok y Shorts. Una sola identidad, la aprobada en el EP01, y una idea visual distinta en cada episodio.

## Los ocho episodios

| EP | Tema | Idea visual | Duración estimada | Escenas · planos | Fotogramas de prueba ★ | Depende sobre todo de |
|---|---|---|---|---|---|---|
| 01 | Desbloqueo CPC | El límite: la petición de par recortada por el CPC, y el candado | 36,0 s (voz real) | 12 · ~30 | Portada, ficha CPC, gráfica de limitación | En producción en la otra sesión |
| 02 | Stage 1 | Mismo hierro, otra calibración: el motor no cambia, cambian los valores | ~34 s | 11 · ~29 | Portada, ficha de parámetros, márgenes | SH-DEC-02 (motor) |
| 03 | Downpipe | El descenso: travelling vertical continuo siguiendo los gases | ~37 s | 9 · ~30 | Portada, ficha downpipe, comparativa de flujo | SH-EXH-01/02, EP03-DAT-01 |
| 04 | Intercooler | La temperatura: termómetro fijo en el margen y aire como campo de puntos | ~35 s | 10 · ~29 | Portada, densidad del aire, circuito | SH-INT-01 |
| 05 | TCU | El cambio de marcha como ritmo: cada frase entra con un cambio | ~36 s | 9 · ~30 | Portada, ficha TCU, límite de la caja | EP05-DEC-01 (caja) |
| 06 | Banco | El ensayo: planos fijos de laboratorio, gráfica en tiempo real, acta | ~35 s | 9 · ~29 | Portada, esquema de medición, gráfica | EP06-DEC-01, SH-DYN-01/02 |
| 07 | Turbo híbrido | Anatomía: despiece a lo largo del eje y cambio de piezas tipo pit stop | ~35 s | 9 · ~30 | Portada, despiece axial, mapa de compresor | EP07-DEC-01, SH-TUR-01/02/03 |
| 08 | Mapas ECU | Dentro de la centralita: zoom de escala continuo hasta la tabla | ~34 s | 9 · ~29 | Portada, índice de tablas, sensores | EP08-DAT-01 |

Las duraciones salen del ritmo de tu locución del EP01 (129 palabras en 36,0 s). La duración real la marca cada locución.

## Lo que comparten todos los episodios

Todo lo que define el sistema aprobado en el EP01, sin cambios: **[`CARTEC_DESIGN_SYSTEM.md`](../CARTEC_DESIGN_SYSTEM.md)**, con sus valores en `src/system/tokens.ts`, y el flujo de **[`CLAUDE.md`](../CLAUDE.md)**. Color, tipografía, retícula, zona segura, bandas, jerarquía de línea, componentes, subtítulos, gráficas, movimiento, sonido y checklist salen de ahí. Este plan no repite valores para que no haya dos versiones.

En resumen: negro dominante, línea blanca y rojo `#FF0707` como único acento; Aspekta 300/700/900 y JetBrains Mono; dibujo técnico hecho con código, sin fotos ni lugares reconocibles; todo subtitulado; efectos sintetizados.

## Convenciones de los storyboards

- **Dónde están:** `CARTEC/EPISODES/EPxx/STORYBOARD.md` para EP02–EP08. El del EP01 sigue en `docs/episodios/01-cpc.md`, como dice el paso 5 de `CLAUDE.md`.
- **Estilos de texto** (nombres de `TYPE` en los tokens): `portada`, `titulo`, `subtituloEscena`, `entradilla`, `subtitulos`, `etiqueta`, `dato`, `micro`.
- **Anclaje a la voz:** cada escena cita su línea del guion (L01, L02…). Cuando llega el SRT, la escena empieza y acaba donde empieza y acaba su línea; el corte se adelanta 2 fotogramas a la palabra, como en el EP01.
- **★ Fotogramas de prueba:** tres por episodio, a 1080 × 1920, que apruebas antes de animar.
- **Representación.** Cada escena dice qué es, y en pantalla se rotula igual:

| Tipo | Cuándo | Rótulo en pantalla |
|---|---|---|
| Diagrama técnico verificado | La pieza se dibuja a partir de referencias reales y el responsable la valida | «Basado en [fuente]» |
| Ilustración conceptual | Pieza o escena genérica | «Esquema ilustrativo · no a escala» (el del sistema) |
| Animación explicativa simplificada | Metáforas y procesos (flujo, densidad, candado) | Ninguno, o «Simplificado» si omite algo relevante |
| Gráfica sin datos | Curvas que explican un comportamiento | «Gráfica ilustrativa · sin datos de banco» (el del sistema) |
| Dato real | Gráficas con datos de CAR-TEC | «Datos reales · fuente · fecha · condiciones» |

Una ilustración conceptual nunca se presenta como documentación del fabricante. Ninguna cifra sale en pantalla si no viene de un dato real verificado.

## Cómo cambia el movimiento de un episodio a otro

Todos usan acercamientos, barridos, parallax, revelado de líneas, curvas animadas y transiciones mecánicas. Lo que cambia es el movimiento dominante:

| EP | Movimiento dominante | Transición propia | Recurso tipográfico |
|---|---|---|---|
| 01 | Choque contra un límite horizontal | Candado que cierra y abre | Sello LIMITADO |
| 02 | Órbita alrededor de un objeto quieto | Pantalla partida en espejo | Contador «PIEZAS CAMBIADAS 00» |
| 03 | Descenso vertical continuo | Cuchilla que corta la sección | Cotas sin cifras y cortes A-A |
| 04 | Recorrido del aire por el circuito | Cruce de umbral en el termómetro | Termómetro fijo en el margen |
| 05 | Golpes de cambio con aceleración y frenada | Corte en cada cambio | Indicador de marcha 1 → 8 |
| 06 | Plano fijo de instrumento | Alineación de dos actas | Acta de ensayo |
| 07 | Despiece a lo largo del eje | Cambio de pieza tipo pit stop | SE CONSERVA / SE MODIFICA |
| 08 | Zoom de escala continuo | El chip se despliega en tabla | Índice de tablas |

## Lo que los storyboards añaden al sistema y necesita tu aprobación

El sistema permite acercamiento, barrido lateral, parallax, rotación lenta de la pieza y despiece animado, y prohíbe rebotes elásticos, giros 3D del texto, destellos y transiciones de plantilla. Los storyboards respetan eso, pero para que cada episodio tenga su narrativa proponen cinco recursos que hoy no están en el sistema. Si los apruebas, se documentan en `CARTEC_DESIGN_SYSTEM.md` y pasan a ser de todos; si no, se sustituyen por barridos laterales.

| Recurso | Episodios | Qué es |
|---|---|---|
| Travelling vertical | EP03, EP07 | Un barrido como el lateral, pero de arriba abajo, siguiendo un dibujo largo |
| Pantalla partida | EP02, EP03, EP06, EP07 | Dos estados de la misma pieza a la vez (serie y preparado), separados por una línea de 1 px |
| Corte de sección | EP03 | Una línea horizontal atraviesa el tubo y la sección gira 90° hacia la cámara, como un corte A-A de un plano |
| Campo de puntos | EP04 | El aire como puntos blancos; los calientes en rojo, sin pasar del 10 % del fotograma |
| Indicadores fijos de capítulo | EP04, EP05 | Termómetro en el margen izquierdo (EP04) e indicador de marcha 1 → 8 (EP05) |

## Biblioteca de piezas

Cada pieza se dibuja una vez en `src/parts/`, se documenta en la tabla de componentes del sistema de diseño y se reutiliza. Así un turbo es el mismo turbo en los cuatro episodios donde sale.

| Pieza | Tipo | Se crea en | Se reutiliza en |
|---|---|---|---|
| Firma, subtítulos, cierre de marca | 2D | EP01 | Todos |
| Coche berlina sin marca (alzado y planta) | 2D / 3D | EP01 | 04, 05, 06, 08 |
| Centralita base (ECU, CPC, TCU) | 3D | EP01 | 02, 03, 04, 05, 07, 08 |
| Cadena cinemática | 3D | EP01 | 05 |
| Motor V8 biturbo genérico | 3D | EP01 | 05 (si la caja es Mercedes) |
| Gráfica de par con límite | 2D | EP01 | 02, 05, 06, 07 |
| Malla de calibración | 2D / 3D | EP01 | 02, 05, 07, 08 |
| Diagrama de conexión entre centralitas | 2D | EP01 | 05, 08 |
| Motor 4 cilindros turbo | 3D | EP02 | 03, 04, 07, 08 |
| Turbo (exterior y sección) | 3D | EP02 | 03, 04, 07 |
| Inyector, bobina y bujía | 3D | EP02 | 07, 08 |
| Indicadores verticales de margen | 2D | EP02 | 04, 07 |
| Ficha editorial de motor | 2D | EP02 | 06 (base del acta) |
| Colector, downpipe, catalizador, escape | 3D | EP03 | 07, 08 |
| Cortes de sección y líneas de flujo | 2D | EP03 | 04, 07 |
| Intercooler | 3D | EP03 (simple), EP04 (detallado) | 07, 08 |
| Campo de partículas y termómetro | 2D | EP04 | — |
| Caja de cambios y TCU | 3D | EP05 | 08 |
| Indicador de marcha | 2D | EP05 | — |
| Banco de potencia | 3D | EP06 | 08 |
| Gráfica de banco desde CSV y acta de ensayo | 2D | EP06 | 02, 04, 07 y vídeos futuros |
| Turbo en despiece y rueda de compresor | 3D | EP07 | — |
| Mapa de compresor conceptual | 2D | EP07 | — |
| Tabla 2D, red de tablas, sensores | 2D | EP08 | — |

## Sonido por episodio

El motor sintetizado imita la arquitectura del motor que se ve: número de cilindros, disposición y orden de encendido.

| EP | Motor | Efectos propios |
|---|---|---|
| 01 | V8 biturbo de cigüeñal cruzado | Corte de limitador, candado, relé |
| 02 | 4 cilindros en línea turbo (o el de SH-DEC-02) | Inyectores, chispa, silbido de turbo |
| 03 | El mismo | Pulsos de escape, turbina, flujo que se estrangula y se abre |
| 04 | El mismo | Aire, compresor, tics de dilatación, aviso |
| 05 | El de la caja elegida | Cambios de marcha, solenoides, engranajes |
| 06 | El del coche de los datos de banco | Rodillos, ventilador, cinchas |
| 07 | El mismo de EP02 | Turbo agudo, carga tardía, piezas metálicas |
| 08 | El mismo de EP02 | Datos, relé, clics en cascada |

Los efectos nuevos (pulsos de 4 cilindros, cambios de marcha, rodillos…) se sintetizan en `scripts/sfx/` y se añaden a la tabla de sonido del sistema de diseño.

**Mezcla:** la del sistema de diseño. Voz a −14 LUFS integrados en el máster, efectos entre −24 y −18 LUFS momentáneos sin tapar nunca la voz, pico real ≤ −1 dBTP.

## Orden de producción

Un episodio cada vez, en orden: el EP02 crea el motor y el turbo que usan los siguientes. El único material que conviene adelantar son los datos de banco (SH-DYN-02), porque sirven en EP02, EP04, EP06 y EP07.

## Proceso de cada episodio

1. **Storyboard en borrador** (hecho para EP02–EP08).
2. **Me envías la locución y su SRT.** Van a `public/episodes/NN-tema/voz.*` y `subtitulos.srt`, como en el EP01. Mido la duración real, corrijo el SRT contra el guion, genero los cues y pongo a cada escena los tiempos de su línea.
3. **Apruebas el storyboard.**
4. **Tres fotogramas de prueba ★** a 1080 × 1920 con la identidad del EP01. Los apruebas.
5. **Animación por escenas** con las piezas de la biblioteca. Cada escena es una composición propia de Remotion.
6. **Sonido** sintetizado y sincronizado con los cambios visuales; mezcla bajo la voz. La voz no se acelera ni se ralentiza: si falta o sobra tiempo, se ajustan pausas y planos.
7. **Exportación:**
   - Vídeo completo con el códec del sistema (H.264, yuv420p, CRF 16, AAC 320 kbps), 1080 × 1920 a 30 fps constantes.
   - Cada escena como MP4 independiente.
   - Pistas de audio separadas en WAV 48 kHz y 24 bits: voz, efectos y mezcla.
   - Todo a 30 fps constantes para que Premiere no reinterprete la velocidad.
   - Comprobación de duración, resolución, fps y sonoridad de cada archivo antes de entregarlo.
   - Destino: `CARTEC/EPISODES/EPxx/EXPORTS/` (vídeo completo), `SCENES/` (escenas) y `AUDIO/` (pistas). Los fotogramas de prueba van a `renders/epNN/pruebas/`, como en el EP01.
8. **Validación** del responsable del taller (`VALIDACION_TECNICA.md`) antes de publicar.

El material de cada episodio se pide en su `ASSET_REQUEST.md` y se sigue en su `ASSET_STATUS.md`.
