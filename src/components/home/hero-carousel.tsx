"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { WaveDivider } from "@/components/ui/wave-divider";

export interface HeroSlide {
  src: string;
  eyebrow: string;
  title: string;
  highlight: string;
  titleAfter?: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

const cloudinaryLoader = ({ src, width }: { src: string; width: number }) =>
  src.replace("/image/upload/", `/image/upload/f_auto,q_auto,w_${width},c_limit/`);

/** Hero beranda: crossfade foto (ken-burns) dan teks & CTA per slide yang
 *  ikut berganti serentak. Pause saat hover; hormati reduced-motion. */
export function HeroCarousel({
  slides,
  interval = 6000,
}: {
  slides: HeroSlide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const raf = requestAnimationFrame(() => setReducedMotion(mq.matches));
    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [paused, reducedMotion, slides.length, interval]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* foto latar + overlay */}
      <div className="absolute inset-0" aria-hidden="true">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            <div
              key={`${slide.src}-${i === index}`}
              className={cn("absolute inset-0", i === index && "animate-ken-burns")}
            >
              <Image
                loader={cloudinaryLoader}
                src={slide.src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/80 to-brand-950/30" />
        <div className="pattern-dots absolute inset-0 opacity-30" />
      </div>

      {/* teks & CTA per slide (ditumpuk grid agar tinggi stabil) */}
      <Container className="relative py-20 sm:py-28 lg:py-36">
        <div className="grid">
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              inert={i !== index}
              className={cn(
                "col-start-1 row-start-1 max-w-2xl transition-all duration-700 ease-out",
                i === index
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-4 opacity-0",
              )}
              aria-hidden={i !== index}
            >
              <p className="eyebrow text-gold-400">{slide.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
                {slide.title}{" "}
                <span className="relative inline-block text-gold-400">
                  {slide.highlight}
                  <svg
                    viewBox="0 0 220 12"
                    className="absolute -bottom-2 left-0 w-full text-gold-500/70"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 9c60-6 150-6 214-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                {slide.titleAfter ? <> {slide.titleAfter}</> : null}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100/90">
                {slide.description}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink
                  href={slide.primaryCta.href}
                  variant="gold"
                  size="lg"
                  withArrow
                >
                  {slide.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={slide.secondaryCta.href} variant="inverse" size="lg">
                  {slide.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>

        {/* fakta singkat — statis di semua slide */}
        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          {[
            { icon: "star" as const, label: `Akreditasi ${siteConfig.akreditasi}` },
            { icon: "graduation-cap" as const, label: `NPSN ${siteConfig.npsn}` },
            { icon: "book-open" as const, label: "Kurikulum Merdeka" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gold-400 ring-1 ring-inset ring-white/20">
                <Icon name={item.icon} size={16} />
              </span>
              <dt className="text-sm font-semibold text-brand-100">{item.label}</dt>
            </div>
          ))}
        </dl>
      </Container>

      {/* lengkungan: foto tetap memanjang di belakangnya (div ini bagian dari
          akar carousel) sehingga tidak ada garis lurus di atas kurva */}
      <WaveDivider className="relative z-10 text-surface" />

      {/* indikator slide */}
      {slides.length > 1 ? (
        <div className="absolute bottom-16 right-4 z-10 sm:bottom-20 sm:right-8">
          <div role="tablist" aria-label="Pilih foto utama" className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}: ${slide.eyebrow}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  i === index ? "w-9 bg-gold-400" : "w-2 bg-white/50 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
