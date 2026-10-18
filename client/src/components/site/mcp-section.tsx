import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { onScroll } from "animejs";
import { ScrambleHeading } from "@/components/fx/text";
import { useRevealGroup } from "@/components/fx/reveal";
import { ScrambleLabel } from "@/components/site/scramble-label";
import { mcp } from "@/content/site";
import { MCP_TOOLS } from "@/content/portfolio-mcp";
import { fmEase } from "@/lib/motion";

// "Bring your own AI": this site is a read-only MCP server at /api/mcp. The section shows the path a
// tool call takes, gives real connection snippets, and lets the visitor run the tools right here.
// Every call on this page is a real request; nothing is scripted.

interface Call {
  at: string;
  tool: string;
  ms: number;
  ok: boolean;
}

const PRESETS: { tool: string; args: Record<string, string>; label: string }[] = [
  { tool: "get_profile", args: {}, label: "get_profile()" },
  { tool: "list_projects", args: { keyword: "web3" }, label: 'list_projects("web3")' },
  { tool: "get_project", args: { name: "Applify" }, label: 'get_project("Applify")' },
  { tool: "list_recognition", args: {}, label: "list_recognition()" },
  { tool: "get_experience", args: {}, label: "get_experience()" },
  { tool: "how_to_contact", args: {}, label: "how_to_contact()" },
];

