import type { Lang } from '../i18n/ui';

// Datos personales del portfolio. Edita este archivo para cambiar tu información.
export const perfil = {
  nombre: 'Izan Zambrano',
  githubUser: 'IzanZambrano', // los repos públicos de este usuario se importan solos
  email: 'tu-correo@ejemplo.com', // TODO: cambia por tu email
  github: 'https://github.com/IzanZambrano',
  linkedin: '', // TODO: añade tu LinkedIn si tienes
};

// Textos que cambian según el idioma.
export const perfilTextos: Record<Lang, { rol: string; resumen: string; ubicacion: string; bio: string[] }> = {
  es: {
    rol: 'Estudiante de ASIR · Sistemas y redes',
    resumen:
      'Me interesa la administración de sistemas Linux, las redes y la automatización. ' +
      'Este portfolio lo he desplegado yo mismo en un VPS con Docker, Caddy y GitHub Actions.',
    ubicacion: 'Barcelona',
    bio: [
      // TODO: cuenta aquí un poco más sobre ti: qué te gusta, qué estás aprendiendo, qué buscas.
      'Soy Izan Zambrano, estudiante de Administración de Sistemas Informáticos en Red (ASIR). Me gusta montar servicios, entender cómo funcionan por dentro y automatizar lo que se repite.',
      'Este mismo portfolio es uno de mis proyectos: está en un VPS que administro yo, servido con Caddy dentro de Docker, con HTTPS automático y desplegado con GitHub Actions en cada push.',
    ],
  },
  en: {
    rol: 'Network & Systems Administration student',
    resumen:
      "I'm into Linux system administration, networking and automation. " +
      'I deployed this portfolio myself on a VPS using Docker, Caddy and GitHub Actions.',
    ubicacion: 'Barcelona, Spain',
    bio: [
      "I'm Izan Zambrano, a Network and Systems Administration (ASIR) student. I enjoy setting up services, understanding how they work under the hood and automating anything repetitive.",
      'This portfolio is one of my projects: it runs on a VPS I manage, served by Caddy inside Docker, with automatic HTTPS and deployed with GitHub Actions on every push.',
    ],
  },
};

export const habilidades: Record<Lang, { grupo: string; items: string[] }[]> = {
  es: [
    { grupo: 'Sistemas', items: ['Linux (Debian, Ubuntu, Kali)', 'Windows Server', 'Bash'] },
    { grupo: 'Redes', items: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'Firewalls'] },
    { grupo: 'Servicios', items: ['Nginx', 'Caddy', 'Apache', 'MySQL/MariaDB'] },
    { grupo: 'DevOps', items: ['Docker', 'Docker Compose', 'Git', 'GitHub Actions'] },
    { grupo: 'Virtualización', items: ['VirtualBox', 'Proxmox'] },
  ],
  en: [
    { grupo: 'Systems', items: ['Linux (Debian, Ubuntu, Kali)', 'Windows Server', 'Bash'] },
    { grupo: 'Networking', items: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'Firewalls'] },
    { grupo: 'Services', items: ['Nginx', 'Caddy', 'Apache', 'MySQL/MariaDB'] },
    { grupo: 'DevOps', items: ['Docker', 'Docker Compose', 'Git', 'GitHub Actions'] },
    { grupo: 'Virtualisation', items: ['VirtualBox', 'Proxmox'] },
  ],
};
