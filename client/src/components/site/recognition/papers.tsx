import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { asset, publications, type Paper } from "@/content/site";
import { dur, fmEase } from "@/lib/motion";

// Three papers lie stacked on the desk and fan out as the block scrolls into view (scrubbed, linear).
// The list and the sheets are linked: pointing at either brings that paper to the front.
// The first page of each paper is the real page; the ICIC-APTIKOM paper, which has no public PDF yet,
// gets a typeset title page with its real title, venue and the Applify screen as Figure 1.

export function Papers() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start 0.9", "center 0.5"] });
  const spread = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <div className="mt-section grid gap-s-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
      <div className="min-w-0">
        <h3 className="font-display text-h3">Papers</h3>
        <ol className="mt-s-3 grid gap-s-3">
          {publications.map((p, i) => (
            <li
              key={p.title}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocusCapture={() => setActive(i)}
              onBlurCapture={() => setActive(null)}
              className={`grid gap-1 border-l-2 pl-s-2 transition-colors duration-fade ease-inout ${active === i ? "border-violet-hi" : "border-line"}`}
            >
              <span className="font-mono text-small text-ink-3">
                {p.year}. {p.venue}
              </span>
              <span className="text-ink">{p.title}</span>
              <span className="text-ink-2">{p.role}</span>
              {p.link && (
                <a
                  href={p.link.href.startsWith("/") ? asset(p.link.href) : p.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex min-h-[44px] items-center justify-self-start font-mono text-small"
                >
                  <ScrambleLabel text={p.link.label} />
                  <span aria-hidden="true">&nbsp;↗</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div ref={stage} aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[760px]">
        {publications.map((p, i) => (
          <Sheet key={p.title} p={p} i={i} n={publications.length} spread={spread} active={active} onHover={setActive} />
        ))}
      </div>
    </div>
  );
}

function Sheet({
  p,
  i,
  n,
  spread,
  active,
  onHover,
}: {
  p: Paper;
  i: number;
  n: number;
  spread: MotionValue<number>;
  active: number | null;
  onHover: (i: number | null) => void;
}) {
  const offset = i - (n - 1) / 2; // -1, 0, 1
  const x = useTransform(spread, [0, 1], ["0%", `${offset * 62}%`]);
  const y = useTransform(spread, [0, 1], [`${i * 2}%`, `${Math.abs(offset) * 7}%`]);
  const rotate = useTransform(spread, [0, 1], [offset * 3, offset * 8]);
  const lifted = active === i;

  return (
    <motion.div
      className="absolute left-[28%] top-[6%] w-[44%]"
      style={{ x, y, rotate, zIndex: lifted ? 10 : i === 1 ? 3 : 2 }}
      onPointerEnter={() => onHover(i)}
      onPointerLeave={() => onHover(null)}
    >
      <motion.div
        className="relative aspect-[1/1.414] overflow-hidden border border-line bg-ink"
        animate={{ y: lifted ? -18 : 0, scale: lifted ? 1.04 : 1 }}
        transition={{ duration: dur.quick / 1000, ease: fmEase.land }}
      >
        {p.page ? (
          <img src={p.page} alt="" loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover object-top" />
        ) : (
          <TitlePage p={p} />
        )}
        <span className={`absolute inset-0 transition-colors duration-fade ease-inout ${lifted ? "bg-transparent" : "bg-ground/25"}`} />
      </motion.div>
    </motion.div>
  );
}

function TitlePage({ p }: { p: Paper }) {
  return (
    <div className="flex h-full flex-col gap-[4%] p-[8%] text-ground">
      <p className="font-mono text-[clamp(7px,0.6vw,12px)] uppercase tracking-[0.06em]">{p.venue}</p>
      <p className="text-[clamp(10px,1.05vw,22px)] font-medium leading-tight">{p.title}</p>
      <p className="text-[clamp(7px,0.65vw,13px)]">Hans Gunawan, first author</p>
      {p.figure && (
        <figure className="mt-[2%] grid gap-1">
          <img src={p.figure} alt="" className="aspect-[2/1] w-full border border-ground/20 object-cover object-top" />
          <figcaption className="font-mono text-[clamp(6px,0.55vw,11px)]">Fig. 1. Applify, the agent described in the paper.</figcaption>
        </figure>
      )}
      <p className="mt-auto font-mono text-[clamp(6px,0.55vw,11px)]">Accepted for oral presentation, 2026</p>
    </div>
  );
}
