import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dmualsp81/image/upload/**",
      },
    ],
    // Placeholder SVG lokal tetap dipakai beberapa komponen; izinkan loader
    // SVG. Foto hero Cloudinary memakai transformasi CDN langsung.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Allowlist kualitas untuk gambar yang diproses oleh Next Image.
    qualities: [75, 90],
  },
};

export default nextConfig;
