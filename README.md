# Jadwal UTS ke Google Calendar

Aplikasi berbasis web untuk membantu mahasiswa mengelola jadwal Ujian Tengah Semester (UTS) dengan mudah. Aplikasi ini memungkinkan pengguna untuk melihat jadwal ujian, menghitung mundur waktu menuju ujian berikutnya, dan mengekspor jadwal ke Google Calendar atau file `.ics`.

## Fitur

1. **Hitung Mundur Ujian Berikutnya**  
   Menampilkan waktu hitung mundur menuju ujian berikutnya secara real-time.

2. **Pengurutan Jadwal**  
   Jadwal ujian dapat diurutkan berdasarkan:
   - Tanggal ujian (terdekat)
   - Nama mata kuliah (A-Z)

3. **Ekspor Jadwal ke Google Calendar**  
   Setiap jadwal ujian dapat ditambahkan langsung ke Google Calendar dengan satu klik.

4. **Ekspor Semua Jadwal ke File `.ics`**  
   Semua jadwal ujian dapat diekspor ke file `.ics` yang kompatibel dengan berbagai aplikasi kalender.

## Teknologi yang Digunakan

- **HTML**: Struktur halaman web.
- **CSS**: Menggunakan [Tailwind CSS](https://tailwindcss.com) untuk desain responsif dan modern.
- **JavaScript**: Logika aplikasi, termasuk pengelolaan jadwal, hitung mundur, dan ekspor jadwal.

## Cara Menggunakan

1. **Buka Aplikasi**  
   Cukup buka file `index.html` di browser Anda.

2. **Lihat Jadwal Ujian**  
   Jadwal ujian akan dimuat secara otomatis di halaman utama.

3. **Hitung Mundur Ujian Berikutnya**  
   Bagian atas halaman akan menampilkan hitung mundur menuju ujian berikutnya.

4. **Ekspor Jadwal**  
   - Klik tombol "Tambah ke Kalender" untuk menambahkan jadwal ke Google Calendar.
   - Klik tombol "Ekspor Semua" untuk mengunduh file `.ics` yang berisi semua jadwal.

## Struktur Data Jadwal

Data jadwal ujian disimpan dalam array JavaScript dengan format berikut:

```javascript
const scheduleData = [
    {
        "kodeMK": "11034578",
        "mataKuliah": "Manajemen Strategi",
        "kelas": "G",
        "tanggal": "27-10-2025",
        "jam": "14:00",
        "ruang": "401",
        "kursi": "25"
    },
    // Jadwal lainnya...
];
```

## Catatan

- Durasi setiap ujian diasumsikan 2 jam. Pastikan untuk memeriksa kembali detail di Google Calendar sebelum menyimpan.
- Zona waktu yang digunakan adalah **Asia/Jakarta**.

## Kontribusi

Kontribusi sangat diterima! Jika Anda memiliki ide untuk meningkatkan aplikasi ini, silakan buat pull request atau buka issue di repositori ini.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).