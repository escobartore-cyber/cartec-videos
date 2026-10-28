// Composición maestra común a los episodios: Frame, escena activa con barrido,
// firma, subtítulos y audio. Cada episodio aporta su línea de tiempo y sus escenas.
import React from 'react';
import { Audio, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { SceneShell } from '../../components/Anim';
import { Frame } from '../../components/Frame';
import { Signature } from '../../components/Signature';
import { Cue, Subtitles } from '../../components/Subtitles';
import { prog } from '../../system/motion';

export type SceneDef = { id: string; from: number; to: number; fig: number };
export type SceneComp = React.FC<{ T: number }>;

export type EpisodeDef = {
  code: string;
  keywords: readonly string[];
  cues: Cue[];
  scenes: SceneDef[];
  components: Record<string, SceneComp>;
  /** Escena del cierre de marca (sin firma ni subtítulos). */
  logo: string;
};

export const makeEpisode = (ep: EpisodeDef) => {
  const total = ep.scenes.filter((s) => s.id !== ep.logo).length + 1;
  const fig = (n: number) => `FIG. ${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  const EpisodeFrame: React.FC<{ T: number }> = ({ T }) => {
    const scene = ep.scenes.find((s) => T >= s.from && T < s.to) ?? ep.scenes[ep.scenes.length - 1];
    const Scene = ep.components[scene.id];
    const isLogo = scene.id === ep.logo;
    return (
      <Frame grid={isLogo ? 0.5 : 1}>
        <SceneShell T={T} from={scene.from} to={scene.to} id={scene.id} enter={scene.id !== ep.scenes[0].id} exit={!isLogo}>
          <Scene T={T} />
        </SceneShell>
        {!isLogo ? <Signature episode={ep.code} figure={fig(scene.fig)} opacity={prog(T, 0, 0.3)} /> : null}
        {!isLogo ? <Subtitles cues={ep.cues} time={T} keywords={[...ep.keywords]} /> : null}
      </Frame>
    );
  };

  const EpisodeVideo: React.FC<{ audio: string }> = ({ audio }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    return (
      <>
        <EpisodeFrame T={frame / fps} />
        <Audio src={staticFile(audio)} />
      </>
    );
  };

  return { EpisodeFrame, EpisodeVideo };
};
