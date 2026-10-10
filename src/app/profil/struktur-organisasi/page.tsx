import type { Metadata } from "next";
import { orgStructure } from "@/data/profile";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Struktur Organisasi",
  description:
    "Bagan struktur organisasi UPTD SMPN SATAP 4 BARRU, dari komite dan kepala sekolah hingga peserta didik.",
};

type OrganizationNode = { name: string; role: string };

function NodeCard({ name, role, featured = false }: OrganizationNode & { featured?: boolean }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-sky-900/30 bg-white text-center shadow-sm dark:border-sky-200/30 dark:bg-slate-950">
      <p
        className={`flex min-h-12 items-center justify-center px-4 py-3 text-sm font-extrabold tracking-wide text-white ${
          featured ? "bg-[#123d57]" : "bg-[#185873]"
        }`}
      >
        {name}
      </p>
      <p className="flex min-h-14 flex-1 items-center justify-center border-t border-sky-900/25 bg-sky-50 px-3 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] leading-4 text-[#123d57] dark:border-sky-200/30 dark:bg-slate-900 dark:text-sky-100">
        {role}
      </p>
    </div>
  );
}

function Connector({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`w-px bg-sky-900/50 dark:bg-sky-100/50 ${className}`} />;
}

function Branch({ title, members }: { title: string; members: readonly OrganizationNode[] }) {
  return (
    <section className="rounded-3xl border border-line bg-surface p-5 shadow-sm sm:p-7">
      <h3 className="mx-auto w-fit rounded-full border-2 border-[#185873] px-6 py-2 text-center text-xs font-extrabold uppercase tracking-[0.18em] text-[#123d57] dark:border-sky-300 dark:text-sky-100">
        {title}
      </h3>
      <div aria-hidden="true" className="mx-auto h-5 w-px bg-sky-900/50 dark:bg-sky-100/50" />
      <ul className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <li key={`${member.name}-${member.role}`} className="w-full">
            <NodeCard {...member} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function StrukturOrganisasiPage() {
  return (
    <>
      <PageHeader
        title="Struktur Organisasi"
        description="Susunan unsur organisasi dan pelaksana pendidikan UPTD SMPN SATAP 4 BARRU."
        crumbs={[
          { label: "Beranda", href: "/" },
          { label: "Profil", href: "/profil" },
          { label: "Struktur Organisasi" },
        ]}
      />
      <Section>
        <div className="mx-auto max-w-6xl">
          <div className="grid justify-items-center gap-4 sm:grid-cols-2 sm:items-start">
            <div className="flex w-full flex-col items-center gap-2">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Mitra Sekolah</p>
              <NodeCard {...orgStructure.committee} />
            </div>
            <div className="flex w-full flex-col items-center gap-2">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Pimpinan</p>
              <NodeCard {...orgStructure.principal} featured />
            </div>
          </div>

          <div className="mx-auto flex h-10 justify-center"><Connector className="h-full" /></div>
          <div className="mx-auto flex max-w-sm flex-col items-center">
            <NodeCard {...orgStructure.administration} />
          </div>

          <div className="mx-auto flex h-10 justify-center"><Connector className="h-full" /></div>
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <Branch title={orgStructure.coordinators.title} members={orgStructure.coordinators.members} />
            <Branch title={orgStructure.unitHeads.title} members={orgStructure.unitHeads.members} />
          </div>

          <div className="mx-auto flex h-10 justify-center"><Connector className="h-full" /></div>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border-2 border-[#185873] bg-white text-center shadow-sm dark:border-sky-300 dark:bg-slate-950">
            <p className="px-4 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#123d57] dark:text-sky-100">
              {orgStructure.learningTeam}
            </p>
          </div>
          <div className="mx-auto flex h-7 justify-center"><Connector className="h-full" /></div>
          <div className="mx-auto max-w-3xl rounded-2xl bg-[#123d57] px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[0.2em] text-white shadow-sm">
            {orgStructure.students}
          </div>
        </div>
      </Section>
    </>
  );
}
