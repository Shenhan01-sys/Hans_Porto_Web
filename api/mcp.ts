import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleMcpHttp } from "../client/src/content/portfolio-mcp.js";

// Read-only MCP endpoint for this portfolio. Logic lives in client/src/content/portfolio-mcp.ts.
export default function handler(req: VercelRequest, res: VercelResponse) {
  const out = handleMcpHttp(req.method ?? "GET", req.body);
  for (const [k, v] of Object.entries(out.headers)) res.setHeader(k, v);
  res.status(out.status);
  if (out.body) res.send(out.body);
  else res.end();
}
