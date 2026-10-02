import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const styles = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 focus-visible:outline-brand-600",
  gold: "bg-gold-500 text-brand-950 hover:bg-gold-400 focus-visible:outline-gold-500",
  outline:
    "border border-brand-200 bg-surface text-accent hover:border-brand-400 hover:bg-tint focus-visible:outline-brand-600",
  ghost: "text-accent hover:bg-tint focus-visible:outline-brand-600",
  inverse:
    "bg-white/10 text-white ring-1 ring-inset ring-white/30 backdrop-blur hover:bg-white/20 focus-visible:outline-white",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
} as const;

interface ButtonLinkProps {
  href: string;
  variant?: keyof typeof styles;
  size?: keyof typeof sizes;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        styles[variant],
        sizes[size],
        className,
      )}
    >
      {children}
      {withArrow ? <Icon name="arrow-right" size={16} /> : null}
    </Link>
  );
}

export { styles as buttonStyles, sizes as buttonSizes };
