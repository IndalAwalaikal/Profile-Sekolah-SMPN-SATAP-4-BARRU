import type { Metadata } from "next";
import { ppdbInfo } from "@/data/ppdb";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: `PPDB ${ppdbInfo.year}`,
  description:
    "Informasi penerimaan peserta didik baru UPTD SMPN SATAP 4 BARRU. Hubungi sekolah untuk jadwal dan persyaratan terbaru.",
};

export default function PPDBPage() {
  return (
    <>
      <PageHeader
        title={`PPDB Tahun Ajaran ${ppdbInfo.year}`}
        description={`Periode pendaftaran ${ppdbInfo.registrationPeriod} telah selesai. Hubungi sekolah untuk informasi penerimaan terbaru.`}
        crumbs={[{ label: "Beranda", href: "/" }, { label: "PPDB" }]}
      />
      <Section>
        <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-surface p-8 text-center shadow-sm sm:p-10">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-tint text-accent">
            <Icon name="calendar" size={24} />
          </span>
          <p className="mt-5 text-sm font-bold uppercase tracking-wider text-accent">
            Periode telah selesai
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-heading">
            Cari tahu jadwal penerimaan berikutnya
          </h2>
          <p className="mt-3 leading-relaxed text-muted">
            Jadwal, kuota, persyaratan, dan biaya dapat berubah setiap tahun. Silakan
            hubungi pihak sekolah untuk mendapatkan informasi resmi terbaru.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/kontak" withArrow>
              Hubungi Sekolah
            </ButtonLink>
            <ButtonLink href="/" variant="outline">
              Kembali ke Beranda
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
