import type { GalleryAlbum } from "@/types";

export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "visitasi-akreditasi-2026",
    title: "Visitasi Akreditasi 2026",
    description:
      "Dokumentasi penyambutan dan rangkaian visitasi akreditasi UPTD SMPN Satap 4 Barru.",
    category: "Akreditasi",
    cover: "/images/galeri-kegiatan/Akreditasi/1.webp",
    photos: [
      { src: "/images/galeri-kegiatan/Akreditasi/1.webp", caption: "Foto bersama dalam rangka visitasi akreditasi 2026." },
      { src: "/images/galeri-kegiatan/Akreditasi/2.webp", caption: "Kebersamaan guru dan warga sekolah pada rangkaian akreditasi." },
      { src: "/images/galeri-kegiatan/Akreditasi/3.webp", caption: "Foto bersama di halaman sekolah." },
      { src: "/images/galeri-kegiatan/Akreditasi/4.webp", caption: "Warga sekolah berfoto di depan gedung sekolah." },
      { src: "/images/galeri-kegiatan/Akreditasi/5.webp", caption: "Dokumentasi kegiatan di lingkungan sekolah." },
      { src: "/images/galeri-kegiatan/Akreditasi/6.webp", caption: "Foto bersama dalam rangka penyambutan tim visitasi." },
      { src: "/images/galeri-kegiatan/Akreditasi/7.webp", caption: "Kebersamaan warga sekolah pada kegiatan akreditasi." },
    ],
  },
  {
    slug: "kegiatan-literasi",
    title: "Kegiatan Literasi",
    description:
      "Dokumentasi kegiatan literasi Al-Quran & Bahasa Indonesia siswa di lingkungan dan ruang belajar sekolah.",
    category: "Literasi",
    cover: "/images/galeri-kegiatan/Literasi/1.webp",
    photos: [
      { src: "/images/galeri-kegiatan/Literasi/1.webp", caption: "Siswa mengikuti kegiatan literasi di teras sekolah." },
      { src: "/images/galeri-kegiatan/Literasi/2.webp", caption: "Siswa belajar dan membaca di ruang kelas." },
      { src: "/images/galeri-kegiatan/Literasi/3.webp", caption: "Siswa membaca dan menulis dalam kegiatan literasi." },
    ],
  },
  {
    slug: "kkn-ppl-unm-angkatan-xxxiii",
    title: "KKN-PPL UNM Angk. XXXIII",
    description:
      "Dokumentasi kegiatan mahasiswa KKN-PPL Universitas Negeri Makassar Angkatan XXXIII di UPTD SMPN Satap 4 Barru.",
    category: "KKN-PPL",
    cover: "/images/galeri-kegiatan/KKN-PPL/1.webp",
    photos: [
      { src: "/images/galeri-kegiatan/KKN-PPL/1.webp", caption: "Kegiatan KKN-PPL UNM Angkatan XXXIII di lingkungan sekolah." },
      { src: "/images/galeri-kegiatan/KKN-PPL/2.webp", caption: "Mahasiswa KKN-PPL UNM Angkatan XXXIII bersama warga sekolah." },
      { src: "/images/galeri-kegiatan/KKN-PPL/3.webp", caption: "Dokumentasi kebersamaan dalam kegiatan KKN-PPL." },
    ],
  },
  {
    slug: "kegiatan-pembelajaran",
    title: "Kegiatan Pembelajaran",
    description:
      "Dokumentasi suasana belajar siswa bersama guru di ruang kelas.",
    category: "Pembelajaran",
    cover: "/images/galeri-kegiatan/Pembelajaran/1.webp",
    photos: [
      { src: "/images/galeri-kegiatan/Pembelajaran/1.webp", caption: "Siswa mengikuti pembelajaran bersama di kelas." },
      { src: "/images/galeri-kegiatan/Pembelajaran/2.webp", caption: "Guru mendampingi kegiatan belajar siswa." },
      { src: "/images/galeri-kegiatan/Pembelajaran/3.webp", caption: "Suasana pembelajaran di ruang kelas." },
      { src: "/images/galeri-kegiatan/Pembelajaran/4.webp", caption: "Siswa mengikuti pelajaran dengan bimbingan guru." },
    ],
  },
];

export const galleryCategories = [
  "Semua",
  "Akreditasi",
  "Literasi",
  "KKN-PPL",
  "Pembelajaran",
] as const;

export function getAlbumBySlug(slug: string) {
  return galleryAlbums.find((album) => album.slug === slug);
}
