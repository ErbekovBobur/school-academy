document.addEventListener('DOMContentLoaded', () => {
  ['header', 'footer'].forEach(type => {
    const placeholder = document.getElementById(`${type}-placeholder`);
    if (placeholder) {
      fetch(`partials/${type}.html`)
        .then(response => response.text())
        .then(data => {
          placeholder.innerHTML = data;
          if (type === 'header') initHeader();
        })
        .catch(error => console.error(`Error loading ${type}:`, error));
    }
  });

  function initHeader() {
    // Dropdown Menu
    document.querySelectorAll('.dropdown').forEach(item => {
      const link = item.querySelector('.nav-link');
      const menu = item.querySelector('.dropdown-menu');
      if (!link || !menu) return;

      let timeout;
      item.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        menu.style.display = 'block';
        setTimeout(() => {
          menu.style.opacity = '1';
          menu.style.transform = 'translateY(0)';
        }, 10);
      });

      item.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          menu.style.opacity = '0';
          menu.style.transform = 'translateY(-10px)';
          setTimeout(() => {
            menu.style.display = 'none';
          }, 300);
        }, 100);
      });
    });

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        mobileMenuBtn.classList.toggle('open');
      });

      // Close mobile menu when clicking a link
      mainNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
            mobileMenuBtn.classList.remove('open');
          }
        });
      });
    }

    // Language Switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    const selectedLang = localStorage.getItem('selectedLang') || 'ru';

    function applyTranslations(lang) {
      console.log('Applying translations for:', lang);
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
          element.textContent = translations[key][lang] || translations[key].ru;
        } else {
          console.warn(`Translation key "${key}" not found`);
        }
      });
      document.documentElement.lang = lang;
      localStorage.setItem('selectedLang', lang);
      updateActiveLangButton(lang);
    }

    function updateActiveLangButton(lang) {
      langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
      });
    }

    langButtons.forEach(button => {
      button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        console.log('Language button clicked:', lang);
        applyTranslations(lang);
      });
    });

    applyTranslations(selectedLang);
  }
});