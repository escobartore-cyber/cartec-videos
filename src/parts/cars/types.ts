import type { P } from '../../draw/pen';

export type CarDetail = { name: string; kind: 'spline' | 'poly'; pts: P[]; closed?: boolean };

/** Datos de dibujo de un coche, en metros. x = 0 en la trasera, frontal hacia +x. */
export type CarProfile = {
  id: string;
  nombre: string;
  codigo: string;
  length: number;
  width: number;
  rearAxle: number;
  frontAxle: number;
  tireR: number;
  archR: number;
  sillY: number;
  side: {
    upper: P[];
    hood: P[];
    rearBottom: P;
    details: CarDetail[];
  };
  top: {
    outline: P[];
    greenhouse: P[];
    glassBreaks: number[];
    track: { front: number; rear: number };
    tire: { width: number; length: number };
  };
  drivetrain: {
    layout: 'transaxle' | 'convencional';
    engine: { from: number; to: number; halfWidth: number; label: string };
    shaft: { from: number; to: number; halfWidth: number; label: string };
    gearbox: { from: number; to: number; halfWidth: number; label: string };
    differential: { x: number; r: number; label: string };
  };
};
