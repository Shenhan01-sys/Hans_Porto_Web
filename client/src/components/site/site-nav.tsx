import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, person, socials } from "@/content/site";
import { useLenis, useScrollToSection } from "@/components/fx/smooth-scroll";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { dur, fmEase } from "@/lib/motion";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const scrollTo = useScrollToSection();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      menuButton.current?.focus();
    };
  }, [open, lenis]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollTo(id), open ? 50 : 0);
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[46] border-b transition-colors duration-fade ease-inout ${
          scrolled ? "border-line bg-ground" : "border-transparent bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        initial={false}
      >
        <nav aria-label="Main" className="wrap flex h-nav items-center justify-between gap-4">
          <a
            href="#top"
            onClick={(e) => go(e, "top")}
            className="flex min-h-[44px] items-center font-display text-small font-medium uppercase tracking-[0.06em]"
          >
            <ScrambleLabel text={person.name} />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative flex min-h-[44px] items-center px-3 font-display text-small uppercase tracking-[0.06em] transition-colors duration-fade ease-inout hover:text-ink ${
                      isActive ? "text-ink" : "text-ink-2"
                    }`}
                  >
                    <ScrambleLabel text={item.label} />
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-2 h-px origin-left bg-ink transition-transform duration-quick ease-land ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href={person.cv} target="_blank" rel="noopener noreferrer" className="btn hidden sm:inline-flex">
              <ScrambleLabel text="CV" /> <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <button
              ref={menuButton}
              type="button"
              className="btn lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[45] flex flex-col bg-ground lg:hidden"
            style={{
              paddingTop: "calc(var(--nav-h) + env(safe-area-inset-top, 0px))",
              paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
            }}
            initial={reduce ? false : { clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: dur.quick / 1000, ease: fmEase.land } }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { clipPath: "inset(0% 0% 100% 0%)", transition: { duration: dur.exit / 1000, ease: fmEase.exit } }}
          >
            <div className="wrap flex flex-1 flex-col justify-between gap-8">
              <ul className="grid gap-1 pt-6">
                {nav.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.a
                      ref={i === 0 ? firstLink : undefined}
                      href={`#${item.id}`}
                      onClick={(e) => go(e, item.id)}
                      className="block py-2 font-display text-h2"
                      initial={reduce ? false : { y: "100%" }}
                      animate={{ y: "0%", transition: { duration: dur.enter / 1000, ease: fmEase.land, delay: (i === 0 ? 0.1 : 0.1 + i * 0.067) } }}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <div className="grid gap-3">
                <a href={person.cv} target="_blank" rel="noopener noreferrer" className="btn justify-self-start">
                  Download CV <span aria-hidden="true">↗</span>
                </a>
                <p className="select-all font-mono text-small text-ink-2">{person.email}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-[44px] items-center font-mono text-small">
                        <ScrambleLabel text={s.label} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
