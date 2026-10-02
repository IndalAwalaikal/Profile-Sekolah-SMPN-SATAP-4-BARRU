"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchSite } from "@/lib/search";
import { cn, truncate } from "@/lib/utils";
import type { SearchIndexEntry } from "@/types";
import { useUIStore } from "@/store/ui-store";
import { Icon } from "@/components/ui/icon";

/** Sorot kemunculan kata kunci pada teks dengan mark kuning. */
function Highlight({ text, query }: { text: string; query: string }) {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return <>{text}</>;
  const escaped = tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        tokens.includes(part.toLowerCase()) ? (
          <mark
            key={i}
            className="rounded-sm bg-gold-400/50 px-0.5 text-inherit dark:bg-gold-500/40"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const GROUP_ORDER = ["Halaman", "Berita", "Agenda"] as const;

/** Pencarian inline di header: ikon mengembang menjadi kolom input (mendorong
 *  tombol di sebelahnya). Hasil dikelompokkan per kategori dengan sorotan
 *  kata kunci, cuplikan konten, navigasi panah ↑↓ + Enter, dan Escape. */
export function SiteSearch() {
  const isOpen = useUIStore((s) => s.isSearchOpen);
  const openSearch = useUIStore((s) => s.openSearch);
  const closeSearch = useUIStore((s) => s.closeSearch);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const results = useMemo(
    () => (query.trim() ? searchSite(query, 12) : []),
    [query],
  );

  // Kelompokkan hasil per kategori (urutan tetap: Halaman, Berita, Agenda).
  const groups = useMemo(() => {
    const out: { label: string; items: SearchIndexEntry[] }[] = [];
    for (const label of GROUP_ORDER) {
      const items = results.filter((r) => r.category === label);
      if (items.length) out.push({ label, items });
    }
    return out;
  }, [results]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  // Indeks awal tiap grup dalam daftar datar (untuk highlight aktif & Enter).
  const groupStarts = useMemo(() => {
    let acc = 0;
    return groups.map((g) => {
      const start = acc;
      acc += g.items.length;
      return start;
    });
  }, [groups]);

  /** Tutup pencarian sekaligus bersihkan kata kunci. */
  const close = useCallback(() => {
    setQuery("");
    closeSearch();
  }, [closeSearch]);

  // Cmd/Ctrl+K membuka, Escape menutup.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch, close]);

  // Fokuskan input saat terbuka.
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Tutup saat klik di luar komponen.
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen, close]);

  // Jaga agar item terpilih selalu terlihat dalam dropdown.
  useEffect(() => {
    itemRefs.current[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const target = flat[active];
      if (target) {
        close();
        router.push(target.href);
      }
    }
  };

  return (
    <div ref={rootRef} className="relative flex items-center">
      {/* kapsul yang mengembang */}
      <div
        className={cn(
          "flex h-10 items-center rounded-full border transition-all duration-300 ease-out",
          isOpen
            ? "w-36 border-line bg-tint px-1 sm:w-72"
            : "w-10 justify-center border-transparent hover:bg-tint",
        )}
      >
        <button
          type="button"
          onClick={isOpen ? close : openSearch}
          aria-label={isOpen ? "Tutup pencarian" : "Cari di situs"}
          aria-expanded={isOpen}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-body transition-colors hover:text-accent"
        >
          <Icon name="search" size={18} />
        </button>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKeyDown}
          placeholder="Cari halaman atau berita…"
          aria-label="Kata kunci pencarian"
          tabIndex={isOpen ? 0 : -1}
          className={cn(
            "h-full min-w-0 bg-transparent text-sm text-heading outline-none placeholder:text-muted",
            isOpen ? "flex-1 px-2 opacity-100" : "w-0 px-0 opacity-0",
          )}
        />
        <button
          type="button"
          onClick={close}
          aria-label="Tutup pencarian"
          tabIndex={isOpen ? 0 : -1}
          className={cn(
            "flex h-8 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-surface hover:text-heading",
            isOpen ? "w-8 opacity-100" : "pointer-events-none w-0 opacity-0",
          )}
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      {/* dropdown hasil: dikelompokkan per kategori + sorotan kata kunci */}
      {isOpen ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-96 max-w-[calc(100vw-2.5rem)] animate-scale-in overflow-hidden rounded-2xl border border-line bg-surface shadow-xl shadow-brand-950/10">
          <div className="max-h-96 overflow-y-auto p-2">
            {query.trim() === "" ? (
              <p className="px-3 py-6 text-center text-sm text-muted">
                Ketik kata kunci untuk mencari halaman, berita, dan agenda
                sekolah.
              </p>
            ) : flat.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-muted">
                Tidak ditemukan hasil untuk “{query}”.
              </p>
            ) : (
              groups.map((group, gi) => (
                <div
                  key={group.label}
                  className={cn(gi > 0 && "mt-1 border-t border-line pt-1")}
                >
                  <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    {group.label}
                  </p>
                  {group.items.map((entry, i) => {
                    const index = groupStarts[gi] + i;
                    return (
                      <Link
                        key={entry.href + entry.title}
                        ref={(el) => {
                          itemRefs.current[index] = el;
                        }}
                        href={entry.href}
                        onClick={close}
                        onMouseEnter={() => setActive(index)}
                        className={cn(
                          "flex flex-col gap-0.5 rounded-xl px-3 py-2 transition-colors",
                          index === active ? "bg-tint" : "hover:bg-tint/60",
                        )}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="min-w-0 truncate text-sm font-semibold text-heading">
                            <Highlight
                              text={truncate(entry.title, 46)}
                              query={query}
                            />
                          </span>
                          <span className="shrink-0 rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] font-bold text-accent">
                            {entry.category}
                          </span>
                        </span>
                        {entry.excerpt ? (
                          <span className="line-clamp-1 text-xs text-muted">
                            <Highlight
                              text={truncate(entry.excerpt, 90)}
                              query={query}
                            />
                          </span>
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
