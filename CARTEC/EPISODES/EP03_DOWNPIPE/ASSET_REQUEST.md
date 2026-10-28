# ASSET_REQUEST · EP03 · Para qué sirve una downpipe

> Generado por `node CARTEC/_sistema/generar.mjs` el 2026-10-28. No editar a mano: los cambios van en `CARTEC/_sistema/recursos.mjs`.

Material que necesito para producir el EP03. Las escenas (S01, S02…) son las de `STORYBOARD.md`.

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
| EP03-SRT | Subtítulos EP03 | P1 · Obligatorio para producir | Requiere verificación |
| EP03-VOZ | Locución EP03 | P1 · Obligatorio para producir | Disponible |
| SH-DEC-03 | Aviso legal en episodios de preparación | P2 · Obligatorio para publicar | Pendiente |
| SH-DEC-04 | Licencia de Remotion | P2 · Obligatorio para publicar | Pendiente |
| EP03-DAT-01 | Documentación de homologación del catalizador | P2 · Obligatorio para publicar | Reemplazable por texto genérico |
| EP03-VAL | Validación técnica EP03 | P2 · Obligatorio para publicar | Requiere verificación |
| SH-ENG-01 | Motor de referencia: vistas del conjunto | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-TUR-01 | Turbo de serie del motor de referencia | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-EXH-01 | Downpipe de serie del motor de referencia | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-EXH-02 | Downpipe de mayor flujo que monta CAR-TEC | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-EXH-03 | Recorrido completo del escape del coche de referencia | P3 · Recomendable | Reemplazable por ilustración conceptual |
| SH-INT-01 | Intercooler de serie del motor de referencia | P3 · Recomendable | Reemplazable por ilustración conceptual |

## Peticiones nuevas en este episodio

### EP03-SRT — Subtítulos EP03

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP03.srt`
- **Episodio:** EP03
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP03 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto y paso la versión corregida a public/episodes/03-downpipe/subtitulos.srt, como en el EP01.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** SRT en UTF-8.
- **Fondo transparente:** No aplica.
- **Escena:** EP03: Todas: subtítulos en pantalla y anclaje de cada escena a su frase.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Requiere verificación:** Correcciones hechas sin audio («Se llama downpipe», «Cuando los gases de escape», «La downpipe forma parte»): se comprueban cuando llegue el MP3.
- **Nota:** Recibido y corregido en public/episodes/03-downpipe/subtitulos.srt sin poder escuchar la voz.
- **Estado:** Requiere verificación

### EP03-VOZ — Locución EP03

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP03_voz.mp3 (o .wav)`
- **Episodio:** EP03
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP03, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP03: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz. Yo la paso a public/episodes/ para el vídeo.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Nota:** Llegó el SRT sin el MP3.
- **Estado:** Disponible

### EP03-DAT-01 — Documentación de homologación del catalizador

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/EXHAUST/EP03-DAT-01_homologacion.pdf`
- **Episodio:** EP03
- **Tipo de recurso:** Dato técnico o archivo de datos
- **Qué debe verse:** Certificado o ficha que acredite que el catalizador de la downpipe de SH-EXH-02 está homologado, y en qué condiciones se puede circular con ella en España.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** Legible.
- **Formato recomendable:** PDF o foto del documento.
- **Fondo transparente:** No aplica.
- **Escena:** EP03: S09 ficha EMISIONES: el catalizador solo se rotula «homologado» con documentación.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** No.
- **Si falta:** El catalizador se dibuja sin rótulo de homologación.
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

### SH-EXH-01 — Downpipe de serie del motor de referencia

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/EXHAUST/SH-EXH-01_downpipe-serie_<vista>.jpg`
- **Episodio:** EP03 (también EP07)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** La downpipe de serie completa, con su catalizador (y filtro de partículas si lo lleva), las bridas y la sonda lambda.
- **Ángulo o perspectiva:** Perfil completo, vista desde la brida del turbo (para ver la sección de entrada) y detalle de la curva más cerrada.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP03: S03 ficha de la downpipe, S07 cortes de sección, S08 comparativa.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas. Lo que más importa: el trazado de las curvas y dónde empieza el catalizador.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP03 y EP07.
- **Si falta:** Downpipe genérica con catalizador, rotulada «Esquema ilustrativo · no a escala».
- **Estado:** Reemplazable por ilustración conceptual

