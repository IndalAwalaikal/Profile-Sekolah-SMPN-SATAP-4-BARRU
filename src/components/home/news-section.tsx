import { getLatestNews } from "@/data/news";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { NewsCard } from "@/components/news/news-card";

/** Seksi berita terbaru di beranda. */
export function NewsSection() {
  const latest = getLatestNews(3);
  return (
    <Section tint>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Berita Terkini"
          title="Kabar Terbaru dari Sekolah"
          description="Dokumentasi kegiatan, pengumuman, dan capaian siswa SMPN Satap 4 Barru."
        />
        <ButtonLink href="/berita" variant="outline" withArrow>
          Semua Berita
        </ButtonLink>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {latest[0] && (
          <div className="lg:col-span-2" data-reveal style={{ "--reveal-order": 0 } as React.CSSProperties}>
            <NewsCard article={latest[0]} variant="featured" />
          </div>
        )}
        {latest.length > 1 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {latest.slice(1).map((article, i) => (
              <div key={article.slug} data-reveal style={{ "--reveal-order": i + 1 } as React.CSSProperties}>
                <NewsCard article={article} variant="compact" />
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
