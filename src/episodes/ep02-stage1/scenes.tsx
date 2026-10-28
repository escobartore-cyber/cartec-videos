// Escenas del EP.02 — Stage 1. Coche: VW Golf VII; motor: EA888 2.0 TSI.
import React from 'react';
import { CHART_BOX, REQUEST_STAGE2, TorqueChart } from '../../charts/TorqueChart';
import { Cam, FadeUp, TitleReveal } from '../../components/Anim';
import { Logo } from '../../components/Logo';
import { T as Txt, typeCss } from '../../components/Type';
import type { Camera } from '../../draw/line3d';
import { projectPolyline } from '../../draw/line3d';
import { Line3D } from '../../draw/Line3D';
import { CalibrationMap } from '../../parts/CalibrationMap';
import { CarSide, GroundAndAxes, sideAxles } from '../../parts/cars/CarSide';
import { VW_GOLF_7 as CAR } from '../../parts/cars/vwGolf7';
import { controlUnit } from '../../parts/controlUnit';
import { Gauge } from '../../parts/Gauge';
import { INLINE4_ANCHORS, inline4Engine } from '../../parts/inline4Engine';
import { BAND, COLOR, SAFE, STROKE } from '../../system/tokens';
import { ease, mix, prog, shake, shot } from '../../system/motion';
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

const engineCam = (T: number, t0: number, scale = 7.6, cy = 900): Camera => ({ yaw: mix(-150, -118, prog(T, t0, 5, ease.lineal)), elev: 26, dist: 300, target: [0, 14, 0], scale, cx: 540, cy });
const ecuCam = (T: number, t0: number, cx = 540, cy = 860, scale = 15): Camera => ({ yaw: 28 + (T - t0) * 5, elev: 34, dist: 120, target: [0, 3, 0], scale, cx, cy });
const mapCam = (T: number, t0: number, cy = 960): Camera => ({ yaw: -32 + (T - t0) * 4, elev: 30, dist: 160, target: [0, 4, 0], scale: 15, cx: 540, cy });

const K = 200;
const GROUND = 1160;

/** S01 — Portada: el Golf se traza; en "ni una sola pieza" entra STAGE 1 y el contador a cero. */
export const S01: S = ({ T }) => {
  const s = shot(T, [W.sinCambiar]);
  const AX = sideAxles(CAR);
  const travel = T * 24;
  const carX = 120 + travel;
  const spin = (travel / (2 * Math.PI * AX.tireR * K)) * 360;
  const front: [number, number] = [carX + AX.front * K, GROUND - 200];
  const cam = s === 0 ? { scale: mix(1.7, 1.8, prog(T, 0, W.sinCambiar, ease.lineal)), origin: front, y: -300 } : { scale: mix(1, 1.03, prog(T, W.sinCambiar, 1.3, ease.lineal)), origin: [540, 960] as [number, number], y: 0 };
  return (
    <>
      <Cam scale={cam.scale} origin={cam.origin} y={cam.y}>
        <GroundAndAxes car={CAR} x={carX} y={GROUND} k={K} from={0} to={1080} draw={prog(T, 0, 0.8)} />
        <CarSide car={CAR} x={carX} y={GROUND} k={K} draw={prog(T, 0, 1.1)} spin={spin} />
      </Cam>
      {s === 1 ? (
        <>
          <TitleReveal T={T} start={W.sinCambiar} lines={['Stage 1']} s="portada" style={{ left: SAFE.left, top: BAND.titulo }} />
          <FadeUp T={T} start={W.niUna} style={{ left: SAFE.left, top: BAND.titulo + 200 }}>
            <Txt s="etiqueta" color={COLOR.gris}>
              Piezas cambiadas
            </Txt>
            <div style={{ ...typeCss('titulo'), color: COLOR.rojo }}>00</div>
          </FadeUp>
          <FadeUp T={T} start={W.sinCambiar + 0.2} style={{ left: 676, top: BAND.titulo + 216 }}>
            {['Volkswagen Golf VII', 'Motor EA888 · 2.0 TSI', 'Reprogramación'].map((t) => (
              <Txt key={t} s="micro" color={COLOR.gris}>
                {t}
              </Txt>
            ))}
          </FadeUp>
        </>
      ) : null}
      <Note>Volkswagen Golf VII · alzado lateral · esquema ilustrativo</Note>
    </>
  );
};

