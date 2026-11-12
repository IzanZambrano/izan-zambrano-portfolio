// Descarga los repositorios públicos de GitHub en el momento de compilar la web.
// Si no hay conexión o la API falla, devuelve una lista vacía y la web se compila igual.

export interface RepoGitHub {
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  stargazers_count: number;
  created_at: string;
  pushed_at: string;
  default_branch: string;
  owner: { login: string };
}

let cache: Promise<RepoGitHub[]> | undefined;
const readmes = new Map<string, Promise<string | null>>();

function cabeceras(accept = 'application/vnd.github+json'): Record<string, string> {
  const headers: Record<string, string> = { Accept: accept, 'User-Agent': 'portfolio-build' };
  // En GitHub Actions se usa el token del workflow para no chocar con el límite de peticiones.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export function getRepos(user: string): Promise<RepoGitHub[]> {
  cache ??= descargar(user);
  return cache;
}

/** README del repo ya convertido a HTML por GitHub (o null si no tiene). */
export function getReadmeHtml(repo: RepoGitHub): Promise<string | null> {
  const clave = repo.html_url;
  if (!readmes.has(clave)) readmes.set(clave, descargarReadme(repo));
  return readmes.get(clave)!;
}

async function descargarReadme(repo: RepoGitHub): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`, {
      headers: cabeceras('application/vnd.github.html+json'),
    });
    if (!res.ok) return null;
    let html = await res.text();
    // Las rutas relativas del README (imágenes y enlaces) apuntan al repo de GitHub.
    const raw = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.default_branch}/`;
    const blob = `${repo.html_url}/blob/${repo.default_branch}/`;
    html = html
      .replace(/(<img[^>]+src=")(?!https?:|data:|\/\/)\.?\/?([^"]+)"/g, `$1${raw}$2"`)
      .replace(/(<a[^>]+href=")(?!https?:|mailto:|#|\/\/)\.?\/?([^"]+)"/g, `$1${blob}$2"`);
    return html;
  } catch {
    return null;
  }
}

async function descargar(user: string): Promise<RepoGitHub[]> {
  const headers = cabeceras();

  try {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=pushed&type=owner`,
      { headers }
    );
    if (!res.ok) {
      console.warn(`[github] La API respondió ${res.status}. Se compila sin repos de GitHub.`);
      return [];
    }
    const repos = (await res.json()) as RepoGitHub[];
    console.log(`[github] ${repos.length} repositorios descargados de ${user}.`);
    return repos;
  } catch (err) {
    console.warn('[github] No se pudo conectar con GitHub. Se compila sin repos de GitHub.', err);
    return [];
  }
}
