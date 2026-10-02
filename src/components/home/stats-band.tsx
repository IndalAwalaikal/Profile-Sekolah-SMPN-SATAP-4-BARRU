import { schoolStats } from "@/data/profile";
import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";

/** Band statistik yang saling bersinggungan (overlap) dengan hero,
 *  dengan angka count-up dan reveal saat masuk viewport. */
export function StatsBand() {
  return (
    <div className="relative z-10 -mt-10 sm:-mt-14">
      <Container>
        <dl
          data-reveal
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line shadow-xl shadow-brand-950/10 lg:grid-cols-4"
        >
          {schoolStats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-surface p-6 transition-colors hover:bg-tint sm:p-8"
            >
              <dd className="text-4xl font-extrabold tracking-tight text-accent sm:text-5xl">
                {/^\d+$/.test(stat.value) ? (
                  <CountUp value={Number(stat.value)} />
                ) : (
                  stat.value
                )}
              </dd>
              <dt className="mt-2 text-sm font-bold text-heading">{stat.label}</dt>
              <p className="mt-1 text-[13px] text-muted">{stat.hint}</p>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  );
}
