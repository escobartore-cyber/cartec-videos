# EP.01 — CPC

**Tema:** por qué algunos Mercedes-AMG siguen limitados tras una reprogramación y qué es el CPC.
**Locución:** `public/episodes/01-cpc/voz.mp3`, 36,0 s, −17,9 LUFS integrados (se normaliza a −14 en el máster).
**Duración del vídeo:** unos 38 s (36 s de voz y 2 s de cierre).
**Estado:** fotogramas de prueba S01, S04 y S08 generados; pendientes de aprobación.
**Referencia estética:** `docs/referencia/referencia-estetica.webp` (solo estética, no datos).

## Correcciones del SRT

| SRT automático | Corregido |
|---|---|
| que podés | que puedes |
| un Mercedes AMG | un Mercedes-AMG |
| algunos MG | algunos AMG |
| realizamos un hashtag uno o / dos modificamos | realizamos un Stage 1 o / 2, modificamos |
| preparado para cargar más par | preparado para entregar más par |
| sus límites. La nueva … del motor en cartel. | sus límites a la nueva … del motor. En CAR-TEC |
| comprobamos que necesita | comprobamos qué necesita |
| "para que" + "la" (cue de 80 ms) | unidos: "para que la" |

## Storyboard

| # | Escena | Tiempo | Locución | Qué se ve | Planos | Sonido |
|---|---|---|---|---|---|---|
| S01 ★ | Portada | 0,0–2,1 | ¿Sabías que puedes reprogramar un Mercedes-AMG | Alzado lateral que se traza línea a línea; barrido lateral; entra MERCEDES-AMG | 2 | Arranque V8, impacto grave |
| S02 | Limitado | 2,1–4,4 | y seguir teniendo su potencia limitada electrónicamente? | Esfera de velocímetro, la aguja choca con el tope y aparece el sello LIMITADO en "limitada" (3,28 s) | 2 | Corte del limitador |
| S03 | Centralitas | 4,4–7,8 | Esto sucede porque algunos AMG incorporan una centralita adicional llamada CPC, | ECU, CPC y TCU en 3D; las líneas del CPC pasan a rojo en "CPC" (7,16 s) | 3 | Clics de relé, zumbido |
| S04 ★ | Ficha CPC | 7,8–11,2 | encargada de supervisar distintas funciones relacionadas con la cadena cinemática. | Despiece del CPC con llamadas y la cadena cinemática en planta | 3 | Barrido, pitidos de datos |
| S05 | Límites | 11,2–14,2 | Entre ellas, los límites de par motor y, según el modelo, la velocidad máxima. | Límite de par (Nm) y velocidad máxima con la nota "según modelo" | 2 | Clic, impacto |
| S06 | Stage 1 / 2 | 14,2–19,0 | Cuando realizamos un Stage 1 o 2, modificamos la gestión electrónica del motor para aumentar su rendimiento. | V8 biturbo en 3D, ECU conectada, de STAGE 1 a STAGE 2 | 3 | Silbido de turbo, acelerón |
| S07 | Límites originales | 19,0–21,4 | El CPC puede seguir manteniendo sus límites originales. | Un candado se cierra sobre el CPC | 2 | Golpe del candado |
| S08 ★ | Gráfica | 21,4–25,6 | Esto significa que, aunque el motor esté preparado para entregar más par, el sistema puede restringirlo. | Se traza la petición de la ECU, el CPC la recorta y aparece la zona roja | 3 | Barrido, zumbido grave |
| S09 | Desbloqueo | 25,6–29,3 | Por eso, en determinados AMG es necesario desbloquear y recalibrar el CPC. | Se abre el candado y el mapa de calibración se recalcula | 3 | Candado y pitidos de datos |
| S10 | Gráfica adaptada | 29,3–32,1 | De esta forma adaptamos sus límites a la nueva configuración del motor. | Sube el límite y desaparece la zona roja | 2 | Barrido ascendente |
| S11 | Cierre | 32,1–35,9 | En CAR-TEC comprobamos qué necesita cada vehículo para que la reprogramación funcione correctamente. | Coche en vista cenital con la cadena cinemática completa | 2 | Acelerón V8 |
| S12 | Logo | 35,9–38,0 | (sin voz) | Se traza el techo del logo, aparecen las letras y el claim | 1 | Impacto grave y cola del motor |

★ = fotogramas de prueba (`renders/ep01/pruebas/`).

## Piezas nuevas para la biblioteca

Ya hechas: `controlUnit` (ECU / CPC / TCU), `CarSide`, `TorqueChart`.
Pendientes: esfera de velocímetro, motor V8 biturbo, cadena cinemática en planta, coche en vista cenital, candado y mapa de calibración.
