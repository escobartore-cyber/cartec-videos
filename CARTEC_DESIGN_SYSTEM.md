# CAR-TEC · Sistema de diseño audiovisual

Lenguaje visual obligatorio para todos los episodios de la serie. Se basa en una referencia de 10 láminas editoriales: dibujo técnico de automoción, negro dominante, línea blanca y rojo como único acento.

Los valores de este documento están en código en `src/system/tokens.ts`, que es la fuente de verdad. Si algo cambia, cambia en los dos sitios a la vez.

---

## 1. Principios

1. **Todo es dibujo técnico.** No hay fotografía ni renders genéricos. Las piezas se dibujan en línea blanca sobre negro, como una lámina de ingeniería.
2. **Ningún lugar reconocible.** Ni taller, ni calle, ni personas. Solo piezas, esquemas, gráficas y texto.
3. **Negro dominante, rojo con intención.** El rojo marca solo una de estas cosas: el protagonista de la escena, un límite o alerta, una palabra clave o la marca.
4. **Mucho espacio negativo.** Como mucho, un dibujo principal y un bloque de texto por escena.
5. **Rigor antes que efecto.** Ninguna cifra, especificación o diagrama sale en pantalla sin estar verificado. Si algo es ilustrativo, se dice en pantalla.
6. **Siempre hay movimiento.** Ningún plano está quieto: la cámara deriva, las líneas se trazan y el texto entra con el ritmo de la voz.

## 2. Formato y zonas seguras

| Parámetro | Valor |
|---|---|
| Lienzo | 1080 × 1920 px (9:16) |
| Fotogramas | 30 fps |
| Plataformas | Instagram Reels, TikTok, YouTube Shorts |
| Códec de entrega | H.264, yuv420p, CRF 16, AAC 320 kbps |

**Zona segura común a las tres plataformas.** Texto y datos críticos siempre dentro:

```
y=0    ┌──────────────────────────────┐
       │  (interfaz de la plataforma)  │  solo retícula y marcas
y=220  ├──────────────────────────────┤
       │ x=72                   x=1008│  firma, títulos, dibujos
y=760  │                     ┌────────┤
       │      ZONA SEGURA    │ carril │  x>930: botones laterales
       │                     │ dcho.  │  (solo dibujo, nunca texto)
y=1480 ├─────────────────────┴────────┤
       │  (descripción y usuario)      │  solo retícula, marcas y notas
y=1920 └──────────────────────────────┘
```

## 3. Color

| Token | Hex | Uso |
|---|---|---|
| `negro` | `#0C0C0C` | Fondo y relleno de piezas (el negro del logo) |
| `grafito` | `#161616` | Paneles (uso puntual) |
| `blanco` | `#FFFFFF` | Línea principal y texto principal |
| `gris` | `#A3A3A3` | Texto secundario y etiquetas de eje |
| `grisOscuro` | `#5C5C5C` | Notas al pie y líneas terciarias |
| `rojo` | `#FF0707` | Rojo oficial CAR-TEC: único acento |

**Opacidades de línea:** principal 1 · secundaria 0,55 · construcción 0,28 · oculta 0,22 · retícula menor 0,035 · retícula mayor 0,07 · relleno rojo 0,12–0,20.

**Reglas**
- El rojo no ocupa más del 10 % del fotograma.
- Nunca hay dos protagonistas rojos en la misma escena.
- Sin degradados de color. La única excepción es la viñeta negra.
- Textura: grano de película animado al 6 % en modo pantalla, más una viñeta radial al 55 % en los bordes.

## 4. Tipografía

| Familia | Pesos | Uso |
|---|---|---|
| **Aspekta** | 300 Light · 700 Bold · 900 Heavy | Titulares, subtítulos, entradillas |
| **JetBrains Mono** | 400 · 500 · 700 | Etiquetas técnicas, ejes, datos, notas |

Archivos en `public/fonts/`. Licencias: Aspekta (uso comercial permitido) y JetBrains Mono (OFL).

**Escala (px a 1080 × 1920)**

