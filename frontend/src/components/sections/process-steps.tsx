import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { Section, type SectionTone } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/content/process";

export function ProcessSteps({ tone = "white" }: { tone?: SectionTone }) {
  return (
    <Section tone={tone}>
      <Container>
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

        <ol className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Verbindungslinie (Desktop) */}
          <div
            aria-hidden
            className="absolute top-12 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-brand-200 lg:block"
          />

          {processSteps.map((step, index) => (
            <li
              key={step.title}
              className="reveal relative flex flex-col items-center rounded-4xl bg-white px-6 pt-6 pb-8 text-center ring-1 ring-ink-900/5 transition hover:shadow-soft"
            >
              <div className="relative">
                <IconBadge icon={step.icon} variant={index === processSteps.length - 1 ? "solid" : "soft"} size="lg" />
                <span className="absolute -top-2 -right-3 grid size-7 place-items-center rounded-full bg-ink-950 text-xs font-semibold text-white ring-4 ring-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-ink-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
