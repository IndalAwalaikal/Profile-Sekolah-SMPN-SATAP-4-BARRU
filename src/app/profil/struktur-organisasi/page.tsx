import type { Metadata } from "next";
import Image from "next/image";
import { orgStructure, schoolDataYear, teachers } from "@/data/profile";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";

export const metadata: Metadata = {
  title: "Struktur Organisasi & Tim Pengembang Kurikulum",
  description:
    "Informasi struktur organisasi UPTD SMPN SATAP 4 BARRU berdasarkan data yang tersedia.",
};

export default function StrukturOrganisasiPage() {
  const kepala = teachers.find((t) => t.group === "kepala");

  return (
    <>
      <PageHeader
        title="Struktur Organisasi & Tim Pengembang Kurikulum"
        description={`Susunan berikut berdasarkan data Tahun Pelajaran ${schoolDataYear}. Hubungi sekolah untuk memastikan susunan organisasi tahun berjalan.`}
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "/profil" },
          { label: "Struktur Organisasi" },
        ]}
      />

      <Section>
        {/* Kepala Sekolah */}
        {kepala ? (
          <div className="mx-auto mb-14 max-w-lg rounded-3xl bg-brand-950 p-8 text-center text-white shadow-xl shadow-brand-950/10">
            <Image
              src={kepala.image}
              alt={kepala.name}
              width={192}
              height={192}
              quality={90}
              className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-gold-400/80"
            />
            <h2 className="mt-4 text-2xl font-extrabold">{kepala.name}</h2>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-gold-400">
              {kepala.role}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-brand-100">
              Data jabatan mengikuti susunan organisasi Tahun Pelajaran {schoolDataYear}.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <ButtonLink href="/kontak" variant="inverse" size="sm">
                Hubungi Sekolah
              </ButtonLink>
              <ButtonLink href="/kurikulum" variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                Lihat Kurikulum
              </ButtonLink>
            </div>
          </div>
        ) : null}

        {/* Grup Organisasi */}
        <div className="grid gap-10 lg:grid-cols-2">
          {orgStructure
            .filter((group) => group.title !== "Kepala Sekolah")
            .map((group) => (
              <div key={group.title} className="rounded-3xl border border-line bg-surface p-6 shadow-sm">
                <SectionHeading eyebrow="Unsur Struktur" title={group.title} />
                <ul className="mt-6 space-y-3">
                  {group.members.map((member) => (
                    <li
                      key={member.name}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
                    >
                      <div>
                        <p className="text-[15px] font-bold text-heading">{member.name}</p>
                        <p className="mt-0.5 text-xs text-muted">{member.role}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </Section>
    </>
  );
}
