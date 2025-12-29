function initInicio() {
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
    //  FADE-SCROLL
    // ============================================================
    const elementos = document.querySelectorAll(".fade-scroll");

    if (!("IntersectionObserver" in window)) {
        elementos.forEach(el => el.classList.add("show"));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elementos.forEach(el => observer.observe(el));
    }


    // ============================================================
    //  CARRUSEL "ACTIVIDADES Y EXPERIENCIAS"
    // ============================================================
    const carrusel = document.getElementById("carouselActividades");
    const btnNext = document.getElementById("btnNext");
    const btnPrev = document.getElementById("btnPrev");
    const indicatorsContainer = document.getElementById("carouselIndicators");

    if (carrusel) {

        const cards = carrusel.children;
        const totalCards = cards.length;
        const step = 320;

        let currentIndex = 0;
        let autoplayInterval = null;
        const autoplayTime = 4000;

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
    //  CARRUSEL EVENTOS — AUTOPLAY
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
            scrollTimeout = setTimeout(() => {
                startAutoplay();
            }, 1500);
        });
    }

    // ============================================================
    //  SLIDER DE TARJETAS EVENTOS
    // ============================================================
    const cards = document.querySelectorAll("#carouselEventos .evento-card");
    if (cards.length > 0) {
        let index = 0;
        const time = 4000;

        function showCard(i) {
            cards.forEach((card, idx) => {
                if (idx === i) {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                } else {
                    card.style.opacity = "0";
                    card.style.transform = "scale(0.95)";
                }
            });
        }

        showCard(index);

        setInterval(() => {
            index = (index + 1) % cards.length;
            showCard(index);
        }, time);
    }
}

