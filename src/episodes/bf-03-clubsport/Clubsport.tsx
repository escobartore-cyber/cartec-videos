// BF-03 — Black Friday · Golf R y GTI Clubsport. Capa de gráficos con transparencia
// para montar en Premiere encima del vídeo del cliente (IMG_5472, 27,17 s, 30 fps).
// Entre 7,17 y 20,70 s el vídeo original está en negro: la capa pone fondo, el EA888
// dibujado en línea y, al final del tramo, una ventana 16:9 (WINDOW) para clips horizontales.
import React from 'react';
import { AbsoluteFill, Audio, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FadeUp, TitleReveal } from '../../components/Anim';
import { T as Txt, typeCss } from '../../components/Type';
import type { Camera } from '../../draw/line3d';
import { projectPolyline } from '../../draw/line3d';
import { Line3D } from '../../draw/Line3D';
import { INLINE4_ANCHORS, inline4Engine } from '../../parts/inline4Engine';
import { ALPHA, COLOR, SAFE, STROKE } from '../../system/tokens';
import { ease, mix, prog, shake } from '../../system/motion';

export const CLUBSPORT_DURATION = 27.17;

/** Hueco para los clips horizontales (px a 1080 × 1920; ×2 en 4K). */
export const WINDOW = { x: 72, y: 560, w: 936, h: 527 };
export const BLACK = { from: 7.17, to: 20.7 };

// Instantes (s) del SRT del cliente.
const W = {
  golfR: 0.05,
  clubsport: 1.13,
  ganar: 2.53,
  setenta: 3.27,
  sinCambiar: 3.93,
  pieza: 5.07,
  teLoExplico: 5.4,
  mismoMotor: 6.63,
  ea888: 7.6,
  dosLitros: 9.07,
  volkswagen: 10.33,
  robustez: 11.87,
  margen: 12.5,
  potencia: 13.33,
  baseIdeal: 14.87,
  diaADia: 16.1,
  diario: 17.63,
  bestia: 18.87,
  acelerador: 19.67,
  bloques: 20.67,
  quinientos: 22.67,
  promociones: 23.7,
  blackFriday: 24.27,
  comenta: 25.07,
  contacto: 26.53,
};

const on = (T: number, a: number, b: number) => (T >= a && T < b ? prog(T, a, 0.12) * (1 - prog(T, b - 0.15, 0.15, ease.salida)) : 0);

const Label: React.FC<{ i?: string; children: React.ReactNode; color?: string }> = ({ i, children, color = COLOR.blanco }) => (
  <Txt s="etiqueta" color={color}>
    {i ? <span style={{ color: COLOR.rojo }}>{i}&nbsp;&nbsp;</span> : null}
    {children}
  </Txt>
);

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'absolute', left: SAFE.left, top: 1440 }}>
    <Txt s="micro" color={COLOR.grisOscuro}>
      {children}
    </Txt>
  </div>
);

const Marks: React.FC = () => {
  const m = 40;
  const l = 28;
  const d = `M${m} ${m + l}V${m}H${m + l}M${1080 - m - l} ${m}H${1080 - m}V${m + l}M${m} ${1920 - m - l}V${1920 - m}H${m + l}M${1080 - m - l} ${1920 - m}H${1080 - m}V${1920 - m - l}`;
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
      <path d={d} fill="none" stroke={COLOR.blanco} strokeWidth={2} opacity={0.6} />
    </svg>
  );
};

const Vignette: React.FC<{ T: number }> = ({ T }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      opacity: 1 - on(T, BLACK.from, BLACK.to),
      background: 'linear-gradient(to bottom, rgba(12,12,12,0.4) 0%, rgba(12,12,12,0) 20%, rgba(12,12,12,0) 46%, rgba(12,12,12,0.78) 70%, rgba(12,12,12,0.5) 100%)',
    }}
  />
);

