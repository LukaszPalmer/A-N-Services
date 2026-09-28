"use client";

import { ChevronsDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MovingStoryScene } from "@/components/sections/moving-story/scene";
import {
  buildSceneKeyframes,
  getActiveStep,
  getSceneStyles,
  getSceneValues,
  initialSceneStyles,
  WORLD_WIDTH,
} from "@/components/sections/moving-story/timeline";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Highlight } from "@/components/ui/section-heading";
import { movingStorySteps } from "@/content/moving-story";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";

type AnimatedElements = Map<string, HTMLElement[]>;

type ViewTimelineConstructor = new (options: { subject: Element; axis?: "block" | "inline" }) => AnimationTimeline;
type ScrollAnimationOptions = KeyframeAnimationOptions & { rangeStart: string; rangeEnd: string };

/** Scroll-Timeline der Web Animations API – Chrome/Edge 115+, Safari 26+ */
function getViewTimeline() {
  return (window as unknown as { ViewTimeline?: ViewTimelineConstructor }).ViewTimeline;
}

/**
 * Scroll-animierte Umzugs-Story ("Scrollytelling"):
 * Die Szene bleibt stehen (sticky), während der Nutzer durch einen 3–4× bildschirmhohen
 * Bereich scrollt.
 *
 * Performance (auch auf günstigen Smartphones flüssig):
 * - Moderne Browser: Jedes bewegte Element bekommt eine Web-Animation, deren Zeitachse
 *   der Scroll-Fortschritt ist (ViewTimeline, Bereich "contain"). Der Browser führt sie
 *   komplett auf dem Compositor-Thread aus – der Hauptthread hat beim Scrollen durch die
 *   Szene praktisch nichts zu tun. Keyframes werden nur bei Größenänderungen neu berechnet.
 * - Fallback (ältere Browser): pro Frame werden nur `transform`/`opacity` der bewegten
 *   Elemente gesetzt – und nur, wenn sich der Wert geändert hat.
 * - Animiert werden ausschließlich transform/opacity auf eigenen GPU-Ebenen:
 *   kein Layout, kein Neuzeichnen, keine Filter.
 * - React rendert nur, wenn der Text-Schritt wechselt (4× pro Durchlauf).
 * - Außerhalb des sichtbaren Bereichs läuft gar nichts (siehe useScrollProgress).
 */
