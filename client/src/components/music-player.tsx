import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Music, Pause, Volume2, VolumeX } from "lucide-react";
import { dur, fmEase } from "@/lib/motion";
import { usePastHero } from "@/hooks/use-past-hero";

// Background music that waits for a press (WCAG 1.4.2): no autoplay, no prompt.
// Volume and mute are remembered in this browser only.

const KEY = "hg-music";

export default function MusicPlayer({ audioSrc, defaultVolume = 0.3 }: { audioSrc: string; defaultVolume?: number }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(defaultVolume);
  const [muted, setMuted] = useState(false);
  const [panel, setPanel] = useState(false);
  const reduce = useReducedMotion();
  const pastHero = usePastHero();
  const show = pastHero || playing;

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (saved) {
        setVolume(typeof saved.volume === "number" ? saved.volume : defaultVolume);
        setMuted(Boolean(saved.muted));
      }
    } catch {
      /* storage unavailable */
    }
  }, [defaultVolume]);

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = volume;
      audio.current.muted = muted;
    }
    try {
      localStorage.setItem(KEY, JSON.stringify({ volume, muted }));
    } catch {
      /* storage unavailable */
    }
  }, [volume, muted]);

  const toggle = async () => {
    const el = audio.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      return;
    }
    try {
      await el.play();
      setPlaying(true);
    } catch (err) {
      console.error("Audio playback failed:", err);
    }
  };

  return (
    <>
      <audio ref={audio} src={audioSrc} loop preload="none" onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} />
      <AnimatePresence>
        {show && (
          <motion.div
            key="music"
            className="fixed z-overlay flex items-end gap-2"
            style={{ left: "max(16px, env(safe-area-inset-left, 0px))", bottom: "calc(16px + env(safe-area-inset-bottom, 0px))" }}
            initial={reduce ? false : { y: 24, opacity: 0.2 }}
            animate={{ y: 0, opacity: 1, transition: { duration: dur.enter / 1000, ease: fmEase.land } }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { y: 24, opacity: 0, transition: { duration: dur.exit / 1000, ease: fmEase.exit } }}
          >
            <button
              type="button"
              onClick={toggle}
              aria-pressed={playing}
              aria-label={playing ? "Pause background music" : "Play background music"}
              className="btn btn-icon h-12 w-12"
            >
              {playing ? <Pause size={18} aria-hidden="true" /> : <Music size={18} aria-hidden="true" />}
            </button>

            {playing && (
              <div className="relative">
                <button
                  type="button"
                  className="btn btn-icon h-12 w-12"
                  aria-expanded={panel}
                  aria-controls="music-volume"
                  aria-label="Volume"
                  onClick={() => setPanel((v) => !v)}
                >
                  {muted || volume === 0 ? <VolumeX size={18} aria-hidden="true" /> : <Volume2 size={18} aria-hidden="true" />}
                </button>
                <AnimatePresence>
                  {panel && (
                    <motion.div
                      id="music-volume"
                      key="vol"
                      className="absolute bottom-14 left-0 grid w-56 gap-3 border border-line bg-plate p-3"
                      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
                      animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: dur.quick / 1000, ease: fmEase.land } }}
                      exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { clipPath: "inset(100% 0% 0% 0%)", transition: { duration: dur.exit / 1000, ease: fmEase.exit } }}
                    >
                      <label htmlFor="music-range" className="font-mono text-small text-ink-2">
                        Volume {Math.round((muted ? 0 : volume) * 100)}%
                      </label>
                      <input
                        id="music-range"
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={muted ? 0 : volume}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          setVolume(v);
                          setMuted(v === 0);
                        }}
                        className="w-full accent-violet"
                      />
                      <button type="button" className="btn btn-ghost justify-start" aria-pressed={muted} onClick={() => setMuted((m) => !m)}>
                        {muted ? "Unmute" : "Mute"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
