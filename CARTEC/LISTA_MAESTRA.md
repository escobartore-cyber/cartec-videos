# Lista maestra de material · Temporada 01

> Generado por `node CARTEC/_sistema/generar.mjs` el 2026-10-28. No editar a mano: los cambios van en `CARTEC/_sistema/recursos.mjs`.

Todo lo que necesito de ti para producir los ocho episodios, ordenado por prioridad. Cada recurso se pide **una sola vez** aunque se use en varios episodios.

- **Peticiones:** 56 (P0 Bloquea el sistema: 3 · P1 Obligatorio para producir: 21 · P2 Obligatorio para publicar: 15 · P3 Recomendable: 11 · P4 Opcional: 6)
- **Estado:** Disponible: 5 · Pendiente: 23 · Reemplazable por ilustración conceptual: 20 · Requiere verificación: 8

## Lo que ya no te pido

Se siguen las decisiones aprobadas en la sesión del EP01: no hay fotos ni metraje en pantalla, todo es dibujo técnico de línea hecho con código, ningún espacio del taller es reconocible y los efectos de sonido se sintetizan. Por eso no pido fotos para montar, metraje del taller, capturas de software de calibración ni bibliotecas de efectos. Logotipos, tipografías, la locución y el SRT del EP01 ya están entregados.

## Cómo entregar el material

1. **Desde el móvil:** adjúntalo en el chat de Claude y di su código (por ejemplo, «esto es SH-TUR-01» o «locución del EP02»). Yo lo renombro y lo coloco en su carpeta.
2. **Desde el ordenador:** súbelo a la carpeta indicada con un nombre que empiece por el código. Si son varias fotos del mismo recurso, añade un sufijo: `SH-TUR-01_lado-compresor.jpg`, `SH-TUR-01_perfil.jpg`. La locución y el SRT van con el nombre fijo del flujo de producción: `public/episodes/NN-tema/voz.wav` y `subtitulos.srt`.
3. **Decisiones y datos en texto:** contéstalos en el chat citando el código.

Las referencias para dibujar **no salen en el vídeo**: pueden ser fotos de móvil, imágenes del catálogo del fabricante o despieces de recambios. Sirven para que las piezas dibujadas tengan la forma real.

## Índice

