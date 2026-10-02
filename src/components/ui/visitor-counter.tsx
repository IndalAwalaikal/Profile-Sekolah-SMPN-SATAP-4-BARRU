"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";

interface VisitorStats {
  total: number;
  today: number;
  month: number;
}

export function VisitorCounter({ className = "" }: { className?: string }) {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    const recordVisit = async () => {
      try {
        // Cek apakah sesi ini sudah pernah tercatat (10 menit cooldown)
        const lastRecorded = sessionStorage.getItem("visit_recorded_timestamp");
        const now = Date.now();
        const shouldCount =
          !lastRecorded || now - parseInt(lastRecorded, 10) > 10 * 60 * 1000;

        const res = await fetch("/api/visitors", {
          method: shouldCount ? "POST" : "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data: VisitorStats = await res.json();
          setStats(data);
          if (shouldCount) {
            sessionStorage.setItem("visit_recorded_timestamp", now.toString());
          }
        }
      } catch {
        // Gagal fetch — tetap tampilkan "—" (null state)
      }
    };

    recordVisit();
  }, []);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("id-ID").format(num);

  // Selama data belum di-fetch, tampilkan placeholder "—"
  const todayLabel =
    stats !== null ? formatNumber(stats.today) : "—";
  const totalLabel =
    stats !== null ? formatNumber(stats.total) : "—";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs text-brand-300 transition-colors hover:text-white ${className}`}
      title={`Total kunjungan: ${totalLabel}`}
      aria-label={`${todayLabel} pengunjung hari ini`}
    >
      <Icon name="eye" size={14} className="text-gold-400 shrink-0" />
      <span>
        <strong className="font-bold text-brand-100">{todayLabel}</strong>{" "}
        pengunjung hari ini
      </span>
    </span>
  );
}
