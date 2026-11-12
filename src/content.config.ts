import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada archivo .md de src/content/proyectos/ es un proyecto del portfolio.
const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proyectos' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    fecha: z.coerce.date(),
    tecnologias: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    destacado: z.boolean().default(false),
  }),
});

export const collections = { proyectos };
