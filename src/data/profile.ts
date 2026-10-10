import type { Teacher, TimelineEntry } from "@/types";
import { siteConfig } from "@/lib/site";

export const schoolDataYear = "2025/2026";

const publishedSchoolSnapshot = {
  year: schoolDataYear,
  studentCount: 56,
  rombelCount: 3,
} as const;

/** Identitas resmi sekolah sesuai dokumen KSP 2025/2026 dan Dapodik. */
export const schoolIdentity = [
  { label: "Nama Sekolah", value: siteConfig.legalName },
  { label: "NPSN", value: siteConfig.npsn },
  { label: "Status Sekolah", value: siteConfig.status },
  { label: "Bentuk Pendidikan", value: "SMP (Satu Atap)" },
  { label: "Jenjang Pendidikan", value: "Pendidikan Dasar (Fase D)" },
  { label: "Kementerian Pembina", value: siteConfig.kementerianPembina },
  { label: "Naungan", value: siteConfig.naungan },
  { label: "Dusun", value: "Banga-Banga" },
  { label: "Desa", value: "Desa Anabanua" },
  { label: "Kecamatan", value: "Kecamatan Barru" },
  { label: "Kabupaten", value: "Kabupaten Barru" },
  { label: "Provinsi", value: "Sulawesi Selatan" },
  { label: "Kode Pos", value: "90712" },
  { label: "No. SK Operasional", value: siteConfig.skOperasional },
  { label: "TMT SK Operasional", value: siteConfig.tmtSkOperasional },
  { label: "Akreditasi", value: siteConfig.akreditasi },
  { label: "Email Resmi", value: siteConfig.email },
] as const;

export const schoolLogo = {
  image: "/icons/logo-sekolah.png",
  alt: "Lambang resmi UPTD SMPN SATAP 4 BARRU",
  eyebrow: "Identitas Visual",
  heading: "Makna di Balik Lambang Sekolah",
  description: [
    "Lambang UPTD SMPN SATAP 4 BARRU merepresentasikan semangat ketulusan mendidik anak bangsa di bumi Barru, memadukan iman dan taqwa, penguasaan ilmu pengetahuan dan teknologi, serta kecintaan mendalam pada budaya bangsa.",
    "Bentuk dan warna mencerminkan jati diri sekolah satu atap di pedesaan yang asri dan bertekad mengantarkan peserta didiknya memiliki daya saing berwawasan global.",
  ],
  elements: [
    {
      title: "Iman, Taqwa & Akhlak Mulia",
      description:
        "Fondasi religiusitas seluruh warga sekolah yang tercermin dalam pembiasaan Baca Tulis Al-Qur'an dan shalat berjamaah.",
    },
    {
      title: "Keunggulan Iptek & Inovasi",
      description:
        "Komitmen menghadirkan pembelajaran berbasis teknologi informasi dan komunikasi untuk menjawab tuntutan era abad ke-21.",
    },
    {
      title: "Kearifan Budaya Banga-banga",
      description:
        "Menghargai nilai luhur Bugis seperti siri' na pacce, sipakatau, sipakalebbi, dan sipakainge dalam keseharian.",
    },
    {
      title: "Lingkungan Asri & Lestari",
      description:
        "Cerminan sekolah hijau yang damai di kelilingi pegunungan dan hamparan persawahan Desa Anabanua.",
    },
  ],
} as const;

export const schoolValues = [
  {
    title: "Berkarakter & Religius",
    description:
      "Penguatan imtaq melalui kegiatan keagamaan intensif, pembiasaan BTQ, shalat berjamaah, dan pembiasaan budaya 5S.",
  },
  {
    title: "Unggul Iptek & Projek",
    description:
      "Pembelajaran berbasis teknologi dan pembelajaran berbasis projek yang menumbuhkan daya nalar kritis dan kreativitas siswa.",
  },
  {
    title: "Mandiri & Berwawasan Global",
    description:
      "Mencetak insan pembelajar yang cakap menghadapi masa depan dengan tetap berakar kuat pada nilai budaya lokal.",
  },
] as const;

