function initGaleriaLujan() {
  const carrusel = document.getElementById("carouselGaleria");
  const btnNext = document.getElementById("galeriaNext");
  const btnPrev = document.getElementById("galeriaPrev");

  if (!carrusel) return;

  const imagenes = [
    "media/historia/galeria/lujan.jpeg",
    "media/historia/galeria/lujan1.jpg",
    "media/historia/galeria/lujan2.jpg",
    "media/historia/galeria/lujan3.jpeg",
    "media/historia/galeria/lujan4.jpg",
    "media/historia/galeria/lujan5.jpg",
    "media/historia/galeria/lujan6.jpg",
    "media/historia/galeria/lujan7.jpg",
    "media/historia/galeria/lujan8.jpg",
    "media/historia/galeria/lujan9.jpg",
    "media/historia/galeria/lujan10.jpg",
    "media/historia/galeria/lujan11.jpg",
    "media/historia/galeria/lujan12.jpg",
    "media/historia/galeria/lujan13.jpeg",
    "media/historia/galeria/lujan14.jpeg",
    "media/historia/galeria/lujan15.jpeg"
  ];

  carrusel.innerHTML = "";

    imagenes.forEach((src, index) => {
        const card = document.createElement("div");
        card.className = `
            min-w-[260px] md:min-w-[320px]
            h-[180px] md:h-[220px]
            snap-center overflow-hidden rounded-2xl
            shadow-lg cursor-pointer
        `;

        card.innerHTML = `
            <img src="${src}"
            class="w-full h-full object-cover
                    hover:scale-110 transition duration-700">
        `;

        card.addEventListener("click", () => {
            openLightbox(imagenes, index);
        });

        carrusel.appendChild(card);
    });


  /* =========================
     BOTONES MANUALES
  ========================= */
  const step = 340;

  if (btnNext) {
    btnNext.onclick = () => {
      carrusel.scrollBy({ left: step, behavior: "smooth" });
    };
  }

  if (btnPrev) {
    btnPrev.onclick = () => {
      carrusel.scrollBy({ left: -step, behavior: "smooth" });
    };
  }

  /* =========================
     AUTOPLAY
  ========================= */
  let autoplay = setInterval(() => {
    carrusel.scrollBy({ left: step, behavior: "smooth" });
  }, 4000);

  // Pausar al pasar el mouse
  carrusel.addEventListener("mouseenter", () => {
    clearInterval(autoplay);
  });

  carrusel.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => {
      carrusel.scrollBy({ left: step, behavior: "smooth" });
    }, 4000);
  });
}

let lightboxIndex = 0;
let lightboxImages = [];

// ABRIR
function openLightbox(images, index) {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");

  lightboxImages = images;
  lightboxIndex = index;

  img.src = lightboxImages[lightboxIndex];
  box.classList.remove("hidden");

  document.body.style.overflow = "hidden";
}

// MOSTRAR
function showLightboxImage() {
  const img = document.getElementById("lightboxImg");
  img.src = lightboxImages[lightboxIndex];
}

// CERRAR
function closeLightbox() {
  const box = document.getElementById("lightbox");
  box.classList.add("hidden");
  document.body.style.overflow = "";
}

// EVENTOS
document.addEventListener("click", (e) => {

  if (e.target.id === "lightboxClose") {
    closeLightbox();
  }

  if (e.target.id === "lightboxNext") {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    showLightboxImage();
  }

  if (e.target.id === "lightboxPrev") {
    lightboxIndex =
      (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    showLightboxImage();
  }

  if (e.target.id === "lightbox") {
    closeLightbox();
  }
});

// TECLADO
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    showLightboxImage();
  }
  if (e.key === "ArrowLeft") {
    lightboxIndex =
      (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    showLightboxImage();
  }
});
