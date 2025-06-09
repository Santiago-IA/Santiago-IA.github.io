const CACHE_NAME = 'portfolio-cache-v1';
const ASSETS_TO_CACHE = [
  '/', '/index.html', '/style.css', '/globals.css',
  '/img/foto.jpg', '/img/aws.png', '/img/github.png',
  '/manifest.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(resp => resp || fetch(e.request)));
});
