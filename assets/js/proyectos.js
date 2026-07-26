/**
 * proyectos.js
 * Renderiza filtros + grilla de proyectos desde data.js.
 * El router llama a renderProyectos() después de cargar el fragmento.
 */

let filtroActivo = "todos";

function renderProyectos() {
  const filtrosContainer = document.getElementById("filtros-container");
  const gridContainer = document.getElementById("proyectos-container");
  if (!filtrosContainer || !gridContainer) return;

  const { categorias, proyectos } = window.REDUCIDO_DATA || {};
  if (!categorias || !proyectos) return;

  // ── FILTROS ──────────────────────────────────────────────
  filtrosContainer.innerHTML = Object.entries(categorias)
    .map(
      ([key, label]) => `
      <button class="filtro-btn${key === filtroActivo ? " active" : ""}" data-categoria="${key}">
        ${label}
      </button>`,
    )
    .join("");

  filtrosContainer.querySelectorAll(".filtro-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filtroActivo = btn.dataset.categoria;
      renderProyectos();
    });
  });

  // ── GRID ─────────────────────────────────────────────────
  const lista =
    filtroActivo === "todos"
      ? proyectos
      : proyectos.filter((p) => p.categoria === filtroActivo);

  if (lista.length === 0) {
    gridContainer.innerHTML = `
      <div class="proyecto-card proyecto-card--proximamente">
        <span>Próximamente en esta categoría</span>
      </div>`;
    return;
  }

  gridContainer.innerHTML = lista
    .map((p) => {
      const categoriaLabel = categorias[p.categoria] || p.categoria;
      const tagsHTML = p.tags.map((t) => `<span>${t}</span>`).join("");
      const demoLink = p.demo
        ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer">Demo →</a>`
        : "";
      const codigoLink = p.codigo
        ? `<a href="${p.codigo}" target="_blank" rel="noopener noreferrer">Código →</a>`
        : "";

      return `
      <article class="proyecto-card">
        <div class="proyecto-img">
          <img src="${p.image}" alt="Captura del proyecto ${p.title}" loading="lazy">
        </div>
        <div class="proyecto-body">
          <span class="proyecto-categoria">${categoriaLabel} · ${p.year}</span>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="proyecto-tags">${tagsHTML}</div>
          <div class="proyecto-links">${demoLink}${codigoLink}</div>
        </div>
      </article>`;
    })
    .join("");
}

// ── STACK (análogo + digital) ──────────────────────────────
function renderStack() {
  const container = document.getElementById("stack-container");
  if (!container) return;

  const herramientas = window.REDUCIDO_DATA?.herramientas;
  if (!herramientas) return;

  const grupo = (titulo, items, modifier) => `
    <div class="stack-grupo ${modifier}">
      <div class="stack-grupo-label">
        <span class="eyebrow">${titulo}</span>
      </div>
      <div class="stack-grid">
        ${items.map((item) => `<div class="stack-item"><span>${item}</span></div>`).join("")}
      </div>
    </div>`;

  container.innerHTML =
    grupo("Análogo", herramientas.analogo, "stack-grupo--analogo") +
    grupo("Digital", herramientas.digital, "stack-grupo--digital");
}

window.renderProyectos = renderProyectos;
window.renderStack = renderStack;
