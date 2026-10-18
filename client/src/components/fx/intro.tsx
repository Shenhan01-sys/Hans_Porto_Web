import { useEffect, useRef, useState } from "react";
import { bezier, bezierFn, prefersReducedMotion } from "@/lib/motion";

// Tile-wipe intro, on every load (MASTER section 5). Two layers of tiles: Deep Night on top,
// Electric violet 200ms behind it; each tile shrinks toward its bottom-right corner on softLand
// along a diagonal wave, and the page arrives underneath. Any key, click or wheel skips it.

const CELL_MS = 1000;
const WAVE_MS = 1200;
const LAG_MS = 200;
const END_MS = WAVE_MS + LAG_MS + CELL_MS;
const LAYERS = [
  { color: "#7F00FF", lag: LAG_MS },
  { color: "#240046", lag: 0 },
];

export const INTRO_EVENT = "hg:intro-reveal";

function reveal(instant: boolean) {
  if (document.documentElement.dataset.introRevealed === "1") return;
  document.documentElement.dataset.introRevealed = "1";
  window.dispatchEvent(new CustomEvent(INTRO_EVENT, { detail: { instant } }));
}

export function Intro() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(() => !document.documentElement.classList.contains("intro-pending"));

  useEffect(() => {
    const root = document.documentElement;
    if (done) {
      root.classList.remove("intro-pending");
      reveal(true);
      return;
    }
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || prefersReducedMotion()) {
      finish(true);
      return;
    }
    const ease = bezierFn(bezier.land);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const cols = w < 640 ? 10 : 24;
    const rows = Math.max(6, Math.round((cols * h) / w));
    const cw = canvas.width / cols;
    const ch = canvas.height / rows;
    const span = cols - 1 + rows - 1;

    const drawAt = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const layer of LAYERS) {
        ctx.fillStyle = layer.color;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const delay = ((x + y) / span) * WAVE_MS + layer.lag;
            const p = ease(Math.min(1, Math.max(0, (t - delay) / CELL_MS)));
            const s = 1.05 * (1 - p);
            if (s <= 0.001) continue;
            const right = (x + 1) * cw;
            const bottom = (y + 1) * ch;
            ctx.fillRect(right - cw * s, bottom - ch * s, cw * s + 0.5, ch * s + 0.5);
          }
        }
      }
    };

    drawAt(0);
    root.classList.remove("intro-pending");
    let raf = 0;
    let t0 = 0;
    let fired = false;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const t = now - t0;
      if (!fired && t > 120) {
        fired = true;
        reveal(false);
      }
      drawAt(t);
      if (t < END_MS) raf = requestAnimationFrame(tick);
      else finish(false);
    };
    // Let fonts settle for one frame so the hero lines arrive set in Geist, not the fallback.
    const start = window.setTimeout(() => (raf = requestAnimationFrame(tick)), 60);

    const skip = () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(start);
      if (!fired) reveal(true);
      finish(false);
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    window.addEventListener("touchstart", skip, { once: true, passive: true });

    function finish(instant: boolean) {
      root.classList.remove("intro-pending");
      if (instant) reveal(true);
      setDone(true);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(start);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 z-intro h-full w-full" />;
}
