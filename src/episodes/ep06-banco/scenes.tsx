// Escenas del EP.06 — Banco de potencia. Coche: VW Golf VII sobre un banco de rodillos.
import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../components/Anim';
import { Logo } from '../../components/Logo';
import { T as Txt, typeCss } from '../../components/Type';
import { CarSide, sideAxles } from '../../parts/cars/CarSide';
import { VW_GOLF_7 as CAR } from '../../parts/cars/vwGolf7';
import { DYNO_BOX, DynoChart, DynoRig } from '../../parts/dyno';
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

const K = 200;
const G = 1120;
const AX = sideAxles(CAR);
const X0 = 110; // trasera del coche cuando está sobre los rodillos

/** Golf sobre el banco: `carX` px de la trasera; `spin` grados de rueda; `draw` del banco. */
const CarOnDyno: React.FC<{ carX: number; spin: number; draw?: number; carDraw?: number; fan?: boolean; color?: string }> = ({ carX, spin, draw = 1, carDraw = 1, fan = true, color }) => {
  return (
    <>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        <path d={`M0 ${G}H1080`} stroke={COLOR.blanco} strokeWidth={STROKE.arista} opacity={0.6} />
        <DynoRig y={G} wheels={[X0 + AX.rear * K, X0 + AX.front * K]} spin={(spin * AX.tireR) / 0.13} draw={draw} fanX={fan ? 1030 : undefined} />
      </svg>
      {carDraw > 0 ? <CarSide car={CAR} x={carX} y={G - 6} k={K} draw={carDraw} spin={spin} color={color} /> : null}
    </>
  );
};

/** S01 — «400 CV» anunciados no son siempre 400 al medir. */
export const S01: S = ({ T }) => {
  const s = shot(T, [W.noSignifica]);
  const ne = prog(T, W.exactamente, 0.3, ease.entrada);
  return (
    <>
      <FadeUp T={T} start={0} style={{ left: SAFE.left, top: BAND.titulo - 10 }}>
        <Txt s="etiqueta" color={COLOR.gris}>
          Potencia anunciada
        </Txt>
      </FadeUp>
      <div style={{ position: 'absolute', left: SAFE.left - 6, top: BAND.titulo + 40, ...typeCss('portada'), fontSize: 200, color: COLOR.blanco, transform: `scale(${mix(1.08, 1, prog(T, 0, 0.6, ease.entrada))})`, transformOrigin: 'left top', opacity: prog(T, 0, 0.25) }}>
        400 <span style={{ fontSize: 110 }}>CV</span>
      </div>
      {s === 1 ? (
        <>
          <div style={{ position: 'absolute', left: SAFE.left, top: 720, ...typeCss('portada'), fontSize: 200, color: COLOR.rojo, opacity: ne, transform: `translateY(${(1 - ne) * 30}px)` }}>≠</div>
          <FadeUp T={T} start={W.medirlo - 0.2} style={{ left: 300, top: 790 }}>
            <Txt s="titulo">Medido</Txt>
            <Txt s="etiqueta" color={COLOR.gris}>
              Al pasar por el banco
            </Txt>
          </FadeUp>
        </>
      ) : null}
      <Note>Cifra de ejemplo</Note>
    </>
  );
};

/** S02 — El banco de potencia se dibuja. */
export const S02: S = ({ T }) => (
  <>
    <TitleReveal T={T} start={W.paraComprobar} lines={['Banco de', 'potencia']} style={{ left: SAFE.left, top: BAND.titulo }} />
    <Tag T={T} at={W.banco} top={BAND.titulo + 250}>
      Banco de rodillos · CAR-TEC
    </Tag>
    <Cam scale={mix(1.15, 1.25, prog(T, W.paraComprobar, 2.5, ease.lineal))} origin={[540, G]}>
      <CarOnDyno carX={X0} spin={0} draw={prog(T, W.paraComprobar, 1.0)} carDraw={0} />
    </Cam>
    <Note>Banco de rodillos · esquema ilustrativo</Note>
  </>
);

