export const ESTADOS = ['en-proceso', 'acabado', 'pausado', 'archivado', 'idea'] as const;
export type Estado = (typeof ESTADOS)[number];

// Topics de GitHub que marcan el estado de un repo (en español o en inglés).
export const TOPIC_A_ESTADO: Record<string, Estado> = {
  'en-proceso': 'en-proceso',
  'in-progress': 'en-proceso',
  wip: 'en-proceso',
  acabado: 'acabado',
  terminado: 'acabado',
  finished: 'acabado',
  done: 'acabado',
  pausado: 'pausado',
  paused: 'pausado',
  archivado: 'archivado',
  archived: 'archivado',
  idea: 'idea',
};

// Topics especiales que no se muestran como tecnologías.
export const TOPIC_DESTACADO = ['destacado', 'featured'];
export const TOPIC_OCULTAR = ['no-portfolio', 'oculto', 'hidden'];
