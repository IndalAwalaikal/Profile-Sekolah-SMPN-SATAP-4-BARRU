import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/container";
import { WaveDivider } from "@/components/ui/wave-divider";
import { Parallax } from "@/components/ui/parallax";

interface PageHeaderProps {
  title: string;
  description?: string;
  crumbs: { label: string; href?: string }[];
}

/** Kepala halaman dalam (hero kecil) dengan breadcrumb. */
export function PageHeader({ title, description, crumbs }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-brand-950 text-white">
      <div className="pattern-dots absolute inset-0 opacity-40" aria-hidden="true" />
      <Parallax
        speed={0.35}
        className="absolute -right-24 -top-32 h-96 w-96"
      >
        <div
          className="h-full w-full rounded-full bg-brand-600/30 blur-3xl"
          aria-hidden="true"
        />
      </Parallax>
      <Parallax
        speed={-0.25}
        className="absolute -bottom-40 -left-20 h-80 w-80"
      >
        <div
          className="h-full w-full rounded-full bg-gold-500/15 blur-3xl"
          aria-hidden="true"
        />
      </Parallax>
      <Container className="relative py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-brand-200">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 ? (
                  <Icon name="chevron-right" size={14} className="text-brand-400" />
                ) : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className={cn("font-semibold text-white")}>
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-100/85">
            {description}
          </p>
        ) : null}
      </Container>
      <WaveDivider className="relative text-surface" />
    </header>
  );
}
