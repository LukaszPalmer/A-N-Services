"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";
import type { VideoAsset } from "@/types";

type VideoBackgroundProps = {
  video: VideoAsset;
  /** Poster vorladen – nur für das Banner ganz oben (LCP) */
  preload?: boolean;
  /** Kleiner Pause-/Play-Knopf unten rechts (WCAG 2.2.2) */
  showControl?: boolean;
  /** Position des Knopfs anpassen, z. B. wenn unten eine Karte überlappt */
  controlClassName?: string;
  className?: string;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

function subscribe(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Video nur, wenn weder "Bewegung reduzieren" noch der Datensparmodus aktiv ist. */
function getCanPlay() {
  const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
  return !saveData && !window.matchMedia(reducedMotionQuery).matches;
}

/**
 * Hintergrundvideo für Seiten-Banner.
 *
 * Ablauf: Sofort sichtbar ist das Standbild (next/image, optimiert, LCP-freundlich).
 * Erst nach dem Hydrieren wird das <video> eingehängt; es blendet weich ein, sobald
 * der erste Frame läuft. Außerhalb des sichtbaren Bereichs pausiert es (spart Akku
 * und CPU). Smartphones laden automatisch die kleinere Hochformat-Datei.
 */
export function VideoBackground({
  video,
  preload = false,
  showControl = true,
  controlClassName,
  className,
}: VideoBackgroundProps) {
  const canPlay = useSyncExternalStore(subscribe, getCanPlay, () => false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Einmal eingeblendet, bleibt das Video sichtbar (auch pausiert) – kein Springen zurück aufs Standbild
  const [hasStarted, setHasStarted] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  // Nur abspielen, solange das Banner im Bild ist
  useEffect(() => {
    const element = videoRef.current;
    if (!canPlay || !element || userPaused) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          element.play().catch(() => {
            /* Autoplay blockiert (z. B. Energiesparmodus) – das Standbild bleibt stehen */
          });
        } else {
          element.pause();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [canPlay, userPaused]);

  const toggle = () => {
    const element = videoRef.current;
    if (!element) return;
    if (element.paused) {
      setUserPaused(false);
      element.play().catch(() => {});
    } else {
      setUserPaused(true);
      element.pause();
    }
  };

  return (
    <>
      <div aria-hidden className={cn("absolute inset-0 -z-20 overflow-hidden", className)}>
        <Image
          src={video.poster}
          alt=""
          fill
          preload={preload}
          placeholder="blur"
          sizes="100vw"
          className="object-cover"
          style={video.focus ? { objectPosition: video.focus } : undefined}
        />

        {canPlay && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            autoPlay={!userPaused}
            preload="auto"
            disablePictureInPicture
            onPlaying={() => {
              setIsPlaying(true);
              setHasStarted(true);
            }}
            onPause={() => setIsPlaying(false)}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-out",
              hasStarted ? "opacity-100" : "opacity-0",
            )}
          >
            <source src={video.mobileSrc} type="video/mp4" media="(max-width: 767px)" />
            <source src={video.src} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Außerhalb der Hintergrundebene, damit die Verläufe darüber den Knopf nicht verdecken */}
      {showControl && canPlay && (
        <button
          type="button"
          onClick={toggle}
          className={cn(
            "absolute right-4 bottom-4 z-20 grid size-10 place-items-center rounded-full bg-ink-950/50 text-white/80 ring-1 ring-white/20 transition hover:bg-ink-950/70 hover:text-white sm:right-6 sm:bottom-6",
            controlClassName,
          )}
        >
          {isPlaying ? <Pause className="size-4" aria-hidden /> : <Play className="size-4" aria-hidden />}
          <span className="sr-only">{isPlaying ? "Hintergrundvideo anhalten" : "Hintergrundvideo abspielen"}</span>
        </button>
      )}
    </>
  );
}
