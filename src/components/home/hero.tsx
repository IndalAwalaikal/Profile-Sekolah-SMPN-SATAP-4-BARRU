import { RunningText } from "@/components/layout/running-text";
import { HeroCarousel, type HeroSlide } from "@/components/home/hero-carousel";

const heroSlides: HeroSlide[] = [
  {
    src: "https://res.cloudinary.com/dmualsp81/image/upload/v1790949962/907100ca-63d7-4076-9287-b49f55aef2ff.png",
    eyebrow: "Website Resmi UPTD SMPN SATAP 4 BARRU",
    title: "Membentuk Peserta Didik",
    highlight: "Berkarakter",
    titleAfter: "& Unggul",
    description: `Terwujudnya Peserta Didik yang berkarakter; Unggul dalam imtaq dan iptek, kreatif, mandiri dan berwawasan global di lingkungan pegunungan asri Dusun Banga-banga, Desa Anabanua, Barru.`,
    primaryCta: { label: "Jelajahi Kurikulum", href: "/kurikulum" },
    secondaryCta: { label: "Profil Sekolah", href: "/profil" },
  },
  {
    src: "https://res.cloudinary.com/dmualsp81/image/upload/v1790949844/0e5ad297-978f-4998-a026-29b0a1c5bb2c.png",
    eyebrow: "Kurikulum Merdeka Fase D",
    title: "Pembelajaran Berbasis",
    highlight: "Teknologi & Projek",
    titleAfter: "Bermakna",
    description:
      "Mengintegrasikan pembelajaran berdiferensiasi, laboratorium komputer, kepramukaan wajib, dan Projek Penguatan Profil Pelajar Pancasila (P5) berbasis kearifan lokal Bugis.",
    primaryCta: { label: "Program Unggulan", href: "/kurikulum#program-unggulan" },
    secondaryCta: { label: "Ekstrakurikuler", href: "/ekstrakurikuler" },
  },
  {
    src: "https://res.cloudinary.com/dmualsp81/image/upload/v1790949942/6c9a43ef-4ac8-4df0-8a8a-f705d2bcc851.png",
    eyebrow: "Motto: Unggul Berprestasi dan Berakhlak Mulia",
    title: "Pendidikan Berkualitas",
    highlight: "Satu Atap",
    titleAfter: "di Desa Anabanua",
    description:
      "Dikelilingi keasrian alam perbukitan dan persawahan yang damai, dengan pembiasaan keagamaan intensif seperti Baca Tulis Al-Qur'an (BTQ) dan shalat berjamaah.",
    primaryCta: { label: "Sarana & Lingkungan", href: "/profil/fasilitas" },
    secondaryCta: { label: "Kontak & Lokasi", href: "/kontak" },
  },
];

/** Hero beranda: carousel foto + teks/CTA per slide, CTA utama, dan badge info. */
export function Hero() {
  return (
    <section>
      <RunningText />
      <div className="relative overflow-hidden bg-brand-950 shadow-[0_2px_0_0_var(--surface)]">
        <HeroCarousel slides={heroSlides} />
      </div>
    </section>
  );
}
