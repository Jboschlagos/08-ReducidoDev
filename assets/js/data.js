/**
 * data.js — Fuente única de datos de Reducido DEV
 *
 * Para agregar un proyecto nuevo: sumar un objeto al array `proyectos`.
 * `categoria` debe ser una de las keys definidas en `categorias`.
 * Si la categoría es nueva, agregarla también a `categorias`.
 */

const REDUCIDO_DATA = {
  // ── CATEGORÍAS (filtros de la sección Proyectos) ───────────
  categorias: {
    todos: "Todos",
    musico: "Músicos",
    "artista-visual": "Artistas visuales",
    actor: "Actores",
    otro: "Otros proyectos",
  },

  // ── PROYECTOS ───────────────────────────────────────────────
  proyectos: [
    {
      title: "Isma Rivera",
      categoria: "musico",
      year: 2026,
      description:
        "Portafolio para el Poeta Cantor Isma Rivera, con reproductor multimedia persistente y ecosistema completo del artista.",
      image: "/assets/img/proyectos/ismaRivera01.jpeg",
      tags: ["JavaScript", "CSS", "Vercel"],
      demo: "https://isma-rivera.vercel.app/#home",
      codigo: "https://github.com/Jboschlagos/IsmaRivera",
    },
    {
      title: "Javiera Vio",
      categoria: "musico",
      year: 2025,
      description:
        "Portafolio para la productora Javiera Vio, con reproductor multimedia y ecosistema del artista.",
      image: "/assets/img/proyectos/javivio01.jpg",
      tags: ["JavaScript", "CSS", "HTML"],
      demo: "https://jboschlagos.github.io/02-JavieraVio/#home",
      codigo: "https://github.com/Jboschlagos/02-JavieraVio",
    },
    {
      title: "Tocar Madera",
      categoria: "otro",
      year: 2025,
      description:
        "Marketplace colaborativo para artesanos, con autenticación, carrito de compras y geolocalización.",
      image: "/assets/img/proyectos/tocarMadera01.jpeg",
      tags: ["Node.js", "Express", "PostgreSQL"],
      demo: "https://portafolio-m8-tocar-madera.vercel.app/",
      codigo: "https://github.com/Jboschlagos/portafolioM8_TocarMadera",
    },
  ],

  // ── HERRAMIENTAS ──────────────────────────────────────────
  // Dos grupos: lo análogo (carpintería) y lo digital (stack real de desarrollo).
  // Reducido DEV es, en el fondo, solo desarrollo web — el grupo "análogo"
  // es narrativa de oficio, no un servicio que se ofrezca.
  herramientas: {
    analogo: [
      "Escuadra combinación",
      "Lápiz de carpintero",
      "Taladro",
      "Serrucho eléctrico",
      "Serrucho de mano",
      "Prensas",
      "Escofina",
    ],
    digital: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Vercel",
    ],
  },
};

window.REDUCIDO_DATA = REDUCIDO_DATA;
