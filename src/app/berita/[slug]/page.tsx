import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug, getRelatedNews, news } from "@/data/news";
import { formatDate } from "@/lib/utils";
import { newsCategoryColors } from "@/components/news/news-card";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { NewsCard } from "@/components/news/news-card";
import { Icon } from "@/components/ui/icon";
import { PageHeader } from "@/components/ui/page-header";

interface BeritaDetailProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: BeritaDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return { title: "Berita Tidak Ditemukan" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BeritaDetailPage({ params }: BeritaDetailProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();
  const related = getRelatedNews(slug);

  return (
    <>
      <PageHeader
        title={article.title}
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/berita" },
          { label: article.category },
        ]}
      />

      <Section>
        <article className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${newsCategoryColors[article.category]}`}
            >
              {article.category}
            </span>
            <time dateTime={article.date} className="flex items-center gap-1.5 font-semibold">
              <Icon name="calendar" size={14} />
              {formatDate(article.date)}
            </time>
            <span className="flex items-center gap-1.5">
              <Icon name="users" size={14} />
              {article.author}
            </span>
          </div>

          <figure className="mt-8 overflow-hidden rounded-3xl">
            <div className="relative aspect-[16/9]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          </figure>

          <div className="prose-smpn mt-10 space-y-6">
            <p className="text-lg font-semibold leading-relaxed text-heading">
              {article.excerpt}
            </p>
            {article.content.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-[16px] leading-[1.85] text-body">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-line pt-6">
            <span className="text-sm font-bold text-body">Tag:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-tint px-3 py-1 text-[12px] font-bold text-accent"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>
      </Section>

      {related.length > 0 ? (
        <Section tint>
          <SectionHeading eyebrow="Berita Terkait" title={`Lainnya dari Kategori ${article.category}`} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <NewsCard key={item.slug} article={item} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent"
            >
              <Icon name="arrow-left" size={15} />
              Kembali ke Semua Berita
            </Link>
          </div>
        </Section>
      ) : null}
    </>
  );
}
