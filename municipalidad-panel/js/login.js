document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("formLogin");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const datos = new FormData(form);

        const xhr = new XMLHttpRequest();

        xhr.open("POST", "backend/login.php", true);

        xhr.onload = function () {
            const r = xhr.responseText.trim();

            if (r === "ADMIN") {
                window.location.href = "dashboardAdmin.php";
            } else if (r === "USER") {
                window.location.href = "dashboardEmp.php";
            }
            else if (r === "INVALID_PASS") {
                alert("Contraseña incorrecta");
            }
            else if (r === "NOT_FOUND") {
                alert("El correo no existe");
            }
            else {
                alert("Error en el servidor");
            }
        };

        xhr.send(datos); // Envia los datos escondidos
    });

});