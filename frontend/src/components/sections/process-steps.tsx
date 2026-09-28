import { Container } from "@/components/ui/container";
import { Section, type SectionTone } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/content/process";
import { cn } from "@/lib/utils";

export function ProcessSteps({ tone = "sand" }: { tone?: SectionTone }) {
  return (
    <Section tone={tone} className="overflow-hidden">
      <Container size="wide">
        <SectionHeading
          align="center"
          eyebrow="So einfach geht's"
          title={
            <>
              In <Highlight>4 Schritten</Highlight> zum entspannten Umzug
            </>
          }
          description="Transparent von der ersten Anfrage bis zur Schlüsselübergabe – Sie wissen immer, was als Nächstes passiert."
        />

        <div className="relative mt-20">
          {/* Verbindungslinie (Desktop) – füllt sich beim Scrollen */}
          <div aria-hidden className="absolute top-[4.25rem] right-[12.5%] left-[12.5%] hidden h-0.5 bg-ink-900/10 lg:block">
            <div className="reveal-line h-full bg-linear-to-r from-brand-300 via-brand-500 to-brand-600" />
          </div>

          <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const isLast = index === processSteps.length - 1;
              return (
                <li
                  key={step.title}
                  className="reveal group relative flex flex-col items-center rounded-4xl bg-white px-7 pt-8 pb-10 text-center shadow-soft ring-1 ring-ink-900/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-lifted"
                >
                  <div className="relative">
                    <span
                      className={cn(
                        "relative z-10 grid size-[4.5rem] place-items-center rounded-3xl ring-8 ring-white transition duration-500",
                        isLast
                          ? "bg-brand-500 text-white shadow-glow"
                          : "bg-ink-950 text-white group-hover:bg-brand-500 group-hover:shadow-glow",
                      )}
                    >
                      <step.icon className="size-7" strokeWidth={1.6} aria-hidden />
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="text-outline mt-6 text-6xl leading-none font-semibold tracking-[-0.05em] text-ink-900/15 transition-colors duration-500 group-hover:text-brand-500/50"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-ink-950">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