| Prioridad | Código | Recurso | Episodios | Tipo | Dónde va | Estado |
|---|---|---|---|---|---|---|
| P0 | SH-BRD-01 | Logotipos CAR-TEC vectoriales y rojo oficial | EP01 EP02 EP03 EP04 EP05 EP06 EP07 EP08 | Marca | `brand-src` | Disponible |
| P0 | SH-FNT-01 | Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono | EP01 EP02 EP03 EP04 EP05 EP06 EP07 EP08 | Tipografía | `public/fonts` | Disponible |
| P0 | SH-REF-01 | CPC.png, referencia visual aprobada | EP01 EP02 EP03 EP04 EP05 EP06 EP07 EP08 | Referencia de estilo | `docs/referencia/referencia-estetica.webp` | Disponible |
| P1 | EP01-SRT | Subtítulos EP01 | EP01 | Subtítulos | `public/episodes/01-cpc/subtitulos.srt` | Disponible |
| P1 | EP01-VOZ | Locución EP01 | EP01 | Locución | `public/episodes/01-cpc/voz.mp3` | Disponible |
| P1 | EP02-SRT | Subtítulos EP02 | EP02 | Subtítulos | `public/episodes/02-stage1/subtitulos.srt` | Pendiente |
| P1 | EP02-VOZ | Locución EP02 | EP02 | Locución | `public/episodes/02-stage1/voz.wav (o voz.mp3)` | Pendiente |
| P1 | SH-DEC-01 | ¿Se mantiene «sin fotos ni metraje» en toda la temporada? | EP02 EP03 EP04 EP05 EP06 EP07 EP08 | Decisión | Respuesta por chat | Pendiente |
| P1 | SH-DEC-02 | Motor y coche de referencia de la temporada | EP02 EP03 EP04 EP06 EP07 EP08 | Decisión | Respuesta por chat | Pendiente |
| P1 | EP03-SRT | Subtítulos EP03 | EP03 | Subtítulos | `public/episodes/03-downpipe/subtitulos.srt` | Pendiente |
| P1 | EP03-VOZ | Locución EP03 | EP03 | Locución | `public/episodes/03-downpipe/voz.wav (o voz.mp3)` | Pendiente |
| P1 | EP04-SRT | Subtítulos EP04 | EP04 | Subtítulos | `public/episodes/04-intercooler/subtitulos.srt` | Pendiente |
| P1 | EP04-VOZ | Locución EP04 | EP04 | Locución | `public/episodes/04-intercooler/voz.wav (o voz.mp3)` | Pendiente |
| P1 | EP05-DEC-01 | Caja de cambios protagonista | EP05 | Decisión | Respuesta por chat | Pendiente |
| P1 | EP05-SRT | Subtítulos EP05 | EP05 | Subtítulos | `public/episodes/05-tcu/subtitulos.srt` | Pendiente |
| P1 | EP05-VOZ | Locución EP05 | EP05 | Locución | `public/episodes/05-tcu/voz.wav (o voz.mp3)` | Pendiente |
| P1 | EP06-DEC-01 | Ficha del banco de potencia de CAR-TEC | EP06 | Decisión | Respuesta por chat | Pendiente |
| P1 | EP06-SRT | Subtítulos EP06 | EP06 | Subtítulos | `public/episodes/06-dyno/subtitulos.srt` | Pendiente |
| P1 | EP06-VOZ | Locución EP06 | EP06 | Locución | `public/episodes/06-dyno/voz.wav (o voz.mp3)` | Pendiente |
| P1 | EP07-DEC-01 | Turbo híbrido protagonista y definición de Stage 3 | EP07 | Decisión | Respuesta por chat | Pendiente |
| P1 | EP07-SRT | Subtítulos EP07 | EP07 | Subtítulos | `public/episodes/07-turbo-hibrido/subtitulos.srt` | Pendiente |
| P1 | EP07-VOZ | Locución EP07 | EP07 | Locución | `public/episodes/07-turbo-hibrido/voz.wav (o voz.mp3)` | Pendiente |
| P1 | EP08-SRT | Subtítulos EP08 | EP08 | Subtítulos | `public/episodes/08-mapas-ecu/subtitulos.srt` | Pendiente |
| P1 | EP08-VOZ | Locución EP08 | EP08 | Locución | `public/episodes/08-mapas-ecu/voz.wav (o voz.mp3)` | Pendiente |
| P2 | EP01-DAT-01 | Modelos AMG con CPC independiente y límites que contiene | EP01 | Dato técnico o archivo de datos | Respuesta por chat | Pendiente |
| P2 | EP01-VAL | Validación técnica EP01 | EP01 | Validación del responsable del taller | Respuesta por chat | Requiere verificación |
| P2 | SH-DEC-03 | Aviso legal en episodios de preparación | EP01 EP02 EP03 EP05 EP07 | Decisión | Respuesta por chat | Pendiente |
| P2 | SH-DEC-04 | Licencia de Remotion | EP01 EP02 EP03 EP04 EP05 EP06 EP07 EP08 | Decisión | Respuesta por chat | Pendiente |
| P2 | EP02-VAL | Validación técnica EP02 | EP02 | Validación del responsable del taller | Respuesta por chat | Requiere verificación |
| P2 | SH-DYN-02 | Datos reales de banco exportados (CSV y hoja de resultados) | EP02 EP04 EP06 EP07 | Dato técnico o archivo de datos | `CARTEC/SHARED_ASSETS/DYNO/SH-DYN-02_<coche>_<prueba>.csv (+ .pdf)` | Reemplazable por ilustración conceptual |
| P2 | EP03-DAT-01 | Documentación de homologación del catalizador | EP03 | Dato técnico o archivo de datos | `CARTEC/SHARED_ASSETS/EXHAUST/EP03-DAT-01_homologacion.pdf` | Reemplazable por texto genérico |
| P2 | EP03-VAL | Validación técnica EP03 | EP03 | Validación del responsable del taller | Respuesta por chat | Requiere verificación |
| P2 | EP04-VAL | Validación técnica EP04 | EP04 | Validación del responsable del taller | Respuesta por chat | Requiere verificación |
| P2 | EP05-VAL | Validación técnica EP05 | EP05 | Validación del responsable del taller | Respuesta por chat | Requiere verificación |
| P2 | EP06-VAL | Validación técnica EP06 | EP06 | Validación del responsable del taller | Respuesta por chat | Requiere verificación |
| P2 | SH-DYN-01 | Banco de potencia de CAR-TEC: vistas para dibujarlo | EP06 EP08 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/DYNO/SH-DYN-01_banco_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P2 | EP07-VAL | Validación técnica EP07 | EP07 | Validación del responsable del taller | Respuesta por chat | Requiere verificación |
| P2 | EP08-DAT-01 | Nombres genéricos de las tablas que se rotulan | EP08 | Dato técnico o archivo de datos | Respuesta por chat | Pendiente |
| P2 | EP08-VAL | Validación técnica EP08 | EP08 | Validación del responsable del taller | Respuesta por chat | Requiere verificación |
| P3 | SH-ENG-01 | Motor de referencia: vistas del conjunto | EP02 EP03 EP04 EP07 EP08 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/ENGINES/SH-ENG-01_motor_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P3 | SH-TUR-01 | Turbo de serie del motor de referencia | EP02 EP03 EP04 EP07 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/TURBOS/SH-TUR-01_turbo-serie_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P3 | SH-EXH-01 | Downpipe de serie del motor de referencia | EP03 EP07 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/EXHAUST/SH-EXH-01_downpipe-serie_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P3 | SH-EXH-02 | Downpipe de mayor flujo que monta CAR-TEC | EP03 EP07 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/EXHAUST/SH-EXH-02_downpipe-cartec_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P3 | SH-EXH-03 | Recorrido completo del escape del coche de referencia | EP03 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/EXHAUST/SH-EXH-03_escape-completo.pdf` | Reemplazable por ilustración conceptual |
| P3 | SH-INT-01 | Intercooler de serie del motor de referencia | EP03 EP04 EP07 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/INTERCOOLERS/SH-INT-01_intercooler_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P3 | SH-INT-02 | Circuito de admisión y posición de los sensores de temperatura | EP04 EP08 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/INTERCOOLERS/SH-INT-02_circuito-admision.pdf` | Reemplazable por ilustración conceptual |
| P3 | SH-ECU-03 | TCU o mecatrónica de la caja elegida | EP05 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/ECU/SH-ECU-03_tcu_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P3 | SH-TRN-01 | Caja de cambios elegida: exterior y corte | EP05 EP08 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/TRANSMISSIONS/SH-TRN-01_caja_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P3 | SH-TUR-02 | Turbo híbrido real | EP07 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/TURBOS/SH-TUR-02_turbo-hibrido_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P3 | SH-TUR-03 | Ruedas de compresor: serie frente a híbrida | EP07 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/TURBOS/SH-TUR-03_rueda-<serie\|hibrida>_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P4 | SH-ECU-01 | ECU real del motor de referencia: carcasa y placa | EP02 EP08 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/ECU/SH-ECU-01_ecu_<vista>.jpg` | Reemplazable por ilustración conceptual |
| P4 | SH-ENG-02 | Inyector, bujía y sensores del motor de referencia | EP02 EP04 EP08 | Referencia para dibujar (no sale en pantalla) | `CARTEC/SHARED_ASSETS/ENGINES/SH-ENG-02_<pieza>.jpg` | Reemplazable por ilustración conceptual |
| P4 | EP03-SND-01 | Grabación A/B del escape: serie frente a downpipe | EP03 | Grabación de sonido | `CARTEC/SHARED_ASSETS/SOUND/EP03-SND-01_<serie\|downpipe>.wav` | Reemplazable por sonido sintetizado |
| P4 | EP04-DAT-01 | Registro real de temperatura de admisión | EP04 | Dato técnico o archivo de datos | `CARTEC/SHARED_ASSETS/INTERCOOLERS/EP04-DAT-01_log-iat.csv` | Reemplazable por ilustración conceptual |
| P4 | EP06-SND-01 | Audio real de una pasada en el banco | EP06 | Grabación de sonido | `CARTEC/SHARED_ASSETS/SOUND/EP06-SND-01_pasada.wav` | Reemplazable por sonido sintetizado |
| P4 | EP07-DAT-01 | Mapas de compresor del fabricante | EP07 | Dato técnico o archivo de datos | `CARTEC/SHARED_ASSETS/TURBOS/EP07-DAT-01_mapa-<serie\|hibrido>.pdf` | Reemplazable por ilustración conceptual |

## P0 · Bloquea el sistema

### SH-BRD-01 — Logotipos CAR-TEC vectoriales y rojo oficial

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/BRAND/Ya entregado: brand-src/ y public/brand/`
- **Episodio:** EP01, EP02, EP03, EP04, EP05, EP06, EP07, EP08
- **Tipo de recurso:** Marca
- **Qué debe verse:** Las cuatro versiones vectoriales del logo (blanco, blanco 1, negro, negro 1) y el rojo #FF0707.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** Vectorial.
- **Formato recomendable:** SVG.
- **Fondo transparente:** Sí (limpiados en la sesión del EP01).
- **Escena:** EP01: Firma de cada escena y cierre de marca.
- **Partes separadas para animar:** Ya separados en techo, letras y claim (src/brand/logoPaths.ts).
- **Prioridad:** P0 · Bloquea el sistema
- **Reutilizable en otros episodios:** Sí, toda la serie.
- **Nota:** No lo envíes otra vez.
- **Estado:** Disponible

