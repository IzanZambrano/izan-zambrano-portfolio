// Textos de la web en cada idioma. Para cambiar un texto, edítalo aquí.
export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

// Rutas de cada página en cada idioma.
export const routes = {
  inicio: { es: '/', en: '/en/' },
  proyectos: { es: '/proyectos/', en: '/en/projects/' },
  sobre: { es: '/sobre-mi/', en: '/en/about/' },
  infra: { es: '/infra/', en: '/en/infra/' },
  contacto: { es: '/contacto/', en: '/en/contact/' },
} as const;
export type RouteKey = keyof typeof routes;

export const ui = {
  es: {
    'nav.inicio': 'inicio',
    'nav.proyectos': 'proyectos',
    'nav.sobre': 'sobre-mi',
    'nav.contacto': 'contacto',
    'nav.infra': 'infra',
    'nav.saltar': 'Saltar al contenido',
    'tema.cambiar': 'Cambiar entre tema claro y oscuro',
    'inicio.cv': 'Descargar CV',
    'proyecto.sinReadme': 'Este repositorio todavía no tiene README.',
    'sobre.formacion': 'cat formacion.log',
    'sobre.experiencia': 'cat experiencia.log',
    'sobre.certificaciones': 'ls certificaciones/',
    'sobre.idiomas': 'locale -a',
    'sobre.verCredencial': 'Ver credencial',
    'contacto.form.nombre': 'Nombre',
    'contacto.form.email': 'Email',
    'contacto.form.mensaje': 'Mensaje',
    'contacto.form.enviar': 'Enviar mensaje',
    'contacto.form.enviando': 'Enviando…',
    'contacto.form.ok': '¡Mensaje enviado! Te responderé lo antes posible.',
    'contacto.form.error': 'No se ha podido enviar. Prueba otra vez o escríbeme por email.',
    'contacto.o': 'O escríbeme directamente:',
    'contacto.estado': 'estado',
    'infra.titulo': 'Cómo está hecha esta web',
    'lang.cambiar': 'Cambiar idioma',

    'inicio.verProyectos': 'Ver proyectos',
    'inicio.destacados': 'ls proyectos --destacados',
    'inicio.verTodos': 'Ver todos los proyectos →',

    'proyectos.titulo': 'Proyectos',
    'proyectos.cmd': 'ls -la proyectos/',
    'proyectos.lead': 'Prácticas, proyectos de clase y cosas que monto por mi cuenta. Los repositorios de mi GitHub aparecen aquí automáticamente.',
    'proyectos.filtro.todos': 'todos',
    'proyectos.vacio': 'No hay proyectos con este estado.',
    'proyectos.total': 'proyectos',

    'proyecto.volver': '← cd ..',
    'proyecto.codigo': 'Código',
    'proyecto.demo': 'Demo',
    'proyecto.creado': 'Creado',
    'proyecto.actualizado': 'Actualizado',
    'proyecto.desdeGithub': 'desde GitHub',
    'proyecto.sinDescripcion': 'Sin descripción todavía.',
    'proyecto.traduccionPendiente': 'Este proyecto aún no está traducido al inglés.',

    'estado.en-proceso': 'en proceso',
    'estado.acabado': 'acabado',
    'estado.pausado': 'pausado',
    'estado.archivado': 'archivado',
    'estado.idea': 'idea',

    'sobre.titulo': 'Sobre mí',
    'sobre.cmd': 'cat sobre-mi.txt',
    'sobre.habilidades': 'ls habilidades/',

    'contacto.titulo': 'Contacto',
    'contacto.cmd': './contactar.sh',
    'contacto.lead': 'Si quieres hablar de prácticas, un proyecto o cualquier otra cosa, escríbeme.',
    'contacto.ubicacion': 'ubicación',

    'footer.hecho': 'Hecho con Astro · Servido con Caddy en Docker · Desplegado con GitHub Actions',
  },
  en: {
    'nav.inicio': 'home',
    'nav.proyectos': 'projects',
    'nav.sobre': 'about',
    'nav.contacto': 'contact',
    'nav.infra': 'infra',
    'nav.saltar': 'Skip to content',
    'tema.cambiar': 'Toggle light and dark theme',
    'inicio.cv': 'Download CV',
    'proyecto.sinReadme': "This repository doesn't have a README yet.",
    'sobre.formacion': 'cat education.log',
    'sobre.experiencia': 'cat experience.log',
    'sobre.certificaciones': 'ls certifications/',
    'sobre.idiomas': 'locale -a',
    'sobre.verCredencial': 'View credential',
    'contacto.form.nombre': 'Name',
    'contacto.form.email': 'Email',
    'contacto.form.mensaje': 'Message',
    'contacto.form.enviar': 'Send message',
    'contacto.form.enviando': 'Sending…',
    'contacto.form.ok': "Message sent! I'll get back to you as soon as I can.",
    'contacto.form.error': "Couldn't send it. Please try again or email me directly.",
    'contacto.o': 'Or reach me directly:',
    'contacto.estado': 'status',
    'infra.titulo': 'How this site is built',
    'lang.cambiar': 'Change language',

    'inicio.verProyectos': 'See projects',
    'inicio.destacados': 'ls projects --featured',
    'inicio.verTodos': 'See all projects →',

    'proyectos.titulo': 'Projects',
    'proyectos.cmd': 'ls -la projects/',
    'proyectos.lead': 'Lab work, school projects and things I build on my own. Repositories from my GitHub show up here automatically.',
    'proyectos.filtro.todos': 'all',
    'proyectos.vacio': 'No projects with this status.',
    'proyectos.total': 'projects',

    'proyecto.volver': '← cd ..',
    'proyecto.codigo': 'Code',
    'proyecto.demo': 'Demo',
    'proyecto.creado': 'Created',
    'proyecto.actualizado': 'Updated',
    'proyecto.desdeGithub': 'from GitHub',
    'proyecto.sinDescripcion': 'No description yet.',
    'proyecto.traduccionPendiente': 'This project has not been translated into English yet.',

    'estado.en-proceso': 'in progress',
    'estado.acabado': 'finished',
    'estado.pausado': 'paused',
    'estado.archivado': 'archived',
    'estado.idea': 'idea',

    'sobre.titulo': 'About me',
    'sobre.cmd': 'cat about-me.txt',
    'sobre.habilidades': 'ls skills/',

    'contacto.titulo': 'Contact',
    'contacto.cmd': './contact.sh',
    'contacto.lead': 'If you want to talk about an internship, a project or anything else, drop me a message.',
    'contacto.ubicacion': 'location',

    'footer.hecho': 'Built with Astro · Served by Caddy in Docker · Deployed with GitHub Actions',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export function route(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

export function formatDate(date: Date, lang: Lang, withDay = false): string {
  return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    ...(withDay ? { day: 'numeric' } : {}),
  });
}
