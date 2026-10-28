# ASSET_REQUEST · EP01 · Mercedes-AMG: desbloqueo CPC

> Generado por `node CARTEC/_sistema/generar.mjs` el 2026-10-28. No editar a mano: los cambios van en `CARTEC/_sistema/recursos.mjs`.

Material que necesito para producir el EP01. Las escenas (S01, S02…) son las de `STORYBOARD.md`.

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
| EP01-SRT | Subtítulos EP01 | P1 · Obligatorio para producir | Disponible |
| EP01-VOZ | Locución EP01 | P1 · Obligatorio para producir | Disponible |
| EP01-DAT-01 | Modelos AMG con CPC independiente y límites que contiene | P2 · Obligatorio para publicar | Pendiente |
| EP01-VAL | Validación técnica EP01 | P2 · Obligatorio para publicar | Requiere verificación |
| SH-DEC-03 | Aviso legal en episodios de preparación | P2 · Obligatorio para publicar | Pendiente |
| SH-DEC-04 | Licencia de Remotion | P2 · Obligatorio para publicar | Pendiente |

## Peticiones nuevas en este episodio

### SH-BRD-01 — Logotipos CAR-TEC vectoriales y rojo oficial

- **Archivo solicitado:** `CARTEC/SHARED_ASSETS/BRAND/Ya entregado: brand-src/ y public/brand/`
- **Episodio:** EP01 (también EP02, EP03, EP04, EP05, EP06, EP07, EP08)
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
- **Episodio:** EP01 (también EP02, EP03, EP04, EP05, EP06, EP07, EP08)
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
- **Episodio:** EP01 (también EP02, EP03, EP04, EP05, EP06, EP07, EP08)
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

### EP01-SRT — Subtítulos EP01

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP01.srt`
- **Episodio:** EP01
- **Tipo de recurso:** Subtítulos
- **Qué debe verse:** Subtítulos de la locución del EP01 con sus tiempos, palabra a palabra si tu herramienta lo permite (CapCut, Premiere…). Corrijo yo el texto y paso la versión corregida a public/episodes/01-cpc/subtitulos.srt, como en el EP01.
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

- **Archivo solicitado:** `CARTEC/LOCUCIONES/EP01_voz.mp3 (o .wav)`
- **Episodio:** EP01
- **Tipo de recurso:** Locución
- **Qué debe verse:** Locución definitiva del EP01, voz sola: sin música, sin efectos y sin procesar en exceso. Con el texto de SCRIPT.md.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** WAV 48 kHz y 24 bits. Si solo tienes MP3, a 320 kbps (como el EP01).
- **Formato recomendable:** WAV (preferente) o MP3.
- **Fondo transparente:** No aplica.
- **Escena:** EP01: Todo el episodio: marca el ritmo de cortes, subtítulos y sonido.
- **Partes separadas para animar:** Medio segundo de silencio al principio y al final. No se cambia la velocidad de la voz. Yo la paso a public/episodes/ para el vídeo.
- **Prioridad:** P1 · Obligatorio para producir
- **Reutilizable en otros episodios:** No.
- **Nota:** Entregada en la sesión del EP01 (MP3, 36,0 s).
- **Estado:** Disponible

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
- **Episodio:** EP01 (también EP02, EP03, EP05, EP07)
- **Tipo de recurso:** Decisión
- **Qué debe verse:** ¿Añadimos un rótulo fijo y discreto (micro, gris) del tipo «Las modificaciones de potencia pueden requerir legalización» al final de los episodios de preparación? El texto exacto lo decide el responsable del taller.
- **Ángulo o perspectiva:** No aplica.
- **Resolución mínima:** No aplica.
- **Formato recomendable:** Sí / No y texto exacto.
- **Fondo transparente:** No aplica.
- **Escena:** EP01: S12 cierre de marca.
- **Partes separadas para animar:** No aplica.
- **Prioridad:** P2 · Obligatorio para publicar
- **Reutilizable en otros episodios:** Sí, plantilla de cierre.
- **Estado:** Pendiente

### SH-DEC-04 — Licencia de Remotion

- **Archivo solicitado:** No es un archivo: respóndelo en el chat.
- **Episodio:** EP01 (también EP02, EP03, EP04, EP05, EP06, EP07, EP08)
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

## Ya pedido en un episodio anterior: no lo envíes otra vez

Nada.
