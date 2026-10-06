import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug, getRelatedNews, news } from "@/data/news";
import { formatDate } from "@/lib/utils";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { NewsCard } from "@/components/news/news-card";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/container";
import { WaveDivider } from "@/components/ui/wave-divider";
import { siteConfig } from "@/lib/site";

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
    alternates: { canonical: `/berita/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `${siteConfig.url}/berita/${article.slug}`,
      publishedTime: new Date(article.date).toISOString(),
      authors: [article.author],
      section: article.category,
      tags: article.tags,
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.excerpt },
  };
}

export default async function BeritaDetailPage({ params }: BeritaDetailProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();
  const related = getRelatedNews(slug);
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [`${siteConfig.url}${article.image}`],
    datePublished: new Date(article.date).toISOString(),
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/berita/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <header className="relative overflow-hidden bg-brand-950 text-white">
        <div className="pointer-events-none absolute -right-28 -top-36 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
        <Container className="relative py-10 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-200">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
                >
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true"><Icon name="chevron-right" size={14} className="text-brand-400" /></li>
              <li>
                <Link
                  href="/berita"
                  className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
                >
                  Berita
                </Link>
              </li>
              <li aria-hidden="true"><Icon name="chevron-right" size={14} className="text-brand-400" /></li>
              <li aria-current="page" className="font-semibold text-white">{article.category}</li>
            </ol>
          </nav>

          <div className="max-w-5xl border-l-[3px] border-gold-500 pl-5 sm:pl-8">
            <p className="eyebrow text-gold-300">
              Kabar sekolah <span aria-hidden="true" className="text-brand-300">/</span> {article.category}
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-brand-100 sm:text-xl sm:leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-sm text-brand-100 sm:ml-8 sm:mt-10">
            <time dateTime={article.date} className="inline-flex items-center gap-2">
              <Icon name="calendar" size={15} className="text-gold-400" />
              {formatDate(article.date)}
            </time>
            <span className="inline-flex items-center gap-2">
              <Icon name="users" size={15} className="text-gold-400" />
              {article.author}
            </span>
          </div>
        </Container>
        <WaveDivider className="relative text-surface" />
      </header>

      <section className="relative bg-surface pb-16 pt-3 sm:pb-24 sm:pt-5">
        <Container>
          <figure className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-line bg-tint p-1.5 shadow-xl shadow-brand-950/10 sm:rounded-3xl sm:p-2">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-brand-950/5 sm:rounded-[1.25rem]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </figure>

          <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
            <article className="min-w-0">
              <div className="space-y-6 text-[16px] leading-[1.9] text-body sm:space-y-7 sm:text-[17px]">
                {article.content.map((paragraph, index) => (
                  <p
                    key={`${index}-${paragraph.slice(0, 24)}`}
                    className={
                      index === 0
                        ? "first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-accent"
                        : undefined
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {article.sections?.map((section, sectionIndex) => (
                <section key={section.heading} aria-labelledby={`bagian-berita-${sectionIndex}`} className="mt-12 sm:mt-14">
                  <h2
                    id={`bagian-berita-${sectionIndex}`}
                    className="border-l-[3px] border-gold-500 pl-4 font-serif text-2xl font-bold leading-tight text-heading sm:text-3xl"
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-6 text-[16px] leading-[1.9] text-body sm:space-y-7 sm:text-[17px]">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={`${paragraphIndex}-${paragraph.slice(0, 24)}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}

              <div className="mt-12 border-t border-line pt-6">
                <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-muted">
                  Topik artikel
                </p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-tint px-3.5 py-2 text-xs font-bold text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <aside className="h-fit rounded-2xl border border-line bg-tint p-5 sm:p-6 lg:sticky lg:top-28">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent">Info berita</p>
              <dl className="mt-5 space-y-5">
                <div>
                  <dt className="text-xs font-semibold text-muted">Kategori</dt>
                  <dd className="mt-1.5 font-bold text-heading">{article.category}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-muted">Tanggal terbit</dt>
                  <dd className="mt-1.5 font-bold text-heading">{formatDate(article.date)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-muted">Penulis</dt>
                  <dd className="mt-1.5 font-bold text-heading">{article.author}</dd>
                </div>
              </dl>
              <Link
                href="/berita"
                className="mt-6 inline-flex items-center gap-2 border-t border-line pt-5 text-sm font-bold text-accent transition-colors hover:text-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Icon name="arrow-left" size={15} />
                Semua berita
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <Section tint>
          <SectionHeading eyebrow="Berita Terkait" title={`Lainnya dari Kategori ${article.category}`} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <NewsCard key={item.slug} article={item} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
