document.addEventListener("DOMContentLoaded", function () {
  const langButtons = document.querySelectorAll(".lang-btn");
  const elementsToTranslate = {
    title: {
      РУ: "School Academy | Ташкент",
      UZ: "School Academy | Toshkent",
    },
    welcome: {
      РУ: "Добро пожаловать",
      UZ: "Xush kelibsiz",
    },
    address: {
      РУ: "Ташкент, Юнусабадский район",
      UZ: "Toshkent, Yunusobod tumani",
    },
    "main-nav-home": {
      РУ: "Главная",
      UZ: "Bosh sahifa",
    },
    "main-nav-about": {
      РУ: "О школе",
      UZ: "Maktab haqida",
    },
    "main-nav-programs": {
      РУ: "Программы",
      UZ: "Dasturlar",
    },
    "main-nav-contacts": {
      РУ: "Контакты",
      UZ: "Aloqa",
    },
  };

  langButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Удаляем активный класс у всех кнопок
      langButtons.forEach((btn) => btn.classList.remove("active"));

      // Добавляем активный класс текущей кнопке
      this.classList.add("active");

      // Получаем выбранный язык
      const lang = this.textContent;

      // Применяем перевод ко всем элементам
      document.title = elementsToTranslate["title"][lang];

      document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate");
        if (elementsToTranslate[key]) {
          element.textContent = elementsToTranslate[key][lang];
        }
      });

      // Сохраняем выбор языка в localStorage
      localStorage.setItem("selectedLang", lang);
    });
  });

  // Восстанавливаем выбранный язык при загрузке страницы
  const savedLang = localStorage.getItem("selectedLang") || "РУ";
  document.querySelector(`.lang-btn:contains('${savedLang}')`).click();
});
// ====222222222222=======
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Удаляем active у всех кнопок
    document.querySelectorAll(".lang-btn").forEach((b) => b.classList.remove("active"));

    // Добавляем active текущей кнопке
    this.classList.add("active");

    // Обновляем позицию слайдера
    const lang = this.getAttribute("data-lang");
    document.querySelector(".language-switcher").setAttribute("data-active-lang", lang);

    // Здесь можно добавить логику смены языка
    console.log("Выбран язык:", lang);
  });
});
