"use client";

import { useState } from "react";
import { achievements, achievementLevels } from "@/data/prestasi";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const levelColors: Record<string, string> = {
  Kecamatan: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Kabupaten: "bg-tint text-accent",
  Provinsi: "bg-gold-100 text-gold-600 dark:bg-gold-500/15 dark:text-gold-300",
  Nasional: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
};

/** Daftar prestasi dengan filter tingkat beranimasi — kartu masuk kembali
 *  dengan fade-up bertahap setiap kali filter diganti. */
export function PrestasiDirectory() {
  const [filter, setFilter] = useState<string>("Semua");

  const sorted = [...achievements].sort((a, b) => b.year - a.year);
  const list =
    filter === "Semua"
      ? sorted
      : sorted.filter((item) => item.level === filter);

  return (
    <div>
      {/* filter tingkat */}
      <div className="flex flex-wrap gap-2">
        {achievementLevels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setFilter(level)}
            aria-pressed={filter === level}
            className={cn(
              "rounded-full px-4 py-1.5 text-[13px] font-bold transition-all duration-300",
              filter === level
                ? "scale-105 bg-brand-950 text-white shadow-md shadow-brand-950/20"
                : "bg-tint text-accent hover:bg-line",
            )}
          >
            {level}
          </button>
        ))}
      </div>

      {/* daftar dengan animasi masuk per kartu */}
      <div className="mt-8 space-y-4">
        {list.map((item, i) => (
          <SpotlightCard
            key={`${filter}-${item.title}`}
            className="rounded-2xl"
            tint="rgba(227, 156, 48, 0.14)"
          >
            <div
              className="group relative flex animate-fade-up gap-5 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-brand-950/5 sm:p-6"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-600 transition-colors group-hover:bg-gold-500 group-hover:text-brand-950 dark:bg-gold-500/15 dark:text-gold-300">
                <Icon name="trophy" size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-0.5 text-[11px] font-bold uppercase tracking-wide ${levelColors[item.level]}`}
                  >
                    {item.level}
                  </span>
                  <span className="text-[12px] font-bold text-muted">
                    {item.year} · {item.field}
                  </span>
                </div>
                <h3 className="mt-1.5 text-base font-bold leading-snug text-heading sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[13px] font-semibold text-muted">
                  {item.students.map((student) => (
                    <span key={student} className="flex items-center gap-1">
                      <Icon name="users" size={12} className="text-brand-400" />
                      {student}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-muted">
          Belum ada prestasi pada tingkat ini.
        </p>
      ) : null}
    </div>
  );
}
