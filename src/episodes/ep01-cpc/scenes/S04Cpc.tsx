import React from 'react';
import { Callout, TagBelow } from '../../../components/Callout';
import { Frame } from '../../../components/Frame';
import { Signature } from '../../../components/Signature';
import { Subtitles } from '../../../components/Subtitles';
import { Label, RedRule, T } from '../../../components/Type';
import type { Camera } from '../../../draw/line3d';
import { projectedBounds, projectPolyline } from '../../../draw/line3d';
import { Line3D } from '../../../draw/Line3D';
import { controlUnit } from '../../../parts/controlUnit';
import { BAND, COLOR, SAFE } from '../../../system/tokens';
import { EP01 } from '../config';
import { CUES } from '../cues';

/** Separa alturas de etiquetas para que nunca queden a menos de `min` px. */
const spread = (ys: number[], min: number) => ys.reduce<number[]>((acc, y) => [...acc, acc.length ? Math.max(y, acc[acc.length - 1] + min) : y], []);

/** S04 — Ficha técnica del CPC: despiece, anatomía y funciones que supervisa. */
export const S04Cpc: React.FC<{ time: number; explode?: number; yaw?: number }> = ({ time, explode = 1, yaw = 32 }) => {
  const camera: Camera = { yaw, elev: 33, dist: 110, target: [2, 6.5, 0], scale: 20, cx: 575, cy: 890 };
  const { parts, anchors } = controlUnit({ variant: 'cpc', explode });
  const [tapa, placa, micro, conector] = projectPolyline([anchors.tapa, anchors.placa, anchors.micro, anchors.conector], camera);
  const b = projectedBounds(parts, camera);
  return (
    <Frame>
      <Signature episode={EP01.code} figure={EP01.fig(4)} />

      <div style={{ position: 'absolute', left: SAFE.left, top: BAND.titulo }}>
        <RedRule />
        <T s="portada" color={COLOR.rojo} style={{ marginTop: 24, fontSize: 200 }}>
          CPC
        </T>
        <T s="etiqueta" style={{ marginTop: 16, color: COLOR.blanco }}>
          Central Powertrain Controller
        </T>
        <T s="entradilla" color={COLOR.gris} style={{ marginTop: 6 }}>
          Centralita de la cadena cinemática
        </T>
      </div>

      <Line3D parts={parts} camera={camera} />

      {spread([tapa[1] - 20, micro[1], placa[1] + 20], 60).map((y, i) => {
        const items = [
          { from: tapa, label: 'Tapa' },
          { from: micro, label: 'Procesador' },
          { from: placa, label: 'Placa' },
        ];
        return <Callout key={i} from={items[i].from} y={y} elbowX={b.x0 - 24} side="left" index={`0${i + 1}`} label={items[i].label} />;
      })}
      <TagBelow from={conector} y={b.y1 + 14} index="04" label="Conector" />

      <div style={{ position: 'absolute', left: SAFE.left, top: 1166, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <T s="micro" color={COLOR.gris}>
          Supervisa
        </T>
        <Label index="→" color={COLOR.blanco}>
          Límites de par motor
        </Label>
        <Label index="→" color={COLOR.blanco}>
          Velocidad máxima · según modelo
        </Label>
      </div>

      <Subtitles cues={CUES} time={time} keywords={[...EP01.keywords]} />

      <T s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
        Esquema ilustrativo · no a escala
      </T>
    </Frame>
  );
};