export function MovingStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<AnimatedElements | null>(null);
  const lastStylesRef = useRef(new Map<HTMLElement, string>());
  const unitRef = useRef({ px: 0, pan: 0 });
  const animationsRef = useRef<Animation[]>([]);
  const activeStepRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);

  /** Keyframes für die Scroll-Timeline (neu bei jeder Größenänderung, da in Pixeln) */
  const createScrollAnimations = (track: HTMLElement, elements: AnimatedElements) => {
    animationsRef.current.forEach((animation) => animation.cancel());
    animationsRef.current = [];

    const ViewTimeline = getViewTimeline();
    if (!ViewTimeline || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { px, pan } = unitRef.current;
    const timeline = new ViewTimeline({ subject: track, axis: "block" });
    const options: ScrollAnimationOptions = {
      timeline,
      rangeStart: "contain 0%",
      rangeEnd: "contain 100%",
      fill: "both",
      easing: "linear",
    };
    const keyframes = buildSceneKeyframes(
      (n) => `${(n * px).toFixed(2)}px`,
      (factor) => `${(factor * pan).toFixed(2)}px`,
    );
    for (const [key, frames] of keyframes) {
      for (const element of elements.get(key) ?? []) {
        animationsRef.current.push(element.animate(frames, options));
      }
    }
  };

  /** Elemente einsammeln und Pixel pro Szenen-Einheit messen – beim Start und bei Größenänderungen */
  const collectElements = () => {
    const track = trackRef.current;
    if (!track) return;

    if (!elementsRef.current) {
      const map: AnimatedElements = new Map();
      track.querySelectorAll<HTMLElement>("[data-anim]").forEach((element) => {
        const key = element.dataset.anim!;
        map.set(key, [...(map.get(key) ?? []), element]);
      });
      elementsRef.current = map;
    }

    // Pixel pro Szenen-Einheit und maximaler Kameraschwenk (Mobile: Welt breiter als Bildschirm)
    const probe = track.querySelector<HTMLElement>("[data-u-probe]");
    const scene = probe?.parentElement;
    if (!probe || !scene) return;
    const px = probe.offsetWidth / 100;
    const pan = Math.min(0, scene.clientWidth - WORLD_WIDTH * px);
    const changed = px !== unitRef.current.px || pan !== unitRef.current.pan;
    unitRef.current = { px, pan };

    // Keyframes nur neu berechnen, wenn sich die Größe wirklich geändert hat
    if (changed || animationsRef.current.length === 0) {
      lastStylesRef.current.clear();
      createScrollAnimations(track, elementsRef.current);
    }
  };

  const render = (progress: number) => {
    if (!elementsRef.current) collectElements();
    const elements = elementsRef.current;
    if (!elements) return;

    updateStep(progress);
    // Läuft die Scroll-Timeline, bewegt der Browser die Szene selbst
    if (animationsRef.current.length > 0) return;

    const { px, pan } = unitRef.current;
    const styles = getSceneStyles(
      getSceneValues(progress),
      (n) => `${(n * px).toFixed(2)}px`,
      (factor) => `${(factor * pan).toFixed(2)}px`,
    );

    const last = lastStylesRef.current;
    for (const [key, style] of Object.entries(styles)) {
      for (const element of elements.get(key) ?? []) {
        const signature = `${style.transform ?? ""}|${style.opacity ?? ""}`;
        if (last.get(element) === signature) continue;
        last.set(element, signature);
        if (style.transform !== undefined) element.style.transform = style.transform;
        if (style.opacity !== undefined) element.style.opacity = style.opacity;
      }
    }
  };

  const updateStep = (progress: number) => {
    const step = getActiveStep(progress);
    if (step !== activeStepRef.current) {
      activeStepRef.current = step;
      setActiveStep(step);
    }
  };

  useScrollProgress(trackRef, render, collectElements);

  // Web-Animationen beim Verlassen der Seite aufräumen
  useEffect(() => () => animationsRef.current.forEach((animation) => animation.cancel()), []);

  return (
    <section aria-labelledby="moving-story-title" className="bg-white pb-6 sm:px-3 sm:pb-3">
      <div
        ref={trackRef}
        data-driving={activeStep === 2}
        className="relative h-[330svh] sm:h-[400svh] motion-reduce:h-auto"
      >
        {/* Mobil ohne abgerundete Ecken (abgerundetes Clipping über vielen GPU-Ebenen kostet dort spürbar Leistung)
            und kürzer, damit die feste Kontaktleiste unten nichts von der Szene verdeckt */}
        <div className="sticky top-[5.25rem] h-[calc(100svh-10.25rem)] overflow-hidden bg-linear-to-b from-ink-950 via-ink-950 to-ink-900 sm:top-[5.5rem] sm:rounded-5xl lg:h-[calc(100svh-6.25rem)] motion-reduce:relative motion-reduce:top-0 motion-reduce:h-[46rem]">
          <MovingStoryScene />

          {/* Lesbarkeit der Texte über der Szene */}
          <div aria-hidden className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-ink-950 via-ink-950/70 to-transparent" />

          <Container size="wide" className="relative grid gap-8 pt-9 sm:pt-12 lg:grid-cols-2 lg:gap-16 lg:pt-14">
            <div>
              <Eyebrow variant="dark">Ihr Umzug in Bewegung</Eyebrow>
              <h2
                id="moving-story-title"
                className="mt-5 text-3xl leading-[1.05] font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-6xl"
              >
                Von Tür zu Tür. <Highlight className="text-brand-400">Wir packen das.</Highlight>
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
                  data-anim="hint"
                  className="mt-6 flex items-center gap-2 text-sm text-white/50 motion-reduce:hidden"
                  style={initialSceneStyles.hint}
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
              data-anim={`bar${index}`}
              className="h-full origin-left rounded-full bg-brand-500 will-change-transform"
              style={initialSceneStyles[`bar${index}`]}
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
