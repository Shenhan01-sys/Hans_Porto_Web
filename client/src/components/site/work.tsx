import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ScrambleHeading } from "@/components/fx/text";
import { useRevealGroup } from "@/components/fx/reveal";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { archive, featured, type ArchiveProject, type FeaturedProject } from "@/content/site";
import { dur, fmEase, pointerSpring } from "@/lib/motion";

function useViewportWidth() {
  const [w, setW] = useState(() => (typeof window === "undefined" ? 1280 : window.innerWidth));
  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative overflow-hidden border-b border-line py-section">
      <Arc
        items={featured}
        intro={
          <div className="grid gap-s-2">
            <ScrambleHeading id="work-title" className="font-display text-h2">
              Selected work
            </ScrambleHeading>
            <p className="max-w-[40ch] text-ink-2">
              {featured.length} builds from 2025 and 2026. Drag the arc, use the arrow buttons, or tab through the links.
            </p>
          </div>
        }
      />
      <div className="wrap">
        <Archive />
      </div>
    </section>
  );
}

/* ---------------- the arc ---------------- */

// A 2D wheel: cards sit on a ring whose pivot is far below them, so the visible ones ride a shallow arc.
// Drag, trackpad swipe, arrow buttons and keys all move the same value and settle on a card (softLand, 600ms).

