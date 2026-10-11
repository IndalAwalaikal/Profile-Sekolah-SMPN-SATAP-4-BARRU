import { ShimmerImage } from "@/components/ui/shimmer-image";
import { Icon, type IconName } from "@/components/ui/icon";
import type { Ekstrakurikuler } from "@/types";

const visualBySlug: Record<string, { icon: IconName; tone: string; label: string }> = {
  olahraga: {
    icon: "trophy",
    tone: "from-emerald-950 via-emerald-800 to-lime-700",
    label: "Aktif, sehat, berprestasi",
  },
  "osn-mipas": {
    icon: "book-open",
    tone: "from-indigo-950 via-blue-800 to-cyan-700",
    label: "Berpikir kritis dan ingin tahu",
  },
  "keagamaan-btq": {
    icon: "book",
    tone: "from-teal-950 via-teal-800 to-emerald-700",
    label: "Belajar dan bertumbuh bersama",
  },
  "minat-bakat": {
    icon: "sparkles",
    tone: "from-amber-950 via-orange-800 to-rose-700",
    label: "Ide kreatif jadi karya",
  },
};

export function ExtracurricularVisual({
  item,
  sizes,
}: {
  item: Ekstrakurikuler;
  sizes: string;
}) {
  if (item.image) {
    return (
      <ShimmerImage
        src={item.image}
        alt={`Dokumentasi kegiatan ${item.name}`}
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  const visual = visualBySlug[item.slug] ?? {
    icon: "star" as const,
    tone: "from-brand-950 via-brand-800 to-brand-600",
    label: "Ruang untuk tumbuh dan berkarya",
  };

  return (
    <div
      aria-label={`Ilustrasi ${item.name}`}
      className={`absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br ${visual.tone}`}
    >
      <span aria-hidden="true" className="absolute -right-10 -top-16 size-56 rounded-full border border-white/10" />
      <span aria-hidden="true" className="absolute -bottom-28 -left-12 size-64 rounded-full border border-white/10" />
      <div className="relative flex flex-col items-center px-6 text-center text-white">
        <span className="mb-3 grid size-16 place-items-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm">
          <Icon name={visual.icon} size={30} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/65">
          Ilustrasi kegiatan
        </span>
        <span className="mt-1.5 text-sm font-extrabold tracking-wide sm:text-base">{item.name}</span>
        <span className="mt-1 text-xs text-white/75">{visual.label}</span>
      </div>
    </div>
  );
}
