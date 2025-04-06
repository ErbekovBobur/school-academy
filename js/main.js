/*document.addEventListener("DOMContentLoaded", function () {
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
*/
// Мобильное меню
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav");

function toggleMenu() {
  const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
  mainNav.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
}

mobileMenuBtn.addEventListener("click", toggleMenu);

// Закрытие меню при клике вне его
document.addEventListener("click", (e) => {
  if (!e.target.closest(".main-nav") && !e.target.closest(".mobile-menu-btn")) {
    mainNav.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }
});

// Плавный скролл с debounce
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    const headerHeight = document.querySelector(".sticky-header").offsetHeight;
    const offset = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  }
}

function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    smoothScroll(this.getAttribute("href"));
  });
});

// Фиксация шапки с оптимизацией
let lastScroll = 0;
const header = document.querySelector(".sticky-header");

window.addEventListener("scroll", debounce(() => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.style.boxShadow = "none";
    return;
  }

  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
}, 15));

// Инициализация WOW.js
new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 50,
  mobile: true,
  live: true
}).init();
//для формы обратной связи 
// Инициализация календаря
function initCalendar() {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    // Блокируем выходные дни
    dateInput.addEventListener('input', function () {
      const selectedDate = new Date(this.value);
      const day = selectedDate.getDay();

      if (day === 0 || day === 6) {
        this.setCustomValidity('Выберите будний день');
        this.reportValidity();
        this.value = '';
      } else {
        this.setCustomValidity('');
      }
    });
  }
}

// Добавить в DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  initCalendar();
  // ... остальной код инициализации
});
// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker зарегистрирован:', registration.scope);
      })
      .catch(error => {
        console.log('Ошибка регистрации ServiceWorker:', error);
      });
  });
}