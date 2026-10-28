# ASSET_REQUEST · EP04 · Por qué el calor reduce el rendimiento

> Generado por `node CARTEC/_sistema/generar.mjs` el 2026-10-28. No editar a mano: los cambios van en `CARTEC/_sistema/recursos.mjs`.

Material que necesito para producir el EP04. Las escenas (S01, S02…) son las de `STORYBOARD.md`.

## Cómo entregar el material

1. **Desde el móvil:** adjúntalo en el chat de Claude y di su código (por ejemplo, «esto es SH-TUR-01» o «locución del EP02»). Yo lo renombro y lo coloco en su carpeta.
2. **Desde el ordenador:** súbelo a la carpeta indicada con un nombre que empiece por el código. Si son varias fotos del mismo recurso, añade un sufijo: `SH-TUR-01_lado-compresor.jpg`, `SH-TUR-01_perfil.jpg`. La locución y el SRT van con el nombre fijo del flujo de producción: `public/episodes/NN-tema/voz.wav` y `subtitulos.srt`.
3. **Decisiones y datos en texto:** contéstalos en el chat citando el código.

Las referencias para dibujar **no salen en el vídeo**: pueden ser fotos de móvil, imágenes del catálogo del fabricante o despieces de recambios. Sirven para que las piezas dibujadas tengan la forma real.

## Resumen

| Código | Recurso | Prioridad | Estado |
|---|---|---|---|
| SH-BRD-01 | Logotipos CAR-TEC vectoriales y rojo oficial | P0 · Bloquea el sistema | Disponible |
| SH-FNT-01 | Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono | P0 · Bloquea el sistema | Disponible |
| SH-REF-01 | CPC.png, referencia visual aprobada | P0 · Bloquea el sistema | Disponible |
| SH-DEC-01 | ¿Se mantiene «sin fotos ni metraje» en toda la temporada? | P1 · Obligatorio para producir | Pendiente |
| SH-DEC-02 | Motor y coche de referencia de la temporada | P1 · Obligatorio para producir | Pendiente |
| EP04-SRT | Subtítulos EP04 | P1 · Obligatorio para producir | Pendiente |
| EP04-VOZ | Locución EP04 | P1 · Obligatorio para producir | Pendiente |
| SH-DEC-04 | Licencia de Remotion | P2 · Obligatorio para publicar | Pendiente |
| SH-DYN-02 | Datos reales de banco exportados (CSV y hoja de resultados) | P2 · Obligatorio para publicar | Reemplazable por ilustración conceptual |
| EP04-VAL | Validación técnica EP04 | P2 · Obligatorio para publicar | Requiere verificación |
| SH-ENG-01 | Motor de referencia: vistas del conjunto | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-TUR-01 | Turbo de serie del motor de referencia | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-INT-01 | Intercooler de serie del motor de referencia | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-INT-02 | Circuito de admisión y posición de los sensores de temperatura | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-ENG-02 | Inyector, bujía y sensores del motor de referencia | P4 · Opcional | Reemplazable por ilustración conceptual |
| EP04-DAT-01 | Registro real de temperatura de admisión | P4 · Opcional | Reemplazable por ilustración conceptual |

## Peticiones nuevas en este episodio

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

### SH-INT-02 — Circuito de admisión y posición de los sensores de temperatura

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/INTERCOOLERS/SH-INT-02_circuito-admision.pdf`
- **Episodio:** EP04 (también EP08)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** Esquema o despiece del recorrido del aire: filtro, turbo, manguitos, intercooler, mariposa y colector, con la posición del sensor (o sensores) de temperatura de admisión.
- **Ángulo o perspectiva:** Esquema plano o despiece de recambios.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP04: S02 entrada de aire, S06 circuito completo, S07 sensor.
- **Partes separadas para animar:** No hace falta separar nada.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP04 y EP08.
- **Si falta:** Circuito genérico filtro → turbo → intercooler → colector.
- **Estado:** Reemplazable por ilustración conceptual

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

## Ya pedido en un episodio anterior: no lo envíes otra vez

| Código | Recurso | Pedido en | Uso en este episodio | Estado |
|---|---|---|---|---|
| SH-BRD-01 | Logotipos CAR-TEC vectoriales y rojo oficial | EP01 | Todo el episodio | Disponible |
| SH-FNT-01 | Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono | EP01 | Todo el episodio | Disponible |
| SH-REF-01 | CPC.png, referencia visual aprobada | EP01 | Todo el episodio | Disponible |
| SH-DEC-01 | ¿Se mantiene «sin fotos ni metraje» en toda la temporada? | EP02 | Todo el episodio | Pendiente |
| SH-DEC-02 | Motor y coche de referencia de la temporada | EP02 | EP04: S03, S05, S06 — turbo e intercooler del mismo motor. | Pendiente |
| SH-DEC-04 | Licencia de Remotion | EP01 | Todo el episodio | Pendiente |
| SH-DYN-02 | Datos reales de banco exportados (CSV y hoja de resultados) | EP02 | EP04: S09 pasadas consecutivas, si hay varias seguidas. | Reemplazable por ilustración conceptual |
| SH-ENG-01 | Motor de referencia: vistas del conjunto | EP02 | EP04: S02–S03 recorrido del aire. | Reemplazable por ilustración conceptual |
| SH-TUR-01 | Turbo de serie del motor de referencia | EP02 | EP04: S03 compresor calentando el aire. | Reemplazable por ilustración conceptual |
| SH-INT-01 | Intercooler de serie del motor de referencia | EP03 | EP04: S05 revelado, S06 circuito. | Reemplazable por ilustración conceptual |
| SH-ENG-02 | Inyector, bujía y sensores del motor de referencia | EP02 | EP04: S06–S07 sensor de temperatura de admisión. | Reemplazable por ilustración conceptual |
