import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { VisitorCounter } from "@/components/ui/visitor-counter";

/** Footer navy empat kolom dengan kontak, tautan cepat, dan statistik pengunjung. */
export function Footer() {
  return (
    <footer className="relative mt-auto bg-brand-950 text-brand-100">
      <div className="pattern-dots absolute inset-0 opacity-30" aria-hidden="true" />
      <Container className="relative py-14 sm:py-20">
        <div className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-brand-200">
              {siteConfig.legalName}, sekolah satu atap di Dusun Banga-banga, Desa Anabanua, Kecamatan Barru.
              {siteConfig.tagline}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {siteConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-brand-100 transition-colors hover:bg-gold-500 hover:text-brand-950"
                >
                  <Icon name={social.icon as "facebook"} size={17} />
                </a>
              ))}
            </div>
          </div>

          {(
            [
              ["Profil", footerNav.profil],
              ["Akademik", footerNav.akademik],
              ["Informasi", footerNav.informasi],
            ] as const
          ).map(([title, links]) => (
            <nav key={title} className="sm:col-span-1 lg:col-span-2" aria-label={`Tautan ${title}`}>
              <h3 className="text-[13px] font-bold uppercase tracking-[0.18em] text-gold-400">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-brand-200 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-[13px] font-bold uppercase tracking-[0.18em] text-gold-400">
              Kontak
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-200">
              <li className="flex gap-2.5">
                <Icon name="map-pin" size={16} className="mt-0.5 shrink-0 text-brand-400" />
                <span>{siteConfig.address}</span>
              </li>
              {siteConfig.phone ? (
                <li className="flex gap-2.5">
                  <Icon name="phone" size={16} className="mt-0.5 shrink-0 text-brand-400" />
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                    {siteConfig.phone}
                  </a>
                </li>
              ) : null}
              <li className="flex gap-2.5">
                <Icon name="mail" size={16} className="mt-0.5 shrink-0 text-brand-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[13px] text-brand-300 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. NPSN {siteConfig.npsn}.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <VisitorCounter />
            <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
            <p className="flex items-center gap-1.5">
              <Icon name="star" size={13} className="text-gold-400" />
              Unggul Berprestasi dan Berakhlak Mulia
            </p>
          </div>
        </div>

        {/* Identitas pengembang website */}
        <div className="mt-5 border-t border-white/5 pt-5 text-center">
          <p className="text-xs leading-relaxed text-brand-300">
            Website ini dikembangkan oleh
          </p>
          <p className="mt-1 text-sm font-extrabold tracking-wide text-gold-400">
            Lentera Anabanua
          </p>
          <p className="mt-1 text-xs leading-relaxed text-brand-300">
            Tim Kuliah Kerja Nyata dan Praktik Pengalaman Lapangan UNM Angkatan XXXIII
            <span className="block">Desa Anabanua</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
