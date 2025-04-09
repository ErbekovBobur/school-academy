// === Мобильное меню ===
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mainNav = document.querySelector(".main-nav");

function toggleMenu() {
  const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
  mainNav.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
}

mobileMenuBtn?.addEventListener("click", toggleMenu);

document.addEventListener("click", (e) => {
  if (!e.target.closest(".main-nav") && !e.target.closest(".mobile-menu-btn")) {
    mainNav?.classList.remove("active");
    mobileMenuBtn?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }
});

// === Плавный скролл с debounce ===
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    const header = document.querySelector(".sticky-header");
    const headerHeight = header ? header.offsetHeight : 0;
    const offset = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({ top: offset, behavior: "smooth" });
  }
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    smoothScroll(this.getAttribute("href"));

    // Закрыть меню, если клик по навигации
    if (this.classList.contains("nav-link")) {
      mobileMenuBtn?.setAttribute("aria-expanded", "false");
      mainNav?.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });
});

// === Sticky Header (оптимизированный) ===
let lastScroll = 0;
const header = document.querySelector(".sticky-header");

window.addEventListener(
  "scroll",
  debounce(() => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.style.boxShadow = "none";
      header.style.transform = "translateY(0)";
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }

    lastScroll = currentScroll;
  }, 15)
);

// === Календарь: запрет выходных ===
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

// === DOMContentLoaded ===
document.addEventListener("DOMContentLoaded", function () {
  initCalendar();
  // scrollRestoration: не сохранять позицию при переходе
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
});

// === Регистрация Service Worker ===
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("ServiceWorker зарегистрирован:", reg.scope))
      .catch((err) => console.error("Ошибка ServiceWorker:", err));
  });
}
