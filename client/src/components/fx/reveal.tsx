import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { animate, onScroll, utils } from "animejs";
import { animeEase, dur, siblingDelay } from "@/lib/motion";

/**
 * Image inside a clip mask: the mask opens left to right in 800ms while the image settles from 1.1x
 * in 1000ms, both on softLand (MASTER). Plays once at 90% of the viewport. Reduced motion: no change.
 */
export function RevealMedia({
  children,
  className,
  cursor,
}: {
  children: ReactNode;
  className?: string;
  cursor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const inner = el.querySelector<HTMLElement>("[data-reveal-inner]") ?? el.firstElementChild;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    utils.set(el, { clipPath: "inset(0% 100% 0% 0%)" });
    if (inner) utils.set(inner, { scale: 1.1 });
    let played = false;
    const observer = onScroll({
      target: el,
      enter: "bottom-=10% top",
      repeat: false,
      onEnter: () => {
        if (played) return;
        played = true;
        animate(el, { clipPath: ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"], duration: dur.long, ease: animeEase.land });
        if (inner) animate(inner, { scale: [1.1, 1], duration: dur.hero, ease: animeEase.land });
      },
    });
    return () => {
      observer.revert();
      utils.remove(el);
      if (inner) utils.remove(inner);
      el.style.clipPath = "";
      if (inner) (inner as HTMLElement).style.transform = "";
    };
  }, [reduce]);

  return (
    <div ref={ref} className={className} data-cursor={cursor}>
      {children}
    </div>
  );
}

/**
 * Children marked [data-reveal] rise into place when the group reaches 88% of the viewport:
 * y from 0.6em, opacity helper .2 to 1 in 200ms, 400ms on softLand, uneven sibling stagger.
 * Anything already on screen at mount stays put, so nothing flashes.
 */
export function useRevealGroup<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduce) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92,
    );
    if (!items.length) return;
    utils.set(items, { y: "0.6em", opacity: 0.2 });
    const played = new WeakSet<HTMLElement>();
    const observers = items.map((el, i) =>
      onScroll({
        target: el,
        enter: "bottom-=8% top",
        repeat: false,
        onEnter: () => {
          if (played.has(el)) return;
          played.add(el);
          const group = Number(el.dataset.revealIndex ?? i % 6);
          animate(el, {
            y: ["0.6em", "0em"],
            opacity: { from: 0.2, to: 1, duration: dur.fade, ease: "linear" },
            duration: dur.enter,
            delay: siblingDelay(group),
            ease: animeEase.land,
          });
        },
      }),
    );
    return () => {
      observers.forEach((o) => o.revert());
      utils.remove(items);
      items.forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, ...deps]);

  return ref;
}
