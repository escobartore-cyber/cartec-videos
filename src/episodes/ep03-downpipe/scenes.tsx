// Escenas del EP.03 — Downpipe. Coche: VW Golf VII; motor: EA888 2.0 TSI.
import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../components/Anim';
import { TagBelow } from '../../components/Callout';
import { Logo } from '../../components/Logo';
import { T as Txt } from '../../components/Type';
import type { Camera } from '../../draw/line3d';
import { Line3D } from '../../draw/Line3D';
import { CarSide, GroundAndAxes } from '../../parts/cars/CarSide';
import { VW_GOLF_7 as CAR } from '../../parts/cars/vwGolf7';
import { controlUnit } from '../../parts/controlUnit';
import { Catalyst, Downpipe, downpipePath, ExhaustRoute, Flow, TurboSection, Tube } from '../../parts/exhaust';
import { Gauge } from '../../parts/Gauge';
import { inline4Engine } from '../../parts/inline4Engine';
import { BAND, COLOR, SAFE, STROKE } from '../../system/tokens';
import { ease, mix, prog, shot } from '../../system/motion';
import { W } from './timeline';

type S = React.FC<{ T: number }>;
const SVG: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
    {children}
  </svg>
);
const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Txt s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
    {children}
  </Txt>
);
const Tag: React.FC<{ T: number; at: number; top: number; left?: number; color?: string; children: React.ReactNode }> = ({ T, at, top, left = SAFE.left, color = COLOR.gris, children }) => (
  <FadeUp T={T} start={at} style={{ left, top }}>
    <Txt s="etiqueta" color={color}>
      {children}
    </Txt>
  </FadeUp>
);
const Idx: React.FC<{ n: string; children: React.ReactNode }> = ({ n, children }) => (
  <>
    <span style={{ color: COLOR.rojo }}>{n} </span>
    {children}
  </>
);

/** S01 — Portada: la pregunta y la downpipe trazándose. */
export const S01: S = ({ T }) => (
  <>
    <TitleReveal T={T} start={0} lines={['Downpipe']} s="portada" style={{ left: SAFE.left, top: BAND.titulo }} />
    <FadeUp T={T} start={W.downpipe} style={{ left: SAFE.left, top: BAND.titulo + 190 }}>
      <Txt s="etiqueta" color={COLOR.gris}>
        ¿Para qué sirve?
      </Txt>
    </FadeUp>
    <Cam scale={mix(1.12, 1.2, prog(T, 0, 1.3, ease.lineal))} origin={[520, 900]}>
      <SVG>
        <Downpipe x={250} y={690} s={1.05} variant="flujo" p={prog(T, 0.05, 1.0)} accent />
      </SVG>
    </Cam>
    <Note>Downpipe · esquema ilustrativo · no a escala</Note>
  </>
);

