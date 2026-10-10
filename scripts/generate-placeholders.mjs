import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Membuat gambar placeholder SVG untuk seluruh situs:
 * pemandangan sekolah (gedung/lapangan/perbukitan).
 * Ganti dengan foto asli nantinya — nama file konsisten dengan src/data.
 */

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(outDir, { recursive: true });

const palettes = [
  { sky: ["#dcebff", "#7db4f5"], accent: "#2050b9", label: "sky" },
  { sky: ["#ffedd0", "#f5b871"], accent: "#c07c1e", label: "dawn" },
  { sky: ["#e2f4ea", "#8fd4ae"], accent: "#2f8f5b", label: "green" },
  { sky: ["#ece4ff", "#b39cf0"], accent: "#5a3fc0", label: "dusk" },
];

function wrap(w, h, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">${body}</svg>`;
}


/** Pemandangan: gedung sekolah / lapangan / perbukitan Barru. */
function scene(w, h, i, labelText) {
  const p = palettes[i % palettes.length];
  const variant = i % 3;
  const groundY = h * 0.72;
  let body = gradient("sky" + i, p.sky, w, h);
  body += `<circle cx="${w * 0.82}" cy="${h * 0.2}" r="${h * 0.075}" fill="#ffffff" opacity="0.85"/>`;
  body += `<circle cx="${w * 0.82}" cy="${h * 0.2}" r="${h * 0.11}" fill="#ffffff" opacity="0.25"/>`;

  if (variant === 0) {
    const bx = w * 0.16, bw = w * 0.52, bh = h * 0.42;
    body += `<polygon points="${bx - w * 0.03},${groundY - bh} ${bx + bw / 2},${groundY - bh - h * 0.1} ${bx + bw + w * 0.03},${groundY - bh}" fill="${p.accent}"/>`;
    body += `<rect x="${bx}" y="${groundY - bh}" width="${bw}" height="${bh}" rx="6" fill="#f8fbff"/>`;
    for (let r = 0; r < 2; r++)
      for (let c = 0; c < 5; c++)
        body += `<rect x="${bx + bw * 0.09 + c * bw * 0.18}" y="${groundY - bh + bh * 0.2 + r * bh * 0.34}" width="${bw * 0.11}" height="${bh * 0.2}" rx="4" fill="#3569d3" opacity="0.85"/>`;
    body += `<rect x="${bx + bw * 0.42}" y="${groundY - bh * 0.42}" width="${bw * 0.16}" height="${bh * 0.42}" rx="4" fill="#1a4197"/>`;
    body += `<rect x="${w * 0.76}" y="${groundY - h * 0.34}" width="4" height="${h * 0.34}" fill="#5d6b84"/><path d="M ${w * 0.76} ${groundY - h * 0.34} l ${w * 0.07} ${h * 0.02} l ${-w * 0.07} ${h * 0.02} z" fill="#e23b3b"/>`;
  } else if (variant === 1) {
    body += `<rect x="${w * 0.1}" y="${groundY - h * 0.18}" width="${w * 0.5}" height="${h * 0.14}" rx="8" fill="#f8fbff" stroke="#c2d7f8"/>`;
    body += `<line x1="${w * 0.35}" y1="${groundY - h * 0.18}" x2="${w * 0.35}" y2="${groundY - h * 0.04}" stroke="#c2d7f8"/>`;
    for (let t = 0; t < 3; t++) {
      const tx = w * (0.68 + t * 0.09);
      body += `<rect x="${tx - 3}" y="${groundY - h * 0.22}" width="6" height="${h * 0.22}" fill="#7a5b3a"/><circle cx="${tx}" cy="${groundY - h * 0.27}" r="${h * 0.085}" fill="#3f9d63"/><circle cx="${tx}" cy="${groundY - h * 0.3}" r="${h * 0.06}" fill="#54b477"/>`;
    }
  } else {
    body += `<path d="M 0 ${groundY} Q ${w * 0.25} ${groundY - h * 0.22} ${w * 0.5} ${groundY - h * 0.04} T ${w} ${groundY - h * 0.1} L ${w} ${h} L 0 ${h} Z" fill="#54b477"/>`;
    body += `<path d="M 0 ${groundY + h * 0.06} Q ${w * 0.3} ${groundY - h * 0.12} ${w * 0.62} ${groundY + h * 0.02} T ${w} ${groundY} L ${w} ${h} L 0 ${h} Z" fill="#3f9d63"/>`;
    body += `<path d="M 0 ${groundY + h * 0.14} Q ${w * 0.4} ${groundY - h * 0.04} ${w * 0.8} ${groundY + h * 0.06} L ${w} ${h} L 0 ${h} Z" fill="#2f8f5b"/>`;
  }

  body += `<rect x="0" y="${groundY}" width="${w}" height="${h - groundY}" fill="#e7eef8"/>`;
  body += `<rect x="0" y="${groundY}" width="${w}" height="6" fill="${p.accent}" opacity="0.35"/>`;
  body += label(w, h, labelText, p.label);
  return wrap(w, h, body);
}

const jobs = [
  ...[
    ["hero-sekolah.svg", 1600, 900, "SMPN SATAP 4 BARRU", 0],
    ["profil-sekolah.svg", 1200, 800, "Gerbang Sekolah", 1],
    ...[1, 2, 3, 4, 5, 6].map((n) => [`berita-${n}.svg`, 800, 500, `Dokumentasi ${n}`, n - 1]),
    ...Array.from({ length: 12 }, (_, n) => [`galeri-${n + 1}.svg`, 800, 600, `Foto ${n + 1}`, n]),
  ].map(([name, w, h, label, i]) => () =>
    writeFileSync(join(outDir, name), scene(w, h, i, label))),
];

jobs.forEach((job) => job());
console.log(`Selesai: ${jobs.length} gambar placeholder dibuat di public/images`);

function gradient(id, [c1, c2], w, h) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>`;
}

function label(w, h, text, accent) {
  const fs = Math.round(Math.min(w, h) * 0.045);
  return `<g><rect x="${w * 0.04}" y="${h - fs * 2.6}" width="${text.length * fs * 0.62 + fs * 1.6}" height="${fs * 1.8}" rx="${fs}" fill="#0b1c3d" opacity="0.72"/><text x="${w * 0.04 + fs * 0.8}" y="${h - fs * 1.3}" font-family="ui-sans-serif, system-ui, sans-serif" font-weight="700" font-size="${fs}" fill="#ffffff" letter-spacing="1">${text}</text><path d="M ${w * 0.04 + fs * 0.8} ${h - fs * 1.3 - fs * 1.35} l ${fs * 2.2} 0" stroke="${accent === "sky" ? "#e39c30" : "#ffffff"}" stroke-width="${fs * 0.12}"/></g>`;
}
