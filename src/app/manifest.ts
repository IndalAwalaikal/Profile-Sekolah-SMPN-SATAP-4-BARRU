import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/** Manifest PWA — memungkinkan "Add to Home Screen" sebagai aplikasi sekolah. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: "SMPN Satap 4",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b1e3d",
    theme_color: "#0b1e3d",
    lang: "id",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
