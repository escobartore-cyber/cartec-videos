// Episodio 02 — Stage 1.
import { makeEpisode } from '../common/episode';
import { CUES } from './cues';
import * as SC from './scenes';
import { EP02_DURATION, SCENES } from './timeline';

export const EP02 = {
  id: 'EP02',
  durationSec: EP02_DURATION,
  mix: 'episodes/02-stage1/mezcla.wav',
  ...makeEpisode({
    code: 'EP.02 — STAGE 1',
    keywords: ['potencia', 'pieza', 'ECU', 'calibración', 'Stage', 'turbo', 'par', 'fiabilidad', 'CAR-TEC'],
    cues: CUES,
    scenes: SCENES,
    components: { S01: SC.S01, S02: SC.S02, S03: SC.S03, S04: SC.S04, S05: SC.S05, S06: SC.S06, S07: SC.S07, S08: SC.S08, S09: SC.S09, S10: SC.S10, S11: SC.S11 },
    logo: 'S11',
  }),
};

/** Instantes de revisión: uno por escena. */
export const EP02_STILLS: number[] = [2.0, 4.6, 8.9, 13.2, 17.8, 21.5, 25.3, 28.9, 31.3, 34.2, 36.3];
