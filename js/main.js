document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");
  const header = document.querySelector(".sticky-header");

  // Load Header and Footer
  ["header", "footer"].forEach((type) => {
    const placeholder = document.getElementById(`${type}-placeholder`);
    if (placeholder) {
      fetch(`partials/${type}.html`)
        .then((response) => response.text())
        .then((data) => {
          placeholder.innerHTML = data;
          if (type === "header") initHeader();
        });
    }
  });

  // Initialize Header
  function initHeader() {
    // Dropdown Menu
    document.querySelectorAll(".dropdown").forEach((item) => {
      const menu = item.querySelector(".dropdown-menu");
      item.addEventListener("mouseenter", () => {
        menu.style.display = "block";
        menu.style.opacity = "1";
        menu.style.visibility = "visible";
      });
      item.addEventListener("mouseleave", () => {
        menu.style.opacity = "0";
        menu.style.visibility = "hidden";
        setTimeout(() => (menu.style.display = "none"), 300);
      });
    });

    // Mobile Menu
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener("click", () => {
        const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
        mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
        mainNav.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".main-nav") && !e.target.closest(".mobile-menu-btn")) {
          mainNav.classList.remove("active");
          mobileMenuBtn.setAttribute("aria-expanded", "false");
          document.body.classList.remove("no-scroll");
        }
      });
    }
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      if (targetId && targetId !== "#") {
        const element = document.querySelector(targetId);
        const headerHeight = header?.offsetHeight || 0;
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.pageYOffset - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Sticky Header
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      header.style.transform = "translateY(0)";
      return;
    }
    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScroll = currentScroll;
  });

  // Card Hover Animation
  document.querySelectorAll(".feature-card, .news-card, .teacher-card").forEach((card) => {
    card.addEventListener("mouseenter", () => (card.style.transform = "translateY(-5px)"));
    card.addEventListener("mouseleave", () => (card.style.transform = "translateY(0)"));
  });
});

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("ServiceWorker registered:", reg.scope))
      .catch((err) => console.log("ServiceWorker error:", err));
  });
}
