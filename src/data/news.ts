import type { NewsArticle } from "@/types";

export const newsCategories = ["Prestasi", "Akademik", "Kegiatan"] as const;

export const news: NewsArticle[] = [
  {
    slug: "siswa-raih-juara-1-osn-matematika",
    title: "Dua Siswa SMPN Satap 4 Barru Raih Juara 1 dan 2 OSN Matematika",
    category: "Prestasi",
    excerpt:
      "Dua peserta didik meraih juara pertama dan kedua pada OSN Matematika tingkat Kabupaten Barru dan melaju ke tingkat provinsi.",
    content: [
      "Dua peserta didik UPTD SMPN SATAP 4 BARRU meraih juara pertama dan kedua pada OSN Matematika tingkat Kabupaten Barru 2026.",
      "Capaian tersebut menjadi hasil pembinaan bidang matematika di sekolah dan mengantarkan peserta didik melanjutkan kompetisi ke tingkat Provinsi Sulawesi Selatan.",
      "Pihak sekolah mengapresiasi peserta didik dan guru pembimbing yang telah mempersiapkan mereka untuk mengikuti kompetisi.",
      "Peserta didik melanjutkan persiapan untuk mengikuti OSN tingkat provinsi pada Oktober 2026.",
    ],
    date: "2026-09-05",
    author: "Humas Sekolah",
    image: "/images/berita-1.jpg",
    tags: ["OSN", "Matematika", "Prestasi Siswa"],
  },
  {
    slug: "greenhouse-kompos-adiwiyata",
    title: "Program Greenhouse Kompos Sekolah",
    category: "Kegiatan",
    excerpt:
      "Program pengolahan sampah organik sekolah mendukung perawatan taman dan kebun belajar.",
    content: [
      "Program lingkungan sekolah mengolah sampah organik menjadi kompos untuk mendukung perawatan taman dan kebun belajar.",
      "Sampah organik dari lingkungan sekolah dipilah dan diolah menjadi kompos untuk mendukung perawatan taman dan kebun sekolah.",
      "Kegiatan ini melibatkan peserta didik dalam pembiasaan pengelolaan sampah dan perawatan lingkungan.",
      "Kegiatan ini merupakan bagian dari komitmen sekolah sebagai adiwiyata kabupaten dan pembelajaran proyek penguatan profil pelajar Pancasila (P5) tema gaya hidup berkelanjutan.",
    ],
    date: "2026-08-15",
    author: "Pembina KIR",
    image: "/images/berita-3.jpg",
    tags: ["Adiwiyata", "Lingkungan", "P5"],
  },
  {
    slug: "festival-seni-bugis",
    title: "Festival Seni Bugis Kembali Digelar, Siswa Tampilkan Kesenian La Galigo",
    category: "Kegiatan",
    excerpt:
      "Festival seni tahunan menampilkan tari la galigo, pantun Bugis, dan konser angklung yang diikuti seluruh rombongan belajar.",
    content: [
      "Festival Seni Bugis digelar kembali di lapangan serbaguna sekolah. Kegiatan tahunan ini menampilkan tari la galigo, pantun Bugis, konser angklung, dan lomba menyanyi lagu daerah yang diikuti seluruh rombongan belajar.",
      "Festival dibuka oleh Camat Barru dan dihadiri tokoh masyarakat Anabanua serta perwakilan sekolah mitra. Panitia juga mengundang sanggar seni lokal sebagai pembina seni tradisional sekolah.",
      "Lewat festival ini, sekolah berkomitmen menjaga kesenian daerah sebagai bagian dari pembinaan karakter siri' na pacce dan pembelajaran seni budaya.",
      "Dokumentasi lengkap kegiatan dapat dilihat pada halaman galeri situs sekolah.",
    ],
    date: "2026-07-30",
    author: "Humas Sekolah",
    image: "/images/berita-4.jpg",
    tags: ["Seni Budaya", "Festival", "Budaya Bugis"],
  },
  {
    slug: "program-literasi-15-menit",
    title: "Program Literasi 15 Menit, Kebiasaan Membaca Sebelum Pembelajaran",
    category: "Akademik",
    excerpt:
      "Seluruh kelas membaca buku pilihan selama 15 menit sebelum pembelajaran dimulai, berdasarkan keputusan rapat dewan guru.",
    content: [
      "Sejak semester ini, seluruh rombongan belajar menerapkan program literasi 15 menit sebelum pembelajaran pertama dimulai. Program ini merupakan keputusan rapat dewan guru dalam kerangka penguatan literasi kurikulum merdeka.",
      "Siswa memilih buku dari perpustakaan kelas yang diisi koleksi pengayaan, lalu menulis ringkasan singkat pada buku literasi masing-masing. Setiap kelas juga menampilkan bedah buku dua kali sebulan di muka kelas.",
      "Sekolah mendorong kebiasaan membaca berkelanjutan melalui pemanfaatan perpustakaan dan kegiatan literasi di kelas.",
      "Orang tua siswa didorong mendampingi kebiasaan membaca di rumah melalui program membaca bersama keluarga setiap akhir pekan.",
    ],
    date: "2026-07-12",
    author: "Waka Kurikulum",
    image: "/images/berita-5.jpg",
    tags: ["Literasi", "Kurikulum Merdeka"],
  },
  {
    slug: "tim-basket-melaju-ke-provinsi",
    title: "Tim Basket Sekolah Melaju ke Kejuaraan Provinsi Sulawesi Selatan",
    category: "Prestasi",
    excerpt:
      "Setelah juara 2 kejuaraan kabupaten, tim basket putra sekolah melaju ke kejuaraan provinsi yang berlangsung di Makassar.",
    content: [
      "Tim basket putra SMPN Satap 4 Barru melaju ke kejuaraan provinsi Sulawesi Selatan setelah meraih juara 2 pada kejuaraan tingkat kabupaten yang berlangsung di Pangkep.",
      "Tim berlatih dengan pendampingan guru pendidikan jasmani di lapangan sekolah.",
      "Dukungan dari komite sekolah dan alumni memungkinkan tim mengikuti uji coba melawan klub basket siswa di Makassar sebelum kejuaraan provinsi.",
      "Panitia kejuaraan menyampaikan jadwal pertandingan akan diumumkan melalui halaman agenda situs sekolah.",
    ],
    date: "2026-06-25",
    author: "Humas Sekolah",
    image: "/images/berita-6.jpg",
    tags: ["Olahraga", "Basket", "Prestasi"],
  },
];

export function getLatestNews(count = 3) {
  return [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

export function getNewsByCategory(category: string | undefined) {
  if (!category) return news;
  return news.filter((item) => item.category === category);
}

export function getNewsBySlug(slug: string) {
  return news.find((item) => item.slug === slug);
}

export function getRelatedNews(slug: string, count = 2) {
  const current = getNewsBySlug(slug);
  if (!current) return [];
  return news
    .filter((item) => item.slug !== slug && item.category === current.category)
    .slice(0, count);
}
