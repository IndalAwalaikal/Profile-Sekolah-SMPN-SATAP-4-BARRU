import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { kemitraanSekolah } from "@/data/profile";
import { PageHeader } from "@/components/ui/page-header";
import { Section, SectionHeading } from "@/components/ui/section-heading";
import { SchoolMap } from "@/components/kontak/school-map";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Kontak & Kemitraan",
  description:
    "Alamat, email, peta lokasi Banga-banga, dan informasi kemitraan UPTD SMPN SATAP 4 BARRU, Desa Anabanua, Kecamatan Barru.",
};

const contactItems = [
  { icon: "map-pin" as const, label: "Alamat Sekolah", value: siteConfig.address },
  ...(siteConfig.phone
    ? [{ icon: "phone" as const, label: "Telepon / WhatsApp", value: siteConfig.phone, href: `tel:${siteConfig.phone}` }]
    : []),
  { icon: "mail" as const, label: "Email Resmi", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: "clock" as const, label: "Jam Layanan", value: siteConfig.officeHours },
];

export default function KontakPage() {
  return (
    <>
      <PageHeader
        title="Kontak, Lokasi & Kemitraan"
        description="Hubungi UPTD SMPN SATAP 4 BARRU untuk informasi kurikulum, kemitraan lembaga, PPDB, atau kunjungan ke sekolah kami di Dusun Banga-banga."
        crumbs={[{ label: "Beranda", href: "/" }, { label: "Kontak & Kemitraan" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Informasi Kontak"
              title="Layanan Informasi Resmi"
              description="Pihak sekolah siap melayani konsultasi akademik, orang tua murid, dan pemangku kepentingan."
            />
            <ul className="mt-8 space-y-4">
              {contactItems.map((item) => (
                <li
                  key={item.label}
                  className="flex gap-4 rounded-2xl border border-line bg-surface p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint text-accent">
                    <Icon name={item.icon} size={19} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block break-words text-[15px] font-semibold text-heading transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15px] font-semibold text-heading">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-950 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
                >
                  <Icon name={social.icon as "facebook"} size={15} />
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full min-h-[420px] overflow-hidden rounded-3xl border border-line shadow-lg shadow-brand-950/5">
              <SchoolMap
                lat={-4.2672}
                lng={119.6436}
                name={siteConfig.legalName}
                address="Banga-banga, Desa Anabanua, Kec. Barru, Kab. Barru"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted">
                Sekolah berada di Dusun Banga-banga, Desa Anabanua, Kecamatan Barru, suasana pegunungan yang asri dan tenang.
              </p>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-950 px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-brand-800"
              >
                <Icon name="map-pin" size={14} />
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Kemitraan Sekolah */}
      <Section tint>
        <SectionHeading
          eyebrow="Kolaborasi"
          title="Kemitraan Lembaga & Masyarakat"
          description="Sinergi nyata untuk mendukung layanan kesehatan, tata kelola desa, dan mutu pendidikan sekolah."
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
    </>
  );
}