export const historyTimeline: TimelineEntry[] = [
  {
    year: "2008",
    title: "Penerbitan SK Operasional Resmi",
    description:
      "Pemerintah menerbitkan SK Izin Operasional Nomor 1179/C3/DS/2008 tertanggal 2 Juli 2008 sebagai legalitas penyelenggaraan SMP Negeri Satu Atap di Anabanua.",
  },
  {
    year: "2016",
    title: "Penguatan Model Sekolah Satu Atap",
    description:
      "Pengembangan layanan terpadu satu atap guna menjamin anak-anak di Dusun Banga-banga dan sekitar Desa Anabanua menuntaskan wajib belajar 9 tahun tanpa kendala jarak.",
  },
  {
    year: "2022",
    title: "Implementasi Kurikulum Merdeka",
    description:
      "Memulai adopsi Kurikulum Merdeka Fase D, mengedepankan pembelajaran berdiferensiasi dan Projek Penguatan Profil Pelajar Pancasila (P5).",
  },
  {
    year: "2025/2026",
    title: "KSP Genap Berbasis Karakter & Teknologi",
    description:
      "Pengesahan KSP 2025/2026 oleh Kepala Dinas Pendidikan dan Kebudayaan Kab. Barru, mengintegrasikan 8 Dimensi Profil Lulusan, penguatan literasi-numerasi, dan kemitraan strategis.",
  },
];

export const profileIntro = {
  eyebrow: "Gambaran Umum",
  heading: "Sekolah Berkarakter di Kawasan Pegunungan & Persawahan Banga-banga",
  paragraphs: [
    "UPTD SMPN SATAP 4 BARRU adalah satuan pendidikan formal jenjang Sekolah Menengah Pertama (SMP) negeri berstatus satu atap yang terletak di Dusun Banga-banga, Desa Anabanua, Kecamatan Barru, Kabupaten Barru, Provinsi Sulawesi Selatan.",
    "Sekolah ini berada di sisi jalan desa dan pemukiman warga yang jauh dari keramaian dan hiruk-pikuk pusat kota. Dikelilingi panorama pegunungan dan hamparan persawahan yang subur serta udara yang sejuk, sekolah memiliki halaman yang sangat luas dan lingkungan alam asri yang dimanfaatkan secara maksimal sebagai sumber belajar kontekstual.",
  ],
  image:
    "https://res.cloudinary.com/dmualsp81/image/upload/v1790953646/04f74b72-e9dd-4a92-97a1-39c155d1dc1b.png",
} as const;

