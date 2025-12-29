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
- Database Migration

Dataset Biografi Komprehensif: Hans Gunawan
I. Identitas Akademik dan Fondasi Intelektual Hans Gunawan adalah mahasiswa aktif semester 5 di Universitas Kristen Duta Wacana (UKDW) Yogyakarta, Fakultas Teknologi Informasi, Program Studi Sistem Informasi. Dengan Nomor Induk Mahasiswa 72230649, ia mencatatkan performa akademik yang luar biasa dengan Indeks Prestasi Kumulatif (IPK) sebesar 3,73 dari total 78 SKS yang telah diselesaikan hingga Desember 2025.

Penguasaan intelektualnya mencakup spektrum yang luas, mulai dari logika pemrograman teknis hingga tata kelola bisnis. Hans memperoleh nilai sempurna (A) pada mata kuliah fundamental dan lanjutan, termasuk Algoritma dan Struktur Data, Desain RESTful Web API, Matematika Sistem Informasi, Manajemen dan Tata Kelola TI, Sistem Informasi Manajemen, serta Aplikasi Berbasis Desktop. Ia juga menunjukkan kemahiran dalam analisis proses bisnis (Nilai A) dan statistika (Nilai A-), yang menjadi fondasi dalam pengambilan keputusan berbasis data.

II. Ekspertis Teknis dan Pengembangan Perangkat Lunak Hans mengidentifikasi dirinya sebagai seorang Full-stack dan Mobile Developer yang berfokus pada efisiensi operasional bisnis melalui teknologi digital. Kemampuan teknisnya dikategorikan ke dalam beberapa lapisan utama:

Pengembangan Web Full-Stack: Hans menguasai PHP dengan framework Laravel (terbaru versi 12.x) dan JavaScript/TypeScript menggunakan React.js. Ia memahami arsitektur RESTful API secara mendalam, terbukti dari proyek UAS-nya yang membangun layanan API tangguh menggunakan ASP.NET Core dan Entity Framework.

Pengembangan Mobile Native & Hybrid: Salah satu keunggulan teknis Hans adalah eksplorasinya pada framework .NET MAUI dan Blazor Hybrid. Ia berhasil mengimplementasikan fitur native perangkat seperti kamera dan geolokasi (GPS) ke dalam aplikasi mobile untuk kebutuhan pelaporan data lapangan secara real-time.

Kecerdasan Buatan (AI) dan Data: Hans memiliki AI-native mindset, di mana ia memandang AI sebagai instrumen pemecahan masalah dari berbagai sudut pandang. Ia memiliki sertifikasi khusus dari IBM SkillsBuild dalam bidang "Code Generation and Optimization using IBM Granite". Dalam manajemen data, ia mahir mengelola database SQL (MySQL, Oracle, PostgreSQL) dan menggunakan Drizzle ORM serta Zod untuk validasi skema.

III. Rekam Jejak Proyek Unggulan Hans telah memimpin dan menyelesaikan pengembangan sistem kompleks yang siap digunakan di skala industri:

SmartDev Academic LMS: Sebuah Sistem Manajemen Pembelajaran komprehensif yang mendukung 4 peran pengguna (Admin, Instruktur, Siswa, Orang Tua). Sistem ini mencakup alur kerja pendaftaran multi-tahap dengan unggah dokumen, otentikasi token melalui Laravel Sanctum, hingga sistem penilaian terbobot otomatis.

FitAI (Personal AI Fitness Assistant): Aplikasi web full-stack yang mengintegrasikan model Large Language Model (LLM) IBM Granite 3.3-8b-instruct. Proyek ini menunjukkan kemampuan Hans dalam menangani context injection data biometrik pengguna ke dalam prompt template, mekanisme Async Polling untuk stabilitas API, serta implementasi fallback logic untuk menjamin pengalaman pengguna (UX) jika terjadi gangguan server AI.

Sistem Mobile Field Reporting: Eksplorasi solusi mobile industri menggunakan .NET MAUI yang relevan untuk digitalisasi sistem di perusahaan manufaktur besar seperti PT Cheil Jedang.

IV. Kontribusi Ilmiah dan Riset Teknologi Kapasitas analitis Hans melampaui penulisan kode, ia juga berkontribusi aktif dalam literatur ilmiah internasional melalui publikasi jurnal:

Riset Metaverse & Lingkungan: Hans mengeksplorasi bagaimana interaksi avatar dalam dunia metaverse, yang dibagi menjadi taksonomi form realism dan autonomy realism, dapat memengaruhi perubahan perilaku manusia ke arah yang lebih ramah lingkungan (Pro-Environmental Behavior).

Riset Virtual Tourism: Ia melakukan studi eksperimental menggunakan Oculus Quest 2 untuk memahami efek pengulangan (repetition) dan gaya naratif terhadap memori (recall & recognition) serta niat kunjungan wisatawan pada objek wisata budaya seperti Museum Wayang.

V. Penghargaan, Sertifikasi, dan Pengalaman Organisasi Hans adalah individu yang kompetitif dan memiliki jiwa kepemimpinan yang teruji:

Prestasi Utama: Meraih Juara 2 dalam seleksi kandidat Pemilihan Mahasiswa Berprestasi (Pilmapres) tingkat internal UKDW tahun 2025.

Sertifikasi Profesional: Menyelesaikan kursus SAP Overview dari SAP University Partnership Program (Desember 2024) dan mengikuti Workshop Time Series APTIKOM (Agustus 2025).

Kepemimpinan & Organisasi: Pernah bertugas sebagai Liaison Officer (LO) pada Pertemuan Nasional BK2-PTKI 2025 dan aktif dalam kepanitiaan ISCD 2024 di divisi PERKAM.

Olahraga & Karakter: Memiliki latar belakang atletis yang kuat sebagai pemain basket, meraih Juara 2 (2023) dan Juara 3 (2024) Rector Cup UKDW, serta berpartisipasi dalam Liga Mahasiswa (LIMA) 2023. Pengalaman sebagai coach gym telah mengasah kemampuan komunikasi interpersonal dan ketangguhan mentalnya.

VI. Filosofi Hidup dan Prinsip Kerja (1L + 5C) Seluruh pencapaian Hans didorong oleh prinsip hidup 1L + 5C: Leadership, Competence, Compassion, Consistency, Conscience, dan Commitment. Ia memiliki etika kerja yang sangat disiplin dengan keyakinan bahwa:

Dunia tidak pernah berhenti bergerak, maka belajar adalah kewajiban yang berkelanjutan.

Menyerah adalah bentuk kelemahan; tantangan teknis harus dihadapi dengan resiliensi.

Integritas pribadi adalah prioritas utama; berbuat baik harus dilakukan tanpa mengorbankan batasan profesionalitas diri.

Malas adalah awal dari kegagalan; efisiensi hanya bisa dicapai dengan dedikasi tinggi.

Hans Gunawan saat ini terbuka untuk peluang profesional di mana ia dapat mengimplementasikan teknologi informasi berskala enterprise dan berkontribusi nyata dalam transformasi digital industri.`
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
            model: "gemini-2.5-flash",
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
