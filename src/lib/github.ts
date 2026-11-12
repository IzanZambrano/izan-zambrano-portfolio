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
}

let cache: Promise<RepoGitHub[]> | undefined;

export function getRepos(user: string): Promise<RepoGitHub[]> {
  cache ??= descargar(user);
  return cache;
}

async function descargar(user: string): Promise<RepoGitHub[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'portfolio-build',
  };
  // En GitHub Actions se usa el token del workflow para no chocar con el límite de peticiones.
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

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
