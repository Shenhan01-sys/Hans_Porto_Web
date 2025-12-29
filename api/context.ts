import { VercelRequest, VercelResponse } from "@vercel/node";
import contextData from "./context.json";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow GET
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        res.json({ context: contextData.context });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
