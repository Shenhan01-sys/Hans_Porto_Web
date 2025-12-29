import { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inline context data (JSON import doesn't work well in Vercel serverless)
const contextData = {
    context: `# Hans Gunawan - Portfolio Data

## Projects

### FITAI
FitAI adalah aplikasi web full-stack modern yang dirancang untuk menjadi asisten kebugaran pribadi. Aplikasi ini memanfaatkan kecerdasan buatan (IBM Granite 3.3-8b-instruct) untuk menghasilkan rencana latihan, panduan nutrisi, dan strategi tidur yang dipersonalisasi berdasarkan data fisiologis pengguna.

**Tech Stack:**
- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Radix UI
- Backend: Node.js, Express.js, TypeScript
- Database: PostgreSQL (Neon Database), Drizzle ORM
- AI: IBM Granite 3.3-8b-instruct via Replicate API

**Key Features:**
- Personalized workout, nutrition, and sleep plans
- Interactive AI chatbot for fitness questions
- Dashboard monitoring and progress tracking
- Asynchronous polling mechanism for AI inference

### SmartDev Academic
SmartDev Academic LMS adalah sistem manajemen pembelajaran (Learning Management System) berbasis web yang dirancang khusus untuk institusi pendidikan. Sistem ini menyediakan platform terintegrasi untuk mengelola pembelajaran, penugasan, penilaian, dan monitoring akademik.

**Tech Stack:**
- Backend: Laravel 12.x, PHP 8.2+, MySQL, Laravel Sanctum
- Frontend: Laravel Blade, TailwindCSS 4.0, Vanilla JavaScript, Chart.js
- Tools: Vite, Composer, SweetAlert2

**Key Features:**
- Multi-role system (Admin, Instructor, Student, Parent)
- Student registration system with document upload
- Course management with modules and materials
- Assignment submission and grading system
- Attendance tracking and certificate generation
- Real-time notifications and analytics

## Personal Information

- Name: Hans Gunawan
- Education: Mahasiswa Sistem Informasi, Universitas Kristen Duta Wacana (UKDW)
- Focus: Full-stack Development, AI Integration, Data Management
- Tech Stack: Laravel, React, .NET MAUI, PostgreSQL, Express.js
- AI-native mindset: Mengintegrasikan AI (Gemini, IBM Granite) dalam solusi bisnis
- Principles: 1L + 5C (Leadership, Competence, Compassion, Consistency, Conscience, Commitment)
- Experience: 2+ years in web development and data management
- Notable Projects: FITAI (AI Fitness), SmartDev Academic, and more

## Skills

**Programming Languages:**
- JavaScript/TypeScript
- PHP
- Python
- C#
- SQL

**Frontend:**
- React, Next.js
- TailwindCSS, Vanilla CSS
- HTML5, Responsive Design

**Backend:**
- Node.js/Express.js
- Laravel
- RESTful API Design
- Authentication (Sanctum, JWT)

**Database:**
- PostgreSQL
- MySQL
- Drizzle ORM

**AI/ML:**
- Google Gemini API
- IBM Granite (via Replicate)
- Prompt Engineering
- AI Integration

**DevOps:**
- Git/GitHub
- Vercel Deployment
- Database Migration`
};

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