### SH-FNT-01 — Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/FONTS/Ya entregado: public/fonts/`
- **Episodio:** EP01, EP02, EP03, EP04, EP05, EP06, EP07, EP08
- **Tipo de recurso:** Tipografía
- **Qué debe verse:** Familia Aspekta oficial (zip de 20 pesos, licencia de uso comercial) y JetBrains Mono para etiquetas técnicas.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** OTF / WOFF2.
- **Fondo transparente:** No aplica.
- **Escena:** EP01: Todos los textos.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P0 · Bloquea el sistema
- **Reutilizable en otros episodios:** Sí, toda la serie.
- **Nota:** No la envíes otra vez.
- **Estado:** Disponible

### SH-REF-01 — CPC.png, referencia visual aprobada

- **Archivo solicitado:** `docs/referencia/referencia-estetica.webp`
- **Episodio:** EP01, EP02, EP03, EP04, EP05, EP06, EP07, EP08
- **Tipo de recurso:** Referencia de estilo
- **Qué debe verse:** La imagen CPC.png original de 10 composiciones, tal cual la aprobaste.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** La original, sin recortar ni recomprimir.
- **Formato recomendable:** PNG original.
- **Fondo transparente:** No.
- **Escena:** EP01: Consulta de estilo; no sale en el vídeo.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P0 · Bloquea el sistema
- **Reutilizable en otros episodios:** Sí, toda la serie.
- **Nota:** Guardada por la sesión del EP01 a partir de la imagen del chat (WebP, 1625 × 968). Si tienes el PNG original a más resolución, puedes añadirlo; no es necesario.
- **Estado:** Disponible

## P1 · Obligatorio para producir

### EP01-SRT — Subtítulos EP01

- **Archivo solicitado:** `public/episodes/01-cpc/subtitulos.srt`
- **Episodio:** EP01
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP01 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto contra el guion y guardo aquí la versión corregida, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP01: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Nota:** Entregado y corregido en la sesión del EP01.
- **Estado:** Disponible

### EP01-VOZ — Locución EP01

- **Archivo solicitado:** `public/episodes/01-cpc/voz.wav (o voz.mp3)`
- **Episodio:** EP01
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP01, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP01: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Nota:** Entregada en la sesión del EP01 (MP3, 36,0 s).
- **Estado:** Disponible

### EP02-SRT — Subtítulos EP02

- **Archivo solicitado:** `public/episodes/02-stage1/subtitulos.srt`
- **Episodio:** EP02
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP02 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto contra el guion y guardo aquí la versión corregida, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP02: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP02-VOZ — Locución EP02

- **Archivo solicitado:** `public/episodes/02-stage1/voz.wav (o voz.mp3)`
- **Episodio:** EP02
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP02, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP02: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### SH-DEC-01 — ¿Se mantiene «sin fotos ni metraje» en toda la temporada?

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP02, EP03, EP04, EP05, EP06, EP07, EP08
- **Tipo de recurso:** Decisión
- **Qué debe verse:** El brief de temporada pide fotos reales, metraje del taller y sonidos grabados; en el EP01 decidiste dibujo técnico hecho con código, ningún espacio reconocible y efectos sintetizados. Esta planificación sigue lo aprobado en el EP01. Confírmalo o dime en qué episodios quieres material real en pantalla.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Sí / No / Solo en EPxx.
- **Fondo transparente:** No aplica.
- **Escena:** EP02: Afecta a todos los storyboards.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** Afecta a toda la serie.
- **Estado:** Pendiente

### SH-DEC-02 — Motor y coche de referencia de la temporada

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP02, EP03, EP04, EP06, EP07, EP08
- **Tipo de recurso:** Decisión
- **Qué debe verse:** Qué motor dibujo en los episodios de preparación. Recomiendo un único motor 4 cilindros turbo de gasolina, el que más preparáis (dime fabricante, código de motor y un coche donde va), para que turbo, downpipe e intercooler sean los mismos de episodio en episodio. Coche: recomiendo reutilizar la berlina sin marca del EP01; dime si prefieres otro tipo de carrocería.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Texto: fabricante, código de motor, coche y año.
- **Fondo transparente:** No aplica.
- **Escena:** EP02: S01, S02, S04 — motor protagonista. · EP03: S01–S03 — lado de escape del mismo motor. · EP04: S03, S05, S06 — turbo e intercooler del mismo motor. · EP07: S01, S08 — motor de partida de la Stage 3. · EP08: S05 — sensores alrededor del motor.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** Sí: define la biblioteca de piezas de la temporada.
- **Estado:** Pendiente

