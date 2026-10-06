"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn, formatDateShort } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { ShimmerImage } from "@/components/ui/shimmer-image";

export interface GalleryCarouselSlide {
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  href: string;
}

const AUTOPLAY_MS = 3000;

/** Carousel galeri gaya coverflow: kartu aktif besar di tengah, kartu tetangga
 *  redup & mengecil di sisi, panah bulat, dots dengan bilah progres autoplay.
 *  Mendukung swipe, navigasi keyboard, pause saat hover, dan reduced-motion. */
export function GalleryCarousel({ slides }: { slides: GalleryCarouselSlide[] }) {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const raf = requestAnimationFrame(() => setReducedMotion(mq.matches));
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + n) % n),
    [n],
  );

  useEffect(() => {
    if (reducedMotion || n <= 1) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % n), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [reducedMotion, n]);

  /** Offset kartu relatif terhadap kartu aktif (normalisasi wrap-around). */
  const offsetOf = (i: number) => {
    let o = i - index;
    if (o > n / 2) o -= n;
    if (o < -n / 2) o += n;
    return o;
  };

  if (n === 0) return null;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Galeri kegiatan sekolah"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="relative"
    >
      {/* panggung kartu */}
      <div className="relative h-[420px] sm:h-[480px] lg:h-[520px]">
        {slides.map((slide, i) => {
          const o = offsetOf(i);
          const dist = Math.abs(o);
          const active = dist === 0;
          return (
            <div
              key={slide.src}
              className={cn(
                "absolute left-1/2 top-0 h-full w-[min(88vw,620px)] select-none",
                "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              )}
              style={{
                transform: `translateX(-50%) translateX(${o * 74}%) scale(${
                  dist === 0 ? 1 : dist === 1 ? 0.84 : 0.7
                })`,
                zIndex: 30 - dist,
                opacity: dist === 0 ? 1 : dist === 1 ? 0.45 : 0,
                pointerEvents: dist <= 1 ? "auto" : "none",
                filter: dist > 0 ? "brightness(0.5) saturate(0.85)" : undefined,
              }}
              aria-hidden={!active}
            >
              <div
                onClick={() => (active ? undefined : setIndex(i))}
                className={cn(
                  "group relative h-full w-full overflow-hidden rounded-3xl",
                  "shadow-xl shadow-brand-950/25 ring-1 ring-ink-900/10 dark:ring-white/10",
                  !active && "cursor-pointer",
                )}
              >
                <ShimmerImage
                  src={slide.src}
                  alt={slide.alt}
                  sizes="(max-width: 640px) 88vw, 620px"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                {/* overlay bawah untuk teks */}
                <span
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent",
                    "transition-opacity duration-700",
                    active ? "opacity-100" : "opacity-60",
                  )}
                />
                {/* badge kategori */}
                <span
                  className={cn(
                    "absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-full",
                    "bg-brand-600 px-3.5 py-1.5 text-[11px] font-bold tracking-widest text-white uppercase",
                    "shadow-lg shadow-brand-950/40 ring-1 ring-white/20",
                    "transition-all duration-500",
                    active ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                  )}
                >
                  <Icon name="image" size={13} />
                  {slide.category}
                </span>
                {/* teks: hanya pada kartu aktif */}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 block p-6 text-left sm:p-8",
                    "transition-all duration-500 delay-150",
                    active ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  )}
                >
                  <span className="block text-[11px] font-bold tracking-widest text-brand-200 uppercase">
                    {slide.date ? formatDateShort(slide.date) : "Dokumentasi kegiatan"}
                  </span>
                  <Link
                    href={slide.href}
                    tabIndex={active ? 0 : -1}
                    className="mt-2 block text-xl font-extrabold tracking-tight text-white decoration-gold-400 decoration-2 underline-offset-4 hover:underline sm:text-2xl"
                  >
                    {slide.title}
                  </Link>
                  <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-white/80">
                    {slide.description}
                  </span>
                </span>
              </div>
            </div>
          );
        })}

        {/* panah navigasi */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Foto sebelumnya"
          className={cn(
            "absolute top-1/2 left-1 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center",
            "rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm",
            "transition-all duration-300 hover:scale-110 hover:bg-brand-500 hover:ring-brand-400",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400",
            "active:scale-95",
          )}
        >
          <Icon name="chevron-left" size={20} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Foto berikutnya"
          className={cn(
            "absolute top-1/2 right-1 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center",
            "rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm",
            "transition-all duration-300 hover:scale-110 hover:bg-brand-500 hover:ring-brand-400",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400",
            "active:scale-95",
          )}
        >
          <Icon name="chevron-right" size={20} />
        </button>
      </div>

      {/* dots + progres autoplay */}
      <div
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <div role="tablist" aria-label="Pilih foto galeri" className="flex items-center gap-2.5">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Foto ${i + 1}: ${slide.title}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 overflow-hidden rounded-full transition-all duration-500",
              i === index
                ? "w-16 bg-brand-500/25 dark:bg-brand-400/25"
                : "w-1.5 bg-ink-400/40 hover:bg-brand-400 dark:bg-white/25 dark:hover:bg-white/50",
            )}
          >
          </button>
        ))}
        </div>
      </div>
    </div>
  );
}
