
  const galleryRow = document.getElementById("galleryRow");
  const btnPrev = document.getElementById("galleryPrev");
  const btnNext = document.getElementById("galleryNext");

  let autoScroll = true;
  let scrollSpeed = 0.5;
  let pauseTimeout;

  function continuousScroll() {
    if (autoScroll) {
      galleryRow.scrollLeft += scrollSpeed;

      // Циклическая прокрутка
      if (galleryRow.scrollLeft + galleryRow.clientWidth >= galleryRow.scrollWidth) {
        galleryRow.scrollLeft = 0;
      }
    }

    requestAnimationFrame(continuousScroll);
  }

  function pauseAutoScroll() {
    autoScroll = false;
    clearTimeout(pauseTimeout);
    pauseTimeout = setTimeout(() => {
      autoScroll = true;
    }, 4000); // пауза 4 сек
  }

  // Кнопки
  btnPrev.addEventListener("click", () => {
    galleryRow.scrollBy({ left: -300, behavior: "smooth" });
    pauseAutoScroll();
  });

  btnNext.addEventListener("click", () => {
    galleryRow.scrollBy({ left: 300, behavior: "smooth" });
    pauseAutoScroll();
  });

  // Пользовательская прокрутка мышью/тачем
  galleryRow.addEventListener("mousedown", pauseAutoScroll);
  galleryRow.addEventListener("touchstart", pauseAutoScroll);
  galleryRow.addEventListener("wheel", pauseAutoScroll);

  // Запуск
  window.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(continuousScroll);
  });

