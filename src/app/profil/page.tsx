import type { Metadata } from "next";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  budayaLokal,
  historyTimeline,
  kemitraanSekolah,
  profileIntro,
  schoolIdentity,
  schoolKarakteristik,
  schoolLogo,
  schoolDataYear,
  visiMisi,
} from "@/data/profile";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { Parallax } from "@/components/ui/parallax";
import { ShimmerImage } from "@/components/ui/shimmer-image";
import { Icon } from "@/components/ui/icon";
import logoSource from "../../../public/icons/logo-sekolah.png";

export const metadata: Metadata = {
  title: "Profil Sekolah",
  description:
    "Profil, Visi, Misi, Karakteristik, Keunikan Banga-banga, dan Kemitraan UPTD SMPN SATAP 4 BARRU — Dusun Banga-banga, Desa Anabanua, Kecamatan Barru.",
};

export default function ProfilPage() {
  return (
    <>
      <PageHeader
        title="Profil Sekolah"
        description="Mengenal lebih dekat UPTD SMPN SATAP 4 BARRU: visi, misi, karakteristik peserta didik, lingkungan pegunungan Banga-banga, dan kemitraan."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Profil" }]}
      />

      {/* Pengantar / Gambaran Umum */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <Parallax speed={0.08} className="absolute -left-4 -top-4 h-full w-full">
              <div
                className="h-full w-full rounded-3xl border-2 border-gold-400/60"
                aria-hidden="true"
              />
            </Parallax>
            <Parallax speed={0.14} className="relative">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-xl shadow-brand-950/10">
                <ShimmerImage
                  src={profileIntro.image}
                  alt="Lingkungan asri UPTD SMPN SATAP 4 BARRU"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </div>
          <div>
            <SectionHeading eyebrow={profileIntro.eyebrow} title={profileIntro.heading} />
            {profileIntro.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/profil/struktur-organisasi" withArrow>
                Struktur Organisasi
              </ButtonLink>
              <ButtonLink href="/profil/guru-dan-staf" variant="outline">
                Guru & Tenaga Kependidikan
              </ButtonLink>
              <ButtonLink href="/kurikulum" variant="outline">
                Kurikulum & Program
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Visi, Misi, dan Motto Sekolah */}
      <Section tint>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Visi Sekolah" title="Arah Cita-Cita Kami" />
            <blockquote className="relative mt-8 rounded-3xl bg-brand-950 p-8 text-xl font-extrabold leading-snug tracking-tight text-white shadow-xl shadow-brand-950/10">
              “{visiMisi.visi}”
              <footer className="mt-6 border-t border-white/20 pt-4 text-xs font-semibold uppercase tracking-wider text-gold-400">
                Motto: “{visiMisi.motto}”
              </footer>
            </blockquote>

          </div>

          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Misi Sekolah" title="Lima Komitmen Utama" className="lg:pl-2" />
            <ol className="mt-8 grid gap-4 lg:pl-2">
              {visiMisi.misi.map((misi, i) => (
                <li key={misi.title} className="flex gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-[15px] font-bold text-heading">{misi.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{misi.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Arsip tujuan sekolah TP 2025/2026 */}
      <Section>
        <SectionHeading
          eyebrow="Tujuan Pendidikan"
          title={`Tujuh Tujuan Sasaran Mutu TP ${schoolDataYear}`}
          description={`Ringkasan tujuan sekolah yang tercatat untuk Tahun Pelajaran ${schoolDataYear}.`}
          align="center"
        />
        <details className="group mt-8 rounded-2xl border border-line bg-surface p-5 open:p-6">
          <summary className="cursor-pointer font-bold text-heading marker:text-accent">
            Lihat 7 tujuan pendidikan
          </summary>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visiMisi.tujuan.map((tuj) => (
              <div
                key={tuj.no}
                className="rounded-2xl border border-line bg-tint/50 p-5"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-tint text-sm font-extrabold text-accent">
                  0{tuj.no}
                </span>
                <h3 className="mt-4 text-base font-bold text-heading">{tuj.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{tuj.description}</p>
              </div>
            ))}
          </div>
        </details>
      </Section>

      {/* Karakteristik & Keunikan Lingkungan Banga-banga */}
      <Section tint id="karakteristik">
        <SectionHeading
          eyebrow="Karakteristik Satuan Pendidikan"
          title="Profil Lingkungan, Siswa & Masyarakat Banga-banga"
          description="Kondisi riil yang melandasi perumusan kurikulum dan pendekatan pendidikan kami."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Kondisi Lingkungan */}
          <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-accent">
                <Icon name="sun" size={20} />
              </div>
              <h3 className="text-lg font-bold text-heading">{schoolKarakteristik.lingkungan.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {schoolKarakteristik.lingkungan.description}
            </p>
            <ul className="mt-5 space-y-2 border-t border-line pt-4">
              {schoolKarakteristik.lingkungan.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-body">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-gold-500" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Karakteristik Peserta Didik */}
          <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-accent">
                <Icon name="users" size={20} />
              </div>
              <h3 className="text-lg font-bold text-heading">{schoolKarakteristik.pesertaDidik.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {schoolKarakteristik.pesertaDidik.description}
            </p>
            <ul className="mt-5 space-y-2 border-t border-line pt-4">
              {schoolKarakteristik.pesertaDidik.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-body">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-gold-500" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kondisi Sosial Budaya */}
          <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-accent">
                <Icon name="heart" size={20} />
              </div>
              <h3 className="text-lg font-bold text-heading">{schoolKarakteristik.sosialBudaya.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {schoolKarakteristik.sosialBudaya.description}
            </p>
            <ul className="mt-5 space-y-2 border-t border-line pt-4">
              {schoolKarakteristik.sosialBudaya.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-body">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-gold-500" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Keunikan Banga-banga */}
          <div className="rounded-3xl border border-line bg-surface p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tint text-accent">
                <Icon name="award" size={20} />
              </div>
              <h3 className="text-lg font-bold text-heading">{schoolKarakteristik.keunikanBangaBanga.title}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {schoolKarakteristik.keunikanBangaBanga.description}
            </p>
            <ul className="mt-5 space-y-2 border-t border-line pt-4">
              {schoolKarakteristik.keunikanBangaBanga.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-body">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-gold-500" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Budaya Lokal & Pelestarian Kearifan Banga-banga */}
      <Section>
        <SectionHeading
          eyebrow="Kearifan Lokal"
          title="Pelestarian Budaya Lokal & Wawasan Global"
          description="Perpaduan nilai luhur Bugis dengan pembelajaran abad ke-21."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {budayaLokal.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-line bg-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-tint text-accent">
                <Icon name={item.icon} size={20} />
              </div>
              <h3 className="mt-4 text-base font-bold text-heading">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Kemitraan Sekolah */}
      <Section tint>
        <SectionHeading
          eyebrow="Sinergi & Kemitraan"
          title="Kemitraan Strategis Satuan Pendidikan"
          description="Bersama melayani, melindungi, dan mendampingi tumbuh kembang seluruh siswa."
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {kemitraanSekolah.map((mitra) => (
            <div
              key={mitra.name}
              className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-7 shadow-sm transition-all hover:border-accent/40"
            >
              <div>
                <span className="inline-block rounded-full bg-tint px-3 py-1 text-xs font-bold text-accent">
                  {mitra.role}
                </span>
                <h3 className="mt-4 text-xl font-bold text-heading">{mitra.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{mitra.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Identitas Resmi Sekolah */}
      <Section>
        <SectionHeading
          eyebrow="Identitas Resmi"
          title="Identitas Satuan Pendidikan"
          description="Data kelembagaan resmi UPTD SMPN SATAP 4 BARRU sesuai dokumen KSP dan Dapodik."
        />
        <details className="mt-8 rounded-2xl border border-line bg-surface p-5 open:p-6">
          <summary className="cursor-pointer font-bold text-heading marker:text-accent">
            Lihat data identitas sekolah
          </summary>
          <dl className="mt-6 grid gap-x-10 gap-y-0 overflow-hidden rounded-2xl border border-line bg-surface sm:grid-cols-2" data-reveal>
            {schoolIdentity.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  "flex flex-col gap-1 border-line px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6",
                  i % 2 === 0 ? "sm:border-r" : "",
                  i < schoolIdentity.length - (schoolIdentity.length % 2 === 0 ? 2 : 1) ? "border-b" : "border-b sm:border-b-0",
                )}
              >
                <dt className="text-[13px] font-semibold tracking-wide text-muted uppercase">{item.label}</dt>
                <dd className="text-sm font-semibold text-body sm:text-right">{item.value}</dd>
              </div>
            ))}
          </dl>
        </details>
      </Section>

      {/* Lambang Sekolah */}
      <Section tint>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal className="flex flex-col items-center">
            <Image
              src={logoSource}
              alt={schoolLogo.alt}
              priority
              className="h-auto w-auto max-w-full"
              style={{ height: 400, width: "auto" }}
            />
            <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.18em] text-muted">
              Lambang Resmi UPTD SMPN SATAP 4 BARRU
            </p>
          </div>
          <div>
            <SectionHeading
              eyebrow={schoolLogo.eyebrow}
              title={schoolLogo.heading}
            />
            {schoolLogo.description.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base">
                {p}
              </p>
            ))}
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {schoolLogo.elements.map((el) => (
                <li
                  key={el.title}
                  className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/50"
                >
                  <h3 className="flex items-center gap-2 text-[15px] font-bold text-heading">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                    {el.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{el.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Linimasa Sejarah */}
      <Section>
        <SectionHeading
          eyebrow="Sejarah Singkat"
          title="Perjalanan Penyelenggaraan Pendidikan"
          description="Dari awal pendirian hingga penetapan kurikulum merdeka terkini."
          align="center"
        />
        <ol className="relative mx-auto mt-14 max-w-3xl">
          <span
            className="absolute bottom-2 left-[21px] top-2 w-px bg-line"
            aria-hidden="true"
          />
          {historyTimeline.map((entry, i) => (
            <li
              key={entry.year}
              data-reveal
              style={{ "--reveal-order": i } as React.CSSProperties}
              className="relative mb-6 flex gap-5 last:mb-0"
            >
              <span
                className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold-400 bg-surface text-[10px] font-extrabold text-accent"
                aria-hidden="true"
              >
                {entry.year}
              </span>
              <div className="flex-1 rounded-2xl border border-line bg-surface p-5 shadow-sm transition-colors hover:border-accent/40">
                <h3 className="text-base font-bold text-heading">{entry.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {entry.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