### EP03-SRT — Subtítulos EP03

- **Archivo solicitado:** `public/episodes/03-downpipe/subtitulos.srt`
- **Episodio:** EP03
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP03 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto contra el guion y guardo aquí la versión corregida, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP03: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP03-VOZ — Locución EP03

- **Archivo solicitado:** `public/episodes/03-downpipe/voz.wav (o voz.mp3)`
- **Episodio:** EP03
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP03, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP03: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP04-SRT — Subtítulos EP04

- **Archivo solicitado:** `public/episodes/04-intercooler/subtitulos.srt`
- **Episodio:** EP04
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP04 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto contra el guion y guardo aquí la versión corregida, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP04: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP04-VOZ — Locución EP04

- **Archivo solicitado:** `public/episodes/04-intercooler/voz.wav (o voz.mp3)`
- **Episodio:** EP04
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP04, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP04: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP05-DEC-01 — Caja de cambios protagonista

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP05
- **Tipo de recurso:** Decisión
- **Qué debe verse:** ¿Qué caja dibujo? Una automática de convertidor de par (p. ej. ZF 8HP o Mercedes 9G-Tronic) o una de doble embrague (p. ej. DSG). Recomiendo la que más adaptáis. Si es la 9G-Tronic, el episodio enlaza con el EP01 (CPC y TCU en el mismo coche).
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Texto: tipo, fabricante, código de la caja y coche.
- **Fondo transparente:** No aplica.
- **Escena:** EP05: S02 caja y TCU, S04 interior de la caja.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP05-SRT — Subtítulos EP05

- **Archivo solicitado:** `public/episodes/05-tcu/subtitulos.srt`
- **Episodio:** EP05
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP05 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto contra el guion y guardo aquí la versión corregida, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP05: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP05-VOZ — Locución EP05

- **Archivo solicitado:** `public/episodes/05-tcu/voz.wav (o voz.mp3)`
- **Episodio:** EP05
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP05, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP05: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP06-DEC-01 — Ficha del banco de potencia de CAR-TEC

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP06
- **Tipo de recurso:** Decisión
- **Qué debe verse:** Marca y modelo del banco; si es de rodillos o de bujes; inercial o con freno (corrientes de Foucault); 2WD o 4WD; norma de corrección que usáis (DIN 70020, ISO 1585, SAE J1349, 80/1269/CEE…); y si mostráis potencia en rueda, en motor estimada o las dos.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Texto.
- **Fondo transparente:** No aplica.
- **Escena:** EP06: S02 banco, S04 esquema de medición, S06 acta de ensayo.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** Sí, para cualquier vídeo futuro con resultados de banco.
- **Requiere verificación:** La locución dice «rodillos»: confirmar que el banco es de rodillos.
- **Estado:** Pendiente

### EP06-SRT — Subtítulos EP06

- **Archivo solicitado:** `public/episodes/06-dyno/subtitulos.srt`
- **Episodio:** EP06
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP06 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto contra el guion y guardo aquí la versión corregida, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP06: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP06-VOZ — Locución EP06

- **Archivo solicitado:** `public/episodes/06-dyno/voz.wav (o voz.mp3)`
- **Episodio:** EP06
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP06, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP06: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP07-DEC-01 — Turbo híbrido protagonista y definición de Stage 3

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP07
- **Tipo de recurso:** Decisión
- **Qué debe verse:** Qué turbo híbrido sale: turbo de serie de partida, qué se cambia (rueda de compresor, rueda de turbina, mecanizado de carcasas, cojinetes) y quién lo fabrica (CAR-TEC o un proveedor). Y qué incluye una Stage 3 en CAR-TEC.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Texto.
- **Fondo transparente:** No aplica.
- **Escena:** EP07: S03 qué se conserva y qué se modifica, S07–S08 conjunto Stage 3.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP07-SRT — Subtítulos EP07

- **Archivo solicitado:** `public/episodes/07-turbo-hibrido/subtitulos.srt`
- **Episodio:** EP07
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP07 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto contra el guion y guardo aquí la versión corregida, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP07: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP07-VOZ — Locución EP07

- **Archivo solicitado:** `public/episodes/07-turbo-hibrido/voz.wav (o voz.mp3)`
- **Episodio:** EP07
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP07, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP07: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP08-SRT — Subtítulos EP08

- **Archivo solicitado:** `public/episodes/08-mapas-ecu/subtitulos.srt`
- **Episodio:** EP08
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP08 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto contra el guion y guardo aquí la versión corregida, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP08: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

### EP08-VOZ — Locución EP08

- **Archivo solicitado:** `public/episodes/08-mapas-ecu/voz.wav (o voz.mp3)`
- **Episodio:** EP08
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP08, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP08: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

## P2 · Obligatorio para publicar

### EP01-DAT-01 — Modelos AMG con CPC independiente y límites que contiene

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP01
- **Tipo de recurso:** Dato técnico o archivo de datos
- **Qué debe verse:** Lista de los Mercedes-AMG en los que CAR-TEC desbloquea y recalibra el CPC, y en cuáles el CPC guarda el límite de par y el de velocidad máxima. Solo para que lo que se dice en pantalla sea cierto; no se muestran modelos si no quieres.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Texto o tabla.
- **Fondo transparente:** No aplica.
- **Escena:** EP01: S03, S05 — «según el modelo».
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** Sí, para futuros vídeos de Mercedes-AMG.
- **Requiere verificación:** Que el CPC contiene esos límites en los modelos que trabajáis.
- **Estado:** Pendiente

