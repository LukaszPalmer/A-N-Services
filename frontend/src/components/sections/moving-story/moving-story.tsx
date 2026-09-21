"use client";

import { ChevronsDown } from "lucide-react";
import { useRef, useState } from "react";

import { MovingStoryScene } from "@/components/sections/moving-story/scene";
import {
  getActiveStep,
  getSceneVars,
  initialSceneStyle,
} from "@/components/sections/moving-story/timeline";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Highlight } from "@/components/ui/section-heading";
import { movingStorySteps } from "@/content/moving-story";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";

/**
 * Scroll-animierte Umzugs-Story ("Scrollytelling"):
 * Die Szene bleibt stehen (sticky), während der Nutzer durch einen 3–4× bildschirmhohen
 * Bereich scrollt. Der Fortschritt wird als CSS-Variablen gesetzt → flüssig & ohne Re-Render.
 */
export function MovingStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useScrollProgress(trackRef, (progress) => {
    const track = trackRef.current;
    if (!track) return;

    for (const [name, value] of Object.entries(getSceneVars(progress))) {
      track.style.setProperty(name, value.toFixed(4));
    }
    setActiveStep(getActiveStep(progress));
  });

  return (
    <section aria-labelledby="moving-story-title" className="px-2 sm:px-4">
      <div
        ref={trackRef}
        style={initialSceneStyle}
        className="relative h-[350svh] sm:h-[400svh] motion-reduce:h-auto"
      >
        <div className="sticky top-[5.5rem] h-[calc(100svh-6.5rem)] overflow-hidden rounded-4xl bg-linear-to-b from-ink-950 via-ink-950 to-ink-900 sm:rounded-5xl motion-reduce:relative motion-reduce:top-0 motion-reduce:h-[46rem]">
          <MovingStoryScene />

          {/* Lesbarkeit der Texte über der Szene */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-ink-950 via-ink-950/70 to-transparent" />

          <Container className="relative grid gap-8 pt-10 sm:pt-12 lg:grid-cols-2 lg:gap-16 lg:pt-14">
            <div>
              <Eyebrow variant="dark">Ihr Umzug in Bewegung</Eyebrow>
              <h2
                id="moving-story-title"
                className="mt-5 text-3xl leading-[1.1] font-semibold text-white sm:text-4xl lg:text-5xl"
              >
                Von Tür zu Tür. <Highlight>Wir packen das.</Highlight>
              </h2>
            </div>

            <div className="lg:pt-12">
              {/* Screenreader bekommen alle Schritte als Liste */}
              <ol className="sr-only">
                {movingStorySteps.map((step) => (
                  <li key={step.label}>
                    {step.title} {step.text}
                  </li>
                ))}
              </ol>

              <div aria-hidden>
                <StepText activeStep={activeStep} />
                <StepProgress activeStep={activeStep} />
                <p
                  className="mt-6 flex items-center gap-2 text-sm text-white/50 motion-reduce:hidden"
                  style={{ opacity: "calc(1 - min(1, var(--progress) * 12))" }}
                >
                  <ChevronsDown className="size-4 animate-bounce" />
                  Scrollen Sie weiter
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}

function StepText({ activeStep }: { activeStep: number }) {
  const total = movingStorySteps.length;

  return (
    <div className="grid">
      {movingStorySteps.map((step, index) => (
        <div
          key={step.label}
          className={cn(
            "col-start-1 row-start-1 transition duration-500 ease-out",
            index === activeStep && "translate-y-0 opacity-100",
            index < activeStep && "-translate-y-4 opacity-0",
            index > activeStep && "translate-y-4 opacity-0",
          )}
        >
          <p className="text-sm font-semibold tracking-[0.14em] text-brand-400 tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{step.title}</h3>
          <p className="mt-3 max-w-md leading-relaxed text-white/70">{step.text}</p>
        </div>
      ))}
    </div>
  );
}

function StepProgress({ activeStep }: { activeStep: number }) {
  return (
    <ol className="mt-8 grid grid-cols-4 gap-3">
      {movingStorySteps.map((step, index) => (
        <li key={step.label}>
          <div className="h-1 overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full origin-left rounded-full bg-brand-500"
              style={{ transform: `scaleX(var(--phase-${index}))` }}
            />
          </div>
          <p
            className={cn(
              "mt-3 text-xs font-medium transition-colors duration-300 sm:text-sm",
              index <= activeStep ? "text-white" : "text-white/40",
            )}
          >
            {step.label}
          </p>
        </li>
      ))}
    </ol>
  );
}
