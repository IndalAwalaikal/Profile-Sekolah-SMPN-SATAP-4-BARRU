import Link from "next/link";
import { news } from "@/data/news";
import { agendaItems } from "@/data/agenda";
import { Icon } from "@/components/ui/icon";
import { formatDateShort } from "@/lib/utils";

interface Announcement {
  label: string;
  href: string;
  isNew: boolean;
}

const NEW_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/** Susun pengumuman otomatis dari berita terbaru + agenda yang akan datang. */
function buildAnnouncements(): Announcement[] {
  const now = Date.now();
  const items: Announcement[] = [];

  for (const article of news.slice(0, 3)) {
    const published = new Date(article.date).getTime();
    items.push({
      label: article.title,
      href: `/berita/${article.slug}`,
      isNew: now - published < NEW_WINDOW_MS,
    });
  }

  for (const item of agendaItems) {
    if (items.length >= 6) break;
    if (new Date(item.date).getTime() < now) continue;
    items.push({
      label: `${item.title} — ${formatDateShort(item.date)}`,
      href: "/agenda",
      isNew: false,
    });
  }

  return items;
}

const announcements = buildAnnouncements();

/** Running text pengumuman di bawah header — terisi otomatis dari berita &
 *  agenda terbaru, dengan badge "BARU" untuk berita < 7 hari. */
export function RunningText() {
  const items = [...announcements, ...announcements];
  return (
    <div className="border-b border-line bg-tint">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="flex shrink-0 items-center gap-2 bg-brand-600 px-4 py-2 text-[13px] font-bold text-white">
          <Icon name="star" size={14} className="text-gold-300" />
          <span className="hidden sm:inline">Pengumuman</span>
        </div>
        <div className="relative flex flex-1 items-center overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-16 px-8 whitespace-nowrap">
            {items.map((item, i) => (
              <Link
                key={`${item.href}-${i}`}
                href={item.href}
                className="flex items-center gap-2 text-[13px] font-medium text-body transition-colors hover:text-accent"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500"
                  aria-hidden="true"
                />
                {item.label}
                {item.isNew ? (
                  <span className="rounded-full bg-gold-500 px-2 py-0.5 text-[10px] font-bold tracking-wider text-brand-950 uppercase">
                    Baru
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
