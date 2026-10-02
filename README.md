# Website UPTD SMPN SATAP 4 BARRU

> Website resmi UPTD SMPN SATAP 4 BARRU, sekolah menengah pertama satu atap di Desa Anabanua, Kecamatan Barru, Kabupaten Barru, Sulawesi Selatan.

Situs ini menyajikan informasi sekolah, kegiatan akademik, berita, agenda, galeri, PPDB, dan informasi kontak dalam antarmuka yang responsif dan dapat dipasang sebagai aplikasi web progresif (PWA).

**Situs:** [smpnsatap4barru.sch.id](https://smpnsatap4barru.sch.id)

## Navigasi

- [Teknologi](#teknologi)
- [Memulai](#memulai)
  - [Prasyarat](#prasyarat)
  - [Instalasi dan server pengembangan](#instalasi-dan-server-pengembangan)
  - [Perintah yang tersedia](#perintah-yang-tersedia)
- [Fitur](#fitur)
- [Struktur proyek](#struktur-proyek)
- [Mengelola konten dan gambar](#mengelola-konten-dan-gambar)
- [Deploy](#deploy)
- [Catatan pengembangan](#catatan-pengembangan)
- [Pengembang](#pengembang)
- [Lisensi](#lisensi)

## Teknologi

- [Next.js 16](https://nextjs.org/) dengan App Router
- [React 19](https://react.dev/) dan TypeScript
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://zustand.docs.pmnd.rs/) untuk state UI tertentu
- Next Image dan Cloudinary untuk penyajian gambar
- ESLint untuk pemeriksaan kualitas kode

## Memulai

### Prasyarat

- Node.js **20.9.0 atau lebih baru**
- npm (lockfile npm disertakan)

### Instalasi dan server pengembangan

```bash
git clone <URL-repositori>
cd <folder-repositori>
npm ci
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat situs dalam mode pengembangan. Proyek ini tidak memerlukan file `.env` untuk konfigurasi bawaan.

### Perintah yang tersedia

| Perintah | Kegunaan |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan Next.js. |
| `npm run lint` | Menjalankan ESLint pada proyek. |
| `npm run build` | Membuat build produksi. |
| `npm run start` | Menjalankan build produksi yang sudah dibuat. |
| `node scripts/generate-placeholders.mjs` | Membuat ulang ilustrasi placeholder SVG di `public/images`. |

Untuk menjalankan versi produksi secara lokal:

```bash
npm run build
npm run start
```

## Fitur

- Beranda dengan carousel hero, ringkasan informasi, berita, agenda, dan galeri.
- Halaman profil sekolah, struktur organisasi, pendidik dan tenaga kependidikan, serta fasilitas.
- Informasi kurikulum, ekstrakurikuler, prestasi, agenda, PPDB, unduhan, dan kontak.
- Pencarian situs, navigasi responsif, dan mode terang/gelap.
- Galeri album dengan lightbox dan navigasi keyboard.
- Metadata halaman, Open Graph, sitemap, robots, dan umpan RSS.
- Manifest PWA, ikon aplikasi, serta penghitung pengunjung sederhana.

## Struktur proyek

```text
src/
├── app/          # Rute halaman, layout, metadata, dan route handler
├── components/   # Komponen UI, layout, dan fitur per halaman
├── data/         # Konten situs dalam modul TypeScript dan JSON
├── lib/          # Konfigurasi situs dan fungsi bantu
├── store/        # State bersama berbasis Zustand
└── types/        # Tipe TypeScript bersama
public/           # Ikon, gambar lokal, service worker, dan berkas statis
scripts/          # Utilitas pembuatan placeholder dan pengolahan aset
```

Rute utama didefinisikan di `src/app`: `/`, `/profil`, `/kurikulum`, `/agenda`, `/ekstrakurikuler`, `/prestasi`, `/berita`, `/galeri`, `/ppdb`, `/unduhan`, dan `/kontak`. Berita dan album galeri memiliki halaman detail dinamis.

## Mengelola konten dan gambar

- Konten berita, agenda, galeri, profil, prestasi, ekstrakurikuler, dan PPDB disimpan di `src/data/`. Perbarui data dan tipe terkait di sana.
- Konfigurasi nama, alamat, identitas sekolah, navigasi, domain, dan metadata utama berada di `src/lib/site.ts`.
- Gambar statis lokal disimpan di `public/`. Gambar hero menggunakan Cloudinary dengan transformasi responsif; domain Cloudinary yang diizinkan untuk Next Image dikonfigurasi di `next.config.ts`.
- Sebelum menerbitkan perubahan konten, pastikan informasi sekolah, tahun ajaran, kontak, tautan, foto, dan atribusi sudah benar serta mendapat izin penggunaan.

## Deploy

Aplikasi dapat dijalankan pada layanan hosting yang mendukung Next.js 16 dan Node.js 20.9+. Ikuti alur build dan start di atas atau gunakan integrasi Next.js pada penyedia hosting yang dipilih.

Route `/api/visitors` menyimpan penghitung ke `src/data/visitors.json` pada filesystem lokal. Lingkungan serverless atau filesystem hanya-baca tidak menjamin perubahan ini tersimpan. Untuk penghitung yang persisten pada deployment seperti itu, gunakan penyimpanan eksternal atau database.

## Catatan pengembangan

- Gunakan `npm ci` agar dependensi konsisten dengan `package-lock.json`.
- Berkas `.env*` diabaikan oleh Git. Jika kelak konfigurasi lingkungan diperlukan, dokumentasikan variabelnya dan gunakan `.env.example` hanya untuk nama variabel serta nilai contoh nonrahasia.
- Jangan masukkan kredensial, token, atau data pribadi ke repositori.

## Pengembang

Proyek ini dikembangkan oleh **Indal Awalaikal** bersama **Tim Lentera Anabanua**, sebagai bagian dari **KKN-PPL UNM Angkatan XXXIII**.

## Lisensi

Kode sumber dan dokumentasi proyek ini dilisensikan di bawah [MIT License](LICENSE). Gambar, logo, merek, foto, dan materi pihak ketiga yang ada di repositori atau dimuat dari layanan eksternal tidak otomatis tercakup dalam lisensi tersebut; hak dan ketentuan penggunaannya mengikuti pemilik atau lisensi masing-masing.
