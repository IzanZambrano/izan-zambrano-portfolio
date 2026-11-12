// Junta los proyectos escritos a mano (Markdown) con los repositorios de GitHub.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { perfil } from '../data/perfil';
import { getRepos, type RepoGitHub } from './github';
import { TOPIC_A_ESTADO, TOPIC_DESTACADO, TOPIC_OCULTAR, type Estado } from './estados';

export interface Proyecto {
  slug: string;
  titulo: string;
  descripcion: string;
  estado: Estado;
  fecha: Date;
  actualizado?: Date;
  tecnologias: string[];
  repo?: string;
  demo?: string;
  destacado: boolean;
  origen: 'local' | 'github';
  estrellas?: number;
  /** true si es la versión en español mostrada en la web en inglés por falta de traducción */
  sinTraducir?: boolean;
  entry?: CollectionEntry<'proyectos'>;
  repoGitHub?: RepoGitHub;
}

const normalizar = (url: string) => url.toLowerCase().replace(/\/+$/, '').replace(/\.git$/, '');

function slugDe(entry: CollectionEntry<'proyectos'>) {
  const [lang, ...resto] = entry.id.split('/');
  return { lang, slug: resto.join('/') };
}

/** Proyectos Markdown en el idioma pedido (si falta la traducción, usa el español). */
export async function getProyectosLocales(lang: Lang): Promise<Proyecto[]> {
  const entries = await getCollection('proyectos');
  const porSlug = new Map<string, { entry: CollectionEntry<'proyectos'>; sinTraducir: boolean }>();

  for (const entry of entries) {
    const { lang: l, slug } = slugDe(entry);
    if (l === lang) porSlug.set(slug, { entry, sinTraducir: false });
  }
  for (const entry of entries) {
    const { lang: l, slug } = slugDe(entry);
    if (l === 'es' && !porSlug.has(slug)) porSlug.set(slug, { entry, sinTraducir: lang !== 'es' });
  }

  return [...porSlug.entries()].map(([slug, { entry, sinTraducir }]) => ({
    slug,
    titulo: entry.data.titulo,
    descripcion: entry.data.descripcion,
    estado: entry.data.estado,
    fecha: entry.data.fecha,
    tecnologias: entry.data.tecnologias,
    repo: entry.data.repo,
    demo: entry.data.demo,
    destacado: entry.data.destacado,
    origen: 'local' as const,
    sinTraducir,
    entry,
  }));
}

/** Repos públicos de GitHub que no tienen ya un Markdown propio. */
async function getProyectosGitHub(locales: Proyecto[]): Promise<Proyecto[]> {
  const repos = await getRepos(perfil.githubUser);
  const yaIncluidos = new Set(locales.filter((p) => p.repo).map((p) => normalizar(p.repo!)));
  const slugsLocales = new Set(locales.map((p) => p.slug.toLowerCase()));

  return repos
    .filter((r) => !r.fork && !r.private)
    .filter((r) => r.name.toLowerCase() !== perfil.githubUser.toLowerCase()) // repo del perfil
    .filter((r) => !yaIncluidos.has(normalizar(r.html_url)))
    .filter((r) => !slugsLocales.has(r.name.toLowerCase()))
    .filter((r) => !(r.topics ?? []).some((t) => TOPIC_OCULTAR.includes(t)))
    .map((r) => {
      const topics = r.topics ?? [];
      const estadoTopic = topics.map((t) => TOPIC_A_ESTADO[t]).find(Boolean);
      const estado: Estado = estadoTopic ?? (r.archived ? 'archivado' : 'en-proceso');
      const tecnologias = [
        ...(r.language ? [r.language] : []),
        ...topics.filter((t) => !TOPIC_A_ESTADO[t] && !TOPIC_DESTACADO.includes(t)),
      ];
      return {
        slug: r.name.toLowerCase(),
        titulo: r.name.replace(/[-_]+/g, ' '),
        descripcion: r.description ?? '',
        estado,
        fecha: new Date(r.created_at),
        actualizado: new Date(r.pushed_at),
        tecnologias,
        repo: r.html_url,
        demo: r.homepage || undefined,
        destacado: topics.some((t) => TOPIC_DESTACADO.includes(t)),
        origen: 'github' as const,
        estrellas: r.stargazers_count,
        repoGitHub: r,
      };
    });
}

const ORDEN_ESTADO: Record<Estado, number> = {
  'en-proceso': 0,
  acabado: 1,
  pausado: 2,
  idea: 3,
  archivado: 4,
};

/** Todos los proyectos, ordenados: primero los que están en proceso, luego por fecha. */
export async function getProyectos(lang: Lang): Promise<Proyecto[]> {
  const locales = await getProyectosLocales(lang);
  const github = await getProyectosGitHub(locales);
  return [...locales, ...github].sort((a, b) => {
    const porEstado = ORDEN_ESTADO[a.estado] - ORDEN_ESTADO[b.estado];
    if (porEstado !== 0) return porEstado;
    const fa = (a.actualizado ?? a.fecha).valueOf();
    const fb = (b.actualizado ?? b.fecha).valueOf();
    return fb - fa;
  });
}
