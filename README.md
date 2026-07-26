# Reducido DEV — Portafolio y estudio de desarrollo web

> Sitio en construcción — versión SPA sin framework, desplegada en Vercel.

---

## El encargo

Reducido DEV es mi propio estudio de desarrollo web, y este sitio es a la vez
el portafolio y la carta de presentación del negocio. El encargo me lo hice
a mí mismo: antes de este proyecto, mi presencia digital era una única
página estática ([primera versión acá](https://jboschlagos.github.io/19-PortafolioPersonal/))
con tres proyectos listados a mano, sin lugar para crecer ni para contar de
dónde vengo.

Llegué al desarrollo web después de pasar por la arquitectura y la
carpintería. Esa historia no es un dato de color: es la lógica con la que
trabajo. Medir dos veces y cortar una, entender el problema antes de mover
una sola pieza — esas costumbres de oficio se trasladaron directo al código.
El sitio necesitaba reflejar esa continuidad sin diluir el mensaje central:
Reducido DEV ofrece desarrollo web, no carpintería ni arquitectura.

El otro requisito era de crecimiento. Reducido DEV construye sitios a medida
para artistas y creadores (músicos, artistas visuales, actores, entre otros)
que necesitan ampliar su difusión al mundo digital. Cada nuevo proyecto de
ese tipo debía poder sumarse al portafolio sin rediseñar nada — solo
agregando datos.

---

## Cómo se resolvió

La solución reutiliza la arquitectura que ya había probado en un proyecto
anterior ([Isma Rivera](https://isma-rivera.vercel.app)): una
**Single Page Application sin framework**, con un router propio en
JavaScript puro que carga fragmentos HTML en un contenedor `#contenido` sin
recargar la página.

Sobre esa base se construyeron dos decisiones específicas de este sitio:

**Datos centralizados y categorizados.** Todo el contenido de Proyectos y
Herramientas vive en un único archivo, `data.js`. Agregar un nuevo proyecto
(por ejemplo, la próxima plantilla para un actor o un artista visual) es
sumar un objeto al array `proyectos` con su categoría — el filtro de la
sección se genera solo a partir de esas categorías, sin tocar HTML ni CSS.

**Narrativa de oficio sin perder el foco comercial.** La sección
Herramientas separa explícitamente lo análogo (las herramientas de
carpintería) de lo digital (el stack real de desarrollo), con jerarquía
visual distinta: el grupo análogo se muestra con menos peso (borde
punteado, tipografía en cursiva) para que quede claro que es contexto, no
un servicio ofrecido.

---

## Arquitectura

```
/
├── index.html                  → Entrada única (SPA shell)
│
├── componentes/                → Fragmentos HTML por sección
│   ├── navbar.html
│   ├── footer.html
│   ├── home.html
│   ├── estudio.html            → Pendiente: recorrido arquitectura/carpintería/dev
│   ├── proyectos.html
│   ├── stack.html
│   └── contacto.html           → Pendiente: definir email o formulario
│
├── vercel.json                 → Rewrites SPA + headers de caché
│
└── assets/
    ├── css/
    │   ├── style.css           → Variables globales, navbar, footer
    │   ├── home.css
    │   ├── estudio.css
    │   ├── proyectos.css
    │   └── stack.css
    │
    ├── js/
    │   ├── data.js              → Fuente única: proyectos, categorías, herramientas
    │   ├── componentes.js        → Router SPA + carga de componentes
    │   └── proyectos.js          → Renderiza grid de proyectos y stack
    │
    └── img/
        ├── proyectos/            → Capturas de cada proyecto (pendiente subir)
        └── logo/
```

### Flujo de navegación

1. El browser carga `index.html` una sola vez.
2. `componentes.js` monta navbar y footer en sus contenedores permanentes.
3. El router detecta el hash de la URL (`#proyectos`, `#stack`, etc.) y
   carga el fragmento correspondiente en `#contenido`.
4. Si la sección requiere datos dinámicos, el router llama a
   `renderProyectos()` o `renderStack()`, que leen `data.js`.
5. `document.title` se actualiza en cada navegación desde el mapa
   `PAGE_TITLES` en `componentes.js`.
6. El historial del browser se actualiza con `history.pushState()`,
   preservando los botones atrás/adelante.

### Datos centralizados

```js
// data.js — agregar un proyecto nuevo
{
  title: "Nombre del proyecto",
  categoria: "musico", // debe existir en categorias{}
  year: 2026,
  description: "",
  image: "/assets/img/proyectos/archivo.jpg",
  tags: ["JavaScript", "CSS"],
  demo: "https://...",
  codigo: "https://github.com/...",
}
```

Si la categoría es nueva (por ejemplo, una plantilla para un artista
visual), se agrega también a `categorias{}` en el mismo archivo — el botón
de filtro aparece solo.

### Sistema de color

Toda la identidad visual está resuelta en cinco variables CSS, en
`assets/css/style.css` dentro de `:root`: `--hueso`, `--hueso-suave`,
`--tinta`, `--acento` y `--acento-suave`. Cambiar el acento (probado en
distintas variantes durante el desarrollo: cobre, verde musgo, azul,
turquesa) es editar esas dos líneas — el resto del sitio las hereda.

---

## Estado del sitio

- [x] Estructura SPA y router
- [x] Home
- [x] Proyectos (con filtros por categoría, datos reales cargados)
- [x] Stack (análogo + digital)
- [ ] Estudio — falta redactar el recorrido arquitectura → carpintería → desarrollo web
- [ ] Contacto — falta definir canal (email/formulario)
- [ ] Subir imágenes reales de cada proyecto

---

## Despliegue

El sitio es 100% estático, sin backend ni proceso de build. Desplegado en
**Vercel**, con `vercel.json` resolviendo el rewrite necesario para que el
hash routing funcione al entrar desde un link externo, y cache de un año
para los assets estáticos (CSS, JS, imágenes).

---

## Tecnologías

| Capa                 | Herramienta                                                                         |
| -------------------- | ----------------------------------------------------------------------------------- |
| Maquetado            | HTML5 semántico                                                                     |
| Estilos              | CSS3 con custom properties nativas                                                  |
| Lógica               | JavaScript ES6+ vanilla — sin frameworks ni bundlers                                |
| Tipografía           | Space Grotesk (títulos) · Inter (cuerpo) · JetBrains Mono (metadata) — Google Fonts |
| Despliegue           | Vercel — archivos estáticos, sin build step                                         |
| Control de versiones | Git + GitHub                                                                        |

---

_Reducido DEV — 2026_
