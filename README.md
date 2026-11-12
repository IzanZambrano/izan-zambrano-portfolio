# izan-zambrano-portfolio

Mi portfolio personal hecho con [Astro](https://astro.build) y desplegado en un VPS con Docker, Caddy y GitHub Actions.

## Estructura

```
├── src/
│   ├── data/perfil.ts          # Tus datos: nombre, email, habilidades… (ES y EN)
│   ├── i18n/ui.ts              # Textos de la interfaz en español e inglés
│   ├── content/proyectos/      # Proyectos en Markdown: es/ y en/
│   ├── lib/                    # Importación de GitHub y unión de proyectos
│   ├── views/                  # Contenido de cada página (compartido por los dos idiomas)
│   ├── pages/                  # Rutas: / y /en/
│   ├── components/             # Header, Footer, tarjeta de proyecto, etiqueta de estado
│   ├── layouts/BaseLayout.astro
│   └── styles/global.css
├── public/                     # Archivos estáticos (favicon, imágenes)
├── deploy/                     # docker-compose.yml + Caddyfile para el VPS
└── .github/workflows/deploy.yml  # Build y despliegue automático
```

## Desarrollo en local

Requisitos: Node.js 20 o superior y Git.

```bash
git clone https://github.com/IzanZambrano/izan-zambrano-portfolio.git
cd izan-zambrano-portfolio
npm install
npm run dev        # http://localhost:4321
```

Otros comandos:

| Comando           | Qué hace                                  |
| ----------------- | ----------------------------------------- |
| `npm run build`   | Genera la web estática en `dist/`         |
| `npm run preview` | Sirve `dist/` en local para comprobarla   |

## Proyectos

Hay dos formas de que un proyecto aparezca en la web:

### 1. Automática: desde GitHub

Al compilar, la web descarga tus **repositorios públicos** de GitHub (los forks no) y los muestra en la sección de proyectos. El workflow se ejecuta **cada día** y en cada push, así que un repo nuevo aparece como mucho al día siguiente. Para que salga al momento: pestaña **Actions → Build y despliegue → Run workflow**.

Lo que se muestra sale del propio repo (en GitHub, rueda ⚙️ junto a "About"):

| En GitHub                     | En la web                               |
| ----------------------------- | --------------------------------------- |
| Description                   | Descripción de la tarjeta               |
| Website                       | Botón de demo                           |
| Lenguaje principal + Topics   | Etiquetas de tecnologías                |
| Topic `en-proceso`            | Estado **en proceso** (por defecto)     |
| Topic `acabado`               | Estado **acabado**                      |
| Topic `pausado`               | Estado **pausado**                      |
| Topic `idea`                  | Estado **idea**                         |
| Repo archivado / topic `archivado` | Estado **archivado**               |
| Topic `destacado`             | Aparece en la portada                   |
| Topic `no-portfolio`          | No aparece en la web                    |

### 2. Manual: con página propia en Markdown

Para proyectos con explicación larga, capturas, etc. Crea `src/content/proyectos/es/mi-proyecto.md` (y opcionalmente la versión en inglés con el **mismo nombre** en `src/content/proyectos/en/`):

```markdown
---
titulo: Mi proyecto
descripcion: Resumen corto
fecha: 2026-11-12
estado: en-proceso   # en-proceso | acabado | pausado | archivado | idea
tecnologias: [Linux, Docker]
repo: https://github.com/IzanZambrano/mi-proyecto
destacado: true      # true = aparece en la portada
---

Aquí va la explicación en Markdown.
```

Si el Markdown tiene `repo:` apuntando a un repo de GitHub, ese repo no se duplica: se usa la versión Markdown. Si falta la traducción al inglés, la web en inglés muestra la versión en español con un aviso.

## Idiomas

La web está en español (`/`) e inglés (`/en/`), con un selector ES/EN en la cabecera.

- Textos de la interfaz: `src/i18n/ui.ts`
- Tu presentación, rol y habilidades: `src/data/perfil.ts`
- La primera visita se muestra en inglés si el navegador no está en español, catalán, gallego o euskera. Después se recuerda el idioma elegido.

## Despliegue en el VPS

1. En el servidor: instalar Docker y crear la carpeta `~/portfolio/site`.
2. Copiar `deploy/docker-compose.yml` y `deploy/Caddyfile` a `~/portfolio/` y poner tu dominio en el `Caddyfile`.
3. `cd ~/portfolio && docker compose up -d`
4. En GitHub → Settings → Secrets and variables → Actions:
   - **Secrets:** `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY` (y `SSH_PORT` si no es 22)
   - **Variables:** `DEPLOY_ENABLED` = `true`
5. A partir de ahí, cada `git push` a `main` despliega la web automáticamente.
