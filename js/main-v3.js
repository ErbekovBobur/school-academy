document.addEventListener("DOMContentLoaded", function () {
  // Элементы интерфейса
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");
  const header = document.querySelector(".sticky-header");
  const featureCards = document.querySelectorAll(".feature-card");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Инициализация мобильного меню
  function initMobileMenu() {
    mobileMenuBtn.addEventListener("click", toggleMenu);

    // Закрытие меню при клике вне его области
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".main-nav") && !e.target.closest(".mobile-menu-btn")) {
        closeMenu();
      }
    });
  }

  function toggleMenu() {
    const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
    mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
    mobileMenuBtn.classList.toggle("active");
    mainNav.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  function closeMenu() {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenuBtn.classList.remove("active");
    mainNav.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  // Плавный скролл с debounce
  function initSmoothScroll() {
    function smoothScroll(target) {
      if (target === "#") return;

      const element = document.querySelector(target);
      if (element) {
        const headerHeight = header.offsetHeight;
        const offset = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        // Закрываем меню если это навигационная ссылка
        if (this.classList.contains("nav-link")) {
          closeMenu();
        }

        smoothScroll(this.getAttribute("href"));
      });
    });
  }

  // Фиксация шапки при скролле
  function initStickyHeader() {
    let lastScroll = 0;

    window.addEventListener(
      "scroll",
      debounce(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
          header.style.boxShadow = "none";
          header.style.background = "rgba(255, 255, 255, 0.98)";
          return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
          // Прокрутка вниз
          header.style.transform = "translateY(-100%)";
        } else {
          // Прокрутка вверх
          header.style.transform = "translateY(0)";
          header.style.background = "rgba(255, 255, 255, 0.98)";
          header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
        }

        lastScroll = currentScroll;
      }, 15)
    );
  }

  // Анимация карточек
  function initCardHover() {
    featureCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
        card.style.transition = "transform 0.3s ease";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
      });
    });
  }

  // Выпадающие меню
  function initDropdowns() {
    dropdowns.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const menu = item.querySelector(".dropdown-menu");
        menu.style.display = "block";
        menu.style.animation = "slideDown 0.3s ease-out forwards";
      });

      item.addEventListener("mouseleave", () => {
        const menu = item.querySelector(".dropdown-menu");
        menu.style.animation = "";
        setTimeout(() => {
          menu.style.display = "none";
        }, 300);
      });
    });
  }

  // Вспомогательная функция debounce
  function debounce(func, wait) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  // Инициализация календаря
  function initCalendar() {
    const dateInput = document.getElementById("date");
    if (dateInput) {
      dateInput.addEventListener("input", function () {
        const selectedDate = new Date(this.value);
        const day = selectedDate.getDay();

        if (day === 0 || day === 6) {
          this.setCustomValidity("Выберите будний день");
          this.reportValidity();
          this.value = "";
        } else {
          this.setCustomValidity("");
        }
      });
    }
  }

  // Регистрация Service Worker
  function initServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("ServiceWorker зарегистрирован:", registration.scope);
          })
          .catch((error) => {
            console.log("Ошибка регистрации ServiceWorker:", error);
          });
      });
    }
  }

  // Инициализация всех компонентов
  initMobileMenu();
  initSmoothScroll();
  initStickyHeader();
  initCardHover();
  initDropdowns();
  initCalendar();
  initServiceWorker();

  // Инициализация WOW.js (раскомментируйте если нужно)
  // new WOW({
  //   boxClass: "wow",
  //   animateClass: "animated",
  //   offset: 50,
  //   mobile: true,
  //   live: true,
  // }).init();
});
