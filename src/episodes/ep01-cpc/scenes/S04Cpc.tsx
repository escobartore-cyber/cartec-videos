import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { Callout, TagBelow } from '../../../components/Callout';
import { Label, T as Txt } from '../../../components/Type';
import type { Camera } from '../../../draw/line3d';
import { projectedBounds, projectPolyline } from '../../../draw/line3d';
import { Line3D } from '../../../draw/Line3D';
import { AMG_GT_C190 as CAR } from '../../../parts/cars/amgGtC190';
import { CarTop, topAnchors } from '../../../parts/cars/CarTop';
import { controlUnit } from '../../../parts/controlUnit';
import { BAND, COLOR, SAFE, STROKE } from '../../../system/tokens';
import { ease, mix, prog, shot } from '../../../system/motion';
import { W } from '../timeline';

/** Separa alturas de etiquetas para que nunca queden a menos de `min` px. */
const spread = (ys: number[], min: number) => ys.reduce<number[]>((acc, y) => [...acc, acc.length ? Math.max(y, acc[acc.length - 1] + min) : y], []);

/** Plano A: ficha del CPC con despiece y anatomía. */
const Ficha: React.FC<{ T: number }> = ({ T }) => {
  const explode = prog(T, W.encargada + 0.05, 0.9, ease.camara);
  const yaw = mix(8, 32, prog(T, W.encargada, 1.2, ease.camara)) + (T - W.encargada) * 2;
  const camera: Camera = { yaw, elev: 33, dist: 110, target: [2, 6.5, 0], scale: 20, cx: 575, cy: 890 };
  const { parts, anchors } = controlUnit({ variant: 'cpc', explode, draw: prog(T, W.encargada, 0.6) });
  const [tapa, placa, micro, conector] = projectPolyline([anchors.tapa, anchors.placa, anchors.micro, anchors.conector], camera);
  const b = projectedBounds(parts, camera);
  const items = [
    { from: tapa, label: 'Tapa' },
    { from: micro, label: 'Procesador' },
    { from: placa, label: 'Placa' },
  ];
  return (
    <>
      <TitleReveal T={T} start={W.encargada} lines={['CPC']} s="portada" size={200} color={COLOR.rojo} style={{ left: SAFE.left, top: BAND.titulo }} />
      <FadeUp T={T} start={W.encargada + 0.2} style={{ left: SAFE.left, top: BAND.titulo + 220 }}>
        <Txt s="etiqueta">Central Powertrain Controller</Txt>
        <Txt s="entradilla" color={COLOR.gris} style={{ marginTop: 6 }}>
          Centralita de la cadena cinemática
        </Txt>
      </FadeUp>
      <Line3D parts={parts} camera={camera} />
      {T >= W.encargada + 0.7 &&
        spread([tapa[1] - 20, micro[1], placa[1] + 20], 60).map((y, i) => (
          <Callout key={i} from={items[i].from} y={y} elbowX={b.x0 - 24} side="left" index={`0${i + 1}`} label={items[i].label} progress={prog(T, W.encargada + 0.7 + i * 0.12, 0.4, ease.lineal)} />
        ))}
      {T >= W.encargada + 0.9 ? <TagBelow from={conector} y={b.y1 + 14} index="04" label="Conector" progress={prog(T, W.encargada + 1.06, 0.4, ease.lineal)} /> : null}
      <FadeUp T={T} start={W.supervisar} style={{ left: SAFE.left, top: 1166, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Txt s="micro" color={COLOR.gris}>
          Supervisa
        </Txt>
        <Label index="→" color={COLOR.blanco}>
          Límites de par motor
        </Label>
        <Label index="→" color={COLOR.blanco}>
          Velocidad máxima · según modelo
        </Label>
      </FadeUp>
      <Txt s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
        Esquema ilustrativo · no a escala
      </Txt>
    </>
  );
};

const TOP = { cx: 760, cy: 905, k: 170 };

/** Plano B: planta del AMG GT con su cadena cinemática y el pulso de par recorriéndola. */
const Cadena: React.FC<{ T: number }> = ({ T }) => {
  const a = topAnchors(CAR, TOP.cx, TOP.cy, TOP.k);
  const partsP = prog(T, W.funciones + 0.15, 1.0, ease.lineal);
  const flow = T >= W.cadena ? ((T - W.cadena) / 0.75) % 1 : 0;
  const labels = [
    { from: a.motor, label: 'Motor V8 biturbo' },
    { from: a.tubo, label: 'Tubo de transmisión' },
    { from: a.caja, label: 'Caja · transaxle' },
  ];
  const cpcBox: [number, number] = [SAFE.left + 60, 1252];
  return (
    <>
      <TitleReveal T={T} start={W.funciones} lines={['Cadena cinemática']} s="subtituloEscena" style={{ left: SAFE.left, top: BAND.titulo }} />
      <FadeUp T={T} start={W.funciones + 0.2} style={{ left: SAFE.left, top: BAND.titulo + 96 }}>
        <Txt s="etiqueta" color={COLOR.gris}>
          {'AMG GT · motor delantero-central\ny cambio en el eje trasero'}
        </Txt>
      </FadeUp>
      <Cam scale={mix(1, 1.05, prog(T, W.funciones, 2, ease.lineal))} origin={[TOP.cx, TOP.cy]}>
        <CarTop car={CAR} cx={TOP.cx} cy={TOP.cy} k={TOP.k} draw={prog(T, W.funciones, 0.5)} parts={partsP} flow={flow} />
        {spread(labels.map((l) => l.from[1]), 70).map((y, i) => (
          <Callout key={i} from={labels[i].from} y={y} elbowX={TOP.cx - CAR.width * 0.52 * TOP.k} side="left" index={`0${i + 1}`} label={labels[i].label} progress={prog(T, W.funciones + 0.3 + i * 0.25, 0.4, ease.lineal)} />
        ))}
        {/* El CPC vigila la cadena: enlaces discontinuos rojos al motor y a la caja. */}
        <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, opacity: prog(T, W.cadena, 0.3) }}>
          <path
            d={`M${cpcBox[0] + 70} ${cpcBox[1]}C${cpcBox[0] + 300} ${cpcBox[1]} ${a.caja[0] - 120} ${a.caja[1] + 60} ${a.caja[0]} ${a.caja[1]}M${cpcBox[0] + 70} ${cpcBox[1] - 6}C${cpcBox[0] + 380} ${cpcBox[1] - 200} ${a.motor[0] - 200} ${a.motor[1] + 200} ${a.motor[0]} ${a.motor[1]}`}
            fill="none"
            stroke={COLOR.rojo}
            strokeWidth={STROKE.detalle + 0.5}
            strokeDasharray="8 7"
          />
        </svg>
      </Cam>
      <FadeUp T={T} start={W.cadena} style={{ left: cpcBox[0] - 60, top: cpcBox[1] - 26 }}>
        <div style={{ border: `3px solid ${COLOR.rojo}`, padding: '8px 14px 4px' }}>
          <Txt s="dato" color={COLOR.rojo}>
            CPC
          </Txt>
        </div>
      </FadeUp>
      <Txt s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
        Mercedes-AMG GT · planta · esquema ilustrativo
      </Txt>
    </>
  );
};

/** S04 — Ficha técnica del CPC y, en "funciones", la cadena cinemática del AMG GT. */
export const S04Cpc: React.FC<{ T: number }> = ({ T }) => (shot(T, [W.funciones]) === 0 ? <Ficha T={T} /> : <Cadena T={T} />);
