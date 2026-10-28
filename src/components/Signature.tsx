import React from 'react';
import { BAND, COLOR, SAFE } from '../system/tokens';
import { Logo } from './Logo';
import { typeCss } from './Type';

/**
 * Firma CAR-TEC presente en todas las escenas: logo compacto arriba a la izquierda
 * y meta del episodio arriba a la derecha, siempre en la banda BAND.firma.
 */
export const Signature: React.FC<{ episode: string; figure: string; opacity?: number }> = ({ episode, figure, opacity = 1 }) => (
  <div
    style={{
      position: 'absolute',
      left: SAFE.left,
      right: 1080 - SAFE.right,
      top: BAND.firma,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      opacity,
    }}
  >
    <Logo height={44} />
    <div style={{ ...typeCss('micro'), color: COLOR.gris, textAlign: 'right' }}>
      <div>{episode}</div>
      <div style={{ color: COLOR.blanco }}>{figure}</div>
    </div>
  </div>
);
