function renderPlazas() {
  renderSelector();
  renderPlaza(window.PLAZAS[0]); // primera por defecto
}

function renderSelector() {
  const cont = document.getElementById("plazasSelector");
  cont.innerHTML = "";

  PLAZAS.forEach(plaza => {
    const btn = document.createElement("button");
    btn.className = `
      px-5 py-2 rounded-full border
      hover:bg-[#E09541] hover:text-white transition
    `;
    btn.textContent = plaza.nombre;

    btn.onclick = () => renderPlaza(plaza);
    cont.appendChild(btn);
  });
}

function renderPlaza(plaza) {
  const cont = document.getElementById("plazaContenido");

  cont.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800">
      ${plaza.nombre}
    </h2>

    <p class="text-gray-600">📍 ${plaza.direccion}</p>

    <p class="text-gray-700">
      ${plaza.descripcion}
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      ${plaza.fotos.map(f => `
        <img src="${f}"
             class="rounded-xl shadow-lg object-cover h-56 w-full">
      `).join("")}
    </div>
    <!-- BOTONES -->
    <div class="flex flex-col sm:flex-row gap-4 pt-10">
      <a href="${plaza.mapa}"
         target="_blank"
         class="flex-1 bg-gray-800 text-white py-3 rounded-xl
                text-center font-semibold">
        📍 Ver en el mapa
      </a>

      <button data-vista="pages/contenido/quehacer.html"
        class="flex-1 bg-gray-200 py-3 rounded-xl
               text-center font-semibold">
        ← Volver
      </button>
    </div>
  `;

  initFadeScroll();
}
