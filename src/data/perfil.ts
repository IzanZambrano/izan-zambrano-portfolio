import type { Lang } from '../i18n/ui';

// ─────────────────────────────────────────────────────────────────────────────
// Datos personales del portfolio. Edita este archivo para cambiar tu información.
// Cualquier lista vacía ([]) o texto vacío ('') hace que esa sección no se muestre.
// ─────────────────────────────────────────────────────────────────────────────

export const perfil = {
  nombre: 'Izan Zambrano',
  iniciales: 'IZ',
  githubUser: 'IzanZambrano', // los repos públicos de este usuario se importan solos
  email: 'izdazaan@gmail.com',
  github: 'https://github.com/IzanZambrano',
  linkedin: '', // cuando lo tengas, pon aquí la URL y aparecerá en la web
  /** Ruta dentro de /public, p. ej. '/img/foto.jpg'. Vacío = avatar con iniciales. */
  foto: '/img/foto.jpg',
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
    rol: 'Estudiante de ASIR · Encargado de IT en ESGroup',
    resumen:
      'Estudiante de segundo curso de ASIR y encargado del departamento de IT en ESGroup. ' +
      'Me apasionan la administración de sistemas, las redes y la ciberseguridad.',
    ubicacion: 'Mataró (Barcelona)',
    bio: [
      'Soy estudiante de segundo curso del Ciclo Formativo de Grado Superior en Administración de Sistemas Informáticos en Red (ASIR), con una gran pasión por la informática, la administración de sistemas y las infraestructuras de red.',
      'Cuento con conocimientos prácticos en entornos Linux, administración de servidores, configuración de servicios de red, virtualización y automatización mediante scripts Bash. Me interesa especialmente el ámbito de la ciberseguridad y la administración de infraestructuras IT.',
      'Actualmente soy el encargado del departamento de IT de ESGroup, donde sigo desarrollando mis conocimientos y mi experiencia en el sector tecnológico. Mi objetivo es seguir creciendo profesionalmente y especializarme en sistemas, redes y ciberseguridad.',
    ],
  },
  en: {
    rol: 'Network & Systems Administration student · Head of IT at ESGroup',
    resumen:
      'Second-year Network and Systems Administration (ASIR) student and head of the IT department at ESGroup. ' +
      "I'm passionate about system administration, networking and cybersecurity.",
    ubicacion: 'Mataró (Barcelona), Spain',
    bio: [
      "I'm a second-year student of the Higher Vocational Training Diploma in Network and Systems Administration (ASIR), with a strong passion for IT, system administration and network infrastructure.",
      'I have hands-on experience with Linux environments, server administration, network service configuration, virtualisation and automation with Bash scripting. I am particularly interested in cybersecurity and IT infrastructure management.',
      "I currently head the IT department at ESGroup, where I keep building my knowledge and experience in the tech sector. My goal is to keep growing professionally and specialise in systems, networking and cybersecurity.",
    ],
  },
};

export const habilidades: Record<Lang, { grupo: string; items: string[] }[]> = {
  es: [
    { grupo: 'Sistemas operativos', items: ['Debian', 'Ubuntu', 'Fedora', 'Manjaro', 'Windows 11'] },
    { grupo: 'Administración de sistemas', items: ['Usuarios, grupos y permisos', 'Servidores Linux', 'Procesos y servicios'] },
    { grupo: 'Redes', items: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'Direccionamiento IP', 'BIND9'] },
    { grupo: 'Servicios y servidores', items: ['Apache', 'Nginx', 'MySQL', 'MariaDB'] },
    { grupo: 'Virtualización y contenedores', items: ['VirtualBox', 'Proxmox', 'Docker', 'Docker Compose'] },
    { grupo: 'Automatización y desarrollo', items: ['Bash', 'Git', 'GitHub', 'HTML', 'CSS', 'PHP', 'JavaScript', 'Python'] },
  ],
  en: [
    { grupo: 'Operating systems', items: ['Debian', 'Ubuntu', 'Fedora', 'Manjaro', 'Windows 11'] },
    { grupo: 'System administration', items: ['Users, groups and permissions', 'Linux servers', 'Processes and services'] },
    { grupo: 'Networking', items: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'IP addressing', 'BIND9'] },
    { grupo: 'Services and servers', items: ['Apache', 'Nginx', 'MySQL', 'MariaDB'] },
    { grupo: 'Virtualisation and containers', items: ['VirtualBox', 'Proxmox', 'Docker', 'Docker Compose'] },
    { grupo: 'Automation and development', items: ['Bash', 'Git', 'GitHub', 'HTML', 'CSS', 'PHP', 'JavaScript', 'Python'] },
  ],
};

