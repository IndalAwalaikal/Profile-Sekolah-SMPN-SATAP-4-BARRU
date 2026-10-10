import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { StatsBand } from "@/components/home/stats-band";
import { QuickLinks } from "@/components/home/quick-links";
import { CurriculumPreview } from "@/components/home/curriculum-preview";
import { NewsSection } from "@/components/home/news-section";
import { EkskulSection } from "@/components/home/ekskul-section";
import { AgendaPreview } from "@/components/home/agenda-preview";
import { GallerySection } from "@/components/home/gallery-section";
import { PPDBBanner } from "@/components/home/ppdb-banner";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Situs resmi SMPN Satap 4 Barru di Anabanua, Kabupaten Barru. Kenali profil sekolah, kurikulum, prestasi, kegiatan, berita, dan informasi penerimaan murid baru.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <QuickLinks />
      <CurriculumPreview />
      <NewsSection />
      <EkskulSection />
      <AgendaPreview />
      <GallerySection />
      <PPDBBanner />
    </>
  );
}
