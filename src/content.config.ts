import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { ESTADOS } from './lib/estados';

// Proyectos escritos a mano, uno por archivo:
//   src/content/proyectos/es/<nombre>.md  → versión en español
//   src/content/proyectos/en/<nombre>.md  → versión en inglés (mismo nombre de archivo)
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    fecha: z.coerce.date(),
    estado: z.enum(ESTADOS).default('en-proceso'),
    tecnologias: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    destacado: z.boolean().default(false),
  }),
});

export const collections = { proyectos };
