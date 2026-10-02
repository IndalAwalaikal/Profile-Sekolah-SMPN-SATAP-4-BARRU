import type { Metadata } from "next";
import { achievements, achievementLevels } from "@/data/prestasi";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ProgressRing } from "@/components/ui/progress-ring";
import { PrestasiDirectory } from "@/components/prestasi/prestasi-directory";

export const metadata: Metadata = {
  title: "Prestasi",
  description:
    "Capaian siswa dan sekolah SMP Negeri Satu Atap 4 Barru di tingkat kecamatan hingga provinsi.",
};

export default function PrestasiPage() {
  // Cincin progres dihitung dari data: sebaran prestasi per tingkat.
  const levelCounts = achievementLevels
    .filter((level) => level !== "Semua")
    .map((level) => ({
      level,
      count: achievements.filter((a) => a.level === level).length,
    }));
  const maxCount = Math.max(...levelCounts.map((c) => c.count), 1);

  return (
    <>
      <PageHeader
        title="Prestasi Siswa"
        description="Capaian membanggakan siswa dan sekolah di berbagai bidang dan tingkat kejuaraan. Saring berdasarkan tingkat kejuaraan."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Prestasi" }]}
      />
      <Section>
        <SectionHeading
          eyebrow="Rekam Jejak"
          title="Bukti Pembinaan yang Berkelanjutan"
          description="Daftar prestasi terbaru di tingkat kecamatan, kabupaten, dan provinsi."
        />
        <div
          className="mt-12 flex flex-wrap items-start justify-center gap-x-12 gap-y-8"
          data-reveal
        >
          {levelCounts.map((item) => (
            <ProgressRing
              key={item.level}
              value={Math.round((item.count / maxCount) * 100)}
              center={item.count}
              label={item.level}
              sublabel="prestasi tercatat"
              tone={item.level === "Provinsi" ? "gold" : "brand"}
            />
          ))}
        </div>
        <div className="mt-14">
          <PrestasiDirectory />
        </div>
      </Section>
    </>
  );
}
