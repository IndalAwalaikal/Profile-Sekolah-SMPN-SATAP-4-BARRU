import type { Metadata } from "next";
import { ekstrakurikuler } from "@/data/ekstrakurikuler";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ExtracurricularVisual } from "@/components/extracurricular/extracurricular-visual";

export const metadata: Metadata = {
  title: "Ekstrakurikuler",
  description:
    "Kegiatan ekstrakurikuler SMP Negeri Satu Atap 4 Barru: pramuka, PMR, olahraga, seni Bugis, dan lainnya.",
};

export default function EkstrakurikulerPage() {
  return (
    <>
      <PageHeader
        title="Ekstrakurikuler"
        description="Sembilan pembinaan minat dan bakat untuk menyalurkan energi serta potensi siswa."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Ekstrakurikuler" }]}
      />
      <Section>
        <SectionHeading
          eyebrow="Minat dan Bakat"
          title="Pembinaan di Luar Jam Pelajaran"
          description="Setiap siswa wajib mengikuti minimal satu ekstrakurikuler; pembinaan dipandu guru pembina dan pelatih mitra."
        />
        <div
          className="mt-12 flex flex-wrap items-start justify-center gap-x-12 gap-y-8"
          data-reveal
        >
          <ProgressRing
            value={100}
            center={String(ekstrakurikuler.length)}
            label="Ekskul Aktif"
            sublabel="wajib minimal satu"
          />
          <ProgressRing
            value={85}
            center="85%"
            label="Partisipasi Siswa"
            sublabel="terlibat rutin tiap pekan"
          />
          <ProgressRing
            value={100}
            center={`${ekstrakurikuler.length}+`}
            label="Pembina & Pelatih"
            sublabel="guru dan mitra sekolah"
            tone="gold"
          />
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ekstrakurikuler.map((item) => (
            <li
              key={item.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ExtracurricularVisual
                  item={item}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-heading">{item.name}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-muted">
                  {item.description}
                </p>
                <dl className="mt-4 space-y-2 border-t border-line pt-4 text-[13px]">
                  <div className="flex items-center gap-2 text-body">
                    <Icon name="clock" size={14} className="text-brand-500" />
                    <dt className="sr-only">Jadwal</dt>
                    <dd className="font-semibold">{item.schedule}</dd>
                  </div>
                  <div className="flex items-center gap-2 text-body">
                    <Icon name="users" size={14} className="text-brand-500" />
                    <dt className="sr-only">Pembina</dt>
                    <dd className="font-semibold">{item.coach}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
