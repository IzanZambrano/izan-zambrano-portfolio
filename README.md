# izan-zambrano-portfolio

Mi portfolio personal hecho con [Astro](https://astro.build) y desplegado en un VPS con Docker, Caddy y GitHub Actions.

## Estructura

```
├── src/
│   ├── data/perfil.ts          # Tus datos: nombre, email, habilidades…
│   ├── content/proyectos/      # Un archivo .md por proyecto
│   ├── pages/                  # Páginas: inicio, proyectos, sobre-mi, contacto, 404
│   ├── components/             # Header, Footer, tarjeta de proyecto
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

## Añadir un proyecto

Crea un archivo en `src/content/proyectos/mi-proyecto.md`:

```markdown
---
titulo: Mi proyecto
descripcion: Resumen corto
fecha: 2026-11-12
tecnologias: [Linux, Docker]
repo: https://github.com/IzanZambrano/mi-proyecto
destacado: true      # true = aparece en la portada
---

Aquí va la explicación en Markdown.
```

## Despliegue en el VPS

1. En el servidor: instalar Docker y crear la carpeta `~/portfolio/site`.
2. Copiar `deploy/docker-compose.yml` y `deploy/Caddyfile` a `~/portfolio/` y poner tu dominio en el `Caddyfile`.
3. `cd ~/portfolio && docker compose up -d`
4. En GitHub → Settings → Secrets and variables → Actions:
   - **Secrets:** `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY` (y `SSH_PORT` si no es 22)
   - **Variables:** `DEPLOY_ENABLED` = `true`
5. A partir de ahí, cada `git push` a `main` despliega la web automáticamente.
