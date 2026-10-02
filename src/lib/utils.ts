import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Gabungkan class Tailwind dengan aman (resolve konflik utilitas). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format tanggal ISO menjadi format Indonesia, mis. "12 September 2026". */
export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" },
): string {
  return new Date(iso).toLocaleDateString("id-ID", options);
}

/** Format tanggal pendek, mis. "12 Sep 2026". */
export function formatDateShort(iso: string): string {
  return formatDate(iso, { day: "numeric", month: "short", year: "numeric" });
}

/** Potong kalimat pada batas kata terdekat. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const slice = text.slice(0, maxLength);
  return `${slice.slice(0, Math.max(slice.lastIndexOf(" "), 0))}…`;
}
