import React from 'react';
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneShell } from '../../components/Anim';
import { Frame } from '../../components/Frame';
import { Signature } from '../../components/Signature';
import { Subtitles } from '../../components/Subtitles';
import { prog } from '../../system/motion';
import { EP01 } from './config';
import { CUES } from './cues';
import { S01Cover } from './scenes/S01Cover';
import { S02Limited } from './scenes/S02Limited';
import { S03Units } from './scenes/S03Units';
import { S04Cpc } from './scenes/S04Cpc';
import { S05Limits } from './scenes/S05Limits';
import { S06Stage } from './scenes/S06Stage';
import { S07Locked } from './scenes/S07Locked';
import { S08Torque, S10Adapted } from './scenes/S08Torque';
import { S09Unlock } from './scenes/S09Unlock';
import { S11Close } from './scenes/S11Close';
import { S12Logo } from './scenes/S12Logo';
import { SCENES } from './timeline';

const COMPONENTS: Record<string, React.FC<{ T: number }>> = {
  S01: S01Cover,
  S02: S02Limited,
  S03: S03Units,
  S04: S04Cpc,
  S05: S05Limits,
  S06: S06Stage,
  S07: S07Locked,
  S08: S08Torque,
  S09: S09Unlock,
  S10: S10Adapted,
  S11: S11Close,
  S12: S12Logo,
};

/** Fotograma del episodio en el instante T (segundos). Lo usan el vídeo y los fotogramas de prueba. */
export const Ep01Frame: React.FC<{ T: number }> = ({ T }) => {
  const scene = SCENES.find((s) => T >= s.from && T < s.to) ?? SCENES[SCENES.length - 1];
  const Scene = COMPONENTS[scene.id];
  const isLogo = scene.id === 'S12';
  return (
    <Frame grid={isLogo ? 0.5 : 1}>
      <SceneShell T={T} from={scene.from} to={scene.to} id={scene.id} enter={scene.id !== 'S01'} exit={!isLogo}>
        <Scene T={T} />
      </SceneShell>
      {!isLogo ? <Signature episode={EP01.code} figure={EP01.fig(scene.fig)} opacity={prog(T, 0, 0.3)} /> : null}
      {!isLogo ? <Subtitles cues={CUES} time={T} keywords={[...EP01.keywords]} /> : null}
    </Frame>
  );
};

/** Composición maestra del EP.01 con la mezcla de audio. */
export const Ep01Video: React.FC<{ audio: string }> = ({ audio }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <Ep01Frame T={frame / fps} />
      <Audio src={staticFile(audio)} />
    </>
  );
};
