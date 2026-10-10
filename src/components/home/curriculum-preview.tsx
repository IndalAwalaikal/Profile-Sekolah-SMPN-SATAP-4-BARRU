import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { programUnggulan, teachers } from "@/data/profile";

export function CurriculumPreview() {
  const principal = teachers.find((teacher) => teacher.group === "kepala");

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
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

          <div className="mt-7 flex flex-col gap-4">
            {programUnggulan.slice(0, 3).map((prog) => (
              <div
                key={prog.no}
                  className="group content-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-sm font-extrabold text-gold-500">{prog.no}</span>
                  <span className="rounded-full bg-tint px-2.5 py-1 text-[10px] font-bold text-accent">
                    {prog.category}
                  </span>
                </div>
                <h3 className="mt-2.5 text-[15px] font-bold text-heading">{prog.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{prog.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/kurikulum" withArrow>
              Selengkapnya di Halaman Kurikulum
            </ButtonLink>
          </div>
        </div>

        {principal ? (
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[50%] border-[6px] border-white shadow-lg ring-2 ring-brand-300 dark:border-slate-800 dark:ring-brand-500">
              <Image
                src={principal.image ?? "/nurinsyanah.png"}
                alt={`Foto ${principal.name}`}
                fill
                sizes="(max-width: 768px) 420px, 460px"
                className="object-cover object-top"
              />
            </div>
            <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
              Kepala Sekolah
            </p>
            <h3 className="mt-1.5 text-base font-extrabold leading-snug text-heading">
              {principal.name}
            </h3>
            <p className="mt-1 text-xs font-semibold leading-relaxed text-muted">
              {principal.role}
            </p>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
