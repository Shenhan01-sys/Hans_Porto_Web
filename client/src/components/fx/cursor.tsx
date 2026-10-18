import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Two-square cursor (MASTER section 5): big 30px trails at .2, small 8px leads at .45, difference blend.
// Over a link or button the big square grows 4x; over [data-cursor="view|drag|open"] it turns violet and names the action.
// Mouse and trackpad only. Touch, pens and reduced motion keep the system pointer.

const TARGETS = "a, button, [data-cursor], input, textarea, select, summary, [role='button']";

export function Cursor() {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const big = useRef<HTMLDivElement>(null);
  const small = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFine(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const on = fine && !reduce;

  useEffect(() => {
    if (!on) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    let mx = -100;
    let my = -100;
    let bx = mx;
    let by = my;
    let sx = mx;
    let sy = my;
    let lx = mx;
    let ly = my;
    let raf = 0;
    let seen = false;

    const loop = () => {
      bx += (mx - 15 - bx) * 0.2;
      by += (my - 15 - by) * 0.2;
      sx += (mx - 4 - sx) * 0.45;
      sy += (my - 4 - sy) * 0.45;
      lx += (mx - 60 - lx) * 0.2;
      ly += (my - 9 - ly) * 0.2;
      if (big.current) big.current.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
      if (small.current) small.current.style.transform = `translate3d(${sx}px, ${sy}px, 0)`;
      if (label.current) label.current.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const setState = (el: Element | null) => {
      const target = el?.closest(TARGETS) ?? null;
      const named = target?.getAttribute("data-cursor") ?? "";
      big.current?.classList.toggle("is-hover", !!target);
      big.current?.classList.toggle("is-labelled", !!named);
      small.current?.classList.toggle("is-hidden", !!named);
      label.current?.classList.toggle("is-on", !!named);
      if (named && text.current) text.current.textContent = named.toUpperCase();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx = e.clientX;
      my = e.clientY;
      if (!seen) {
        seen = true;
        bx = sx = mx;
        by = sy = my;
        lx = mx - 60;
        ly = my - 9;
        big.current?.classList.add("is-seen");
        small.current?.classList.add("is-seen");
      }
      setState(e.target as Element);
    };
    const onLeave = () => {
      big.current?.classList.remove("is-seen");
      small.current?.classList.remove("is-seen");
      seen = false;
    };
    const onDown = () => setState(null);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [on]);

  if (!on) return null;

  return (
    <>
      <div ref={big} aria-hidden="true" className="cursor-big">
        <div className="cursor-sq" />
      </div>
      <div ref={small} aria-hidden="true" className="cursor-small">
        <div className="cursor-sq" />
      </div>
      <div ref={label} aria-hidden="true" className="cursor-label">
        <span ref={text} />
      </div>
      <style>{`
        .cursor-big, .cursor-small, .cursor-label { position: fixed; top: 0; left: 0; z-index: 50; pointer-events: none; will-change: transform; }
        .cursor-big, .cursor-small { mix-blend-mode: difference; opacity: 0; transition: opacity var(--dur-fade) var(--ease-inout); }
        .cursor-big.is-seen, .cursor-small.is-seen { opacity: 1; }
        .cursor-big .cursor-sq { width: 30px; height: 30px; background: rgb(var(--ink)); transition: transform var(--dur-quick) var(--ease-land), background-color var(--dur-fade) var(--ease-inout); }
        .cursor-big.is-hover .cursor-sq { transform: scale(4); }
        .cursor-big.is-labelled { mix-blend-mode: normal; }
        .cursor-big.is-labelled .cursor-sq { background: rgb(var(--violet)); }
        .cursor-small .cursor-sq { width: 8px; height: 8px; background: rgb(var(--ink)); transition: transform var(--dur-fade) var(--ease-land); }
        .cursor-small.is-hidden .cursor-sq { transform: scale(0.01); }
        .cursor-label span { display: block; width: 120px; text-align: center; font-family: var(--font-display); font-weight: 500; font-size: 13px; letter-spacing: .06em; color: rgb(var(--ink)); opacity: 0; transition: opacity var(--dur-fade) var(--ease-inout); }
        .cursor-label.is-on span { opacity: 1; }
      `}</style>
    </>
  );
}
