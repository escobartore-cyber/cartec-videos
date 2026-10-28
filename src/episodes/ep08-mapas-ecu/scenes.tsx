// Escenas del EP.08 — Mapas de la ECU. Coche: VW Golf VII; motor: EA888 2.0 TSI.
// Las tablas son ilustraciones con nombres genéricos: ninguna captura ni dato real.
import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../components/Anim';
import { Logo } from '../../components/Logo';
import { T as Txt } from '../../components/Type';
import type { Camera } from '../../draw/line3d';
import { projectPolyline } from '../../draw/line3d';
import { Line3D } from '../../draw/Line3D';
import { CalibrationMap } from '../../parts/CalibrationMap';
import { CarSide, GroundAndAxes, sideAxles } from '../../parts/cars/CarSide';
import { VW_GOLF_7 as CAR } from '../../parts/cars/vwGolf7';
import { controlUnit } from '../../parts/controlUnit';
import { inline4Engine } from '../../parts/inline4Engine';
import { BAND, COLOR, SAFE, STROKE } from '../../system/tokens';
import { ease, mix, prog, shot } from '../../system/motion';
import { W } from './timeline';

type S = React.FC<{ T: number }>;
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
const ecuCam = (T: number, t0: number, cx = 540, cy = 900, scale = 18): Camera => ({ yaw: 28 + (T - t0) * 5, elev: 34, dist: 120, target: [0, 3, 0], scale, cx, cy });
const mapCam = (T: number, t0: number, cy = 960, scale = 16): Camera => ({ yaw: -32 + (T - t0) * 5, elev: 30, dist: 160, target: [0, 4, 0], scale, cx: 540, cy });

/** Mini tabla rpm × carga con celdas en grises (sin valores). */
const MiniTable: React.FC<{ x: number; y: number; p: number; seed: number; accent?: boolean }> = ({ x, y, p, seed, accent }) => (
  <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
    {[...Array(24).keys()].map((i) => {
      const c = i % 6;
      const r = Math.floor(i / 6);
      const v = 0.15 + 0.7 * Math.abs(Math.sin(c * 0.7 + r * 1.1 + seed));
      return <rect key={i} x={x + c * 22} y={y + r * 22} width={20} height={20} fill={accent && v > 0.6 ? COLOR.rojo : COLOR.blanco} opacity={(accent && v > 0.6 ? 0.8 : v * 0.6) * (i / 24 < p ? 1 : 0)} />;
    })}
  </svg>
);

/** S01 — Portada: ¿qué modifica un preparador en una ECU? */
export const S01: S = ({ T }) => (
  <>
    <TitleReveal T={T} start={0} lines={['¿Qué se', 'modifica?']} colors={[COLOR.blanco, COLOR.rojo]} style={{ left: SAFE.left, top: BAND.titulo }} />
    <Line3D parts={controlUnit({ variant: 'ecu', draw: prog(T, 0.1, 1.0), style: T >= W.ecu ? 'accent' : 'line' }).parts} camera={ecuCam(T, 0, 560, 920, 20)} />
    <Tag T={T} at={W.ecu} top={1180} color={COLOR.blanco}>
      <Idx n="ECU">· unidad de control del motor</Idx>
    </Tag>
    <Note>Centralita · esquema ilustrativo</Note>
  </>
);

