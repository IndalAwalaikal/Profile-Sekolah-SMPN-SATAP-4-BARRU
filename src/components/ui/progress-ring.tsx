"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Cincin progres SVG yang terisi animasi saat pertama masuk viewport
 *  (IntersectionObserver). Warna mengikuti `tone`. */
export function ProgressRing({
  value,
  center,
  label,
  sublabel,
  size = 128,
  stroke = 10,
  tone = "brand",
  className,
}: {
  /** Persentase pengisian cincin (0–100). */
  value: number;
  /** Konten tengah cincin (mis. angka atau persentase). */
  center: React.ReactNode;
  label: string;
  sublabel?: string;
  size?: number;
  stroke?: number;
  tone?: "brand" | "gold";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const clamped = Math.min(100, Math.max(0, value));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          className={cn(
            "-rotate-90",
            tone === "brand"
              ? "text-brand-500 dark:text-brand-400"
              : "text-gold-500",
          )}
          aria-hidden="true"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            stroke="currentColor"
            className="opacity-40"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              visible ? circumference * (1 - clamped / 100) : circumference
            }
            style={{
              transition:
                "stroke-dashoffset 1.3s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-extrabold tracking-tight text-heading">
            {center}
          </span>
        </span>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-heading">{label}</p>
        {sublabel ? (
          <p className="mt-0.5 text-xs text-muted">{sublabel}</p>
        ) : null}
      </div>
    </div>
  );
}
