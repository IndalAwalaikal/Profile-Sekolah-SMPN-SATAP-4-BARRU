import Image from "next/image";
import { galleryAlbums } from "@/data/galeri";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import {
  GalleryCarousel,
  type GalleryCarouselSlide,
} from "@/components/home/gallery-carousel";

/** Susun slide carousel dari sampul + foto unggulan tiap album (unik per gambar). */
function buildSlides(): GalleryCarouselSlide[] {
  const seen = new Set<string>();
  const slides: GalleryCarouselSlide[] = [];
  for (const album of galleryAlbums) {
    const picks = [album.cover, album.photos[1]?.src].filter(
      (src): src is string => Boolean(src),
    );
    for (const src of picks) {
      if (seen.has(src)) continue;
      seen.add(src);
      const photo = album.photos.find((p) => p.src === src);
      slides.push({
        src,
        alt: photo?.caption ?? album.title,
        title: album.title,
        description: photo?.caption ?? album.description,
        category: album.category,
        date: album.date,
        href: `/galeri/${album.slug}`,
      });
    }
  }
  return slides;
}

/** Pratinjau galeri kegiatan di beranda: carousel coverflow interaktif. */
export function GallerySection() {
  const slides = buildSlides();

  return (
    <Section tint className="mt-0 overflow-hidden">
      <SectionHeading
        align="center"
        eyebrow="Galeri Kegiatan"
        title="Momen-Momen di Sekolah Kami"
        description="Dokumentasi kegiatan belajar, seni budaya, olahraga, dan lingkungan sekolah."
      />
      <div className="mt-12" data-reveal>
        <GalleryCarousel slides={slides} />
      </div>
      <div className="mt-10 flex justify-center">
        <ButtonLink href="/galeri" withArrow>
          Lihat Semua Galeri
        </ButtonLink>
      </div>
    </Section>
  );
}

/** Kover album galeri untuk kartu. */
export function GalleryCover({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}
