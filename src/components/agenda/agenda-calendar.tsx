"use client";

import { useMemo, useState } from "react";
import { agendaItems } from "@/data/agenda";
import { cn, formatDate } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const categoryColors: Record<string, string> = {
  Akademik: "bg-brand-600",
  Prestasi: "bg-gold-500",
  Kegiatan: "bg-emerald-500",
  P5: "bg-rose-500",
  Kesiswaan: "bg-violet-500",
};

/** Kalender akademik interaktif: grid bulanan + filter kategori + daftar
 *  kegiatan bulan berjalan (atau per hari yang dipilih). */
export function AgendaCalendar({ todayIso }: { todayIso: string }) {
  const categories = useMemo(
    () => ["Semua", ...new Set(agendaItems.map((i) => i.category))],
    [],
  );

  const today = new Date(`${todayIso}T00:00:00`);
  const [category, setCategory] = useState("Semua");
  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      category === "Semua"
        ? agendaItems
        : agendaItems.filter((i) => i.category === category),
    [category],
  );

  const eventsByDate = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const item of filtered) {
      map.set(item.date, [...(map.get(item.date) ?? []), item]);
    }
    return map;
  }, [filtered]);

  const monthEvents = useMemo(
    () =>
      filtered
        .filter((item) => {
          const d = new Date(`${item.date}T00:00:00`);
          return d.getFullYear() === view.year && d.getMonth() === view.month;
        })
        .sort((a, b) => a.date.localeCompare(b.date)),
    [filtered, view],
  );

  const list = selectedDay
    ? monthEvents.filter(
        (item) => new Date(`${item.date}T00:00:00`).getDate() === selectedDay,
      )
    : monthEvents;

  const firstWeekday = (new Date(view.year, view.month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString(
    "id-ID",
    { month: "long", year: "numeric" },
  );

  const move = (delta: number) => {
    setSelectedDay(null);
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const resetToToday = () => {
    setView({ year: today.getFullYear(), month: today.getMonth() });
    setSelectedDay(null);
  };

  return (
    <div>
      {/* filter kategori */}
      <div role="group" aria-label="Filter kategori agenda" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => {
              setCategory(c);
              setSelectedDay(null);
            }}
            className={cn(
              "min-h-11 rounded-full px-4 py-2 text-[13px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              category === c
                ? "bg-brand-950 text-white shadow-md shadow-brand-950/20"
                : "bg-tint text-accent hover:bg-line",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* kalender bulanan */}
      <div
        className="mt-6 overflow-hidden rounded-3xl border border-line bg-surface"
        data-reveal
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-6">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Bulan sebelumnya"
              className="flex h-9 w-9 items-center justify-center rounded-full text-body transition-colors hover:bg-tint hover:text-accent"
            >
              <Icon name="chevron-left" size={18} />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Bulan berikutnya"
              className="flex h-9 w-9 items-center justify-center rounded-full text-body transition-colors hover:bg-tint hover:text-accent"
            >
              <Icon name="chevron-right" size={18} />
            </button>
          </div>
          <p aria-live="polite" aria-atomic="true" className="text-base font-extrabold tracking-tight text-heading sm:text-lg">
            {monthLabel}
          </p>
          <button
            type="button"
            onClick={resetToToday}
            className="rounded-full bg-tint px-4 py-1.5 text-[12px] font-bold text-accent transition-colors hover:bg-line"
          >
            Hari Ini
          </button>
        </div>

        <div className="grid grid-cols-7 border-b border-line bg-tint/50 text-center">
          {WEEKDAYS.map((day) => (
            <span
              key={day}
              className="py-2.5 text-[11px] font-bold uppercase tracking-wider text-muted"
            >
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <div
              key={`pad-${i}`}
              className="min-h-[64px] border-b border-r border-line/60 bg-tint/30 sm:min-h-[84px]"
            />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const iso = `${view.year}-${String(view.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const events = eventsByDate.get(iso) ?? [];
            const isToday = iso === todayIso;
            const isSelected = selectedDay === day;
            const hasPast = new Date(`${iso}T23:59:59`) < today;
            return (
              <button
                key={day}
                type="button"
                disabled={events.length === 0}
                onClick={() => setSelectedDay(isSelected ? null : day)}
                aria-pressed={events.length > 0 ? isSelected : undefined}
                aria-label={`Tanggal ${day}${events.length ? `, ${events.length} kegiatan` : ""}`}
                className={cn(
                  "relative flex min-h-[64px] flex-col items-center gap-1 border-b border-r border-line/60 p-1.5 transition-colors disabled:cursor-default sm:min-h-[84px] sm:p-2",
                  events.length ? "cursor-pointer hover:bg-tint" : "cursor-default",
                  isSelected && "bg-brand-600 text-white",
                  !isSelected && events.length && "bg-tint/70",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-bold",
                    isSelected
                      ? "bg-white/20 text-white"
                      : isToday
                        ? "bg-brand-600 text-white"
                        : hasPast
                          ? "text-muted"
                          : "text-heading",
                  )}
                >
                  {day}
                </span>
                <span className="flex flex-wrap items-center justify-center gap-1">
                  {events.slice(0, 3).map((event) => (
                    <span
                      key={event.title}
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isSelected ? "bg-white/80" : categoryColors[event.category] ?? "bg-brand-500",
                      )}
                    />
                  ))}
                </span>
                {events.length > 0 && !isSelected ? (
                  <span className="sr-only">{events.map((e) => e.title).join(", ")}</span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* daftar kegiatan */}
      <div className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-extrabold tracking-tight text-heading">
            {selectedDay
              ? `Kegiatan ${selectedDay} ${monthLabel}`
              : `Kegiatan Bulan ${monthLabel}`}
          </h2>
          {selectedDay ? (
            <button
              type="button"
              onClick={() => setSelectedDay(null)}
              className="text-sm font-bold text-accent hover:underline"
            >
              Lihat seluruh bulan
            </button>
          ) : null}
        </div>
        {list.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-muted">
            Tidak ada kegiatan yang terjadwal pada periode ini.
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {list.map((item) => (
              <AgendaRow key={item.title} item={item} todayIso={todayIso} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function AgendaRow({
  item,
  todayIso,
}: {
  item: (typeof agendaItems)[number];
  todayIso: string;
}) {
  const date = new Date(`${item.date}T00:00:00`);
  const isPast = item.date < todayIso;
  return (
    <li
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border bg-surface p-5 transition-all hover:border-accent/50 hover:shadow-lg hover:shadow-brand-950/5 sm:flex-row sm:items-center sm:p-6",
        isPast ? "border-line opacity-75" : "border-line",
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl text-center text-white",
          isPast ? "bg-ink-700" : "bg-brand-950",
        )}
      >
        <span className="text-2xl font-extrabold leading-none">{date.getDate()}</span>
        <span className="mt-1 text-[11px] font-bold uppercase text-brand-300">
          {date.toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-gold-600 dark:text-gold-400">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              categoryColors[item.category] ?? "bg-brand-500",
            )}
            aria-hidden="true"
          />
          {item.category}
        </span>
        <h3 className="mt-1 text-base font-bold text-heading">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-semibold text-muted">
          <span className="flex items-center gap-1.5">
            <Icon name="clock" size={13} />
            {item.time}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="map-pin" size={13} />
            {item.location}
          </span>
        </p>
      </div>
      <time
        dateTime={item.date}
        className="hidden shrink-0 text-sm font-bold text-accent lg:block"
      >
        {formatDate(item.date, { weekday: "long", day: "numeric", month: "long" })}
      </time>
    </li>
  );
}
