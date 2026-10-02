"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { mainNav, siteConfig } from "@/lib/site";
import { useUIStore } from "@/store/ui-store";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/layout/theme-toggle";

/** Panel menu mobile (drawer kanan) dengan accordion sub-menu. */
export function MobileMenu() {
  const isOpen = useUIStore((s) => s.isMobileMenuOpen);
  const closeMobileMenu = useUIStore((s) => s.closeMobileMenu);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("button, a[href], summary")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>("a[href], button:not(:disabled), summary")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [isOpen, closeMobileMenu]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Menu navigasi">
      <button
        type="button"
        aria-label="Tutup menu"
        onClick={closeMobileMenu}
        className="absolute inset-0 bg-brand-950/60 backdrop-blur-sm animate-fade-in"
      />
      <div ref={panelRef} className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-surface shadow-2xl animate-scale-in">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo compact />
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Tutup menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-body hover:bg-tint"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Menu mobile">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-3 text-[15px] font-bold text-heading transition-colors hover:bg-tint">
                      {item.label}
                      <Icon
                        name="chevron-down"
                        size={16}
                        className="text-muted transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <ul className="ml-3 border-l border-line pl-3">
                      {item.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={child.href}
                            onClick={closeMobileMenu}
                            className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-body transition-colors hover:bg-tint hover:text-accent"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block rounded-xl px-3 py-3 text-[15px] font-bold text-heading transition-colors hover:bg-tint"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line p-5">
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-line px-4 py-2.5">
            <span className="text-sm font-bold text-heading">Mode Gelap</span>
            <ThemeToggle />
          </div>
          <Link
            href="/ppdb"
            onClick={closeMobileMenu}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-5 py-3 text-sm font-bold text-brand-950 hover:bg-gold-400"
          >
            PPDB {siteConfig.academicYear}
            <Icon name="arrow-right" size={15} />
          </Link>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link
              href="/kontak"
              onClick={closeMobileMenu}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-3 text-sm font-bold text-heading hover:bg-tint"
            >
              <Icon name="mail" size={15} /> Kontak
            </Link>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-3 text-sm font-bold text-heading hover:bg-tint"
            >
              <Icon name="map-pin" size={15} /> Petunjuk arah
            </a>
          </div>
          <p className="mt-4 text-center text-[13px] text-muted">
            {siteConfig.email}
          </p>
        </div>
      </div>
    </div>
  );
}
