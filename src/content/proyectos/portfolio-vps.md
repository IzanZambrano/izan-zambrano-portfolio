---
titulo: Portfolio autodesplegado en VPS
descripcion: Esta misma web, servida con Caddy en Docker en un VPS propio y desplegada automáticamente con GitHub Actions.
fecha: 2026-11-12
tecnologias: [Astro, Docker, Caddy, GitHub Actions, Linux]
repo: https://github.com/IzanZambrano/izan-zambrano-portfolio
destacado: true
---

## Qué es

Mi portfolio personal. La web está hecha con **Astro** (genera HTML estático) y la sirvo yo mismo desde un VPS.

## Arquitectura

1. Hago `git push` a la rama `main`.
2. **GitHub Actions** compila la web (`npm run build`) y genera la carpeta `dist/`.
3. El workflow copia `dist/` al servidor por **SSH con rsync**.
4. **Caddy**, dentro de un contenedor **Docker**, sirve los archivos y gestiona el certificado **HTTPS** de Let's Encrypt automáticamente.

## Seguridad del servidor

- Acceso solo por clave SSH, sin contraseña y sin login de root.
- Firewall con `ufw`: solo puertos 22, 80 y 443.
- `fail2ban` contra intentos de fuerza bruta.

## Qué he aprendido

<!-- TODO: escribe aquí qué problemas te encontraste y cómo los resolviste. -->
