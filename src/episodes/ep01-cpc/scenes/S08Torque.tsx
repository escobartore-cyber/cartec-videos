import React from 'react';
import { CHART_BOX, monotone, REQUEST_STAGE2, TorqueChart } from '../../../charts/TorqueChart';
import { Frame } from '../../../components/Frame';
import { Signature } from '../../../components/Signature';
import { Subtitles } from '../../../components/Subtitles';
import { RedRule, T, typeCss } from '../../../components/Type';
import { BAND, COLOR, SAFE, STROKE } from '../../../system/tokens';
import { EP01 } from '../config';
import { CUES } from '../cues';

const LIMIT_STOCK = 0.74;
const BOX = { ...CHART_BOX, y0: 800, y1: 1170 };

const Legend: React.FC<{ kind: 'red' | 'dash' | 'thick'; children: React.ReactNode }> = ({ kind, children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18, ...typeCss('etiqueta'), color: COLOR.blanco }}>
    <svg width={56} height={12}>
      <path
        d="M2 6H54"
        stroke={kind === 'red' ? COLOR.rojo : COLOR.blanco}
        strokeWidth={kind === 'thick' ? STROKE.curva : kind === 'red' ? STROKE.curva - 1 : 2}
        strokeDasharray={kind === 'dash' ? '10 7' : undefined}
        strokeLinecap="round"
      />
    </svg>
    <span>{children}</span>
  </div>
);

/** S08 — Gráfica de limitación de par: la ECU pide más par del que el CPC deja pasar. */
export const S08Torque: React.FC<{ time: number; limit?: number }> = ({ time, limit = LIMIT_STOCK }) => {
  const f = monotone(REQUEST_STAGE2);
  const X = (rpm: number) => BOX.x0 + (rpm / BOX.rpmMax) * (BOX.x1 - BOX.x0);
  const Y = (v: number) => BOX.y1 - v * (BOX.y1 - BOX.y0);
  const tagRpm = 3800;
  const tagY = (Y(f(tagRpm)) + Y(limit)) / 2;
  return (
    <Frame>
      <Signature episode={EP01.code} figure={EP01.fig(8)} />

      <div style={{ position: 'absolute', left: SAFE.left, top: BAND.titulo }}>
        <RedRule />
        <T s="titulo" style={{ marginTop: 28 }}>
          {'Limitación\nde par'}
        </T>
      </div>

      <div style={{ position: 'absolute', left: SAFE.left, top: 598, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Legend kind="red">Petición ECU · Stage 2</Legend>
        <Legend kind="dash">Límite CPC · original</Legend>
        <Legend kind="thick">Par entregado</Legend>
      </div>

      <TorqueChart limit={limit} limitLabel="Límite CPC" box={BOX} />

      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <path d={`M${X(tagRpm)} ${tagY}L${X(tagRpm) + 70} ${tagY - 90}H${X(tagRpm) + 120}`} stroke={COLOR.rojo} strokeWidth={STROKE.detalle} fill="none" />
        <circle cx={X(tagRpm)} cy={tagY} r={5} fill={COLOR.negro} stroke={COLOR.rojo} strokeWidth={2} />
      </svg>
      <T s="dato" color={COLOR.rojo} style={{ position: 'absolute', left: X(tagRpm) + 132, top: tagY - 90 - 34, lineHeight: 1.05 }}>
        {'Limitado\npor CPC'}
      </T>

      <Subtitles cues={CUES} time={time} keywords={[...EP01.keywords]} />

      <T s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
        Gráfica ilustrativa · sin datos de banco
      </T>
    </Frame>
  );
};
