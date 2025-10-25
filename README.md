# Jadwal UTS (Meliana) — Dokumentasi Repo

Ringkasan singkat aplikasi web untuk menampilkan dan mengekspor jadwal Ujian Tengah Semester (UTS) serta menampilkan hitung mundur ke ujian berikutnya.

## Fitur utama
- Menampilkan daftar jadwal ujian yang dapat diurutkan. (Lihat fungsi [`populateSchedule`](index.html))
- Hitung mundur ujian berikutnya dan status ujian (akan/sedang/selesai). (Lihat [`updateCountdown`](index.html) dan [`findNextExam`](index.html))
- Tandai ujian sebagai selesai (disimpan ke localStorage). (Lihat [`saveCompletedStatus`](index.html) dan [`addCheckboxListeners`](index.html))
- Tambah satu ujian ke Google Calendar. (Lihat [`generateGCalLink`](index.html))
- Ekspor seluruh jadwal ke file `.ics`. (Lihat [`generateICSFile`](index.html))
- PWA dengan Service Worker untuk caching offline. (Lihat [sw.js](sw.js) dan [manifest.json](manifest.json))

## Struktur file
- [index.html](index.html) — Halaman aplikasi dan semua logika JavaScript (dataset `scheduleData`, UI, event handlers).
  - Variabel/data: [`scheduleData`](index.html)
  - Fungsi penting: [`populateSchedule`](index.html), [`sortData`](index.html), [`generateGCalLink`](index.html), [`generateICSFile`](index.html), [`updateCountdown`](index.html), [`findNextExam`](index.html), [`addCheckboxListeners`](index.html), [`formatDate`](index.html), [`saveCompletedStatus`](index.html)
- [style.css](style.css) — Gaya lengkap aplikasi (variabel warna, komponen, responsive).
- [sw.js](sw.js) — Service Worker PWA (cache-first strategy).
- [manifest.json](manifest.json) — Manifest PWA (ikon, nama, warna tema).

## Format data jadwal
Contoh format yang dipakai di [index.html](index.html):
```javascript
const scheduleData = [
  {
    id: "MAN401",
    date: "2025-10-27", // YYYY-MM-DD
    time: "14:00",      // HH:mm (WIB)
    subject: "Manajemen Strategi",
    room: "401",
    seat: "25",
    day: "Senin"
  },
  // ...
];
```

Durasi default setiap ujian: 2 jam (dipakai oleh [`generateGCalLink`](index.html) dan [`generateICSFile`](index.html)).

## Cara pakai (end-user)
1. Buka [index.html](index.html) pada browser modern.
2. Gunakan dropdown "Urutkan" untuk memilih urutan.
3. Klik "Tambah ke Kalender" pada kartu untuk membuka Google Calendar dengan detail acara (fungsi [`generateGCalLink`](index.html)).
4. Klik "Ekspor Semua (.ics)" untuk mengunduh file kalender (`generateICSFile`).

## PWA / Offline
- Service Worker: [sw.js](sw.js) — mendaftarkan cache (lihat constant `CACHE_NAME` dan `FILES_TO_CACHE` di file tersebut).
- Manifest: [manifest.json](manifest.json) — metadata PWA dan ikon.

## Pengembangan
- Styling utama ada di [style.css](style.css). Untuk menyesuaikan tema/warna, ubah variabel di :root.
- Logika UI dan export berada di [index.html](index.html). Untuk menambah field pada jadwal, perbarui `scheduleData` dan fungsi rendering (`populateSchedule`).

## Kontribusi
- Buat pull request atau issue dengan deskripsi perubahan.
- Jaga konsistensi format tanggal (`YYYY-MM-DD`) dan waktu (`HH:mm`).

## Lisensi
Proyek ini menggunakan lisensi MIT (sesuaikan jika diperlukan).

-- selesai --