export const visiMisi = {
  visi: "Terwujudnya Peserta Didik yang berkarakter; Unggul dalam imtaq dan iptek, kreatif, mandiri dan berwawasan global",
  motto: "Unggul Berprestasi dan Berakhlak Mulia",
  misi: [
    {
      title: "Keimanan dan Ketakwaan",
      description:
        "Memiliki karakter dan unggul dalam hal keimanan dan ketaqwaan kepada Tuhan Yang Maha Esa melalui kegiatan keagamaan secara intensif.",
    },
    {
      title: "Teknologi Informasi dan Komunikasi",
      description:
        "Memiliki karakter dan unggul dalam bidang teknologi informasi dan komunikasi melalui pembelajaran berbasis teknologi.",
    },
    {
      title: "Pembelajaran Berbasis Projek",
      description:
        "Mewujudkan kreativitas dan kemandirian melalui pembelajaran berbasis projek yang kontekstual dan berdampak nyata.",
    },
    {
      title: "Sekolah Bersih, Hijau, dan Ramah Lingkungan",
      description:
        "Mewujudkan sekolah yang bersih, hijau, dan ramah lingkungan yang aman, asri, dan nyaman sebagai rumah kedua peserta didik.",
    },
    {
      title: "Penghargaan Budaya & Komunikasi",
      description:
        "Mewujudkan pelajar yang mampu mengenal dan menghargai budaya, memiliki kemampuan komunikasi dan berinteraksi secara harmonis dengan sesama.",
    },
  ],
  tujuan: [
    {
      no: 1,
      title: "Peningkatan Keimanan dan Akhlak Mulia",
      description:
        "Peserta didik mampu melaksanakan kegiatan yang bertujuan meningkatkan keimanan, ketakwaan terhadap Tuhan YME dan berakhlak mulia melalui kegiatan keagamaan seperti pembiasaan Baca Tulis Al-Qur’an (BTQ), kegiatan shalat berjamaah pada akhir jam pelajaran, dan perayaan hari besar keagamaan.",
    },
    {
      no: 2,
      title: "Pembiasaan Budaya 5S",
      description:
        "Peserta didik mampu mengembangkan dan membudayakan pembiasaan 5S: Senyum, Sapa, Salam, Sopan, dan Santun di dalam maupun di luar lingkungan sekolah.",
    },
    {
      no: 3,
      title: "Pembelajaran Berbasis Teknologi",
      description:
        "Peserta didik mampu mengikuti peningkatan kualitas pembelajaran melalui pembelajaran berdiferensiasi berbasis kontekstual dengan memanfaatkan media pembelajaran berbasis teknologi informasi.",
    },
    {
      no: 4,
      title: "Pengembangan Kreativitas dan Prestasi",
      description:
        "Peserta didik mampu meningkatkan kreativitas dan prestasi di bidang Seni, Olahraga, Pramuka, dan olimpiade sains (OSN MIPAS).",
    },
    {
      no: 5,
      title: "Kemandirian dan Pemecahan Masalah",
      description:
        "Peserta didik mampu meningkatkan kreativitas dan kemandirian siswa dalam penyelesaian masalah di sekitar kehidupan sehari-hari melalui program pembelajaran berbasis projek.",
    },
    {
      no: 6,
      title: "Lingkungan Aman, Hijau, Bersih, Asri, dan Indah",
      description:
        "Peserta didik mampu bergotong royong menciptakan lingkungan sekolah yang aman, hijau, bersih, asri, dan indah.",
    },
    {
      no: 7,
      title: "Mengenal dan Menghargai Budaya",
      description:
        "Peserta didik mampu mengenal dan menghargai budaya lokal Bugis Banga-banga/Anabanua, memiliki kemampuan komunikasi, dan berinteraksi secara santun dengan sesama.",
    },
  ],
} as const;

/** Karakteristik dan Profil Lingkungan Sekolah sesuai KSP Bab I. */
export const schoolKarakteristik = {
  gambaranUmum: {
    title: "Gambaran Umum Satuan Pendidikan",
    description:
      "UPTD SMPN SATAP 4 BARRU menyelenggarakan pendidikan berkualitas berbasis Kurikulum Merdeka yang disesuaikan dengan kekhasan, kondisi, dan potensi daerah Dusun Banga-banga Desa Anabanua. Sekolah mengutamakan pemahaman materi, keterampilan (skill), serta pendidikan berkarakter yang mengantarkan peserta didik memiliki delapan dimensi profil lulusan abad ke-21.",
  },
  lingkungan: {
    title: "Kondisi Lingkungan Sekolah",
    description:
      "Berada di kawasan pegunungan dan persawahan yang jauh dari kebisingan kota. Keasrian alam sekitar memberikan hawa sejuk dan lingkungan belajar yang sangat nyaman. Halaman sekolah yang sangat luas memberi kebebasan beraktivitas fisik, upacara, dan kegiatan kepramukaan. Lingkungan alam ini secara kreatif dimanfaatkan oleh guru sebagai laboratorium alam terbuka untuk pembelajaran kontekstual.",
    points: [
      "Kawasan pegunungan dengan panorama perbukitan yang hijau dan asri",
      "Dikelilingi hamparan persawahan yang subur dan tenang",
      "Halaman sekolah yang sangat luas untuk olahraga, perkemahan, dan upacara",
      "Lingkungan alam yang dimanfaatkan sebagai sumber belajar biologi, ekologi, dan pertanian kontekstual",
      "Udara bersih bebas polusi kendaraan perkotaan",
    ],
  },
  pesertaDidik: {
    title: "Karakteristik Peserta Didik",
    description:
      "Sekolah mengembangkan potensi peserta didik melalui pembelajaran, kegiatan keagamaan, olahraga, seni, dan kepramukaan.",
    points: [
      "Pembelajaran memperhatikan kebutuhan dan minat peserta didik",
      "Kegiatan akademik dan nonakademik mendukung pengembangan bakat",
      "Pembiasaan karakter dilakukan melalui kegiatan sekolah",
    ],
  },
  sosialBudaya: {
    title: "Kondisi Sosial Budaya Masyarakat",
    description:
      "Sekolah membangun komunikasi dan kerja sama dengan keluarga serta masyarakat untuk mendukung proses belajar peserta didik.",
    points: [
      "Komunikasi sekolah dan keluarga mendukung perkembangan peserta didik",
      "Komite sekolah dan masyarakat dilibatkan dalam kegiatan pendidikan",
    ],
  },
  keunikanBangaBanga: {
    title: "Keunikan Sekolah & Budaya Banga-banga",
    description:
      "Banga-banga di Desa Anabanua memiliki kekayaan budaya daerah yang sangat khas. Keunikan ini menjadi basis kurikulum lokal sekolah dengan mengintegrasikan permainan tradisional, upacara adat, serta makanan khas daerah ke dalam pembelajaran kokurikuler dan P5. Sekolah memadukan kearifan lokal Bugis dengan wawasan pendidikan global.",
    points: [
      "Pelestarian permainan anak tradisional Bugis yang melatih sportivitas",
      "Penghayatan upacara adat dan etika kearifan lokal siri' na pacce",
      "Pengenalan dan pengolahan aneka pangan serta kue khas tradisional daerah",
      "Pendidikan berwawasan global yang tetap berpijak kokoh pada akar budaya lokal",
    ],
  },
} as const;