/** Fondo negro con retícula; con `hole`, deja la ventana 16:9 transparente. */
const Board: React.FC<{ hole: number }> = ({ hole }) => {
  const { x, y, w, h } = WINDOW;
  const grid: string[] = [];
  const major: string[] = [];
  for (let g = 0; g <= 1920; g += 40) {
    if (g <= 1080) (g % 120 ? grid : major).push(`M${g} 0V1920`);
    (g % 120 ? grid : major).push(`M0 ${g}H1080`);
  }
  const l = 36;
  const c = `M${x - 14} ${y - 14 + l}V${y - 14}H${x - 14 + l}M${x + w + 14 - l} ${y - 14}H${x + w + 14}V${y - 14 + l}M${x - 14} ${y + h + 14 - l}V${y + h + 14}H${x - 14 + l}M${x + w + 14 - l} ${y + h + 14}H${x + w + 14}V${y + h + 14 - l}`;
  const outside = hole > 0 ? `M0 0H1080V1920H0Z M${x} ${y}V${y + h}H${x + w}V${y}Z` : 'M0 0H1080V1920H0Z';
  return (
    <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <clipPath id="outside">
          <path clipRule="evenodd" d={outside} />
        </clipPath>
      </defs>
      <g clipPath="url(#outside)">
        <rect width={1080} height={1920} fill={COLOR.negro} />
        <path d={grid.join('')} stroke={COLOR.blanco} strokeWidth={1} opacity={ALPHA.reticulaMenor} />
        <path d={major.join('')} stroke={COLOR.blanco} strokeWidth={1} opacity={ALPHA.reticulaMayor} />
      </g>
      {hole > 0 ? (
        <>
          <rect x={x} y={y} width={w} height={h} fill="none" stroke={COLOR.blanco} strokeWidth={STROKE.arista} opacity={0.7} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - hole} />
          <path d={c} fill="none" stroke={COLOR.rojo} strokeWidth={3} opacity={hole} />
        </>
      ) : null}
    </svg>
  );
};

/** 0–7,2 s — Golf R + GTI Clubsport, +70 CV sin piezas, mismo motor. */
const Intro: React.FC<{ T: number }> = ({ T }) => {
  const a = on(T, 0, W.teLoExplico);
  const b = on(T, W.teLoExplico, BLACK.from);
  return (
    <>
      {a ? (
        <div style={{ position: 'absolute', inset: 0, opacity: a, transform: `translateX(${shake(T, W.setenta + 0.14, 10)}px)` }}>
          <FadeUp T={T} start={W.golfR} style={{ left: SAFE.left, top: 1040 }}>
            <Label i="01">Golf R</Label>
          </FadeUp>
          <FadeUp T={T} start={W.clubsport} style={{ left: SAFE.left + 300, top: 1040 }}>
            <Label i="02">GTI Clubsport</Label>
          </FadeUp>
          {T >= W.setenta ? <TitleReveal T={T} start={W.setenta} lines={['+70', 'CV']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" size={150} style={{ left: SAFE.left, top: 1100 }} /> : null}
          <FadeUp T={T} start={W.sinCambiar} style={{ left: SAFE.left, top: 1420, display: 'flex', gap: 18, alignItems: 'baseline' }}>
            <Label>Piezas cambiadas</Label>
            <span style={{ ...typeCss('dato'), color: COLOR.rojo, opacity: prog(T, W.pieza, 0.2) }}>0</span>
          </FadeUp>
        </div>
      ) : null}
      {b ? (
        <div style={{ position: 'absolute', inset: 0, opacity: b }}>
          <FadeUp T={T} start={W.teLoExplico} style={{ left: SAFE.left, top: 1140 }}>
            <Label i="→">Te lo explico</Label>
          </FadeUp>
          {T >= W.mismoMotor - 0.4 ? <TitleReveal T={T} start={W.mismoMotor - 0.4} lines={['Mismo', 'motor']} colors={[COLOR.blanco, COLOR.rojo]} size={110} style={{ left: SAFE.left, top: 1190 }} /> : null}
        </div>
      ) : null}
    </>
  );
};

const engineCam = (T: number): Camera => ({ yaw: mix(-160, -112, prog(T, BLACK.from, 9, ease.lineal)), elev: 24, dist: 300, target: [0, 14, 0], scale: mix(9.6, 10.4, prog(T, BLACK.from, 9, ease.lineal)), cx: 540, cy: 830 });

/** 7,2–16,1 s — El EA888 dibujado en línea: qué es, robustez y margen. */
const Engine: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, BLACK.from, W.diaADia);
  if (!o) return null;
  const second = T >= W.robustez;
  const cam = engineCam(T);
  const [turbo] = projectPolyline([INLINE4_ANCHORS.turbo], cam);
  const parts = inline4Engine({ draw: prog(T, BLACK.from + 0.1, 1.1), turboStyle: T >= W.potencia ? 'accent' : 'line' });
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <Line3D parts={parts} camera={cam} />
      {second ? (
        <TitleReveal key="b" T={T} start={W.robustez} lines={['Robustez', '+ margen']} colors={[COLOR.blanco, COLOR.rojo]} size={96} style={{ left: SAFE.left, top: 236 }} />
      ) : (
        <TitleReveal key="a" T={T} start={BLACK.from + 0.15} lines={['EA888']} s="portada" size={150} style={{ left: SAFE.left, top: 236 }} />
      )}
      {!second ? (
        <>
          <FadeUp T={T} start={W.dosLitros} style={{ left: SAFE.left, top: 1230 }}>
            <Label i="01">2.0 TSI · turbo · 4 cilindros</Label>
          </FadeUp>
          <FadeUp T={T} start={W.volkswagen} style={{ left: SAFE.left, top: 1276 }}>
            <Label i="02" color={COLOR.gris}>
              Volkswagen · varias generaciones
            </Label>
          </FadeUp>
        </>
      ) : (
        <>
          <FadeUp T={T} start={W.potencia} style={{ left: Math.min(860, turbo[0] + 90), top: turbo[1] - 16 }}>
            <Label i="03">Turbo</Label>
          </FadeUp>
          <Margin T={T} />
          <FadeUp T={T} start={W.baseIdeal} style={{ left: SAFE.left, top: 1380 }}>
            <Label i="→">Base ideal para preparar</Label>
          </FadeUp>
        </>
      )}
      <Note>Motor EA888 · esquema ilustrativo · no a escala</Note>
    </div>
  );
};

