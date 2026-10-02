"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, siteConfig, type NavGroup } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SiteSearch } from "@/components/layout/site-search";

/** Apakah item nav aktif untuk pathname saat ini (termasuk halaman anaknya). */
function isNavActive(item: NavGroup, pathname: string) {
  const matches = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
  return matches(item.href) || (item.children?.some((c) => matches(c.href)) ?? false);
}

/** Header utama: sticky, menyusut saat scroll, penanda menu aktif, dropdown desktop. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const openMobileMenu = useUIStore((s) => s.openMobileMenu);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "border-b bg-surface transition-all duration-300",
        scrolled
          ? "border-line shadow-[0_8px_30px_-12px_rgba(11,28,61,0.25)]"
          : "border-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8",
          scrolled ? "h-14" : "h-18",
        )}
      >
        <Logo compact />

        <nav aria-label="Navigasi utama" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isNavActive(item, pathname);
              return (
                <li key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-bold transition-colors",
                      active
                        ? "bg-tint text-accent"
                        : "text-heading hover:bg-tint hover:text-accent",
                    )}
                  >
                    {active ? (
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-gold-500"
                        aria-hidden="true"
                      />
                    ) : null}
                    {item.label}
                    {item.children ? (
                      <Icon
                        name="chevron-down"
                        size={14}
                        className={cn(
                          "transition-transform group-hover:rotate-180",
                          active ? "text-brand-500" : "text-muted",
                        )}
                      />
                    ) : null}
                  </Link>
                  {item.children ? (
                    <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="w-80 rounded-2xl border border-line bg-surface p-2 shadow-xl shadow-brand-950/10">
                        {item.children.map((child) => {
                          const childActive =
                            pathname === child.href || pathname.startsWith(`${child.href}/`);
                          return (
                            <Link
                              key={child.href + child.label}
                              href={child.href}
                              aria-current={childActive ? "page" : undefined}
                              className={cn(
                                "flex flex-col gap-0.5 rounded-xl p-3 transition-colors",
                                childActive ? "bg-tint" : "hover:bg-tint",
                              )}
                            >
                              <span className="flex items-center justify-between text-sm font-bold text-heading">
                                {child.label}
                                <Icon
                                  name="arrow-right"
                                  size={14}
                                  className={cn(
                                    "transition-transform",
                                    childActive ? "text-gold-500" : "text-brand-400",
                                  )}
                                />
                              </span>
                              {child.description ? (
                                <span className="text-[13px] text-muted">
                                  {child.description}
                                </span>
                              ) : null}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SiteSearch />
          <Link
            href="/ppdb"
            className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2.5 text-xs font-bold shadow-sm transition-colors sm:px-4 sm:text-sm lg:px-5",
              pathname === "/ppdb"
                ? "bg-brand-700 text-white ring-2 ring-gold-400"
                : "bg-gold-500 text-brand-950 hover:bg-gold-400",
            )}
          >
            <span className="sm:hidden">PPDB</span>
            <span className="hidden sm:inline">PPDB {siteConfig.academicYear}</span>
          </Link>
          <button
            type="button"
            onClick={openMobileMenu}
            aria-label="Buka menu navigasi"
            className="flex h-11 w-11 items-center justify-center rounded-full text-heading transition-colors hover:bg-tint xl:hidden"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
