import Link from "next/link";
import { cn } from "@/lib/utils";
import { PinisiMark } from "@/components/ui/pinisi-mark";

/** Wordmark lengkap untuk header/footer. `compact` menyembunyikan sub-teks
 *  dan memperkecil marka pada layar kecil agar header tetap pas. */
export function Logo({
  variant = "dark",
  compact = false,
  className,
}: {
  variant?: "dark" | "light";
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("group min-w-0", className)} aria-label="Beranda SMPN Satap 4 Barru">
      <span className="flex items-center gap-2.5 sm:gap-3">
        <PinisiMark size={compact ? 44 : 54} className="shrink-0 transition-transform group-hover:-translate-y-0.5" />
        <span className="flex min-w-0 flex-col leading-tight">
          <span
            className={cn(
              "truncate font-extrabold tracking-tight",
              compact ? "text-sm sm:text-lg" : "text-base sm:text-lg",
              variant === "dark" ? "text-heading" : "text-white",
            )}
          >
            SMPN Satap 4 Barru
          </span>
          <span
            className={cn(
              "truncate text-[11px] font-semibold uppercase tracking-[0.14em]",
              compact && "hidden sm:block",
              variant === "dark" ? "text-muted" : "text-brand-200",
            )}
          >
            Desa Anabanua · Kab. Barru
          </span>
        </span>
      </span>
    </Link>
  );
}
