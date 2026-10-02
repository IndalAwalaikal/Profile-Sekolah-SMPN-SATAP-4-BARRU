import { mainNav } from "@/lib/site";
import { news } from "@/data/news";
import { agendaItems } from "@/data/agenda";
import type { SearchIndexEntry } from "@/types";

/** Indeks pencarian situs: halaman, berita, dan agenda — lengkap dengan cuplikan. */
export const searchIndex: SearchIndexEntry[] = [
  ...mainNav.flatMap((item) => [
    {
      title: item.label,
      href: item.href,
      category: "Halaman",
      excerpt: item.children
        ? "Menu utama beserta seluruh sub-halamannya."
        : "Halaman utama situs sekolah.",
    },
    ...(item.children ?? []).map((child) => ({
      title: child.label,
      href: child.href,
      category: "Halaman",
      excerpt: child.description,
    })),
  ]),
  ...news.map((article) => ({
    title: article.title,
    href: `/berita/${article.slug}`,
    category: "Berita",
    excerpt: article.excerpt,
  })),
  ...agendaItems.map((item) => ({
    title: item.title,
    href: "/agenda",
    category: "Agenda",
    excerpt: item.description,
  })),
];

/** Cari dengan skor relevansi: kecocokan judul diunggulkan atas cuplikan. */
export function searchSite(query: string, limit = 12): SearchIndexEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = searchIndex
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const excerpt = (entry.excerpt ?? "").toLowerCase();
      let score = 0;
      if (title.startsWith(q)) score = 4;
      else if (title.includes(q)) score = 3;
      else if (excerpt.includes(q)) score = 1;
      return { entry, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.entry);
}
