# ASSET_REQUEST · EP08 · Qué son los mapas de una ECU

> Generado por `node CARTEC/_sistema/generar.mjs` el 2026-10-28. No editar a mano: los cambios van en `CARTEC/_sistema/recursos.mjs`.

Material que necesito para producir el EP08. Las escenas (S01, S02…) son las de `STORYBOARD.md`.

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
| EP08-SRT | Subtítulos EP08 | P1 · Obligatorio para producir | Requiere verificación |
| EP08-VOZ | Locución EP08 | P1 · Obligatorio para producir | Disponible |
| SH-DEC-04 | Licencia de Remotion | P2 · Obligatorio para publicar | Pendiente |
| SH-DYN-01 | Banco de potencia de CAR-TEC: vistas para dibujarlo | P2 · Obligatorio para publicar | Reemplazable por ilustración conceptual |
| EP08-DAT-01 | Nombres genéricos de las tablas que se rotulan | P2 · Obligatorio para publicar | Pendiente |
| EP08-VAL | Validación técnica EP08 | P2 · Obligatorio para publicar | Requiere verificación |
| SH-ENG-01 | Motor de referencia: vistas del conjunto | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-INT-02 | Circuito de admisión y posición de los sensores de temperatura | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-TRN-01 | Caja de cambios elegida: exterior y corte | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-ECU-01 | ECU real del motor de referencia: carcasa y placa | P4 · Opcional | Reemplazable por ilustración conceptual |
| SH-ENG-02 | Inyector, bujía y sensores del motor de referencia | P4 · Opcional | Reemplazable por ilustración conceptual |

## Peticiones nuevas en este episodio

### EP08-SRT — Subtítulos EP08

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP08.srt`
- **Episodio:** EP08
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP08 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto y paso la versión corregida a public/episodes/08-mapas-ecu/subtitulos.srt, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP08: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Tres palabras que el SRT automático no deja claras: «¿Qué modifica…?» (ponía «Modificar»), «con las que» («con la que») y «de funcionamiento» («del funcionamiento»).
- **Nota:** Recibido y corregido en public/episodes/08-mapas-ecu/subtitulos.srt.
- **Estado:** Requiere verificación

### EP08-VOZ — Locución EP08

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP08_voz.mp3 (o .wav)`
- **Episodio:** EP08
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP08, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP08: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz. Yo la paso a public/episodes/ para el vídeo.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Nota:** Recibida: 39,7 s. El texto grabado difiere del borrador; SCRIPT.md recoge el grabado.
- **Estado:** Disponible

### EP08-DAT-01 — Nombres genéricos de las tablas que se rotulan

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP08
- **Tipo de recurso:** Dato técnico o archivo de datos
- **Qué debe verse:** Propongo rotular solo nombres genéricos en castellano, los de la locución: «Inyección», «Encendido», «Presión del turbo», «Límite de par», «Gestión del combustible» y «Estrategias de control». Ningún nombre interno del fabricante ni captura real de software. El responsable confirma la lista y su relación (qué tabla afecta a cuál).
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Texto.
- **Fondo transparente:** No aplica.
- **Escena:** EP08: S04 índice de tablas, S08–S09 red de tablas relacionadas.
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

## Ya pedido en un episodio anterior: no lo envíes otra vez

| Código | Recurso | Pedido en | Uso en este episodio | Estado |
|---|---|---|---|---|
| SH-BRD-01 | Logotipos CAR-TEC vectoriales y rojo oficial | EP01 | Todo el episodio | Disponible |
| SH-FNT-01 | Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono | EP01 | Todo el episodio | Disponible |
| SH-REF-01 | CPC.png, referencia visual aprobada | EP01 | Todo el episodio | Disponible |
| SH-DEC-01 | ¿Se mantiene «sin fotos ni metraje» en toda la temporada? | EP02 | Todo el episodio | Pendiente |
| SH-DEC-02 | Motor y coche de referencia de la temporada | EP02 | EP08: S06 — sensores alrededor del motor. | Pendiente |
| SH-DEC-04 | Licencia de Remotion | EP01 | Todo el episodio | Pendiente |
| SH-DYN-01 | Banco de potencia de CAR-TEC: vistas para dibujarlo | EP06 | EP08: S11 retícula final. | Reemplazable por ilustración conceptual |
| SH-ENG-01 | Motor de referencia: vistas del conjunto | EP02 | EP08: S06 sensores alrededor del motor. | Reemplazable por ilustración conceptual |
| SH-INT-02 | Circuito de admisión y posición de los sensores de temperatura | EP04 | EP08: S06 red de sensores. | Reemplazable por ilustración conceptual |
| SH-TRN-01 | Caja de cambios elegida: exterior y corte | EP05 | EP08: S11 retícula final de piezas. | Reemplazable por ilustración conceptual |
| SH-ECU-01 | ECU real del motor de referencia: carcasa y placa | EP02 | EP08: S01 portada, S03 placa y chip. | Reemplazable por ilustración conceptual |
| SH-ENG-02 | Inyector, bujía y sensores del motor de referencia | EP02 | EP08: S06 red de sensores. | Reemplazable por ilustración conceptual |
