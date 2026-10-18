import { VercelRequest, VercelResponse } from "@vercel/node";
import Groq from "groq-sdk";
import { CONTEXT_ACK, PROFILE_CONTEXT, SYSTEM_INSTRUCTION } from "./_profile-context";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, history = [] } = req.body as {
            message: string;
            history: Message[];
        };

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Set headers for Server-Sent Events streaming
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("Access-Control-Allow-Origin", "*");

        // Build messages array for Groq
        const messages: any[] = [
            {
                role: "system",
                content: SYSTEM_INSTRUCTION
            },
            {
                role: "user",
                content: `PROFILE:\n\n${PROFILE_CONTEXT}`
            },
            {
                role: "assistant",
                content: CONTEXT_ACK
            },
            ...history.map((msg: any) => ({
                role: msg.role,
                content: msg.parts || msg.content // Support both formats
            })),
            {
                role: "user",
                content: message
            }
        ];

        // Call Groq API with streaming
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024,
            stream: true,
        });

        // Stream response to client
        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                res.write(`data: ${JSON.stringify({ chunk: content })}\n\n`);
            }
        }

        // Send done signal
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
    } catch (error: any) {
        console.error("Chat error:", error);
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
    }
}
