function renderGastronomicos() {
  const grid = document.getElementById("gridGastronomicos");
  if (!grid) return;

  grid.innerHTML = "";

  GASTRONOMICOS.forEach((gastro, index) => {
    const card = document.createElement("article");

    card.className = `
      bg-white rounded-2xl shadow-lg overflow-hidden
      hover:shadow-2xl transition-all duration-500
      fade-scroll gastro-card
    `;

    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <div class="h-56 overflow-hidden">
        <img src="${gastro.fotos[0]}"
             alt="${gastro.nombre}"
             class="w-full h-full object-cover
                    hover:scale-110 transition duration-700">
      </div>

      <div class="p-6 space-y-2">
        <h3 class="text-2xl font-bold text-gray-800">
          ${gastro.nombre}
        </h3>

        <p class="text-sm text-gray-600">
          ${gastro.direccion}
        </p>

        <p class="text-sm text-gray-600">
          ${gastro.tipo}
        </p>

        <p class="text-sm text-gray-600">
          ${gastro.horario}
        </p>

        <button
          data-gastro-id="${gastro.id}"
          class="mt-4 inline-block text-orange-600 font-semibold
                 hover:text-orange-800 transition">
          Ver más →
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // relanza animaciones
  initFadeScroll();
}

// =======================
// MODAL + CARRUSEL
// =======================

let carouselIndex = 0;
let carouselImages = [];
let carouselInterval = null;
const CAROUSEL_TIME = 4000;

// =======================
// ABRIR MODAL
// =======================
function abrirModalGastroById(id) {
  const gastro = window.GASTRONOMICOS.find(g => g.id === id);
  if (!gastro) return;

  // Carrusel
  carouselImages = gastro.fotos || [];
  carouselIndex = 0;

  const img = document.getElementById("carouselImg");
  if (carouselImages.length > 0 && img) {
    img.src = carouselImages[0];
  }

  if (carouselImages.length > 1) {
    startCarouselAutoplay();
  }

  // Texto principal
  document.getElementById("modalTitulo").textContent = gastro.nombre || "";
  document.getElementById("modalTipo").textContent = gastro.tipo || "";
  document.getElementById("modalDireccion").textContent = `📍 ${gastro.direccion || ""}`;
  document.getElementById("modalHorario").textContent = `⏰ ${gastro.horario || ""}`;
  document.getElementById("modalDescripcion").textContent = gastro.descripcion || "";

  // Teléfono
  const tel = document.getElementById("modalTelefono");
  if (tel && gastro.telefono) {
    tel.textContent = `📞 ${gastro.telefono}`;
  }

  // Botones
  const btnMapa = document.getElementById("modalMapa");
  if (btnMapa) btnMapa.href = gastro.mapa || "#";

  const btnWp = document.getElementById("modalWhatsapp");
  if (btnWp) btnWp.href = gastro.whatsapp || "#";

  // Servicios
  const serviciosCont = document.getElementById("modalServicios");
  if (serviciosCont) {
    serviciosCont.innerHTML = "";
    (gastro.servicios || []).forEach(servicio => {
      const tag = document.createElement("span");
      tag.className = "px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700";
      tag.textContent = servicio;
      serviciosCont.appendChild(tag);
    });
  }

  // Mostrar modal
  const modal = document.getElementById("modalGastro");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}


// =======================
// MOSTRAR IMAGEN
// =======================
function showCarouselImage() {
  const img = document.getElementById("carouselImg");
  if (!img || carouselImages.length === 0) return;

  img.classList.add("opacity-0");

  setTimeout(() => {
    img.src = carouselImages[carouselIndex];
    img.classList.remove("opacity-0");
  }, 200);
}

// =======================
// AUTOPLAY
// =======================
function startCarouselAutoplay() {
  stopCarouselAutoplay();
  carouselInterval = setInterval(() => {
    carouselIndex = (carouselIndex + 1) % carouselImages.length;
    showCarouselImage();
  }, CAROUSEL_TIME);
}

function stopCarouselAutoplay() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

// =======================
// EVENTOS GLOBALES
// =======================
document.addEventListener("click", (e) => {

  // Abrir modal
  const btn = e.target.closest("[data-gastro-id]");
  if (btn) {
    e.preventDefault();
    abrirModalGastroById(btn.dataset.gastroId);
    return;
  }

  // Flecha siguiente
  if (e.target.id === "carouselNext") {
    stopCarouselAutoplay();
    carouselIndex = (carouselIndex + 1) % carouselImages.length;
    showCarouselImage();
    return;
  }

  // Flecha anterior
  if (e.target.id === "carouselPrev") {
    stopCarouselAutoplay();
    carouselIndex =
      (carouselIndex - 1 + carouselImages.length) % carouselImages.length;
    showCarouselImage();
    return;
  }

  // Cerrar modal
  if (e.target.id === "modalGastro" || e.target.closest("[data-modal-close]")) {
    cerrarModalGastro();
  }
});

// =======================
// CERRAR MODAL
// =======================
function cerrarModalGastro() {
  const modal = document.getElementById("modalGastro");
  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
  stopCarouselAutoplay();
}

// ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarModalGastro();
});



//galeria completa
function abrirGaleriaCompleta() {
  const cont = document.getElementById("galeriaCompleta");
  const grid = document.getElementById("galeriaGrid");

  if (!cont || !grid) return;

  grid.innerHTML = "";

  carouselImages.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.className = `
      w-full h-64 object-cover rounded-xl
      hover:scale-105 transition cursor-pointer
    `;
    grid.appendChild(img);
  });

  cont.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

document.addEventListener("click", (e) => {

  if (e.target.id === "btnGaleriaCompleta") {
    abrirGaleriaCompleta();
  }

  if (e.target.id === "cerrarGaleria") {
    document.getElementById("galeriaCompleta").classList.add("hidden");
    document.body.style.overflow = "";
  }

});
