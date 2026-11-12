---
titulo: Self-hosted portfolio on a VPS
descripcion: This very website, served by Caddy in Docker on my own VPS and deployed automatically with GitHub Actions.
fecha: 2026-11-12
estado: en-proceso
tecnologias: [Astro, Docker, Caddy, GitHub Actions, Linux]
repo: https://github.com/IzanZambrano/izan-zambrano-portfolio
destacado: true
---

## What it is

My personal portfolio. The site is built with **Astro** (it generates static HTML) and I serve it myself from a VPS.

## Architecture

1. I run `git push` to the `main` branch.
2. **GitHub Actions** builds the site (`npm run build`) and generates the `dist/` folder.
3. The workflow copies `dist/` to the server over **SSH with rsync**.
4. **Caddy**, running in a **Docker** container, serves the files and handles the Let's Encrypt **HTTPS** certificate automatically.

My public GitHub repositories are pulled in at build time through the GitHub API, and the site is rebuilt every day, so new projects show up on their own.

## Server hardening

- SSH key authentication only, no passwords and no root login.
- `ufw` firewall: only ports 22, 80 and 443 open.
- `fail2ban` against brute-force attempts.

## What I learned

<!-- TODO: write about the problems you ran into and how you solved them. -->
