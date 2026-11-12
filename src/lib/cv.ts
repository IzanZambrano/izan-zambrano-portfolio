import fs from 'node:fs';
import path from 'node:path';
import type { Lang } from '../i18n/ui';
import { withBase } from './base';

/**
 * Devuelve la ruta del CV en el idioma pedido si existe en public/cv/
 * (cv-es.pdf, cv-en.pdf). Si falta el de un idioma, usa el otro.
 */
export function getCv(lang: Lang): string | null {
  const existe = (l: string) => fs.existsSync(path.join(process.cwd(), 'public', 'cv', `cv-${l}.pdf`));
  if (existe(lang)) return withBase(`/cv/cv-${lang}.pdf`);
  const otro = lang === 'es' ? 'en' : 'es';
  if (existe(otro)) return withBase(`/cv/cv-${otro}.pdf`);
  return null;
}