### EP01-VAL — Validación técnica EP01

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP01
- **Tipo de recurso:** Validación del responsable del taller
- **Qué debe verse:** Visto bueno del responsable del taller a los puntos del EP01 en VALIDACION_TECNICA.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Respuesta por escrito, punto por punto.
- **Fondo transparente:** No aplica.
- **Escena:** EP01: Antes de publicar.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Todas las afirmaciones técnicas y comerciales del guion marcadas en VALIDACION_TECNICA.md.
- **Estado:** Requiere verificación

### SH-DEC-03 — Aviso legal en episodios de preparación

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP01, EP02, EP03, EP05, EP07
- **Tipo de recurso:** Decisión
- **Qué debe verse:** ¿Añadimos un rótulo fijo y discreto (micro, gris) del tipo «Las modificaciones de potencia pueden requerir legalización» al final de los episodios de preparación? El texto exacto lo decide el responsable del taller.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Sí / No y texto exacto.
- **Fondo transparente:** No aplica.
- **Escena:** EP01: S12 cierre de marca. · EP02: S11 cierre de marca. · EP03: S09 cierre de marca. · EP05: S09 cierre de marca. · EP07: S09 cierre de marca.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** Sí, plantilla de cierre.
- **Estado:** Pendiente

### SH-DEC-04 — Licencia de Remotion

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP01, EP02, EP03, EP04, EP05, EP06, EP07, EP08
- **Tipo de recurso:** Decisión
- **Qué debe verse:** Remotion es gratuito para particulares y empresas de hasta 3 personas; por encima pide licencia de empresa. ¿Cuántas personas tiene CAR-TEC y quién factura el vídeo?
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Texto.
- **Fondo transparente:** No aplica.
- **Escena:** EP01: Herramienta de producción de toda la serie.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** Afecta a toda la serie.
- **Estado:** Pendiente

### EP02-VAL — Validación técnica EP02

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP02
- **Tipo de recurso:** Validación del responsable del taller
- **Qué debe verse:** Visto bueno del responsable del taller a los puntos del EP02 en VALIDACION_TECNICA.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Respuesta por escrito, punto por punto.
- **Fondo transparente:** No aplica.
- **Escena:** EP02: Antes de publicar.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Todas las afirmaciones técnicas y comerciales del guion marcadas en VALIDACION_TECNICA.md.
- **Estado:** Requiere verificación

### SH-DYN-02 — Datos reales de banco exportados (CSV y hoja de resultados)

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/DYNO/SH-DYN-02_<coche>_<prueba>.csv (+ .pdf)`
- **Episodio:** EP02, EP04, EP06, EP07
- **Tipo de recurso:** Dato técnico o archivo de datos
- **Qué debe verse:** De 2 a 4 pruebas reales exportadas del software del banco: columnas rpm, potencia y par (y potencia en rueda y pérdidas si las da). Ideal: un mismo coche de serie y preparado, y dos pasadas del mismo coche en condiciones distintas. Con la hoja de resultados: fecha, temperatura, presión, humedad, norma y factor de corrección.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** Todas las muestras que exporte el banco.
- **Formato recomendable:** CSV o Excel, y PDF o captura de la hoja de resultados.
- **Fondo transparente:** No aplica.
- **Escena:** EP02: S10 serie frente a Stage 1. · EP04: S09 pasadas consecutivas, si hay varias seguidas. · EP06: S05 gráfica en tiempo real, S06–S07 acta y comparación. · EP07: S06 respuesta del turbo, si hay prueba de un híbrido.
- **Partes separadas para animar:** No aplica: la gráfica la dibujo con código a partir del CSV.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** Sí: EP02, EP04, EP06 y EP07.
- **Si falta:** Curvas ilustrativas sin cifras, rotuladas «Gráfica ilustrativa · sin datos de banco».
- **Requiere verificación:** Que los datos se pueden publicar: permiso del cliente, matrícula y bastidor fuera.
- **Estado:** Reemplazable por ilustración conceptual

### EP03-DAT-01 — Documentación de homologación del catalizador

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/EXHAUST/EP03-DAT-01_homologacion.pdf`
- **Episodio:** EP03
- **Tipo de recurso:** Dato técnico o archivo de datos
- **Qué debe verse:** Certificado o ficha que acredite que el catalizador de la downpipe de SH-EXH-02 está homologado, y en qué condiciones se puede circular con ella en España.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** Legible.
- **Formato recomendable:** PDF o foto del documento.
- **Fondo transparente:** No aplica.
- **Escena:** EP03: S08 sello «Catalizador homologado».
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Si falta:** Quitar el sello y dejar solo «requisitos legales aplicables», como dice la locución.
- **Requiere verificación:** Que el texto del sello es exacto y legalmente correcto.
- **Estado:** Reemplazable por texto genérico

### EP03-VAL — Validación técnica EP03

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP03
- **Tipo de recurso:** Validación del responsable del taller
- **Qué debe verse:** Visto bueno del responsable del taller a los puntos del EP03 en VALIDACION_TECNICA.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Respuesta por escrito, punto por punto.
- **Fondo transparente:** No aplica.
- **Escena:** EP03: Antes de publicar.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Todas las afirmaciones técnicas y comerciales del guion marcadas en VALIDACION_TECNICA.md.
- **Estado:** Requiere verificación

### EP04-VAL — Validación técnica EP04

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP04
- **Tipo de recurso:** Validación del responsable del taller
- **Qué debe verse:** Visto bueno del responsable del taller a los puntos del EP04 en VALIDACION_TECNICA.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Respuesta por escrito, punto por punto.
- **Fondo transparente:** No aplica.
- **Escena:** EP04: Antes de publicar.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Todas las afirmaciones técnicas y comerciales del guion marcadas en VALIDACION_TECNICA.md.
- **Estado:** Requiere verificación

