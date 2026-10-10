import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon, type IconName } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Unduhan",
  description: "Temukan dokumen publik UPTD SMPN SATAP 4 BARRU berdasarkan kategori.",
};

const categories: { title: string; description: string; icon: IconName }[] = [
  { title: "PPDB & Layanan", description: "Informasi penerimaan dan layanan sekolah.", icon: "graduation-cap" },
  { title: "Kurikulum & Pembelajaran", description: "Dokumen kurikulum dan informasi pembelajaran.", icon: "book-open" },
  { title: "Profil & Administrasi", description: "Profil dan dokumen publik sekolah.", icon: "building" },
];

export default function UnduhanPage() {
  return (
    <>
      <PageHeader
        title="Unduhan"
        description="Jelajahi dokumen publik sekolah berdasarkan kategori. Dokumen ditampilkan setelah diverifikasi untuk dibagikan."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Unduhan" }]}
      />
      <Section>
        <SectionHeading
          eyebrow="Pusat Dokumen"
          title="Dokumen Sekolah"
          description="Pilih kategori untuk menemukan berkas yang Anda perlukan."
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <li key={category.title}>
              <section className="content-card h-full p-5 sm:p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-tint text-accent">
                  <Icon name={category.icon} size={22} />
                </span>
                <h2 className="mt-4 text-lg font-extrabold text-heading">{category.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{category.description}</p>
                <p className="mt-5 rounded-xl bg-tint px-4 py-3 text-sm leading-6 text-body">
                  Belum ada dokumen yang tersedia di kategori ini.
                </p>
              </section>
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-2xl border border-line bg-tint p-5 text-center sm:p-7">
          <h2 className="text-lg font-extrabold text-heading">Mencari dokumen tertentu?</h2>
          <p className="mt-2 text-sm leading-6 text-muted">Hubungi sekolah untuk menanyakan ketersediaan dokumen publik.</p>
          <div className="mt-5 flex justify-center">
            <ButtonLink href="/kontak" withArrow>Hubungi Sekolah</ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
