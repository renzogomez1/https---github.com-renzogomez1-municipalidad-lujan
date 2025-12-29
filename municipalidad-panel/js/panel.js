document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor");

  function cargarPagina(slug) {

    const url = `pages/${slug}.html`;
    contenedor.style.opacity = "0.4";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Página no encontrada");
        return res.text();
      })
      .then((html) => {
        contenedor.innerHTML = html;
        contenedor.style.opacity = "1";

        // ========================
        //   CARGA DINÁMICA DE JS
        // ========================

        // si ya existe un script anterior, lo saco
        let scriptPrevio = document.getElementById("script-dinamico");
        if (scriptPrevio) scriptPrevio.remove();

        // si la página tiene un JS especial
        if (slug === "eventos") {
          const script = document.createElement("script");
          script.src = "js/eventos.js";
          script.id = "script-dinamico";
          script.onload = () => {
            if (typeof initEventos === "function") {
              initEventos();
            }
          };
          document.body.appendChild(script);
        }

      })
      .catch((err) => {
        console.error(err);
        contenedor.innerHTML = `
          <h2 class="text-xl font-semibold text-red-600">Error</h2>
          <p class="mt-2 text-gray-600">No se pudo cargar la página solicitada.</p>
        `;
      });
  }

  // BOTONES DEL PANEL LATERAL
  document.querySelectorAll(".panel-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const slug = btn.dataset.page;
      if (slug) cargarPagina(slug);
    });
  });

  // ÍTEMS DEL MENÚ MOBILE
  document.querySelectorAll(".menu-item").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const slug = link.dataset.page;
      if (slug) cargarPagina(slug);

      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu) mobileMenu.classList.add("hidden");
    });
  });

});
