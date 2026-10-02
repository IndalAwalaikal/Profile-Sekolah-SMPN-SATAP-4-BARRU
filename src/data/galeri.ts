import type { GalleryAlbum } from "@/types";

export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "festival-seni-bugis-2026",
    title: "Festival Seni Bugis 2026",
    description: "Tari la galigo, pantun Bugis, dan konser angklung pada pentas seni tahunan sekolah.",
    date: "2026-07-30",
    category: "Seni Budaya",
    cover: "/images/galeri-1.jpg",
    photos: [
      { src: "/images/galeri-1.jpg", caption: "Tari la galigo pembuka festival" },
      { src: "/images/galeri-2.jpg", caption: "Konser angklung kelas 8" },
      { src: "/images/galeri-3.jpg", caption: "Lomba pantun Bugis antar kelas" },
      { src: "/images/galeri-4.jpg", caption: "Panggung utama di lapangan serbaguna" },
      { src: "/images/galeri-5.jpg", caption: "Penampilan sanggar seni mitra" },
      { src: "/images/galeri-6.jpg", caption: "Penutupan dan penyerahan penghargaan" },
    ],
  },
  {
    slug: "kejuaraan-basket-kabupaten",
    title: "Kejuaraan Basket Kabupaten",
    description: "Tim basket putra sekolah di kejuaraan tingkat kabupaten di Pangkep.",
    date: "2026-06-20",
    category: "Olahraga",
    cover: "/images/galeri-7.jpg",
    photos: [
      { src: "/images/galeri-7.jpg", caption: "Pemanasan sebelum pertandingan" },
      { src: "/images/galeri-8.jpg", caption: "Momen pertandingan semifinal" },
      { src: "/images/galeri-9.jpg", caption: "Tim basket putra bersama pembina" },
      { src: "/images/galeri-10.jpg", caption: "Penyerahan piala juara 2" },
    ],
  },
  {
    slug: "adiwiyata-greenhouse",
    title: "Kegiatan Adiwiyata & Greenhouse",
    description: "Pengelolaan kompos, taman obat, dan kebun gizi sekolah oleh tim KIR.",
    date: "2026-08-15",
    category: "Lingkungan",
    cover: "/images/galeri-11.jpg",
    photos: [
      { src: "/images/galeri-11.jpg", caption: "Greenhouse kompos takakura" },
      { src: "/images/galeri-12.jpg", caption: "Panen pupuk organik bersama KIR" },
      { src: "/images/galeri-2.jpg", caption: "Taman obat dan taman baca" },
      { src: "/images/galeri-5.jpg", caption: "Penyemaian bibit kebun gizi" },
    ],
  },
  {
    slug: "hari-pertama-sekolah",
    title: "Hari Pertama Masuk Sekolah",
    description: "Penyambutan siswa baru tahun ajaran 2026/2027 bersama wali kelas.",
    date: "2026-07-13",
    category: "Kesiswaan",
    cover: "/images/galeri-3.jpg",
    photos: [
      { src: "/images/galeri-3.jpg", caption: "Penyambutan siswa baru di gerbang" },
      { src: "/images/galeri-6.jpg", caption: "Pembekalan dan perkenalan wali kelas" },
      { src: "/images/galeri-9.jpg", caption: "Kenalkan lingkungan sekolah" },
      { src: "/images/galeri-12.jpg", caption: "Foto bersama angkatan 2026" },
    ],
  },
];

export const galleryCategories = ["Semua", "Seni Budaya", "Olahraga", "Lingkungan", "Kesiswaan"] as const;

export function getAlbumBySlug(slug: string) {
  return galleryAlbums.find((album) => album.slug === slug);
}
