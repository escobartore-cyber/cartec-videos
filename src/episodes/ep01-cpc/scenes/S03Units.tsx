import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { labelWidth } from '../../../components/Callout';
import { T as Txt, typeCss } from '../../../components/Type';
import type { Camera, V3 } from '../../../draw/line3d';
import { projectPolyline } from '../../../draw/line3d';
import { Line3D } from '../../../draw/Line3D';
import { controlUnit } from '../../../parts/controlUnit';
import { BAND, COLOR, SAFE, STROKE } from '../../../system/tokens';
import { ease, mix, prog, shot } from '../../../system/motion';
import { W } from '../timeline';

const POS: Record<'ecu' | 'tcu' | 'cpc', V3> = { ecu: [-17, 0, -9], tcu: [17, 0, -9], cpc: [0, 0, 14] };

/** S03 — ECU y TCU; en "adicional" entra una tercera centralita que en "CPC" se vuelve roja. */
export const S03Units: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.incorporan, W.llamadaCpc]);
  const yaw = mix(-14, 14, prog(T, W.estoSucede, W.encargada - W.estoSucede, ease.lineal));
  const camera: Camera = { yaw, elev: 38, dist: 190, target: [0, 2, 1], scale: 12.5, cx: 540, cy: 880 };
  const cpcIn = prog(T, W.centralita, 0.6, ease.entrada);
  const isCpc = T >= W.llamadaCpc;
  const units = [
    controlUnit({ variant: 'ecu', offset: POS.ecu, draw: prog(T, W.estoSucede, 0.7) }),
    controlUnit({ variant: 'tcu', offset: POS.tcu, draw: prog(T, W.estoSucede + 0.25, 0.7) }),
    controlUnit({ variant: 'cpc', offset: [POS.cpc[0] + (1 - cpcIn) * 30, 0, POS.cpc[2] + (1 - cpcIn) * 18], draw: prog(T, W.centralita, 0.7), style: isCpc ? 'accent' : 'line' }),
  ];
  const parts = (T >= W.centralita ? units : units.slice(0, 2)).flatMap((u) => u.parts);
  const [ecuTop, tcuTop, cpcTop] = projectPolyline(units.map((u) => u.anchors.tapa), camera);
  const [ecuC, tcuC, cpcC] = projectPolyline([POS.ecu, POS.tcu, POS.cpc].map(([x, , z]): V3 => [x, 1, z]), camera);
  // Bus de datos entre las tres centralitas (trazo discontinuo).
  const bus = prog(T, W.incorporan, 0.6);
  const tag = (pt: [number, number], text: string, start: number, red = false) => (
    <div
      style={{
        position: 'absolute',
        left: pt[0] - labelWidth(text) / 2,
        top: pt[1] - 92,
        ...typeCss('etiqueta'),
        color: red ? COLOR.rojo : COLOR.blanco,
        opacity: prog(T, start, 0.3, ease.entrada),
        whiteSpace: 'pre',
      }}
    >
      {text}
      <div style={{ width: 1, height: 40, background: red ? COLOR.rojo : COLOR.blanco, margin: '8px auto 0', opacity: 0.6 }} />
    </div>
  );
  const camScale = s === 2 ? 1.3 : mix(1, 1.05, prog(T, W.estoSucede, 3, ease.lineal));
  return (
    <>
      <TitleReveal T={T} start={W.estoSucede} lines={['Centralitas']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <FadeUp T={T} start={W.estoSucede + 0.3} style={{ left: SAFE.left, top: BAND.titulo + 150 }}>
        <Txt s="etiqueta" color={COLOR.gris}>
          Unidades de control del AMG
        </Txt>
      </FadeUp>
      <Cam scale={camScale} origin={s === 2 ? cpcC : [540, 900]}>
        <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
          <path
            d={`M${ecuC.join(' ')}L${tcuC.join(' ')}M${(ecuC[0] + tcuC[0]) / 2} ${(ecuC[1] + tcuC[1]) / 2}L${cpcC.join(' ')}`}
            stroke={isCpc ? COLOR.rojo : COLOR.blanco}
            strokeOpacity={0.6}
            strokeWidth={STROKE.arista}
            strokeDasharray="10 8"
            opacity={T >= W.centralita ? bus : 0}
          />
        </svg>
        <Line3D parts={parts} camera={camera} />
        {s < 2 ? tag(ecuTop, 'ECU · Motor', W.estoSucede + 0.4) : null}
        {s < 2 ? tag(tcuTop, 'TCU · Cambio', W.estoSucede + 0.6) : null}
        {T >= W.adicional ? tag(cpcTop, isCpc ? 'CPC' : '¿ ?', W.adicional, isCpc) : null}
      </Cam>
      {T >= W.incorporan ? (
        <FadeUp T={T} start={W.incorporan + 0.2} style={{ left: SAFE.left, top: 1190 }}>
          <Txt s="micro" color={COLOR.gris}>
            Bus de datos · comunicación entre unidades
          </Txt>
        </FadeUp>
      ) : null}
    </>
  );
};
