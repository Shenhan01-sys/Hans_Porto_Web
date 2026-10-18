import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { asset, certificates } from "@/content/site";

// Certificates on a shelf that scrolls sideways. It is a real scroll container, so touch swipes,
// trackpads, the keyboard and screen readers all work natively; a mouse can also drag it, with
// momentum. Cards ride a shallow wave by their distance from the centre, echoing the work arc.
// Reduced motion: no wave, no momentum.

export function CertificateShelf() {
  const shelf = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();

  // depth wave
  useEffect(() => {
    const el = shelf.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    if (reduce) {
      cards.forEach((c) => (c.style.transform = ""));
      return;
    }
    let raf = 0;
    const paint = () => {
      raf = 0;
      const box = el.getBoundingClientRect();
      const mid = box.left + box.width / 2;
      for (const c of cards) {
        const r = c.getBoundingClientRect();
        const d = Math.max(-1.4, Math.min(1.4, (r.left + r.width / 2 - mid) / (box.width / 2)));
        c.style.transform = `translate3d(0, ${Math.abs(d) * 22}px, 0) rotate(${d * 3.5}deg) scale(${1 - Math.abs(d) * 0.06})`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    el.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reduce]);

  // mouse drag with momentum; touch keeps native scrolling
  useEffect(() => {
    const el = shelf.current;
    if (!el) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    let lastX = 0;
    let lastT = 0;
    let v = 0;
    let raf = 0;
    let suppressUntil = 0;

    const glide = () => {
      v *= 0.94;
      el.scrollLeft -= v * 16;
      if (Math.abs(v) > 0.02) raf = requestAnimationFrame(glide);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      cancelAnimationFrame(raf);
      down = true;
      moved = false;
      startX = lastX = e.clientX;
      startLeft = el.scrollLeft;
      lastT = performance.now();
      v = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) < 6) return;
      if (!moved) {
        moved = true;
        el.setPointerCapture(e.pointerId);
        el.classList.add("is-dragging");
      }
      el.scrollLeft = startLeft - dx;
      const now = performance.now();
      const dt = now - lastT;
      if (dt > 0) v = 0.8 * v + 0.2 * ((e.clientX - lastX) / dt);
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      if (!moved) return;
      el.releasePointerCapture?.(e.pointerId);
      el.classList.remove("is-dragging");
      suppressUntil = performance.now() + 150;
      if (!reduce) raf = requestAnimationFrame(glide);
    };
    const onClick = (e: MouseEvent) => {
      if (performance.now() < suppressUntil) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [reduce]);

  const step = (dir: number) => {
    const el = shelf.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 24), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="mt-section">
      <div className="wrap flex flex-wrap items-end justify-between gap-s-2">
        <div className="grid gap-2">
          <h3 className="font-display text-h3">Certificates</h3>
          <p className="max-w-[44ch] text-ink-2">{certificates.length} certificates. Drag the shelf, swipe it, or use the arrows. Each opens its PDF.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-icon" aria-label="Previous certificates" onClick={() => step(-1)}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="btn btn-icon" aria-label="Next certificates" onClick={() => step(1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <ul
        ref={shelf}
        tabIndex={0}
        aria-label="Certificates"
        data-cursor="drag"
        className="shelf mt-s-4 flex select-none snap-x gap-s-3 overflow-x-auto pb-s-6 pt-s-2"
        style={{
          paddingLeft: "max(var(--gutter), env(safe-area-inset-left, 0px))",
          paddingRight: "max(var(--gutter), env(safe-area-inset-right, 0px))",
          scrollPaddingLeft: "max(var(--gutter), env(safe-area-inset-left, 0px))",
        }}
      >
        {certificates.map((c) => (
          <li key={c.title} data-card className="w-[min(72vw,320px)] shrink-0 snap-start will-change-transform">
            <a href={asset(c.href)} target="_blank" rel="noopener noreferrer" data-cursor="open" draggable={false} className="group grid gap-3">
              <div className="relative aspect-[1.414/1] overflow-hidden border border-line bg-ink transition-[border-color,transform] duration-quick ease-land group-hover:-translate-y-2 group-hover:border-violet-hi group-focus-visible:-translate-y-2">
                <img src={c.thumb} alt="" loading="lazy" decoding="async" draggable={false} className="h-full w-full object-contain" />
                <span aria-hidden="true" className="sheen" />
              </div>
              <span className="text-ink">{c.title}</span>
              <span className="font-mono text-small text-ink-3">
                {c.issuer}, {c.year}. <ScrambleLabel text="PDF" />
                <span aria-hidden="true"> ↗</span>
                <span className="sr-only">, opens in a new tab</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
