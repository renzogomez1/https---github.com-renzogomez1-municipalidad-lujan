document.addEventListener("DOMContentLoaded", () => {

    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const items = mobileMenu.querySelectorAll("li");
    let menuAbierto = false;

    function abrirMenu() {
        mobileMenu.classList.remove("hidden");
        setTimeout(() => {
            mobileMenu.classList.add("opacity-100", "translate-y-0");
            mobileMenu.classList.remove("opacity-0", "-translate-y-4");

            // animación escalonada de items
            items.forEach((item, i) => {
                setTimeout(() => {
                    item.classList.add("menu-anim");
                    item.classList.remove("opacity-0");
                }, i * 80);
            });
        }, 10);

        menuAbierto = true;
    }

    function cerrarMenu() {
        mobileMenu.classList.add("opacity-0", "-translate-y-4");
        mobileMenu.classList.remove("opacity-100", "translate-y-0");

        // ocultar items
        items.forEach((item) => {
            item.classList.remove("menu-anim");
            item.classList.add("opacity-0");
        });

        setTimeout(() => {
            mobileMenu.classList.add("hidden");
        }, 350);

        menuAbierto = false;
    }

    menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        menuAbierto ? cerrarMenu() : abrirMenu();
    });

    // cerrar al tocar afuera
    document.addEventListener("click", (e) => {
        if (menuAbierto && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            cerrarMenu();
        }
    });
});

// ===============================
// ABRIR MODAL LOGOUT
// ===============================
function logout() {
    const modal = document.getElementById("modalLogout");
    const cont  = document.getElementById("modalLogoutCont");

    if (!modal || !cont) return;

    modal.classList.remove("hidden");

    setTimeout(() => {
        modal.classList.remove("opacity-0");
        cont.classList.remove("opacity-0", "scale-90");
    }, 10);
}


// ===============================
// CERRAR MODAL LOGOUT
// ===============================
function cerrarModalLogout() {
    const modal = document.getElementById("modalLogout");
    const cont  = document.getElementById("modalLogoutCont");

    if (!modal || !cont) return;

    modal.classList.add("opacity-0");
    cont.classList.add("opacity-0", "scale-90");

    setTimeout(() => modal.classList.add("hidden"), 300);
}


// ===============================
// EVENTOS AL CARGAR LA PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------
    // BOTONES DEL NAVBAR (desktop y mobile)
    // ----------------------------
    const btnLogout = document.getElementById("btnLogout");
    const btnLogoutMobile = document.getElementById("btnLogoutMobile");

    if (btnLogout) btnLogout.addEventListener("click", logout);
    if (btnLogoutMobile) btnLogoutMobile.addEventListener("click", logout);


    // ----------------------------
    // BOTONES DEL MODAL
    // ----------------------------
    const btnCancelarLogout = document.getElementById("btnCancelarLogout");
    const btnConfirmarLogout = document.getElementById("btnConfirmarLogout");

    if (btnCancelarLogout) {
        btnCancelarLogout.addEventListener("click", cerrarModalLogout);
    }

    if (btnConfirmarLogout) {
        btnConfirmarLogout.addEventListener("click", () => {

            fetch("backend/logout.php")
                .then(r => r.text())
                .then(res => {
                    if (res === "OK") {
                        window.location.href = "login.html";
                    } else {
                        alert("Error al cerrar sesión");
                    }
                })
                .catch(e => alert("Error: " + e));
        });
    }

});