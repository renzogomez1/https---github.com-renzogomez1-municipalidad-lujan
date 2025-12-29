/* ============================================================
   MAPA TURÍSTICO - LUJÁN (Leaflet)
   Panel escritorio + Panel mobile + Modal chico + Modal grande
============================================================ */

let map;
let lugares = {};                 // {Categoria: [lugares]}
const markersByKey = new Map();   // key: "Categoria|Nombre" => marker

// Carrusel modal grande
let carruselIndex = 0;
let carruselFotos = [];
let carruselLugar = null;
let carruselMarker = null;

document.getElementById("btnVolverInicio")?.addEventListener("click", () => {
  window.location.href = "../";
});

document.addEventListener("DOMContentLoaded", () => {
  // 1) Crear mapa
  map = L.map("map", { zoomControl: true }).setView([-32.3670843,-65.9423965], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);

  // 2) Datos (⚠️ ajustá rutas según tu estructura real)
  //    Si tu HTML está en /pages/mapa.html, lo normal es ../media/...
  lugares = {
    Plazas: [
      {
        nombre: "Plazoleta Paseo de la Mujer",
        categoria: "Plazas",
        coord: [-32.3657, -65.9356],
        icono: "../media/icon/verde.png",
        desc: "El corazón del pueblo, ideal para descansar y disfrutar del día.",
        descLarga:
          "La plaza principal es el punto de encuentro de Luján. Ideal para caminar, descansar y disfrutar en familia. Cerca vas a encontrar comercios y lugares tradicionales.",
        fotos: ["../media/plaza1.jpg", "../media/plaza2.jpg", "../media/plaza3.jpg"],
      },
      {
        nombre: "Plaza San Martin",
        categoria: "Plazas",
        coord: [-32.36439742601681, -65.93301856075682],
        icono: "../media/icon/verde.png",
        desc: "El corazón del pueblo, ideal para descansar y disfrutar del día.",
        descLarga:
          "La plaza principal es el punto de encuentro de Luján. Ideal para caminar, descansar y disfrutar en familia. Cerca vas a encontrar comercios y lugares tradicionales.",
        fotos: ["../media/plaza1.jpg", "../media/plaza2.jpg", "../media/plaza3.jpg"],
      },
      {
        nombre: "Plaza Mitre",
        categoria: "Plazas",
        coord: [-32.37508152471552, -65.93003377607265],
        icono: "../media/icon/verde.png",
        desc: "El corazón del pueblo, ideal para descansar y disfrutar del día.",
        descLarga:
          "La plaza principal es el punto de encuentro de Luján. Ideal para caminar, descansar y disfrutar en familia. Cerca vas a encontrar comercios y lugares tradicionales.",
        fotos: ["../media/plaza1.jpg", "../media/plaza2.jpg", "../media/plaza3.jpg"],
      },
      {
        nombre: "Plaza Los Naranjos",
        categoria: "Plazas",
        coord: [-32.36427260132733, -65.94127434184749],
        icono: "../media/icon/verde.png",
        desc: "El corazón del pueblo, ideal para descansar y disfrutar del día.",
        descLarga:
          "La plaza principal es el punto de encuentro de Luján. Ideal para caminar, descansar y disfrutar en familia. Cerca vas a encontrar comercios y lugares tradicionales.",
        fotos: ["../media/plaza1.jpg", "../media/plaza2.jpg", "../media/plaza3.jpg"],
      },
      {
        nombre: "Plaza B° 42",
        categoria: "Plazas",
        coord: [-32.367480599235286, -65.92860787293546],
        icono: "../media/icon/verde.png",
        desc: "El corazón del pueblo, ideal para descansar y disfrutar del día.",
        descLarga:
          "La plaza principal es el punto de encuentro de Luján. Ideal para caminar, descansar y disfrutar en familia. Cerca vas a encontrar comercios y lugares tradicionales.",
        fotos: ["../media/plaza1.jpg", "../media/plaza2.jpg", "../media/plaza3.jpg"],
      },
      {
        nombre: "Plaza Infantil",
        categoria: "Plazas",
        coord: [-32.38243730222338, -65.92565369842593],
        icono: "../media/icon/verde.png",
        desc: "El corazón del pueblo, ideal para descansar y disfrutar del día.",
        descLarga:
          "La plaza principal es el punto de encuentro de Luján. Ideal para caminar, descansar y disfrutar en familia. Cerca vas a encontrar comercios y lugares tradicionales.",
        fotos: ["../media/plaza1.jpg", "../media/plaza2.jpg", "../media/plaza3.jpg"],
      },
      {
        nombre: "Plazoleta Paseo de la Virgen",
        categoria: "Plazas",
        coord: [-32.36899457713163, -65.95064320249583],
        icono: "../media/icon/verde.png",
        desc: "El corazón del pueblo, ideal para descansar y disfrutar del día.",
        descLarga:
          "La plaza principal es el punto de encuentro de Luján. Ideal para caminar, descansar y disfrutar en familia. Cerca vas a encontrar comercios y lugares tradicionales.",
        fotos: ["../media/plaza1.jpg", "../media/plaza2.jpg", "../media/plaza3.jpg"],
      },
      {
        nombre: "Plazoleta Los Pejes",
        categoria: "Plazas",
        coord: [-32.35951796051481, -65.94716434080915],
        icono: "../media/icon/verde.png",
        desc: "El corazón del pueblo, ideal para descansar y disfrutar del día.",
        descLarga:
          "La plaza principal es el punto de encuentro de Luján. Ideal para caminar, descansar y disfrutar en familia. Cerca vas a encontrar comercios y lugares tradicionales.",
        fotos: ["../media/plaza1.jpg", "../media/plaza2.jpg", "../media/plaza3.jpg"],
      },
    ],
    "Río": [
      {
        nombre: "Río Luján",
        categoria: "Río",
        coord: [-32.39153201770135, -65.91648443679509],
        icono: "../media/icon-rio.png",
        desc: "Hermoso río natural con vistas y zonas para picnic.",
        descLarga:
          "Zona natural para pasar el día, sacar fotos y hacer picnic. Recomendado ir con calzado cómodo y respetar el entorno.",
        fotos: ["../media/rio1.jpg", "../media/rio2.jpg"],
      },
      {
        nombre: "Costanera Rio Luján",
        categoria: "Río",
        coord: [-32.397094382702605, -65.9123645637268],
        icono: "../media/icon-rio.png",
        desc: "Hermoso río natural con vistas y zonas para picnic.",
        descLarga:
          "Zona natural para pasar el día, sacar fotos y hacer picnic. Recomendado ir con calzado cómodo y respetar el entorno.",
        fotos: ["../media/rio1.jpg", "../media/rio2.jpg"],
      },
      {
        nombre: "Río Luján",
        categoria: "Río",
        coord: [-32.39153201770135, -65.91648443679509],
        icono: "../media/icon-rio.png",
        desc: "Hermoso río natural con vistas y zonas para picnic.",
        descLarga:
          "Zona natural para pasar el día, sacar fotos y hacer picnic. Recomendado ir con calzado cómodo y respetar el entorno.",
        fotos: ["../media/rio1.jpg", "../media/rio2.jpg"],
      },
    ],
    Camping: [
      {
        nombre: "Camping Municipal",
        categoria: "Camping",
        coord: [-33.0044, -66.34],
        icono: "../media/icon-camping.png",
        desc: "Zonas verdes, parrillas y espacio para acampar.",
        descLarga:
          "Espacio con áreas verdes y sectores para pasar el día. Ideal para grupos y familias. Consultá disponibilidad en temporadas altas.",
        fotos: ["../media/camping1.jpg", "../media/camping2.jpg"],
      },
    ],
    Iglesias: [
      {
        nombre: "Iglesia Nuestra Señora de Luján",
        categoria: "Iglesias",
        coord: [-33.0022, -66.3491],
        icono: "../media/icon-iglesia.png",
        desc: "Edificio histórico y punto de referencia del pueblo.",
        descLarga:
          "Un punto histórico y cultural de Luján. Su arquitectura destaca y suele ser parte del recorrido turístico principal.",
        fotos: ["../media/iglesia1.jpg", "../media/iglesia2.jpg"],
      },
    ],
  };

  // 3) Crear markers UNA SOLA VEZ
  crearMarkers();

  // 4) Cargar paneles
  cargarPanelEscritorio();
  inicializarPanelMobile();

  // 5) Fix Leaflet: si el contenedor cambia (responsive), recalcula tamaño
  setTimeout(() => map.invalidateSize(), 200);
  window.addEventListener("resize", () => setTimeout(() => map.invalidateSize(), 150));

    panelHeader.addEventListener("click", () => {
      panelContent.classList.toggle("expanded");
      flechaMobile.textContent =
        panelContent.classList.contains("expanded") ? "▼" : "▲";

        setTimeout(() => map.invalidateSize(), 300);
    });
});

