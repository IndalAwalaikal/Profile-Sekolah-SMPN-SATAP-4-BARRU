import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG image situs: dibuat otomatis saat build oleh Next.js. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background:
            "linear-gradient(135deg, #0b1e3d 0%, #123367 55%, #1d4e8f 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#e39c30",
              color: "#0b1e3d",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            {siteConfig.legalName.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 22px",
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.3)",
              color: "#c8d8ef",
              fontSize: 20,
            }}
          >
            NPSN {siteConfig.npsn} · Akreditasi {siteConfig.akreditasi}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            Berakhlak Mulia, Berprestasi,
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: -1,
              color: "#e39c30",
            }}
          >
            Berbudaya Lingkungan
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "2px solid rgba(255,255,255,0.18)",
            paddingTop: 28,
            color: "#c8d8ef",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>{siteConfig.url.replace("https://", "")}</div>
          <div style={{ display: "flex" }}>
            Desa Anabanua, Kec. Barru, Kab. Barru
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