| Estilo | Familia / peso | Tamaño | Interlínea | Tracking | Caja |
|---|---|---|---|---|---|
| `portada` | Aspekta 900 | 150 | 0,86 | −0,025 em | MAYÚS |
| `titulo` | Aspekta 900 | 104 | 0,90 | −0,015 em | MAYÚS |
| `subtituloEscena` | Aspekta 700 | 52 | 1,00 | 0 | MAYÚS |
| `entradilla` | Aspekta 300 | 36 | 1,22 | 0 | frase |
| `subtitulos` | Aspekta 900 | 68 | 1,02 | −0,01 em | MAYÚS |
| `etiqueta` | Mono 500 | 22 | 1,45 | +0,10 em | MAYÚS |
| `dato` | Mono 700 | 30 | 1,20 | +0,04 em | MAYÚS |
| `micro` | Mono 400 | 16 | 1,50 | +0,16 em | MAYÚS |

**Reglas**
- Todo texto se compone con el componente `T` y un estilo de la escala. Nunca se escriben tamaños a mano. La única excepción documentada es el acrónimo gigante de una ficha (p. ej. "CPC" a 200 px).
- Las cifras van siempre con números tabulares.
- Los índices de las etiquetas van en rojo: `01  TAPA`.
- Las unidades conservan su grafía: `Nm`, `rpm`, `km/h`.

## 5. Retícula y bandas

- **Margen exterior:** 72 px.
- **Columnas:** 6 de 136 px con medianil de 24 px (936 px útiles). Funciones `col(n)` y `span(n)`.
- **Módulo base:** 8 px. Todos los espaciados son múltiplos de 8.
- **Retícula visible de fondo:** celda de 40 px; línea mayor cada 120 px.
- **Bandas fijas:**

| Banda | y | Contenido |
|---|---|---|
| Firma | 236 | Logo compacto (44 px de alto) a la izquierda; episodio y figura a la derecha |
| Título | 330 | Marca roja de 48 × 4 px y título de la escena |
| Dibujo | ~640–1160 | Pieza, esquema o gráfica |
| Subtítulos | 1300 | Hasta 2 líneas |
| Nota al pie | 1500 | `micro`, gris oscuro: "Esquema ilustrativo · no a escala" |

- Marcas de registro en las cuatro esquinas (escuadras de 28 px a 40 px del borde) y cruces de corte en dos esquinas opuestas.
- La composición es editorial y alineada a la izquierda. Nada se centra salvo el logo del cierre.

## 6. Dibujo técnico

**Jerarquía de línea**

| Trazo | Grosor | Uso |
|---|---|---|
| Silueta | 2,6 px | Contorno exterior de cada pieza |
| Arista | 1,4 px | Aristas vivas interiores, detalles de carrocería |
| Detalle | 1 px | Serigrafías, pistas, pines, líneas guía |
| Curva de gráfica | 5 px | Par entregado (4 px para la curva roja) |
| Construcción | 1 px, 28–45 % | Ejes de rueda (trazo-punto `22 6 3 6`), rayado de suelo |

**Motor 3D en línea** (`src/draw/`)
- Las piezas se construyen con mallas convexas (`extrude`, `box`, `roundedBox`, `cylinder`) y se colocan con `place()`.
- Se ocultan las caras traseras. Las piezas se pintan de atrás hacia delante: por `order` explícito en los conjuntos apilados y por profundidad en el resto.
- Siempre se dibujan las siluetas. Las aristas solo cuando el ángulo entre caras supera 28°. Las facetas de las superficies curvas no se dibujan.
- Detalles planos (etiquetas, pistas, pines) como `decals` pegados a una cara: solo se ven si su cara se ve.
- **Cámara por defecto:** perspectiva larga (`dist` ≈ 5–6 veces el tamaño de la pieza), elevación de 30–35° y giro de ±30–35°. El conector o la cara importante, hacia la cámara.

**Convenciones**
- Despiece: separación vertical uniforme; el conector sale en su propio eje.
- Llamadas (`Callout`, `TagBelow`): punto de 5 px, línea guía de 1 px, codo fuera de la silueta, hombro horizontal y etiqueta en el margen. Etiquetas a un mínimo de 56 px entre sí.
- Suelo: línea de 1,4 px con rayado a 45° cada 18 px.
- Sin logotipos de fabricantes en los dibujos. La marca del vehículo aparece solo como texto.
- Cada dibujo que no sea un plano real lleva la nota "Esquema ilustrativo · no a escala".

