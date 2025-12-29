// ===== Config por sección =====
const NAVBAR_CONFIG = {
  inicio: { transparent: true, hideOnScroll: true },
  historia: { transparent: false, hideOnScroll: false },
  default: { transparent: false, hideOnScroll: true }
};

// ✅ Disponible para app.js siempre
window.aplicarNavbarPorSeccion = function aplicarNavbarPorSeccion() {
  const navbar = document.getElementById("navbarMain");
  if (!navbar) return;

  // busca el primer elemento con data-navbar dentro del contenido cargado
  const seccion = document.querySelector("#contenido [data-navbar]") || document.querySelector("[data-navbar]");
  const tipo = seccion?.dataset.navbar || "default";

  const config = NAVBAR_CONFIG[tipo] || NAVBAR_CONFIG.default;

  // fondo inicial según sección
  if (config.transparent) navbar.classList.remove("navbar-scrolled");
  else navbar.classList.add("navbar-scrolled");

  // setea comportamiento hide/show
  navbar.dataset.hideOnScroll = config.hideOnScroll ? "1" : "0";

  // al cambiar de sección, que siempre aparezca
  navbar.classList.remove("navbar-hidden");
};

document.addEventListener("navbarReady", () => {
  console.log("Menu mobile inicializado ✔");

  // ============================
  // ELEMENTOS DEL MENÚ MOBILE
  // ============================
  const btnMenu = document.querySelector("nav button.md\\:hidden");
  const overlay = document.getElementById("menuMobile");
  const panel = document.getElementById("menuPanel");
  const btnCerrar = document.getElementById("btnCerrarMenu");

  const btnSubViaje = document.getElementById("btnSubViaje");
  const submenuViaje = document.getElementById("submenuViaje");
  const flechaViaje = document.getElementById("flechaViaje");

  if (btnMenu && overlay && panel && btnCerrar) {
    // ABRIR MENÚ MOBILE
    btnMenu.addEventListener("click", () => {
      overlay.classList.remove("hidden");
      setTimeout(() => overlay.classList.remove("opacity-0"), 10);
      panel.classList.remove("translate-y-full");
    });

    // FUNCIÓN CERRAR MENÚ
    function cerrarMenu() {
      overlay.classList.add("opacity-0");
      panel.classList.add("translate-y-full");
      setTimeout(() => overlay.classList.add("hidden"), 300);
    }

    btnCerrar.addEventListener("click", cerrarMenu);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) cerrarMenu();
    });

    overlay.querySelectorAll("a").forEach(link =>
      link.addEventListener("click", cerrarMenu)
    );
  }

  // ============================
  // ACORDEÓN "ARMA TU VIAJE"
  // ============================
  if (btnSubViaje && submenuViaje && flechaViaje) {
    btnSubViaje.addEventListener("click", () => {
      if (submenuViaje.style.maxHeight) {
        submenuViaje.style.maxHeight = null;
        flechaViaje.style.transform = "rotate(0deg)";
      } else {
        submenuViaje.style.maxHeight = submenuViaje.scrollHeight + "px";
        flechaViaje.style.transform = "rotate(180deg)";
      }
    });
  }

  // ============================
  // NAVBAR: SCROLL + HIDE/SHOW
  // ============================
  const navbarWrapper = document.getElementById("navbarMain");
  if (!navbarWrapper) return;

  let lastScroll = window.scrollY;
  const delta = 5;
  const hideAfter = 120;

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (Math.abs(currentScroll - lastScroll) < delta) return;

    // scrolled (blanca/negra) cuando baja un poco
    if (currentScroll > 20) navbarWrapper.classList.add("navbar-scrolled");
    else {
      // si la sección pide transparente, lo respetamos
      const tipo = (document.querySelector("#contenido [data-navbar]")?.dataset.navbar) || "default";
      const config = NAVBAR_CONFIG[tipo] || NAVBAR_CONFIG.default;
      if (config.transparent) navbarWrapper.classList.remove("navbar-scrolled");
    }

    // ocultar sólo si la sección lo permite
    if (
      navbarWrapper.dataset.hideOnScroll === "1" &&
      currentScroll > lastScroll &&
      currentScroll > hideAfter
    ) {
      navbarWrapper.classList.add("navbar-hidden");
    }

    // mostrar al subir
    if (currentScroll < lastScroll) {
      navbarWrapper.classList.remove("navbar-hidden");
    }

    lastScroll = currentScroll;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // aplicar config inicial por si ya hay vista cargada
  window.aplicarNavbarPorSeccion();

  // ============================
  // CERRAR MENÚ MOBILE AL NAVEGAR (AJAX O NORMAL)

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");

    if (!link) return;

    // si el menú mobile está abierto, lo cerramos
    const overlay = document.getElementById("menuMobile");
    const panel = document.getElementById("menuPanel");

    if (
      overlay &&
      panel &&
      !overlay.classList.contains("hidden")
    ) {
      overlay.classList.add("opacity-0");
      panel.classList.add("translate-y-full");

      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 300);
    }
  }, true);

});
