import { getLatestNews } from "@/data/news";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { FeaturedNewsGrid } from "@/components/news/featured-news-grid";

/** Seksi berita terbaru di beranda. */
export function NewsSection() {
  const latest = getLatestNews(4);
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
      <div className="mt-12">
        <FeaturedNewsGrid articles={latest} />
      </div>
    </Section>
  );
}