/** Barra de margen ilustrativa: de serie frente a lo que admite el motor, sin cifras. */
const Margin: React.FC<{ T: number }> = ({ T }) => {
  const top = 1220;
  const full = 936;
  const serie = full * 0.56 * prog(T, W.margen, 0.5, ease.camara);
  const extra = full * 0.44 * prog(T, W.potencia, 0.8, ease.camara);
  return (
    <div style={{ position: 'absolute', left: SAFE.left, top, opacity: prog(T, W.margen, 0.2) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: full, marginBottom: 14 }}>
        <Label color={COLOR.gris}>De serie</Label>
        <Label color={T >= W.potencia ? COLOR.blanco : COLOR.grisOscuro}>Margen</Label>
      </div>
      <div style={{ position: 'relative', width: full, height: 12, outline: `1px solid ${COLOR.grisOscuro}` }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: 12, width: serie, background: COLOR.blanco }} />
        <div
          style={{
            position: 'absolute',
            left: full * 0.56,
            top: 0,
            height: 12,
            width: extra,
            background: `repeating-linear-gradient(45deg, ${COLOR.rojo} 0 3px, rgba(255,7,7,0.25) 3px 9px)`,
          }}
        />
      </div>
    </div>
  );
};

/** 16,1–20,7 s — Día a día + bestia: ventana para clips horizontales. */
const Daily: React.FC<{ T: number }> = ({ T }) => {
  const o = on(T, W.diaADia, BLACK.to);
  if (!o) return null;
  const { x, y, w, h } = WINDOW;
  const beast = T >= W.bestia;
  const throttle = beast ? mix(0.2, 1, prog(T, W.acelerador, 0.5, ease.entrada)) : 0.2 * prog(T, W.diario, 0.5);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o, transform: `translateX(${shake(T, W.acelerador + 0.3, 8)}px)` }}>
      <TitleReveal T={T} start={W.diaADia} lines={['Día a día', '+ bestia']} colors={[COLOR.blanco, beast ? COLOR.rojo : COLOR.grisOscuro]} size={96} style={{ left: SAFE.left, top: 236 }} />
      <FadeUp T={T} start={W.diaADia + 0.2} style={{ left: x, top: y - 46, width: w, display: 'flex', justifyContent: 'space-between' }}>
        <Txt s="micro" color={COLOR.gris}>
          Golf R · GTI Clubsport · EA888
        </Txt>
        <Txt s="micro" color={COLOR.gris}>
          {beast ? 'Fig. 02 / 02' : 'Fig. 01 / 02'}
        </Txt>
      </FadeUp>
      <div style={{ position: 'absolute', left: SAFE.left, top: y + h + 64, width: 936 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <Label i="01" color={beast ? COLOR.gris : COLOR.blanco}>
            Uso diario
          </Label>
          <Label i="02" color={beast ? COLOR.blanco : COLOR.grisOscuro}>
            Acelerador a fondo
          </Label>
        </div>
        <div style={{ position: 'relative', width: 936, height: 12, outline: `1px solid ${COLOR.grisOscuro}` }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: 12, width: 936 * throttle, background: throttle > 0.6 ? COLOR.rojo : COLOR.blanco }} />
        </div>
        <div style={{ ...typeCss('micro'), color: COLOR.grisOscuro, marginTop: 12 }}>Pedal del acelerador · ilustrativo</div>
      </div>
    </div>
  );
};

