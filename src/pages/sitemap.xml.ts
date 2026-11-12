import type { APIRoute } from 'astro';
import { routes } from '../i18n/ui';
import { getProyectos } from '../lib/proyectos';
import { withBase } from '../lib/base';

// Genera /sitemap.xml con todas las páginas en los dos idiomas.
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const url = (path: string) => new URL(withBase(path), base).href;

  const pares: { es: string; en: string }[] = Object.values(routes).map((r) => ({ es: r.es, en: r.en }));

  const proyectos = await getProyectos('es');
  for (const p of proyectos) {
    pares.push({ es: `${routes.proyectos.es}${p.slug}/`, en: `${routes.proyectos.en}${p.slug}/` });
  }

  const entrada = (loc: string, par: { es: string; en: string }) => `  <url>
    <loc>${url(loc)}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${url(par.es)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${url(par.en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url(par.es)}"/>
  </url>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pares.flatMap((par) => [entrada(par.es, par), entrada(par.en, par)]).join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
