"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Hitung waktu sekarang dalam WITA (UTC+8) apa pun zona perangkat. */
function getWitaNow(): Date {
  const now = new Date();
  return new Date(now.getTime() + (8 * 60 + now.getTimezoneOffset()) * 60_000);
}

/** Widget status layanan sekolah di topbar: "Buka" Senin–Sabtu 07.30–14.00
 *  WITA, diperbarui otomatis tiap menit. Render server memakai teks netral
 *  agar bebas hydration mismatch. */
export function OpenStatus() {
  const [state, setState] = useState<"open" | "closed" | null>(null);

  useEffect(() => {
    const compute = () => {
      const wita = getWitaNow();
      const day = wita.getDay(); // 0 = Minggu
      const minutes = wita.getHours() * 60 + wita.getMinutes();
      const open = day >= 1 && day <= 6 && minutes >= 7 * 60 + 30 && minutes < 14 * 60;
      setState(open ? "open" : "closed");
    };
    compute();
    const timer = setInterval(compute, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="flex items-center gap-1.5 text-brand-200">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          state === null
            ? "bg-white/30"
            : state === "open"
              ? "bg-emerald-400"
              : "bg-rose-400",
          state !== null && "animate-pulse",
        )}
        aria-hidden="true"
      />
      <span suppressHydrationWarning>
        {state === "open"
          ? "Sekolah Buka · s.d. 14.00 WITA"
          : state === "closed"
            ? "Sekolah Tutup · buka 07.30 WITA"
            : "Senin – Sabtu, 07.30 – 14.00 WITA"}
      </span>
    </span>
  );
}
