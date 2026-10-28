# ASSET_REQUEST · EP02 · Qué hace una Stage 1

> Generado por `node CARTEC/_sistema/generar.mjs` el 2026-10-28. No editar a mano: los cambios van en `CARTEC/_sistema/recursos.mjs`.

Material que necesito para producir el EP02. Las escenas (S01, S02…) son las de `STORYBOARD.md`.

## Cómo entregar el material

1. **Desde el móvil:** adjúntalo en el chat de Claude y di su código (por ejemplo, «esto es SH-TUR-01» o «locución del EP02»). Yo lo renombro y lo coloco en su carpeta.
2. **Desde el ordenador:** súbelo a la carpeta indicada con un nombre que empiece por el código. Si son varias fotos del mismo recurso, añade un sufijo: `SH-TUR-01_lado-compresor.jpg`, `SH-TUR-01_perfil.jpg`. La locución y el SRT van a `CARTEC/LOCUCIONES/` con un nombre que empiece por el episodio (`EP04_voz.mp3`, `EP04.srt`).
3. **Decisiones y datos en texto:** contéstalos en el chat citando el código.

Las referencias para dibujar **no salen en el vídeo**: pueden ser fotos de móvil, imágenes del catálogo del fabricante o despieces de recambios. Sirven para que las piezas dibujadas tengan la forma real.

## Resumen

| Código | Recurso | Prioridad | Estado |
|---|---|---|---|
| SH-BRD-01 | Logotipos CAR-TEC vectoriales y rojo oficial | P0 · Bloquea el sistema | Disponible |
| SH-FNT-01 | Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono | P0 · Bloquea el sistema | Disponible |
| SH-REF-01 | CPC.png, referencia visual aprobada | P0 · Bloquea el sistema | Disponible |
| EP02-SRT | Subtítulos EP02 | P1 · Obligatorio para producir | Disponible |
| EP02-VOZ | Locución EP02 | P1 · Obligatorio para producir | Disponible |
| SH-DEC-01 | ¿Se mantiene «sin fotos ni metraje» en toda la temporada? | P1 · Obligatorio para producir | Pendiente |
| SH-DEC-02 | Motor y coche de referencia de la temporada | P1 · Obligatorio para producir | Pendiente |
| SH-DEC-03 | Aviso legal en episodios de preparación | P2 · Obligatorio para publicar | Pendiente |
| SH-DEC-04 | Licencia de Remotion | P2 · Obligatorio para publicar | Pendiente |
| EP02-VAL | Validación técnica EP02 | P2 · Obligatorio para publicar | Requiere verificación |
| SH-ENG-01 | Motor de referencia: vistas del conjunto | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-TUR-01 | Turbo de serie del motor de referencia | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-ECU-01 | ECU real del motor de referencia: carcasa y placa | P4 · Opcional | Reemplazable por ilustración conceptual |
| SH-ENG-02 | Inyector, bujía y sensores del motor de referencia | P4 · Opcional | Reemplazable por ilustración conceptual |

## Peticiones nuevas en este episodio

### EP02-SRT — Subtítulos EP02

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP02.srt`
- **Episodio:** EP02
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP02 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto y paso la versión corregida a public/episodes/02-stage1/subtitulos.srt, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP02: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Nota:** Recibido y corregido en public/episodes/02-stage1/subtitulos.srt.
- **Estado:** Disponible

### EP02-VOZ — Locución EP02

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP02_voz.mp3 (o .wav)`
- **Episodio:** EP02
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP02, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP02: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz. Yo la paso a public/episodes/ para el vídeo.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Nota:** Recibida: 34,6 s. El texto grabado difiere del borrador; SCRIPT.md recoge el grabado.
- **Estado:** Disponible

### SH-DEC-01 — ¿Se mantiene «sin fotos ni metraje» en toda la temporada?

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP02 (también EP03, EP04, EP05, EP06, EP07, EP08)
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
- **Episodio:** EP02 (también EP03, EP04, EP06, EP07, EP08)
- **Tipo de recurso:** Decisión
- **Qué debe verse:** Qué motor dibujo en los episodios de preparación. Recomiendo un único motor 4 cilindros turbo de gasolina, el que más preparáis (dime fabricante, código de motor y un coche donde va), para que turbo, downpipe e intercooler sean los mismos de episodio en episodio. Coche: recomiendo reutilizar la berlina sin marca del EP01; dime si prefieres otro tipo de carrocería.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Texto: fabricante, código de motor, coche y año.
- **Fondo transparente:** No aplica.
- **Escena:** EP02: S01, S03, S05 y S06 — motor protagonista.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** Sí: define la biblioteca de piezas de la temporada.
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

