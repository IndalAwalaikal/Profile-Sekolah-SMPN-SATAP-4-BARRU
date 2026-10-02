"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Parallax scroll ringan: anak elemen bergeser perlahan mengikuti scroll.
 *  Mengukur pembungkus luar & mentransform pembungkus dalam agar tidak
 *  terjadi loop umpan balik. Nonaktif otomatis untuk reduced-motion. */
export function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;

    const update = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const rect = outer.getBoundingClientRect();
      // -0.5 … 0.5 relatif terhadap posisi elemen di viewport
      const progress =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        (window.innerHeight + rect.height);
      inner.style.transform = `translate3d(0, ${(progress * speed * 120).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={outerRef} className={cn("relative", className)}>
      <div ref={innerRef} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