## 7. Componentes

| Componente | Archivo | Para qué |
|---|---|---|
| `Frame` | `src/components/Frame.tsx` | Lienzo base: negro, retícula, viñeta, grano y marcas. Toda escena va dentro. |
| `Signature` | `src/components/Signature.tsx` | Firma CAR-TEC, episodio y figura. En todas las escenas salvo el cierre. |
| `Logo` | `src/components/Logo.tsx` | Logo oficial por partes (techo, letras y claim) para animarlo. |
| `T`, `Label`, `RedRule` | `src/components/Type.tsx` | Texto tipado, etiqueta con índice y marca roja. |
| `Subtitles` | `src/components/Subtitles.tsx` | Subtítulos cinéticos desde el SRT. |
| `Callout`, `TagBelow` | `src/components/Callout.tsx` | Llamadas técnicas a piezas. |
| `TitleReveal`, `FadeUp`, `Cam`, `SceneShell` | `src/components/Anim.tsx` | Entrada de títulos por máscara, fundidos, cámara 2D y barrido entre escenas. |
| `prog`, `shot`, `shake`, `drift` | `src/system/motion.ts` | Progresos con curva, plano activo, sacudida y deriva (todo en segundos globales). |
| `Line3D` | `src/draw/Line3D.tsx` | Dibuja piezas 3D en línea. |
| `makePen` | `src/draw/pen.ts` | Trazado 2D en metros → píxeles (splines, polilíneas, círculos). |
| `controlUnit` | `src/parts/controlUnit.ts` | Centralita ECU / CPC / TCU con despiece y puntos de anclaje. |
| `v8Engine` | `src/parts/v8Engine.ts` | V8 biturbo a 90° con turbos dentro de la V. |
| `Gauge` | `src/parts/Gauge.tsx` | Esfera sin cifras con tope rojo y zona limitada. |
| `Padlock` | `src/parts/Padlock.tsx` | Candado que se abre y se cierra. |
| `CalibrationMap` | `src/parts/CalibrationMap.tsx` | Mapa de calibración en malla 3D (rpm × carga) con nivel animable. |
| `CarSide`, `GroundAndAxes` | `src/parts/cars/CarSide.tsx` | Alzado lateral de cualquier coche con perfil `CarProfile`, suelo y ejes. |
| `CarTop` | `src/parts/cars/CarTop.tsx` | Planta con la cadena cinemática y el pulso de par. |
| `AMG_GT_C190` | `src/parts/cars/amgGtC190.ts` | Perfil del Mercedes-AMG GT coupé 2014–2021 (transaxle). |
| `TorqueChart` | `src/charts/TorqueChart.tsx` | Gráfica par / rpm con límite animable. |

**Coches:** cada modelo es un `CarProfile` en `src/parts/cars/` (medidas generales del fabricante, silueta, detalles, planta y transmisión). Para un coche nuevo se crea su perfil; los componentes no cambian.

Una pieza nueva se añade a `src/parts/` y se documenta en esta tabla. Se reutiliza entre episodios; no se redibuja.

## 8. Subtítulos

- Todo el vídeo va subtitulado, sincronizado con el SRT corregido.
- Aspekta Heavy de 68 px, en mayúsculas, alineados a la izquierda en x = 72, con 858 px de ancho máximo y un máximo de 2 líneas.
- Agrupación: bloques de hasta 22 caracteres; se corta tras `. , ? !`.
- Cada palabra entra cuando se pronuncia: sube 14 px y aparece en 0,12 s.
- Las palabras clave del episodio van en rojo (`EP.keywords`). Con guion, solo se colorea la parte clave ("MERCEDES-**AMG**").
- El SRT se corrige a mano antes de generar `cues.ts` (los errores de transcripción automática son frecuentes en nombres técnicos).

## 9. Gráficas

- Eje Y sin cifras salvo que haya datos de banco verificados del vehículo concreto. Eje X en rpm con marcas cada 2000.
- Leyenda arriba a la izquierda, con la muestra de línea real.
- Curvas con interpolación monótona: no se inventan picos.
- Colores: rojo para la petición o lo que se pierde, blanco grueso para lo que llega a la rueda, blanco discontinuo para el límite.
- Zona recortada: relleno rojo al 12 % más rayado rojo a 45° cada 12 px.
- Nota obligatoria si no hay datos: "Gráfica ilustrativa · sin datos de banco".

