import { agendaItems } from "@/data/agenda";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Icon } from "@/components/ui/icon";

/** Pratinjau agenda kegiatan terdekat di beranda. */
export function AgendaPreview() {
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Makassar" });
  const upcoming = agendaItems
    .filter((item) => item.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Agenda"
            title="Jadwal Kegiatan Terdekat"
            description="Rangkaian kegiatan akademik dan kesiswaan yang akan berlangsung."
          />
          <ButtonLink href="/agenda" variant="outline" className="mt-8" withArrow>
            Lihat Semua Agenda
          </ButtonLink>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {upcoming.map((item, i) => {
            const date = new Date(item.date);
            return (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-order": i } as React.CSSProperties}
                className="group flex gap-4 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-brand-950/5"
              >
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-tint text-center transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <span className="text-2xl font-extrabold leading-none text-accent transition-colors group-hover:text-white">
                    {date.getDate()}
                  </span>
                  <span className="mt-1 text-[11px] font-bold uppercase text-muted transition-colors group-hover:text-brand-100">
                    {date.toLocaleDateString("id-ID", { month: "short" })}
                  </span>
                </div>
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-gold-600 dark:text-gold-400">
                    <Icon name="star" size={11} />
                    {item.category}
                  </span>
                  <h3 className="mt-1 text-[15px] font-bold leading-snug text-heading">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[13px] text-muted">
                    <span className="flex items-center gap-1">
                      <Icon name="clock" size={12} />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="map-pin" size={12} />
                      {item.location}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
          {upcoming.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-line p-6 text-sm leading-relaxed text-muted sm:col-span-2">
              Belum ada kegiatan terdekat yang dijadwalkan. Silakan cek kembali kalender agenda.
            </li>
          ) : null}
        </ul>
      </div>
    </Section>
  );
}
