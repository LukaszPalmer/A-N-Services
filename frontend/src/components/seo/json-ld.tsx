/**
 * Gibt strukturierte Daten als <script type="application/ld+json"> aus.
 * `<` wird maskiert, damit Inhalte das Script-Tag nicht vorzeitig schließen können.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
