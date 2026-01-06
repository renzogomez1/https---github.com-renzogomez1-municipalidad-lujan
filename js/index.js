function initInicio() {

    // ============================================================
    //  RENDER ACTIVIDADES DESDE QUE_HACER (CLAVE)
    // ============================================================
    renderActividadesInicio();
    initFadeScroll();


    // ============================================================
    //  NAVBAR SCROLL EFFECT
    // ============================================================
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    let lastScroll = 0;
    const heroHeight = window.innerHeight - 80;

    window.addEventListener("scroll", () => {
        const current = window.scrollY;

        if (current > heroHeight) {
            navbar.classList.add("nav-solid");
        } else {
            navbar.classList.remove("nav-solid");
        }

        if (current > lastScroll && current > 80) {
            navbar.classList.add("nav-hidden");
        } else {
            navbar.classList.remove("nav-hidden");
        }

        lastScroll = current;
    });


    // ============================================================
    //  CARRUSEL "ACTIVIDADES Y EXPERIENCIAS"
    // ============================================================
    const carrusel = document.getElementById("carouselActividades");
    const btnNext = document.getElementById("btnNext");
    const btnPrev = document.getElementById("btnPrev");
    const indicatorsContainer = document.getElementById("carouselIndicators");

    if (carrusel && carrusel.children.length > 0) {

        const cards = carrusel.children;
        const totalCards = cards.length;
        const step = 320;

        let currentIndex = 0;
        let autoplayInterval = null;
        const autoplayTime = 4000;

        indicatorsContainer.innerHTML = "";

        function createIndicators() {
            for (let i = 0; i < totalCards; i++) {
                const bullet = document.createElement("div");
                bullet.classList.add("carousel-bullet");
                if (i === 0) bullet.classList.add("active");

                bullet.addEventListener("click", () => {
                    currentIndex = i;
                    scrollToIndex();
                    resetAutoplay();
                });

                indicatorsContainer.appendChild(bullet);
            }
        }

        createIndicators();
        const bullets = indicatorsContainer.querySelectorAll(".carousel-bullet");

        function updateIndicators() {
            bullets.forEach((b, i) => {
                b.classList.toggle("active", i === currentIndex);
            });
        }

        function scrollToIndex() {
            carrusel.scrollTo({
                left: currentIndex * step,
                behavior: "smooth"
            });
            updateIndicators();
        }

        if (btnNext && btnPrev) {
            btnNext.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % totalCards;
                scrollToIndex();
                resetAutoplay();
            });

            btnPrev.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
                scrollToIndex();
                resetAutoplay();
            });
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalCards;
                scrollToIndex();
            }, autoplayTime);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        startAutoplay();

        carrusel.addEventListener("mouseenter", stopAutoplay);
        carrusel.addEventListener("mouseleave", startAutoplay);

        carrusel.addEventListener("touchstart", stopAutoplay);
        carrusel.addEventListener("touchend", () => {
            setTimeout(startAutoplay, 1500);
        });

        let isScrolling;
        carrusel.addEventListener("scroll", () => {
            stopAutoplay();
            clearTimeout(isScrolling);

            isScrolling = setTimeout(() => {
                const index = Math.round(carrusel.scrollLeft / step);
                currentIndex = index;
                updateIndicators();
                startAutoplay();
            }, 600);
        });
    }


    // ============================================================
    //  CARRUSEL EVENTOS — AUTOPLAY VERTICAL
    // ============================================================
    const eventos = document.getElementById("carouselEventos");

    if (eventos) {

        const itemHeight = 180;
        const autoplayTime = 3500;
        let autoplayInterval = null;

        function startAutoplay() {
            stopAutoplay();
            autoplayInterval = setInterval(() => {
                if (eventos.scrollTop + eventos.clientHeight >= eventos.scrollHeight - 10) {
                    eventos.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    eventos.scrollBy({ top: itemHeight, behavior: "smooth" });
                }
            }, autoplayTime);
        }

        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        startAutoplay();

        eventos.addEventListener("mouseenter", stopAutoplay);
        eventos.addEventListener("mouseleave", startAutoplay);

        eventos.addEventListener("touchstart", stopAutoplay);
        eventos.addEventListener("touchend", () => {
            setTimeout(startAutoplay, 1500);
        });

        let scrollTimeout;
        eventos.addEventListener("scroll", () => {
            stopAutoplay();
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(startAutoplay, 1500);
        });
    }


    // ============================================================
    //  SLIDER DE TARJETAS EVENTOS (FADE)
    // ============================================================
    const cardsEventos = document.querySelectorAll("#carouselEventos .evento-card");
    if (cardsEventos.length > 0) {

        let index = 0;
        const time = 4000;

        function showCard(i) {
            cardsEventos.forEach((card, idx) => {
                card.style.opacity = idx === i ? "1" : "0";
                card.style.transform = idx === i ? "scale(1)" : "scale(0.95)";
            });
        }

        showCard(index);

        setInterval(() => {
            index = (index + 1) % cardsEventos.length;
            showCard(index);
        }, time);
    }
}


// ============================================================
//  RENDER ACTIVIDADES DESDE QUE_HACER
// ============================================================
function renderActividadesInicio() {
    const carrusel = document.getElementById("carouselActividades");
    if (!carrusel || !window.QUE_HACER) return;

    carrusel.innerHTML = "";

    QUE_HACER.forEach(item => {
        const card = document.createElement("div");

        card.className = `
            min-w-[260px] md:min-w-[300px]
            bg-white rounded-xl shadow-lg overflow-hidden
            hover:scale-105 transition fade-scroll 
            snap-start md:snap-center
        `;

        card.innerHTML = `
            <img src="${item.fotos[0]}"
                 class="h-44 w-full object-cover">

            <div class="p-5">
                <h3 class="text-lg font-bold text-gray-800">
                    ${item.titulo}
                </h3>

                <p class="text-sm text-gray-600 mt-2">
                    ${item.descripcion}
                </p>

                <button
                    data-vista="${item.url || ''}"
                    class="mt-4 text-orange-600 font-semibold
                           hover:text-orange-800 transition">
                    Ver más →
                </button>
            </div>
        `;

        carrusel.appendChild(card);
    });
}