/** Elemento de la línea de tiempo (formación y experiencia). */
export interface Hito {
  titulo: string;
  lugar: string;
  periodo: string; // p. ej. '2024 – 2026' o '2025 – actualidad'
  detalle?: string;
  /** Experiencia no técnica: se muestra en una lista compacta aparte. */
  secundaria?: boolean;
}

export const formacion: Record<Lang, Hito[]> = {
  es: [
    {
      titulo: 'CFGS Administración de Sistemas Informáticos en Red (ASIR)',
      lugar: 'Institut Thos i Codina · Mataró',
      periodo: '2025 – 2027 (en curso)',
      detalle:
        'Administración de sistemas operativos, configuración de redes, servicios de red, bases de datos, virtualización, seguridad informática y automatización de tareas.',
    },
    {
      titulo: 'Bachillerato Tecnológico',
      lugar: 'Institut Miquel Biada · Mataró',
      periodo: '2023 – 2025',
      detalle:
        'Trabajo de investigación sobre ciberseguridad, centrado en el cifrado de contraseñas y mensajes.',
    },
  ],
  en: [
    {
      titulo: 'Higher Vocational Diploma in Network and Systems Administration (ASIR)',
      lugar: 'Institut Thos i Codina · Mataró',
      periodo: '2025 – 2027 (in progress)',
      detalle:
        'Operating system administration, network configuration, network services, databases, virtualisation, IT security and task automation.',
    },
    {
      titulo: 'Baccalaureate in Science and Technology',
      lugar: 'Institut Miquel Biada · Mataró',
      periodo: '2023 – 2025',
      detalle: 'Research project on cybersecurity, focused on password and message encryption.',
    },
  ],
};

export const experiencia: Record<Lang, Hito[]> = {
  es: [
    {
      titulo: 'Encargado del departamento de IT',
      lugar: 'ESGroup',
      periodo: 'Septiembre 2026 – actualidad',
      detalle:
        'Tareas del entorno tecnológico de la empresa y gestión de sus sistemas informáticos.',
    },
    {
      titulo: 'Equipo de restaurante',
      lugar: "McDonald's",
      periodo: '2026',
      secundaria: true,
    },
    {
      titulo: 'Promotor de ventas (campaña Brother)',
      lugar: 'MediaMarkt',
      periodo: '2025 – 2026',
      secundaria: true,
    },
  ],
  en: [
    {
      titulo: 'Head of IT department',
      lugar: 'ESGroup',
      periodo: 'September 2026 – present',
      detalle: "Work across the company's technology environment and management of its IT systems.",
    },
    {
      titulo: 'Crew member',
      lugar: "McDonald's",
      periodo: '2026',
      secundaria: true,
    },
    {
      titulo: 'Sales promoter (Brother campaign)',
      lugar: 'MediaMarkt',
      periodo: '2025 – 2026',
      secundaria: true,
    },
  ],
};

export interface Certificacion {
  nombre: string;
  entidad: string;
  anio: string;
  url?: string; // enlace a la credencial
}

export const certificaciones: Certificacion[] = [
  // { nombre: 'CCNA: Introduction to Networks', entidad: 'Cisco Networking Academy', anio: '2026', url: '' },
];

export const idiomas: Record<Lang, { idioma: string; nivel: string }[]> = {
  es: [
    { idioma: 'Castellano', nivel: 'Nativo' },
    { idioma: 'Catalán', nivel: 'Nativo' },
    { idioma: 'Inglés', nivel: 'B2 (intermedio alto)' },
  ],
  en: [
    { idioma: 'Spanish', nivel: 'Native' },
    { idioma: 'Catalan', nivel: 'Native' },
    { idioma: 'English', nivel: 'B2 (upper intermediate)' },
  ],
};
