import { cn } from "@/lib/utils";

/** Pembatas gelombang halus (tanpa kink) antara section navy dan konten terang.
 *  Warna mengikuti `currentColor` — gunakan `text-surface` / `text-brand-950`. */
export function WaveDivider({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 72"
      preserveAspectRatio="none"
      className={cn("block h-10 w-full sm:h-14", flip && "rotate-180", className)}
      aria-hidden="true"
    >
      <path
        d="M0,40 C240,72 480,72 720,48 C960,24 1200,24 1440,48 L1440,72 L0,72 Z"
        fill="currentColor"
      />
    </svg>
  );
}