/** Budaya Lokal & Tradisi Banga-banga Desa Anabanua. */
export const budayaLokal = [
  {
    title: "Permainan Tradisional Anak",
    icon: "award",
    description:
      "Melestarikan aneka permainan rakyat Bugis seperti maggasing (gasing), maccukke, maloja, dan dende-dende yang mengasah ketangkasan fisik, kerjasama tim, dan kegembiraan alami peserta didik.",
  },
  {
    title: "Upacara Adat & Nilai Luhur Bugis",
    icon: "heart",
    description:
      "Menanamkan falsafah siri' na pacce, sipakatau (saling memanusiakan), sipakalebbi (saling menghargai), dan sipakainge (saling mengingatkan dalam kebaikan) dalam interaksi sehari-hari seluruh warga sekolah.",
  },
  {
    title: "Makanan Khas & Pangan Lokal",
    icon: "star",
    description:
      "Pengenalan dan kreasi kuliner tradisional Bugis seperti barongko, doko-doko, putu cangkiri, dan pengolahan hasil tani lokal yang diintegrasikan dalam tema kewirausahaan P5.",
  },
  {
    title: "Harmonisasi Tradisi & Wawasan Global",
    icon: "globe",
    description:
      "Membekali peserta didik dengan kecakapan teknologi abad ke-21 dan komunikasi modern tanpa pernah mencabut mereka dari kebanggaan terhadap identitas budaya luhur Banga-banga.",
  },
] as const;

/** Kemitraan strategis sekolah sesuai dokumen KSP. */
export const kemitraanSekolah = [
  {
    name: "Puskesmas Palakka",
    role: "Layanan Kesehatan & UKS",
    description:
      "Kemitraan rutin untuk pemeriksaan kesehatan berkala, imunisasi peserta didik, penyuluhan gizi remaja, pembinaan Usaha Kesehatan Sekolah (UKS), dan pemantauan sanitasi lingkungan sekolah.",
    icon: "heart",
  },
  {
    name: "Kantor Desa Anabanua",
    role: "Pemerintahan Desa & Keamanan",
    description:
      "Sinergi dengan pemerintah desa dalam pembinaan generasi muda, keamanan lingkungan Dusun Banga-banga, pendataan kependudukan siswa, serta partisipasi kegiatan peringatan hari besar di desa.",
    icon: "map-pin",
  },
  {
    name: "Masyarakat Sekitar & Komite Sekolah",
    role: "Dukungan Sosial & Komite",
    description:
      "Kolaborasi erat bersama orang tua murid, tokoh adat, dan Komite Sekolah di bawah kepemimpinan Bapak Sahnun dalam menjaga keamanan belajar, gotong royong sarana, serta pengawasan anak.",
    icon: "users",
  },
] as const;

