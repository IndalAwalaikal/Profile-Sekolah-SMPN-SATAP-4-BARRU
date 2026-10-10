import Link from "next/link";
import { Section } from "@/components/ui/section-heading";
import { Icon, type IconName } from "@/components/ui/icon";

const links: { label: string; description: string; href: string; icon: IconName }[] = [
  { label: "Informasi PPDB", description: "Jadwal dan informasi penerimaan", href: "/ppdb", icon: "graduation-cap" },
  { label: "Agenda Kegiatan", description: "Lihat jadwal sekolah", href: "/agenda", icon: "calendar" },
  { label: "Unduhan", description: "Cari dokumen publik sekolah", href: "/unduhan", icon: "download" },
  { label: "Kontak & Lokasi", description: "Hubungi dan temukan sekolah", href: "/kontak", icon: "map-pin" },
];

export function QuickLinks() {
  return (
    <Section tint className="py-10 sm:py-14">
      <nav aria-label="Akses cepat" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="content-card group flex min-h-36 flex-col items-start gap-3 p-3 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-h-32 sm:p-4 lg:min-h-24 lg:flex-row lg:items-center lg:gap-4 lg:p-5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tint text-accent transition-colors group-hover:bg-brand-600 group-hover:text-white">
              <Icon name={link.icon} size={20} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold text-heading">{link.label}</span>
              <span className="mt-1 block text-xs leading-5 text-muted">{link.description}</span>
            </span>
          </Link>
        ))}
      </nav>
    </Section>
  );
}