### SH-EXH-02 — Downpipe de mayor flujo que monta CAR-TEC

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/EXHAUST/SH-EXH-02_downpipe-cartec_<vista>.jpg`
- **Episodio:** EP03 (también EP07)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** La downpipe que instaláis en una Stage 2 para el motor de referencia, con su catalizador. Fotos del producto real o del catálogo del fabricante.
- **Ángulo o perspectiva:** Las mismas tres vistas que SH-EXH-01, para poder compararlas en el mismo encuadre.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP03: S08 comparativa serie frente a mayor flujo, S10 conjunto Stage 2.
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
- **Escena:** EP03: S05–S06 descenso por el escape y recorrido completo, S09 «emisiones».
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** No.
- **Si falta:** Recorrido genérico: turbo, downpipe, catalizador, silencioso.
- **Estado:** Reemplazable por ilustración conceptual

### SH-INT-01 — Intercooler de serie del motor de referencia

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/INTERCOOLERS/SH-INT-01_intercooler_<vista>.jpg`
- **Episodio:** EP03 (también EP04, EP07)
- **Tipo de recurso:** Referencia para dibujar (no sale en pantalla)
- **Qué debe verse:** El intercooler de serie: núcleo, tanques y tomas. Y dime si es aire-aire (frontal) o aire-agua (integrado en el colector), porque se dibuja distinto.
- **Ángulo o perspectiva:** Frontal del núcleo, perfil (para el grosor) y detalle de las aletas.
- **Resolución mínima:** Mínimo 2000 px en el lado largo. Vale una foto de móvil nítida, una imagen de catálogo del fabricante o un despiece de recambios.
- **Formato recomendable:** JPG o PNG. Despieces y catálogos también en PDF.
- **Fondo transparente:** No. Es solo referencia para dibujar; no se recorta ni sale en pantalla.
- **Escena:** EP03: S10 conjunto Stage 2.
- **Partes separadas para animar:** No hace falta separar nada: el despiece lo construyo yo en 3D de línea. Necesito ver bien las uniones entre piezas.
- **Prioridad:** P3 · Recomendable
- **Reutilizable en otros episodios:** Sí: EP03, EP04 y EP07.
- **Si falta:** Intercooler aire-aire frontal genérico, rotulado «Esquema ilustrativo · no a escala».
- **Requiere verificación:** Tipo de intercooler del motor de referencia.
- **Estado:** Reemplazable por ilustración conceptual

## Ya pedido en un episodio anterior: no lo envíes otra vez

| Código | Recurso | Pedido en | Uso en este episodio | Estado |
|---|---|---|---|---|
| SH-BRD-01 | Logotipos CAR-TEC vectoriales y rojo oficial | EP01 | Todo el episodio | Disponible |
| SH-FNT-01 | Aspekta (Light 300, Bold 700, Heavy 900) y JetBrains Mono | EP01 | Todo el episodio | Disponible |
| SH-REF-01 | CPC.png, referencia visual aprobada | EP01 | Todo el episodio | Disponible |
| SH-DEC-01 | ¿Se mantiene «sin fotos ni metraje» en toda la temporada? | EP02 | Todo el episodio | Pendiente |
| SH-DEC-02 | Motor y coche de referencia de la temporada | EP02 | EP03: S02–S04 — lado de escape del mismo motor. | Pendiente |
| SH-DEC-03 | Aviso legal en episodios de preparación | EP01 | EP03: S11 cierre de marca: la locución grabada ya no menciona los requisitos legales. | Pendiente |
| SH-DEC-04 | Licencia de Remotion | EP01 | Todo el episodio | Pendiente |
| SH-ENG-01 | Motor de referencia: vistas del conjunto | EP02 | EP03: S02 lado de escape. | Reemplazable por ilustración conceptual |
| SH-TUR-01 | Turbo de serie del motor de referencia | EP02 | EP03: S04 turbina y compresor en corte. | Reemplazable por ilustración conceptual |
