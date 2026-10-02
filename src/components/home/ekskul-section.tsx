"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ekstrakurikuler } from "@/data/ekstrakurikuler";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ShimmerImage } from "@/components/ui/shimmer-image";

const AUTOPLAY_MS = 6000;

function subscribeToReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Section ekstrakurikuler beranda dengan carousel yang dapat dijeda. */
export function EkskulSection() {
  const n = ekstrakurikuler.length;
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [noTransition, setNoTransition] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    () => false,
  );

  // Jumlah kartu terlihat mengikuti lebar layar (deferred agar bebas
  // setState sinkron di effect).
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setVisible(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    const raf = requestAnimationFrame(compute);
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", compute);
    };
  }, []);

  const indexRef = useRef(0);

  // Geser otomatis tiap 2 detik; loop mulus: saat mencapai salinan kedua,
  // kembali ke 0 tanpa transisi (dijadwalkan dalam callback, bukan effect).
  useEffect(() => {
    if (paused || hovering || reducedMotion || n <= visible) return;
    let wrapTimer: number | undefined;

    const tick = () => {
      const next = indexRef.current + 1;
      indexRef.current = next;
      if (next === n) {
        // transisi 700ms berjalan dulu, lalu lompat mulus ke 0
        wrapTimer = window.setTimeout(() => {
          setNoTransition(true);
          indexRef.current = 0;
          setIndex(0);
          requestAnimationFrame(() => setNoTransition(false));
        }, 720);
      }
      setIndex(next);
    };

    const t = window.setInterval(tick, AUTOPLAY_MS);
    return () => {
      window.clearInterval(t);
      if (wrapTimer !== undefined) window.clearTimeout(wrapTimer);
    };
  }, [paused, hovering, reducedMotion, n, visible]);

  const track = [...ekstrakurikuler, ...ekstrakurikuler];

  return (
    <section className="relative overflow-hidden bg-brand-950 py-16 sm:py-24">
      {/* dekorasi latar */}
      <div className="pattern-dots absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="absolute -top-24 right-[10%] h-72 w-72 rounded-full bg-brand-600/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-28 left-[5%] h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <SectionHeading
          align="center"
          tone="light"
          eyebrow="Minat dan Bakat"
          title="Ekstrakurikuler yang Hidup"
          description="Sembilan pembinaan untuk menyalurkan energi, karakter, dan kreativitas siswa."
        />

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused || reducedMotion}
            disabled={reducedMotion}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Icon name={paused || reducedMotion ? "play" : "pause"} size={15} />
            {reducedMotion ? "Animasi dijeda oleh preferensi perangkat" : paused ? "Lanjutkan" : "Jeda animasi"}
          </button>
        </div>

        {/* strip bergeser */}
        <div
          className="mt-12 overflow-hidden"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          data-reveal
        >
          <div
            className={cn(
              "flex",
              !noTransition && "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            )}
            style={{ transform: `translateX(-${(index * 100) / visible}%)` }}
          >
            {track.map((item, i) => (
              <div
                key={`${item.slug}-${i}`}
                className="group shrink-0 grow-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-900/60 shadow-xl shadow-brand-950/40 backdrop-blur-sm">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ShimmerImage
                      src={item.image}
                      alt={item.name}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent" />
                    <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold-400 ring-1 ring-inset ring-white/20 backdrop-blur-sm">
                      <Icon name="clock" size={11} />
                      {item.schedule}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white">{item.name}</h3>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-brand-200">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/ekstrakurikuler" variant="gold" withArrow>
            Lihat Semua Ekstrakurikuler
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
