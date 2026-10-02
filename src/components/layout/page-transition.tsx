"use client";

import { usePathname } from "next/navigation";

/** Membungkus konten halaman: setiap pindah rute, konten masuk dengan
 *  animasi halus (keyed by pathname agar animasi dijalankan ulang). */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}
