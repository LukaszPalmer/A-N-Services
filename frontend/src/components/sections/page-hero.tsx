import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image?: ImageAsset;
  /** Aktuelle Seite für die Breadcrumb-Navigation */
  breadcrumb: string;
  children?: ReactNode;
};

/** Hero für Unterseiten – gleiche Formensprache wie die Startseite, kompakter. */
export function PageHero({ eyebrow, title, description, image, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="px-2 pt-2 sm:px-4 sm:pt-4">
      <div className="relative isolate overflow-hidden rounded-4xl bg-ink-950 sm:rounded-5xl">
        {image ? (
          <>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              placeholder="blur"
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/95 via-ink-950/75 to-ink-950/30"
            />
          </>
        ) : (
          <div aria-hidden className="absolute inset-0 -z-10 bg-dots-light" />
        )}
        <div
          aria-hidden
          className="absolute -top-32 -left-32 -z-10 size-[26rem] rounded-full bg-brand-500/25 blur-3xl"
        />

        <Container className={cn("relative py-20 sm:py-24", image && "lg:py-32")}>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-1.5 text-sm text-white/60">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Startseite
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="text-white">
                {breadcrumb}
              </li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <Eyebrow variant="solid" className="animate-fade-up">
              {eyebrow}
            </Eyebrow>
            <h1 className="mt-6 animate-fade-up text-4xl leading-[1.05] font-semibold text-white [animation-delay:100ms] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/75 [animation-delay:200ms]">
                {description}
              </p>
            )}
            {children && (
              <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:300ms] sm:flex-row">
                {children}
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
