import { createElement, useEffect, useRef, type ElementType } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { onScroll, splitText } from "animejs";

const UP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LO = "abcdefghijklmnopqrstuvwxyz";
const DG = "0123456789";

export function randomGlyph(ch: string) {
  if (/[A-Z]/.test(ch)) return UP[(Math.random() * 26) | 0];
  if (/[a-z]/.test(ch)) return LO[(Math.random() * 26) | 0];
  if (/[0-9]/.test(ch)) return DG[(Math.random() * 10) | 0];
  return ch;
}

/**
 * Section heading that decodes itself when it reaches 85% of the viewport (MASTER: per char opacity .1 to 1
 * in 100ms from i x 20ms, random glyphs for 400ms). anime.js splits the text and keeps a readable copy
 * for screen readers; onScroll triggers it once. The resting state is the final text.
 */
export function ScrambleHeading({
  as = "h2",
  children,
  className,
  id,
}: {
  as?: ElementType;
  children: string;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const split = splitText(el, { words: true, chars: true });
    const chars = split.chars as HTMLElement[];
    const originals = chars.map((c) => c.textContent ?? "");
    let raf = 0;
    let played = false;

    const play = () => {
      if (played) return;
      played = true;
      const t0 = performance.now();
      chars.forEach((c) => (c.style.opacity = "0.1"));
      const tick = (now: number) => {
        const t = now - t0;
        let done = true;
        for (let i = 0; i < chars.length; i++) {
          const local = t - i * 20;
          if (local < 0) {
            done = false;
            continue;
          }
          chars[i].style.opacity = String(Math.min(1, 0.1 + (0.9 * local) / 100));
          if (local < 400) {
            done = false;
            chars[i].textContent = randomGlyph(originals[i]);
          } else chars[i].textContent = originals[i];
        }
        if (!done) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = onScroll({ target: el, enter: "bottom-=15% top", repeat: false, onEnter: play });
    return () => {
      cancelAnimationFrame(raf);
      observer.revert();
      split.revert();
    };
  }, [reduce, children]);

  return createElement(as, { ref, className, id }, children);
}

/**
 * The lede colours itself character by character as it scrolls from 70% to 30% of the viewport
 * (MASTER: ghost #3C096C to ink, stagger .02, duration .4 in timeline units). framer-motion reads the
 * scroll; anime.js only splits. Reduced motion: plain ink text.
 */
export function ScrollLede({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const chars = useRef<HTMLElement[]>([]);
  const last = useRef<number[]>([]);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "start 0.3"] });

  const GHOST = [60, 9, 108];
  const INK = [252, 250, 255];

  const paint = (p: number) => {
    const list = chars.current;
    const n = list.length;
    if (!n) return;
    const STAG = 0.02;
    const DUR = 0.4;
    const t = p * (n * STAG + DUR);
    for (let i = 0; i < n; i++) {
      let a = Math.min(1, Math.max(0, (t - i * STAG) / DUR));
      a = Math.round(a * 40) / 40;
      if (last.current[i] === a) continue;
      last.current[i] = a;
      list[i].style.color = `rgb(${Math.round(GHOST[0] + (INK[0] - GHOST[0]) * a)},${Math.round(GHOST[1] + (INK[1] - GHOST[1]) * a)},${Math.round(GHOST[2] + (INK[2] - GHOST[2]) * a)})`;
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const split = splitText(el, { words: true, chars: true });
    chars.current = split.chars as HTMLElement[];
    last.current = [];
    paint(scrollYProgress.get());
    return () => {
      chars.current = [];
      split.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, text]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!reduce) paint(p);
  });

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
