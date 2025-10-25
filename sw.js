/*
  Service Worker untuk PWA Jadwal UTS
  Versi: 2.0 (Disesuaikan untuk Tailwind CSS)
*/

const CACHE_NAME = 'jadwal-uts-cache-v2.0';
const FILES_TO_CACHE = [
  '/', // Alias untuk index.html
  'index.html',
  'manifest.json',
  'https://cdn.tailwindcss.com', // Skrip Tailwind CSS
  'https://placehold.co/192x192/1e40af/ffffff?text=UTS', // Ikon PWA
  'https://placehold.co/512x512/1e40af/ffffff?text=UTS'  // Ikon PWA
  // style.css telah dihapus dari cache
];

// --- Instalasi Service Worker ---
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // Tunggu sampai cache dibuka dan semua file inti di-cache
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// --- Aktivasi Service Worker ---
self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // Hapus cache lama yang tidak sesuai dengan CACHE_NAME saat ini
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

// --- Intercept Fetch Requests (Cache-First) ---
self.addEventListener('fetch', (evt) => {
  // Hanya tangani request GET
  if (evt.request.method !== 'GET') {
    return;
  }

  console.log('[ServiceWorker] Fetch', evt.request.url);
  // Strategi Cache-First
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      if (response) {
        // Jika ada di cache, kembalikan dari cache
        console.log('[ServiceWorker] Returning from cache', evt.request.url);
        return response;
      }
      // Jika tidak ada di cache, fetch dari jaringan
      console.log('[ServiceWorker] Fetching from network', evt.request.url);
      return fetch(evt.request);
    })
  );
});

