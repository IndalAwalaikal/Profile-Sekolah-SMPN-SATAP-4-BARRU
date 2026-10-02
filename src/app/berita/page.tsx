import type { Metadata } from "next";
import Link from "next/link";
import { getNewsByCategory, newsCategories } from "@/data/news";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section-heading";
import { NewsCard } from "@/components/news/news-card";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Berita",
  description:
    "Berita terbaru seputar kegiatan, prestasi, dan pengumuman SMP Negeri Satu Atap 4 Barru.",
};

interface BeritaPageProps {
  searchParams: Promise<{ kategori?: string }>;
}

export default async function BeritaPage({ searchParams }: BeritaPageProps) {
  const { kategori } = await searchParams;
  const active = kategori && newsCategories.includes(kategori as (typeof newsCategories)[number])
    ? kategori
    : undefined;
  const articles = getNewsByCategory(active);

  return (
    <>
      <PageHeader
        title="Berita Sekolah"
        description="Kabar terbaru seputar kegiatan, prestasi siswa, dan pengumuman resmi sekolah."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Berita" }]}
      />
      <Section>
        <nav aria-label="Filter kategori berita" className="flex flex-wrap items-center gap-2">
          <FilterChip href="/berita" active={!active}>
            Semua
          </FilterChip>
          {newsCategories.map((category) => (
            <FilterChip
              key={category}
              href={`/berita?kategori=${encodeURIComponent(category)}`}
              active={active === category}
            >
              {category}
            </FilterChip>
          ))}
          <span className="ml-auto hidden items-center gap-1.5 text-sm text-muted sm:flex">
            <Icon name="book" size={14} />
            {articles.length} artikel
          </span>
        </nav>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      </Section>
    </>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-bold transition-colors",
        active
          ? "bg-brand-600 text-white shadow-sm"
          : "bg-tint text-accent hover:bg-line",
      )}
    >
      {children}
    </Link>
  );
}
