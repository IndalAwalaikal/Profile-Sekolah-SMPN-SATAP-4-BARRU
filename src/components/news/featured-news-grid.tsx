import type { NewsArticle } from "@/types";
import { NewsCard } from "@/components/news/news-card";

/** Satu berita utama dengan tiga berita pendamping di sisi kanan. */
export function FeaturedNewsGrid({ articles }: { articles: NewsArticle[] }) {
  const [featured, ...sideArticles] = articles;
  if (!featured) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div
        className="sm:col-span-2 lg:col-span-2"
        data-reveal
        style={{ "--reveal-order": 0 } as React.CSSProperties}
      >
        <NewsCard article={featured} variant="featured" />
      </div>
      {sideArticles.length > 0 && (
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2 lg:col-span-1 lg:flex lg:flex-col">
          {sideArticles.map((article, index) => (
            <div
              key={article.slug}
              className="lg:min-h-0 lg:flex-1"
              data-reveal
              style={{ "--reveal-order": index + 1 } as React.CSSProperties}
            >
              <NewsCard article={article} variant="compact" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
