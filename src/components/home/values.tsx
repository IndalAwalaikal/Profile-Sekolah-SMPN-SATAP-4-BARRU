import { schoolValues, visiMisi } from "@/data/profile";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon, type IconName } from "@/components/ui/icon";

const valueIcons: IconName[] = ["users", "trophy", "book-open"];

/** Seksi nilai sekolah + ringkasan visi & misi. */
export function Values() {
  return (
    <Section className="pt-20">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Nilai Kami"
            title="Tiga Pilar Karakter yang Dibina Setiap Hari"
            description="Ketiga pilar ini menjadi dasar seluruh program pembelajaran dan pembiasaan sekolah — dari ruang kelas hingga lingkungan pegunungan Banga-banga."
          />
          <ul className="mt-10 space-y-5">
            {schoolValues.map((value, i) => (
              <li
                key={value.title}
                data-reveal
                style={{ "--reveal-order": i } as React.CSSProperties}
                className="group flex gap-5 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-brand-950/5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-tint text-accent transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={valueIcons[i]} size={22} />
                </span>
                <div>
                  <h3 className="text-base font-bold text-heading">{value.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-brand-950 p-8 text-white sm:p-10 lg:mt-14">
          <div className="pattern-dots absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow text-gold-400">Visi Sekolah</p>
            <blockquote className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-balance sm:text-3xl">
              “{visiMisi.visi}”
            </blockquote>
            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand-300">
                Motto: “{visiMisi.motto}”
              </p>
              <ul className="mt-4 space-y-3">
                {visiMisi.misi.slice(0, 3).map((misi, i) => (
                  <li key={misi.title} className="flex gap-3 text-[14px] leading-relaxed text-brand-100">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-extrabold text-brand-950">
                      {i + 1}
                    </span>
                    <div>
                      <strong className="text-white">{misi.title}:</strong> {misi.description}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/profil" variant="inverse" size="sm" withArrow>
                  Visi dan Misi Lengkap
                </ButtonLink>
                <ButtonLink href="/kurikulum" variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Kurikulum & Program
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
