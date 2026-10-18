import { Hairline } from "@/components/fx/hairline";
import { useRevealGroup } from "@/components/fx/reveal";
import { ScrambleHeading } from "@/components/fx/text";
import { delivery, stackPlates } from "@/content/site";

export function Stack() {
  const grid = useRevealGroup<HTMLDivElement>();

  return (
    <section id="stack" aria-labelledby="stack-title" className="relative border-b border-line py-section">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-s-3">
          <ScrambleHeading id="stack-title" className="font-display text-h2">
            Stack
          </ScrambleHeading>
          <p className="max-w-[40ch] text-ink-2">What I build with, grouped by what the projects prove. Each figure answers the pointer.</p>
        </div>

        <div ref={grid} className="mt-s-6 grid gap-px border border-line bg-line md:grid-cols-2">
          {stackPlates.map((plate, i) => (
            <article key={plate.title} data-reveal data-reveal-index={i} className="grid content-start gap-s-2 bg-plate p-s-3 md:p-s-4">
              <Hairline figure={plate.figure} label={plate.figureLabel} onPlate className="mx-auto w-full max-w-[380px]" />
              <h3 className="text-h3 font-medium">{plate.title}</h3>
              <p className="max-w-[44ch] text-ink-2">{plate.claim}</p>
              <ul className="flex flex-wrap gap-2" aria-label={`${plate.title} tools`}>
                {plate.tools.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="font-mono text-small text-ink-3">
                Used in <span className="text-ink-2">{plate.usedIn.join(", ")}</span>
              </p>
            </article>
          ))}
        </div>

        <p className="mt-s-4 max-w-measure text-ink-2">
          <span className="text-ink">{delivery.lead}.</span> {delivery.text}
        </p>
      </div>
    </section>
  );
}
