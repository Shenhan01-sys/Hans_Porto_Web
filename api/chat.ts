import { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CONTEXT_ACK, PROFILE_CONTEXT, SYSTEM_INSTRUCTION } from "./_profile-context.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface Message {
    role: "user" | "model";
    parts: string;
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

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-lite",
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        // Build conversation history
        const chatHistory = history.map((msg) => ({
            role: (msg.role as string) === "assistant" ? "model" : msg.role,
            parts: [{ text: msg.parts }],
        }));

        // Start chat with context
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `PROFILE:\n\n${PROFILE_CONTEXT}` }],
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: CONTEXT_ACK,
                        },
                    ],
                },
                ...chatHistory,
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1024,
            },
        });

        // Send message and stream response
        const result = await chat.sendMessageStream(message);

        // Stream chunks to client
        for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
                res.write(`data: ${JSON.stringify({ chunk: text })}\n\n`);
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
