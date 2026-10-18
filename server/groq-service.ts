import Groq from "groq-sdk";
import { CONTEXT_ACK, PROFILE_CONTEXT, SYSTEM_INSTRUCTION } from "../shared/profile-context";

// Initialize Groq AI
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

interface Message {
    role: "user" | "assistant";
    content: string;
}

export async function chatWithGroq(
    userMessage: string,
    chatHistory: Message[] = []
): Promise<AsyncIterable<string>> {
    // Build messages array
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
        ...chatHistory.map((msg: any) => ({
            role: msg.role,
            content: msg.parts || msg.content // Support both formats
        })),
        {
            role: "user",
            content: userMessage
        }
    ];

    // Call Groq API with streaming
    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b", // llama-3.3-70b-versatile was retired by Groq on 2026-08-16
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048, // reasoning tokens count toward this
        reasoning_effort: "low",
        stream: true,
    });

    // Return async iterable
    return (async function* () {
        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
                yield content;
            }
        }
    })();
}

export async function getProfileContext(): Promise<string> {
    return PROFILE_CONTEXT;
}