/** S03 — El Golf entra en los rodillos y acelera de forma controlada. */
export const S03: S = ({ T }) => {
  const arrive = prog(T, W.colocamos, 1.0, ease.camara);
  const carX = mix(-600, X0, arrive);
  const run = Math.max(0, T - W.aceleracion);
  const spin = ((carX + 600) / (2 * Math.PI * AX.tireR * K)) * 360 + run * run * 900;
  return (
    <>
      <TitleReveal T={T} start={W.colocamos} lines={T < W.aceleracion ? ['Sobre los', 'rodillos'] : ['Aceleración', 'controlada']} key={T < W.aceleracion ? 'a' : 'b'} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Cam scale={T < W.aceleracion ? 1 : 1.06} origin={[540, G]}>
        <CarOnDyno carX={carX} spin={spin} />
      </Cam>
      <Note>Volkswagen Golf VII · banco de rodillos · esquema ilustrativo</Note>
    </>
  );
};

/** S04 — El banco mide y calcula: rodillo → sensor → equipo → potencia. */
export const S04: S = ({ T }) => {
  const steps: [number, string, string][] = [
    [W.bancoMide, 'Rodillos', 'Velocidad y aceleración'],
    [W.comportamiento, 'Sensores', 'Comportamiento del vehículo'],
    [W.calcula, 'Cálculo', 'Potencia y par'],
    [W.sistema, 'Método', 'Según el sistema del banco'],
  ];
  return (
    <>
      <TitleReveal T={T} start={W.bancoMide} lines={['Medición']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <path d={`M${SAFE.left + 18} 600V${600 + 3 * 150}`} stroke={COLOR.blanco} strokeWidth={STROKE.arista} strokeOpacity={0.5} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(T, W.bancoMide, W.sistema - W.bancoMide + 0.4, ease.lineal)} />
        {steps.map(([at], i) => (
          <circle key={i} cx={SAFE.left + 18} cy={600 + i * 150} r={10} fill={T >= at ? COLOR.rojo : COLOR.negro} stroke={COLOR.blanco} strokeWidth={STROKE.arista} opacity={prog(T, at - 0.1, 0.2)} />
        ))}
      </svg>
      {steps.map(([at, k, v], i) => (
        <FadeUp key={k} T={T} start={at} style={{ left: SAFE.left + 60, top: 578 + i * 150 }}>
          <Txt s="dato">
            <Idx n={`0${i + 1}`}>{k}</Idx>
          </Txt>
          <Txt s="micro" color={COLOR.gris}>
            {v}
          </Txt>
        </FadeUp>
      ))}
      <Note>Esquema de medición ilustrativo</Note>
    </>
  );
};