/* ============================================================
   Helpers
============================================================ */

function keyLugar(categoria, nombre) {
  return `${categoria}|${nombre}`;
}

function iconoLeaflet(img) {
  return L.icon({
    iconUrl: img,
    iconSize: [20, 20],
    iconAnchor: [15, 15],
  });
}

function safeEl(id) {
  return document.getElementById(id);
}

/* ============================================================
   Markers
============================================================ */

function crearMarkers() {
  markersByKey.clear();

  Object.keys(lugares).forEach((categoria) => {
    lugares[categoria].forEach((lugar) => {
      // Marker
      const marker = L.marker(lugar.coord, { icon: iconoLeaflet(lugar.icono) }).addTo(map);

      // Popup (opcional)
      marker.bindPopup(`
        <div class="text-center">
          <img src="${(lugar.fotos && lugar.fotos[0]) ? lugar.fotos[0] : lugar.foto || ""}" class="w-full rounded-lg mb-2" />
          <h3 class="text-lg font-bold">${lugar.nombre}</h3>
          <p class="text-gray-600 text-sm">${lugar.desc}</p>
        </div>
      `);

      // Click en marker → modal chico
      marker.on("click", () => {
        showInfo(lugar, marker);
      });

      markersByKey.set(keyLugar(categoria, lugar.nombre), marker);
    });
  });
}

