"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Mengamati seluruh elemen [data-reveal] dan menandainya saat masuk viewport,
 *  sehingga konten muncul dengan transisi halus saat di-scroll.
 *  Dijalankan ulang tiap pindah halaman karena elemen baru dirender. */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => {
      // elemen yang sudah terlihat sejak awal langsung ditandai
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.setAttribute("data-revealed", "");
      } else {
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
