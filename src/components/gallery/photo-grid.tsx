"use client";

import Link from "next/link";
import type { Photo } from "@/types";
import { useGalleryStore } from "@/store/gallery-store";
import { ShimmerImage } from "@/components/ui/shimmer-image";

/** Kumpulan foto dengan lightbox — dipakai di beranda dan halaman galeri. */
export function PhotoGrid({
  photos,
  columns = 3,
}: {
  photos: Photo[];
  columns?: 3 | 4;
}) {
  const open = useGalleryStore((s) => s.open);
  const sizes =
    columns === 4
      ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      : "(max-width: 640px) 50vw, 33vw";

  return (
    <div
      className={
        columns === 4
          ? "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          : "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3"
      }
    >
      {photos.map((photo, i) => (
        <button
          key={photo.src + i}
          type="button"
          onClick={() => open(photos, i)}
          aria-label={`Lihat foto: ${photo.caption}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-tint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ShimmerImage
            src={photo.src}
            alt={photo.caption}
            sizes={sizes}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-end bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent p-3 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            <span className="text-left text-[13px] font-semibold text-white">
              {photo.caption}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

/** Tautan keluar untuk melihat album lengkap. */
export function PhotoGridMoreLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent transition-colors hover:text-accent"
    >
      {label}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tint transition-colors group-hover:bg-line">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