/** S02 — El motor EA888 se dibuja: "los motores modernos funcionan mediante una centralita". */
export const S02: S = ({ T }) => {
  const cam = engineCam(T, W.losMotores);
  const ecuIn = prog(T, W.centralita, 0.5);
  return (
    <>
      <TitleReveal T={T} start={W.losMotores} lines={['Motor', 'moderno']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Tag T={T} at={W.losMotores + 0.3} top={BAND.titulo + 230}>
        EA888 · 2.0 TSI · 4 cilindros turbo
      </Tag>
      <Cam scale={mix(1, 1.08, prog(T, W.losMotores, 2.6, ease.lineal))} origin={[540, 900]}>
        <Line3D parts={inline4Engine({ draw: prog(T, W.losMotores, 0.9) })} camera={cam} />
      </Cam>
      {ecuIn > 0 ? <Line3D parts={controlUnit({ variant: 'ecu', draw: ecuIn }).parts} camera={ecuCam(T, W.centralita, 860, 1130, 9)} /> : null}
      <Tag T={T} at={W.centralita + 0.2} top={1190} left={700} color={COLOR.blanco}>
        <span style={{ color: COLOR.rojo }}>01 </span>Centralita
      </Tag>
      <Note>Motor de 4 cilindros en línea · esquema ilustrativo</Note>
    </>
  );
};

/** S03 — La ECU y lo que controla: presión del turbo, inyección y encendido. */
export const S03: S = ({ T }) => {
  const cam = ecuCam(T, W.laEcu, 330, 900, 12);
  const unit = controlUnit({ variant: 'ecu', draw: prog(T, W.laEcu, 0.5) });
  const [pin] = projectPolyline([unit.anchors.conector], cam);
  const items: [number, string, string?][] = [
    [W.presion, 'Presión del turbo'],
    [W.inyeccion, 'Inyección'],
    [W.encendido, 'Encendido', 'Solo motores de gasolina'],
  ];
  return (
    <>
      <TitleReveal T={T} start={W.laEcu} lines={['ECU']} s="portada" colors={[COLOR.rojo]} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Tag T={T} at={W.controla} top={BAND.titulo + 200}>
        Unidad de control del motor
      </Tag>
      <Line3D parts={unit.parts} camera={cam} />
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        {items.map(([at], i) => {
          const y = 760 + i * 150;
          const p = prog(T, at, 0.3);
          return p > 0 ? <path key={i} d={`M${pin[0]} ${pin[1]}C${pin[0] + 120} ${pin[1]} 520 ${y} 590 ${y}`} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.detalle} strokeOpacity={0.6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} /> : null;
        })}
      </svg>
      {items.map(([at, label, note], i) => (
        <FadeUp key={label} T={T} start={at + 0.1} style={{ left: 610, top: 740 + i * 150 }}>
          <Txt s="dato">
            <span style={{ color: COLOR.rojo }}>{`0${i + 1}  `}</span>
            {label}
          </Txt>
          {note ? (
            <Txt s="micro" color={COLOR.gris}>
              {note}
            </Txt>
          ) : null}
        </FadeUp>
      ))}
      <Note>Centralita · esquema ilustrativo</Note>
    </>
  );
};

/** S04 — La calibración del fabricante: el mapa de serie; en "distintas condiciones" lo recorre un barrido. */
export const S04: S = ({ T }) => (
  <>
    <TitleReveal T={T} start={W.fabricante} lines={['Calibración', 'de fábrica']} style={{ left: SAFE.left, top: BAND.titulo }} />
    <Cam scale={mix(1, 1.1, prog(T, W.fabricante, 4.4, ease.lineal))} origin={[540, 980]}>
      <CalibrationMap camera={mapCam(T, W.fabricante, 1000)} level={0} draw={prog(T, W.calibracion - 0.3, 0.8)} sweep={T >= W.distintas ? prog(T, W.distintas, 0.9, ease.lineal) : undefined} />
    </Cam>
    <Tag T={T} at={W.comportarse} top={1180}>
      rpm × carga → respuesta del motor
    </Tag>
    <Note>Mapa de calibración · esquema ilustrativo · sin cifras</Note>
  </>
);

