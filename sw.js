const CACHE_NAME = "school-academy-v1.3";
const OFFLINE_URL = "/offline.html";
const ASSETS = [
  "/",
  "/index.html",
  "/about.html",
  "/program.html",
  "/contacts.html",
  "/offline.html",
  "/css/style.css",
  "/js/main.js",
  "/img/logo-uz.png",
  "/img/banner-tashkent.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE_URL)));
  } else {
    event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
  }
});
