"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useGalleryStore } from "@/store/gallery-store";
import { Icon } from "@/components/ui/icon";

/** Lightbox galeri dengan navigasi keyboard (panah + Escape). */
export function Lightbox() {
  const isOpen = useGalleryStore((s) => s.isOpen);
  const photos = useGalleryStore((s) => s.photos);
  const index = useGalleryStore((s) => s.index);
  const close = useGalleryStore((s) => s.close);
  const next = useGalleryStore((s) => s.next);
  const prev = useGalleryStore((s) => s.prev);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "Tab" && dialog) {
        const focusable = [...dialog.querySelectorAll<HTMLElement>("button:not(:disabled)")];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [isOpen, close, next, prev]);

  if (!isOpen || photos.length === 0) return null;
  const photo = photos[index];

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex flex-col overscroll-contain bg-brand-950/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} dari ${photos.length}: ${photo.caption}`}
    >
      <div className="flex items-center justify-between px-5 py-4 text-white">
        <p className="text-sm font-semibold text-brand-200">
          {index + 1} / {photos.length}
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Tutup galeri"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        <button
          type="button"
          onClick={prev}
          aria-label="Foto sebelumnya"
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
        >
          <Icon name="arrow-left" size={20} />
        </button>
        <figure className="relative flex max-h-full w-full max-w-4xl flex-col items-center animate-fade-in">
          <div className="relative aspect-[4/3] max-h-[70vh] w-full overflow-hidden rounded-2xl">
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <figcaption className="mt-4 text-center text-sm font-semibold text-brand-100">
            {photo.caption}
          </figcaption>
        </figure>
        <button
          type="button"
          onClick={next}
          aria-label="Foto berikutnya"
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
        >
          <Icon name="arrow-right" size={20} />
        </button>
      </div>
    </div>
  );
}