### EP05-VAL — Validación técnica EP05

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP05
- **Tipo de recurso:** Validación del responsable del taller
- **Qué debe verse:** Visto bueno del responsable del taller a los puntos del EP05 en VALIDACION_TECNICA.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Respuesta por escrito, punto por punto.
- **Fondo transparente:** No aplica.
- **Escena:** EP05: Antes de publicar.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Todas las afirmaciones técnicas y comerciales del guion marcadas en VALIDACION_TECNICA.md.
- **Estado:** Requiere verificación

### EP06-VAL — Validación técnica EP06

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP06
- **Tipo de recurso:** Validación del responsable del taller
- **Qué debe verse:** Visto bueno del responsable del taller a los puntos del EP06 en VALIDACION_TECNICA.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Respuesta por escrito, punto por punto.
- **Fondo transparente:** No aplica.
- **Escena:** EP06: Antes de publicar.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Todas las afirmaciones técnicas y comerciales del guion marcadas en VALIDACION_TECNICA.md.
- **Estado:** Requiere verificación

### SH-DYN-01 — Banco de potencia de CAR-TEC: vistas para dibujarlo

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/DYNO/SH-DYN-01_banco_<vista>.jpg`
- **Episodio:** EP06, EP08
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** El banco sin coche: rodillos, bastidor, ventilador de refrigeración, puntos de anclaje y cinchas, y el puesto de control. Sin personas ni matrículas. Solo se dibuja la máquina, no el taller.
- **Ángulo o perspectiva:** Lateral completo, 3/4 desde la parte delantera, rodillos de cerca (desde arriba y de perfil), ventilador de frente.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP06: S02 revelado del banco, S03 coche sobre rodillos, S04 esquema de medición. · EP08: S08 retícula final.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Lo importante: diámetro relativo de los rodillos, separación entre ellos y posición del ventilador.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** Sí: EP06, EP08 y cualquier vídeo futuro de resultados.
- **Si falta:** Banco de rodillos genérico, rotulado «Esquema ilustrativo · no a escala». Pierde credibilidad si el texto dice «nuestro banco».
- **Estado:** Reemplazable por ilustración conceptual

### EP07-VAL — Validación técnica EP07

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP07
- **Tipo de recurso:** Validación del responsable del taller
- **Qué debe verse:** Visto bueno del responsable del taller a los puntos del EP07 en VALIDACION_TECNICA.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Respuesta por escrito, punto por punto.
- **Fondo transparente:** No aplica.
- **Escena:** EP07: Antes de publicar.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Todas las afirmaciones técnicas y comerciales del guion marcadas en VALIDACION_TECNICA.md.
- **Estado:** Requiere verificación

### EP08-DAT-01 — Nombres genéricos de las tablas que se rotulan

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP08
- **Tipo de recurso:** Dato técnico o archivo de datos
- **Qué debe verse:** Propongo rotular solo nombres genéricos en castellano: «Par solicitado», «Presión objetivo», «Inyección», «Avance de encendido», «Límite de par», «Protección térmica». Ningún nombre interno del fabricante ni captura real de software. El responsable confirma la lista y su relación (qué tabla afecta a cuál).
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Texto.
- **Fondo transparente:** No aplica.
- **Escena:** EP08: S03 índice de tablas, S07 red de tablas relacionadas.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** Sí, para futuros vídeos de calibración.
- **Requiere verificación:** Nombres y relaciones entre tablas.
- **Estado:** Pendiente

### EP08-VAL — Validación técnica EP08

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP08
- **Tipo de recurso:** Validación del responsable del taller
- **Qué debe verse:** Visto bueno del responsable del taller a los puntos del EP08 en VALIDACION_TECNICA.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Respuesta por escrito, punto por punto.
- **Fondo transparente:** No aplica.
- **Escena:** EP08: Antes de publicar.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Todas las afirmaciones técnicas y comerciales del guion marcadas en VALIDACION_TECNICA.md.
- **Estado:** Requiere verificación

## P3 · Recomendable

### SH-ENG-01 — Motor de referencia: vistas del conjunto

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/ENGINES/SH-ENG-01_motor_<vista>.jpg`
- **Episodio:** EP02, EP03, EP04, EP07, EP08
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** El motor elegido en SH-DEC-02 entero, sin tapa embellecedora: bloque, culata, colector de admisión, turbo y colector de escape, raíl de inyectores y bobinas.
- **Ángulo o perspectiva:** Cuatro vistas: lado de admisión, lado de escape (con el turbo a la vista), frontal de distribución y 3/4 desde arriba. Si hay despiece del fabricante, mejor.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP02: S01 portada, S02 despiece «cero piezas», S06 pantalla dividida. · EP03: S01 lado de escape. · EP04: S02–S03 recorrido del aire. · EP07: S08 conjunto Stage 3. · EP08: S05 sensores alrededor del motor.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Sobre todo: unión turbo–colector, posición del colector de admisión y del raíl de inyectores.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP02, EP03, EP04, EP07 y EP08.
- **Si falta:** Motor 4 cilindros turbo genérico, rotulado «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### SH-TUR-01 — Turbo de serie del motor de referencia

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/TURBOS/SH-TUR-01_turbo-serie_<vista>.jpg`
- **Episodio:** EP02, EP03, EP04, EP07
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** El turbo de serie desmontado o en catálogo: carcasa de compresor, carcasa de turbina, cartucho central y actuador de la wastegate. Si existe, un corte o despiece del fabricante.
- **Ángulo o perspectiva:** Lado compresor de frente (rueda visible), lado turbina de frente, perfil con el actuador y vista desde la brida de escape.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP02: S04 parámetro «presión del turbo». · EP03: S02 corte de la turbina. · EP04: S03 compresor calentando el aire. · EP07: S01–S04 turbo de serie frente al híbrido.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Para el EP07 necesito distinguir rueda de compresor, cartucho, eje y rueda de turbina.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP02, EP03, EP04 y EP07.
- **Si falta:** Turbo genérico de una sola entrada con wastegate, rotulado «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### SH-EXH-01 — Downpipe de serie del motor de referencia

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/EXHAUST/SH-EXH-01_downpipe-serie_<vista>.jpg`
- **Episodio:** EP03, EP07
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** La downpipe de serie completa, con su catalizador (y filtro de partículas si lo lleva), las bridas y la sonda lambda.
- **Ángulo o perspectiva:** Perfil completo, vista desde la brida del turbo (para ver la sección de entrada) y detalle de la curva más cerrada.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP03: S03 ficha de la downpipe, S04 cortes de sección, S05 comparativa. · EP07: S07–S08 conjunto Stage 3.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Lo que más importa: el trazado de las curvas y dónde empieza el catalizador.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP03 y EP07.
- **Si falta:** Downpipe genérica con catalizador, rotulada «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### SH-EXH-02 — Downpipe de mayor flujo que monta CAR-TEC

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/EXHAUST/SH-EXH-02_downpipe-cartec_<vista>.jpg`
- **Episodio:** EP03, EP07
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** La downpipe que instaláis en una Stage 2 para el motor de referencia, con su catalizador. Fotos del producto real o del catálogo del fabricante.
- **Ángulo o perspectiva:** Las mismas tres vistas que SH-EXH-01, para poder compararlas en el mismo encuadre.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP03: S05 comparativa serie frente a mayor flujo, S07 conjunto Stage 2. · EP07: S08 conjunto Stage 3.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP03 y EP07.
- **Si falta:** Downpipe genérica de mayor diámetro y curvas abiertas, rotulada «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### SH-EXH-03 — Recorrido completo del escape del coche de referencia

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/EXHAUST/SH-EXH-03_escape-completo.pdf`
- **Episodio:** EP03
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** Despiece de recambios o foto desde abajo de todo el escape: colector, turbo, downpipe, catalizador(es), filtro de partículas, tramo intermedio y silenciosos.
- **Ángulo o perspectiva:** Vista inferior o despiece lateral completo.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP03: S01–S02 descenso de los gases, S06 «emisiones».
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** No.
- **Si falta:** Recorrido genérico: turbo, downpipe, catalizador, silencioso.
- **Estado:** Reemplazable por ilustración conceptual

