import { RevealMedia, useRevealGroup } from "@/components/fx/reveal";
import { ScrambleHeading } from "@/components/fx/text";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { SocialWall } from "@/components/site/social-wall";
import { updates } from "@/content/site";

export const fmtDate = (d?: string) =>
  d ? (d.length === 4 ? d : new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })) : "";

export function Updates() {
  const strip = useRevealGroup<HTMLUListElement>();

  return (
    <section id="updates" aria-labelledby="updates-title" className="relative overflow-hidden border-b border-line py-section">
      <div className="wrap flex flex-wrap items-end justify-between gap-s-3">
        <ScrambleHeading id="updates-title" className="font-display text-h2">
          Updates
        </ScrambleHeading>
        <p className="max-w-[40ch] text-ink-2">News, launches and programs. Scroll the row sideways, or use the arrow keys once it has focus.</p>
      </div>

      <ul
        ref={strip}
        tabIndex={0}
        aria-label="Updates, newest first"
        className="mt-s-6 flex snap-x snap-mandatory gap-s-3 overflow-x-auto pb-s-2 [scrollbar-color:rgb(var(--line))_transparent]"
        style={{
          paddingLeft: "max(var(--gutter), env(safe-area-inset-left, 0px))",
          paddingRight: "max(var(--gutter), env(safe-area-inset-right, 0px))",
          scrollPaddingLeft: "max(var(--gutter), env(safe-area-inset-left, 0px))",
        }}
      >
        {updates.map((u, i) => (
          <li key={u.title} data-reveal data-reveal-index={i} className="w-[min(82vw,440px)] shrink-0 snap-start">
            <article className="grid gap-3">
              {u.image && (
                <RevealMedia className="media-frame aspect-[4/3]">
                  <img data-reveal-inner src={u.image} alt={u.imageAlt ?? ""} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
                </RevealMedia>
              )}
              <p className="font-mono text-small text-ink-3">{fmtDate(u.date)}</p>
              <h3 className="text-[clamp(18px,1.32vw,50px)] leading-snug text-ink">{u.title}</h3>
              <p className="text-ink-2">{u.text}</p>
              {u.link && (
                <a href={u.link.href} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-[44px] items-center justify-self-start font-mono text-small">
                  <ScrambleLabel text={u.link.label} />
                  <span aria-hidden="true">&nbsp;↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </article>
          </li>
        ))}
      </ul>

      <div className="wrap mt-section">
        <SocialWall />
      </div>
    </section>
  );
}
