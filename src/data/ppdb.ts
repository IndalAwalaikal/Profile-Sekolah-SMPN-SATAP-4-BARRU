import { siteConfig } from "@/lib/site";

/** Informasi periode PPDB terakhir yang sudah selesai. Hubungi sekolah untuk jadwal terbaru. */
export const ppdbInfo = {
  year: siteConfig.academicYear,
  registrationPeriod: "1 Juni – 5 Juli 2026",
} as const;
