import { useEffect, useState } from "react";

/** True once the hero (#top) has scrolled above 65% of the viewport, or when the page has no hero. */
export function usePastHero() {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) {
      setPast(true);
      return;
    }
    let raf = 0;
    const check = () => {
      raf = 0;
      setPast(hero.getBoundingClientRect().bottom < window.innerHeight * 0.65);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return past;
}
