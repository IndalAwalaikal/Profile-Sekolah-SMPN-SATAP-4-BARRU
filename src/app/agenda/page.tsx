import type { Metadata } from "next";
import { AgendaCalendar } from "@/components/agenda/agenda-calendar";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Agenda Kegiatan",
  description:
    "Kalender akademik interaktif SMP Negeri Satu Atap 4 Barru — kegiatan akademik, kesiswaan, P5, dan prestasi sepanjang tahun ajaran.",
};

export default function AgendaPage() {
  // Gunakan zona waktu sekolah agar tanggal tidak bergeser karena UTC.
  const todayIso = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Makassar",
  }).format(new Date());

  return (
    <>
      <PageHeader
        title="Kalender Akademik"
        description="Jelajahi jadwal kegiatan akademik, kesiswaan, dan prestasi per bulan — klik tanggal untuk melihat detail kegiatannya."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Agenda" }]}
      />
      <Section>
        <AgendaCalendar todayIso={todayIso} />
      </Section>
    </>
  );
}
