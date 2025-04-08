class App {
  constructor() {
    this.init();
  }

  async init() {
    this.registerServiceWorker();
    this.loadTemplates();
    this.setupEventListeners();
    this.initScrollTracking();
    this.initCalendar();
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("SW registered:", reg.scope))
        .catch((err) => console.error("SW registration failed:", err));
    }
  }

  async loadTemplates() {
    try {
      const [header, footer] = await Promise.all([
        this.fetchTemplate("/partials/header.html"),
        this.fetchTemplate("/partials/footer.html"),
      ]);

      document.getElementById("header-placeholder").innerHTML = header;
      document.getElementById("footer-placeholder").innerHTML = footer;

      this.setupNavigation();
    } catch (error) {
      console.error("Template loading failed:", error);
    }
  }

  async fetchTemplate(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to load: ${url}`);
    return await response.text();
  }

  setupNavigation() {
    // Mobile menu toggle
    document.querySelector(".mobile-menu-btn").addEventListener("click", this.toggleMenu);

    // Active link highlighting
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a").forEach((link) => {
      if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
      }
    });
  }

  toggleMenu() {
    const menu = document.querySelector(".main-nav");
    menu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  }

  // Other methods...
}

document.addEventListener("DOMContentLoaded", () => new App());
