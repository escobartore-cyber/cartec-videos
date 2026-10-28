# ASSET_REQUEST · EP05 · Cómo la caja de cambios limita el par

> Generado por `node CARTEC/_sistema/generar.mjs` el 2026-10-28. No editar a mano: los cambios van en `CARTEC/_sistema/recursos.mjs`.

Material que necesito para producir el EP05. Las escenas (S01, S02…) son las de `STORYBOARD.md`.

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
| EP05-DEC-01 | Caja de cambios protagonista | P1 · Obligatorio para producir | Pendiente |
| EP05-SRT | Subtítulos EP05 | P1 · Obligatorio para producir | Pendiente |
| EP05-VOZ | Locución EP05 | P1 · Obligatorio para producir | Pendiente |
| SH-DEC-03 | Aviso legal en episodios de preparación | P2 · Obligatorio para publicar | Pendiente |
| SH-DEC-04 | Licencia de Remotion | P2 · Obligatorio para publicar | Pendiente |
| EP05-VAL | Validación técnica EP05 | P2 · Obligatorio para publicar | Requiere verificación |
| SH-ECU-03 | TCU o mecatrónica de la caja elegida | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-TRN-01 | Caja de cambios elegida: exterior y corte | P3 · Recomendable | Reemplazable por ilustración conceptual |

## Peticiones nuevas en este episodio

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

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP05.srt`
- **Episodio:** EP05
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP05 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto y paso la versión corregida a public/episodes/05-tcu/subtitulos.srt, como en el EP01.
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

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP05_voz.mp3 (o .wav)`
- **Episodio:** EP05
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP05, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP05: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz. Yo la paso a public/episodes/ para el vídeo.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Estado:** Pendiente

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
- **Episodio:** EP05 (también EP08)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** La caja de EP05-DEC-01 por fuera y, si existe, un corte o despiece del fabricante: trenes epicicloidales o embragues, y dónde va la unidad de control.
- **Ángulo o perspectiva:** Perfil exterior, vista inferior (cárter y mecatrónica) y corte longitudinal.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP05: S02 órbita de la caja, S04 interior, S08 cadena cinemática.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Necesito ver la carcasa, el convertidor o embrague y la posición de la mecatrónica.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP05 y EP08.
- **Si falta:** Caja automática genérica en corte, rotulada «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

## Ya pedido en un episodio anterior: no lo envíes otra vez

| Código | Recurso | Pedido en | Uso en este episodio | Estado |
|---|---|---|---|---|
| SH-BRD-01 | Logotipos CAR-TEC vectoriales y rojo oficial | EP01 | Todo el episodio | Disponible |
| SH-FNT-01 | Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono | EP01 | Todo el episodio | Disponible |
| SH-REF-01 | CPC.png, referencia visual aprobada | EP01 | Todo el episodio | Disponible |
| SH-DEC-01 | ¿Se mantiene «sin fotos ni metraje» en toda la temporada? | EP02 | Todo el episodio | Pendiente |
| SH-DEC-03 | Aviso legal en episodios de preparación | EP01 | EP05: S09 cierre de marca. | Pendiente |
| SH-DEC-04 | Licencia de Remotion | EP01 | Todo el episodio | Pendiente |
