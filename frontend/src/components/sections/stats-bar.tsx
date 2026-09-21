import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { stats } from "@/content/stats";
import { cn } from "@/lib/utils";

type StatsBarProps = {
  /** Karte ragt über den unteren Rand des vorherigen Heros */
  overlap?: boolean;
  className?: string;
};

export function StatsBar({ overlap = true, className }: StatsBarProps) {
  return (
    <Container className={cn("relative z-10", overlap && "-mt-14 sm:-mt-16", className)}>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink-100 shadow-lifted ring-1 ring-ink-900/5 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-1 bg-white px-6 py-6 sm:px-8 sm:py-7">
            <dt className="text-sm text-ink-500">{stat.label}</dt>
            <dd className="text-2xl font-semibold tracking-tight text-ink-950 tabular-nums sm:text-3xl">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