/** S05 — Stage 1: mismo mapa, otros valores. La meseta sube y el mapa se marca en rojo. */
export const S05: S = ({ T }) => {
  const s = shot(T, [W.modificar, W.optimizar]);
  const level = prog(T, W.determinados, 1.4, ease.camara);
  return (
    <>
      <TitleReveal T={T} start={W.stage1} lines={s < 2 ? ['Stage 1'] : ['+ Rendimiento']} s={s < 2 ? 'portada' : 'titulo'} key={s < 2 ? 'a' : 'b'} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Cam scale={s === 1 ? 1.18 : mix(1, 1.05, prog(T, W.stage1, 4, ease.lineal))} origin={[540, 980]}>
        <CalibrationMap camera={mapCam(T, W.stage1, 1000)} level={level} draw={1} sweep={T >= W.determinados && T < W.determinados + 1.4 ? prog(T, W.determinados, 1.4, ease.lineal) : undefined} />
      </Cam>
      <Tag T={T} at={W.modificar} top={1180} color={COLOR.blanco}>
        <span style={{ color: COLOR.rojo }}>→ </span>Parámetros modificados · mismo hardware
      </Tag>
      <Note>Mapa de calibración · esquema ilustrativo · sin cifras</Note>
    </>
  );
};

/** S06 — En un motor turbo: sube la presión de sobrealimentación y se adapta la gestión del par. */
export const S06: S = ({ T }) => {
  const s = shot(T, [W.gestionPar]);
  if (s === 1) {
    const box = { ...CHART_BOX, y0: 760, y1: 1150 };
    return (
      <>
        <TitleReveal T={T} start={W.gestionPar} lines={['Gestión', 'del par']} style={{ left: SAFE.left, top: BAND.titulo }} />
        <TorqueChart box={box} request={REQUEST_STAGE2} limit={1.2} limitLabel="" axes={prog(T, W.gestionPar, 0.3)} requestDraw={0} limitDraw={0} delivered={prog(T, W.gestionPar + 0.1, 0.5)} hatch={0} />
        <Note>Gráfica ilustrativa · sin datos de banco</Note>
      </>
    );
  }
  const value = mix(0.35, 0.78, prog(T, W.presion2, 0.9, ease.camara));
  const engine = inline4Engine({ draw: prog(T, W.porEjemplo, 0.6), turboStyle: T >= W.motorTurbo ? 'accent' : 'line' });
  const cam = engineCam(T, W.porEjemplo, 4.6, 660);
  const [turbo] = projectPolyline([INLINE4_ANCHORS.turbo], cam);
  return (
    <>
      <TitleReveal T={T} start={W.porEjemplo} lines={['Motor turbo']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Line3D parts={engine} camera={cam} />
      <Tag T={T} at={W.motorTurbo} top={turbo[1] - 70} left={Math.max(SAFE.left, turbo[0] - 60)} color={COLOR.blanco}>
        <span style={{ color: COLOR.rojo }}>01 </span>Turbo
      </Tag>
      {T >= W.podemos ? (
        <Cam scale={mix(0.92, 1, prog(T, W.podemos, 0.4, ease.entrada))} origin={[540, 1090]}>
          <Gauge cx={540} cy={1090} r={150} value={value} draw={prog(T, W.podemos, 0.5)} label="Presión de soplado" sublabel="Sobrealimentación" />
        </Cam>
      ) : null}
      <Note>Motor EA888 · turbo · esquema ilustrativo</Note>
    </>
  );
};

/** S07–S08 — Temperaturas y combustión: las agujas se acercan al rojo y, en "comprometer", lo tocan. */
const Margins: S = ({ T }) => {
  const hit = T >= W.comprometer;
  const rise = (t0: number, max: number) => mix(0.3, max, prog(T, t0, 1.2, ease.camara)) + (T >= W.aumentar ? mix(0, 0.9 - max, prog(T, W.aumentar, W.comprometer - W.aumentar, (x) => x * x)) : 0);
  const sx = shake(T, W.comprometer, 12);
  return (
    <>
      <TitleReveal T={T} start={W.peroTambien} lines={['Márgenes']} style={{ left: SAFE.left, top: BAND.titulo }} />
      {T >= W.fiabilidad ? <TitleReveal T={T} start={W.fiabilidad} lines={['Fiabilidad']} colors={[COLOR.rojo]} rule={false} style={{ left: SAFE.left, top: BAND.titulo + 120 }} /> : null}
      <Cam x={sx} scale={mix(1, 1.05, prog(T, W.peroTambien, 6, ease.lineal))} origin={[540, 960]}>
        {T >= W.temperaturas - 0.3 ? <Gauge cx={300} cy={900} r={170} value={rise(W.temperaturas, 0.62)} limit={0.82} draw={prog(T, W.temperaturas - 0.3, 0.5)} alert={hit ? 1 : 0} label="Temperaturas" /> : null}
        {T >= W.condiciones - 0.3 ? <Gauge cx={780} cy={900} r={170} value={rise(W.condiciones, 0.58)} limit={0.82} draw={prog(T, W.condiciones - 0.3, 0.5)} alert={hit ? 1 : 0} label="Combustión" /> : null}
      </Cam>
      <Tag T={T} at={W.sinTener} top={1170} color={COLOR.blanco}>
        <span style={{ color: COLOR.rojo }}>! </span>Más potencia sin control = menos margen
      </Tag>
      <Note>Indicadores ilustrativos · sin cifras</Note>
    </>
  );
};
export const S07 = Margins;
export const S08 = Margins;

/** S09 — Archivos propios: la ECU y su mapa reescribiéndose. */
export const S09: S = ({ T }) => {
  const cam = ecuCam(T, W.enCartec, 300, 760, 10);
  const unit = controlUnit({ variant: 'ecu', draw: prog(T, W.enCartec, 0.5), style: 'accent' });
  return (
    <>
      <TitleReveal T={T} start={W.enCartec} lines={['Archivo', 'propio']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Line3D parts={unit.parts} camera={cam} />
      <CalibrationMap camera={{ ...mapCam(T, W.enCartec, 1020), cx: 620, scale: 12 }} level={1} draw={prog(T, W.enCartec + 0.2, 1.2, ease.lineal)} sweep={prog(T, W.archivos, 0.9, ease.lineal)} />
      <Tag T={T} at={W.archivos} top={1190} color={COLOR.blanco}>
        <span style={{ color: COLOR.rojo }}>CAR-TEC </span>· reprogramación desarrollada en casa
      </Tag>
      <Note>Mapa de calibración · esquema ilustrativo</Note>
    </>
  );
};

/** S10 — Cada preparación según el vehículo: ficha del Golf. */
export const S10: S = ({ T }) => {
  const AX = sideAxles(CAR);
  const carX = 60 + (T - W.ajustamos) * 18;
  const spin = (((T - W.ajustamos) * 18) / (2 * Math.PI * AX.tireR * 190)) * 360;
  const rows: [number, string, string][] = [
    [W.cadaPreparacion, 'Vehículo', 'Golf VII'],
    [W.cadaPreparacion + 0.35, 'Motor', 'EA888 · 2.0 TSI'],
    [W.caracteristicas, 'Estado mecánico', 'Revisado'],
    [W.caracteristicas + 0.35, 'Calibración', 'A medida'],
  ];
  return (
    <>
      <TitleReveal T={T} start={W.ajustamos} lines={['A medida']} style={{ left: SAFE.left, top: BAND.titulo }} />
      {rows.map(([at, k, v], i) => (
        <FadeUp key={k} T={T} start={at} style={{ left: SAFE.left, top: 520 + i * 70, width: 936, display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${COLOR.grisOscuro}`, paddingBottom: 10 }}>
          <Txt s="etiqueta" color={COLOR.gris}>
            <span style={{ color: COLOR.rojo }}>{`0${i + 1}  `}</span>
            {k}
          </Txt>
          <Txt s="etiqueta">{v}</Txt>
        </FadeUp>
      ))}
      <GroundAndAxes car={CAR} x={carX} y={1170} k={190} from={0} to={1080} draw={1} />
      <CarSide car={CAR} x={carX} y={1170} k={190} draw={prog(T, W.ajustamos, 0.8)} spin={spin} />
      <Note>Volkswagen Golf VII · esquema ilustrativo</Note>
    </>
  );
};

/** S11 — Cierre de marca. */
export const S11: S = ({ T }) => {
  const t0 = W.finVoz;
  const tagline = prog(T, t0 + 0.8, 0.4, ease.entrada);
  return (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', transform: `scale(${mix(0.96, 1, prog(T, t0, 2, ease.camara))})` }}>
        <Logo height={330} tagline roof={prog(T, t0 + 0.05, 0.6)} letters={prog(T, t0 + 0.45, 0.35, ease.entrada)} taglineOpacity={tagline} />
      </div>
      <Txt s="micro" color={COLOR.gris} style={{ position: 'absolute', left: 0, right: 0, top: 1150, textAlign: 'center', opacity: tagline }}>
        EP.02 — Stage 1 · Golf VII
      </Txt>
    </>
  );
};
