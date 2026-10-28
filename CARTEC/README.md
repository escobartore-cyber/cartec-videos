# CARTEC · Temporada 01

Planificación y gestión de material de la serie. El sistema visual y el código de producción están en la raíz del repositorio (`CARTEC_DESIGN_SYSTEM.md`, `CLAUDE.md`, `src/`). Aquí está todo lo demás: qué se cuenta en cada episodio, qué material hace falta y en qué estado está.

## Por dónde empezar

| Archivo | Para qué |
|---|---|
| [`LISTA_MAESTRA.md`](LISTA_MAESTRA.md) | Todo el material que necesito de ti, por prioridad y con dónde va cada cosa |
| [`PLAN_TEMPORADA_01.md`](PLAN_TEMPORADA_01.md) | Los ocho episodios, su idea visual, la biblioteca de piezas, el sonido y el proceso |
| [`VALIDACION_TECNICA.md`](VALIDACION_TECNICA.md) | Lo que el responsable del taller tiene que confirmar antes de publicar |
| [`AUDITORIA.md`](AUDITORIA.md) | Qué existía, qué está aprobado y cómo encaja el brief con ello |

## Estructura

```
CARTEC/
  CARTEC_DESIGN_SYSTEM/   remite al sistema de diseño de la raíz
  SHARED_ASSETS/          referencias y datos que me envías, por categoría (cada carpeta tiene su README)
  EPISODES/EPxx_TEMA/
    SCRIPT.md             guion por líneas (L01, L02…)
    STORYBOARD.md         escenas ancladas a esas líneas (EP01: docs/episodios/01-cpc.md)
    ASSET_REQUEST.md      material que pide ese episodio
    ASSET_STATUS.md       estado de ese material
    SCENES/               escenas exportadas en MP4
    AUDIO/                pistas exportadas: voz, efectos y mezcla
    EXPORTS/              vídeo completo
  _sistema/
    recursos.mjs          registro único de material (fuente de verdad)
    generar.mjs           genera la lista maestra, ASSET_REQUEST, ASSET_STATUS y los README
```

La locución y el SRT de cada episodio no van aquí: van a `public/episodes/NN-tema/` (`voz.wav` o `voz.mp3` y `subtitulos.srt`), que es donde los lee Remotion. Así lo hace el EP01.

## Cómo se actualiza el estado del material

1. Cuando llega un archivo, se guarda en su carpeta con un nombre que empiece por su código (`SH-TUR-01_perfil.jpg`).
2. Cuando respondes una decisión o el responsable valida un punto, se anota en `_sistema/recursos.mjs` (`respuesta`, `verificado`).
3. Se regeneran los documentos:

```bash
node CARTEC/_sistema/generar.mjs
```

El script detecta qué archivos han llegado y recalcula los estados: Disponible, Pendiente, Reemplazable por ilustración conceptual o Requiere verificación. Los `.md` generados no se editan a mano.

## Un episodio nuevo, en el futuro

1. Carpeta `EPISODES/EPxx_TEMA/` y `SCRIPT.md` con el guion por líneas.
2. `STORYBOARD.md` con las convenciones de `PLAN_TEMPORADA_01.md`, reutilizando la biblioteca de piezas.
3. El material nuevo se añade a `_sistema/recursos.mjs`. Lo que ya existe solo se referencia: nunca se pide dos veces.
4. Puntos a validar en `VALIDACION_TECNICA.md`.
5. A partir de ahí, el flujo de `CLAUDE.md`: locución y SRT, aprobación del storyboard, tres fotogramas de prueba, animación, sonido y exportación.
