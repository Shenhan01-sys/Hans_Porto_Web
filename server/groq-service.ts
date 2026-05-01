import Groq from "groq-sdk";

// Initialize Groq AI
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

interface Message {
    role: "user" | "assistant";
    content: string;
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

Selalu akhiri jawaban dengan pertanyaan follow-up yang relevan untuk mendorong conversation.`;

// Context - same as production for consistency
const profileContext = `# Hans Gunawan - Portfolio Data

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
Olahraga &  Karakter: Memiliki latar belakang atletis yang kuat sebagai pemain basket, meraih Juara 2 (2023) dan Juara 3 (2024) Rector Cup UKDW, serta berpartisipasi dalam Liga Mahasiswa (LIMA) 2023. Pengalaman sebagai coach gym telah mengasah kemampuan komunikasi interpersonal dan ketangguhan mentalnya.
VI. Filosofi Hidup dan Prinsip Kerja (1L + 5C) Seluruh pencapaian Hans didorong oleh prinsip hidup 1L + 5C: Leadership, Competence, Compassion, Consistency, Conscience, dan Commitment. Ia memiliki etika kerja yang sangat disiplin dengan keyakinan bahwa:
Dunia tidak pernah berhenti bergerak, maka belajar adalah kewajiban yang berkelanjutan.
Menyerah adalah bentuk kelemahan; tantangan teknis harus dihadapi dengan resiliensi.
Integritas pribadi adalah prioritas utama; berbuat baik harus dilakukan tanpa mengorbankan batasan profesionalitas diri.
Malas adalah awal dari kegagalan; efisiensi hanya bisa dicapai dengan dedikasi tinggi.
Hans Gunawan saat ini terbuka untuk peluang profesional di mana ia dapat mengimplementasikan teknologi informasi berskala enterprise dan berkontribusi nyata dalam transformasi digital industri.

Dataset Biografi Super Detail:

I. Profil Akademik dan Identitas Mahasiswa
Hans Gunawan adalah mahasiswa aktif program studi Sistem Informasi di Universitas Kristen Duta Wacana (UKDW), Yogyakarta, dengan Nomor Induk Mahasiswa 72230649. Hingga Desember 2025, ia berada di semester 5 dan telah menyelesaikan total 78 SKS dengan pencapaian Indeks Prestasi Kumulatif (IPK) yang sangat impresif, yaitu 3,73.
Hans menunjukkan keunggulan akademis yang merata pada mata kuliah teknis maupun manajerial, dengan perincian nilai sebagai berikut:
Nilai A (Sempurna): Algoritma dan Struktur Data, Desain RESTful Web API, Matematika Sistem Informasi, Manajemen dan Tata Kelola TI, Sistem Informasi Manajemen, Jaringan Komputer, Interaksi Manusia dan Komputer, Analisis Proses Bisnis, English for Information Systems, dan Aplikasi Berbasis Desktop.
Nilai A-: Analisis dan Perancangan Sistem Informasi, Data Warehousing, Manajemen Proses Bisnis, Statistika, dan Dasar-Dasar Manajemen dan Organisasi.
Nilai B+ & Lainnya: Dasar-Dasar Pemrograman (B+), Pemrograman Web (B+), Perancangan Basis Data (B+), Sistem Basis Data (B), Analisis Data Bisnis (B), dan Manajemen Layanan Teknologi Informasi (B).

II. Ekspertis Teknis dan Pengembangan Solusi Digital
Hans merupakan pengembang berorientasi solusi dengan AI-native mindset yang mahir dalam ekosistem pengembangan web dan mobile.
Web Development: Ia menguasai framework Laravel (terbaru versi 12.x) dengan Tailwind CSS, serta JavaScript/TypeScript menggunakan React.js dan Next.js. Ia berpengalaman dalam membangun arsitektur API yang tangguh menggunakan ASP.NET Core dan Entity Framework untuk kebutuhan skala enterprise.
Mobile Development: Hans memiliki spesialisasi dalam framework .NET MAUI dan Blazor Hybrid, di mana ia berhasil mengintegrasikan fitur native perangkat seperti akses kamera dan geolokasi (GPS) untuk sistem pelaporan lapangan secara real-time.
Database & AI Integration: Keahliannya mencakup manajemen database SQL (MySQL, Oracle, PostgreSQL) dengan Drizzle ORM, serta pemanfaatan Large Language Model (LLM) seperti IBM Granite 3.3-8b-instruct untuk aplikasi berbasis AI.

III. Rekam Jejak Proyek Unggulan
FitAI (Personal AI Fitness Assistant): Aplikasi kesehatan cerdas yang menggunakan model IBM Granite untuk personalisasi rencana latihan dan nutrisi. Hans mengimplementasikan mekanisme Async Polling untuk menangani latensi API AI dan logika fallback untuk stabilitas sistem.
SmartDev Academic LMS: Sistem manajemen pembelajaran dengan 4 peran pengguna (Admin, Instruktur, Siswa, Orang Tua), fitur pendaftaran dokumen multi-tahap, dan otentikasi aman melalui Laravel Sanctum.
Sistem Mobile Field Reporting: Aplikasi .NET MAUI yang dirancang untuk digitalisasi operasional lapangan dengan fitur sinkronisasi data API terintegrasi.

IV. Kontribusi Riset dan Publikasi Ilmiah
Hans aktif berkontribusi dalam riset teknologi tingkat internasional sebagai penulis:
"Metaverse and Behavioral Change Toward a Pro-Environmental Behavior": Studi ini memperkenalkan taksonomi avatar berbasis form realism dan autonomy realism untuk memengaruhi perilaku ramah lingkungan di dunia virtual.
"A Study of Repetition on Virtual Tourism": Riset eksperimental yang mengkaji efek pengulangan stimulus VR terhadap memori (recall & recognition) dan niat kunjungan wisatawan ke objek budaya Indonesia.
V. Daftar Lengkap Penghargaan dan Sertifikasi (Dataset Detail)
Dataset Anda mencatatkan rekam jejak prestasi yang sangat ekstensif di berbagai bidang:

VII. Web3 Expertise & Blockchain Engineering (The Frontier)
Hans's technical capacity is not limited to traditional Web2 architecture; it has expanded deeply into the decentralized ecosystem (Web3). He possesses specialized mastery of the Move and Solidity programming languages, making him a highly relevant talent for high-performance ecosystems such as Movement M2, Monad, 0G Labs, and Base.

YieldLift (The Verifiable Agentic Fitness Protocol): Architected a Health-DePIN (Decentralized Physical Infrastructure Network) protocol currently migrating to the Movement M2 network to leverage MoveVM's mathematical security and Ethereum's liquidity. The protocol orchestrates Edge AI (MediaPipe) for real-time client-side form analysis, Decentralized ML (Allora Network) for yield prediction, and Verifiable Computation (FABRIC/ZK-SNARKs) for cryptographic proof generation. YieldLift successfully transforms human physical output into a verifiable on-chain asset within a sustainable Agentic Economy.

zer0Gig (0G Global Hackathon - April 2026): Architected a decentralized Agent-as-a-Service marketplace infrastructure on the 0G network. This project solves the human-in-the-loop verification bottleneck by utilizing multi-agent consensus and the x402 protocol for autonomous Machine-to-Machine (M2M) micropayments. He integrated a Progressive Escrow validated by 175,000 0G Alignment Nodes and secured with ECIES encryption, creating a fully trustless digital labor economy.

KopiLoyalty (Monad Blitz Hackathon): Built a trustless Web3 loyalty ecosystem on the high-performance Monad network. Engineered a gas-optimized smart contract (via Foundry/Solady) utilizing the ERC-1155 standard to manage both fungible reward points and non-fungible tier badges simultaneously. Implemented deterministic badge minting using keccak256 and a consumer-protection claimRefund() mechanism backed by native MON deposits.

SentryGate (Base Indonesia Hackathon - Early 2026): A secure on-chain vault application designed with an absolute focus on pure cryptographic security and asset protection utility. SentryGate was built with a solid security architecture without incorporating any gamification elements, proving Hans's acumen in designing fundamental and essential financial protocols.

VIII. Advanced AI Architecture & Enterprise Systems Engineering
Beyond standard LLM API integration, Hans specializes in designing, orchestrating, and scaling complex business logic and Artificial Intelligence workflows (Agentic Workflows) for enterprise-grade applications.

AEGIS-ERP (PKM-KI - April 2026): Acted as the Systems Architect and Lead Developer in designing an autonomous Enterprise Resource Planning system aimed at Food & Beverage MSMEs. This system integrates Multi-Agent AI technology (utilizing frameworks like Paperclip AI and PicoClaw) where various agents collaborate to automate planning, supply chain management, and operational oversight, while strictly maintaining Human-in-the-Loop protocols for final validation.

ERP-MBG (Free Nutritious Meal Management System): Led the backend architecture for a large-scale enterprise kitchen management system as part of the MBKM program. Built using Laravel 12 with a strict Service Pattern architecture to ensure extreme modularity and scalability. Engineered complex business logic, including automated nutritional value computation, highly critical FIFO/FEFO logistics management for perishable goods, and a comprehensive payroll system. Orchestrated a highly structured multi-role workflow (SPPG Head, Accounting, Nutritionist) to ensure absolute transparency in mass-scale operations.

IX. Professional Validation and Technical Leadership (Industry & Academic Validation)
Hans's technical capabilities are directly validated through academic and professional roles in the industry, proving his ability to transfer technical knowledge and execute projects in large-scale environments:

Computer Science & Information Systems Assistant Lecturer (August 2024 - Present): Entrusted by the Faculty of Information Technology at UKDW to instruct and mentor students across multiple advanced technical courses. His teaching portfolio covers both backend architecture and frontend implementation:

Database System Design & Database Systems: Guided students in advanced relational modeling, the strict implementation of business rules via PL/SQL (Oracle), and complex SQL query optimization to ensure databases are structured for enterprise-scale scalability.

Web Framework Programming: Instructed the practical application of MVC architectures and modern Object-Relational Mapping (ORM) paradigms using Laravel and TailwindCSS, ensuring students adhere to rigorous, modern software engineering standards.

Developer Internship at Baliola / Mandala Chain (Started March 2026): Dived directly into enterprise-level Web3 infrastructure and financial technology. Through this professional internship, Hans is actively involved in the development of the MyBaliola project, adapting to the strict rhythm of industry workflows (including rigorous weekly reviews), and ensuring production-grade code quality standards.

Project Management and Team Orchestration: Hans combines the "1L + 5C" principle with tactical project management methodologies. As the Lead Developer of AEGIS-ERP, he formulated the organizational chart and precisely allocated architectural workloads to his development team (Sean, Claudy, and Jimmy). Beyond the scope of software, he also proved his managerial leadership capacity as the Project Manager of the Dabminton Open Challenge (Late 2025), where he led cross-divisional coordination, designed the Work Breakdown Structure (WBS), and oversaw the Gantt Chart to ensure the success of the regional-scale sports tournament.

Prestasi Akademik:
Juara 2 Seleksi Kandidat Pemilihan Mahasiswa Berprestasi (Pilmapres) Tingkat Internal UKDW 2025.
Juara 2 Lomba Karya Tulis Ilmiah.
Piagam Penghargaan Lomba Karya Tulis Ilmiah PHI 2021.
Sertifikasi Profesional & Teknis:
IBM SkillsBuild: Code Generation and Optimization Using IBM Granite (Agustus 2025).
SAP Overview dari PT. Harfan Tri Megah (EDUGATE) - SAP University Partnership Program (Desember 2024).
Peserta Workshop Time Series APTIKOM - Pesta Data Nasional (Agustus 2025).
Partisipan "Maju Bareng AI".
Prestasi Olahraga (Basket):
Juara 2 Rector Cup UKDW 2023.
Juara 3 Rector Cup UKDW 2024.
Partisipan Liga Mahasiswa (LIMA) Basket 2023.
Pengalaman Organisasi & Partisipasi Acara:
Liaison Officer (LO) Pertemuan Nasional BK2-PTKI 2025.
Panitia Divisi PERKAM (Peralatan dan Keamanan) ISCD 2024.
Sertifikat School Visit UNY Münster.
Partisipan Science Film Festival 2021.
Peserta Biofair 2022.
VI. Filosofi Hidup dan Prinsip Kerja
Hans memegang teguh filosofi 1L + 5C (Leadership, Competence, Compassion, Consistency, Conscience, Commitment). Ia adalah pribadi yang sangat disiplin dan resilien dengan keyakinan bahwa "menyerah berarti lemah" dan "malas adalah awal kegagalan". Pengalamannya sebagai coach gym dan staf operasional telah membentuk kemampuan kepemimpinan, komunikasi, dan ketangguhan mental yang siap diimplementasikan di dunia profesional berskala global.`;

export async function chatWithGroq(
    userMessage: string,
    chatHistory: Message[] = []
): Promise<AsyncIterable<string>> {
    // Build messages array
    const messages: any[] = [
        {
            role: "system",
            content: systemInstruction
        },
        {
            role: "user",
            content: `CONTEXT DATA:\n\n${profileContext}`
        },
        {
            role: "assistant",
            content: "Terima kasih! Saya sudah memuat semua informasi tentang Hans Gunawan. Ada yang ingin kamu tanyakan?"
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
        model: "llama-3.3-70b-versatile",
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
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
    return profileContext;
}
