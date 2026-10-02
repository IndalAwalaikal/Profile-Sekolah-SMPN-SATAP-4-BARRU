import { Section } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { ppdbInfo } from "@/data/ppdb";

/** Banner ajakan PPDB di beranda. */
export function PPDBBanner() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl bg-brand-950 px-6 py-14 text-white sm:px-12 sm:py-16">
        <div className="pattern-dots absolute inset-0 opacity-40" aria-hidden="true" />
        <div
          className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-brand-600/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          data-reveal
          className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl">
              Informasi Penerimaan Peserta Didik Baru
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-brand-100/85">
              Periode PPDB {ppdbInfo.year} telah selesai. Hubungi sekolah untuk
              mengetahui jadwal penerimaan berikutnya.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <ButtonLink href="/ppdb" variant="gold" size="lg" withArrow>
              Info PPDB
            </ButtonLink>
            <ButtonLink href="/kontak" variant="inverse" size="lg">
              Hubungi Panitia
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