### SH-INT-01 — Intercooler de serie del motor de referencia

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/INTERCOOLERS/SH-INT-01_intercooler_<vista>.jpg`
- **Episodio:** EP03, EP04, EP07
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** El intercooler de serie: núcleo, tanques y tomas. Y dime si es aire-aire (frontal) o aire-agua (integrado en el colector), porque se dibuja distinto.
- **Ángulo o perspectiva:** Frontal del núcleo, perfil (para el grosor) y detalle de las aletas.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP03: S07 conjunto Stage 2. · EP04: S05 revelado, S06 circuito. · EP07: S07–S08.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP03, EP04 y EP07.
- **Si falta:** Intercooler aire-aire frontal genérico, rotulado «Esquema ilustrativo · no a escala».
- **Requiere verificación:** Tipo de intercooler del motor de referencia.
- **Estado:** Reemplazable por ilustración conceptual

### SH-INT-02 — Circuito de admisión y posición de los sensores de temperatura

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/INTERCOOLERS/SH-INT-02_circuito-admision.pdf`
- **Episodio:** EP04, EP08
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** Esquema o despiece del recorrido del aire: filtro, turbo, manguitos, intercooler, mariposa y colector, con la posición del sensor (o sensores) de temperatura de admisión.
- **Ángulo o perspectiva:** Esquema plano o despiece de recambios.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP04: S02 entrada de aire, S06 circuito completo, S07 sensor. · EP08: S05 red de sensores.
- **Partes separadas para animar:** No hace falta separar nada.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP04 y EP08.
- **Si falta:** Circuito genérico filtro → turbo → intercooler → colector.
- **Estado:** Reemplazable por ilustración conceptual

### SH-ECU-03 — TCU o mecatrónica de la caja elegida

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/ECU/SH-ECU-03_tcu_<vista>.jpg`
- **Episodio:** EP05
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** La unidad de control de la caja: si va integrada (mecatrónica), la placa hidráulica con la electrónica; si va aparte, su carcasa y conector.
- **Ángulo o perspectiva:** Cenital y 3/4.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP05: S02 TCU en rojo, S03 ficha técnica, S06 conexión con la ECU.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** No.
- **Si falta:** Variante TCU de la centralita base del EP01.
- **Requiere verificación:** Si la TCU de esa caja va integrada o separada.
- **Estado:** Reemplazable por ilustración conceptual

### SH-TRN-01 — Caja de cambios elegida: exterior y corte

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/TRANSMISSIONS/SH-TRN-01_caja_<vista>.jpg`
- **Episodio:** EP05, EP08
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** La caja de EP05-DEC-01 por fuera y, si existe, un corte o despiece del fabricante: trenes epicicloidales o embragues, y dónde va la unidad de control.
- **Ángulo o perspectiva:** Perfil exterior, vista inferior (cárter y mecatrónica) y corte longitudinal.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP05: S02 órbita de la caja, S04 interior, S08 cadena cinemática. · EP08: S08 retícula final de piezas.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Necesito ver la carcasa, el convertidor o embrague y la posición de la mecatrónica.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP05 y EP08.
- **Si falta:** Caja automática genérica en corte, rotulada «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### SH-TUR-02 — Turbo híbrido real

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/TURBOS/SH-TUR-02_turbo-hibrido_<vista>.jpg`
- **Episodio:** EP07
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** El turbo híbrido de EP07-DEC-01: exterior y, si es posible, desmontado.
- **Ángulo o perspectiva:** Las mismas vistas que SH-TUR-01 para compararlos en el mismo encuadre.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP07: S02 serie frente a híbrido, S03 despiece, S04 ruedas.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Necesito ver qué piezas son distintas de las de serie.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** No.
- **Si falta:** Mismo turbo de serie con las piezas modificadas resaltadas en rojo, rotulado «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### SH-TUR-03 — Ruedas de compresor: serie frente a híbrida

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/TURBOS/SH-TUR-03_rueda-<serie|hibrida>_<vista>.jpg`
- **Episodio:** EP07
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** Las dos ruedas de compresor fuera del turbo. Si las tenéis, medidas de inductor y exductor y número de álabes.
- **Ángulo o perspectiva:** De frente (para contar álabes) y de perfil (para ver la forma), las dos con la misma distancia y lente.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP07: S04 intercambio de ruedas y cotas.
- **Partes separadas para animar:** No hace falta separar nada: la rueda la modelo con código.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** No.
- **Si falta:** Ruedas genéricas con proporciones ilustrativas y cotas sin cifras.
- **Estado:** Reemplazable por ilustración conceptual