function Arc({ items, intro }: { items: FeaturedProject[]; intro: React.ReactNode }) {
  const n = items.length;
  const vw = useViewportWidth();
  const reduce = useReducedMotion();
  const cardW = vw < 768 ? Math.min(vw * 0.84, 520) : Math.min(Math.max(vw * 0.46, 420), 860);
  const R = Math.max(2200, vw * 2.8);
  const stepDeg = (2 * Math.asin(Math.min(1, (cardW * 1.08 + 48) / 2 / R)) * 180) / Math.PI;
  const stepPx = cardW * 0.85;

  const x = useMotionValue(0);
  const rot = useTransform(x, (v) => (v / stepPx) * stepDeg);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const [height, setHeight] = useState(560);
  const heights = useRef<number[]>([]);
  const viewport = useRef<HTMLDivElement>(null);

  const settle = useCallback(
    (i: number, instant = false) => {
      const next = Math.max(0, Math.min(n - 1, i));
      indexRef.current = next;
      setIndex(next);
      const to = -next * stepPx;
      if (reduce || instant) x.set(to);
      else animate(x, to, { duration: 0.6, ease: fmEase.land });
    },
    [n, stepPx, reduce, x],
  );

  useEffect(() => {
    x.set(-indexRef.current * stepPx);
  }, [stepPx, x]);

  const measure = useCallback(
    (i: number, h: number) => {
      heights.current[i] = h;
      const tallest = Math.max(...heights.current.filter(Boolean));
      const drop = R * (1 - Math.cos(((stepDeg * 1.15) * Math.PI) / 180));
      setHeight(Math.ceil(tallest + drop + 24));
    },
    [R, stepDeg],
  );

  // pointer drag with a velocity projection, no library: links inside cards must stay clickable
  const drag = useRef({ active: false, moved: false, startX: 0, startY: 0, x0: 0, lastX: 0, lastT: 0, v: 0, suppressUntil: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const d = drag.current;
    Object.assign(d, { active: true, moved: false, startX: e.clientX, startY: e.clientY, x0: x.get(), lastX: e.clientX, lastT: performance.now(), v: 0 });
    x.stop();
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved) {
      if (Math.abs(dx) < 8) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        d.active = false;
        return;
      }
      d.moved = true;
      viewport.current?.setPointerCapture(e.pointerId);
      viewport.current?.classList.add("is-dragging");
    }
    const min = -(n - 1) * stepPx;
    let nx = d.x0 + dx;
    if (nx > 0) nx *= 0.25;
    if (nx < min) nx = min + (nx - min) * 0.25;
    x.set(nx);
    const now = performance.now();
    const dt = now - d.lastT;
    if (dt > 0) d.v = 0.8 * d.v + 0.2 * ((e.clientX - d.lastX) / dt);
    d.lastX = e.clientX;
    d.lastT = now;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    if (!d.moved) return;
    viewport.current?.releasePointerCapture?.(e.pointerId);
    viewport.current?.classList.remove("is-dragging");
    d.suppressUntil = performance.now() + 150;
    const projected = x.get() + d.v * 220;
    settle(Math.round(-projected / stepPx));
  };

  const wheelTimer = useRef(0);
  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
    const min = -(n - 1) * stepPx;
    x.set(Math.max(min, Math.min(0, x.get() - e.deltaX)));
    window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(() => settle(Math.round(-x.get() / stepPx)), 90);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") settle(indexRef.current + 1);
    else if (e.key === "ArrowLeft") settle(indexRef.current - 1);
    else if (e.key === "Home") settle(0);
    else if (e.key === "End") settle(n - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-labelledby="work-title" onKeyDown={onKeyDown}>
      <div className="wrap flex flex-wrap items-end justify-between gap-s-3">
        {intro}
        <div className="flex items-center gap-4">
          <p className="font-mono text-small tabular-nums text-ink-2" aria-hidden="true">
            {index + 1} / {n}
          </p>
          <div className="flex gap-2">
            <button type="button" className="btn btn-icon" onClick={() => settle(indexRef.current - 1)} disabled={index === 0} aria-label="Previous project">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className="btn btn-icon" onClick={() => settle(indexRef.current + 1)} disabled={index === n - 1} aria-label="Next project">
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <p className="sr-only" aria-live="polite">
            Project {index + 1} of {n}: {items[index].title}
          </p>
        </div>
      </div>
      <div className="mt-s-6" />
      <div
        ref={viewport}
        data-cursor="drag"
        className="arc-viewport relative touch-pan-y select-none overflow-hidden"
        style={{ height }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onClickCapture={(e) => {
          if (performance.now() < drag.current.suppressUntil) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <motion.div
          className="absolute top-0"
          style={{ left: "50%", width: cardW, marginLeft: -cardW / 2, transformOrigin: `50% ${R}px`, rotate: rot }}
        >
          {items.map((p, i) => (
            <Slide
              key={p.id}
              p={p}
              i={i}
              n={n}
              rot={rot}
              stepDeg={stepDeg}
              R={R}
              active={i === index}
              onFocusIn={() => i !== indexRef.current && settle(i)}
              onMeasure={measure}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        .arc-viewport.is-dragging { cursor: grabbing; }
        .arc-viewport.is-dragging a { pointer-events: none; }
      `}</style>
    </div>
  );
}

function Slide({
  p,
  i,
  n,
  rot,
  stepDeg,
  R,
  active,
  onFocusIn,
  onMeasure,
}: {
  p: FeaturedProject;
  i: number;
  n: number;
  rot: MotionValue<number>;
  stepDeg: number;
  R: number;
  active: boolean;
  onFocusIn: () => void;
  onMeasure: (i: number, h: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const opacity = useTransform(rot, (r) => {
    const d = Math.abs(i * stepDeg + r) / stepDeg;
    return d < 0.5 ? 1 : Math.max(0.22, 1 - (d - 0.5) * 0.7);
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => onMeasure(i, el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [i, onMeasure]);

  return (
    <motion.div
      className="absolute left-0 top-0 w-full"
      style={{ transformOrigin: `50% ${R}px`, rotate: i * stepDeg, opacity }}
    >
      <article
        ref={ref}
        aria-roledescription="slide"
        aria-label={`${i + 1} of ${n}: ${p.title}`}
        onFocusCapture={onFocusIn}
        className="pb-2"
      >
        <div className="slide-media media-frame aspect-[2/1]" data-cursor={active ? "view" : "drag"}>
          <img
            src={p.image}
            alt={p.imageAlt}
            width={1600}
            height={800}
            loading={i < 2 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
          <span aria-hidden="true" className="sheen" />
        </div>
        <div className="grid gap-3 pt-s-2">
          <p className="font-mono text-small text-ink-3">
            {p.date}. {p.role}
          </p>
          <h3 className="text-h3 font-medium">{p.title}</h3>
          <p className="text-ink">{p.outcome}</p>
          <p className="max-w-measure text-ink-2">{p.summary}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Built with">
            {p.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
          {p.links.length > 0 ? (
            <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-1">
              {p.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-[44px] items-center font-mono text-small">
                    <ScrambleLabel text={l.label} />
                    <span aria-hidden="true">&nbsp;↗</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-mono text-small text-ink-3">{p.note}</p>
          )}
        </div>
      </article>
    </motion.div>
  );
}

/* ---------------- archive ---------------- */

const FIRST = 8;

function Archive() {
  const [all, setAll] = useState(false);
  const rows = all ? archive : archive.slice(0, FIRST);
  const group = useRevealGroup<HTMLUListElement>([all]);
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [preview, setPreview] = useState<ArchiveProject | null>(null);
  const px = useSpring(0, pointerSpring);
  const py = useSpring(0, pointerSpring);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const showPreview = fine && !reduce;

  return (
    <div className="mt-s-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-h3">More builds</h3>
        <p className="font-mono text-small text-ink-3">{archive.length} more projects, newest first</p>
      </div>

      <ul
        id="archive-list"
        ref={group}
        className="mt-s-3"
        onPointerMove={(e) => {
          if (!showPreview) return;
          px.set(e.clientX + 24);
          py.set(e.clientY - 80);
        }}
        onPointerLeave={() => setPreview(null)}
      >
        {rows.map((p, i) => (
          <li
            key={p.title}
            data-reveal
            data-reveal-index={i % 6}
            onPointerEnter={() => showPreview && setPreview(p.image ? p : null)}
            className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 px-2 py-4 transition-colors duration-fade ease-inout hover:bg-plate lg:grid-cols-[4.5rem_11rem_minmax(0,1fr)_13rem_9rem] lg:items-baseline"
          >
            <span className="font-mono text-small tabular-nums text-ink-3">{p.year}</span>
            <span className="font-medium text-ink">{p.title}</span>
            <span className="col-start-2 text-ink-2 lg:col-start-auto">{p.what}</span>
            <span className="col-start-2 font-mono text-small text-ink-3 lg:col-start-auto">{p.stack}</span>
            <span className="col-start-2 lg:col-start-auto">
              {p.link ? (
                <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-[44px] items-center font-mono text-small lg:min-h-0">
                  <ScrambleLabel text={p.link.label} />
                  <span aria-hidden="true">&nbsp;↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <span className="font-mono text-small text-ink-3">No public link</span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {archive.length > FIRST && (
        <button type="button" className="btn mt-s-3" aria-expanded={all} aria-controls="archive-list" onClick={() => setAll((v) => !v)}>
          <ScrambleLabel text={all ? "Show fewer" : `Show all ${archive.length}`} />
        </button>
      )}

      {showPreview && (
        <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-overlay" style={{ x: px, y: py }}>
          <AnimatePresence>
            {preview?.image && (
              <motion.div
                key={preview.image}
                className="media-frame absolute left-0 top-0 aspect-[2/1] w-[320px]"
                initial={{ opacity: 0.2, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: dur.enter / 1000, ease: fmEase.land } }}
                exit={{ opacity: 0, transition: { duration: dur.micro / 1000, ease: fmEase.exit } }}
              >
                <img src={preview.image} alt="" className="h-full w-full object-cover object-top" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
