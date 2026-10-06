import type { Metadata } from "next";
import Image from "next/image";
import { facilities, schoolKarakteristik } from "@/data/profile";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { Icon } from "@/components/ui/icon";
import { ExploreMap } from "@/components/profile/explore-map";

export const metadata: Metadata = {
  title: "Sarana dan Prasarana",
  description:
    "Sarana dan prasarana UPTD SMPN SATAP 4 BARRU: UKS, Laboratorium Komputer, Lab IPA, Perpustakaan, Lapangan Olahraga, dan Lingkungan Alam Pegunungan Banga-banga.",
};

export default function FasilitasPage() {
  return (
    <>
      <PageHeader
        title="Sarana, Prasarana & Lingkungan"
        description="Fasilitas penunjang belajar satu atap yang memadai, didukung halaman yang luas dan keasrian alam perbukitan Desa Anabanua sebagai laboratorium alam terbuka."
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "/profil" },
          { label: "Sarana & Prasarana" },
        ]}
      />

      {/* Denah Interaktif */}
      <Section>
        <SectionHeading
          eyebrow="Tata Letak Sekolah"
          title="Denah Fasilitas UPTD SMPN SATAP 4 BARRU"
          description="Klik titik bernomor pada denah untuk melihat foto, peruntukan, dan rincian sarana prasarana."
        />
        <div className="mt-10">
          <ExploreMap />
        </div>
      </Section>

      {/* Rincian Fasilitas Sesuai KSP */}
      <Section tint>
        <SectionHeading
          eyebrow="Sarana dan Prasarana"
          title="Fasilitas Belajar, Ibadah & Pengembangan Bakat"
          description="Memfasilitasi pembelajaran berbasis teknologi, praktikum sains, kebugaran jasmani, dan karakter religius."
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <li
              key={facility.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-950/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold text-heading">{facility.name}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {facility.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-line pt-4">
                  {facility.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2 text-[13px] text-body">
                      <Icon name="chevron-right" size={13} className="mt-1 text-gold-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Keunggulan Lingkungan Pegunungan & Persawahan Banga-banga */}
      <Section>
        <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12">
          <SectionHeading
            eyebrow="Lingkungan Belajar Terbuka"
            title="Keunikan Alam Sekitar Sebagai Sumber Belajar Kontekstual"
            description="Memanfaatkan keasrian alam perbukitan dan persawahan Desa Anabanua dalam pembelajaran sains dan kepramukaan."
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schoolKarakteristik.lingkungan.points.map((pt) => (
              <div key={pt} className="flex items-start gap-3 rounded-2xl bg-tint p-4">
                <Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-sm font-medium text-body">{pt}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
