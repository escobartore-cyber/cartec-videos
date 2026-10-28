# STORYBOARD · EP06 · Cómo funciona un banco de potencia

**Estado: borrador pendiente de aprobación.** Cuando llegue la locución con su SRT, ajusto cada escena a los tiempos reales de su línea (L01, L02…) y te lo paso para aprobar. No se produce nada hasta entonces.

- **Idea visual:** el ensayo. Precisión de laboratorio frente al «me ha dicho que gana 50 caballos».
- **Lo que lo distingue:** es el episodio más quieto de la serie: planos fijos, como un instrumento de medida, interrumpidos por acercamientos rápidos. La gráfica se dibuja en tiempo real al ritmo del barrido de rpm, y el resultado se presenta como un acta de ensayo editorial.
- **Duración:** unos 35 s de locución más el cierre de marca.
- **Escenas y planos:** 9 escenas, unos 29 planos.
- **Fotogramas de prueba ★:** S01 portada, S04 esquema de medición, S05 gráfica en tiempo real.
- **Banco:** el de EP06-DEC-01, dibujado a partir de SH-DYN-01. Solo se dibuja la máquina, nunca el taller.
- **Sonido:** rodillos (silbido que sube con la velocidad), ventilador, carraca de las cinchas y barrido completo del motor. Si llega EP06-SND-01, la pasada real.

## Escenas

### S01 ★ · Portada · L01
- **Locución:** «Cuando alguien dice que su coche ha ganado cincuenta caballos, ¿cómo sabemos si es verdad?»
- **Qué se ve:** «+50 CV» entre comillas, al tamaño de acrónimo gigante que permite el sistema (como «CPC» en el EP01), con un «?» rojo que cae encima. Nota `micro`: «Cifra de ejemplo». Debajo, BANCO DE POTENCIA (estilo `subtituloEscena`).
- **Movimiento:** tipografía cinética: el número se escribe y el interrogante cae y frena en seco.
- **Sonido:** acelerón lejano e impacto.
- **Representación:** texto.
- **Planos:** 3.

### S02 · El banco · L02
- **Qué se ve:** el banco en 3D de línea: rodillos, bastidor y ventilador.
- **Movimiento:** revelado de líneas y órbita lenta.
- **Sonido:** zumbido eléctrico y arranque del ventilador.
- **Representación:** diagrama verificado si llega SH-DYN-01; si no, ilustración conceptual (y entonces no se dice «nuestro banco» en pantalla).
- **Planos:** 3.

### S03 · Sobre los rodillos · L03
- **Qué se ve:** el coche de la serie baja sobre los rodillos; las cinchas se tensan. Detalle del contacto entre rueda y rodillo.
- **Movimiento:** plano fijo y acercamiento al contacto.
- **Sonido:** carraca de cinchas y clic.
- **Representación:** ilustración conceptual.
- **Planos:** 3.

### S04 ★ · Cómo se mide · L04
- **Locución:** «El sistema registra el comportamiento del vehículo durante la aceleración y permite estimar la potencia y el par motor según el tipo de banco y su método de cálculo.»
- **Qué se ve:** esquema de medición: rodillo → sensor de velocidad → equipo de medida → cálculo. Relación `dato` «POTENCIA = PAR × VELOCIDAD ANGULAR». Etiquetas EN RUEDA y ESTIMADA EN MOTOR, solo las que use vuestro banco (EP06-DEC-01).
- **Movimiento:** travelling lateral siguiendo la señal; rodillos girando con desenfoque de movimiento.
- **Sonido:** rodillos subiendo de vueltas y motor en carga.
- **Representación:** animación explicativa simplificada; método verificado con EP06-DEC-01.
- **Planos:** 4.

### S05 ★ · La gráfica · L05
- **Qué se ve:** potencia y par frente a rpm, dibujados en tiempo real con un cursor sincronizado con el sonido. Con SH-DYN-02: cifras reales y rótulo «Datos reales · banco CAR-TEC · fecha · norma». Sin datos: «Gráfica ilustrativa · sin datos de banco» y sin cifras.
- **Movimiento:** trazado sincronizado con el barrido y acercamiento final al máximo.
- **Sonido:** barrido completo del motor.
- **Representación:** dato real o ilustración conceptual.
- **Planos:** 3.

### S06 · Lo que influye · L06
- **Qué se ve:** acta de ensayo (ficha editorial) con los campos TEMPERATURA, PRESIÓN, HUMEDAD, NORMA DE CORRECCIÓN y PROCEDIMIENTO, que se rellenan. Al lado, dos pasadas del mismo coche que no coinciden.
- **Movimiento:** barrido vertical por el acta.
- **Sonido:** clics de campo.
- **Representación:** dato real si SH-DYN-02 trae dos pasadas en condiciones distintas; si no, ilustración conceptual.
- **Planos:** 3.

### S07 · Condiciones equivalentes · L07
- **Qué se ve:** dos actas lado a lado; los campos que coinciden se marcan con «=» en rojo y las curvas se superponen.
- **Movimiento:** pantalla partida y alineación con frenada.
- **Sonido:** dos golpes que coinciden.
- **Representación:** igual que S06.
- **Planos:** 3.

### S08 · Cada vehículo · L08
- **Qué se ve:** pared de gráficas en la retícula de 6 columnas: varias curvas de vehículos distintos si hay datos; si no, una sola.
- **Movimiento:** alejamiento sobre la pared de gráficas.
- **Sonido:** subida final.
- **Representación:** dato real o ilustración conceptual.
- **Planos:** 3.

### S09 · Cierre de marca
- **Planos:** 1.

## Piezas

- **Reutilizadas:** coche (EP01), gráfica (EP01).
- **Nuevas para la biblioteca:** banco de potencia, rodillos y cinchas, acta de ensayo, gráfica de banco que lee un CSV real. Las dos últimas sirven para cualquier vídeo futuro de resultados.