/** Program Unggulan Sekolah sesuai KSP 2025/2026. */
export const programUnggulan = [
  {
    no: "01",
    title: "Pembelajaran Berbasis Teknologi",
    category: "Akademik & Iptek",
    description:
      "Pemanfaatan media pembelajaran interaktif digital, laboratorium komputer, dan integrasi TIK dalam asesmen serta penyampaian materi secara modern dan menyenangkan.",
  },
  {
    no: "02",
    title: "Pembelajaran Berbasis Projek (PBL & P5)",
    category: "Kreativitas & Kemandirian",
    description:
      "Mendorong peserta didik memecahkan masalah nyata di sekitar lingkungan Banga-banga melalui proyek karya tulis sederhana, pengolahan pangan lokal, pengolahan sampah, dan pemanfaatan lahan sekolah.",
  },
  {
    no: "03",
    title: "Kegiatan Keagamaan & Karakter Religius",
    category: "Imtaq & Budi Pekerti",
    description:
      "Pembiasaan intensif Baca Tulis Al-Qur'an (BTQ), pelaksanaan shalat berjamaah di akhir jam pelajaran, doa harian bersama, dan peringatan hari besar Islam (PHBI).",
  },
  {
    no: "04",
    title: "Pengembangan Seni dan Olahraga",
    category: "Minat & Bakat",
    description:
      "Wadah pembinaan fisik dan bakat ketangkasan siswa melalui keikutsertaan Gala Siswa Indonesia (GSI) tingkat kecamatan, sanggar seni tari tradisional, futsal, dan bola voli.",
  },
  {
    no: "05",
    title: "Gerakan Pramuka Terpimpin",
    category: "Kepemimpinan & Disiplin",
    description:
      "Ekstrakurikuler wajib bagi seluruh peserta didik kelas VII s.d. IX untuk menanamkan kedisiplinan, kemandirian, cinta tanah air, dan keterampilan kepramukaan dalam perkemahan kabupaten.",
  },
  {
    no: "06",
    title: "Pengembangan Karakter & Budaya 5S",
    category: "Etika & Habitus",
    description:
      "Pembiasaan Senyum, Sapa, Salam, Sopan, dan Santun, kegiatan Jumat Bersih, Jumat Sehat, Jumat Religi, serta lomba kebersihan kelas secara periodik.",
  },
  {
    no: "07",
    title: "Pelestarian Budaya Lokal Banga-banga",
    category: "Kearifan Lokal",
    description:
      "Eksplorasi budaya daerah melalui permainan tradisional anak, apresiasi upacara adat Bugis, kuliner tradisional khas daerah, serta penggunaan muatan lokal Bahasa Daerah.",
  },
] as const;

/** Struktur organisasi sekolah mengikuti bagan yang diberikan sekolah. */
export const orgStructure = {
  committee: { name: "Sahnun", role: "Komite" },
  principal: { name: "Nurinsyanah, S.Pd.", role: "Kepala Sekolah" },
  administration: { name: "Sitti Rukman, S.Sos.", role: "Kepala Tenaga Administrasi Sekolah" },
  coordinators: {
    title: "Wakasek Urusan-urusan",
    members: [
      { name: "Esra, S.Pd.", role: "Kurikulum" },
      { name: "Wahyuddin, S.Pd.", role: "Kesiswaan" },
      { name: "Nurinsyanah, S.Pd.", role: "Sarana & Prasarana" },
    ],
  },
  unitHeads: {
    title: "Kepala",
    members: [
      { name: "Rustiah, S.Pd.I.", role: "Perpustakaan" },
      { name: "Andi Nu’manah, S.Pd.", role: "Laboratorium" },
    ],
  },
  learningTeam: "Wali Kelas, Guru Mata Pelajaran, Guru BK",
  students: "Peserta Didik",
} as const;

