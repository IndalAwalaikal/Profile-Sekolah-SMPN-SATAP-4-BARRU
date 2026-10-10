/**
 * Optimasi aset gambar situs SMPN Satap 4 Barru:
 *  1. Kompres logo sekolah (PNG palette, kualitas visual tetap).
 *  2. Regenerasi icon-192/icon-512 (manifest PWA) dari logo sekolah.
 *  3. Regenerasi favicon.ico dari logo sekolah.
 *  4. Upscale (Lanczos3) + penajaman foto-foto beresolusi rendah agar
 *     tidak burik saat ditampilkan di layar retina.
 */
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, existsSync, renameSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const BRAND_BG = { r: 11, g: 30, b: 61, alpha: 1 }; // #0b1e3d (navy brand)

const report = [];

async function compressLogo() {
  const p = join(ROOT, "public/icons/logo-sekolah.png");
  const meta = await sharp(p).metadata();
  const before = statSync(p).size;
  const buf = await sharp(p)
    // Pertahankan rasio aspek; batasi dimensi terpanjang 1024px (cukup untuk
    // tampilan retina + ikon PWA) — jangan diperkecil terlalu jauh.
    .resize(1024, 1024, { fit: "inside", withoutEnlargement: true, kernel: "lanczos3" })
    .png({ palette: true, quality: 96, compressionLevel: 9, effort: 10 })
    .toBuffer();
  const outMeta = await sharp(buf).metadata();
  writeFileSync(p, buf);
  report.push(
    `logo-sekolah.png: ${meta.width}x${meta.height} (${(before / 1024) | 0}KB) -> ${outMeta.width}x${outMeta.height} (${(buf.length / 1024) | 0}KB)`,
  );
  return meta.hasAlpha;
}

async function regenIcons(hasAlpha) {
  const src = join(ROOT, "public/icons/logo-sekolah.png");
  for (const size of [192, 512]) {
    // Logo berada di tengah kanvas persegi dengan padding 8% — rasio aspek
    // asli dipertahankan (fit: inside) dan aman untuk zona aman ikon maskable.
    const inner = await sharp(src)
      .resize(Math.round(size * 0.84), Math.round(size * 0.84), {
        fit: "inside",
        kernel: "lanczos3",
      })
      .png()
      .toBuffer();
    let img = sharp({
      create: { width: size, height: size, channels: 4, background: hasAlpha ? BRAND_BG : { r: 0, g: 0, b: 0, alpha: 0 } },
    }).composite([{ input: inner, gravity: "center" }]);
    const buf = await img.png({ palette: true, quality: 96, compressionLevel: 9, effort: 10 }).toBuffer();
    writeFileSync(join(ROOT, `public/icons/icon-${size}.png`), buf);
    report.push(`icon-${size}.png diregenerasi dari logo (${(buf.length / 1024) | 0}KB)`);
  }
}

/** Bungkus beberapa PNG ke dalam satu file .ico (PNG-in-ICO, didukung semua browser modern). */
async function regenFavicon() {
  const src = join(ROOT, "public/icons/logo-sekolah.png");
  const sizes = [16, 32, 48];
  const pngs = [];
  for (const s of sizes) {
    const inner = await sharp(src)
      .resize(Math.round(s * 0.9), Math.round(s * 0.9), { fit: "inside", kernel: "lanczos3" })
      .png()
      .toBuffer();
    const buf = await sharp({
      create: { width: s, height: s, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
    })
      .composite([{ input: inner, gravity: "center" }])
      .png()
      .toBuffer();
    pngs.push({ size: s, buf });
  }
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + pngs.length * 16;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    entries.push(e);
  }
  writeFileSync(join(ROOT, "src/app/favicon.ico"), Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]));
  report.push("favicon.ico diregenerasi dari logo (16/32/48px)");
}

const TARGETS = [
  // [file, lebar/tinggi minimum yang diinginkan]
  ["public/images/galeri-2.jpg", 1800],
  ["public/images/galeri-4.jpg", 1920],
  ["public/images/galeri-12.jpg", 1920],
];

async function enhancePhotos() {
  for (const [rel, minSize] of TARGETS) {
    const p = join(ROOT, rel);
    if (!existsSync(p)) {
      report.push(`${rel}: TIDAK ADA, dilewati`);
      continue;
    }
    const meta = await sharp(p).metadata();
    const scale = Math.max(1, minSize / Math.max(meta.width, meta.height));
    if (scale <= 1.05) {
      report.push(`${rel}: sudah cukup (${meta.width}x${meta.height}), dilewati`);
      continue;
    }
    // Backup file asli satu kali (hanya jika belum ada backup).
    const bak = p.replace(/(\.\w+)$/, ".original$1");
    if (!existsSync(bak)) renameSync(p, bak);
    const buf = await sharp(bak)
      .resize(Math.round(meta.width * scale), Math.round(meta.height * scale), {
        kernel: "lanczos3",
      })
      .sharpen({ sigma: 0.7, m1: 0.8, m2: 2.2 })
      .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();
    writeFileSync(p, buf);
    const outMeta = await sharp(buf).metadata();
    report.push(
      `${rel}: ${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height} (${(statSync(bak).size / 1024) | 0}KB -> ${(buf.length / 1024) | 0}KB)`,
    );
  }
}

const hasAlpha = (await sharp(join(ROOT, "public/icons/logo-sekolah.png")).metadata()).hasAlpha;
report.push(`logo punya alpha: ${hasAlpha}`);
await compressLogo();
await regenIcons(hasAlpha);
await regenFavicon();
await enhancePhotos();
console.log(report.join("\n"));
