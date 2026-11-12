import type { Lang } from '../i18n/ui';

// ─────────────────────────────────────────────────────────────────────────────
// Datos personales del portfolio. Edita este archivo para cambiar tu información.
// Cualquier lista vacía ([]) o texto vacío ('') hace que esa sección no se muestre.
// ─────────────────────────────────────────────────────────────────────────────

export const perfil = {
  nombre: 'Izan Zambrano',
  iniciales: 'IZ',
  githubUser: 'IzanZambrano', // los repos públicos de este usuario se importan solos
  email: '', // TODO: tu email público
  github: 'https://github.com/IzanZambrano',
  linkedin: '', // TODO: URL de tu LinkedIn
  /** Ruta dentro de /public, p. ej. '/img/foto.jpg'. Vacío = avatar con iniciales. */
  foto: '',
  /** ID de Formspree (lo que va después de /f/). Vacío = solo se muestra el email. */
  formspreeId: '',
  /** URL pública de la página de estado de Uptime Kuma, p. ej. 'https://status.tudominio.com/status/portfolio' */
  statusUrl: '',
  /** Analítica Umami autoalojada. Vacío = sin analítica. */
  umami: {
    src: '', // p. ej. 'https://stats.tudominio.com/script.js'
    websiteId: '',
  },
};

type Textos = { rol: string; resumen: string; ubicacion: string; bio: string[] };

export const perfilTextos: Record<Lang, Textos> = {
  es: {
    rol: 'Estudiante de ASIR · Sistemas y redes',
    resumen:
      'Me interesa la administración de sistemas Linux, las redes y la automatización. ' +
      'Este portfolio lo he desplegado yo mismo en un VPS con Docker, Caddy y GitHub Actions.',
    ubicacion: 'Barcelona',
    bio: [
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

/** Elemento de la línea de tiempo (formación y experiencia). */
export interface Hito {
  titulo: string;
  lugar: string;
  periodo: string; // p. ej. '2024 – 2026' o '2025 – actualidad'
  detalle?: string;
}

export const formacion: Record<Lang, Hito[]> = {
  es: [
    // { titulo: 'CFGS Administración de Sistemas Informáticos en Red', lugar: 'Institut X', periodo: '2024 – 2026' },
  ],
  en: [],
};

export const experiencia: Record<Lang, Hito[]> = {
  es: [],
  en: [],
};

export interface Certificacion {
  nombre: string;
  entidad: string;
  anio: string;
  url?: string; // enlace a la credencial
}

export const certificaciones: Certificacion[] = [
  // { nombre: 'CCNA: Introduction to Networks', entidad: 'Cisco Networking Academy', anio: '2025', url: '' },
];

export const idiomas: Record<Lang, { idioma: string; nivel: string }[]> = {
  es: [],
  en: [],
};