/** Daftar tenaga pendidik berdasarkan data yang tersedia untuk Tahun Pelajaran 2025/2026. */
export const teachers: Teacher[] = [
  {
    name: "Nurinsyanah, S.Pd.",
    role: "Plt. Kepala Sekolah",
    group: "kepala",
    hours: "Manajerial, Supervisi & Penanggung Jawab TPK",
    image: "/nurinsyanah.png",
  },
  {
    name: "Esra, S.Pd.",
    role: "Ur. Kurikulum · Ketua TPK",
    group: "waka",
    subjects: ["Kurikulum Merdeka", "Matematika / IPA"],
    hours: "Manajerial Kurikulum & Pembelajaran",
  },
  {
    name: "Wahyuddin, S.Pd.",
    role: "Ur. Kesiswaan · Wkl Ketua TPK",
    group: "waka",
    subjects: ["Kesiswaan", "IPS"],
    hours: "Pembinaan Kesiswaan & Kedisiplinan",
  },
  {
    name: "Rustiah, S.Pd.",
    role: "Guru PAI & Budi Pekerti",
    group: "guru",
    subjects: ["Pendidikan Agama Islam", "Baca Tulis Al-Qur'an (BTQ)"],
    hours: "Pembinaan Imtaq & Ibadah Berjamaah",
  },
  {
    name: "Andi Nu’manah, S.P.",
    role: "Guru IPA",
    group: "guru",
    subjects: ["Ilmu Pengetahuan Alam (IPA)", "Laboratorium IPA"],
    hours: "Praktikum Sains & Lingkungan",
  },
  {
    name: "Riri Anggrainy, S.Pd.",
    role: "Guru Seni Budaya",
    group: "guru",
    subjects: ["Seni Budaya", "Seni Tari Bugis"],
    hours: "Pembinaan Tari Tradisional & P5 Seni",
  },
  {
    name: "Supriadi, S.Pd.",
    role: "Guru Bahasa Indonesia",
    group: "guru",
    subjects: ["Bahasa Indonesia", "Literasi"],
    hours: "Pembinaan Pojok Baca & Karya Tulis",
  },
  {
    name: "Nurhikmah Sirajuddin, S.Pd.",
    role: "Guru Matematika",
    group: "guru",
    subjects: ["Matematika", "OSN MIPAS"],
    hours: "Penguatan Numerasi & Olimpiade Sains",
  },
  {
    name: "Rachmawati, S.Pd.",
    role: "Guru Bahasa Daerah",
    group: "guru",
    subjects: ["Bahasa Daerah Bugis", "Kearifan Lokal"],
    hours: "Pelestarian Sastra & Budaya Daerah",
  },
  {
    name: "A. Fuad Renaldi A. Parussengi, S.Or.",
    role: "Guru PJOK",
    group: "guru",
    subjects: ["PJOK", "Gala Siswa Indonesia (GSI)"],
    hours: "Pembinaan Olahraga & Kebugaran Jasmani",
  },
  {
    name: "Armawanah Abdullah",
    role: "Guru Bahasa Inggris",
    group: "guru",
    subjects: ["Bahasa Inggris", "Komunikasi Global"],
    hours: "English Literacy & Wawasan Global",
  },
  {
    name: "Fauziah, S.Pd., M.Pd.",
    role: "Guru Informatika",
    group: "guru",
    subjects: ["Informatika", "Laboratorium Komputer"],
    hours: "Pembelajaran Berbasis Teknologi & TIK",
  },
  {
    name: "Sitti Rukman, S.Sos.",
    role: "Kepala Tata Usaha",
    group: "staf",
    hours: "Layanan Administrasi Sekolah & TPK",
  },
];

export const schoolStats = [
  { value: String(publishedSchoolSnapshot.studentCount), label: "Peserta Didik", hint: `Data TP ${publishedSchoolSnapshot.year}` },
  { value: String(teachers.length), label: "Guru & Tendik", hint: `Data TP ${publishedSchoolSnapshot.year}` },
  { value: String(publishedSchoolSnapshot.rombelCount), label: "Rombel Fase D", hint: "Kelas VII, VIII, dan IX (Kurikulum Merdeka)" },
  { value: siteConfig.akreditasi.split(" ")[0], label: "Akreditasi", hint: siteConfig.akreditasi },
] as const;

