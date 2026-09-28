import { Container } from "@/components/ui/container";
import { CountUp } from "@/components/ui/count-up";
import { stats } from "@/content/stats";
import { cn } from "@/lib/utils";

type StatsBarProps = {
  /** Karte ragt über den unteren Rand des vorherigen Banners */
  overlap?: boolean;
  className?: string;
};

export function StatsBar({ overlap = true, className }: StatsBarProps) {
  return (
    <Container size="wide" className={cn("relative z-10", overlap && "-mt-12 sm:-mt-14", className)}>
      <dl className="grid grid-cols-2 overflow-hidden rounded-4xl bg-white shadow-deep ring-1 ring-ink-900/5 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "group relative flex flex-col-reverse gap-2 px-6 py-7 sm:px-9 sm:py-9",
              index % 2 === 1 && "border-l border-ink-100",
              index >= 2 && "border-t border-ink-100 lg:border-t-0",
              index === 2 && "lg:border-l",
            )}
          >
            <dt className="text-xs font-semibold tracking-[0.14em] text-ink-500 uppercase sm:text-[0.8rem]">
              {stat.label}
            </dt>
            <dd className="text-4xl leading-none font-semibold tracking-[-0.04em] text-ink-950 tabular-nums sm:text-5xl lg:text-6xl">
              <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </dd>
            {/* Orangefarbene Linie wächst beim Hover */}
            <span
              aria-hidden
              className="absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-brand-500 transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-9"
            />
          </div>
        ))}
      </dl>
    </Container>
  );
}
