import { useEffect, useRef, useState } from "react";
import type { Figure, HairlineOptions } from "@lucasmarkes/hairline";
import type { FigureName } from "@/content/site";

// Line-art figures from @lucasmarkes/hairline. Vanilla named imports keep each figure about 7 kB;
// the module loads only when the figure comes within 400px of the viewport. The figures handle
// reduced motion themselves and share one frame loop that sleeps offscreen.

type Mount = (el: HTMLElement, options?: HairlineOptions) => Figure;

const loaders: Record<FigureName, () => Promise<Mount>> = {
  hub: () => import("@lucasmarkes/hairline").then((m) => m.hub),
  vault: () => import("@lucasmarkes/hairline").then((m) => m.vault),
  terminal: () => import("@lucasmarkes/hairline").then((m) => m.terminal),
  cabinet: () => import("@lucasmarkes/hairline").then((m) => m.cabinet),
  stack: () => import("@lucasmarkes/hairline").then((m) => m.stack),
  riffle: () => import("@lucasmarkes/hairline").then((m) => m.riffle),
  plug: () => import("@lucasmarkes/hairline").then((m) => m.plug),
};

export function Hairline({
  figure,
  label,
  play = true,
  intensity = 0.6,
  className,
  onPlate = false,
}: {
  figure: FigureName;
  label: string;
  play?: boolean;
  intensity?: number;
  className?: string;
  onPlate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fig = useRef<Figure | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!near || !el) return;
    let cancelled = false;
    loaders[figure]().then((mount) => {
      if (cancelled || !ref.current) return;
      fig.current = mount(ref.current, { label, play, intensity, theme: "dark" });
    });
    return () => {
      cancelled = true;
      fig.current?.destroy();
      fig.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [near, figure]);

  useEffect(() => {
    fig.current?.update({ label, play, intensity, theme: "dark" });
  }, [label, play, intensity]);

  return (
    <div
      ref={ref}
      className={`hl-violet ${onPlate ? "on-plate" : ""} ${className ?? ""}`}
      style={{ aspectRatio: "5 / 4" }}
      role="img"
      aria-label={label}
    />
  );
}
