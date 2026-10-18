import { DitherPortrait } from "@/components/fx/dither-portrait";
import { RevealMedia, useRevealGroup } from "@/components/fx/reveal";
import { ScrambleHeading, ScrollLede } from "@/components/fx/text";
import { about } from "@/content/site";

export function About() {
  const group = useRevealGroup<HTMLDivElement>();

  return (
    <section id="about" aria-labelledby="about-title" className="relative border-b border-line py-section">
      <div className="wrap grid gap-s-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-s-8">
        <div className="self-start lg:sticky lg:top-[calc(var(--nav-h)+var(--s-4))]">
          <RevealMedia className="media-frame mx-auto max-w-[min(420px,78vw)] lg:mx-0">
            <div data-reveal-inner className="origin-bottom">
              <DitherPortrait
                src="/images/portrait-cutout.png"
                alt="Portrait of Hans Gunawan, arms crossed, drawn in dithered violet light."
                width={271}
                height={411}
                className="w-full"
              />
            </div>
          </RevealMedia>
        </div>

        <div ref={group} className="min-w-0">
          <ScrambleHeading id="about-title" className="font-display text-h2">
            About
          </ScrambleHeading>
          <ScrollLede text={about.lede} className="mt-s-4 max-w-[30ch] text-lede" />

          <div className="mt-s-6 grid max-w-measure gap-4 text-ink-2">
            {about.paragraphs.map((p, i) => (
              <p key={i} data-reveal data-reveal-index={i}>
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-s-6 grid max-w-[44rem] gap-x-6 gap-y-5 sm:grid-cols-2">
            {about.facts.map((f, i) => (
              <div key={f.k} data-reveal data-reveal-index={i} className="grid gap-1">
                <dt className="font-mono text-small text-ink-3">{f.k}</dt>
                <dd className="text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>

          <p data-reveal className="mt-s-6 font-display text-h3 text-arrive">
            {about.principle}
          </p>
        </div>
      </div>
    </section>
  );
}
