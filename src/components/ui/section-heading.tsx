import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "eyebrow",
            align === "center" && "justify-center",
            tone === "light" && "text-brand-200",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-3xl font-extrabold leading-tight tracking-tight text-balance sm:text-4xl",
          tone === "dark" ? "text-heading" : "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-muted" : "text-brand-100/85",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Section({
  className,
  children,
  tint = false,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  tint?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        // -mt-px + relative: tutup 1px tepi bawah section sebelumnya agar tidak
        // muncul garis samar akibat pembulatan subpixel saat scroll.
        "relative -mt-px",
        tint ? "bg-tint" : "bg-surface",
        "py-16 sm:py-24",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
