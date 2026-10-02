import { siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { OpenStatus } from "@/components/layout/open-status";

/** Strip kontak tipis di atas header. */
export function Topbar() {
  return (
    <div className="hidden bg-brand-950 text-brand-100 lg:block">
      <Container className="flex h-9 items-center justify-between text-[13px]">
        <div className="flex items-center gap-6">
          <OpenStatus />
          {siteConfig.phone ? (
            <span className="flex items-center gap-1.5">
              <Icon name="phone" size={13} className="text-gold-400" />
              {siteConfig.phone}
            </span>
          ) : null}
          <span className="flex items-center gap-1.5">
            <Icon name="mail" size={13} className="text-gold-400" />
            {siteConfig.email}
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-brand-200">
            <Icon name="clock" size={13} />
            {siteConfig.officeHours}
          </span>
          <span className="h-4 w-px bg-white/20" aria-hidden="true" />
          <div className="flex items-center gap-3">
            {siteConfig.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="text-brand-200 transition-colors hover:text-gold-400"
              >
                <Icon name={social.icon as "facebook"} size={15} />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
