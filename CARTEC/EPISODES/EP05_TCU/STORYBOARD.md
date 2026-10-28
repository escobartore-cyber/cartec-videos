# STORYBOARD · EP05 · Cómo la caja de cambios limita el par

**Estado: borrador pendiente de aprobación.** Cuando llegue la locución con su SRT, ajusto cada escena a los tiempos reales de su línea (L01, L02…) y te lo paso para aprobar. No se produce nada hasta entonces.

- **Idea visual:** el cambio de marcha como ritmo. Cada frase entra con un cambio.
- **Lo que lo distingue:** un indicador de marcha (1 → 8) arriba a la derecha hace de contador de capítulos; los cortes caen en el golpe de cada cambio, con aceleraciones y frenadas bruscas. Es la continuación directa del EP01: dos centralitas que negocian el par.
- **Duración:** unos 36 s de locución más el cierre de marca.
- **Escenas y planos:** 9 escenas, unos 30 planos.
- **Fotogramas de prueba ★:** S01 portada, S03 ficha de la TCU, S05 gráfica de limitación de la caja.
- **Caja:** la de EP05-DEC-01. Si es una 9G-Tronic, se usa el motor V8 y el coche del EP01.
- **Sonido:** cambios de marcha (más suaves con convertidor, más secos con doble embrague), solenoides, bomba hidráulica, zumbido de engranajes y pitidos de datos.

## Escenas

### S01 ★ · Portada · L01
- **Locución:** «Puedes preparar un motor para entregar más par y encontrarte con que la transmisión también tiene límites electrónicos.»
- **Qué se ve:** titular TCU (estilo `portada`). Motor a la izquierda, caja a la derecha, unidos por el eje. Una flecha de par sube y choca contra el límite en la entrada de la caja (línea blanca discontinua, como en el EP01); lo que no pasa queda en rojo. Indicador de marcha: 1.
- **Movimiento:** acercamiento y frenada en seco en el choque.
- **Sonido:** golpe de cambio e impacto.
- **Representación:** animación explicativa simplificada.
- **Planos:** 3.

### S02 · Su propia centralita · L02
- **Qué se ve:** la caja en 3D de línea gira; la TCU se marca con contorno rojo en su sitio real: integrada en la mecatrónica o aparte, según la caja. Marcha 2.
- **Movimiento:** órbita y acercamiento a la TCU.
- **Sonido:** cambio y relé.
- **Representación:** diagrama verificado si llegan SH-TRN-01 y SH-ECU-03; si no, ilustración conceptual.
- **Planos:** 3.

### S03 ★ · Ficha de la TCU · L03
- **Locución:** «Esta centralita participa en la gestión de los cambios de marcha, las presiones de accionamiento y las estrategias de protección de la transmisión.»
- **Qué se ve:** ficha en tres módulos: 01 CAMBIOS DE MARCHA (diagrama en escalones), 02 PRESIONES (curva de presión esquemática), 03 PROTECCIÓN (límite). Marcha 3.
- **Movimiento:** tres acercamientos encadenados, cada uno cortado en un golpe de cambio.
- **Sonido:** tres cambios ascendentes.
- **Representación:** animación explicativa simplificada.
- **Planos:** 4.

### S04 · El esfuerzo · L04
- **Qué se ve:** interior de la caja en corte (trenes epicicloidales o embragues). El par es una banda que se ensancha al atravesar los engranajes; las líneas de los dientes vibran bajo carga. Marcha 4.
- **Movimiento:** acercamiento dentro de la caja; los engranajes aceleran.
- **Sonido:** zumbido de engranajes que sube con la carga.
- **Representación:** animación explicativa simplificada.
- **Planos:** 4.

### S05 ★ · El límite de la caja · L05
- **Qué se ve:** gráfica `TorqueChart`, la misma del S08 del EP01 para que la serie se reconozca: petición de par del motor preparado en rojo, límite de la TCU en blanco discontinuo, par que llega a la rueda en blanco grueso y la zona recortada con relleno y rayado rojo. Marcha 5.
- **Movimiento:** trazado de la curva y corte seco.
- **Sonido:** golpe de limitador.
- **Representación:** animación explicativa simplificada, sin cifras.
- **Planos:** 3.

### S06 · Adaptar la TCU · L06
- **Qué se ve:** ECU y TCU unidas por el diagrama de conexión del EP01; los mensajes viajan por la línea, la TCU recibe la malla de calibración nueva y el límite sube. Marcha 6.
- **Movimiento:** barrido entre las dos centralitas con parallax.
- **Sonido:** pitidos de datos y clic de conector.
- **Representación:** animación explicativa simplificada.
- **Planos:** 3.

### S07 · Capacidad mecánica · L07
- **Qué se ve:** el nuevo límite queda por debajo de una línea gris «CAPACIDAD MECÁNICA», sin cifras. El módulo PROTECCIÓN sigue activo. Marcha 7.
- **Movimiento:** alejamiento controlado y frenada.
- **Sonido:** tono grave estable.
- **Representación:** animación explicativa simplificada.
- **Planos:** 3.

### S08 · El vehículo completo · L08
- **Qué se ve:** el coche en planta con la cadena cinemática completa del EP01: motor, ECU, TCU, caja, ejes y ruedas, todo etiquetado. Marcha 8.
- **Movimiento:** alejamiento total y barrido.
- **Sonido:** último cambio y subida final.
- **Representación:** ilustración conceptual.
- **Planos:** 3.

### S09 · Cierre de marca
- **Planos:** 1.

## Piezas

- **Reutilizadas:** coche en planta, cadena cinemática, centralita base, diagrama de conexión, gráfica con límite y malla (EP01).
- **Nuevas para la biblioteca:** caja de cambios exterior y en corte, TCU o mecatrónica, engranajes, indicador de marcha, curva de presiones.
