import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { galleryAlbums, galleryCategories } from "@/data/galeri";
import { formatDateShort } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Dokumentasi foto kegiatan SMP Negeri Satu Atap 4 Barru: seni budaya, olahraga, lingkungan, dan kesiswaan.",
};

type SearchParams = Promise<{ kategori?: string; tahun?: string }>;

export default async function GaleriPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const selectedCategory = galleryCategories.includes(params.kategori as (typeof galleryCategories)[number])
    ? params.kategori!
    : "Semua";
  const years = [...new Set(galleryAlbums.map((album) => album.date.slice(0, 4)))].sort().reverse();
  const selectedYear = years.includes(params.tahun ?? "") ? params.tahun : "Semua";
  const albums = galleryAlbums.filter((album) =>
    (selectedCategory === "Semua" || album.category === selectedCategory) &&
    (selectedYear === "Semua" || album.date.startsWith(selectedYear!)),
  );

  const filterHref = (category: string, year: string) => {
    const query = new URLSearchParams();
    if (category !== "Semua") query.set("kategori", category);
    if (year !== "Semua") query.set("tahun", year);
    const search = query.toString();
    return search ? `/galeri?${search}` : "/galeri";
  };

  return (
    <>
      <PageHeader
        title="Galeri Kegiatan"
        description="Dokumentasi momen belajar, berkarya, dan berprestasi di sekolah kami."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Galeri" }]}
      />
      <Section>
        <div className="mb-8 space-y-4">
          <div role="group" aria-label="Filter kategori galeri" className="flex flex-wrap gap-2">
            {galleryCategories.map((category) => (
              <Link
                key={category}
                href={filterHref(category, selectedYear ?? "Semua")}
                aria-current={selectedCategory === category ? "true" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selectedCategory === category ? "bg-brand-950 text-white" : "bg-tint text-accent hover:bg-line"}`}
              >{category}</Link>
            ))}
          </div>
          <div role="group" aria-label="Filter tahun galeri" className="flex flex-wrap gap-2">
            {["Semua", ...years].map((year) => (
              <Link
                key={year}
                href={filterHref(selectedCategory, year)}
                aria-current={selectedYear === year ? "true" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selectedYear === year ? "border-gold-500 bg-gold-100 text-brand-950" : "border-line text-body hover:bg-tint"}`}
              >{year === "Semua" ? "Semua tahun" : year}</Link>
            ))}
          </div>
          <p className="text-sm text-muted" aria-live="polite">{albums.length} album</p>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map((album) => (
            <li key={album.slug}>
              <Link
                href={`/galeri/${album.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={album.cover}
                    alt={album.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-brand-950/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-400 backdrop-blur">
                    {album.category}
                  </span>
                  <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-bold text-accent backdrop-blur">
                    {album.photos.length} foto
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold leading-snug text-heading">
                    {album.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-muted">
                    {album.description}
                  </p>
                  <time
                    dateTime={album.date}
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold text-muted"
                  >
                    <Icon name="calendar" size={13} />
                    {formatDateShort(album.date)}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {albums.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line p-8 text-center text-sm text-muted">
            Belum ada album untuk filter ini. Coba kategori atau tahun lain.
          </p>
        ) : null}
      </Section>
    </>
  );
}
