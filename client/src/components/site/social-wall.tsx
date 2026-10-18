import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRevealGroup } from "@/components/fx/reveal";
import { useLenis } from "@/components/fx/smooth-scroll";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { embeds, type Embed } from "@/content/site";
import { dur, fmEase } from "@/lib/motion";

// A wall of covers saved on this site, so nothing is requested from the networks until a visitor
// opens a post. Opening one shows it in a dialog: focus moves in, Escape closes, focus returns.

declare global {
  interface Window {
    twttr?: { widgets: { load: (el?: HTMLElement) => void } };
    instgrm?: { Embeds: { process: (el?: HTMLElement) => void } };
  }
}

const SOURCE: Record<Embed["kind"], string> = { youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok", linkedin: "LinkedIn", x: "X" };
const VIDEO = (e: Embed) => e.kind === "youtube" || e.kind === "tiktok" || e.shape === "tall";
const ASPECT: Record<Embed["shape"], string> = { square: "aspect-square", tall: "aspect-[3/4]", wide: "aspect-video", text: "aspect-[4/3]" };

const fmt = (d?: string) => (d ? (d.length === 4 ? d : new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })) : "");

function href(e: Embed) {
  if (e.kind === "youtube") return `https://www.youtube.com/watch?v=${e.id}${e.start ? `&t=${e.start}s` : ""}`;
  if (e.kind === "instagram") return e.url;
  if (e.kind === "tiktok") return `https://www.tiktok.com/@${e.user}/video/${e.id}`;
  if (e.kind === "linkedin") return `https://www.linkedin.com/feed/update/${e.urn}`;
  return e.url;
}

export function SocialWall() {
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const wall = useRevealGroup<HTMLUListElement>();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-s-2">
        <h3 className="font-display text-h3">From social media</h3>
        <p className="max-w-[46ch] text-ink-2">Covers are stored here. A post loads from its network only when you open it.</p>
      </div>

      <ul ref={wall} className="mt-s-4 columns-1 gap-s-3 sm:columns-2 lg:columns-3">
        {embeds.map((e, i) => (
          <li key={`${e.kind}-${e.title}`} data-reveal data-reveal-index={i % 6} className="mb-s-3 break-inside-avoid">
            <button
              type="button"
              data-cursor={VIDEO(e) ? "play" : "view"}
              onClick={(ev) => {
                opener.current = ev.currentTarget;
                setOpen(i);
              }}
              className="group grid w-full gap-3 text-left"
              aria-haspopup="dialog"
            >
              <div className={`relative overflow-hidden border border-line bg-plate transition-colors duration-fade ease-inout group-hover:border-violet-hi ${ASPECT[e.shape]}`}>
                {e.cover ? (
                  <img
                    src={e.cover}
                    alt={e.coverAlt ?? ""}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-long ease-land group-hover:scale-[1.04]"
                  />
                ) : (
                  <span aria-hidden="true" className="outline-num absolute inset-0 grid place-items-center text-[clamp(56px,7vw,140px)] leading-none">
                    {SOURCE[e.kind]}
                  </span>
                )}
                {VIDEO(e) && e.cover && (
                  <span aria-hidden="true" className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center bg-ground text-ink">
                    ▶
                  </span>
                )}
                <span aria-hidden="true" className="sheen" />
              </div>
              <span className="font-mono text-small text-ink-3">
                {SOURCE[e.kind]}
                {e.date ? `, ${fmt(e.date)}` : ""}
              </span>
              <span className="text-ink transition-colors duration-fade ease-inout group-hover:text-arrive">{e.title}</span>
            </button>
          </li>
        ))}
      </ul>

      <PostDialog
        embed={open === null ? null : embeds[open]}
        onClose={() => {
          setOpen(null);
          window.setTimeout(() => opener.current?.focus(), 0);
        }}
      />
    </div>
  );
}

function PostDialog({ embed, onClose }: { embed: Embed | null; onClose: () => void }) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!embed) return;
    lenis?.stop();
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [embed, lenis, onClose]);

  return (
    <AnimatePresence>
      {embed && (
        <motion.div
          key="dialog"
          className="fixed inset-0 z-[47] flex items-end justify-center bg-ground/90 p-4 sm:items-center"
          style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: dur.micro / 1000 } }}
          exit={{ opacity: 0, transition: { duration: dur.micro / 1000 } }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="post-title"
            data-lenis-prevent
            className="flex max-h-[88svh] w-full max-w-[600px] flex-col border border-line bg-plate"
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: dur.quick / 1000, ease: fmEase.land } }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { clipPath: "inset(100% 0% 0% 0%)", transition: { duration: dur.exit / 1000, ease: fmEase.exit } }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-line p-4">
              <div className="grid gap-1">
                <p className="font-mono text-small text-ink-3">
                  {SOURCE[embed.kind]}
                  {embed.date ? `, ${fmt(embed.date)}` : ""}
                </p>
                <h4 id="post-title" className="text-ink">
                  {embed.title}
                </h4>
              </div>
              <button ref={close} type="button" className="btn btn-icon btn-ghost shrink-0" aria-label="Close post" onClick={onClose}>
                <span aria-hidden="true">✕</span>
              </button>
            </div>
            <div className="min-h-[240px] overflow-y-auto p-4">
              <EmbedFrame embed={embed} />
            </div>
            <div className="border-t border-line p-4">
              <a href={href(embed)} target="_blank" rel="noopener noreferrer" className="link inline-flex min-h-[44px] items-center font-mono text-small">
                <ScrambleLabel text={`Open on ${SOURCE[embed.kind]}`} />
                <span aria-hidden="true">&nbsp;↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function loadScript(src: string, onload: () => void) {
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
  if (existing) {
    if (existing.dataset.loaded) onload();
    else existing.addEventListener("load", onload, { once: true });
    return;
  }
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  s.addEventListener("load", () => {
    s.dataset.loaded = "1";
    onload();
  });
  document.body.appendChild(s);
}

function EmbedFrame({ embed }: { embed: Embed }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (embed.kind === "instagram") {
      el.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${embed.url}" data-instgrm-version="14" style="max-width:540px;min-width:260px;width:100%;margin:0 auto"></blockquote>`;
      loadScript("https://www.instagram.com/embed.js", () => window.instgrm?.Embeds.process(el));
    } else if (embed.kind === "tiktok") {
      el.innerHTML = `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${embed.user}/video/${embed.id}" data-video-id="${embed.id}" style="max-width:605px;min-width:260px;margin:0 auto"><section></section></blockquote>`;
      loadScript("https://www.tiktok.com/embed.js", () => undefined);
    } else if (embed.kind === "x") {
      el.innerHTML = `<blockquote class="twitter-tweet" data-theme="dark" data-dnt="true"><a href="${embed.url}"></a></blockquote>`;
      loadScript("https://platform.twitter.com/widgets.js", () => window.twttr?.widgets.load(el));
    }
    return () => {
      el.innerHTML = "";
    };
  }, [embed]);

  if (embed.kind === "youtube") {
    return (
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${embed.id}?autoplay=1${embed.start ? `&start=${embed.start}` : ""}`}
          title={embed.title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }
  if (embed.kind === "linkedin") {
    return <iframe src={`https://www.linkedin.com/embed/feed/update/${embed.urn}?collapsed=1`} title="LinkedIn update" className="h-[480px] w-full bg-ink" />;
  }
  return <div ref={host} className="[&_iframe]:!max-w-full" />;
}