## 10. Movimiento

| Parámetro | Valor |
|---|---|
| Entrada de texto | 10 fotogramas, `cubic-bezier(0.16, 1, 0.3, 1)` |
| Salida de texto | 6 fotogramas, `cubic-bezier(0.7, 0, 0.84, 0)` |
| Trazado de líneas | 14–28 fotogramas, `cubic-bezier(0.65, 0, 0.35, 1)` |
| Cámara | deriva continua del 2–4 % por segundo; los movimientos grandes con `cubic-bezier(0.33, 0, 0.67, 1)` |
| Barrido entre escenas | 6 fotogramas con desenfoque de movimiento direccional |
| Anticipación del corte | el corte entra 2 fotogramas antes de la palabra que lo motiva |
| Duración de plano | 1,2–1,8 s de media (unos 28 planos en 38 s) |

**Reglas**
- Cada escena se monta así: las líneas se trazan, luego aparecen las etiquetas, luego entran los datos. Nunca todo a la vez.
- Los cortes caen en el inicio de una palabra del SRT. Los acentos visuales (el rojo, un candado) caen en la palabra clave.
- Recursos de cámara permitidos: acercamiento, barrido lateral, parallax entre capas (dibujo frente a texto), rotación lenta de la pieza 3D y despiece animado.
- Prohibido: rebotes elásticos, giros 3D del texto, destellos de color y transiciones de plantilla.

## 11. Sonido (generado por código)

Todo el diseño sonoro se sintetiza con código, sin bibliotecas de sonidos: `scripts/sfx/synth.py` (numpy + scipy) contiene cada efecto y `scripts/sfx/mix.py` mezcla la voz con los efectos que lista el JSON del episodio (`src/episodes/epNN-tema/sonido.json`: instante, efecto, ganancia en dB y parámetros).

| Efecto | Síntesis | Uso |
|---|---|---|
| Pulsos V8 | Tren de pulsos con encendido irregular de cigüeñal cruzado y armónicos filtrados | Arranque y acelerones |
| Corte del limitador | Pulsos V8 con cortes de encendido rítmicos | Palabra "limitada", sello LIMITADO |
| Silbido de turbo | Seno ascendente y ruido filtrado en banda | Stage 1 / 2 |
| Barrido | Ruido rosa con filtro paso banda en barrido y envolvente | Transiciones |
| Clic de relé / conector | Transitorio corto y resonancia metálica | Etiquetas, conector |
| Pitido de datos | Secuencia de senos cortos | Lectura y recalibración |
| Candado | Golpe grave y resonancia metálica | Bloqueo y desbloqueo del CPC |
| Impacto grave | Seno de 45 Hz con caída rápida | Titulares |
| Zumbido eléctrico | 50 Hz y armónicos a bajo nivel | Fondo de las escenas de electrónica |

**Mezcla:** máster a −14 LUFS integrados y −1 dBTP (loudnorm de dos pasadas). El bus de efectos baja 4 dB mientras suena la voz (ducking por envolvente) y queda unos 2–3 LU por debajo de la voz. Cada cambio de escena lleva un barrido 0,1 s antes del corte; cada titular, un impacto grave.

## 12. Rigor técnico

- La imagen de referencia es estética, no una fuente de datos. No se copian sus cifras, diagramas ni textos.
- La referencia tiene errores de IA que no se reproducen: "DEIVETRAIN", una escala de velocímetro irregular y el CPC definido de dos formas distintas.
- CPC = **Central Powertrain Controller**.
- Toda afirmación técnica en pantalla sale del guion verificado o de documentación del fabricante. Si no, se omite.

## 13. Checklist por escena

- [ ] Dentro de `Frame`, con `Signature` y la figura correcta.
- [ ] Texto crítico dentro de la zona segura y fuera del carril derecho.
- [ ] Solo estilos de la escala tipográfica.
- [ ] Rojo solo con significado.
- [ ] Nota de esquema o gráfica ilustrativa si procede.
- [ ] Subtítulos visibles y sin solaparse con el dibujo.
- [ ] Nada estático: hay deriva o trazado en todo el plano.