/** 20,7–27,2 s — 500 CV de bloque, Black Friday y llamada. */
const Outro: React.FC<{ T: number }> = ({ T }) => {
  const a = on(T, BLACK.to, W.promociones - 0.35);
  const b = on(T, W.promociones - 0.35, W.comenta);
  return (
    <>
      {a ? (
        <div style={{ position: 'absolute', inset: 0, opacity: a, transform: `translateX(${shake(T, W.quinientos + 0.14, 10)}px)` }}>
          <FadeUp T={T} start={W.bloques + 0.05} style={{ left: SAFE.left, top: 1080 }}>
            <Label i="04">Bloque EA888</Label>
          </FadeUp>
          {T >= W.quinientos - 0.35 ? <TitleReveal T={T} start={W.quinientos - 0.35} lines={['500', 'CV']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" size={150} style={{ left: SAFE.left, top: 1140 }} /> : null}
        </div>
      ) : null}
      {b ? (
        <div style={{ position: 'absolute', inset: 0, opacity: b }}>
          <FadeUp T={T} start={W.promociones - 0.3} style={{ left: SAFE.left, top: 1100 }}>
            <Label i="%">Promociones CAR-TEC</Label>
          </FadeUp>
          {T >= W.blackFriday - 0.1 ? <TitleReveal T={T} start={W.blackFriday - 0.1} lines={['Black', 'Friday']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" size={132} style={{ left: SAFE.left, top: 1160 }} /> : null}
        </div>
      ) : null}
      {T >= W.comenta ? (
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${shake(T, W.comenta + 0.35, 9)}px)` }}>
          <TitleReveal T={T} start={W.comenta} lines={['Comenta', '«Black»']} colors={[COLOR.blanco, COLOR.rojo]} s="portada" size={128} style={{ left: SAFE.left, top: 1130 }} />
          <FadeUp T={T} start={W.contacto - 0.4} style={{ left: SAFE.left, top: 1420 }}>
            <Label i="→">Y te contactamos</Label>
          </FadeUp>
        </div>
      ) : null}
    </>
  );
};

/** Solo la capa de gráficos, con fondo transparente. */
export const ClubsportOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const T = frame / fps;
  const board = on(T, BLACK.from, BLACK.to);
  return (
    <AbsoluteFill>
      <Vignette T={T} />
      {board ? (
        <div style={{ position: 'absolute', inset: 0, opacity: board }}>
          <Board hole={T >= W.diaADia ? prog(T, W.diaADia, 0.5) : 0} />
        </div>
      ) : null}
      <Engine T={T} />
      <Daily T={T} />
      <Marks />
      <Intro T={T} />
      <Outro T={T} />
    </AbsoluteFill>
  );
};

/** Vista previa: vídeo del cliente + caja de muestra en la ventana + capa + mezcla. */
export const ClubsportPreview: React.FC = () => {
  const frame = useCurrentFrame();
  const T = frame / 30;
  return (
    <AbsoluteFill style={{ background: COLOR.negro }}>
      <OffthreadVideo src={staticFile('episodes/bf-03-clubsport/base.mp4')} muted style={{ width: 1080, height: 1920 }} />
      {T >= W.diaADia && T < BLACK.to ? (
        <div style={{ position: 'absolute', left: WINDOW.x, top: WINDOW.y, width: WINDOW.w, height: WINDOW.h, background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Txt s="etiqueta" color={COLOR.gris}>
            Aquí va tu clip horizontal
          </Txt>
        </div>
      ) : null}
      <ClubsportOverlay />
      <Audio src={staticFile('episodes/bf-03-clubsport/mezcla.wav')} />
    </AbsoluteFill>
  );
};
