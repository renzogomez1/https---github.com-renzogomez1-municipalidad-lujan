<?php
session_start();

if (!isset($_SESSION["logueado"]) || $_SESSION["logueado"] !== true) {
    header("Location: login.html");
    exit();
}
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Panel - Municipalidad Luján</title>

        <!-- Tailwind correcto (CDN oficial) -->
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="css/dashboard.css">
    </head>
    <body class="bg-gray-50">
        <!-- NAVBAR -->
        <nav class="h-[70px] w-full px-6 md:px-16 lg:px-24 xl:px-32 
                    flex items-center justify-between bg-white shadow-lg relative z-20">
            <!-- Logo con hover moderno -->
            <a href="#" class="flex items-center 
                    transform transition-transform duration-300 
                    hover:scale-110">
                <img src="media/municipalidad.png" alt="Municipalidad de Luján" class="h-12">
            </a>

            <div class="hidden md:flex items-center gap-5">

                <!-- Saludo + nombre del usuario -->
                <div class="text-gray-700 text-sm font-medium">
                    Hola, <?php echo $_SESSION["nombre"]; ?>
                </div>

                <!-- Botón cerrar sesión -->
                <button id="btnLogout" type="button"
                        class="bg-white text-orange-700 border border-orange-300
                            text-sm hover:bg-orange-100 active:scale-95 transition
                            w-40 h-11 rounded-full">
                    Cerrar Sesión
                </button>

            </div>

        <!-- Botón menú con animación moderna -->
        <button aria-label="menu-btn" 
            type="button"
            class="menu-btn md:hidden p-2 rounded-lg
                transition-transform duration-300 transform
                hover:scale-110 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="30" height="30" fill="#000">
                <path d="M 3 7 A 1 1 0 1 0 3 9 L 27 9 A 1 1 0 1 0 27 7 L 3 7 z 
                        M 3 14 A 1 1 0 1 0 3 16 L 27 16 A 1 1 0 1 0 27 14 L 3 14 z 
                        M 3 21 A 1 1 0 1 0 3 23 L 27 23 A 1 1 0 1 0 27 21 L 3 21 z"></path>
            </svg>
        </button>


            <!-- MENÚ MOBILE -->
        <div class="mobile-menu hidden 
                absolute top-[70px] left-0 w-full 
                bg-white/80 backdrop-blur-xl 
                p-6 shadow-xl rounded-b-3xl
                md:hidden 
                opacity-0 -translate-y-4 
                transition-all duration-400 ease-out
                flex flex-col items-center text-center">

            <!-- SALUDO -->
            <p class="text-gray-700 text-lg font-medium mb-4">
                Hola, <?php echo $_SESSION["nombre"]; ?>
            </p>

            <ul class="flex flex-col items-center text-center space-y-6 text-gray-700 text-lg w-full">
                <li><a href="#" class="menu-item" data-page="inicio">Volver al Inicio</a></li>
                <li><a href="#" class="menu-item" data-page="eventos">Eventos</a></li>
                <li><a href="#" class="menu-item" data-page="agenda">Agenda</a></li>
                <li><a href="#" class="menu-item" data-page="alojamientos">Alojamientos</a></li>
                <li><a href="#" class="menu-item" data-page="gastronomia">Gastronomía</a></li>
                <li><a href="#" class="menu-item" data-page="transporte">Transporte</a></li>
                <li><a href="#" class="menu-item" data-page="emergencias">Emergencias</a></li>
                <li><a href="#" class="menu-item" data-page="fotos">Fotos</a></li>
            </ul>

            <button id="btnLogoutMobile" type="button"
                    class="bg-white text-orange-700 border border-orange-300
                        text-sm hover:bg-orange-100 active:scale-95 transition
                        w-40 h-11 rounded-full">
                Cerrar Sesión
            </button>
        </div>
    </nav>

    <!-- LAYOUT GENERAL DEL PANEL -->
    <div class="flex pt-[60px] px-5 md:px-10 lg:px-8 xl:px-10 gap-10">

        <!-- PANEL LATERAL (misma estética que la navbar) -->
        <aside class="w-[280px] flex-shrink-0 bg-white shadow-lg rounded-xl p-6 flex flex-col space-y-1 hidden md:block">
            <h2 class="text-xl font-semibold text-gray-700 mb-2">Panel de Control</h2>

            <button class="panel-btn bg-white text-gray-700 text-sm hover:bg-orange-100 active:scale-95 transition w-full h-11 rounded-lg text-left px-4" data-page="inicio">
                Volver al Inicio
            </button>
            <button class="panel-btn bg-white text-gray-700 text-sm hover:bg-orange-100 active:scale-95 transition w-full h-11 rounded-lg text-left px-4" data-page="eventos">
                Eventos
            </button>
            <button class="panel-btn bg-white text-gray-700 text-sm hover:bg-orange-100 active:scale-95 transition w-full h-11 rounded-lg text-left px-4" data-page="agenda">
                Agenda
            </button>
            <button class="panel-btn bg-white text-gray-700 text-sm hover:bg-orange-100 active:scale-95 transition w-full h-11 rounded-lg text-left px-4" data-page="alojamientos">
                Alojamientos
            </button>
            <button class="panel-btn bg-white text-gray-700 text-sm hover:bg-orange-100 active:scale-95 transition w-full h-11 rounded-lg text-left px-4" data-page="gastronomia">
                Gastronomía
            </button>
            <button class="panel-btn bg-white text-gray-700 text-sm hover:bg-orange-100 active:scale-95 transition w-full h-11 rounded-lg text-left px-4" data-page="transporte">
                Transporte
            </button>
            <button class="panel-btn bg-white text-gray-700 text-sm hover:bg-orange-100 active:scale-95 transition w-full h-11 rounded-lg text-left px-4" data-page="emergencias">
                Emergencias
            </button>
            <button class="panel-btn bg-white text-gray-700 text-sm hover:bg-orange-100 active:scale-95 transition w-full h-11 rounded-lg text-left px-4" data-page="fotos">
                Fotos
            </button>
            <button class="panel-btn bg-white text-gray-700 text-sm hover:bg-orange-100 active:scale-95 transition w-full h-11 rounded-lg text-left px-4" data-page="perfil">
                Perfil
            </button>
        </aside>


        <!-- CONTENEDOR PRINCIPAL (solo este cambia con AJAX) -->
        <main id="contenedor" 
            class="flex-1 min-h-[70vh] bg-white shadow-lg rounded-xl p-8">

            <h2 class="text-2xl font-semibold text-gray-800">
                Bienvenido al Panel Administrador
            </h2>

            <p class="mt-2 text-gray-600">
                Seleccioná una opción del menú para comenzar.
            </p>
        </main>
    </div>
    <footer class="w-full bg-white shadow-inner mt-10 py-6 px-6 md:px-16 lg:px-24 xl:px-32 
               text-gray-600 text-center">

        <p class="text-sm">
            © Municipalidad de Luján - Panel de Administración
        </p>

        <p class="text-xs mt-2 opacity-70">
            Designed by Renzo Gomez
        </p>

    </footer>
        <script src="js/panel.js"></script>
        <script src="js/menu.js"></script>
    </body>
</html>

<!-- MODAL CERRAR SESIÓN -->
<div id="modalLogout"
     class="fixed inset-0 bg-black/40 backdrop-blur-sm hidden opacity-0 z-50
            flex items-center justify-center transition-opacity duration-300">

    <div id="modalLogoutCont"
         class="bg-white w-[90%] max-w-sm rounded-2xl shadow-xl p-6 text-center
                scale-90 opacity-0 transition-all duration-300">

        <h2 class="text-xl font-semibold text-gray-800 mb-2">
            ¿Cerrar sesión?
        </h2>

        <p class="text-gray-600 mb-6">
            Vas a salir del panel de administración.
        </p>

        <div class="flex justify-center gap-3">
            <button id="btnCancelarLogout"
                    class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700
                           hover:bg-gray-100 active:scale-95 transition">
                Cancelar
            </button>

            <button id="btnConfirmarLogout"
                    class="px-4 py-2 rounded-lg bg-red-600 text-white
                           hover:bg-red-700 active:scale-95 transition">
                Cerrar sesión
            </button>
        </div>

    </div>
</div>
