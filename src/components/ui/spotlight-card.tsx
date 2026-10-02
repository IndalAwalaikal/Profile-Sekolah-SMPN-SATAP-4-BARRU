"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Kartu dengan sorotan cahaya yang mengikuti kursor (cursor-follow glow).
 *  Overlay gradien radial mengikuti posisi pointer; otomatis tak tampak
 *  pada perangkat sentuh karena tidak ada pointermove. */
export function SpotlightCard({
  children,
  className,
  tint = "rgba(92, 144, 226, 0.16)",
}: {
  children: React.ReactNode;
  className?: string;
  tint?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn("group/spotlight relative", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0",
          "transition-opacity duration-300 group-hover/spotlight:opacity-100",
        )}
        style={{
          background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), ${tint}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
