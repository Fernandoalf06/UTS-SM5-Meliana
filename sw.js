// Nama cache unik untuk versi aplikasi ini
// Ubah ini (misal, 'jadwal-uts-v1.3') jika Anda mengubah file-file di FILES_TO_CACHE
const CACHE_NAME = 'jadwal-uts-v1.2'; 

// Daftar file inti yang diperlukan agar aplikasi berfungsi offline
// Kita cache file utama, CSS, manifest, dan font.
const FILES_TO_CACHE = [
  '/', // Alias untuk index.html
  'index.html',
  'style.css', // CSS Semantik kita
  'manifest.json',
  // 'https://cdn.tailwindcss.com', // <-- SUDAH DIHAPUS
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' // Font masih di-cache
];

// Event 'install': Dipanggil saat Service Worker pertama kali diinstal
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  // Tunggu sampai cache selesai diisi
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Pre-caching file-file inti');
        // Tambahkan semua file inti ke cache
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  // Paksa service worker yang baru untuk aktif (menggantikan yang lama jika ada)
  self.skipWaiting();
});

// Event 'activate': Dipanggil saat Service Worker aktif
// Ini adalah tempat yang baik untuk membersihkan cache lama
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        // Hapus cache lama yang tidak sama dengan CACHE_NAME
        // (Ini akan menghapus 'v1.1' yang lama)
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Menghapus cache lama', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // Ambil kontrol atas semua halaman yang terbuka agar SW baru bisa langsung bekerja
  return self.clients.claim();
});

// Event 'fetch': Dipanggil setiap kali ada permintaan jaringan (request) dari PWA
// Strategi: Cache-First (Utamakan Cache)
self.addEventListener('fetch', (event) => {
  // Kita hanya peduli pada request GET
  if (event.request.method !== 'GET') {
    return;
  }

  // Tanggapi dengan data dari cache terlebih dahulu
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Jika request ada di cache, kembalikan dari cache
        if (response) {
          // console.log('[Service Worker] Mengambil dari cache:', event.request.url);
          return response;
        }
        
        // Jika tidak ada di cache, ambil dari jaringan (network)
        // console.log('[Service Worker] Mengambil dari jaringan:', event.request.url);
        return fetch(event.request)
          .then((networkResponse) => {
            // (Opsional) Simpan response baru ke cache untuk request selanjutnya
            // Kita perlu meng-clone response karena response hanya bisa dibaca sekali
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Hanya cache resource yang berhasil (status 200)
                if (networkResponse.ok && event.request.url.startsWith('http')) {
                  cache.put(event.request, responseToCache);
                }
              });
            return networkResponse;
          })
          .catch(() => {
            // Jika offline dan tidak ada di cache, gagal
            console.log('[Service Worker] Gagal mengambil dari jaringan (mungkin offline).');
          });
      })
  );
});

