document.addEventListener("DOMContentLoaded", function () {
  // Полная библиотека переводов
  const translations = {
    "school-name": {
      "ru": "School Academy",
      "uz": "School Akademiyasi"
    },
    "address": {
      "ru": "Ташкент, Юнусабадский район",
      "uz": "Toshkent, Yunusobod tumani"
    },
    "nav-home": {
      "ru": "Главная",
      "uz": "Bosh sahifa"
    },
    "nav-about": {
      "ru": "О школе",
      "uz": "Maktab haqida"
    },
    "nav-history": {
      "ru": "История",
      "uz": "Tarix"
    },
    "nav-teachers": {
      "ru": "Преподаватели",
      "uz": "O'qituvchilar"
    },
    "appointment-title": {
      "ru": "Записаться на экскурсию",
      "uz": "Ekskursiyaga yozilish"
    }
    // Добавьте другие фразы по аналогии
  };

  // Функция применения языка
  function applyLanguage(lang) {
    // Переводим элементы с data-translate
    document.querySelectorAll("[data-translate]").forEach(element => {
      const key = element.getAttribute("data-translate");
      if (translations[key] && translations[key][lang]) {
        element.textContent = translations[key][lang];
      }
    });

    // Обновляем атрибут lang у html
    document.documentElement.lang = lang;

    // Переводим placeholder у инпутов
    document.querySelectorAll("[data-translate-placeholder]").forEach(input => {
      const key = input.getAttribute("data-translate-placeholder");
      if (translations[key] && translations[key][lang]) {
        input.placeholder = translations[key][lang];
      }
    });
  }

  // Инициализация языка
  function initLanguage() {
    // Проверяем сохранённый язык или берём язык браузера
    const savedLang = localStorage.getItem("selectedLang");
    const browserLang = navigator.language.slice(0, 2);
    const defaultLang = ["ru", "uz"].includes(browserLang) ? browserLang : "ru";
    const lang = savedLang || defaultLang;

    // Применяем язык
    applyLanguage(lang);

    // Обновляем кнопки переключателя
    document.querySelectorAll(".lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });

    // Анимируем переключатель
    const slider = document.querySelector(".lang-slider");
    if (slider) {
      slider.style.transform = lang === "uz" ? "translateX(100%)" : "translateX(0)";
    }
  }

  // Обработчики кнопок переключения
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");

      // Сохраняем выбор
      localStorage.setItem("selectedLang", lang);

      // Применяем язык
      applyLanguage(lang);

      // Обновляем UI переключателя
      document.querySelectorAll(".lang-btn").forEach(b => {
        b.classList.toggle("active", b === this);
      });

      // Анимация слайдера
      const slider = document.querySelector(".lang-slider");
      if (slider) {
        slider.style.transform = lang === "uz" ? "translateX(100%)" : "translateX(0)";
      }
    });
  });

  // Инициализация при загрузке
  initLanguage();
});


// В language.js добавить
const dateElements = document.querySelectorAll("[data-translate-date]");
dateElements.forEach(el => {
  const date = new Date(el.getAttribute("data-translate-date"));
  el.textContent = date.toLocaleDateString(lang);
});

async function loadTranslations(lang) {
  const response = await fetch(`translations/${lang}.json`);
  return await response.json();
}

function getTranslation(key, lang) {
  return translations[key]?.[lang] || translations[key]?.['ru'] || key;
}

console.log('Current lang:', lang);
console.log('Translating element:', element);