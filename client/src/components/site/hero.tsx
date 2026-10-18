import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { animate, stagger, utils } from "animejs";
import { DitherField } from "@/components/fx/dither-field";
import { INTRO_EVENT } from "@/components/fx/intro";
import { useScrollToSection } from "@/components/fx/smooth-scroll";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { person } from "@/content/site";
import { animeEase, dur } from "@/lib/motion";

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const scrollTo = useScrollToSection();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  // Parallax: the name drifts up at about half the scroll speed of the page.
  const lift = useTransform(scrollYProgress, [0, 1], ["0vh", reduce ? "0vh" : "-22vh"]);

  useEffect(() => {
    const root = content.current;
    if (!root || reduce) return;
    const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
    const rest = root.querySelectorAll<HTMLElement>("[data-hero-rest]");
    lines.forEach((line, i) => utils.set(line, { x: i % 2 ? "-5vw" : "5vw", opacity: 0.3 }));
    utils.set(rest, { y: "0.6em", opacity: 0.2 });

    const play = (instant: boolean) => {
      const lead = instant ? 0 : 400;
      animate(lines, {
        x: 0,
        opacity: { to: 1, duration: dur.fade, ease: "linear" },
        duration: dur.hero,
        delay: stagger(100, { start: lead }),
        ease: animeEase.snap,
      });
      animate(rest, {
        y: "0em",
        opacity: { to: 1, duration: dur.fade, ease: "linear" },
        duration: dur.enter,
        delay: stagger(67, { start: lead + 500 }),
        ease: animeEase.land,
      });
    };

    const onReveal = (e: Event) => play(Boolean((e as CustomEvent).detail?.instant));
    if (document.documentElement.dataset.introRevealed === "1") play(true);
    else window.addEventListener(INTRO_EVENT, onReveal, { once: true });
    return () => {
      window.removeEventListener(INTRO_EVENT, onReveal);
      utils.remove(lines);
      utils.remove(rest);
      lines.forEach((l) => ((l.style.transform = ""), (l.style.opacity = "")));
      rest.forEach((l) => ((l.style.transform = ""), (l.style.opacity = "")));
    };
  }, [reduce]);

  return (
    <section
      id="top"
      ref={section}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden border-b border-line"
      style={{ background: "linear-gradient(200deg, rgb(var(--line-strong)), rgb(var(--plate-2)) 45%, rgb(var(--ground)) 80%)" }}
    >
      <DitherField className="absolute inset-0 -z-10 h-full w-full touch-pan-y" />
      {/* falloff so the type keeps its contrast where the field is brightest */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "linear-gradient(to top right, rgb(var(--ground) / 0.88) 0%, rgb(var(--ground) / 0.55) 32%, rgb(var(--ground) / 0) 62%)" }}
      />
      <motion.div ref={content} style={{ y: lift }} className="wrap relative pb-s-6 pt-[calc(var(--nav-h)+var(--s-8))]">
        <h1 aria-label={person.name} className="font-display text-hero font-medium uppercase">
          <span data-hero-line aria-hidden="true" className="block">
            {person.firstName}
          </span>
          <span data-hero-line aria-hidden="true" className="block">
            {person.lastName}
          </span>
        </h1>

        <div className="mt-s-4 grid gap-s-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-[34ch]">
            <p data-hero-rest className="text-[clamp(19px,1.45vw,55px)] leading-[1.35] text-ink">
              {person.role}
            </p>
            <p data-hero-rest className="mt-2 text-ink-2">
              {person.study}
            </p>
          </div>
          <div data-hero-rest className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("work");
              }}
            >
              <ScrambleLabel text="See the work" /> <span aria-hidden="true">→</span>
            </a>
            <a href={person.cv} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <ScrambleLabel text="Download CV" /> <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
