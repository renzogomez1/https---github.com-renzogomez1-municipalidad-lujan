document.addEventListener("DOMContentLoaded", () => {

  // Componentes fijos
  includeHTML("navbar", "componentes/navbar.html");
  includeHTML("footer", "componentes/footer.html");

  // 👉 recuperar vista guardada con vencimiento
  const vistaGuardada = obtenerVistaConTiempo(30); // minutos

  if (vistaGuardada) {
    cargarVista(vistaGuardada);
  } else {
    cargarVista("pages/inicio.html");
  }

  // Delegación global AJAX
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-vista]");
    if (!link) return;

    e.preventDefault();
    e.stopPropagation();

    const vista = link.getAttribute("data-vista");
    if (!vista) return;

    cargarVista(vista);
  }, true);

});

/* ============================================================
   LOCALSTORAGE CON TIEMPO LÍMITE
============================================================ */

function guardarVistaConTiempo(vista) {
  const data = {
    vista,
    timestamp: Date.now()
  };
  localStorage.setItem("vistaActual", JSON.stringify(data));
}

function obtenerVistaConTiempo(maxMinutos = 30) {
  const data = localStorage.getItem("vistaActual");
  if (!data) return null;

  try {
    const { vista, timestamp } = JSON.parse(data);

    const ahora = Date.now();
    const diferencia = ahora - timestamp;
    const limite = maxMinutos * 60 * 1000;

    if (diferencia > limite) {
      localStorage.removeItem("vistaActual");
      return null;
    }

    return vista;
  } catch (e) {
    localStorage.removeItem("vistaActual");
    return null;
  }
}

/* ============================================================
   CARGA DE VISTAS AJAX
============================================================ */

function cargarVista(url) {
  const contenido = document.getElementById("contenido");
  if (!contenido) return;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) {
      contenido.innerHTML = `
        <div class="p-6 text-center text-red-500">
          Error al cargar: <b>${url}</b>
        </div>`;
      return;
    }

    // Insertar HTML
    contenido.innerHTML = xhr.responseText;

    // Ejecutar scripts embebidos
    ejecutarScripts(contenido);

    // Animaciones
    initFadeScroll();

    // Navbar por sección
    if (typeof window.aplicarNavbarPorSeccion === "function") {
      window.aplicarNavbarPorSeccion();
    }

    // Inits por vista
    if (url.includes("inicio.html") && typeof window.initInicio === "function") {
      window.initInicio();
    }

    if (url.includes("historia.html") && typeof window.initHistoria === "function") {
      window.initHistoria();
    }

    if (url.includes("gastronomicos.html") && typeof window.initGastronomicos === "function") {
      window.initGastronomicos();
    }

    if (url.includes("alojamientos.html") && typeof window.initAlojamientos === "function") {
      window.initAlojamientos();
    }

    if (url.includes("quehacer.html") && typeof window.initQueHacer === "function") {
      window.initQueHacer();
    }

    if (url.includes("plazas.html") && typeof window.initPlazas === "function") {
      window.initPlazas();
    }

    // Scroll arriba
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Guardar vista con tiempo
    guardarVistaConTiempo(url);
  };

  xhr.onerror = () => {
    contenido.innerHTML = `
      <div class="p-6 text-center text-red-500">
        Error de red al cargar
      </div>`;
  };

  xhr.send();
}

/* ============================================================
   INCLUDE HTML (navbar / footer)
============================================================ */

function includeHTML(id, file) {
  const cont = document.getElementById(id);
  if (!cont) return;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", file, true);

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status >= 300) return;

    cont.innerHTML = xhr.responseText;
    ejecutarScripts(cont);

    if (id === "navbar") {
      document.dispatchEvent(new Event("navbarReady"));
    }
  };

  xhr.send();
}

/* ============================================================
   EJECUTAR SCRIPTS DINÁMICOS
============================================================ */

function ejecutarScripts(element) {
  const scripts = element.querySelectorAll("script");
  scripts.forEach(oldScript => {
    const s = document.createElement("script");

    if (oldScript.src) {
      s.src = oldScript.src;
      s.defer = true;
    } else {
      s.textContent = oldScript.textContent;
    }

    document.body.appendChild(s);
    oldScript.remove();
  });
}

/* ============================================================
   FADE SCROLL
============================================================ */

function initFadeScroll() {
  const elementos = document.querySelectorAll(".fade-scroll");

  if (!("IntersectionObserver" in window)) {
    elementos.forEach(el => el.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elementos.forEach(el => observer.observe(el));
}

/* ============================================================
   INITS POR SECCIÓN
============================================================ */

function initHistoria() {
  initFadeScroll();
  initGaleriaLujan();
}

function initGastronomicos() {
  renderGastronomicos();
  initFadeScroll();
}

function initAlojamientos() {
  renderAlojamientos();
  initFadeScroll();
}

function initQueHacer() {
  renderQueHacer();
  initFadeScroll();
}

function initPlazas() {
  renderPlazas();
  initFadeScroll();
}
