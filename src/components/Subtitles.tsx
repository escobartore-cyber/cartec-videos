import React from 'react';
import { BAND, COLOR, SAFE } from '../system/tokens';
import { typeCss } from './Type';

export type Cue = { start: number; end: number; text: string };

type Group = { start: number; end: number; cues: Cue[] };

const MAX_CHARS = 22;
const BREAK_AFTER = /[.?!,]$/;

/** Agrupa los cues del SRT en líneas de lectura de hasta ~22 caracteres. */
export const groupCues = (cues: Cue[]): Group[] => {
  const groups: Group[] = [];
  let cur: Cue[] = [];
  const flush = () => {
    if (cur.length) groups.push({ start: cur[0].start, end: cur[cur.length - 1].end, cues: cur });
    cur = [];
  };
  for (const c of cues) {
    const len = cur.map((x) => x.text).join(' ').length;
    if (cur.length && len + 1 + c.text.length > MAX_CHARS) flush();
    cur.push(c);
    if (BREAK_AFTER.test(c.text)) flush();
  }
  flush();
  return groups;
};

const normalize = (w: string) => w.toUpperCase().replace(/[¿?¡!.,;:]/g, '');

const RISE = 0.12; // segundos de entrada de cada palabra

/**
 * Subtítulos cinéticos: cada palabra entra cuando se pronuncia (subida de 14 px y
 * fundido de 0,12 s). Las palabras clave del episodio van en rojo.
 */
export const Subtitles: React.FC<{ cues: Cue[]; time: number; keywords: string[]; top?: number }> = ({
  cues,
  time,
  keywords,
  top = BAND.subtitulos,
}) => {
  const groups = React.useMemo(() => groupCues(cues), [cues]);
  const keys = React.useMemo(() => new Set(keywords.map(normalize)), [keywords]);
  const idx = groups.findIndex((g, i) => time >= g.start - 0.04 && time < (groups[i + 1]?.start ?? g.end + 0.6));
  if (idx < 0) return null;
  const group = groups[idx];
  return (
    <div
      style={{
        position: 'absolute',
        left: SAFE.left,
        top,
        width: SAFE.rightRail.x - SAFE.left,
        ...typeCss('subtitulos'),
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '0.24em',
        rowGap: 6,
      }}
    >
      {group.cues.flatMap((c, ci) =>
        c.text.split(' ').map((word, wi) => {
          const p = Math.min(1, Math.max(0, (time - c.start + 0.04) / RISE));
          // Palabra clave entera, o solo la parte que coincide si va con guion ("Mercedes-AMG").
          const pieces = keys.has(normalize(word)) ? [{ t: word, hot: true }] : word.split(/(?<=-)/).map((t) => ({ t, hot: keys.has(normalize(t.replace(/-$/, ''))) }));
          return (
            <span key={`${ci}-${wi}`} style={{ opacity: p, transform: `translateY(${(1 - p) * 14}px)`, display: 'inline-block' }}>
              {pieces.map((piece, k) => (
                <span key={k} style={{ color: piece.hot ? COLOR.rojo : COLOR.blanco }}>
                  {piece.t}
                </span>
              ))}
            </span>
          );
        }),
      )}
    </div>
  );
};