/* ============================================================
   MODAL CHICO (Vista rápida)
============================================================ */

function showInfo(lugar, marker) {
  const modal = safeEl("modalInfo");
  if (!modal) return;

  // Elementos
  const t = safeEl("modalTitulo");
  const c = safeEl("modalCategoria");
  const d = safeEl("modalDesc");
  const img = safeEl("modalImg");
  const btnMapa = safeEl("btnIrMapaModal");
  const btnMas = safeEl("btnVerMas");
  const btnCerrar = safeEl("cerrarModal");

  // Si te falta algún ID en el HTML, evitamos romper
  if (t) t.textContent = lugar.nombre || "";
  if (c) c.textContent = lugar.categoria || "";
  if (d) d.textContent = lugar.desc || "";

  const primeraFoto =
    (lugar.fotos && lugar.fotos.length ? lugar.fotos[0] : lugar.foto) || "";
  if (img) img.src = primeraFoto;

  // Mostrar
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Ver ubicación
  if (btnMapa) {
    btnMapa.onclick = () => {
      map.setView(lugar.coord, 16);
      if (marker) marker.openPopup();
      cerrarModalChico();
    };
  }

  // Ver más
  if (btnMas) {
    btnMas.onclick = () => {
      cerrarModalChico();
      showInfoFull(lugar, marker);
    };
  }

  // Cerrar
  if (btnCerrar) btnCerrar.onclick = cerrarModalChico;

  // Click fuera
  modal.onclick = (e) => {
    if (e.target === modal) cerrarModalChico();
  };
}

