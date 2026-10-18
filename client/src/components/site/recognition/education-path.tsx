import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { education } from "@/content/site";

// Education as a path, oldest first. A line winds between the school marks and draws itself as the
// block scrolls (scrubbed, linear). Each mark lights up when the line reaches it. On phones the
// marks sit in one column and the line runs straight down. Reduced motion: the line is fully drawn.
// Marks alternate left and right of the centre on wide screens, so the line winds.

interface Pt {
  x: number;
  y: number;
}

export function EducationPath() {
  const box = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();
  const [geo, setGeo] = useState<{ d: string; w: number; h: number; marks: number[] }>({ d: "", w: 0, h: 0, marks: [] });
  const [lit, setLit] = useState(reduce ? education.length : 0);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const build = () => {
      const b = el.getBoundingClientRect();
      const pts: Pt[] = tiles.current
        .filter(Boolean)
        .map((t) => {
          const r = t!.getBoundingClientRect();
          return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 };
        });
      if (!pts.length) return;
      let d = `M ${pts[0].x} 0 L ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const c = pts[i];
        const dy = (c.y - a.y) / 2;
        d += ` C ${a.x} ${a.y + dy} ${c.x} ${c.y - dy} ${c.x} ${c.y}`;
      }
      d += ` L ${pts[pts.length - 1].x} ${b.height}`;
      setGeo({ d, w: b.width, h: b.height, marks: pts.map((p) => p.y / b.height) });
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: box, offset: ["start 0.75", "end 0.65"] });
  const draw = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  useMotionValueEvent(draw, "change", (p) => {
    const n = geo.marks.filter((m) => p >= m - 0.02).length;
    if (n !== lit) setLit(n);
  });

  return (
    <div className="mt-section">
      <div className="flex flex-wrap items-end justify-between gap-s-2">
        <h3 className="font-display text-h3">Education</h3>
        <p className="max-w-[44ch] text-ink-2">From a Jesuit school in Yogyakarta to a Uniswap incubator.</p>
      </div>

      <div ref={box} className="relative mt-s-6">
        {geo.d && (
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${geo.w} ${geo.h}`} preserveAspectRatio="none">
            <path d={geo.d} fill="none" stroke="rgb(var(--line))" strokeWidth="1" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
            <motion.path d={geo.d} fill="none" stroke="rgb(var(--violet-hi))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" style={{ pathLength: draw }} />
          </svg>
        )}

        <ol className="relative grid gap-s-8">
          {education.map((e, i) => {
            const right = i % 2 === 1;
            const on = i < lit;
            return (
              <li
                key={e.school}
                className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-x-s-4 gap-y-s-2 md:grid-cols-[minmax(0,1fr)_240px_minmax(0,1fr)] md:gap-x-s-2"
              >
                <div
                  ref={(el) => (tiles.current[i] = el)}
                  className={`relative aspect-square w-[88px] overflow-hidden border transition-[border-color,transform] duration-enter ease-land md:col-start-2 md:w-[112px] md:justify-self-center ${
                    right ? "md:translate-x-14" : "md:-translate-x-14"
                  } ${
                    on ? "scale-100 border-violet-hi" : "scale-[0.94] border-line"
                  } ${e.kind === "mark" ? "bg-ink p-[14%]" : "bg-plate"}`}
                >
                  <img
                    src={e.logo}
                    alt={e.logoAlt}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full ${e.kind === "mark" ? "object-contain" : "object-cover"}`}
                  />
                </div>
                <div className={`min-w-0 md:row-start-1 ${right ? "md:col-start-3" : "md:col-start-1 md:text-right"}`}>
                  <p className={`font-mono text-small transition-colors duration-fade ease-inout ${on ? "text-arrive" : "text-ink-3"}`}>{e.years}</p>
                  <h4 className="mt-1 text-[clamp(19px,1.4vw,52px)] leading-snug text-ink">{e.school}</h4>
                  <p className={`mt-1 max-w-[46ch] text-ink-2 ${right ? "" : "md:ml-auto"}`}>{e.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
