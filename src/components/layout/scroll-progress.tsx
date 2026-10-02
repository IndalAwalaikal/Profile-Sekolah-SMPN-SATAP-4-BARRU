"use client";

import { useEffect, useState } from "react";

/** Bar tipis di atas layar yang mengisi sesuai progres scroll. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? el.scrollTop / max : 0);
      });
    };
    // jadwalkan pengukuran awal agar tidak ada setState sinkron dalam efek
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-brand-600 via-brand-500 to-gold-400"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
