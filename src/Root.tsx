import React from 'react';
import { continueRender, delayRender, Still } from 'remotion';
import { S01Cover } from './episodes/ep01-cpc/scenes/S01Cover';
import { S04Cpc } from './episodes/ep01-cpc/scenes/S04Cpc';
import { S08Torque } from './episodes/ep01-cpc/scenes/S08Torque';
import { fontsReady } from './system/fonts';
import { CANVAS } from './system/tokens';

const handle = delayRender('Cargando fuentes CAR-TEC');
fontsReady.then(() => continueRender(handle));

export const Root: React.FC = () => (
  <>
    <Still id="EP01-S01-Portada" component={S01Cover} width={CANVAS.width} height={CANVAS.height} defaultProps={{ time: 1.7 }} />
    <Still id="EP01-S04-CPC" component={S04Cpc} width={CANVAS.width} height={CANVAS.height} defaultProps={{ time: 10.5 }} />
    <Still id="EP01-S08-Par" component={S08Torque} width={CANVAS.width} height={CANVAS.height} defaultProps={{ time: 23.9 }} />
  </>
);
