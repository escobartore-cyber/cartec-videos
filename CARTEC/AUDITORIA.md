# Auditoría inicial · 28-10-2026

Fase 1 del brief de temporada: qué existe, qué está aprobado y qué falta.

## Qué se ha revisado

| Dónde | Qué había |
|---|---|
| Contenedor de esta sesión | Nada: ni CPC.png ni proyecto. |
| Repositorio `escobartore-cyber/cartec-videos` | Al empezar, solo el README inicial. A las 12:00 aprox., la sesión del EP01 subió todo el sistema (commit `7eaebbc`). |
| Sesión «CAR-TEC video design system» | Está produciendo el EP01. Se ha leído su historial (solo lectura) para conocer sus decisiones. |
| Artifacts de claude.ai | «Banco de ideas Car-Tec»: confirma Car-Tec Automotive, @cartecautomotive, taller de preparación cerca de Barcelona. No contiene nada del sistema visual. |

## Sistema visual aprobado (ya en el repositorio)

| Pieza | Dónde |
|---|---|
| Sistema de diseño obligatorio | `CARTEC_DESIGN_SYSTEM.md` |
| Flujo de producción | `CLAUDE.md` |
| Tokens (color, tipografía, retícula, zona segura, bandas, movimiento) | `src/system/tokens.ts` |
| Referencia estética CPC.png | `docs/referencia/referencia-estetica.webp` |
| Logos oficiales y limpios | `brand-src/`, `public/brand/`, `src/brand/logoPaths.ts` |
| Tipografías Aspekta 300/700/900 y JetBrains Mono | `public/fonts/` |
| Componentes | `Frame`, `Signature`, `Logo`, `T`, `Subtitles`, `Callout` en `src/components/` |
| Motor de dibujo 3D en línea | `src/draw/` |
| Piezas | `controlUnit` (ECU/CPC/TCU), `CarSide` en `src/parts/`; `TorqueChart` en `src/charts/` |
| EP01 | Voz y SRT corregido en `public/episodes/01-cpc/`; storyboard en `docs/episodios/01-cpc.md`; escenas S01, S04 y S08 en `src/episodes/ep01-cpc/`; fotogramas de prueba en `renders/ep01/pruebas/`, pendientes de aprobación |

No se ha modificado ninguno de estos archivos.

## Decisiones aprobadas que esta planificación respeta

1. Todo es dibujo técnico de línea hecho con código. Sin fotos, sin renders genéricos, sin metraje.
2. Ningún lugar reconocible: ni taller, ni calle, ni personas.
3. Rojo `#FF0707` como único acento, y solo con significado.
4. Aspekta para titulares y subtítulos; JetBrains Mono para etiquetas y datos.
5. Todo el vídeo subtitulado, con palabras clave en rojo.
6. Efectos de sonido sintetizados con código.
7. Ninguna cifra sin verificar; lo ilustrativo se rotula como tal.
8. Español de España, en «tú».
9. Tres fotogramas de prueba aprobados antes de animar.

## Diferencias entre el brief de temporada y lo aprobado

| El brief pide | Lo aprobado en el EP01 | Cómo lo resuelvo |
|---|---|---|
| Fotos reales de coches y componentes, en blanco y negro | Sin fotos: dibujo técnico | Sigo lo aprobado. Las fotos solo se piden como **referencia para dibujar** las piezas con su forma real; no salen en pantalla. Pendiente de tu confirmación (SH-DEC-01). |
| Metraje real del taller | Ningún lugar reconocible | No lo pido. |
| Sonidos grabados o con licencia | Efectos sintetizados | Sintetizados. Dos grabaciones reales opcionales (escape A/B y una pasada en el banco). |
| Capturas de software de calibración | — | No se muestran: las tablas del EP08 son ilustraciones con nombres genéricos. Evita además exponer calibraciones propias o del fabricante. |
| Estructura `CARTEC/` con carpetas por episodio | `docs/episodios/`, `public/episodes/`, `renders/` | Creo `CARTEC/` como pide el brief para planificación, peticiones de material y entregas. La voz y el SRT siguen yendo a `public/episodes/NN-tema/` porque Remotion los lee de ahí. El storyboard del EP01 se queda en `docs/episodios/`. |
| `CARTEC_DESIGN_SYSTEM/` como carpeta | `CARTEC_DESIGN_SYSTEM.md` en la raíz | La carpeta solo remite al documento de la raíz, para no tener dos versiones. |

## Riesgos

- **Dos sesiones sobre el mismo repositorio.** La del EP01 trabaja en `main`. Esta planificación va en la rama `temporada-01-plan` y solo añade archivos dentro de `CARTEC/`, así que no puede chocar con su trabajo.
- **Dos sitios para los storyboards.** `CLAUDE.md` (paso 5) dice `docs/episodios/NN-tema.md`; el brief, `CARTEC/EPISODES/EPxx/STORYBOARD.md`. Hasta que decidas, EP01 se queda donde está y EP02–EP08 van en `CARTEC/`. Si te parece bien, se actualiza el paso 5 de `CLAUDE.md` para que apunte a `CARTEC/`.
- **Licencia de Remotion** para empresas de más de 3 personas (SH-DEC-04).
- **Errores de la referencia.** CPC.png tiene errores de imagen generada («DEIVETRAIN», velocímetro irregular, dos definiciones del CPC). Ya están documentados en el sistema de diseño y no se copian.
