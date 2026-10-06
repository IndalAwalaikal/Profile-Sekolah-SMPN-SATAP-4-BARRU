import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { galleryAlbums, getAlbumBySlug } from "@/data/galeri";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { PhotoGrid } from "@/components/gallery/photo-grid";
import { Lightbox } from "@/components/gallery/lightbox";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/lib/site";

interface AlbumPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return galleryAlbums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({
  params,
}: AlbumPageProps): Promise<Metadata> {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);
  if (!album) return { title: "Album Tidak Ditemukan" };
  return {
    title: album.title,
    description: album.description,
    alternates: { canonical: `/galeri/${album.slug}` },
    openGraph: {
      type: "website",
      title: album.title,
      description: album.description,
      url: `${siteConfig.url}/galeri/${album.slug}`,
      images: [{ url: album.cover, alt: album.title }],
    },
    twitter: { card: "summary_large_image", title: album.title, description: album.description },
  };
}

export default async function AlbumGaleriPage({ params }: AlbumPageProps) {
  const { slug } = await params;
  const album = getAlbumBySlug(slug);
  if (!album) notFound();

  return (
    <>
      <PageHeader
        title={album.title}
        description={album.description}
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Galeri", href: "/galeri" },
          { label: album.category },
        ]}
      />
      <Section>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="image" size={15} />
            {album.photos.length} foto
          </span>
          {album.date ? (
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" size={15} />
              {formatDate(album.date)}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-tint px-3 py-1 text-[12px] font-bold text-accent">
            {album.category}
          </span>
        </div>
        <div className="mt-8">
          <PhotoGrid photos={album.photos} columns={4} />
        </div>
        <p className="mt-6 text-sm text-muted">
          Klik foto untuk memperbesar — gunakan tombol panah pada keyboard untuk berpindah foto.
        </p>
        <div className="mt-10">
          <SectionHeading
            eyebrow="Galeri"
            title="Jelajahi Album Lain"
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {galleryAlbums
              .filter((a) => a.slug !== album.slug)
              .map((a) => (
                <a
                  key={a.slug}
                  href={`/galeri/${a.slug}`}
                  className="rounded-full bg-tint px-4 py-2 text-sm font-bold text-accent transition-colors hover:bg-line"
                >
                  {a.title}
                </a>
              ))}
          </div>
        </div>
      </Section>
      <Lightbox />
    </>
  );
}
