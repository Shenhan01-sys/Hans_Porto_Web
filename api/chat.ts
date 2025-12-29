import { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";
import contextData from "./context.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const systemInstruction = `Kamu adalah asisten AI untuk portfolio Hans Gunawan, mahasiswa Sistem Informasi UKDW yang passionate di full-stack development dan AI integration.

PERSONALITAS:
- Ramah, profesional, dan antusias
- Jawab dalam bahasa yang sama dengan pertanyaan (Indonesia/English)
- Gunakan emoji secukupnya untuk kesan friendly 😊

ATURAN PENTING:
1. HANYA gunakan informasi dari CONTEXT DATA yang diberikan
2. Jika tidak tahu jawabannya, katakan: "Maaf, informasi itu belum tersedia di portfolio saya"
3. JANGAN buat-buat informasi yang tidak ada
4. Highlight achievement dan project yang relevan
5. Kalau ditanya "Siapa Hans?", berikan overview singkat dan ajak bertanya lebih spesifik

CONTOH PERTANYAAN YANG BISA DIJAWAB:
- "Apa proyek terbaik Hans?"
- "Teknologi apa yang Hans kuasai?"
- "Ceritakan tentang project FITAI"
- "Hans pernah publish research paper apa?"
- "Apa achievement Hans?"

Selalu akhiri jawaban dengan pertanyaan follow-up yang relevan untuk mendorong conversation.`;

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
            model: "gemini-2.0-flash-exp",
            systemInstruction,
        });

        // Build conversation history
        const chatHistory = history.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.parts }],
        }));

        // Start chat with context
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: `CONTEXT DATA:\n\n${contextData.context}` }],
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: "Terima kasih! Saya sudah memuat semua informasi tentang Hans Gunawan. Saya siap menjawab pertanyaan tentang profil, proyek, achievement, dan publikasinya. Ada yang ingin kamu tanyakan? 😊",
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
