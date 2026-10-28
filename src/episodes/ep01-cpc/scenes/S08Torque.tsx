import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { CHART_BOX, monotone, REQUEST_STAGE2, TorqueChart } from '../../../charts/TorqueChart';
import { T as Txt, typeCss } from '../../../components/Type';
import { BAND, COLOR, SAFE, STROKE } from '../../../system/tokens';
import { ease, mix, prog, shot } from '../../../system/motion';
import { W } from '../timeline';

const LIMIT_STOCK = 0.74;
const LIMIT_ADAPTED = 0.99;
const BOX = { ...CHART_BOX, y0: 800, y1: 1170 };
const f = monotone(REQUEST_STAGE2);
const X = (rpm: number) => BOX.x0 + (rpm / BOX.rpmMax) * (BOX.x1 - BOX.x0);
const Y = (v: number) => BOX.y1 - v * (BOX.y1 - BOX.y0);

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

/** S08 — La ECU (Stage 2) pide más par del que el CPC deja pasar. */
export const S08Torque: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.entregar, W.restringirlo]);
  const tagRpm = 3800;
  const tagY = (Y(f(tagRpm)) + Y(LIMIT_STOCK)) / 2;
  // La leyenda se retira en el plano corto para dejar sitio al rótulo del recorte.
  const legendIn = (i: number) => ({ opacity: prog(T, W.estoSignifica + 0.3 + i * 0.12, 0.3, ease.entrada) * (1 - prog(T, W.restringirlo - 0.05, 0.15, ease.salida)) });
  const cam = s === 2 ? { scale: 1.2, origin: [X(tagRpm), BOX.y1] as [number, number] } : { scale: mix(1, 1.05, prog(T, W.estoSignifica, 3.4, ease.lineal)), origin: [540, 980] as [number, number] };
  return (
    <>
      <TitleReveal T={T} start={W.estoSignifica} lines={['Limitación', 'de par']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <div style={{ position: 'absolute', left: SAFE.left, top: 598, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={legendIn(0)}>
          <Legend kind="red">Petición ECU · Stage 2</Legend>
        </div>
        <div style={legendIn(1)}>
          <Legend kind="dash">Límite CPC · original</Legend>
        </div>
        <div style={legendIn(2)}>
          <Legend kind="thick">Par entregado</Legend>
        </div>
      </div>
      <Cam scale={cam.scale} origin={cam.origin}>
        <TorqueChart
          box={BOX}
          limit={LIMIT_STOCK}
          limitLabel="Límite CPC"
          axes={prog(T, W.estoSignifica, 0.5)}
          requestDraw={prog(T, W.motorEste, 1.1)}
          limitDraw={prog(T, W.entregar, 0.35)}
          delivered={prog(T, W.elSistema, 0.6)}
          hatch={prog(T, W.restringirlo, 0.35)}
        />
        <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, opacity: prog(T, W.restringirlo, 0.3) }}>
          <path d={`M${X(tagRpm)} ${tagY}L${X(tagRpm) + 70} ${tagY - 90}H${X(tagRpm) + 120}`} stroke={COLOR.rojo} strokeWidth={STROKE.detalle} fill="none" />
          <circle cx={X(tagRpm)} cy={tagY} r={5} fill={COLOR.negro} stroke={COLOR.rojo} strokeWidth={2} />
        </svg>
        <FadeUp T={T} start={W.restringirlo + 0.1} style={{ left: X(tagRpm) + 132, top: tagY - 90 - 34 }}>
          <Txt s="dato" color={COLOR.rojo} style={{ lineHeight: 1.05 }}>
            {'Limitado\npor CPC'}
          </Txt>
        </FadeUp>
      </Cam>
      <Txt s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
        Gráfica ilustrativa · sin datos de banco
      </Txt>
    </>
  );
};

/** S10 — Tras el desbloqueo: el límite del CPC sube por encima de la petición y desaparece el recorte. */
export const S10Adapted: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.nueva]);
  const lift = prog(T, W.adaptamos, 0.9, ease.camara);
  const limit = mix(LIMIT_STOCK, LIMIT_ADAPTED, lift);
  const labelRpm = 4300;
  return (
    <>
      <TitleReveal T={T} start={W.deEstaForma} lines={['Límite', 'adaptado']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <div style={{ position: 'absolute', left: SAFE.left, top: 598, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Legend kind="red">Petición ECU · Stage 2</Legend>
        <Legend kind="dash">{lift > 0.5 ? 'Límite CPC · adaptado' : 'Límite CPC · original'}</Legend>
        <Legend kind="thick">Par entregado</Legend>
      </div>
      <Cam scale={s === 1 ? mix(1.1, 1.14, prog(T, W.nueva, 1.2, ease.lineal)) : 1} origin={[X(labelRpm), BOX.y1]}>
        <TorqueChart box={BOX} limit={limit} limitLabel={lift > 0.5 ? 'Límite CPC · adaptado' : 'Límite CPC'} limitLabelSide={lift > 0.5 ? 'right' : 'left'} />
        <FadeUp T={T} start={W.nueva} style={{ left: X(2600), top: Y(f(labelRpm)) + 110 }}>
          <Txt s="dato">{'Sin recorte'}</Txt>
          <Txt s="micro" color={COLOR.gris}>
            Par entregado = petición
          </Txt>
        </FadeUp>
      </Cam>
      <Txt s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
        Gráfica ilustrativa · sin datos de banco
      </Txt>
    </>
  );
};