/** S02 — Una pieza del escape: el Golf y su escape bajo la carrocería; la downpipe en rojo. */
export const S02: S = ({ T }) => {
  const K = 205;
  const carX = 90;
  const G = 1150;
  const ex = (m: number) => carX + m * K;
  const pipe = `M${ex(3.55)} ${G - 150}V${G - 80}C${ex(3.55)} ${G - 50} ${ex(3.4)} ${G - 42} ${ex(3.25)} ${G - 42}H${ex(0.15)}`;
  const dp = `M${ex(3.55)} ${G - 150}V${G - 80}C${ex(3.55)} ${G - 50} ${ex(3.4)} ${G - 42} ${ex(3.25)} ${G - 42}H${ex(2.9)}`;
  return (
    <>
      <TitleReveal T={T} start={W.hayUna} lines={['Una pieza', 'del escape']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Cam scale={mix(1, 1.08, prog(T, W.hayUna, 3.4, ease.lineal))} origin={[ex(3.3), G - 80]}>
        <GroundAndAxes car={CAR} x={carX} y={G} k={K} from={0} to={1080} draw={1} />
        <CarSide car={CAR} x={carX} y={G} k={K} draw={1} spin={0} color={COLOR.gris} />
        <SVG>
          <Tube d={pipe} w={14} p={prog(T, W.escape, 0.8)} />
          <Tube d={dp} w={14} p={prog(T, W.rendimiento, 0.5)} accent />
          <Flow d={pipe} t={T} opacity={prog(T, W.motorTurbo, 0.4) * 0.8} gap={22} width={2} />
        </SVG>
      </Cam>
      <TagBelow from={[ex(3.4), G - 46]} y={G + 70} index="01" label="Downpipe" accent progress={prog(T, W.rendimiento, 0.5)} />
      <Tag T={T} at={W.motorTurbo} top={BAND.titulo + 230}>
        Motor turbo · EA888 · Golf VII
      </Tag>
      <Note>Volkswagen Golf VII · escape · esquema ilustrativo</Note>
    </>
  );
};

/** S03 — Ficha: se llama downpipe y está justo después de la turbina. */
export const S03: S = ({ T }) => {
  const x = 300;
  const y = 700;
  return (
    <>
      <TitleReveal T={T} start={W.seLlama} lines={['Downpipe']} s="portada" style={{ left: SAFE.left, top: BAND.titulo }} />
      <SVG>
        <circle cx={x} cy={y - 60} r={56} fill={COLOR.negro} stroke={COLOR.blanco} strokeWidth={STROKE.silueta} opacity={prog(T, W.seLlama, 0.3)} />
        <circle cx={x} cy={y - 60} r={24} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.detalle} opacity={prog(T, W.seLlama, 0.3)} />
        <Downpipe x={x} y={y} s={1} variant="serie" p={prog(T, W.seLlama + 0.1, 1.0)} accent={T >= W.justoDespues} />
      </SVG>
      <Tag T={T} at={W.situada} top={y - 80} left={x + 80} color={COLOR.blanco}>
        <Idx n="01">Turbina</Idx>
      </Tag>
      <TagBelow from={[x + 150, y + 260]} y={y + 360} index="02" label="Downpipe" accent progress={prog(T, W.justoDespues, 0.5)} />
      <TagBelow from={[x + 360, y + 300]} y={y + 440} index="03" label="Catalizador" progress={prog(T, W.justoDespues + 0.3, 0.5)} />
      <Note>Downpipe de serie con catalizador · esquema ilustrativo · no a escala</Note>
    </>
  );
};

