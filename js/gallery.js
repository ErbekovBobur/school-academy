// document.addEventListener("DOMContentLoaded", () => {
//   const galleryRow = document.getElementById("galleryRow");
//   const btnPrev = document.getElementById("galleryPrev");
//   const btnNext = document.getElementById("galleryNext");
//   const lightbox = document.getElementById("lightbox");
//   let currentIndex = 0;

//   // Gallery Scroll
//   btnPrev.addEventListener("click", () => galleryRow.scrollBy({ left: -300, behavior: "smooth" }));
//   btnNext.addEventListener("click", () => galleryRow.scrollBy({ left: 300, behavior: "smooth" }));

//   // Modal Gallery
//   function openModal(img) {
//     const lightboxImg = document.getElementById("lightbox-img");
//     lightboxImg.src = img.src;
//     lightbox.style.display = "flex";
//     currentIndex = Array.from(document.querySelectorAll(".gallery-card img")).indexOf(img);
//     lightbox.focus();
//   }

//   function closeModal() {
//     lightbox.style.display = "none";
//   }

//   function changeImage(direction) {
//     const images = document.querySelectorAll(".gallery-card img");
//     currentIndex = (currentIndex + direction + images.length) % images.length;
//     document.getElementById("lightbox-img").src = images[currentIndex].src;
//   }

//   document.querySelectorAll(".gallery-card img").forEach((img) => {
//     img.addEventListener("click", () => openModal(img));
//   });

//   document.querySelector(".lightbox-close").addEventListener("click", closeModal);
//   document.querySelector(".lightbox-nav.left").addEventListener("click", () => changeImage(-1));
//   document.querySelector(".lightbox-nav.right").addEventListener("click", () => changeImage(1));

//   lightbox.addEventListener("click", (e) => {
//     if (e.target === lightbox) closeModal();
//   });

//   // Keyboard Navigation
//   lightbox.addEventListener("keydown", (e) => {
//     if (e.key === "ArrowLeft") changeImage(-1);
//     if (e.key === "ArrowRight") changeImage(1);
//     if (e.key === "Escape") closeModal();
//   });
// });
// document.addEventListener("DOMContentLoaded", () => {
//   const galleryRow = document.getElementById("galleryRow");
//   const prevBtn = document.getElementById("galleryPrev");
//   const nextBtn = document.getElementById("galleryNext");
//   const lightbox = document.getElementById("lightbox");
//   const lightboxImg = document.getElementById("lightbox-img");
//   const closeBtn = document.querySelector(".lightbox-close");
//   const lightboxPrev = document.querySelector(".lightbox-nav.left");
//   const lightboxNext = document.querySelector(".lightbox-nav.right");
//   let currentIndex = 0;

//   if (!galleryRow) return;

//   // Lazy Load Images
//   const images = galleryRow.querySelectorAll("img");
//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const img = entry.target;
//         img.src = img.dataset.src || img.src;
//         observer.unobserve(img);
//       }
//     });
//   });

//   images.forEach((img) => {
//     img.dataset.src = img.src;
//     img.src = "";
//     observer.observe(img);
//   });

//   // Gallery Navigation
//   prevBtn?.addEventListener("click", () => {
//     galleryRow.scrollBy({ left: -300, behavior: "smooth" });
//   });

//   nextBtn?.addEventListener("click", () => {
//     galleryRow.scrollBy({ left: 300, behavior: "smooth" });
//   });

//   // Lightbox
//   galleryRow.querySelectorAll(".gallery-card").forEach((card, index) => {
//     card.addEventListener("click", () => {
//       currentIndex = index;
//       updateLightbox();
//       lightbox.style.display = "flex";
//       document.body.classList.add("no-scroll");
//     });
//   });

//   closeBtn?.addEventListener("click", closeLightbox);

//   lightboxPrev?.addEventListener("click", () => {
//     currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
//     updateLightbox();
//   });

//   lightboxNext?.addEventListener("click", () => {
//     currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
//     updateLightbox();
//   });

//   lightbox?.addEventListener("click", (e) => {
//     if (e.target === lightbox) closeLightbox();
//   });

//   function updateLightbox() {
//     lightboxImg.src = images[currentIndex].dataset.src || images[currentIndex].src;
//     lightboxImg.alt = images[currentIndex].alt;
//   }

//   function closeLightbox() {
//     lightbox.style.display = "none";
//     document.body.classList.remove("no-scroll");
//   }

//   // Keyboard Navigation
//   document.addEventListener("keydown", (e) => {
//     if (lightbox.style.display === "flex") {
//       if (e.key === "ArrowLeft") lightboxPrev.click();
//       if (e.key === "ArrowRight") lightboxNext.click();
//       if (e.key === "Escape") closeLightbox();
//     }
//   });
// });
//============================//==============================//
document.addEventListener('DOMContentLoaded', () => {
  const galleryRow = document.getElementById('galleryRow');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-nav.left');
  const lightboxNext = document.querySelector('.lightbox-nav.right');
  let currentIndex = 0;

  if (!galleryRow) {
    console.error('Gallery row not found');
    return;
  }

  // Lazy Load Images
  const images = galleryRow.querySelectorAll('img');
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          console.log('Loading image:', img.dataset.src);
        }
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '0px 0px 100px 0px' });

  images.forEach(img => {
    if (!img.dataset.src) {
      console.warn('No data-src for image:', img);
    }
    observer.observe(img);
  });

  // Gallery Navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      galleryRow.scrollBy({ left: -300, behavior: 'smooth' });
      console.log('Scrolling left');
    });
  } else {
    console.error('Previous button not found');
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      galleryRow.scrollBy({ left: 300, behavior: 'smooth' });
      console.log('Scrolling right');
    });
  } else {
    console.error('Next button not found');
  }

  // Lightbox
  galleryRow.querySelectorAll('.gallery-card').forEach((card, index) => {
    card.addEventListener('click', () => {
      currentIndex = index;
      updateLightbox();
      lightbox.style.display = 'flex';
      document.body.classList.add('no-scroll');
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);

  lightboxPrev?.addEventListener('click', () => {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    updateLightbox();
  });

  lightboxNext?.addEventListener('click', () => {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    updateLightbox();
  });

  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  function updateLightbox() {
    const img = images[currentIndex];
    lightboxImg.src = img.src || img.dataset.src;
    lightboxImg.alt = img.alt;
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }

  // Keyboard Navigation
  document.addEventListener('keydown', e => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowLeft') lightboxPrev.click();
      if (e.key === 'ArrowRight') lightboxNext.click();
      if (e.key === 'Escape') closeLightbox();
    }
  });
});