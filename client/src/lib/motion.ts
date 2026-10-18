import { cubicBezier } from "animejs";

// Motion tokens. Mirror of MASTER.md section 5; change both together.

export const dur = {
  press: 67,
  micro: 133,
  fade: 200,
  quick: 333,
  enter: 400,
  exit: 433,
  long: 800,
  hero: 1000,
} as const;

type Bezier = readonly [number, number, number, number];

export const bezier = {
  land: [0.22, 0.78, 0.51, 0.94],
  snap: [0.13, 1.06, 0.31, 0.94],
  glide: [0.53, 0.91, 0.89, 1],
  inout: [0.34, 0.07, 0.66, 0.93],
  exit: [0.29, 0, 0.63, 0.04],
} as const satisfies Record<string, Bezier>;

/** framer-motion takes the arrays directly. */
export const fmEase = {
  land: [...bezier.land] as [number, number, number, number],
  snap: [...bezier.snap] as [number, number, number, number],
  glide: [...bezier.glide] as [number, number, number, number],
  inout: [...bezier.inout] as [number, number, number, number],
  exit: [...bezier.exit] as [number, number, number, number],
};

/** anime.js needs ease functions: framer-style ease strings silently run linear there. */
export const animeEase = {
  land: cubicBezier(...bezier.land),
  snap: cubicBezier(...bezier.snap),
  glide: cubicBezier(...bezier.glide),
  inout: cubicBezier(...bezier.inout),
  exit: cubicBezier(...bezier.exit),
};

/** Same spring as the hairline figures, so pointer-follow UI and figures move alike. */
export const pointerSpring = { type: "spring", stiffness: 100, damping: 18, mass: 1 } as const;

/** Sibling stagger from MASTER: 100ms, then 67ms per item, whole wave capped at 600ms. */
export function siblingDelay(index: number): number {
  if (index <= 0) return 0;
  return Math.min(600, 100 + (index - 1) * 67);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Cubic bezier evaluator for canvas work (intro tiles), where we drive progress by hand. */
export function bezierFn([x1, y1, x2, y2]: Bezier): (x: number) => number {
  const a = (p1: number, p2: number) => 1 - 3 * p2 + 3 * p1;
  const b = (p1: number, p2: number) => 3 * p2 - 6 * p1;
  const c = (p1: number) => 3 * p1;
  const calc = (t: number, p1: number, p2: number) => ((a(p1, p2) * t + b(p1, p2)) * t + c(p1)) * t;
  const slope = (t: number, p1: number, p2: number) => 3 * a(p1, p2) * t * t + 2 * b(p1, p2) * t + c(p1);
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const s = slope(t, x1, x2);
      if (Math.abs(s) < 1e-6) break;
      t -= (calc(t, x1, x2) - x) / s;
    }
    t = Math.min(1, Math.max(0, t));
    return calc(t, y1, y2);
  };
}
