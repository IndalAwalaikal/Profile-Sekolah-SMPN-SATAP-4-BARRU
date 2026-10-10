import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section-heading";
import { tenagaPendidik } from "@/data/tenaga-pendidik";

export const metadata: Metadata = {
  title: "Pendidik dan Tenaga Kependidikan",
  description: "Daftar guru dan tenaga kependidikan UPTD SMPN SATAP 4 BARRU.",
};

export default function GuruDanStafPage() {
  return (
    <>
      <PageHeader
        title="Pendidik & Tenaga Kependidikan"
        description="Data guru dan tenaga kependidikan UPTD SMPN SATAP 4 BARRU."
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "/profil" },
          { label: "Pendidik dan Tenaga Kependidikan" },
        ]}
      />
      <Section>
        <div className="space-y-12">
          {[
            { title: "Guru", description: "Pendidik yang mendampingi pembelajaran dan pengembangan potensi peserta didik.", members: tenagaPendidik.filter((person) => person.no <= 12) },
            { title: "Tenaga Kependidikan", description: "Staf yang mendukung layanan administrasi dan operasional sekolah.", members: tenagaPendidik.filter((person) => person.no > 12) },
          ].map((group) => (
            <section key={group.title} aria-labelledby={group.title === "Guru" ? "guru" : "tenaga-kependidikan"}>
              <div className="mb-6 max-w-2xl">
                <h2 id={group.title === "Guru" ? "guru" : "tenaga-kependidikan"} className="text-2xl font-extrabold tracking-tight text-heading">{group.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{group.description}</p>
              </div>
              <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {group.members.map((person) => (
                  <li key={person.no}>
                    <article className="content-card h-full p-5 transition-shadow hover:shadow-lg hover:shadow-brand-950/5">
                      <div className="flex items-start gap-4">
                        <div aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tint text-base font-extrabold text-accent">
                          {person.nama.trim().charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold leading-snug text-heading">{person.nama}</h3>
                          <p className="mt-1 text-sm font-semibold text-accent">{person.jabatan}</p>
                        </div>
                      </div>
                      <p className="mt-3 rounded-xl bg-tint px-3 py-2 text-sm leading-6 text-body">
                        {person.bidang}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
