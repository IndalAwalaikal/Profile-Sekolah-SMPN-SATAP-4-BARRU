export const siteConfig = {
  name: "SMPN Satap 4 Barru",
  academicYear: "2026/2027",
  legalName: "UPTD SMPN SATAP 4 BARRU",
  tagline: "Unggul Berprestasi dan Berakhlak Mulia",
  description:
    "Website resmi UPTD SMP Negeri Satap 4 Barru, Dusun Banga-Banga, Desa Anabanua, Kabupaten Barru, Sulawesi Selatan. Mengimplementasikan Kurikulum Merdeka, keunggulan Imtaq dan Iptek, kemandirian, serta kearifan budaya lokal.",
  url: "https://smpnsatap4barru.my.id",
  npsn: "40314184",
  akreditasi: "B (Baik)",
  status: "Negeri",
  bentukPendidikan: "SMP",
  jenjang: "DIKDAS",
  kementerianPembina: "Kementerian Pendidikan Dasar dan Menengah",
  naungan: "Pemerintah Kabupaten Barru",
  skOperasional: "1179/C3/DS/2008",
  tmtSkOperasional: "2 Juli 2008",
  address:
    "Jl. Pahlawan Dusun Banga-Banga, Desa Anabanua, Kec. Barru, Kab. Barru, Prov. Sulawesi Selatan 90712",
  phone: "",
  email: "barru.brru.smpn4satapbarru@gmail.com",
  officeHours: "Senin – Sabtu, 07.30 – 14.00 WITA",
  mapsUrl: "https://www.google.com/maps?q=Anabanua+Barru",
  mapsEmbed:
    "https://maps.google.com/maps?q=Anabanua%20Barru%20Sulawesi%20Selatan&t=&z=12&ie=UTF8&iwloc=&output=embed",
  socials: [] as { name: string; href: string; icon: string }[],
} as const;

export type SiteConfig = typeof siteConfig;

export interface NavLeaf {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children?: NavLeaf[];
}

export const mainNav: NavGroup[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Profil",
    href: "/profil",
    children: [
      {
        label: "Tentang & Karakteristik",
        href: "/profil",
        description: "Visi, misi, tujuan, karakteristik, dan kemitraan",
      },
      {
        label: "Struktur Organisasi",
        href: "/profil/struktur-organisasi",
        description: "Susunan organisasi dan tim pengembang kurikulum",
      },
      {
        label: "Pendidik & Tendik",
        href: "/profil/guru-dan-staf",
        description: "Daftar guru mata pelajaran dan tenaga kependidikan",
      },
      {
        label: "Sarana & Lingkungan",
        href: "/profil/fasilitas",
        description: "Laboratorium, perpustakaan, dan lingkungan alam",
      },
    ],
  },
  {
    label: "Akademik",
    href: "/kurikulum",
    children: [
      {
        label: "Kurikulum & Pembelajaran",
        href: "/kurikulum",
        description: "Kurikulum, program unggulan, dan kegiatan pembelajaran",
      },
      {
        label: "Ekstrakurikuler",
        href: "/ekstrakurikuler",
        description: "Pramuka, seni tari, olahraga, PMR, dan keagamaan",
      },
      {
        label: "Prestasi Siswa",
        href: "/prestasi",
        description: "Gala Siswa, kemah Pramuka, dan capaian membanggakan",
      },
      {
        label: "Agenda Kegiatan",
        href: "/agenda",
        description: "Kalender akademik dan jadwal kegiatan sekolah",
      },
    ],
  },
  {
    label: "Informasi",
    href: "/berita",
    children: [
      { label: "Berita", href: "/berita", description: "Kabar terbaru seputar kegiatan sekolah" },
      { label: "Galeri", href: "/galeri", description: "Dokumentasi foto kegiatan dan lingkungan" },
      { label: "Unduhan", href: "/unduhan", description: "Dokumen publik sekolah berdasarkan kategori" },
      { label: "Tanya Jawab", href: "/faq", description: "Jawaban ringkas untuk pertanyaan umum" },
      { label: "Kontak & Lokasi", href: "/kontak", description: "Alamat, peta lokasi Banga-banga, dan kemitraan" },
    ],
  },
];

export const footerNav = {
  profil: [
    { label: "Tentang Sekolah", href: "/profil" },
    { label: "Karakteristik & Budaya Banga-banga", href: "/profil#karakteristik" },
    { label: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
    { label: "Guru dan Tenaga Kependidikan", href: "/profil/guru-dan-staf" },
    { label: "Sarana dan Lingkungan", href: "/profil/fasilitas" },
  ],
  akademik: [
    { label: "Kurikulum & Pembelajaran", href: "/kurikulum" },
    { label: "Program Unggulan", href: "/kurikulum#program-unggulan" },
    { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
    { label: "Prestasi Siswa", href: "/prestasi" },
    { label: `PPDB ${siteConfig.academicYear}`, href: "/ppdb" },
  ],
  informasi: [
    { label: "Berita Sekolah", href: "/berita" },
    { label: "Galeri Foto", href: "/galeri" },
    { label: "Unduhan", href: "/unduhan" },
    { label: "Tanya Jawab", href: "/faq" },
    { label: "Kemitraan & Kontak", href: "/kontak" },
  ],
} as const;
