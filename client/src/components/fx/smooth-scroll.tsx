import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

/** Lenis smooth scroll (MASTER: duration 1.2). Never created when the visitor asked for less motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reduce) return;
    const instance = new Lenis({ duration: 1.2, smoothWheel: true, syncTouch: false, autoRaf: true });
    setLenis(instance);
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, [reduce]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}

/** Scroll to a section, then move focus to it so keyboard and screen-reader users land there too. */
export function useScrollToSection() {
  const lenis = useLenis();
  const reduce = useReducedMotion();

  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const focus = () => {
        const target = (el.querySelector("h2, h1") as HTMLElement | null) ?? el;
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      if (lenis) {
        lenis.scrollTo(el, { offset: -72, onComplete: focus });
      } else {
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        window.setTimeout(focus, reduce ? 0 : 600);
      }
      if (history.replaceState) history.replaceState(null, "", `#${id}`);
    },
    [lenis, reduce],
  );
}
