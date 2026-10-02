"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** next/image dengan overlay shimmer hingga gambar selesai dimuat —
 *  mencegah area kosong / "lompatan" saat jaringan lambat. Harus dipakai
 *  di dalam elemen `relative` (mode `fill`). */
export function ShimmerImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Gambar dari cache bisa selesai termuat sebelum hydration berjalan.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        priority={priority}
        onLoad={() => setLoaded(true)}
        className={cn(className)}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <span className="absolute inset-0 bg-tint" />
        <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(100deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] bg-[length:220%_100%]" />
      </span>
    </>
  );
}
