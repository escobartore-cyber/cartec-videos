# ASSET_REQUEST · EP06 · Cómo funciona un banco de potencia

> Generado por `node CARTEC/_sistema/generar.mjs` el 2026-10-28. No editar a mano: los cambios van en `CARTEC/_sistema/recursos.mjs`.

Material que necesito para producir el EP06. Las escenas (S01, S02…) son las de `STORYBOARD.md`.

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
| SH-DEC-01 | ¿Se mantiene «sin fotos ni metraje» en toda la temporada? | P1 · Obligatorio para producir | Pendiente |
| SH-DEC-02 | Motor y coche de referencia de la temporada | P1 · Obligatorio para producir | Pendiente |
| EP06-DEC-01 | Ficha del banco de potencia de CAR-TEC | P1 · Obligatorio para producir | Pendiente |
| EP06-SRT | Subtítulos EP06 | P1 · Obligatorio para producir | Disponible |
| EP06-VOZ | Locución EP06 | P1 · Obligatorio para producir | Disponible |
| SH-DEC-04 | Licencia de Remotion | P2 · Obligatorio para publicar | Pendiente |
| SH-DYN-02 | Datos reales de banco exportados (CSV y hoja de resultados) | P2 · Obligatorio para publicar | Reemplazable por ilustración conceptual |
| EP06-VAL | Validación técnica EP06 | P2 · Obligatorio para publicar | Requiere verificación |
| SH-DYN-01 | Banco de potencia de CAR-TEC: vistas para dibujarlo | P2 · Obligatorio para publicar | Reemplazable por ilustración conceptual |
| EP06-SND-01 | Audio real de una pasada en el banco | P4 · Opcional | Reemplazable por sonido sintetizado |

## Peticiones nuevas en este episodio

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

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP06.srt`
- **Episodio:** EP06
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP06 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto y paso la versión corregida a public/episodes/06-dyno/subtitulos.srt, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP06: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Disponible

### EP06-VOZ — Locución EP06

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP06_voz.mp3 (o .wav)`
- **Episodio:** EP06
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP06, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP06: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz. Yo la paso a public/episodes/ para el vídeo.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Disponible

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
- **Episodio:** EP06 (también EP08)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** El banco sin coche: rodillos, bastidor, ventilador de refrigeración, puntos de anclaje y cinchas, y el puesto de control. Sin personas ni matrículas. Solo se dibuja la máquina, no el taller.
- **Ángulo o perspectiva:** Lateral completo, 3/4 desde la parte delantera, rodillos de cerca (desde arriba y de perfil), ventilador de frente.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP06: S02 revelado del banco, S03 coche sobre rodillos, S04 esquema de medición.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Lo importante: diámetro relativo de los rodillos, separación entre ellos y posición del ventilador.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** Sí: EP06, EP08 y cualquier vídeo futuro de resultados.
- **Si falta:** Banco de rodillos genérico, rotulado «Esquema ilustrativo · no a escala». Pierde credibilidad si el texto dice «nuestro banco».
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

## Ya pedido en un episodio anterior: no lo envíes otra vez

| Código | Recurso | Pedido en | Uso en este episodio | Estado |
|---|---|---|---|---|
| SH-BRD-01 | Logotipos CAR-TEC vectoriales y rojo oficial | EP01 | Todo el episodio | Disponible |
| SH-FNT-01 | Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono | EP01 | Todo el episodio | Disponible |
| SH-REF-01 | CPC.png, referencia visual aprobada | EP01 | Todo el episodio | Disponible |
| SH-DEC-01 | ¿Se mantiene «sin fotos ni metraje» en toda la temporada? | EP02 | Todo el episodio | Pendiente |
| SH-DEC-02 | Motor y coche de referencia de la temporada | EP02 | Todo el episodio | Pendiente |
| SH-DEC-04 | Licencia de Remotion | EP01 | Todo el episodio | Pendiente |
| SH-DYN-02 | Datos reales de banco exportados (CSV y hoja de resultados) | EP04 | EP06: S05 gráfica en tiempo real, S06–S07 acta y comparación. | Reemplazable por ilustración conceptual |
