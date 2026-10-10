export type NewsCategory = "Prestasi" | "Akademik" | "Kegiatan";

export interface NewsArticle {
  slug: string;
  title: string;
  category: NewsCategory;
  excerpt: string;
  /** Paragraf isi artikel, sudah dipecah per paragraf. */
  content: string[];
  /** Bagian opsional dengan subjudul, untuk artikel yang memiliki struktur tematik. */
  sections?: { heading: string; paragraphs: string[] }[];
  /** Tanggal terbit dalam format ISO. */
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export interface AgendaItem {
  title: string;
  /** Tanggal pelaksanaan dalam format ISO. */
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
}

export type TeacherGroup = "kepala" | "waka" | "guru" | "staf";

export interface Teacher {
  name: string;
  role: string;
  group: TeacherGroup;
  subjects?: string[];
  /** Beban mengajar / keterangan tugas mingguan. */
  hours?: string;
  image?: string;
}

export interface Photo {
  src: string;
  caption: string;
}

export interface GalleryAlbum {
  slug: string;
  title: string;
  description: string;
  date?: string;
  category: string;
  cover: string;
  photos: Photo[];
}

export type AchievementLevel = "Kecamatan" | "Kabupaten" | "Provinsi" | "Nasional";

export interface Achievement {
  title: string;
  level: AchievementLevel;
  year: number;
  field: string;
  students: string[];
}

export interface Ekstrakurikuler {
  name: string;
  slug: string;
  description: string;
  schedule: string;
  coach: string;
  image: string;
}

export interface Facility {
  name: string;
  slug: string;
  description: string;
  image: string;
  details: string[];
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface SearchIndexEntry {
  title: string;
  href: string;
  category: string;
  excerpt?: string;
}
