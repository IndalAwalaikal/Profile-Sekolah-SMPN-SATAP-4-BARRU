/**
 * Mengunduh foto asli dari internet untuk menggantikan placeholder SVG:
 * - Foto kegiatan/sekolah: Wikimedia Commons (API pencarian bebas lisensi).
 * - Potret guru/staf: randomuser.me (foto potret untuk demo).
 * Catatan atribusi tersimpan di public/images/credits.json.
 * Jalankan: node scripts/fetch-photos.mjs
 */

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(outDir, { recursive: true });

const WIDTH = 1400;

/** Slot foto kegiatan: nama file (tanpa ekstensi) → kata kunci pencarian Commons. */
const sceneSlots = [
  { name: "profil-sekolah", query: "school building Indonesia" },
  { name: "hero-2", query: "students classroom Indonesia", skip: 1 },
  { name: "hero-3", query: "school building Indonesia", skip: 1 },
  { name: "berita-1", query: "students classroom examination" },
  { name: "berita-2", query: "school classroom desks" },
  { name: "berita-3", query: "school garden students" },
  { name: "berita-4", query: "angklung performance" },
  { name: "berita-5", query: "library students reading" },
  { name: "berita-6", query: "basketball team school" },
  { name: "galeri-1", query: "traditional dance Indonesia performance" },
  { name: "galeri-2", query: "angklung" },
  { name: "galeri-3", query: "flag ceremony school Indonesia" },
  { name: "galeri-4", query: "pramuka scout Indonesia" },
  { name: "galeri-5", query: "students reading book library" },
  { name: "galeri-6", query: "school stage performance" },
  { name: "galeri-7", query: "basketball game team" },
  { name: "galeri-8", query: "first aid training" },
  { name: "galeri-9", query: "volleyball match" },
  { name: "galeri-10", query: "marching band performance" },
  { name: "galeri-11", query: "greenhouse plants garden" },
  { name: "galeri-12", query: "students group school Indonesia" },
];

/** Slot potret: nama file → URL foto potret pravatar (foto demo, 400×400). */
const portraitSlots = [
  { name: "kepala-sekolah", url: "https://i.pravatar.cc/400?img=53" },
  { name: "guru-1", url: "https://i.pravatar.cc/400?img=47" },
  { name: "guru-2", url: "https://i.pravatar.cc/400?img=12" },
  { name: "guru-3", url: "https://i.pravatar.cc/400?img=32" },
  { name: "guru-4", url: "https://i.pravatar.cc/400?img=25" },
  { name: "guru-5", url: "https://i.pravatar.cc/400?img=59" },
  { name: "guru-6", url: "https://i.pravatar.cc/400?img=16" },
  { name: "guru-7", url: "https://i.pravatar.cc/400?img=68" },
  { name: "guru-8", url: "https://i.pravatar.cc/400?img=44" },
  { name: "guru-9", url: "https://i.pravatar.cc/400?img=69" },
  { name: "guru-10", url: "https://i.pravatar.cc/400?img=5" },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isImage(buf) {
  return (
    buf.length > 3000 &&
    (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff || // JPEG
      (buf[0] === 0x89 && buf[1] === 0x50)) // PNG
  );
}

async function withRetry(label, fn, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) await sleep(2000 * (i + 1));
    }
  }
  throw lastErr;
}


async function fetchJson(url) {
  const res = await fetch(url, { headers: { "User-Agent": "smpn-satap4-barru-website/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} untuk ${url}`);
  return res.json();
}

async function download(url, file) {
  const res = await fetch(url, { headers: { "User-Agent": "smpn-satap4-barru-website/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} untuk ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (!isImage(buf)) throw new Error(`Bukan gambar valid (${buf.length}B)`);
  writeFileSync(file, buf);
  return buf.length;
}

async function fetchScene(slot) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrsearch: `${slot.query} filetype:bitmap`,
    gsrnamespace: "6",
    gsrlimit: "8",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: String(WIDTH),
  });
  const data = await fetchJson(`https://commons.wikimedia.org/w/api.php?${params}`);
  const pages = Object.values(data?.query?.pages ?? {})
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  const offset = slot.skip ?? 0;
  for (const page of pages.slice(offset)) {
    const info = page?.imageinfo?.[0];
    if (!info) continue;
    const mimeOk = ["image/jpeg", "image/png"].includes(info.mime);
    const bigEnough = info.width >= 900 && info.height >= 500;
    if (!mimeOk || !bigEnough || !info.thumburl) continue;
    const file = join(outDir, `${slot.name}.jpg`);
    const bytes = await download(info.thumburl, file);
    return {
      file: `${slot.name}.jpg`,
      title: page.title,
      source: info.descriptionurl,
      query: slot.query,
      bytes,
    };
  }
  throw new Error(`Tidak ada hasil cocok untuk "${slot.query}"`);
}

async function fetchPortrait(slot) {
  const file = join(outDir, `${slot.name}.jpg`);
  const bytes = await download(slot.url, file);
  return { file: `${slot.name}.jpg`, source: slot.url, bytes };
}

const credits = { scenes: {}, portraits: {} };
let ok = 0;
let failed = [];

for (const slot of sceneSlots) {
  const file = join(outDir, `${slot.name}.jpg`);
  if (existsSync(file)) {
    ok++;
    console.log(`SKIP ${slot.name}.jpg (sudah ada)`);
    continue;
  }
  try {
    const meta = await withRetry(slot.name, () => fetchScene(slot));
    credits.scenes[slot.name] = meta;
    ok++;
    console.log(`OK  ${slot.name}.jpg  (${(meta.bytes / 1024).toFixed(0)} KB) — ${slot.query}`);
  } catch (err) {
    failed.push(slot.name);
    console.error(`GAGAL ${slot.name}: ${err.message}`);
  }
}

for (const slot of portraitSlots) {
  const file = join(outDir, `${slot.name}.jpg`);
  if (existsSync(file)) {
    ok++;
    console.log(`SKIP ${slot.name}.jpg (sudah ada)`);
    continue;
  }
  try {
    const meta = await withRetry(slot.name, () => fetchPortrait(slot));
    credits.portraits[slot.name] = meta;
    ok++;
    console.log(`OK  ${slot.name}.jpg  (${(meta.bytes / 1024).toFixed(0)} KB)`);
  } catch (err) {
    failed.push(slot.name);
    console.error(`GAGAL ${slot.name}: ${err.message}`);
  }
}

writeFileSync(join(outDir, "credits.json"), JSON.stringify(credits, null, 2));
console.log(`\nSelesai: ${ok} foto terunduh, ${failed.length} gagal${failed.length ? `: ${failed.join(", ")}` : ""}`);
if (existsSync(join(outDir, "hero-sekolah.png"))) {
  console.log("Hero tetap menggunakan foto sekolah milik pengguna (hero-sekolah.png).");
}
