let idEliminar = null; // guardará el ID del evento a eliminar
let eventosData = []; // aquí se guardarán todos los eventos
// ===============================
// INICIALIZAR VISTA DE EVENTOS
// ===============================
function initEventos() {
    console.log("initEventos ejecutado");

    listarEventos(); // carga dinámica

    const btnAbrir = document.getElementById("btnAbrirModalEvento");
    const modal = document.getElementById("modalEvento");
    const modalCont = document.getElementById("modalContenido");
    const btnCancelar = document.getElementById("btnCancelar");
    const formEvento = document.getElementById("formEvento");

    if (!btnAbrir || !modal) {
        console.log("No se detectó vista de eventos");
        return;
    }

    // Abrir modal agregar
    btnAbrir.addEventListener("click", () => {
        modal.classList.remove("hidden");
        setTimeout(() => {
            modal.classList.remove("opacity-0");
            modalCont.classList.remove("opacity-0", "scale-90");
        }, 10);
    });

    // Cerrar modal agregar
    function cerrarModal() {
        modal.classList.add("opacity-0");
        modalCont.classList.add("opacity-0", "scale-90");
        setTimeout(() => modal.classList.add("hidden"), 300);
    }

    btnCancelar.addEventListener("click", cerrarModal);

    // Guardar evento
    formEvento.addEventListener("submit", (e) => {
        e.preventDefault();

        const datos = new FormData(formEvento);

        fetch("backend/agregarEvento.php", {
            method: "POST",
            body: datos
        })
        .then(res => res.json())
        .then(data => {

            if (data.ok) {
                cerrarModal();
                formEvento.reset();
                listarEventos(); // actualizar lista sin recargar página
            } else {
                alert("Error: " + data.error);
            }

        })
        .catch(err => {
            alert("Error inesperado: " + err);
        });
    });

}



// ===============================
// LISTADO DINÁMICO
// ===============================
function listarEventos() {

    fetch("backend/listarEventos.php")
        .then(r => r.json())
        .then(data => {

            if (!data.ok) {
                console.error(data.error);
                return;
            }

            eventosData = data.eventos;   // GUARDAR LOS EVENTOS
            mostrarEventos(eventosData);  // MOSTRAR EVENTOS EN PANTALLA
        });
}

function mostrarEventos(lista) {

    const cont = document.getElementById("listaEventos");
    cont.innerHTML = ""; // limpiar lista

    // Si no tenemos resultados
    if (lista.length === 0) {
        cont.innerHTML = `
            <div class="text-center text-gray-500 py-10">
                <p class="text-lg font-medium">No se encontraron eventos</p>
                <p class="text-sm">Probá con otro nombre o fecha</p>
            </div>
        `;
        return;
    }

    lista.forEach(ev => {

        const estadoText = ev.estado == 1 ? "Activo" : "Inactivo";

        cont.innerHTML += `
            <div class="bg-white shadow-lg rounded-xl p-4 flex gap-4 items-center">

                <img src="media/muestra.jpg" 
                     class="w-32 h-24 object-cover rounded-lg">

                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-800">${ev.nombreEvento}</h3>
                    <p class="text-sm text-gray-600">${ev.fechaRealizacion}</p>

                    <span class="inline-block mt-1 px-3 py-1 text-xs rounded-full 
                        ${ev.estado == 1 ? 'bg-green-200 text-green-700' : 'bg-gray-300 text-gray-700'}">
                        ${estadoText}
                    </span>

                    <button data-id="${ev.idEventos}"
                        class="btnDetalles bg-white text-gray-700 border border-gray-300 px-4 h-9 rounded-lg">
                        Ver detalles
                    </button>
                </div>

                <button data-id="${ev.idEventos}"
                        class="btnEliminar bg-red-500 text-white p-2 rounded-lg">
                    🗑
                </button>

            </div>
        `;
    });

    // Activar botones
    document.querySelectorAll(".btnEliminar").forEach(btn => {
        btn.addEventListener("click", () => abrirModalEliminar(btn.dataset.id));
    });

    document.querySelectorAll(".btnDetalles").forEach(btn => {
        btn.addEventListener("click", () => abrirModalDetalles(btn.dataset.id));
    });
}



