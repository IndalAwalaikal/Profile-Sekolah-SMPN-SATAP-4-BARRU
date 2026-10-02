import type { Metadata } from "next";
import { TeacherDirectory } from "@/components/profile/teacher-directory";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section-heading";
import { schoolDataYear } from "@/data/profile";

export const metadata: Metadata = {
  title: "Pendidik dan Tenaga Kependidikan",
  description:
    "Profil pendidik dan tenaga kependidikan UPTD SMPN SATAP 4 BARRU berdasarkan data yang tersedia.",
};

export default function GuruDanStafPage() {
  return (
    <>
      <PageHeader
        title="Pendidik & Tenaga Kependidikan"
        description={`Profil berikut mengikuti data Tahun Pelajaran ${schoolDataYear}. Hubungi sekolah untuk memastikan informasi dan susunan tahun berjalan.`}
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "/profil" },
          { label: "Pendidik dan Tenaga Kependidikan" },
        ]}
      />
      <Section>
        <TeacherDirectory />
      </Section>
    </>
  );
}
