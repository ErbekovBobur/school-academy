const CACHE_NAME = "school-academy-v3";
const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/program.html",
  "/contacts.html",
  "/css/style.css",
  "/js/main.js",
  "/js/language.js",
  "/js/about.js",
  "/js/gallery.js",
  "/js/program.js",
  "/js/form-validation.js",
  "/js/analytics.js",
  "/js/seo.js",
  "/img/logo-uz.png",
  "/img/logo-uz@2x.png",
  "/img/orig.jpg",
  "/img/gallery/image1.jpg",
  "/img/gallery/image2.jpg",
  "/img/gallery/image3.jpg",
  "/img/gallery/image4.jpg",
  "/partials/header.html",
  "/partials/footer.html",
  "/manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          if (!fetchResponse || fetchResponse.status !== 200) {
            return fetchResponse;
          }
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)));
    })
  );
});
