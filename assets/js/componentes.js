/**
 * componentes.js — Router SPA Reducido DEV
 * Adaptado del patrón usado en el proyecto Isma Rivera.
 *
 * Carga navbar y footer una sola vez.
 * Navega entre páginas cargando fragmentos HTML en #contenido
 * sin recargar el browser.
 */

const PAGE_TITLES = {
  home: "Reducido DEV | Desarrollo Web",
  estudio: "Estudio | Reducido DEV",
  proyectos: "Proyectos | Reducido DEV",
  stack: "Stack | Reducido DEV",
  contacto: "Contacto | Reducido DEV",
};

// ── Cargar componente estático (navbar / footer) ───────────────
async function loadComponent(containerId, url) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`No se pudo cargar: ${url}`);
    container.innerHTML = await resp.text();
  } catch (err) {
    console.error(`[componentes.js] ${err.message}`);
  }
}

// ── Cargar página en #contenido ────────────────────────────────
async function loadPage(page) {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;

  document.title = PAGE_TITLES[page] || "Reducido DEV | Desarrollo Web";

  try {
    const resp = await fetch(`/componentes/${page}.html`);
    if (!resp.ok) throw new Error(`Página no encontrada: ${page}`);
    contenido.innerHTML = await resp.text();

    window.scrollTo(0, 0);

    document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
      link.classList.toggle("active", link.dataset.page === page);
    });

    if (page === "proyectos" && typeof renderProyectos === "function") {
      renderProyectos();
    }
    if (page === "stack" && typeof renderStack === "function") {
      renderStack();
    }

    bindLinks();

    const menu = document.getElementById("navbarMenu");
    if (menu) menu.classList.remove("show");

    history.pushState({ page }, "", `#${page}`);
  } catch (err) {
    console.error(`[router] ${err.message}`);
  }
}

// ── Registrar clicks en links con data-page ────────────────────
function bindLinks() {
  document.querySelectorAll("[data-page]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      loadPage(el.dataset.page);
    });
  });
}

// ── Menú hamburguesa ────────────────────────────────────────────
function initHamburger() {
  const toggler = document.querySelector(".navbar-toggler");
  const menu = document.getElementById("navbarMenu");
  if (toggler && menu) {
    toggler.addEventListener("click", () => {
      menu.classList.toggle("show");
    });
  }
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("navbar-container", "/componentes/navbar.html");
  initHamburger();

  await loadComponent("footer-container", "/componentes/footer.html");

  const page = location.hash.replace("#", "") || "home";
  await loadPage(page);

  bindLinks();
});

// ── Botón atrás/adelante del browser ───────────────────────────
window.addEventListener("popstate", (e) => {
  const page = e.state?.page || "home";
  loadPage(page);
});
