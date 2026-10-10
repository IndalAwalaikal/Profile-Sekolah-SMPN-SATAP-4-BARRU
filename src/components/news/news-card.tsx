import Link from "next/link";
import type { NewsArticle } from "@/types";
import { formatDateShort } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ShimmerImage } from "@/components/ui/shimmer-image";

const categoryColors: Record<NewsArticle["category"], string> = {
  Prestasi: "bg-gold-100 text-gold-600 dark:bg-gold-500/15 dark:text-gold-300",
  Akademik: "bg-tint text-accent",
  Kegiatan: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
};

/** Kartu artikel berita, dipakai di beranda dan halaman berita. */
export function NewsCard({
  article,
  variant = "default",
}: {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact";
}) {
  if (variant === "compact") {
    return (
      <Link
        href={`/berita/${article.slug}`}
        className="group content-card flex h-full min-h-28 overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div className="relative w-32 shrink-0 overflow-hidden sm:w-40">
          <ShimmerImage
            src={article.image}
            alt={article.title}
            sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
          <span className={`mb-2 w-fit rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${categoryColors[article.category]}`}>
            {article.category}
          </span>
          <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-tight text-heading transition-colors group-hover:text-accent sm:text-lg">
            {article.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
            {article.excerpt}
          </p>
          <time dateTime={article.date} className="mt-2 text-xs font-semibold text-muted">
            {formatDateShort(article.date)}
          </time>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <SpotlightCard className="h-full rounded-2xl">
        <Link href={`/berita/${article.slug}`} className="group relative content-card flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/10">
          <div className="relative block aspect-[16/9] overflow-hidden sm:aspect-[2/1]">
            <ShimmerImage src={article.image} alt={article.title} sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className={`absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${categoryColors[article.category]}`}>
              {article.category}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-5 sm:p-7">
            <time dateTime={article.date} className="flex items-center gap-1.5 text-[13px] font-semibold text-muted">
              <Icon name="calendar" size={13} />{formatDateShort(article.date)}
            </time>
            <h3 className="mt-3 text-xl font-bold leading-snug tracking-tight text-heading sm:text-2xl">
              {article.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted">{article.excerpt}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-accent">
              Baca Selengkapnya <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard className="h-full rounded-2xl">
      <Link href={`/berita/${article.slug}`} className="group relative content-card flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/10">
        <div className="relative block aspect-[16/10] overflow-hidden">
          <ShimmerImage
            src={article.image}
            alt={article.title}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${categoryColors[article.category]}`}
          >
            {article.category}
          </span>
        </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <time
          dateTime={article.date}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-muted"
        >
          <Icon name="calendar" size={13} />
          {formatDateShort(article.date)}
        </time>
        <h3 className="mt-2.5 text-lg font-bold leading-snug tracking-tight text-heading">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[15px] leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-accent">
          Baca Selengkapnya
          <Icon
            name="arrow-right"
            size={15}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
      </Link>
    </SpotlightCard>
  );
}

export { categoryColors as newsCategoryColors };
