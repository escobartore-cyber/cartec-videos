// Episodio 06 — Banco de potencia.
import { makeEpisode } from '../common/episode';
import { CUES } from './cues';
import * as SC from './scenes';
import { EP06_DURATION, SCENES } from './timeline';

export const EP06 = {
  id: 'EP06',
  durationSec: EP06_DURATION,
  mix: 'episodes/06-banco/mezcla.wav',
  ...makeEpisode({
    code: 'EP.06 — BANCO',
    keywords: ['400', 'banco', 'rodillos', 'potencia', 'par', 'gráfica', 'temperatura', 'equivalentes', 'Gavà', 'cita'],
    cues: CUES,
    scenes: SCENES,
    components: { S01: SC.S01, S02: SC.S02, S03: SC.S03, S04: SC.S04, S05: SC.S05, S06: SC.S06, S07: SC.S07, S08: SC.S08, S09: SC.S09, S10: SC.S10, S11: SC.S11 },
    logo: 'S11',
  }),
};
