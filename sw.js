const CACHE_NAME = 'pork-qa-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // ถ้าเจอใน Cache ให้โหลดจาก Cache (ออฟไลน์), ถ้าไม่เจอให้โหลดจากเน็ต
        return response || fetch(event.request);
      })
  );
});
