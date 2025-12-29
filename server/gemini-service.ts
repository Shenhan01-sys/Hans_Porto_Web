import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface Message {
    role: "user" | "model";
    parts: string;
}

// Load context from public folder
async function loadProfileContext(): Promise<string> {
    const publicDir = path.join(__dirname, "..", "client", "public");
    let context = "# Hans Gunawan - Portfolio Data\n\n";

    try {
        // Read project descriptions
        const projectsDir = path.join(publicDir, "DataSet", "projects");
        const projectFiles = await fs.readdir(projectsDir);

        context += "## Projects\n\n";
        for (const file of projectFiles) {
            if (file.endsWith(".md")) {
                const content = await fs.readFile(
                    path.join(projectsDir, file),
                    "utf-8"
                );
                context += `### ${file.replace(".md", "").replace("Readme - ", "")}\n${content}\n\n`;
            }
        }

        // List achievements (PDFs)
        const achievementsDir = path.join(publicDir, "DataSet", "achievements");
        try {
            const achievementFiles = await fs.readdir(achievementsDir);
            context += "## Achievements\n\n";
            context += `Total achievements: ${achievementFiles.filter(f => f.endsWith('.pdf')).length}\n`;
            context += "Available certificates:\n";
            achievementFiles.forEach(file => {
                if (file.endsWith('.pdf')) {
                    context += `- ${file.replace('.pdf', '')}\n`;
                }
            });
            context += "\n";
        } catch (err) {
            // Directory might not exist
        }

        // List publications
        const pubDir = path.join(publicDir, "Publication");
        try {
            const pubFiles = await fs.readdir(pubDir);
            context += "## Publications\n\n";
            pubFiles.forEach(file => {
                if (file.endsWith('.pdf')) {
                    context += `- ${file.replace('.pdf', '').replace('Publikasi Jurnal ', '').replace('_Hans Gunawan', '')}\n`;
                }
            });
            context += "\n";
        } catch (err) {
            // Directory might not exist
        }

        // Add basic info about Hans
        context += `## Personal Information\n\n`;
        context += `- Name: Hans Gunawan\n`;
        context += `- Education: Mahasiswa Sistem Informasi, Universitas Kristen Duta Wacana (UKDW)\n`;
        context += `- Focus: Full-stack Development, AI Integration, Data Management\n`;
        context += `- Tech Stack: Laravel, React, .NET MAUI, PostgreSQL, Express.js\n`;
        context += `- AI-native mindset: Mengintegrasikan AI (Gemini, IBM Granite) dalam solusi bisnis\n`;
        context += `- Principles: 1L + 5C (Leadership, Competence, Compassion, Consistency, Conscience, Commitment)\n`;
        context += `- Experience: 2+ years in web development and data management\n`;
        context += `- Notable Projects: FITAI (AI Fitness), SmartDev Academic, and more\n\n`;

    } catch (error) {
        console.error("Error loading context:", error);
    }

    return context;
}

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

export async function chatWithGemini(
    userMessage: string,
    chatHistory: Message[] = []
): Promise<AsyncIterable<string>> {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        systemInstruction,
    });

    // Load context
    const contextData = await loadProfileContext();

    // Build conversation history
    const history = chatHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.parts }],
    }));

    // Start chat with context
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: `CONTEXT DATA:\n\n${contextData}` }],
            },
            {
                role: "model",
                parts: [
                    {
                        text: "Terima kasih! Saya sudah memuat semua informasi tentang Hans Gunawan. Saya siap menjawab pertanyaan tentang profil, proyek, achievement, dan publikasinya. Ada yang ingin kamu tanyakan? 😊",
                    },
                ],
            },
            ...history,
        ],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
        },
    });

    // Send message and stream response
    const result = await chat.sendMessageStream(userMessage);

    // Return async generator
    async function* streamResponse() {
        for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
                yield text;
            }
        }
    }

    return streamResponse();
}

// Debug function to get current context
export async function getProfileContext(): Promise<string> {
    return await loadProfileContext();
}
