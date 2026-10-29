import React from 'react';
import { Composition, continueRender, delayRender, Still } from 'remotion';
import { EP01 } from './episodes/ep01-cpc/config';
import { Ep01Frame, Ep01Video } from './episodes/ep01-cpc/Episode';
import { EP01_DURATION } from './episodes/ep01-cpc/timeline';
import { BF01_DURATION, Bf01Video } from './episodes/bf-01/Bf01';
import { EP02 } from './episodes/ep02-stage1';
import { EP03 } from './episodes/ep03-downpipe';
import { EP06 } from './episodes/ep06-banco';
import { EP08 } from './episodes/ep08-mapas-ecu';
import { fontsReady } from './system/fonts';
import { CANVAS } from './system/tokens';

const handle = delayRender('Cargando fuentes CAR-TEC');
fontsReady.then(() => continueRender(handle));

/** Fotogramas de revisión del EP.01: instante (s) representativo de cada escena. */
const EP01_STILLS: [string, number][] = [
  ['EP01-S01-Portada', 1.95],
  ['EP01-S02-Limitada', 3.9],
  ['EP01-S03-Centralitas', 7.5],
  ['EP01-S04a-CPC', 9.2],
  ['EP01-S04b-Cadena', 11.0],
  ['EP01-S05-Limites', 14.1],
  ['EP01-S06-Stage', 17.4],
  ['EP01-S07-Bloqueo', 21.2],
  ['EP01-S08-Par', 25.4],
  ['EP01-S09-Recalibracion', 29.1],
  ['EP01-S10-Adaptado', 31.9],
  ['EP01-S11-Diagnostico', 35.6],
  ['EP01-S12-Logo', 37.6],
];

export const Root: React.FC = () => (
  <>
    <Composition
      id="EP01"
      component={Ep01Video}
      durationInFrames={Math.round(EP01_DURATION * CANVAS.fps)}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
      defaultProps={{ audio: EP01.mix }}
    />
    <Composition
      id={EP02.id}
      component={EP02.EpisodeVideo}
      durationInFrames={Math.round(EP02.durationSec * CANVAS.fps)}
      fps={CANVAS.fps}
      width={CANVAS.width}
      height={CANVAS.height}
      defaultProps={{ audio: EP02.mix }}
    />
    <Composition id="BF01" component={Bf01Video} durationInFrames={Math.round(BF01_DURATION * CANVAS.fps)} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} defaultProps={{ audio: 'episodes/bf-01/mezcla.wav' }} />
    {[EP03, EP06, EP08].map((ep) => (
      <Composition key={ep.id} id={ep.id} component={ep.EpisodeVideo} durationInFrames={Math.round(ep.durationSec * CANVAS.fps)} fps={CANVAS.fps} width={CANVAS.width} height={CANVAS.height} defaultProps={{ audio: ep.mix }} />
    ))}
    {EP01_STILLS.map(([id, T]) => (
      <Still key={id} id={id} component={Ep01Frame} width={CANVAS.width} height={CANVAS.height} defaultProps={{ T }} />
    ))}
  </>
);
