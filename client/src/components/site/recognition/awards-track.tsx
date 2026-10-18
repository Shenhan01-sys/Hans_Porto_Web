import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, motionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLenis } from "@/components/fx/smooth-scroll";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { asset, awards, type Award } from "@/content/site";

// Prizes and programs on a pinned track: vertical scroll drives the row sideways, 1:1, linear.
// Pictures drift against the track (parallax) so each card reads as a window, not a sticker.
// Keyboard focus scrolls the page to the focused card. Reduced motion: a normal scrollable row.

const GUTTER = {
  paddingLeft: "max(var(--gutter), env(safe-area-inset-left, 0px))",
  paddingRight: "max(var(--gutter), env(safe-area-inset-right, 0px))",
  scrollPaddingLeft: "max(var(--gutter), env(safe-area-inset-left, 0px))",
};

export function AwardsTrack() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [dist, setDist] = useState(0);
  const [vw, setVw] = useState(1280);

  useLayoutEffect(() => {
    const t = track.current;
    if (!t) return;
    const measure = () => {
      setVw(window.innerWidth);
      setDist(Math.max(0, t.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const pinned = !reduce && dist > 0;
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (p) => -p * dist);

  const onFocus = (e: React.FocusEvent) => {
    if (!pinned || !track.current || !wrap.current) return;
    const li = (e.target as HTMLElement).closest("li");
    if (!li) return;
    const gutter = parseFloat(getComputedStyle(track.current).paddingLeft) || 24;
    const along = Math.min(dist, Math.max(0, li.offsetLeft - gutter));
    const top = wrap.current.getBoundingClientRect().top + window.scrollY + along;
    if (lenis) lenis.scrollTo(top, { immediate: true });
    else window.scrollTo(0, top);
  };

  return (
    <div ref={wrap} className="relative" style={{ height: pinned ? `calc(100svh + ${dist}px)` : undefined }}>
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-nav" : "pt-s-4"}>
        <div className="wrap flex flex-wrap items-end justify-between gap-s-2">
          <h3 className="font-display text-h3">Prizes and programs</h3>
          <p className="max-w-[44ch] text-ink-2">{awards.length} results since 2021, newest first.</p>
        </div>
        <motion.ol
          ref={track}
          onFocusCapture={onFocus}
          aria-label="Prizes and programs"
          tabIndex={pinned ? undefined : 0}
          style={pinned ? { ...GUTTER, x } : GUTTER}
          className={pinned ? "mt-s-4 flex w-max gap-s-3" : "mt-s-4 flex snap-x snap-mandatory gap-s-3 overflow-x-auto pb-s-2"}
        >
          {awards.map((a, i) => (
            <AwardCard key={`${a.year}-${a.result}-${a.event}`} a={a} i={i} trackX={pinned ? x : null} vw={vw} />
          ))}
        </motion.ol>
      </div>
    </div>
  );
}

function AwardCard({ a, i, trackX, vw }: { a: Award; i: number; trackX: MotionValue<number> | null; vw: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const centre = useRef(0);
  const still = useMemo(() => motionValue(0), []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => (centre.current = el.offsetLeft + el.offsetWidth / 2);
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // the picture lags the card by 8% of its distance from the viewport centre
  const imgX = useTransform(trackX ?? still, (tx) => (trackX ? (centre.current + tx - vw / 2) * -0.08 : 0));
  const paper = a.fit === "paper";

  return (
    <li ref={ref} className="group relative w-[min(82vw,440px)] shrink-0 snap-start">
      <article className="grid h-full content-start border border-line bg-plate transition-colors duration-fade ease-inout group-hover:border-line-strong">
        <div className={`relative aspect-[4/3] overflow-hidden ${paper ? "bg-plate-2" : "bg-plate"}`}>
          {a.image ? (
            <motion.img
              src={a.image}
              alt={a.imageAlt ?? ""}
              loading={i < 3 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              style={{ x: imgX, scale: paper || !trackX ? 1 : 1.18 }}
              className={`absolute inset-0 h-full w-full ${paper ? "object-contain p-s-2" : "object-cover object-top"}`}
            />
          ) : (
            <span aria-hidden="true" className="outline-num absolute inset-0 grid place-items-center text-[clamp(72px,9vw,180px)] leading-none">
              {a.year}
            </span>
          )}
          <span aria-hidden="true" className="sheen" />
        </div>
        <div className="relative grid gap-2 overflow-hidden p-s-3">
          <span aria-hidden="true" className="outline-num pointer-events-none absolute -right-2 -top-5 text-[clamp(64px,6vw,120px)] leading-none">
            {a.year}
          </span>
          <p className="relative font-mono text-small text-ink-3">{a.year}</p>
          <h4 className="relative text-[clamp(19px,1.4vw,52px)] leading-snug text-ink">{a.result}</h4>
          <p className="relative text-ink-2">{a.event}</p>
          {a.project && <p className="relative font-mono text-small text-arrive">{a.project}</p>}
          {a.proof && (
            <a
              href={a.proof.href.startsWith("/") ? asset(a.proof.href) : a.proof.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="link relative inline-flex min-h-[44px] items-center justify-self-start font-mono text-small"
            >
              <ScrambleLabel text={a.proof.label} />
              <span aria-hidden="true">&nbsp;↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </article>
    </li>
  );
}
