import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { programUnggulan } from "@/data/profile";

export function CurriculumPreview() {
  return (
    <Section tint>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Kurikulum & Pembelajaran"
            title="Kurikulum Merdeka Berbasis Karakter & Teknologi"
            description="Disesuaikan dengan potensi alam pegunungan dan kearifan masyarakat Dusun Banga-banga Desa Anabanua."
          />
          <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
            UPTD SMPN SATAP 4 BARRU menyelenggarakan Kurikulum Merdeka Fase D (Kelas 7, 8, dan 9)
            yang mengedepankan pembelajaran berdiferensiasi, laboratorium komputer, kepramukaan wajib,
            serta pembiasaan religius Baca Tulis Al-Qur&apos;an (BTQ) dan shalat berjamaah.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/kurikulum" withArrow>
              Selengkapnya di Halaman Kurikulum
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {programUnggulan.slice(0, 3).map((prog) => (
              <div
                key={prog.no}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-extrabold text-gold-500">
                      {prog.no}
                    </span>
                    <span className="rounded-full bg-tint px-2 py-0.5 text-[10px] font-bold text-accent">
                      {prog.category}
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-[15px] font-bold text-heading">
                    {prog.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted line-clamp-3">
                    {prog.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
