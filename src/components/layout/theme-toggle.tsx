"use client";

import { useTheme } from "next-themes";
import { flushSync } from "react-dom";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const emptySubscribe = () => () => {};

/** Tombol mode terang/gelap. Snapshot via useSyncExternalStore agar bebas
 *  hydration mismatch maupun setState di dalam effect. Saat mengganti tema,
 *  View Transition API menggambar lingkaran memancar dari posisi tombol. */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Tanpa View Transition API (atau saat reduced-motion): ganti langsung.
    if (!doc.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    // Titik asal lingkaran: posisi klik (atau tengah tombol via keyboard).
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    void transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 450,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <button
      type="button"
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      onClick={toggleTheme}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full text-body transition-colors hover:bg-tint hover:text-accent",
        className,
      )}
    >
      <Icon name={isDark ? "sun" : "moon"} size={18} />
    </button>
  );
}
