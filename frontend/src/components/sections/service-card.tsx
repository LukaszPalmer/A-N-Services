import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-4xl bg-sand-50 ring-1 ring-ink-900/5 transition duration-500 hover:-translate-y-1 hover:shadow-lifted">
      <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-3xl">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950/80 via-ink-950/25 to-transparent" />
        <span className="absolute top-4 left-4 grid size-12 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft">
          <service.icon className="size-5.5" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="absolute bottom-4 left-5 text-sm font-medium text-white">{service.tagline}</span>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-4 pb-7 sm:px-7">
        <h3 className="text-2xl font-semibold text-ink-950">{service.title}</h3>
        <p className="mt-3 leading-relaxed text-ink-600">{service.description}</p>

        <ul className="mt-6 space-y-2.5">
          {service.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-3 text-sm text-ink-800">
              <span className="grid size-5 place-items-center rounded-full bg-brand-500 text-white">
                <Check className="size-3" strokeWidth={3} aria-hidden />
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        {/* Der Link spannt über die ganze Karte (after:inset-0) */}
        <Link
          href={service.href}
          className="mt-auto inline-flex items-center gap-2 pt-8 font-medium text-ink-950 after:absolute after:inset-0 after:rounded-4xl"
        >
          Mehr erfahren
          <span className="grid size-8 place-items-center rounded-full bg-ink-950 text-white transition duration-300 group-hover:rotate-45 group-hover:bg-brand-500">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
          <span className="sr-only">über {service.title}</span>
        </Link>
      </div>
    </article>
  );
}
