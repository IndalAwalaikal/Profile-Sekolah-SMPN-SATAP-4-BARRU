"use client";

import { useEffect } from "react";

/** Daftarkan service worker agar situs dapat di-install (Add to Home Screen). */
export function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* SW opsional — gagal daftar tidak memengaruhi aplikasi */
    });
  }, []);

  return null;
}
