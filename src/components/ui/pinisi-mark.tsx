import Image from "next/image";
import { cn } from "@/lib/utils";
// Static import agar Next membaca dimensi asli file otomatis — lebar ikut
// rasio aspek logo (logo tidak persegi), jadi tidak pernah terdistorsi.
import logoSource from "../../../public/icons/logo-sekolah.png";

/** Marka identitas sekolah — lambang resmi dari `/icons/logo-sekolah.png`.
 *  Tinggi dikunci ke `size`, lebar mengikuti rasio aspek asli file. */
export function PinisiMark({
  size = 44,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={logoSource}
      alt=""
      priority
      className={cn("h-auto w-auto", className)}
      style={{ height: size, width: "auto" }}
      aria-hidden="true"
    />
  );
}
