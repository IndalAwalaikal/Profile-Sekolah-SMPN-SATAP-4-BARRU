"use client";

import { useState } from "react";
import { facilities } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { ShimmerImage } from "@/components/ui/shimmer-image";

/** Posisi dekoratif tiap fasilitas pada denah (persentase). */
const POSITIONS: Record<string, { x: number; y: number }> = {
  "lab-komputer": { x: 22, y: 30 },
  "lab-ipa": { x: 50, y: 22 },
  perpustakaan: { x: 78, y: 30 },
  "lapangan-olahraga": { x: 50, y: 55 },
  "halaman-sekolah": { x: 50, y: 80 },
  musholla: { x: 18, y: 72 },
  "lingkungan-alam": { x: 82, y: 72 },
};

/** Denah interaktif sekolah: klik titik fasilitas untuk melihat foto,
 *  deskripsi, dan rinciannya. */
export function ExploreMap() {
  const [selected, setSelected] = useState<string>(
    facilities[0]?.slug ?? "",
  );
  const active = facilities.find((f) => f.slug === selected) ?? facilities[0];

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* denah */}
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-emerald-950/10 via-tint to-brand-950/10 lg:col-span-7"
        data-reveal
      >
        {/* denah latar bergaya */}
        <svg
          viewBox="0 0 800 500"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <rect x="60" y="80" width="190" height="110" rx="14" className="fill-brand-600/10 stroke-brand-600/30" strokeWidth="2" />
          <rect x="310" y="55" width="180" height="100" rx="14" className="fill-gold-500/10 stroke-gold-500/30" strokeWidth="2" />
          <rect x="560" y="80" width="180" height="110" rx="14" className="fill-brand-600/10 stroke-brand-600/30" strokeWidth="2" />
          <rect x="55" y="310" width="120" height="90" rx="12" className="fill-brand-600/10 stroke-brand-600/30" strokeWidth="2" />
          <circle cx="400" cy="275" r="75" className="fill-emerald-500/10 stroke-emerald-500/30" strokeWidth="2" />
          <rect x="250" y="370" width="300" height="85" rx="16" className="fill-brand-600/10 stroke-brand-600/30" strokeWidth="2" />
          <rect x="620" y="315" width="120" height="90" rx="12" className="fill-emerald-500/10 stroke-emerald-500/30" strokeWidth="2" />
          <path
            d="M155 190 C 155 240, 400 240, 400 245 M400 155 L400 245 M650 190 C 650 240, 400 240, 400 245 M400 245 L400 370 M115 310 L115 245 M680 315 L680 245"
            fill="none"
            className="stroke-brand-600/25"
            strokeWidth="2.5"
            strokeDasharray="7 8"
          />
        </svg>

        {/* titik fasilitas */}
        {facilities.map((facility, i) => {
          const pos = POSITIONS[facility.slug];
          if (!pos) return null;
          const isActive = facility.slug === selected;
          return (
            <button
              key={facility.slug}
              type="button"
              onClick={() => setSelected(facility.slug)}
              aria-pressed={isActive}
              aria-label={`Lihat ${facility.name}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={cn(
                "absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm font-extrabold shadow-lg transition-all duration-300",
                isActive
                  ? "scale-125 bg-gold-500 text-brand-950 ring-4 ring-gold-500/30"
                  : "bg-brand-950 text-white ring-2 ring-white/25 hover:scale-110 hover:bg-brand-800",
              )}
            >
              {i + 1}
            </button>
          );
        })}

        <span className="absolute bottom-3 left-4 rounded-full bg-surface/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-muted ring-1 ring-line backdrop-blur">
          Denah Fasilitas — klik titik nomor untuk melihat detail
        </span>
      </div>

      {/* kartu detail */}
      {active ? (
        <div
          key={active.slug}
          className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-lg shadow-brand-950/5 lg:col-span-5"
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <ShimmerImage
              src={active.image}
              alt={active.name}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-brand-950/85 text-[13px] font-extrabold text-gold-400 ring-1 ring-white/25 backdrop-blur">
              {facilities.findIndex((f) => f.slug === active.slug) + 1}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-extrabold tracking-tight text-heading">{active.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{active.description}</p>
            <ul className="mt-4 space-y-2">
              {active.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2 text-[13px] font-semibold text-body">
                  <Icon name="star" size={13} className="mt-0.5 shrink-0 text-gold-500" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
