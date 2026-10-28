# CAR-TEC · Producción de vídeos

Repositorio de la serie de vídeos verticales CAR-TEC sobre mecánica y electrónica avanzada (Reels, TikTok y Shorts). Todo es motion graphics de dibujo técnico hecho con código en Remotion. No se usan fotos ni imágenes generadas.

**Antes de tocar nada, lee `CARTEC_DESIGN_SYSTEM.md`.** Es obligatorio y no se reinterpreta: los valores visuales salen de `src/system/tokens.ts`.

## Cómo se trabaja con el usuario

- Se construye paso a paso: primero tres fotogramas de prueba, después la aprobación, después la animación. No se anima nada sin aprobar los fotogramas.
- Idioma: español de España. Guion y subtítulos en "tú" (nunca voseo).
- Ninguna cifra técnica sale en pantalla sin verificar. Ante la duda, gráfica o esquema "ilustrativo".

## Flujo de un episodio nuevo

Material que entrega el usuario: guion, locución (`.mp3` o `.wav`) y SRT palabra a palabra.

1. **Carpeta del episodio:** `public/episodes/NN-tema/` con `voz.mp3` y `subtitulos.srt`.
2. **Corregir el SRT a mano** comparándolo con el guion: la transcripción automática falla en términos técnicos ("hashtag uno" por "Stage 1", "MG" por "AMG", "en cartel" por "En CAR-TEC"…). Une los cues de menos de 0,1 s.
3. **Generar los cues:** `node scripts/srt-to-ts.mjs public/episodes/NN-tema/subtitulos.srt src/episodes/epNN-tema/cues.ts`
4. **Configurar el episodio:** `src/episodes/epNN-tema/config.ts` (código, palabras clave en rojo, duración, número de figuras).
5. **Storyboard** en `docs/episodios/NN-tema.md`: escenas, tiempos según el SRT, planos, piezas y efectos de sonido. Unas 12 escenas y unos 28 planos por cada 36 s de voz (1,2–1,8 s por plano).
6. **Piezas:** reutiliza `src/parts/`. Si falta una, créala allí con el motor 3D (`src/draw/`), documéntala en la tabla de componentes del sistema de diseño y deja que la usen los episodios siguientes.
7. **Tres fotogramas de prueba** (`<Still>` en `src/Root.tsx`): la portada, una explicación técnica y una gráfica. Renderízalos, revísalos y entrégalos al usuario.
8. **Animar** tras la aprobación: una composición por escena más la composición maestra con el audio. Cortes en las palabras del SRT.
9. **Sonido** sintetizado con código (`scripts/sfx/`) según la tabla del sistema de diseño. Mezcla a −14 LUFS.
10. **Render final** y revisión con la checklist del sistema de diseño.

## Comandos

```bash
npm install
export REMOTION_BROWSER=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell   # Chromium preinstalado en el contenedor de Claude Code
npx remotion still src/index.ts EP01-S04-CPC out/s04.png   # un fotograma
npx remotion studio                                          # vista previa interactiva
npx tsc --noEmit                                             # comprobación de tipos
NODE_PATH=$(npm root -g) node scripts/build-brand.mjs        # regenerar logos desde brand-src/
```

Si `REMOTION_BROWSER` no existe en el entorno, Remotion descarga su propio Chromium.

## Estructura

```
CARTEC_DESIGN_SYSTEM.md    sistema de diseño (obligatorio)
brand-src/                 logos originales del cliente (no tocar)
public/brand/              logos limpios generados
public/fonts/              Aspekta 300/700/900 y JetBrains Mono 400/500/700
public/episodes/NN-tema/   voz y SRT corregido de cada episodio
scripts/                   utilidades (logos, SRT → TS, efectos de sonido)
src/system/                tokens y fuentes
src/components/            Frame, Signature, Logo, T, Subtitles, Callout
src/draw/                  motor de dibujo 3D en línea
src/parts/                 biblioteca de piezas reutilizables
src/charts/                gráficas
src/episodes/epNN-tema/    escenas, cues y config de cada episodio
docs/episodios/            storyboard y notas de cada episodio
renders/                   fotogramas de prueba aprobados y vídeos finales
```

## Notas

- El logo oficial está en `brand-src/`. `scripts/build-brand.mjs` lo separa en techo, letras y claim (`src/brand/logoPaths.ts`) para animarlo. El rojo oficial es `#FF0707`.
- Remotion es gratuito para particulares y empresas de hasta 3 empleados. Por encima hace falta licencia de empresa.
