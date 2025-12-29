FitAIWithIBMFinal - Personal AI Fitness Assistant Powered by IBM GraniteFitAI adalah aplikasi web full-stack modern yang dirancang untuk menjadi asisten kebugaran pribadi. Aplikasi ini memanfaatkan kecerdasan buatan (IBM Granite 3.3-8b-instruct) untuk menghasilkan rencana latihan, panduan nutrisi, dan strategi tidur yang dipersonalisasi berdasarkan data fisiologis pengguna (berat badan, massa otot, lemak tubuh, usia, dan tujuan).🚀 Fitur UtamaPersonalisasi Mendalam: Input data biometrik pengguna untuk hasil yang akurat.AI-Generated Plans:🏋️ Workout Plan: Jadwal latihan mingguan dengan set & repetisi spesifik.🥗 Nutrition Plan: Target makronutrien dan saran menu harian.😴 Sleep Strategy: Protokol pemulihan dan higiene tidur.Interactive Chatbot: Tanya jawab seputar kebugaran dengan konteks profil pengguna.Dashboard Monitoring: Pelacakan progres mingguan.🛠 Tech StackFrontendFramework: React 18 (TypeScript)Build Tool: ViteStyling: Tailwind CSS, Tailwind AnimateUI Components: Radix UI (headless UI), Lucide React (icons)State Management: TanStack Query (React Query)Routing: WouterBackendRuntime: Node.jsFramework: Express.jsLanguage: TypeScriptArchitecture: REST APIDatabase & ORMDatabase: PostgreSQL (via Neon Database Serverless)ORM: Drizzle ORMSchema Validation: Zod & Drizzle-ZodArtificial IntelligenceModel Provider: Replicate API / IBM WatsonXModel: IBM Granite 3.3-8b-instructIntegration Method: Async Polling Mechanism🧠 Deep Dive: Logika Implementasi AIBagian ini menjelaskan bagaimana backend berinteraksi dengan LLM (Large Language Model) secara teknis. File referensi utama: server/ai-service-replicate.ts.1. Model & InfrastrukturSistem menggunakan model IBM Granite (melalui Replicate) yang dioptimalkan untuk instruksi (instruct-tuned). Backend tidak melakukan streaming langsung, melainkan menggunakan mekanisme Asynchronous Polling untuk stabilitas.2. Alur Request (Prediction Lifecycle)Setiap kali pengguna meminta rencana (misal: /api/generate-plans), alur berikut terjadi:Context Injection: Data profil pengguna dari database (UserProfile) disuntikkan ke dalam Prompt Template.Contoh Logic Prompt:TypeScriptconst contextInfo = `
Context pengguna:
- Berat: ${profile.weight}kg, Lemak: ${profile.bodyFat}%
- Usia: ${profile.age} tahun, Tujuan: ${profile.goal}
`;
Creation Request (POST): Backend mengirim request ke endpoint Replicate untuk memulai prediksi.Payload mencakup: prompt, max_tokens (1000), temperature (0.7), top_p (0.9).Polling Loop: Karena inferensi model besar membutuhkan waktu, server melakukan polling (pengecekan berkala) ke API Replicate menggunakan prediction.id.Interval: 1 detik.Max Attempts: 30 kali.Completion Parsing: Setelah status berubah menjadi succeeded, output teks digabungkan dan dikirim ke frontend.3. Fail-Safe Mechanism (Fallback Logic)Sangat krusial untuk UX. Jika API key tidak valid, kuota habis, atau server AI timeout, sistem secara otomatis beralih ke Fallback Response (Hardcoded best-practice plans).Logic: try/catch block membungkus panggilan API. Jika error terdeteksi, fungsi getFallbackResponse(prompt) dipanggil.Deteksi Intent: Fallback memindai kata kunci dalam prompt (misal: "program latihan", "nutrisi") untuk memberikan jawaban statis yang relevan agar aplikasi tidak crash.📂 Struktur Database (Schema)Menggunakan Drizzle ORM (shared/schema.ts), database terdiri dari dua entitas utama:1. usersTabel autentikasi dasar.id: UUID (Primary Key)username: Text (Unique)password: Text2. user_profilesMenyimpan data fisiologis untuk konteks AI.id: UUIDuserId: Foreign Key ke usersweight: Integer (kg)bodyFat: Integer (%)muscleMass: Integer (%)age: Integergoal: Text ('cutting', 'bulking', 'recomposition')completed: JSON (Melacak status penyelesaian tugas harian)🔌 Dokumentasi APIBackend mengekspos endpoint REST berikut (server/routes.ts):MethodEndpointDeskripsiPayloadPOST/api/profileMembuat/Update profil user{ name, weight, bodyFat, muscleMass, age, goal }GET/api/profileMengambil profil user saat ini-POST/api/generate-plansAI: Generate 3 rencana sekaligus- (Menggunakan data profil tersimpan)POST/api/generate-scheduleAI: Generate jadwal mingguan-POST/api/chatAI: Chat interaktif{ message: string }PATCH/api/profile/completionUpdate checklist harian{ completed: { "day-task": boolean } }Catatan: Saat ini sistem menggunakan userId = "demo-user" secara hardcoded untuk tujuan demonstrasi tanpa login kompleks.⚙️ Cara Instalasi & MenjalankanPrasyaratNode.js (v18+)PostgreSQL Database (Siapkan connection string)1. Clone & InstallBashgit clone <repository-url>
cd FitAI_With_IBM_FINAL
npm install
2. Konfigurasi Environment VariablesBuat file .env di root project:Cuplikan kode# Database
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# AI Configuration (Gunakan salah satu atau keduanya sesuai file service yang aktif)
# Untuk Replicate (Aktif di routes.ts):
API_TOKEN_IBM=r8_your_replicate_token_here
MODEL_IBM_VERSION_HASH=versi_hash_model_ibm_granite

# Opsional (Jika menggunakan WatsonX langsung):
IBM_GRANITE_API_KEY=your_ibm_api_key
IBM_WATSONX_API_URL=https://us-south.ml.cloud.ibm.com
IBM_WATSONX_PROJECT_ID=your_project_id
3. Database PushSinkronisasi schema Drizzle ke database PostgreSQL Anda:Bashnpm run db:push
4. Menjalankan AplikasiMode pengembangan (Frontend + Backend concurrent):Bashnpm run dev
Akses aplikasi di http://localhost:5000.📁 Struktur Folder ProyekFitAI_With_IBM_FINAL/
├── client/                 # Frontend React Code
│   ├── src/
│   │   ├── components/     # UI Components (AI Chat, Plans, Charts)
│   │   ├── hooks/          # Custom Hooks (use-toast, etc)
│   │   ├── pages/          # Halaman utama (Dashboard, Onboarding)
│   │   └── lib/            # Utilities (QueryClient, utils)
├── server/                 # Backend Node/Express Code
│   ├── ai-service.ts       # Service AI (Legacy/WatsonX direct)
│   ├── ai-service-replicate.ts # Service AI (Active - Replicate Poll)
│   ├── routes.ts           # API Route Definitions
│   └── storage.ts          # Database Interface
├── shared/                 # Code shared between Front & Back
│   └── schema.ts           # Drizzle Schema & Zod Types
└── ...config files
🛡️ LisensiProject ini dilisensikan di bawah MIT License.