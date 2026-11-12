/**
 * Antepone la base del sitio (opción `base` de astro.config.mjs) a una ruta absoluta.
 * En GitHub Pages la web vive en /izan-zambrano-portfolio/; con dominio propio la base es /.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : path;
}
