import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Unduhan",
  description: "Informasi ketersediaan dokumen publik UPTD SMPN SATAP 4 BARRU.",
};

export default function UnduhanPage() {
  return (
    <>
      <PageHeader
        title="Unduhan"
        description="Dokumen publik sekolah akan tersedia di halaman ini setelah diverifikasi."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Unduhan" }]}
      />
      <Section>
        <SectionHeading
          eyebrow="Pusat Dokumen"
          title="Belum ada dokumen publik"
          description="Untuk meminta informasi atau dokumen sekolah, silakan hubungi pihak sekolah."
          align="center"
        />
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/kontak" withArrow>
            Hubungi Sekolah
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