// ===============================
// MODAL ELIMINAR
// ===============================
function abrirModalEliminar(id) {
    idEliminar = id;

    const modal = document.getElementById("modalEliminar");
    const cont = document.getElementById("modalEliminarCont");

    modal.classList.remove("hidden");

    setTimeout(() => {
        modal.classList.remove("opacity-0");
        cont.classList.remove("opacity-0", "scale-90");
    }, 10);
}

function cerrarModalEliminar() {
    const modal = document.getElementById("modalEliminar");
    const cont = document.getElementById("modalEliminarCont");

    modal.classList.add("opacity-0");
    cont.classList.add("opacity-0", "scale-90");

    setTimeout(() => modal.classList.add("hidden"), 300);
}



// ===============================
// CONFIRMAR ELIMINACIÓN (REAL)
// ===============================
document.getElementById("btnConfirmarEliminar").addEventListener("click", () => {

    const datos = new FormData();
    datos.append("idEventos", idEliminar);

    fetch("backend/eliminarEvento.php", {
        method: "POST",
        body: datos
    })
    .then(r => r.json())
    .then(data => {

        if (data.ok) {
            cerrarModalEliminar();
            listarEventos(); // refresca la lista sin recargar página
        } else {
            alert("Error: " + data.error);
        }

    })
    .catch(err => {
        alert("Error inesperado: " + err);
    });
});


// ===============================
// CERRAR MODAL ELIMINAR
// ===============================
document.getElementById("btnCerrarEliminar").addEventListener("click", cerrarModalEliminar);

// ===============================
// ABRIR MODAL DETALLES
// ===============================
function abrirModalDetalles(id) {

    fetch(`backend/obtenerEvento.php?id=${id}`)
        .then(r => r.json())
        .then(data => {

            if (!data.ok) {
                alert("Error al cargar información");
                return;
            }

            const ev = data.evento;

            // Cargar datos en el formulario
            document.getElementById("edit_id").value = ev.idEventos;
            document.getElementById("edit_nombre").value = ev.nombreEvento;
            document.getElementById("edit_descripcion").value = ev.descripcion;
            document.getElementById("edit_fecha").value = ev.fechaRealizacion;
            document.getElementById("edit_estado").value = ev.estado;

            // Mostrar modal
            const modal = document.getElementById("modalDetalles");
            const cont  = document.getElementById("modalDetallesCont");

            modal.classList.remove("hidden");

            setTimeout(() => {
                modal.classList.remove("opacity-0");
                cont.classList.remove("opacity-0", "scale-90");
            }, 10);
        });
}

// ===============================
// FUNCIÓN PARA CERRAR MODAL DETALLES
// ===============================
function cerrarModalDetalles() {
    const modal = document.getElementById("modalDetalles");
    const cont  = document.getElementById("modalDetallesCont");

    modal.classList.add("opacity-0");
    cont.classList.add("opacity-0", "scale-90");

    setTimeout(() => modal.classList.add("hidden"), 300);
}

// Cerrar modal al presionar botón
document.getElementById("btnCerrarDetalles").addEventListener("click", cerrarModalDetalles);

// ===============================
// GUARDAR MODIFICACIONES
// ===============================
document.getElementById("formEditarEvento").addEventListener("submit", e => {
    e.preventDefault();

    const datos = new FormData(document.getElementById("formEditarEvento"));

    fetch("backend/editarEvento.php", {
        method: "POST",
        body: datos
    })
    .then(r => r.json())
    .then(data => {

        if (data.ok) {
            cerrarModalDetalles();
            listarEventos();
        } else {
            alert("Error: " + data.error);
        }

    })
    .catch(err => alert("Error inesperado: " + err));
});

//funcion de la barra de busqueda
document.getElementById("buscadorEventos").addEventListener("input", e => {

    const texto = e.target.value.toLowerCase().trim();

    const filtrados = eventosData.filter(ev =>
        ev.nombreEvento.toLowerCase().includes(texto) ||
        ev.descripcion.toLowerCase().includes(texto) ||
        ev.fechaRealizacion.toLowerCase().includes(texto)
    );

    mostrarEventos(filtrados);
});