function cerrarModalChico() {
  const modal = safeEl("modalInfo");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

/* ============================================================
   MODAL GRANDE (Ficha completa + Carrusel)
============================================================ */

function showInfoFull(lugar, marker) {
  const modal = safeEl("modalInfoFull");
  if (!modal) return;

  carruselLugar = lugar;
  carruselMarker = marker;

  const t = safeEl("fullTitulo");
  const c = safeEl("fullCategoria");
  const d = safeEl("fullDesc");
  const img = safeEl("fullImg");

  if (t) t.textContent = lugar.nombre || "";
  if (c) c.textContent = lugar.categoria || "";

  // Usa descLarga si existe
  const texto = lugar.descLarga || lugar.desc || "";
  if (d) d.textContent = texto;

  // Fotos carrusel
  carruselFotos = (lugar.fotos && lugar.fotos.length ? lugar.fotos : (lugar.foto ? [lugar.foto] : []));
  carruselIndex = 0;

  if (img) img.src = carruselFotos[0] || "";

  // Mostrar modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Botones carrusel
  const next = safeEl("nextFoto");
  const prev = safeEl("prevFoto");

  if (next) next.onclick = () => moverCarrusel(1);
  if (prev) prev.onclick = () => moverCarrusel(-1);

  // Botón mapa
  const btnMapa = safeEl("btnIrMapaFull");
  if (btnMapa) {
    btnMapa.onclick = () => {
      map.setView(lugar.coord, 16);
      if (marker) marker.openPopup();
      cerrarModalFull();
    };
  }

  // Cerrar
  const btnCerrar = safeEl("cerrarModalFull");
  if (btnCerrar) btnCerrar.onclick = cerrarModalFull;

  modal.onclick = (e) => {
    if (e.target === modal) cerrarModalFull();
  };
}

function moverCarrusel(dir) {
  if (!carruselFotos || carruselFotos.length <= 1) return;
  carruselIndex = (carruselIndex + dir + carruselFotos.length) % carruselFotos.length;
  const img = safeEl("fullImg");
  if (img) img.src = carruselFotos[carruselIndex];
}

function cerrarModalFull() {
  const modal = safeEl("modalInfoFull");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");

  carruselIndex = 0;
  carruselFotos = [];
  carruselLugar = null;
  carruselMarker = null;
}

/* ============================================================
   PANEL ESCRITORIO (categorías desplegables)
============================================================ */

function cargarPanelEscritorio() {
  const listaPanel = safeEl("listaZonas");
  if (!listaPanel) return;

  listaPanel.innerHTML = "";

  Object.keys(lugares).forEach((categoria) => {
    const cont = document.createElement("div");
    cont.className = "mb-3";

    const header = document.createElement("button");
    header.type = "button";
    header.className =
      "w-full flex justify-between items-center bg-gray-200 p-3 rounded-lg cursor-pointer";
    header.innerHTML = `
      <span class="font-bold text-gray-800">${categoria}</span>
      <span class="flecha">▼</span>
    `;

    const sublista = document.createElement("div");
    sublista.className =
      "ml-3 mt-2 space-y-2 max-h-0 overflow-hidden transition-all duration-300";

    lugares[categoria].forEach((lugar) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className =
        "w-full p-3 bg-gray-100 rounded-lg flex justify-between items-center lugar-item text-left";
      item.innerHTML = `
        <span class="font-semibold text-gray-700">${lugar.nombre}</span>
        <span>→</span>
      `;

      item.addEventListener("click", () => {
        const marker = markersByKey.get(keyLugar(categoria, lugar.nombre));
        showInfo(lugar, marker);
      });

      sublista.appendChild(item);
    });

    header.addEventListener("click", () => {
      const abierto = sublista.classList.toggle("expanded");
      if (abierto) {
        sublista.style.maxHeight = sublista.scrollHeight + "px";
        header.querySelector(".flecha").textContent = "▲";
      } else {
        sublista.style.maxHeight = "0px";
        header.querySelector(".flecha").textContent = "▼";
      }
    });

    cont.appendChild(header);
    cont.appendChild(sublista);
    listaPanel.appendChild(cont);
  });
}

/* ============================================================
   PANEL MOBILE (bottom sheet + categorías)
============================================================ */

function inicializarPanelMobile() {
  const panelHeader = safeEl("panel-header");
  const panelContent = safeEl("panel-content");
  const flechaMobile = safeEl("flechaMobile");
  const listaMobile = safeEl("listaZonasMobile");

  if (!panelHeader || !panelContent || !flechaMobile || !listaMobile) return;

  // Ocultar panel escritorio en mobile
  const aside = document.querySelector("#contenido-mapa aside");
  if (window.innerWidth < 1024 && aside) aside.style.display = "none";

  // Cargar categorías
  listaMobile.innerHTML = "";

  Object.keys(lugares).forEach((categoria) => {
    const cont = document.createElement("div");
    cont.className = "bg-gray-100 rounded-lg p-3";

    const header = document.createElement("button");
    header.type = "button";
    header.className = "w-full flex justify-between items-center cursor-pointer text-left";
    header.innerHTML = `
      <span class="font-bold text-gray-800">${categoria}</span>
      <span class="flechaMobileCat">▼</span>
    `;

    const sublista = document.createElement("div");
    sublista.className =
      "ml-3 mt-2 space-y-3 max-h-0 overflow-hidden transition-all duration-300";

    lugares[categoria].forEach((lugar) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "w-full lugar-item-mobile text-left";
      item.innerHTML = `
        <span class="font-semibold">${lugar.nombre}</span>
        <span>→</span>
      `;

      item.addEventListener("click", () => {
        const marker = markersByKey.get(keyLugar(categoria, lugar.nombre));
        showInfo(lugar, marker);

        // Cerrar sheet
        panelContent.classList.remove("expanded");
        flechaMobile.textContent = "▲";
      });

      sublista.appendChild(item);
    });

    header.addEventListener("click", () => {
      const abierto = sublista.classList.toggle("expanded");
      if (abierto) {
        sublista.style.maxHeight = sublista.scrollHeight + "px";
        header.querySelector(".flechaMobileCat").textContent = "▲";
      } else {
        sublista.style.maxHeight = "0px";
        header.querySelector(".flechaMobileCat").textContent = "▼";
      }
    });

    cont.appendChild(header);
    cont.appendChild(sublista);
    listaMobile.appendChild(cont);
  });

  // Expand/collapse sheet completo
  panelHeader.addEventListener("click", () => {
    panelContent.classList.toggle("expanded");
    flechaMobile.textContent = panelContent.classList.contains("expanded") ? "▼" : "▲";
  });
}