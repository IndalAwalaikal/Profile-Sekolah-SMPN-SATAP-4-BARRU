import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    title: "Partisipasi & Prestasi Gala Siswa Tingkat Kecamatan",
    level: "Kecamatan",
    year: 2025,
    field: "Olahraga (Sepak Bola & Atletik)",
    students: ["Tim Gala Siswa UPTD SMPN Satap 4 Barru"],
  },
  {
    title: "Kontingen Kemah & Lomba Tingkat Penggalang Pramuka Kabupaten Barru",
    level: "Kabupaten",
    year: 2025,
    field: "Kepramukaan & Keterampilan Baris-Berbaris",
    students: ["Regu Pramuka Penggalang Putra & Putri Satap 4 Barru"],
  },
  {
    title: "Finalis OSN Matematika dan IPA (MIPAS) Tingkat Kabupaten",
    level: "Kabupaten",
    year: 2025,
    field: "Olimpiade Sains (MIPAS)",
    students: ["Siswa Binaan Klub OSN MIPAS Sekolah"],
  },
  {
    title: "Apresiasi Tari Tradisional Festival Seni Budaya Daerah",
    level: "Kecamatan",
    year: 2025,
    field: "Seni & Pelestarian Budaya Lokal",
    students: ["Sanggar Seni Tari Tradisional Banga-banga"],
  },
  {
    title: "Juara Lomba Kebersihan Kelas & Pembiasaan Lingkungan Sekolah",
    level: "Kecamatan",
    year: 2025,
    field: "Lingkungan Hidup & Kebersihan",
    students: ["Perwakilan Rombel Kelas Fase D"],
  },
  {
    title: "Partisipasi Lomba Baca Tulis Al-Qur'an (BTQ) & Tahfidz Remaja",
    level: "Kecamatan",
    year: 2024,
    field: "Keagamaan & Imtaq",
    students: ["Peserta Didik Binaan Ekstrakurikuler Keagamaan"],
  },
];

export const achievementLevels = ["Semua", "Kecamatan", "Kabupaten", "Provinsi", "Nasional"] as const;
