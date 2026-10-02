import { ImageResponse } from "next/og";
import { getNewsBySlug } from "@/data/news";
import { siteConfig } from "@/lib/site";
import { formatDateShort } from "@/lib/utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pratinjau artikel berita SMPN Satap 4 Barru";

/** Pecah judul menjadi beberapa baris agar muat di kanvas OG. */
function wrap(text: string, max = 24, maxLines = 3): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= max) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
    if (lines.length === maxLines) break;
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

/** OG image per artikel berita — digenerate otomatis per slug saat build. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  const lines = wrap(article?.title ?? siteConfig.name);

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
            }}
          >
            {article?.category ?? "Berita"}
          </div>
          <div style={{ display: "flex", color: "#c8d8ef", fontSize: 22 }}>
            {article ? formatDateShort(article.date) : siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: -0.5,
              }}
            >
              {line}
            </div>
          ))}
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
          <div style={{ display: "flex" }}>{siteConfig.name}</div>
          <div style={{ display: "flex", color: "#e39c30" }}>
            {siteConfig.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
