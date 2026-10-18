import { useScrollToSection } from "@/components/fx/smooth-scroll";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { nav, person, socials } from "@/content/site";

export function SiteFooter() {
  const scrollTo = useScrollToSection();

  return (
    <footer className="border-t border-line py-s-6" style={{ paddingBottom: "calc(var(--s-6) + env(safe-area-inset-bottom, 0px))" }}>
      <div className="wrap grid gap-s-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="grid content-start gap-2">
          <p className="font-display text-small uppercase tracking-[0.06em]">{person.name}</p>
          <p className="max-w-[40ch] text-small text-ink-3">
            Set in Geist and Geist Mono. Built with React, anime.js, Lenis and WebGL. Line figures by hairline.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(n.id);
                  }}
                  className="inline-flex min-h-[44px] items-center font-mono text-small text-ink-2 transition-colors duration-fade ease-inout hover:text-ink md:min-h-[32px]"
                >
                  <ScrambleLabel text={n.label} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="grid content-start gap-1">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center font-mono text-small text-ink-2 transition-colors duration-fade ease-inout hover:text-ink md:min-h-[32px]">
                <ScrambleLabel text={s.label} />
                <span aria-hidden="true">&nbsp;↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("top");
              }}
              className="inline-flex min-h-[44px] items-center font-mono text-small text-ink-2 transition-colors duration-fade ease-inout hover:text-ink md:min-h-[32px]"
            >
              <ScrambleLabel text="Back to top" /> <span aria-hidden="true">&nbsp;↑</span>
            </a>
          </li>
        </ul>
      </div>
      <p className="wrap mt-s-4 font-mono text-small text-ink-3">© {new Date().getFullYear()} {person.name}</p>
    </footer>
  );
}
