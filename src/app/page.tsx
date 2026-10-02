import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { StatsBand } from "@/components/home/stats-band";
import { CurriculumPreview } from "@/components/home/curriculum-preview";
import { NewsSection } from "@/components/home/news-section";
import { EkskulSection } from "@/components/home/ekskul-section";
import { AgendaPreview } from "@/components/home/agenda-preview";
import { GallerySection } from "@/components/home/gallery-section";
import { PPDBBanner } from "@/components/home/ppdb-banner";

export const metadata: Metadata = {
  title: "Beranda",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <CurriculumPreview />
      <NewsSection />
      <EkskulSection />
      <AgendaPreview />
      <GallerySection />
      <PPDBBanner />
    </>
  );
}