### SH-ENG-01 — Motor de referencia: vistas del conjunto

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/ENGINES/SH-ENG-01_motor_<vista>.jpg`
- **Episodio:** EP02 (también EP03, EP04, EP07, EP08)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** El motor elegido en SH-DEC-02 entero, sin tapa embellecedora: bloque, culata, colector de admisión, turbo y colector de escape, raíl de inyectores y bobinas.
- **Ángulo o perspectiva:** Cuatro vistas: lado de admisión, lado de escape (con el turbo a la vista), frontal de distribución y 3/4 desde arriba. Si hay despiece del fabricante, mejor.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP02: S01 portada y despiece «cero piezas», S02 barrido a la ECU, S05 pantalla partida.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Sobre todo: unión turbo–colector, posición del colector de admisión y del raíl de inyectores.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP02, EP03, EP04, EP07 y EP08.
- **Si falta:** Motor 4 cilindros turbo genérico, rotulado «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### SH-TUR-01 — Turbo de serie del motor de referencia

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/TURBOS/SH-TUR-01_turbo-serie_<vista>.jpg`
- **Episodio:** EP02 (también EP03, EP04, EP07)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** El turbo de serie desmontado o en catálogo: carcasa de compresor, carcasa de turbina, cartucho central y actuador de la wastegate. Si existe, un corte o despiece del fabricante.
- **Ángulo o perspectiva:** Lado compresor de frente (rueda visible), lado turbina de frente, perfil con el actuador y vista desde la brida de escape.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP02: S03 «presión del turbo», S06 presión de sobrealimentación.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Para el EP07 necesito distinguir rueda de compresor, cartucho, eje y rueda de turbina.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP02, EP03, EP04 y EP07.
- **Si falta:** Turbo genérico de una sola entrada con wastegate, rotulado «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### SH-ECU-01 — ECU real del motor de referencia: carcasa y placa

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/ECU/SH-ECU-01_ecu_<vista>.jpg`
- **Episodio:** EP02 (también EP08)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** La centralita del motor de referencia cerrada (carcasa y conector) y, si alguna vez la abrís, la placa vista desde arriba. Sin pegatinas legibles con números de serie ni datos de clientes.
- **Ángulo o perspectiva:** Cenital de la carcasa, 3/4 con el conector y cenital de la placa.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP02: S02 centralita.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas.
- **Prioridad:** P4 · Opcional
- **Reutilizable en otros episodios:** Sí: EP02 y EP08.
- **Si falta:** La centralita base ya aprobada en el EP01, con placa conceptual.
- **Estado:** Reemplazable por ilustración conceptual

### SH-ENG-02 — Inyector, bujía y sensores del motor de referencia

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/ENGINES/SH-ENG-02_<pieza>.jpg`
- **Episodio:** EP02 (también EP04, EP08)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** Inyector, bobina con bujía, sensor de presión y temperatura de admisión, sensor de picado y sonda lambda del motor elegido.
- **Ángulo o perspectiva:** Cada pieza de perfil sobre fondo liso.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP02: S03 módulos «inyección» y «encendido».
- **Partes separadas para animar:** No hace falta separar nada.
- **Prioridad:** P4 · Opcional
- **Reutilizable en otros episodios:** Sí: EP02, EP04 y EP08.
- **Si falta:** Formas genéricas de cada pieza, rotuladas «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

## Ya pedido en un episodio anterior: no lo envíes otra vez

| Código | Recurso | Pedido en | Uso en este episodio | Estado |
|---|---|---|---|---|
| SH-BRD-01 | Logotipos CAR-TEC vectoriales y rojo oficial | EP01 | Todo el episodio | Disponible |
| SH-FNT-01 | Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono | EP01 | Todo el episodio | Disponible |
| SH-REF-01 | CPC.png, referencia visual aprobada | EP01 | Todo el episodio | Disponible |
| SH-DEC-03 | Aviso legal en episodios de preparación | EP01 | EP02: S11 cierre de marca. | Pendiente |
| SH-DEC-04 | Licencia de Remotion | EP01 | Todo el episodio | Pendiente |