export function McpSection() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const points = useRevealGroup<HTMLUListElement>();
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  const endpoint = `${origin}/api/mcp`;

  const [running, setRunning] = useState<string | null>(null);
  const [result, setResult] = useState<{ label: string; request: string; lines: string[]; ok: boolean } | null>(null);
  const [log, setLog] = useState<Call[]>([]);
  const counter = useRef(1);

  // the packet that travels client -> endpoint -> data and back
  const packet = useMotionValue(0);
  const [phase, setPhase] = useState<"idle" | "out" | "back">("idle");

  const fly = useCallback(
    async (dir: "out" | "back") => {
      if (reduce) return;
      setPhase(dir);
      packet.set(dir === "out" ? 0 : 1);
      await animate(packet, dir === "out" ? 1 : 0, { duration: 0.6, ease: dir === "out" ? fmEase.glide : fmEase.land });
      setPhase("idle");
    },
    [packet, reduce],
  );

  const run = useCallback(
    async (p: (typeof PRESETS)[number]) => {
      if (running) return;
      setRunning(p.tool);
      const body = { jsonrpc: "2.0", id: counter.current++, method: "tools/call", params: { name: p.tool, arguments: p.args } };
      const t0 = performance.now();
      const out = fly("out");
      let ok = false;
      let lines: string[] = [];
      try {
        const res = await fetch("/api/mcp", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        const text: string = json?.result?.content?.[0]?.text ?? json?.error?.message ?? "No content";
        ok = res.ok && !json?.result?.isError && !json?.error;
        lines = text.split("\n");
      } catch {
        lines = ["The endpoint did not answer. It runs on the deployed site and on `npm run dev`."];
      }
      const ms = Math.round(performance.now() - t0);
      await out;
      setResult({ label: p.label, request: JSON.stringify(body, null, 2), lines, ok });
      setLog((l) => [{ at: new Date().toLocaleTimeString("en-GB"), tool: p.tool, ms, ok }, ...l].slice(0, 6));
      fly("back");
      setRunning(null);
    },
    [fly, running],
  );

  // run one call the first time the section comes into view, so the console is never empty
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let done = false;
    const obs = onScroll({
      target: el,
      enter: "bottom-=20% top",
      repeat: false,
      onEnter: () => {
        if (done) return;
        done = true;
        run(PRESETS[1]);
      },
    });
    return () => {
      obs.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="mcp" ref={root} aria-labelledby="mcp-title" className="relative border-b border-line py-section">
      <div className="wrap">
        <div className="grid gap-s-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <ScrambleHeading id="mcp-title" className="font-display text-h2">
              {mcp.title}
            </ScrambleHeading>
            <p className="mt-s-3 max-w-[54ch] text-lede text-ink-2">{mcp.lede}</p>
          </div>
          <ul ref={points} className="grid gap-s-2 sm:grid-cols-2">
            {mcp.points.map((p, i) => (
              <li key={p.title} data-reveal data-reveal-index={i} className="grid gap-1">
                <span className="text-ink">{p.title}</span>
                <span className="text-ink-2">{p.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <Diagram packet={packet} phase={phase} running={running} last={result?.label ?? null} reduce={!!reduce} />

        <div className="mt-s-8 grid gap-s-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Connect endpoint={endpoint} />
          <Console running={running} result={result} log={log} onRun={run} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- diagram ---------------- */

function Diagram({ packet, phase, running, last, reduce }: { packet: MotionValue<number>; phase: string; running: string | null; last: string | null; reduce: boolean }) {
  // packet position along the two wires: 0..0.5 first wire, 0.5..1 second wire
  const left1 = useTransform(packet, [0, 0.5], ["0%", "100%"]);
  const left2 = useTransform(packet, [0.5, 1], ["0%", "100%"]);
  const on1 = useTransform(packet, (p) => (p > 0.02 && p < 0.5 ? 1 : 0));
  const on2 = useTransform(packet, (p) => (p >= 0.5 && p < 0.98 ? 1 : 0));
  const tone = phase === "back" ? "bg-arrive" : "bg-violet";

  const lit = running ?? last?.split("(")[0] ?? null;
  const nodes = [
    { title: "Your AI client", text: "Asks in your words, on your own subscription.", chips: ["Claude", "Cursor", "VS Code", "any MCP client"] },
    { title: "/api/mcp", text: `${MCP_TOOLS.length} read-only tools on this site.`, chips: MCP_TOOLS.map((t) => t.name) },
    { title: "This portfolio", text: "Answers from the data this page renders.", chips: ["projects", "recognition", "experience", "contact"] },
  ];

  return (
    <figure className="mt-s-8" aria-label="How a question reaches this portfolio">
      <div className="grid items-center gap-y-3 md:grid-cols-[minmax(0,1fr)_minmax(40px,0.6fr)_minmax(0,1fr)_minmax(40px,0.6fr)_minmax(0,1fr)]">
        {nodes.map((n, i) => (
          <div key={n.title} className="contents">
            <div
              className={`grid gap-1 border bg-plate p-s-3 transition-colors duration-fade ease-inout ${
                running && ((phase === "out" && i > 0) || (phase === "back" && i < 2)) ? "border-violet-hi" : "border-line"
              }`}
            >
              <span className={`font-mono text-small ${i === 1 ? "text-arrive" : "text-ink"}`}>{n.title}</span>
              <span className="text-ink-2">{n.text}</span>
              <span className="mt-2 flex flex-wrap gap-1.5">
                {n.chips.map((c) => (
                  <span
                    key={c}
                    className={`border px-2 py-1 font-mono text-[12px] leading-none transition-colors duration-fade ease-inout ${
                      i === 1 && c === lit ? "border-violet-hi bg-violet text-ink" : "border-line text-ink-3"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </span>
            </div>
            {i < 2 && (
              <div aria-hidden="true" className="relative mx-auto h-10 w-px md:h-px md:w-full">
                <span className="absolute inset-0 [background:repeating-linear-gradient(to_right,rgb(var(--line))_0_6px,transparent_6px_10px)] md:block" />
                <span className="absolute inset-0 [background:repeating-linear-gradient(to_bottom,rgb(var(--line))_0_6px,transparent_6px_10px)] md:hidden" />
                {!reduce && (
                  <motion.span
                    className={`absolute top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 md:block ${tone}`}
                    style={i === 0 ? { left: left1, opacity: on1 } : { left: left2, opacity: on2 }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </figure>
  );
}

/* ---------------- connect ---------------- */

function Connect({ endpoint }: { endpoint: string }) {
  const tabs = useMemo(
    () => [
      { id: "claude-code", label: "Claude Code", note: "Run in a terminal:", code: `claude mcp add --transport http hans-portfolio ${endpoint}` },
      { id: "claude-app", label: "Claude app", note: "Settings, Connectors, Add custom connector, then paste:", code: endpoint },
      {
        id: "cursor",
        label: "Cursor",
        note: "Add to ~/.cursor/mcp.json:",
        code: JSON.stringify({ mcpServers: { "hans-portfolio": { url: endpoint } } }, null, 2),
      },
      { id: "any", label: "Any client", note: "Streamable HTTP, no authentication:", code: endpoint },
    ],
    [endpoint],
  );
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent) => {
    const next = e.key === "ArrowRight" ? tab + 1 : e.key === "ArrowLeft" ? tab - 1 : e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = (next + tabs.length) % tabs.length;
    setTab(n);
    refs.current[n]?.focus();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[tab].code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid content-start gap-s-2">
      <h3 className="font-display text-h3">Connect in a minute</h3>
      <div role="tablist" aria-label="MCP clients" onKeyDown={onKey} className="flex flex-wrap gap-2">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => (refs.current[i] = el)}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-selected={tab === i}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => setTab(i)}
            className={`btn ${tab === i ? "!border-violet-hi !bg-violet !text-ink" : "btn-ghost"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tabs[tab].id}`} aria-labelledby={`tab-${tabs[tab].id}`} className="grid gap-2 border border-line bg-plate p-s-2">
        <p className="text-ink-2">{tabs[tab].note}</p>
        <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-small text-arrive">{tabs[tab].code}</pre>
        <div className="flex items-center gap-3">
          <button type="button" className="btn" onClick={copy}>
            <ScrambleLabel text={copied ? "Copied" : "Copy"} />
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Copied to the clipboard." : ""}
          </span>
        </div>
      </div>
      <p className="text-ink-3">Then ask your AI things like "What did Hans build on Sui?" or "Which of his projects use MCP?"</p>
    </div>
  );
}

/* ---------------- console ---------------- */

function Console({
  running,
  result,
  log,
  onRun,
}: {
  running: string | null;
  result: { label: string; request: string; lines: string[]; ok: boolean } | null;
  log: Call[];
  onRun: (p: (typeof PRESETS)[number]) => void;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="grid content-start gap-s-2">
      <h3 className="font-display text-h3">Try it here</h3>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Run a tool">
        {PRESETS.map((p) => (
          <button key={p.label} type="button" className="btn btn-ghost !normal-case !tracking-normal" disabled={!!running} onClick={() => onRun(p)}>
            {p.label}
          </button>
        ))}
      </div>

      <div className="border border-line bg-plate" aria-live="polite" aria-busy={!!running}>
        <div className="flex items-center justify-between gap-3 border-b border-line px-s-2 py-3">
          <span className="font-mono text-small text-ink-3">{running ? `Running ${running}` : result ? `Result of ${result.label}` : "Waiting for a call"}</span>
          {result && <span className={`font-mono text-small ${result.ok ? "text-arrive" : "text-danger"}`}>{result.ok ? "200 OK" : "Error"}</span>}
        </div>
        <div data-lenis-prevent className="max-h-[360px] overflow-y-auto p-s-2">
          {result ? (
            <ol key={result.label + result.lines.length} className="grid gap-1 font-mono text-small leading-relaxed text-ink-2">
              {result.lines.map((line, i) => (
                <motion.li
                  key={i}
                  className="whitespace-pre-wrap break-words"
                  initial={reduce ? false : { opacity: 0.15, y: "0.4em" }}
                  animate={{ opacity: 1, y: "0em" }}
                  transition={{ duration: 0.2, delay: Math.min(i * 0.033, 0.6), ease: fmEase.land }}
                >
                  {line}
                </motion.li>
              ))}
            </ol>
          ) : (
            <p className="font-mono text-small text-ink-3">Pick a tool above. It runs against /api/mcp on this site.</p>
          )}
        </div>
      </div>

      {log.length > 0 && (
        <div className="grid gap-2">
          <h4 className="font-mono text-small text-ink-3">Calls from this page</h4>
          <ol className="grid gap-1 font-mono text-small tabular-nums">
            {log.map((c, i) => (
              <li key={i} className="grid grid-cols-[6rem_minmax(0,1fr)_4rem_3rem] gap-3 text-ink-2">
                <span className="text-ink-3">{c.at}</span>
                <span className="truncate text-ink">{c.tool}</span>
                <span>{c.ms} ms</span>
                <span className={c.ok ? "text-arrive" : "text-danger"}>{c.ok ? "ok" : "error"}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