/** S05 — La gráfica de potencia y par se traza con el barrido de rpm. */
export const S05: S = ({ T }) => {
  const sweep = prog(T, W.grafica, W.laGrafica - W.grafica - 0.2, ease.lineal);
  return (
    <>
      <TitleReveal T={T} start={W.aPartir} lines={['Potencia', 'y par']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <DynoChart axes={prog(T, W.aPartir, 0.5)} runs={[{ gain: 0.6, draw: sweep }]} cursor={sweep} />
      <Tag T={T} at={W.revoluciones} top={1200} left={760}>
        En función de las rpm
      </Tag>
      <Note>Gráfica ilustrativa · sin datos de banco</Note>
    </>
  );
};

/** S06 — Cómo entrega la potencia y dónde empieza a caer. */
export const S06: S = ({ T }) => {
  const s = shot(T, [W.zona]);
  return (
    <>
      <TitleReveal T={T} start={W.laGrafica} lines={s === 0 ? ['Entrega'] : ['Dónde cae']} key={s} colors={[s === 0 ? COLOR.blanco : COLOR.rojo]} style={{ left: SAFE.left, top: BAND.titulo }} />
      <Cam scale={s === 0 ? mix(1, 1.05, prog(T, W.laGrafica, 2.5, ease.lineal)) : 1.22} origin={s === 0 ? [540, 900] : [860, 820]}>
        <DynoChart runs={[{ gain: 0.6, draw: 1 }]} dropZone={prog(T, W.caer - 0.2, 0.4)} />
      </Cam>
      <Note>Gráfica ilustrativa · sin datos de banco</Note>
    </>
  );
};

/** S07 — Lo que influye: temperatura, condiciones del ensayo y método. */
export const S07: S = ({ T }) => {
  const rows: [number, string][] = [
    [W.temperatura, 'Temperatura'],
    [W.condiciones, 'Condiciones del ensayo'],
    [W.metodo, 'Método de medición'],
  ];
  const box = { ...DYNO_BOX, y0: 980, y1: 1220 };
  return (
    <>
      <TitleReveal T={T} start={W.hayQue} lines={['Acta de', 'ensayo']} style={{ left: SAFE.left, top: BAND.titulo }} />
      {rows.map(([at, k], i) => (
        <FadeUp key={k} T={T} start={at} style={{ left: SAFE.left, top: 600 + i * 90, width: 936, display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${COLOR.grisOscuro}`, paddingBottom: 10 }}>
          <Txt s="etiqueta">
            <Idx n={`0${i + 1}`}>{k}</Idx>
          </Txt>
          <Txt s="etiqueta" color={COLOR.gris}>
            Influye
          </Txt>
        </FadeUp>
      ))}
      {T >= W.influyen ? <DynoChart box={box} axes={prog(T, W.influyen, 0.3)} runs={[{ gain: 0.6, draw: prog(T, W.influyen, 0.6) }, { gain: 0.35, draw: prog(T, W.influyen + 0.2, 0.6), color: COLOR.rojo, dashed: true }]} /> : null}
      <Note>Mismo coche, condiciones distintas · ilustrativo</Note>
    </>
  );
};

/** S08 — Antes y después en condiciones equivalentes. */
export const S08: S = ({ T }) => {
  const eq = prog(T, W.equivalentes, 0.3, ease.entrada);
  return (
    <>
      <TitleReveal T={T} start={W.porEso} lines={['Antes', 'y después']} style={{ left: SAFE.left, top: BAND.titulo }} />
      <DynoChart runs={[{ gain: 0, draw: prog(T, W.antesDespues - 0.3, 0.7), color: COLOR.gris, dashed: true }, { gain: 1, draw: prog(T, W.antesDespues + 0.4, 0.8) }]} />
      <div style={{ position: 'absolute', left: SAFE.left, top: 1200, display: 'flex', gap: 40, opacity: eq }}>
        {['Temperatura', 'Ensayo', 'Método'].map((k) => (
          <Txt key={k} s="etiqueta">
            <span style={{ color: COLOR.rojo }}>= </span>
            {k}
          </Txt>
        ))}
      </div>
      <Tag T={T} at={W.antesDespues} top={560} left={600}>
        ┄ Antes · ━ Después
      </Tag>
      <Note>Gráfica ilustrativa · sin datos de banco</Note>
    </>
  );
};

/** S09 — Qué ha cambiado realmente: la diferencia entre curvas. */
export const S09: S = ({ T }) => (
  <>
    <TitleReveal T={T} start={W.asi} lines={['Qué ha', 'cambiado']} colors={[COLOR.blanco, COLOR.rojo]} style={{ left: SAFE.left, top: BAND.titulo }} />
    <Cam scale={mix(1, 1.15, prog(T, W.asi, 2, ease.camara))} origin={[520, 760]}>
      <DynoChart runs={[{ gain: 0, draw: 1, color: COLOR.gris, dashed: true }, { gain: 1, draw: 1 }]} />
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <path d="M520 795V705" stroke={COLOR.rojo} strokeWidth={4} opacity={prog(T, W.cambiado, 0.3)} markerEnd="" />
        <path d="M506 718L520 700L534 718" fill="none" stroke={COLOR.rojo} strokeWidth={4} opacity={prog(T, W.cambiado, 0.3)} />
      </svg>
    </Cam>
    <Note>Gráfica ilustrativa · sin datos de banco</Note>
  </>
);

/** S10 — Llamada: el Golf en el banco y dónde estamos. */
export const S10: S = ({ T }) => {
  const spin = (T - W.siQuieres) * 400;
  return (
    <>
      <TitleReveal T={T} start={W.siQuieres} lines={T < W.contactanos ? ['Tu coche', 'al banco'] : ['Pide cita']} key={T < W.contactanos ? 'a' : 'b'} colors={[COLOR.blanco, COLOR.rojo]} style={{ left: SAFE.left, top: BAND.titulo }} />
      <FadeUp T={T} start={W.gava} style={{ left: SAFE.left, top: BAND.titulo + 250 }}>
        <Txt s="dato">CAR-TEC · Gavà</Txt>
        <Txt s="micro" color={COLOR.gris}>
          Carrer del Progrés, 39 bis · 08850 Gavà · Barcelona
        </Txt>
      </FadeUp>
      <Cam scale={0.9} origin={[540, G]}>
        <CarOnDyno carX={X0} spin={spin} />
      </Cam>
      <Note>Banco de rodillos CAR-TEC · esquema ilustrativo</Note>
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
        EP.06 — Banco de potencia · Gavà, Barcelona
      </Txt>
    </>
  );
};
