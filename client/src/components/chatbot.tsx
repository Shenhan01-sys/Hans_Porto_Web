import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageSquare, Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { dur, fmEase } from "@/lib/motion";
import { usePastHero } from "@/hooks/use-past-hero";

interface Message {
  role: "user" | "assistant";
  parts: string;
}

const GREETING: Message = {
  role: "assistant",
  parts: "Hi. Ask me about Hans's projects, experience, or how to reach him.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const reduce = useReducedMotion();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const pastHero = usePastHero();
  const showLauncher = pastHero || open;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      inputRef.current?.focus();
      const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) launcher.current?.focus();
  }, [open]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const history = messages.map((m) => ({ role: m.role, parts: m.parts }));
    setMessages((prev) => [...prev, { role: "user", parts: text }, { role: "assistant", parts: "" }]);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      if (!res.ok || !res.body) throw new Error("Request failed");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of decoder.decode(value).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.chunk) {
              full += data.chunk;
              setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", parts: full }]);
            } else if (data.error) {
              throw new Error(data.error);
            }
          } catch (err) {
            console.error("Chat parse error:", err);
          }
        }
      }
      if (!full) throw new Error("Empty response");
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", parts: "That did not work. Try again, or email hansgunawan775@gmail.com." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showLauncher && (
          <motion.div
            key="launcher"
            className="fixed z-overlay"
            style={{
              right: "max(16px, env(safe-area-inset-right, 0px))",
              bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
            }}
            initial={reduce ? false : { y: 24, opacity: 0.2 }}
            animate={{ y: 0, opacity: 1, transition: { duration: dur.enter / 1000, ease: fmEase.land } }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { y: 24, opacity: 0, transition: { duration: dur.exit / 1000, ease: fmEase.exit } }}
          >
            <button
              ref={launcher}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="chat-panel"
              aria-label={open ? "Close the assistant" : "Ask the portfolio assistant"}
              className="btn btn-icon h-12 w-12"
            >
              {open ? <X size={20} aria-hidden="true" /> : <MessageSquare size={20} aria-hidden="true" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            id="chat-panel"
            key="chat"
            role="dialog"
            aria-label="Portfolio assistant"
            className="fixed z-overlay flex flex-col border border-line bg-plate"
            style={{
              right: "max(16px, env(safe-area-inset-right, 0px))",
              bottom: "calc(76px + env(safe-area-inset-bottom, 0px))",
              width: "min(calc(100vw - 32px), 400px)",
              height: "min(70vh, 560px)",
            }}
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: dur.quick / 1000, ease: fmEase.land } }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { clipPath: "inset(100% 0% 0% 0%)", transition: { duration: dur.exit / 1000, ease: fmEase.exit } }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-line p-4">
              <div>
                <p className="font-display text-small uppercase tracking-[0.06em]">Ask about Hans</p>
                <p className="mt-1 text-[14px] text-ink-3">An AI assistant answers from his profile. It can be wrong.</p>
              </div>
              <button type="button" className="btn btn-icon btn-ghost h-11 w-11 shrink-0" onClick={() => setOpen(false)} aria-label="Close the assistant">
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div role="log" aria-live="polite" aria-relevant="additions text" data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) =>
                m.role === "assistant" && !m.parts ? null : (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] px-3 py-2 ${m.role === "user" ? "bg-violet text-ink" : "border border-line bg-plate-2 text-ink"}`}>
                      <span className="sr-only">{m.role === "user" ? "You said: " : "Assistant: "}</span>
                      <div className="prose prose-sm prose-invert max-w-none text-[15px] prose-p:my-1 prose-a:text-violet-hi prose-li:my-0 prose-ul:my-1">
                        <ReactMarkdown>{m.parts}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ),
              )}
              {loading && messages[messages.length - 1]?.parts === "" && <p className="font-mono text-small text-ink-3">Writing</p>}
              <div ref={endRef} />
            </div>

            <form
              className="flex items-end gap-2 border-t border-line p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <label htmlFor="chat-input" className="sr-only">
                Your question
              </label>
              <textarea
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Ask about a project or role"
                rows={1}
                disabled={loading}
                className="field max-h-[120px] min-h-[44px] flex-1 resize-none"
              />
              <button type="submit" className="btn btn-icon shrink-0" disabled={!input.trim() || loading} aria-label="Send">
                <Send size={18} aria-hidden="true" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