/** S04 — Los gases mueven la turbina; el eje mueve el compresor que mete aire en el motor. */
export const S04: S = ({ T }) => {
  const s = shot(T, [W.hacenGirar, W.compresor]);
  const spin = Math.max(0, T - W.cuandoGases) ** 1.6 * 260;
  return (
    <>
      <TitleReveal T={T} start={W.cuandoGases} lines={['El turbo']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Cam scale={s === 0 ? 1 : 1.12} origin={s === 2 ? [740, 900] : s === 1 ? [340, 900] : [540, 900]}>
        <SVG>
          <TurboSection cx={540} cy={900} s={1} spin={spin} p={prog(T, W.cuandoGases, 0.7)} t={T} hot={prog(T, W.atraviesan, 0.4)} air={prog(T, W.introducir, 0.4)} focus={s === 1 ? 'turbina' : s === 2 ? 'compresor' : undefined} />
        </SVG>
      </Cam>
      <Tag T={T} at={W.turbina} top={BAND.titulo + 150} color={COLOR.blanco}>
        <Idx n="01">Turbina · gases de escape</Idx>
      </Tag>
      <Tag T={T} at={W.compresor} top={BAND.titulo + 190} color={COLOR.blanco}>
        <Idx n="02">Compresor · aire al motor</Idx>
      </Tag>
      <Note>Turbo · sección esquemática · sin wastegate</Note>
    </>
  );
};

/** S05 — Los gases salen por el escape; la downpipe es parte del recorrido. */
export const S05: S = ({ T }) => (
  <>
    <TitleReveal T={T} start={W.despues} lines={T < W.laDownpipe ? ['Recorrido'] : ['Parte del', 'recorrido']} key={T < W.laDownpipe ? 'a' : 'b'} style={{ left: SAFE.left, top: BAND.titulo }} />
    <Cam scale={mix(1, 1.06, prog(T, W.despues, 4, ease.lineal))} origin={[540, 900]}>
      <SVG>
        <ExhaustRoute x={60} y={720} p={prog(T, W.despues, 1.0)} t={T} flow={prog(T, W.abandonar, 0.4)} highlight={prog(T, W.laDownpipe, 0.5)} />
      </SVG>
    </Cam>
    <Tag T={T} at={W.despues + 0.4} top={1080} left={500}>
      Catalizador · silencioso · salida
    </Tag>
    <TagBelow from={[210, 980]} y={1090} index="01" label="Downpipe" accent progress={prog(T, W.laDownpipe, 0.5)} />
    <Note>Recorrido del escape · esquema ilustrativo</Note>
  </>
);

/** S06 — Diseño y capacidad de flujo: dos secciones, la estrecha frena los gases. */
export const S06: S = ({ T }) => {
  const cols: [number, 'serie' | 'flujo', string][] = [
    [120, 'serie', 'Sección menor'],
    [600, 'flujo', 'Sección mayor'],
  ];
  return (
    <>
      <TitleReveal T={T} start={W.diseno} lines={['Resistencia']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Tag T={T} at={W.capacidad} top={BAND.titulo + 140}>
        Diseño · capacidad de flujo
      </Tag>
      <SVG>
        {cols.map(([x, v], i) => {
          const r = v === 'serie' ? 60 : 92;
          const p = prog(T, W.diseno + i * 0.4, 0.6);
          const lines = 7;
          return (
            <g key={v} opacity={p}>
              <circle cx={x + 180} cy={860} r={r} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.silueta} />
              <path d={`M${x} 860H${x + 360}`} stroke={COLOR.blanco} strokeWidth={1} strokeDasharray="22 6 3 6" strokeOpacity={0.3} />
              {[...Array(lines).keys()].map((k) => {
                const off = (k - (lines - 1) / 2) * (v === 'serie' ? 15 : 24);
                return T >= W.resistencia ? <Flow key={k} d={`M${x + 180 + off} 1150V1000`} t={T} speed={v === 'serie' ? 90 : 220} gap={v === 'serie' ? 14 : 34} width={2} color={v === 'serie' ? COLOR.rojo : COLOR.blanco} /> : null;
              })}
              <rect x={x + 180 - r} y={990} width={r * 2} height={170} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.arista} />
            </g>
          );
        })}
      </SVG>
      {cols.map(([x, , label], i) => (
        <Tag key={label} T={T} at={W.diseno + 0.3 + i * 0.4} top={720} left={x + 60} color={i === 0 ? COLOR.rojo : COLOR.blanco}>
          {`0${i + 1} ${label}`}
        </Tag>
      ))}
      <Tag T={T} at={W.salida} top={1190} color={COLOR.blanco}>
        <Idx n="!">Más restricción a la salida de la turbina</Idx>
      </Tag>
      <Note>Secciones A-A · esquema ilustrativo · no a escala</Note>
    </>
  );
};

