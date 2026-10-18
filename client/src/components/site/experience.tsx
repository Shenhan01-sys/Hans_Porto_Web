import { Hairline } from "@/components/fx/hairline";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { useRevealGroup } from "@/components/fx/reveal";
import { ScrambleHeading } from "@/components/fx/text";
import { experience } from "@/content/site";

export function Experience() {
  const list = useRevealGroup<HTMLDivElement>();

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative border-b border-line py-section">
      <div className="wrap grid gap-s-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-s-8">
        <div className="self-start lg:sticky lg:top-[calc(var(--nav-h)+var(--s-4))]">
          <ScrambleHeading id="experience-title" className="font-display text-h2">
            Experience
          </ScrambleHeading>
          <p className="mt-s-2 max-w-[34ch] text-ink-2">
            Teaching, leading teams and shipping, from a vintage store in 2023 to a national ERP in 2026.
          </p>
          <Hairline
            figure="stack"
            className="mt-s-4 hidden max-w-[420px] lg:block"
            label="Line drawing of a call stack of five frames. Move the pointer up and down to lift a frame."
          />
        </div>

        <div ref={list} className="min-w-0">
          {experience.map((g, gi) => (
            <div key={g.group} className={gi ? "mt-s-8" : ""}>
              <h3 className="font-display text-h3 text-arrive">{g.group}</h3>
              <ol className="mt-s-2 grid">
                {g.roles.map((r, i) => (
                  <li
                    key={`${r.title}-${r.org}`}
                    data-reveal
                    data-reveal-index={i}
                    className="grid gap-x-6 gap-y-2 py-5 md:grid-cols-[10rem_minmax(0,1fr)]"
                  >
                    <span className="font-mono text-small tabular-nums text-ink-3">{r.dates}</span>
                    <div className="grid min-w-0 gap-2">
                      <p className="text-[clamp(18px,1.32vw,50px)] leading-snug text-ink">
                        {r.title}
                        <span className="text-ink-2">, {r.org}</span>
                      </p>
                      <p className="max-w-measure text-ink-2">{r.text}</p>
                      {(r.tags?.length || r.link) && (
                        <div className="flex flex-wrap items-center gap-2">
                          {r.tags?.map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                          {r.link && (
                            <a href={r.link.href} target="_blank" rel="noopener noreferrer" className="link ml-1 inline-flex min-h-[44px] items-center font-mono text-small md:min-h-0">
                              <ScrambleLabel text={r.link.label} />
                              <span aria-hidden="true">&nbsp;↗</span>
                              <span className="sr-only">(opens in a new tab)</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
