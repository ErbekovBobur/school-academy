document.addEventListener("DOMContentLoaded", function () {
  // Мобильное меню
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    mainNav.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Плавный скролл для якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    // anchor.addEventListener("click", function (e) {
    // Строка 15 - обработчик без debounce
    window.addEventListener("scroll", function () {
      // Может вызываться слишком часто

      e.preventDefault();

      if (this.classList.contains("nav-link")) {
        mobileMenuBtn.classList.remove("active");
        mainNav.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".sticky-header").offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Фиксация шапки при скролле
  const header = document.querySelector(".sticky-header");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
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
  });

  // Анимация при наведении на карточки
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Закрытие меню при клике вне его области
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".main-nav") && !e.target.closest(".mobile-menu-btn")) {
      mobileMenuBtn.classList.remove("active");
      mainNav.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });
});