/** S02 — Reprogramar = cambiar las instrucciones con las que la centralita gestiona el motor. */
export const S02: S = ({ T }) => {
  const s = shot(T, [W.instrucciones]);
  if (s === 0) {
    const AX = sideAxles(CAR);
    const carX = 100 + (T - W.cuando) * 22;
    return (
      <>
        <TitleReveal T={T} start={W.cuando} lines={['Reprogramar']} style={{ left: SAFE.left, top: BAND.titulo }} />
        <GroundAndAxes car={CAR} x={carX} y={1120} k={200} from={0} to={1080} draw={1} />
        <CarSide car={CAR} x={carX} y={1120} k={200} draw={prog(T, W.cuando, 0.9)} spin={(((T - W.cuando) * 22) / (2 * Math.PI * AX.tireR * 200)) * 360} />
        <Note>Volkswagen Golf VII · esquema ilustrativo</Note>
      </>
    );
  }
  const eCam = ecuCam(T, W.instrucciones, 280, 760, 11);
  const mCam: Camera = { yaw: mix(-150, -130, prog(T, W.instrucciones, 2.5, ease.lineal)), elev: 26, dist: 300, target: [0, 14, 0], scale: 5, cx: 720, cy: 1000 };
  const unit = controlUnit({ variant: 'ecu', draw: prog(T, W.instrucciones, 0.4) });
  const [a] = projectPolyline([unit.anchors.conector], eCam);
  const [b] = projectPolyline([[20, 30, 0]], mCam);
  return (
    <>
      <TitleReveal T={T} start={W.instrucciones} lines={['Instrucciones']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Line3D parts={unit.parts} camera={eCam} />
      <Line3D parts={inline4Engine({ draw: prog(T, W.centralita, 0.6) })} camera={mCam} />
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <path d={`M${a[0]} ${a[1]}C${a[0] + 200} ${a[1]} ${b[0] - 100} ${b[1] - 200} ${b[0]} ${b[1]}`} fill="none" stroke={COLOR.rojo} strokeWidth={STROKE.arista} strokeDasharray="8 7" strokeDashoffset={-T * 40} opacity={prog(T, W.gestiona, 0.3)} />
      </svg>
      <Tag T={T} at={W.gestiona} top={1190} color={COLOR.blanco}>
        <Idx n="→">La centralita gestiona el motor</Idx>
      </Tag>
      <Note>Centralita y motor EA888 · esquema ilustrativo</Note>
    </>
  );
};

/** S03 — Dentro de la ECU: la placa y los mapas de calibración. */
export const S03: S = ({ T }) => {
  const cam = ecuCam(T, W.dentro, 540, 960, 18);
  const unit = controlUnit({ variant: 'ecu', explode: prog(T, W.dentro, 0.8, ease.camara), draw: 1 });
  return (
    <>
      <TitleReveal T={T} start={W.dentro} lines={['Dentro', 'de la ECU']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Line3D parts={unit.parts} camera={cam} />
      <Tag T={T} at={W.mapas} top={1180} color={COLOR.blanco}>
        <Idx n="01">Mapas</Idx>
      </Tag>
      <Tag T={T} at={W.calibracion} top={1220} color={COLOR.blanco}>
        <Idx n="02">Parámetros de calibración</Idx>
      </Tag>
      <Note>Centralita en despiece · esquema ilustrativo</Note>
    </>
  );
};

/** S04 — Índice de tablas: inyección, encendido, presión del turbo, límites de par. */
export const S04: S = ({ T }) => {
  const rows: [number, string][] = [
    [W.inyeccion, 'Inyección'],
    [W.encendido, 'Encendido'],
    [W.presion, 'Presión del turbo'],
    [W.limites, 'Límites de par'],
  ];
  return (
    <>
      <TitleReveal T={T} start={W.intervienen} lines={['Tablas']} style={{ left: SAFE.left, top: BAND.titulo }} />
      {rows.map(([at, k], i) => (
        <React.Fragment key={k}>
          <FadeUp T={T} start={at} style={{ left: SAFE.left, top: 560 + i * 150, width: 936, borderBottom: `1px solid ${COLOR.grisOscuro}`, paddingBottom: 14 }}>
            <Txt s="dato">
              <Idx n={`0${i + 1}`}>{k}</Idx>
            </Txt>
            <Txt s="micro" color={COLOR.gris}>
              rpm × carga
            </Txt>
          </FadeUp>
          <MiniTable x={790} y={548 + i * 150} p={prog(T, at, 0.5, ease.lineal)} seed={i * 1.7} />
        </React.Fragment>
      ))}
      <Note>Tablas ilustrativas · sin valores reales</Note>
    </>
  );
};

/** S05 — Los valores cambian según las condiciones: la tabla se levanta en 3D y la recorre un barrido. */
export const S05: S = ({ T }) => (
  <>
    <TitleReveal T={T} start={W.estosValores} lines={['Condiciones']} style={{ left: SAFE.left, top: BAND.titulo }} />
    <Cam scale={mix(1, 1.08, prog(T, W.estosValores, 2.7, ease.lineal))} origin={[540, 960]}>
      <CalibrationMap camera={mapCam(T, W.estosValores)} level={0.3} draw={prog(T, W.estosValores, 0.7)} sweep={prog(T, W.condiciones, 1.4, ease.lineal)} />
    </Cam>
    <Tag T={T} at={W.condiciones} top={1180}>
      Los valores dependen de cómo trabaja el motor
    </Tag>
    <Note>Mapa de calibración · esquema ilustrativo · sin cifras</Note>
  </>
);

/** S06 — Régimen, carga y sensores. */
export const S06: S = ({ T }) => {
  const sensors = ['Régimen', 'Presión de admisión', 'Temperatura de admisión', 'Sonda lambda', 'Picado'];
  return (
    <>
      <TitleReveal T={T} start={W.porEjemplo} lines={['Entradas']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <CalibrationMap camera={{ ...mapCam(T, W.porEjemplo, 860, 12), cx: 400 }} level={0.3} sweep={prog(T, W.regimen, 3.4, ease.lineal)} />
      <Tag T={T} at={W.regimen} top={560} color={COLOR.blanco}>
        <Idx n="X">Régimen · rpm</Idx>
      </Tag>
      <Tag T={T} at={W.carga} top={600} color={COLOR.blanco}>
        <Idx n="Y">Carga solicitada</Idx>
      </Tag>
      {sensors.map((k, i) => (
        <FadeUp key={k} T={T} start={W.informacion + i * 0.15} style={{ left: 560, top: 1000 + i * 46, whiteSpace: 'nowrap' }}>
          <Txt s="etiqueta">
            <span style={{ color: COLOR.rojo }}>● </span>
            {k}
          </Txt>
        </FadeUp>
      ))}
      <Note>Sensores habituales de un motor turbo de gasolina · ilustrativo</Note>
    </>
  );
};

/** S07 — Al reprogramar se ajustan parámetros: la meseta del mapa sube. */
export const S07: S = ({ T }) => (
  <>
    <TitleReveal T={T} start={W.desarrollamos} lines={['Ajuste']} style={{ left: SAFE.left, top: BAND.titulo }} />
    <Cam scale={mix(1, 1.12, prog(T, W.ajustamos, 2.5, ease.lineal))} origin={[540, 960]}>
      <CalibrationMap camera={mapCam(T, W.desarrollamos)} level={mix(0.3, 1, prog(T, W.ajustamos, 1.5, ease.camara))} sweep={T >= W.ajustamos && T < W.ajustamos + 1.5 ? prog(T, W.ajustamos, 1.5, ease.lineal) : undefined} />
    </Cam>
    <Tag T={T} at={W.comportamiento} top={1180} color={COLOR.blanco}>
      <Idx n="→">Cambia el comportamiento del motor</Idx>
    </Tag>
    <Note>Mapa de calibración · esquema ilustrativo · sin cifras</Note>
  </>
);

/** S08–S09 — Red de tablas relacionadas; un cambio en la presión del turbo se propaga. */
const NODES: { k: string; at: number; x: number; y: number }[] = [
  { k: 'Presión del turbo', at: W.presionTurbo, x: 290, y: 680 },
  { k: 'Combustible', at: W.combustible, x: 790, y: 760 },
  { k: 'Par', at: W.par, x: 330, y: 1060 },
  { k: 'Estrategias de control', at: W.estrategias, x: 760, y: 1120 },
];
const Network: S = ({ T }) => {
  const chain = T >= W.unCambio;
  const lit = (n: (typeof NODES)[number]) => chain && T >= n.at;
  const edges: [number, number][] = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 3], [0, 3]];
  return (
    <>
      <TitleReveal T={T} start={W.peroEsos} lines={chain ? ['Un cambio'] : ['Relacionados']} key={chain ? 'b' : 'a'} colors={[chain ? COLOR.rojo : COLOR.blanco]} style={{ left: SAFE.left, top: BAND.titulo }} />
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        {edges.map(([i, j]) => {
          const a = NODES[i];
          const b = NODES[j];
          const hot = lit(a) && lit(b);
          return <path key={`${i}${j}`} d={`M${a.x} ${a.y}L${b.x} ${b.y}`} stroke={hot ? COLOR.rojo : COLOR.blanco} strokeWidth={hot ? 3 : STROKE.detalle} strokeOpacity={hot ? 1 : 0.5} strokeDasharray={hot ? '10 8' : undefined} strokeDashoffset={-T * 60} pathLength={hot ? undefined : 1} opacity={prog(T, W.relacionados - 0.5, 0.6)} />;
        })}
        {NODES.map((n) => (
          <circle key={n.k} cx={n.x} cy={n.y} r={lit(n) ? 26 : 18} fill={COLOR.negro} stroke={lit(n) ? COLOR.rojo : COLOR.blanco} strokeWidth={STROKE.silueta} opacity={prog(T, W.peroEsos, 0.5)} />
        ))}
      </svg>
      {NODES.map((n) => (
        <FadeUp key={n.k} T={T} start={W.peroEsos + 0.2} style={{ left: Math.min(n.x - 60, 1008 - 300), top: n.y + 40 }}>
          <Txt s="etiqueta" color={lit(n) ? COLOR.rojo : COLOR.blanco}>
            {n.k}
          </Txt>
        </FadeUp>
      ))}
      <Note>Relaciones entre tablas · esquema ilustrativo</Note>
    </>
  );
};
export const S08 = Network;
export const S09 = Network;

/** S10 — Conocer el sistema completo: motor, centralita y mapa juntos. */
export const S10: S = ({ T }) => {
  const mCam: Camera = { yaw: mix(-150, -125, prog(T, W.porEso, 3, ease.lineal)), elev: 26, dist: 300, target: [0, 14, 0], scale: 5.4, cx: 380, cy: 800 };
  return (
    <>
      <TitleReveal T={T} start={W.porEso} lines={['Sistema', 'completo']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Line3D parts={inline4Engine({ draw: prog(T, W.porEso, 0.7) })} camera={mCam} />
      <Line3D parts={controlUnit({ variant: 'ecu', draw: prog(T, W.conocer - 0.3, 0.5) }).parts} camera={ecuCam(T, W.porEso, 820, 700, 9)} />
      <CalibrationMap camera={{ ...mapCam(T, W.porEso, 1080, 9), cx: 760 }} level={1} draw={prog(T, W.conocer, 0.6)} />
      <Note>Motor, centralita y calibración · esquema ilustrativo</Note>
    </>
  );
};

/** S11 — Archivos propios y comprobación del vehículo tras cada preparación. */
export const S11: S = ({ T }) => {
  const s = shot(T, [W.comprobamos]);
  if (s === 0)
    return (
      <>
        <TitleReveal T={T} start={W.enCartec} lines={['Archivo', 'propio']} style={{ left: SAFE.left, top: BAND.titulo }} />
        <Line3D parts={controlUnit({ variant: 'ecu', draw: prog(T, W.enCartec, 0.5), style: 'accent' }).parts} camera={ecuCam(T, W.enCartec, 540, 900, 18)} />
        <Tag T={T} at={W.archivos} top={1180} color={COLOR.blanco}>
          <Idx n="CAR-TEC">· calibraciones desarrolladas en casa</Idx>
        </Tag>
        <Note>Centralita · esquema ilustrativo</Note>
      </>
    );
  const AX = sideAxles(CAR);
  const carX = 90 + (T - W.comprobamos) * 30;
  return (
    <>
      <TitleReveal T={T} start={W.comprobamos} lines={['Comprobado']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Tag T={T} at={W.vehiculo} top={BAND.titulo + 140}>
        Después de cada preparación
      </Tag>
      <GroundAndAxes car={CAR} x={carX} y={1120} k={200} from={0} to={1080} draw={1} />
      <CarSide car={CAR} x={carX} y={1120} k={200} draw={prog(T, W.comprobamos, 0.8)} spin={(((T - W.comprobamos) * 30) / (2 * Math.PI * AX.tireR * 200)) * 360} />
      <Note>Volkswagen Golf VII · esquema ilustrativo</Note>
    </>
  );
};

/** S12 — Cierre de marca. */
export const S12: S = ({ T }) => {
  const t0 = W.finVoz;
  const tagline = prog(T, t0 + 0.8, 0.4, ease.entrada);
  return (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', transform: `scale(${mix(0.96, 1, prog(T, t0, 2, ease.camara))})` }}>
        <Logo height={330} tagline roof={prog(T, t0 + 0.05, 0.6)} letters={prog(T, t0 + 0.45, 0.35, ease.entrada)} taglineOpacity={tagline} />
      </div>
      <Txt s="micro" color={COLOR.gris} style={{ position: 'absolute', left: 0, right: 0, top: 1150, textAlign: 'center', opacity: tagline }}>
        EP.08 — Mapas de la ECU · Golf VII
      </Txt>
    </>
  );
};
