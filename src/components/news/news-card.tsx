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
export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <SpotlightCard className="h-full rounded-2xl">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/10">
        <Link href={`/berita/${article.slug}`} className="relative block aspect-[16/10] overflow-hidden">
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
        </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <time
          dateTime={article.date}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-muted"
        >
          <Icon name="calendar" size={13} />
          {formatDateShort(article.date)}
        </time>
        <h3 className="mt-2.5 text-lg font-bold leading-snug tracking-tight text-heading">
          <Link
            href={`/berita/${article.slug}`}
            className="transition-colors hover:text-accent"
          >
            {article.title}
          </Link>
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
      </article>
    </SpotlightCard>
  );
}

export { categoryColors as newsCategoryColors };
