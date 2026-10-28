import React from 'react';
import { Cam, FadeUp, TitleReveal } from '../../../components/Anim';
import { T as Txt } from '../../../components/Type';
import type { Camera } from '../../../draw/line3d';
import { projectPolyline } from '../../../draw/line3d';
import { Line3D } from '../../../draw/Line3D';
import { CalibrationMap } from '../../../parts/CalibrationMap';
import { controlUnit } from '../../../parts/controlUnit';
import { v8Engine } from '../../../parts/v8Engine';
import { BAND, COLOR, SAFE, STROKE } from '../../../system/tokens';
import { ease, mix, prog, shot } from '../../../system/motion';
import { W } from '../timeline';

/** S06 — Stage 1 / Stage 2: se reprograma la ECU (mapa) para que el V8 rinda más. */
export const S06Stage: React.FC<{ T: number }> = ({ T }) => {
  const s = shot(T, [W.stage2, W.aumentar]);
  if (s === 1) {
    // Plano B: STAGE 2 · la ECU y su mapa de motor reescribiéndose.
    const ecuCam: Camera = { yaw: 30 + (T - W.stage2) * 6, elev: 34, dist: 120, target: [0, 3, 0], scale: 13, cx: 320, cy: 800 };
    const ecu = controlUnit({ variant: 'ecu', draw: prog(T, W.stage2, 0.5) });
    const [ecuPin] = projectPolyline([ecu.anchors.conector], ecuCam);
    const mapCam: Camera = { yaw: -32 + (T - W.stage2) * 4, elev: 30, dist: 160, target: [0, 4, 0], scale: 13.5, cx: 640, cy: 1050 };
    const level = prog(T, W.gestion, 0.9, ease.camara);
    return (
      <>
        <TitleReveal T={T} start={W.stage2} lines={['Stage 2']} s="portada" style={{ left: SAFE.left, top: BAND.titulo }} colors={[COLOR.blanco]} />
        <FadeUp T={T} start={W.stage2 + 0.15} style={{ left: SAFE.left, top: BAND.titulo + 180 }}>
          <Txt s="etiqueta" color={COLOR.gris}>
            Reprogramación de la ECU
          </Txt>
        </FadeUp>
        <Line3D parts={ecu.parts} camera={ecuCam} />
        <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
          <path d={`M${ecuPin[0]} ${ecuPin[1]}C${ecuPin[0] + 160} ${ecuPin[1] + 40} ${560} ${880} ${640} ${940}`} fill="none" stroke={COLOR.rojo} strokeWidth={STROKE.arista} strokeDasharray="8 7" opacity={prog(T, W.gestion, 0.3)} />
        </svg>
        <CalibrationMap camera={mapCam} level={level} draw={prog(T, W.stage2 + 0.2, 0.6)} sweep={T >= W.gestion && T < W.gestion + 1 ? prog(T, W.gestion, 0.9, ease.lineal) : undefined} />
        <FadeUp T={T} start={W.gestion} style={{ left: SAFE.left, top: 1190 }}>
          <Txt s="etiqueta">
            <span style={{ color: COLOR.rojo }}>→ </span>Mapa de motor · gestión electrónica
          </Txt>
        </FadeUp>
      </>
    );
  }
  // Planos A y C: el V8 biturbo del AMG GT. En C los turbos se encienden en rojo.
  const yaw = mix(130, 165, prog(T, W.cuando, W.elCpc - W.cuando, ease.lineal));
  const camera: Camera = { yaw, elev: 26, dist: 300, target: [0, 14, 0], scale: s === 0 ? 7.2 : 6, cx: 540, cy: s === 0 ? 900 : 860 };
  const parts = v8Engine({ draw: prog(T, W.cuando, 0.9), turboStyle: s === 2 ? 'accent' : 'line' });
  return (
    <>
      {s === 0 ? (
        <>
          <FadeUp T={T} start={W.cuando} style={{ left: SAFE.left, top: BAND.titulo + 180 }}>
            <Txt s="etiqueta" color={COLOR.gris}>
              Reprogramación · V8 biturbo
            </Txt>
          </FadeUp>
          {T >= W.stage1 ? <TitleReveal T={T} start={W.stage1} lines={['Stage 1']} s="portada" style={{ left: SAFE.left, top: BAND.titulo }} /> : null}
        </>
      ) : (
        <>
          <TitleReveal T={T} start={W.aumentar} lines={['+ Rendimiento']} colors={[COLOR.blanco]} style={{ left: SAFE.left, top: BAND.titulo }} />
          <FadeUp T={T} start={W.rendimiento} style={{ left: SAFE.left, top: BAND.titulo + 130 }}>
            <Txt s="etiqueta" color={COLOR.gris}>
              Más par · más potencia
            </Txt>
          </FadeUp>
        </>
      )}
      <Cam scale={mix(1, 1.08, prog(T, s === 0 ? W.cuando : W.aumentar, 1.6, ease.lineal))} origin={[540, 900]}>
        <Line3D parts={parts} camera={camera} />
      </Cam>
      <Txt s="micro" color={COLOR.grisOscuro} style={{ position: 'absolute', left: SAFE.left, top: 1500 }}>
        V8 biturbo · turbos dentro de la V · esquema ilustrativo
      </Txt>
    </>
  );
};
