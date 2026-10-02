import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] items-center overflow-hidden bg-brand-950 text-white">
      {/* dekorasi latar */}
      <div className="pattern-dots absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="absolute -top-24 right-[10%] h-96 w-96 rounded-full bg-brand-600/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 left-[5%] h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" aria-hidden="true" />

      {/* angka 404 raksasa sebagai latar */}
      <span
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[26vw] font-black leading-none tracking-tighter text-white/[0.04]"
        aria-hidden="true"
      >
        404
      </span>

      {/* garis pantai dekoratif */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 h-16 w-full text-white/[0.05] sm:h-24"
        aria-hidden="true"
      >
        <path
          d="M0,80 C240,120 480,120 720,90 C960,60 1200,60 1440,90 L1440,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm animate-float">
          <Icon name="graduation-cap" size={40} className="text-gold-400" />
        </div>

        <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-white ring-1 ring-white/20">
          <Icon name="search" size={13} />
          Error 404 — Halaman Tidak Ditemukan
        </p>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
          Halaman Terapung{" "}
          <span className="relative inline-block text-gold-400">
            Lain Arah
            <svg
              viewBox="0 0 200 12"
              className="absolute -bottom-2 left-0 w-full text-gold-500/70"
              aria-hidden="true"
            >
              <path d="M3 9c55-6 135-6 194-2" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-100/85">
          Seperti perahu yang kehilangan arah, halaman yang Anda cari tidak
          tersedia atau telah dipindahkan. Mari kembali ke pelabuhan utama.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="gold" size="lg" withArrow>
            Kembali ke Beranda
          </ButtonLink>
          <ButtonLink href="/berita" variant="inverse" size="lg">
            Lihat Berita Terbaru
          </ButtonLink>
        </div>

        <nav
          aria-label="Tautan cepat"
          className="mt-12 flex flex-wrap justify-center gap-x-2 gap-y-3 text-sm font-semibold text-brand-200"
        >
          {[
            { href: "/profil", label: "Profil" },
            { href: "/ppdb", label: "PPDB" },
            { href: "/agenda", label: "Agenda" },
            { href: "/galeri", label: "Galeri" },
            { href: "/kontak", label: "Kontak" },
          ].map((link, i) => (
            <span key={link.href} className="flex items-center gap-2">
              {i > 0 ? <span className="text-white/25" aria-hidden="true">·</span> : null}
              <Link href={link.href} className="transition-colors hover:text-gold-400">
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
