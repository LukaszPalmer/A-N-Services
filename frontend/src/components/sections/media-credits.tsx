import { imageCredits } from "@/content/images";
import { licenses } from "@/content/licenses";
import { videoCredits } from "@/content/videos";
import type { MediaCredit } from "@/types";

/**
 * Bild- und Videonachweis fürs Impressum.
 * Wird automatisch aus content/images.ts und content/videos.ts erzeugt – wer dort
 * ein Medium austauscht, aktualisiert den Nachweis gleich mit.
 */
export function MediaCredits() {
  return (
    <>
      <h2 id="bildnachweis">Bild- und Videonachweis</h2>
      <p>
        Alle Fotos und Videos dieser Website stammen von den Plattformen Pexels und Unsplash und
        werden unter den dort geltenden Lizenzen verwendet. Beide Lizenzen erlauben die kostenlose
        – auch kommerzielle – Nutzung und Bearbeitung ohne Pflicht zur Namensnennung. Wir nennen die
        Urheberinnen und Urheber trotzdem gern:
      </p>

      <h3>Lizenzen</h3>
      <ul>
        {Object.values(licenses).map((license) => (
          <li key={license.name}>
            <a href={license.url} target="_blank" rel="noopener noreferrer">
              {license.name}
            </a>{" "}
            – {license.summary}
          </li>
        ))}
      </ul>

      <h3>Videos</h3>
      <p>
        Die Hintergrundvideos der Seitenbanner wurden aus folgenden Clips geschnitten, gekürzt und
        farblich angepasst:
      </p>
      <CreditList credits={videoCredits} />

      <h3>Fotos</h3>
      <CreditList credits={imageCredits} />
    </>
  );
}

function CreditList({ credits }: { credits: MediaCredit[] }) {
  return (
    <ul>
      {credits.map((credit) => (
        <li key={credit.sourceUrl}>
          „{credit.title}“ von{" "}
          {credit.authorUrl ? (
            <a href={credit.authorUrl} target="_blank" rel="noopener noreferrer">
              {credit.author}
            </a>
          ) : (
            credit.author
          )}{" "}
          auf{" "}
          <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer">
            {credit.platform}
          </a>{" "}
          ({licenses[credit.platform].name})
        </li>
      ))}
    </ul>
  );
}
