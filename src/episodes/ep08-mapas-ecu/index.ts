// Episodio 08 — Mapas de la ECU.
import { makeEpisode } from '../common/episode';
import { CUES } from './cues';
import * as SC from './scenes';
import { EP08_DURATION, SCENES } from './timeline';

export const EP08 = {
  id: 'EP08',
  durationSec: EP08_DURATION,
  mix: 'episodes/08-mapas-ecu/mezcla.wav',
  ...makeEpisode({
    code: 'EP.08 — MAPAS ECU',
    keywords: ['ECU', 'mapas', 'calibración', 'reprogramación', 'sensores', 'relacionados', 'turbo', 'par', 'CAR-TEC'],
    cues: CUES,
    scenes: SCENES,
    components: { S01: SC.S01, S02: SC.S02, S03: SC.S03, S04: SC.S04, S05: SC.S05, S06: SC.S06, S07: SC.S07, S08: SC.S08, S09: SC.S09, S10: SC.S10, S11: SC.S11, S12: SC.S12 },
    logo: 'S12',
  }),
};
