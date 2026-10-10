import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { news } from "@/data/news";
import { galleryAlbums } from "@/data/galeri";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/profil",
    "/profil/struktur-organisasi",
    "/profil/guru-dan-staf",
    "/profil/fasilitas",
    "/kurikulum",
    "/agenda",
    "/ekstrakurikuler",
    "/prestasi",
    "/berita",
    "/galeri",
    "/ppdb",
    "/unduhan",
    "/faq",
    "/kontak",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/kurikulum" ? 0.9 : 0.7,
    })),
    ...news.map((article) => ({
      url: `${siteConfig.url}/berita/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...galleryAlbums.map((album) => ({
      url: `${siteConfig.url}/galeri/${album.slug}`,
      ...(album.date ? { lastModified: new Date(album.date) } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