## P4 · Opcional

### SH-ECU-01 — ECU real del motor de referencia: carcasa y placa

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/ECU/SH-ECU-01_ecu_<vista>.jpg`
- **Episodio:** EP02, EP08
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** La centralita del motor de referencia cerrada (carcasa y conector) y, si alguna vez la abrís, la placa vista desde arriba. Sin pegatinas legibles con números de serie ni datos de clientes.
- **Ángulo o perspectiva:** Cenital de la carcasa, 3/4 con el conector y cenital de la placa.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP02: S03 centralita. · EP08: S01 zoom a la ECU, S02 placa y memoria.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas.
- **Prioridad:** P4 · Opcional
- **Reutilizable en otros episodios:** Sí: EP02 y EP08.
- **Si falta:** La centralita base ya aprobada en el EP01, con placa conceptual.
- **Estado:** Reemplazable por ilustración conceptual

### SH-ENG-02 — Inyector, bujía y sensores del motor de referencia

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/ENGINES/SH-ENG-02_<pieza>.jpg`
- **Episodio:** EP02, EP04, EP08
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** Inyector, bobina con bujía, sensor de presión y temperatura de admisión, sensor de picado y sonda lambda del motor elegido.
- **Ángulo o perspectiva:** Cada pieza de perfil sobre fondo liso.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP02: S04 módulos «inyección» y «encendido». · EP04: S06–S07 sensor de temperatura de admisión. · EP08: S05 red de sensores.
- **Partes separadas para animar:** No hace falta separar nada.
- **Prioridad:** P4 · Opcional
- **Reutilizable en otros episodios:** Sí: EP02, EP04 y EP08.
- **Si falta:** Formas genéricas de cada pieza, rotuladas «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### EP03-SND-01 — Grabación A/B del escape: serie frente a downpipe

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/SOUND/EP03-SND-01_<serie|downpipe>.wav`
- **Episodio:** EP03
- **Tipo de recurso:** Grabación de sonido
- **Qué debe verse:** El mismo coche grabado dos veces, con la downpipe de serie y con la de mayor flujo: ralentí, golpe de gas y aceleración suave.
- **Ángulo o perspectiva:** Micrófono o móvil a 50 cm de la salida de escape, en la misma posición y con el mismo nivel en las dos tomas. Sin voces.
- **Resolución mínima:** WAV 48 kHz o la nota de voz del móvil a máxima calidad.
- **Formato recomendable:** WAV (preferente), M4A o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP03: S06 «al sonido».
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P4 · Opcional
- **Reutilizable en otros episodios:** No.
- **Si falta:** Sonido sintetizado por código, como el resto de efectos.
- **Estado:** Reemplazable por sonido sintetizado

### EP04-DAT-01 — Registro real de temperatura de admisión

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/INTERCOOLERS/EP04-DAT-01_log-iat.csv`
- **Episodio:** EP04
- **Tipo de recurso:** Dato técnico o archivo de datos
- **Qué debe verse:** Un registro de datos de una o varias aceleraciones seguidas: tiempo, rpm, temperatura de admisión, presión de soplado y avance de encendido. Con la temperatura ambiente del día.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** La frecuencia de muestreo del equipo.
- **Formato recomendable:** CSV o Excel.
- **Fondo transparente:** No aplica.
- **Escena:** EP04: S08 gráfica de temperatura, S09 pasadas consecutivas.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P4 · Opcional
- **Reutilizable en otros episodios:** No.
- **Si falta:** Curvas ilustrativas sin cifras.
- **Requiere verificación:** Que el registro se puede publicar y de qué coche es.
- **Estado:** Reemplazable por ilustración conceptual

### EP06-SND-01 — Audio real de una pasada en el banco

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/SOUND/EP06-SND-01_pasada.wav`
- **Episodio:** EP06
- **Tipo de recurso:** Grabación de sonido
- **Qué debe verse:** Una pasada completa de principio a fin: rodillos, motor subiendo de vueltas, corte y bajada. Sin voces.
- **Ángulo o perspectiva:** Móvil o micrófono a 2–3 m del coche, a la altura de las ruedas.
- **Resolución mínima:** WAV 48 kHz o la nota de voz del móvil a máxima calidad.
- **Formato recomendable:** WAV (preferente), M4A o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP06: S04–S05 medición y gráfica en tiempo real.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P4 · Opcional
- **Reutilizable en otros episodios:** Sí, para cualquier vídeo de banco.
- **Si falta:** Pasada sintetizada por código.
- **Estado:** Reemplazable por sonido sintetizado

### EP07-DAT-01 — Mapas de compresor del fabricante

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/TURBOS/EP07-DAT-01_mapa-<serie|hibrido>.pdf`
- **Episodio:** EP07
- **Tipo de recurso:** Dato técnico o archivo de datos
- **Qué debe verse:** Los mapas de compresor del turbo de serie y del híbrido, si el fabricante los publica.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** Legible.
- **Formato recomendable:** PDF o imagen.
- **Fondo transparente:** No aplica.
- **Escena:** EP07: S05 mapa de compresor.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P4 · Opcional
- **Reutilizable en otros episodios:** No.
- **Si falta:** Mapa conceptual rotulado «Gráfica ilustrativa · no corresponde a un turbo concreto».
- **Estado:** Reemplazable por ilustración conceptual
