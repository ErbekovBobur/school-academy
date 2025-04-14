document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    "school-name": { ru: "School Academy", uz: "School Akademiyasi" },
    address: { ru: "Ташкент, Юнусабадский район", uz: "Toshkent, Yunusobod tumani" },
    "nav-home": { ru: "Главная", uz: "Bosh sahifa" },
    "nav-about": { ru: "О школе", uz: "Maktab haqida" },
    "nav-programs": { ru: "Программы", uz: "Dasturlar" },
    "nav-contacts": { ru: "Контакты", uz: "Kontaktlar" },
    "appointment-title": { ru: "Записаться на экскурсию", uz: "Ekskursiyaga yozilish" },
    "appointment-subtitle": { ru: "Посетите нашу школу лично", uz: "Maktabimizga shaxsan tashrif buyuring" },
    "form-name": { ru: "Ваше имя", uz: "Ismingiz" },
    "form-phone": { ru: "Телефон", uz: "Telefon" },
    "form-date": { ru: "Дата посещения", uz: "Tashrif sanasi" },
    "form-program": { ru: "Интересующая программа", uz: "Qiziqtirgan dastur" },
    "form-submit": { ru: "Отправить заявку", uz: "Ariza yuborish" },
    "program-kg": { ru: "Детский сад", uz: "Bog'cha" },
    "program-elem": { ru: "Начальная школа", uz: "Boshlang'ich maktab" },
    "program-middle": { ru: "Средняя школа", uz: "O'rta maktab" },
    "form-success": {
      ru: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      uz: "Rahmat! Tez orada siz bilan bog'lanamiz.",
    },
    "footer-hours": { ru: "Часы работы", uz: "Ish soatlari" },
    "footer-address": { ru: "Адрес", uz: "Manzil" },
    "footer-contacts": { ru: "Контакты", uz: "Kontaktlar" },
    "footer-social": { ru: "Соцсети", uz: "Ijtimoiy tarmoqlar" },
    "gallery-title": { ru: "Галерея", uz: "Galereya" },
    "mission-title": { ru: "Наша миссия", uz: "Bizning vazifamiz" },
  };

  const langButtons = document.querySelectorAll(".lang-btn");
  const selectedLang = localStorage.getItem("selectedLang") || "ru";

  function applyTranslations(lang) {
    document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[key]) {
        element.textContent = translations[key][lang] || translations[key].ru;
      }
    });
    document.documentElement.lang = lang;
    localStorage.setItem("selectedLang", lang);
    updateActiveLangButton(lang);
  }

  function updateActiveLangButton(lang) {
    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.getAttribute("data-lang");
      applyTranslations(lang);
    });
  });

  applyTranslations(selectedLang);
});
