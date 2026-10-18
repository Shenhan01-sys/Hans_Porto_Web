import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { randomGlyph } from "@/components/fx/text";

/**
 * Link and button label that scrambles for 400ms when its link or button is hovered; each character
 * settles at a random moment between 40 and 320ms (MASTER, link hover). The accessible name never changes.
 */
export function ScrambleLabel({ text }: { text: string }) {
  const [shown, setShown] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => setShown(text), [text]);

  useEffect(() => {
    const host = ref.current?.closest("a, button");
    if (!host || reduce) return;
    let raf = 0;
    const run = () => {
      if (busy.current) return;
      busy.current = true;
      const settle = text.split("").map(() => 40 + Math.random() * 280);
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = now - t0;
        let out = "";
        for (let i = 0; i < text.length; i++) out += t >= settle[i] || text[i] === " " ? text[i] : randomGlyph(text[i]);
        setShown(out);
        if (t < 400) raf = requestAnimationFrame(tick);
        else {
          setShown(text);
          busy.current = false;
        }
      };
      raf = requestAnimationFrame(tick);
    };
    host.addEventListener("mouseenter", run);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("mouseenter", run);
      busy.current = false;
    };
  }, [text, reduce]);

  return (
    <span ref={ref} className="relative">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
