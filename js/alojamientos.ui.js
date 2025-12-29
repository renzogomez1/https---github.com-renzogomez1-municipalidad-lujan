function renderAlojamientos() {
  const grid = document.getElementById("gridAlojamientos");
  if (!grid) return;

  grid.innerHTML = "";

  ALOJAMIENTOS.forEach((a, index) => {
    const card = document.createElement("article");

    card.className = `
      bg-white rounded-2xl shadow-lg overflow-hidden
      transition-all duration-500
      hover:shadow-2xl hover:-translate-y-1
      fade-scroll
    `;

    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <div class="h-56 overflow-hidden bg-gray-200">
        <img src="${a.fotos?.[0] || 'media/placeholder.jpg'}"
          class="w-full h-full object-cover
                transition-transform duration-700
                hover:scale-110">
      </div>

      <div class="p-6 space-y-2">
        <h3 class="text-2xl font-bold text-gray-800">${a.nombre}</h3>
        <p class="text-sm text-gray-600">📍 ${a.direccion}</p>
        <p class="text-sm text-gray-600">🏨 ${a.tipo}</p>

        <button data-alojamiento-id="${a.id}"
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

// =======================
// MODAL + CARRUSEL
// =======================

// =======================
// ABRIR MODAL
// =======================
function abrirModalAlojaById(id) {
  const aloja = window.ALOJAMIENTOS.find(a => a.id === id);
  if (!aloja) return;

  // Carrusel
  carouselImages = aloja.fotos || [];
  carouselIndex = 0;

  const img = document.getElementById("carouselImg");
  if (carouselImages.length > 0 && img) {
    img.src = carouselImages[0];
  }

  if (carouselImages.length > 1) {
    startCarouselAutoplay();
  }

  // Texto principal
  document.getElementById("modalTitulo").textContent = aloja.nombre || "";
  document.getElementById("modalTipo").textContent = aloja.tipo || "";
  document.getElementById("modalDireccion").textContent = `📍 ${aloja.direccion || ""}`;
  document.getElementById("modalDescripcion").textContent = aloja.descripcion || "";

  // Teléfono
  const tel = document.getElementById("modalTelefono");
  if (tel && aloja.telefono) {
    tel.textContent = `📞 ${aloja.telefono}`;
  }

  // Botones
  const btnMapa = document.getElementById("modalMapa");
  if (btnMapa) btnMapa.href = aloja.mapa || "#";

  const btnWp = document.getElementById("modalWhatsapp");
  if (btnWp) btnWp.href = aloja.whatsapp || "#";

  // Servicios
  const serviciosCont = document.getElementById("modalServicios");
  if (serviciosCont) {
    serviciosCont.innerHTML = "";
    (aloja.servicios || []).forEach(servicio => {
      const tag = document.createElement("span");
      tag.className = "px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700";
      tag.textContent = servicio;
      serviciosCont.appendChild(tag);
    });
  }

  // Mostrar modal
  const modal = document.getElementById("modalAloja");
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
  const btn = e.target.closest("[data-alojamiento-id]");
  if (btn) {
    e.preventDefault();
    abrirModalAlojaById(btn.dataset.alojamientoId);
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
  if (e.target.id === "modalAloja" || e.target.closest("[data-modal-close]")) {
    cerrarModalAloja();
  }
});

// =======================
// CERRAR MODAL
// =======================
function cerrarModalAloja() {
  const modal = document.getElementById("modalAloja");
  if (!modal) return;

  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
  stopCarouselAutoplay();
}

// ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarModalAloja();
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
    document.body.style.overflow = "hidden";
  }


});
