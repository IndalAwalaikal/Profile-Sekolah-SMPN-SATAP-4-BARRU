import sharp from "sharp";
import { mkdir } from "node:fs/promises";

// Ikon PWA: layar pinisi emas + putih di atas latar navy membulat.
const svg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="#0b1e3d"/>
  <circle cx="256" cy="256" r="196" fill="#123367"/>
  <g transform="translate(148,176) scale(2.45)">
    <path d="M34 6 6 48h28z" fill="#E39C30"/>
    <path d="M42 2v46h40z" fill="#ffffff"/>
    <path d="M2 50c14 5 70 5 84 0l-6 5H8z" fill="#ffffff" opacity="0.5"/>
  </g>
</svg>`;

await mkdir("public/icons", { recursive: true });
for (const size of [192, 512]) {
  await sharp(Buffer.from(svg(size))).png().toFile(`public/icons/icon-${size}.png`);
  console.log(`icon-${size}.png OK`);
}
