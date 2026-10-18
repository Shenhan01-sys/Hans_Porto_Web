// A read-only Model Context Protocol server for this portfolio (Streamable HTTP, stateless, JSON responses).
// Pure logic with no Node or browser APIs: client/api/mcp.ts, api/mcp.ts and server/routes.ts wrap it.
// Data comes from ./site, the same file the page renders, so the AI and the page never disagree.

import {
  about,
  archive,
  awards,
  certificates,
  contact,
  education,
  experience,
  featured,
  person,
  publications,
  socials,
  stackPlates,
} from "./site.js";

export const MCP_SERVER_INFO = { name: "hans-gunawan-portfolio", title: "Hans Gunawan portfolio", version: "1.0.0" };
const PROTOCOL_VERSIONS = ["2025-06-18", "2025-03-26", "2024-11-05"];

type Json = Record<string, unknown>;

export interface McpTool {
  name: string;
  title: string;
  description: string;
  inputSchema: Json;
}

export const MCP_TOOLS: McpTool[] = [
  {
    name: "get_profile",
    title: "Profile",
    description: "Who Hans Gunawan is: role, study, focus areas, principles and languages.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "list_projects",
    title: "List projects",
    description:
      "Hans's projects, newest first, with one line each. Optional keyword filter, for example 'web3', 'ai', 'laravel', 'sui', 'base' or 'mantle'.",
    inputSchema: {
      type: "object",
      properties: { keyword: { type: "string", description: "Optional filter such as web3, ai, erp, laravel, sui." } },
      additionalProperties: false,
    },
  },
  {
    name: "get_project",
    title: "Project details",
    description: "Outcome, summary, role, dates, stack and links for one project, by name.",
    inputSchema: {
      type: "object",
      properties: { name: { type: "string", description: "Project name, for example Applify or zer0Gig." } },
      required: ["name"],
      additionalProperties: false,
    },
  },
  {
    name: "list_recognition",
    title: "Recognition",
    description: "Prizes, programs, papers, education and certificates, newest first.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_experience",
    title: "Experience",
    description: "Roles with organisation and dates, grouped from now back to 2023.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "how_to_contact",
    title: "Contact",
    description: "Email, public profiles, and the kinds of work Hans is open to.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

const SYNONYMS: Record<string, string[]> = {
  web3: ["solidity", "move", "sui", "base", "mantle", "0g", "monad", "canton", "casper", "solana", "uniswap", "x402", "erc", "daml", "eip", "bnb", "on-chain", "blockchain", "escrow"],
  ai: ["ai", "mcp", "agent", "llm", "granite", "groq", "gemini", "xgboost", "timesfm", "mediapipe", "yolo"],
  erp: ["erp", "inventory", "kitchen", "catering", "point of sale", "pos"],
};

const norm = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function allProjects() {
  return [
    ...featured.map((p) => ({
      name: p.title,
      date: p.date,
      line: p.outcome,
      text: `${p.title} ${p.outcome} ${p.summary} ${p.stack.join(" ")} ${p.role}`,
      detail: [
        `${p.title} (${p.date})`,
        `Outcome: ${p.outcome}`,
        p.summary,
        `Role: ${p.role}`,
        `Stack: ${p.stack.join(", ")}`,
        p.links.length ? `Links: ${p.links.map((l) => `${l.label} ${l.href}`).join(" | ")}` : p.note ?? "",
      ].filter(Boolean),
    })),
    ...archive.map((p) => ({
      name: p.title,
      date: p.year,
      line: p.what,
      text: `${p.title} ${p.what} ${p.stack}`,
      detail: [`${p.title} (${p.year})`, p.what, `Stack: ${p.stack}`, p.link ? `Link: ${p.link.label} ${p.link.href}` : "No public link."],
    })),
  ];
}

function callTool(name: string, args: Json): { text: string; isError?: boolean } {
  switch (name) {
    case "get_profile":
      return {
        text: [
          `${person.name}. ${person.role}`,
          person.study,
          about.lede,
          ...about.paragraphs,
          ...about.facts.map((f) => `${f.k}: ${f.v}`),
          `Principles: ${about.principle}`,
        ].join("\n"),
      };
    case "list_projects": {
      const raw = typeof args.keyword === "string" ? norm(args.keyword) : "";
      const terms = raw ? [raw, ...(SYNONYMS[raw] ?? [])] : [];
      // whole-word match, so "base" does not match "Supabase"
      const list = allProjects().filter((p) => {
        const hay = ` ${norm(p.text)} `;
        return !terms.length || terms.some((t) => hay.includes(` ${norm(t)} `));
      });
      if (!list.length) return { text: `No project matches "${args.keyword}". Try web3, ai, erp, laravel or sui.` };
      return { text: list.map((p) => `- ${p.name} (${p.date}): ${p.line}`).join("\n") };
    }
    case "get_project": {
      const wanted = typeof args.name === "string" ? norm(args.name) : "";
      if (!wanted) return { text: "Give a project name, for example Applify.", isError: true };
      const hit = allProjects().find((p) => norm(p.name) === wanted) ?? allProjects().find((p) => norm(p.name).includes(wanted) || wanted.includes(norm(p.name)));
      if (!hit) return { text: `No project called "${args.name}". Call list_projects to see the names.`, isError: true };
      return { text: hit.detail.join("\n") };
    }
    case "list_recognition":
      return {
        text: [
          "Prizes and programs:",
          ...awards.map((a) => `- ${a.year}: ${a.result}, ${a.event}${a.project ? ` (${a.project})` : ""}${a.proof?.href.startsWith("http") ? ` ${a.proof.href}` : ""}`),
          "Papers:",
          ...publications.map((p) => `- ${p.year}: "${p.title}". ${p.venue}. ${p.role}${p.link?.href.startsWith("http") ? ` ${p.link.href}` : ""}`),
          "Education:",
          ...education.map((e) => `- ${e.years}: ${e.school}. ${e.detail}`),
          "Certificates:",
          ...certificates.map((c) => `- ${c.year}: ${c.title}, ${c.issuer}`),
        ].join("\n"),
      };
    case "get_experience":
      return {
        text: experience
          .map((g) => [`${g.group}:`, ...g.roles.map((r) => `- ${r.dates}: ${r.title}, ${r.org}. ${r.text}`)].join("\n"))
          .join("\n"),
      };
    case "how_to_contact":
      return {
        text: [
          `Email: ${person.email}`,
          ...socials.map((s) => `${s.label}: ${s.href}`),
          `CV: ${person.cv}`,
          contact.intro,
          ...contact.audiences.map((a) => `- ${a.who}: ${a.ask}`),
          `Skills: ${stackPlates.map((p) => p.title).join(", ")}.`,
        ].join("\n"),
      };
    default:
      return { text: `Unknown tool "${name}".`, isError: true };
  }
}

/** Runs one tool directly; the on-page console uses this shape too. */
export function runTool(name: string, args: Json = {}) {
  const r = callTool(name, args);
  return { content: [{ type: "text", text: r.text }], isError: Boolean(r.isError) };
}

const rpcError = (id: unknown, code: number, message: string) => ({ jsonrpc: "2.0", id: id ?? null, error: { code, message } });

/**
 * Handles one JSON-RPC message. Returns null for notifications (the adapter answers 202 with no body).
 */
export function handleMcpMessage(msg: unknown): Json | null {
  if (!msg || typeof msg !== "object" || (msg as Json).jsonrpc !== "2.0") return rpcError(null, -32600, "Invalid request");
  const { id, method, params } = msg as { id?: unknown; method?: string; params?: Json };
  if (id === undefined || id === null) return null;

  switch (method) {
    case "initialize": {
      const asked = typeof params?.protocolVersion === "string" ? params.protocolVersion : "";
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: PROTOCOL_VERSIONS.includes(asked) ? asked : PROTOCOL_VERSIONS[0],
          capabilities: { tools: { listChanged: false } },
          serverInfo: MCP_SERVER_INFO,
          instructions:
            "Read-only tools about Hans Gunawan's work. Quote facts as returned, do not invent projects or numbers, and suggest how_to_contact for anything not covered.",
        },
      };
    }
    case "ping":
      return { jsonrpc: "2.0", id, result: {} };
    case "tools/list":
      return { jsonrpc: "2.0", id, result: { tools: MCP_TOOLS } };
    case "tools/call": {
      const name = typeof params?.name === "string" ? params.name : "";
      if (!MCP_TOOLS.some((t) => t.name === name)) return rpcError(id, -32602, `Unknown tool: ${name}`);
      const args = params?.arguments && typeof params.arguments === "object" ? (params.arguments as Json) : {};
      return { jsonrpc: "2.0", id, result: runTool(name, args) };
    }
    default:
      return rpcError(id, -32601, `Method not found: ${method}`);
  }
}

/** HTTP wrapper shared by the Vercel functions and the Express dev server. */
export function handleMcpHttp(method: string, body: unknown): { status: number; headers: Record<string, string>; body?: string } {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Protocol-Version, Mcp-Session-Id",
    "Cache-Control": "no-store",
  };
  if (method === "OPTIONS") return { status: 204, headers };
  if (method !== "POST") return { status: 405, headers: { ...headers, Allow: "POST, OPTIONS" } };

  let parsed = body;
  if (typeof body === "string") {
    try {
      parsed = JSON.parse(body);
    } catch {
      return { status: 400, headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(rpcError(null, -32700, "Parse error")) };
    }
  }
  const reply = handleMcpMessage(parsed);
  if (reply === null) return { status: 202, headers };
  return { status: 200, headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify(reply) };
}
