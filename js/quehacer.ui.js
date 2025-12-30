let qhIndex = 0;
let qhFotos = [];

function renderQueHacer() {
  const grid = document.getElementById("gridQueHacer");
  if (!grid) return;

  grid.innerHTML = "";

  QUE_HACER.forEach(item => {
    const card = document.createElement("article");
    card.className = `
      bg-white rounded-2xl shadow-lg overflow-hidden
      hover:shadow-2xl hover:-translate-y-1
      transition-all duration-500 fade-scroll
    `;

    card.innerHTML = `
      <div class="h-56 overflow-hidden">
        <img src="${item.fotos[0]}"
             class="w-full h-full object-cover
                    hover:scale-110 transition duration-700">
      </div>

      <div class="p-6 space-y-3">
        <h3 class="text-2xl font-bold text-gray-800">${item.titulo}</h3>
        <p class="text-sm text-gray-600">${item.descripcion}</p>

        <button data-qh-id="${item.id}" data-vista="${item.url}"
          class="mt-4 inline-flex items-center gap-1
                 text-orange-600 font-semibold
                 hover:text-orange-800 transition">
          Ver más →
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  initFadeScroll();
}

// MODAL
function abrirModalQueHacer(id) {
  const item = window.QUE_HACER.find(i => i.id === id);
  if (!item) return;

  qhFotos = item.fotos;
  qhIndex = 0;

  document.getElementById("qhCarouselImg").src = qhFotos[0];
  document.getElementById("qhTitulo").textContent = item.titulo;
  document.getElementById("qhCategoria").textContent = item.categoria;
  document.getElementById("qhDescripcion").textContent = item.descripcion;
  document.getElementById("qhMapa").href = item.mapa;

  const modal = document.getElementById("modalQueHacer");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

// Carrusel
function moverQH(dir) {
  qhIndex = (qhIndex + dir + qhFotos.length) % qhFotos.length;
  document.getElementById("qhCarouselImg").src = qhFotos[qhIndex];
}

// Eventos
document.addEventListener("click", e => {

  const btn = e.target.closest("[data-qh-id]");
  if (btn) abrirModalQueHacer(btn.dataset.qhId);

  if (e.target.id === "qhNext") moverQH(1);
  if (e.target.id === "qhPrev") moverQH(-1);

  if (e.target.closest("[data-modal-close]") ||
      e.target.id === "modalQueHacer") {
    cerrarModalQH();
  }
});

function cerrarModalQH() {
  const modal = document.getElementById("modalQueHacer");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}