/** S07 — Menos restricción: serie frente a mayor flujo; baja la contrapresión. */
export const S07: S = ({ T }) => {
  const back = mix(0.78, 0.42, prog(T, W.reducir, 1.0, ease.camara));
  return (
    <>
      <TitleReveal T={T} start={W.determinadas} lines={['Menos', 'restricción']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <SVG>
        <Downpipe x={150} y={700} s={0.6} variant="serie" p={prog(T, W.determinadas, 0.6)} />
        <Downpipe x={600} y={700} s={0.6} variant="flujo" p={prog(T, W.determinadas + 0.3, 0.6)} accent={T >= W.reducir} />
        {T >= W.reducir ? <Flow d={downpipePath(600, 700, 0.6, 'flujo')} t={T} gap={26} width={3} /> : null}
      </SVG>
      <Tag T={T} at={W.determinadas + 0.2} top={630} left={110}>
        01 Serie
      </Tag>
      <Tag T={T} at={W.determinadas + 0.5} top={630} left={560} color={COLOR.blanco}>
        <Idx n="02">Mayor flujo</Idx>
      </Tag>
      {T >= W.mejorar - 0.4 ? <Gauge cx={540} cy={1100} r={130} value={back} draw={prog(T, W.mejorar - 0.4, 0.4)} label="Contrapresión" sublabel="Esquema" /> : null}
      <Note>Comparativa ilustrativa · sin cifras</Note>
    </>
  );
};

/** S08 — Lo que hay que tener en cuenta: emisiones, temperatura y calibración. */
export const S08: S = ({ T }) => {
  const cam: Camera = { yaw: 30 + (T - W.calibracion) * 6, elev: 34, dist: 120, target: [0, 3, 0], scale: 7, cx: 860, cy: 1060 };
  const rows: [number, string, string][] = [
    [W.emisiones, 'Emisiones', 'Catalizador y sondas lambda'],
    [W.temperatura, 'Temperatura', 'Gases y componentes'],
    [W.calibracion, 'Calibración electrónica', 'Ajuste de la ECU'],
  ];
  return (
    <>
      <TitleReveal T={T} start={W.peroTambien} lines={['A tener', 'en cuenta']} style={{ left: SAFE.left, top: BAND.titulo }} />
      {rows.map(([at, k, v], i) => (
        <FadeUp key={k} T={T} start={at} style={{ left: SAFE.left, top: 640 + i * 150, width: 700, borderBottom: `1px solid ${COLOR.grisOscuro}`, paddingBottom: 14 }}>
          <Txt s="dato">
            <Idx n={`0${i + 1}`}>{k}</Idx>
          </Txt>
          <Txt s="micro" color={COLOR.gris}>
            {v}
          </Txt>
        </FadeUp>
      ))}
      <SVG>
        <Catalyst x={880} y={690} l={110} h={64} p={prog(T, W.emisiones, 0.5)} />
      </SVG>
      {T >= W.calibracion ? <Line3D parts={controlUnit({ variant: 'ecu', draw: prog(T, W.calibracion, 0.5) }).parts} camera={cam} /> : null}
      <Note>Esquema ilustrativo</Note>
    </>
  );
};

/** S09 — Stage 2: motor, turbo, downpipe y ECU trabajando juntos. */
export const S09: S = ({ T }) => {
  const engineCam: Camera = { yaw: mix(-150, -128, prog(T, W.stage2, 4, ease.lineal)), elev: 24, dist: 300, target: [0, 14, 0], scale: 5.6, cx: 430, cy: 820 };
  const ecuCam: Camera = { yaw: 28, elev: 34, dist: 120, target: [0, 3, 0], scale: 7, cx: 860, cy: 640 };
  return (
    <>
      <TitleReveal T={T} start={W.stage2} lines={['Stage 2']} s="portada" style={{ left: SAFE.left, top: BAND.titulo }} />
      <Line3D parts={inline4Engine({ draw: prog(T, W.stage2, 0.7), turboStyle: 'accent' })} camera={engineCam} />
      <SVG>
        <Downpipe x={300} y={960} s={0.45} variant="flujo" p={prog(T, W.componentes, 0.6)} accent />
      </SVG>
      {T >= W.componentes ? <Line3D parts={controlUnit({ variant: 'ecu', draw: prog(T, W.componentes + 0.3, 0.5) }).parts} camera={ecuCam} /> : null}
      <Tag T={T} at={W.componentes} top={1190} color={COLOR.blanco}>
        <Idx n="→">Turbo · downpipe · calibración: un conjunto</Idx>
      </Tag>
      <Note>Motor EA888 · esquema ilustrativo</Note>
    </>
  );
};

/** S10 — Cierre de marca. */
export const S10: S = ({ T }) => {
  const t0 = W.finVoz;
  const tagline = prog(T, t0 + 0.8, 0.4, ease.entrada);
  return (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', transform: `scale(${mix(0.96, 1, prog(T, t0, 2, ease.camara))})` }}>
        <Logo height={330} tagline roof={prog(T, t0 + 0.05, 0.6)} letters={prog(T, t0 + 0.45, 0.35, ease.entrada)} taglineOpacity={tagline} />
      </div>
      <Txt s="micro" color={COLOR.gris} style={{ position: 'absolute', left: 0, right: 0, top: 1150, textAlign: 'center', opacity: tagline }}>
        EP.03 — Downpipe · Golf VII
      </Txt>
    </>
  );
};