/** Sarana dan Prasarana Sekolah sesuai KSP UPTD SMPN SATAP 4 BARRU. */
export const facilities = [
  {
    name: "UKS",
    slug: "uks",
    description:
      "Unit Kesehatan Sekolah sebagai sarana pelayanan kesehatan dasar, pembiasaan hidup bersih dan sehat, serta pertolongan pertama bagi peserta didik.",
    image:
      "https://res.cloudinary.com/dmualsp81/image/upload/v1791292854/9a4b269f-8ede-4150-9a55-441149188166.png",
    details: [
      "Pertolongan pertama bagi warga sekolah",
      "Pembiasaan perilaku hidup bersih dan sehat",
      "Dukungan kegiatan kesehatan peserta didik",
    ],
  },
  {
    name: "Laboratorium Komputer",
    slug: "lab-komputer",
    description:
      "Fasilitas laboratorium komputer terkoneksi internet untuk mendukung program unggulan pembelajaran berbasis teknologi, bimbingan TIK, literasi digital, dan pelaksanaan Asesmen Nasional (ANBK).",
    image:
      "https://res.cloudinary.com/dmualsp81/image/upload/v1791293396/85b98b5a-1521-437f-8c8b-df30e8c053f2.png",
    details: [
      "Perangkat komputer dan konektivitas internet",
      "Pusat pembelajaran berbasis teknologi dan informatika",
      "Fasilitas utama pelaksanaan ANBK dan simulasi digital",
    ],
  },
  {
    name: "Laboratorium IPA",
    slug: "lab-ipa",
    description:
      "Laboratorium IPA yang dilengkapi alat peraga biologi dan fisika, mikroskop, serta kit praktikum sains terpadu yang mendorong nalar kritis dan rasa ingin tahu siswa.",
    image:
      "https://res.cloudinary.com/dmualsp81/image/upload/v1791293066/745bdaae-e677-443d-869b-749ffd4927ab.png",
    details: [
      "Meja praktikum dan alat peraga kurikulum merdeka",
      "Peralatan mikroskop dan kit percobaan sains dasar",
      "Praktikum terpadu fenomena alam sekitar Banga-banga",
    ],
  },
  {
    name: "Perpustakaan Sekolah",
    slug: "perpustakaan",
    description:
      "Pusat sumber belajar dengan koleksi buku teks pelajaran Kurikulum Merdeka, buku pengayaan, ensiklopedia, dan pojok baca harian 15 menit untuk memacu literasi membaca.",
    image:
      "https://res.cloudinary.com/dmualsp81/image/upload/v1791293487/ebe97e33-f269-4ca3-adeb-4437053d62bf.png",
    details: [
      "Koleksi buku teks wajib dan buku pengayaan sastra",
      "Program 15 menit membaca sebelum jam pertama",
      "Ruang baca tenang dengan ventilasi alami yang sejuk",
    ],
  },
  {
    name: "Lapangan Olahraga Serbaguna",
    slug: "lapangan-olahraga",
    description:
      "Lapangan olahraga terpadu untuk latihan futsal, bola voli, sepak takraw, atletik, dan upacara bendera mingguan yang mendukung bakat fisik siswa dalam ajang Gala Siswa.",
    image:
      "https://res.cloudinary.com/dmualsp81/image/upload/v1790949942/6c9a43ef-4ac8-4df0-8a8a-f705d2bcc851.png",
    details: [
      "Lapangan multifungsi: voli, futsal, dan upacara bendera",
      "Arena latihan tim Gala Siswa tingkat kecamatan",
      "Tempat pelaksanaan senam sehat dan Jumat Bugar",
    ],
  },
  {
    name: "Lingkungan Alam Sumber Belajar",
    slug: "lingkungan-alam",
    description:
      "Keasrian alam persawahan dan perbukitan sekitar Dusun Banga-banga yang dimanfaatkan guru sebagai laboratorium alam terbuka untuk pengamatan ekosistem, pertanian, dan proyek gaya hidup berkelanjutan P5.",
    image:
      "https://res.cloudinary.com/dmualsp81/image/upload/v1791293611/8c8c6385-dc5e-4896-9b7a-350c592e9877.png",
    details: [
      "Persawahan dan kebun warga sebagai media kontekstual",
      "Pengamatan flora, fauna, dan tanah perbukitan",
      "Pengolahan sampah organik dan kompos ramah lingkungan",
    ],
  },
] as const;
