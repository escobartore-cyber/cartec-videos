# EP.01 — CPC

**Tema:** por qué algunos Mercedes-AMG siguen limitados tras una reprogramación y qué es el CPC.
**Coche de referencia:** Mercedes-AMG GT coupé, generación C190 (2014–2021), elegido por el cliente. Motor delantero-central V8 biturbo, cambio en el eje trasero (transaxle), propulsión trasera.
**Locución:** `public/episodes/01-cpc/voz.mp3`, 36,0 s, −17,9 LUFS integrados.
**Mezcla:** `public/episodes/01-cpc/mezcla.wav`: voz y 58 efectos sintetizados (`src/episodes/ep01-cpc/sonido.json`), −14 LUFS y −1 dBTP.
**Vídeo:** `renders/ep01/EP01_CPC.mp4`, 1080 × 1920, 30 fps, 38 s.
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

## Escenas y planos (tiempos en `src/episodes/ep01-cpc/timeline.ts`)

| # | Tiempo | Planos (corte en la palabra) | Qué se ve | Sonido |
|---|---|---|---|---|
| S01 | 0,00–2,08 | A · "un Mercedes-AMG" B | A: primer plano del AMG GT trazándose, rodando. B: plano general y titular MERCEDES-AMG | Arranque V8, impacto |
| S02 | 2,08–4,40 | A · "limitada" B · "electrónicamente" C | Esfera de potencia; la aguja choca con el tope rojo, sello LIMITADA y rótulo "límite electrónico" | Acelerón, limitador, impacto |
| S03 | 4,40–7,84 | A · "incorporan" B · "llamada CPC" C | ECU y TCU en 3D; entra una tercera unidad que en "CPC" pasa a rojo; bus de datos | Clics, pitidos, zumbido |
| S04 | 7,84–11,24 | A · "funciones" B | A: ficha del CPC con despiece y llamadas. B: planta del AMG GT con motor, tubo y transaxle; pulso de par rojo y el CPC enlazado | Despiece, ticks, rumor del motor |
| S05 | 11,24–14,24 | A · "según" B | 01 límite de par motor / 02 velocidad máxima (según modelo), con agujas clavadas en el tope | Servos de aguja |
| S06 | 14,24–18,96 | A · "2" B · "aumentar" C | A: V8 biturbo y STAGE 1. B: STAGE 2, ECU y mapa de motor reescribiéndose. C: + RENDIMIENTO, turbos en rojo | Impactos, pitidos, turbo, acelerón |
| S07 | 18,96–21,40 | A · "manteniendo" B | CPC en rojo; se cierra el candado en "límites": estado bloqueado | Golpe del candado |
| S08 | 21,40–25,64 | A · "entregar" B · "restringirlo" C | Gráfica: petición de la ECU, límite del CPC, par entregado y zona recortada | Barrido ascendente, limitador |
| S09 | 25,64–29,32 | A · "desbloquear" B · "recalibrar" C | Candado sobre el CPC que se abre; mapa de límites del CPC recalibrándose | Desbloqueo, pitidos |
| S10 | 29,32–32,12 | A · "a la nueva" B | El límite sube por encima de la petición; "sin recorte" | Barrido ascendente, confirmación |
| S11 | 32,12–35,92 | A · "cada vehículo" B | Barrido de diagnóstico sobre el AMG GT; lista ECU / CPC / TCU comprobados | Escáner, confirmaciones |
| S12 | 35,92–38,00 | — | Logo CAR-TEC: techo, letras y claim | Acelerón final, impacto |

## Decisiones de rigor

- Ninguna cifra técnica en pantalla: esferas sin números, gráfica sin valores de par ("Gráfica ilustrativa · sin datos de banco").
- El AMG GT se dibuja con sus medidas generales (largo 4546 mm, batalla 2630 mm) y su disposición transaxle. Es un esquema ilustrativo, sin logotipos.
- La ubicación física del CPC en el coche no se muestra (no está verificada): el CPC aparece como unidad esquemática enlazada a la cadena cinemática.
- Pendiente de confirmar con el cliente: que en el AMG GT C190 aplican el desbloqueo del CPC (el vídeo lo da a entender).
