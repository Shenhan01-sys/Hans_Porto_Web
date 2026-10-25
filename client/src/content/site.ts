// All visible copy and data for the portfolio. Source: _resources/notes/profile-brief.md
// (Hans Gunawan's MyProfile vault, checked against the old site). Keep sentences short, no em dashes.

export interface Link {
  label: string;
  href: string;
}

export const asset = (path: string) => encodeURI(path);

export const person = {
  name: "Hans Gunawan",
  firstName: "Hans",
  lastName: "Gunawan",
  role: "I build AI agents, on-chain apps and the data systems under them.",
  study: "Information Systems at UKDW, Yogyakarta.",
  email: "hansgunawan775@gmail.com",
  cv: "/CV_HansGunawan.pdf",
  location: "Yogyakarta, Indonesia",
};

export const socials: Link[] = [
  { label: "GitHub", href: "https://github.com/Shenhan01-sys" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hans-gunawan01/" },
  { label: "X", href: "https://x.com/HGunawan07" },
  { label: "Instagram", href: "https://www.instagram.com/shen_han01/" },
];

export const nav = [
  { id: "work", label: "Work" },
  { id: "recognition", label: "Recognition" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "mcp", label: "MCP" },
  { id: "updates", label: "Updates" },
  { id: "contact", label: "Contact" },
] as const;

/* ---------------- about ---------------- */

export const about = {
  lede:
    "I build systems that humans and AI can both understand. Agents that apply for jobs but wait for your approval. Contracts that release money only when the work is verified. ERPs that keep every kitchen's stock honest.",
  paragraphs: [
    "I am a third-year Information Systems student at Universitas Kristen Duta Wacana. In 2026 my teams took 1st place at the Solve-It Challenge and in a track of the Mantle Turing Test Hackathon, and two of my projects reached the final 10 of the Indonesia Web3 Hackathon. The Applify agent also became my first-author paper, presented at ICIC-APTIKOM 2026 and soon published in IEEE Xplore.",
    "Outside the code I lead student teams, assist lab classes at the Faculty of Information Technology, and coach members at PF Gym & Fitness. I was formed at Kolese De Britto by 1L+5C: leadership, with competence, conscience, compassion, commitment and consistency.",
  ],
  facts: [
    { k: "Study", v: "B.Sc. Information Systems, UKDW, 2023 to 2027" },
    { k: "GPA", v: "3.79 / 4.00" },
    { k: "Focus", v: "Agentic AI, smart contracts, ERP and data" },
    { k: "Languages", v: "Indonesian, English, basic Mandarin" },
  ],
  principle: "Clarity over cleverness. Automation for humans.",
};

/* ---------------- work ---------------- */

export interface FeaturedProject {
  id: string;
  title: string;
  outcome: string;
  summary: string;
  role: string;
  date: string;
  stack: string[];
  image: string;
  imageAlt: string;
  links: Link[];
  note?: string;
}

export const featured: FeaturedProject[] = [
  {
    id: "applify",
    title: "Applify",
    outcome: "1st place, Solve-It Challenge 2026. First-author paper at ICIC-APTIKOM 2026.",
    summary:
      "A job-application agent built on MCP. It finds roles across platforms, ranks the fit, tailors the CV and cover letter, and submits only after you approve.",
    role: "Team lead and full-stack developer, team of 3",
    date: "Jun 2026",
    stack: ["React", "Fastify", "Playwright", "MCP", "Supabase"],
    image: "/images/work/applify.jpg",
    imageAlt:
      "Applify landing page in Indonesian: the headline 'Agen AI Otonom yang Melamar Kerja untukmu' beside an agent workspace panel.",
    links: [
      { label: "Live app", href: "https://applify-smart-job-applications.vercel.app" },
      { label: "Repository", href: "https://github.com/Shenhan01-sys/applify-smart-job-applications" },
      {
        label: "UKDW news",
        href: "https://ukdw.ac.id/tim-triple-a-ukdw-raih-juara-1-solve-it-challenge-2026-lewat-inovasi-ai-applify/",
      },
    ],
  },
  {
    id: "cult-oracle",
    title: "Cult of the Digital Oracle",
    outcome: "1st place, Consumer & Viral DApps track ($8,500), Mantle Turing Test Hackathon 2026.",
    summary:
      "An on-chain world on Mantle. Three AI agents read the chain and post prophecies, visitors stake USDY, and an AI altar judges them with EIP-712 signed verdicts. A 15,000-entity pixel world runs in the browser.",
    role: "Full-stack developer and PM, team build",
    date: "May to Jun 2026",
    stack: ["Mantle", "PixiJS", "Web Workers", "EIP-712"],
    image: "/images/work/cult-oracle.jpg",
    imageAlt: "Cult of the Digital Oracle: a gold pixel temple showing today's prophecy and an 'Enter the temple' button.",
    links: [
      { label: "Live app", href: "https://cult-oracle.vercel.app" },
      { label: "Repository", href: "https://github.com/Cult-of-the-Digital-Oracle/refactored-Main" },
      { label: "Demo video", href: "https://youtu.be/H5X87-bYTRE" },
      { label: "Mantle announcement", href: "https://x.com/Mantle_Official/status/2075596029408514552" },
    ],
  },
  {
    id: "printpitt",
    title: "PrintPitt",
    outcome: "2nd place, Monad Blitz Jogja Vol. 2, Monad Foundation and Dev Web3 Jogja, 24 October 2026.",
    summary:
      "Print shops race to claim a customer's print job on Monad. The payout falls every second and the late part returns to the customer as cashback. Orders are gasless, documents are encrypted, and the customer gets an NFT receipt at pickup. Live on Monad mainnet.",
    role: "Contracts, backend and infrastructure, in a team of 3 with Dave Aryanda Agape and Dex Bennett",
    date: "Oct 2026",
    stack: ["Solidity", "Foundry", "Node", "Envio", "React"],
    image: "/images/work/printpitt.jpg",
    imageAlt: "PrintPitt landing page: the headline 'The onchain print shop on Monad' beside an isometric photocopier.",
    links: [
      { label: "Live app", href: "https://printpitt-app.vercel.app" },
      { label: "Landing page", href: "https://printpitt-landing.vercel.app" },
      { label: "GitHub", href: "https://github.com/PrintPitt" },
      { label: "Mainnet contract", href: "https://monadscan.com/address/0x4b453b395eEa830C5CB208551A0326f6cd976f12#code" },
    ],
  },
  {
    id: "fabius",
    title: "Fabius",
    outcome: "Finalist, top 10 of 228 submissions, Indonesia Web3 Hackathon 2026 (Binance Academy, BNB Chain, Coinvestasi).",
    summary:
      "Paper-trading bots that seal every signal on BNB Chain before the market moves. Anyone can check a signal without a key or gas, pay per signal with x402, or pull signals into their own AI over MCP.",
    role: "Solo build",
    date: "Sep to Oct 2026",
    stack: ["Next.js", "Solidity", "Foundry", "Python", "MCP", "x402"],
    image: "/images/work/fabius.jpg",
    imageAlt: "Fabius landing page: the headline 'Signals sealed before the outcome' beside a glowing 3D cube.",
    links: [
      { label: "Live app", href: "https://fabius-one.vercel.app" },
      { label: "Repository", href: "https://github.com/Shenhan01-sys/Fabius" },
      { label: "Demo video", href: "https://youtu.be/6lldM9-cruw" },
      { label: "Hackathon page", href: "https://indonesiaweb3hack.xyz/en/projects/proj_2a7f1e5c86dac014a8" },
    ],
  },
  {
    id: "lencana",
    title: "Lencana",
    outcome: "Finalist, top 10 of 228 submissions, Indonesia Web3 Hackathon 2026, Consumer Apps track.",
    summary:
      "Learners sign in with email, pay for a micro-course without gas, take quizzes and essays, and earn an Open Badges 3.0 credential anyone can verify from one link. AI agents propose essay grades; a human reviewer approves them.",
    role: "Lead builder of a team of 3: contracts, credential signer and verifier",
    date: "Sep to Oct 2026",
    stack: ["Solidity", "BNB Attestation Service", "Open Badges 3.0", "Vite", "Cloudflare Workers"],
    image: "/images/work/lencana.jpg",
    imageAlt: "Lencana landing page in dark mode: 'Learn, test, and prove it.' beside a gold-framed credential card with a score of 92/100.",
    links: [
      { label: "Live app", href: "https://lencana-psi.vercel.app" },
      { label: "Repository", href: "https://github.com/Shenhan01-sys/Lencana" },
      { label: "Demo video", href: "https://youtu.be/2TD4bl1RJBw" },
      { label: "Hackathon page", href: "https://indonesiaweb3hack.xyz/en/projects/proj_3b383cf48823e20042" },
    ],
  },
  {
    id: "zer0gig",
    title: "zer0Gig",
    outcome: "Top 80 of 300+ teams, 0G APAC Hackathon 2026, Agentic Economy track.",
    summary:
      "A marketplace where AI agents with on-chain identities take paid jobs. Escrow pays out only when the work is verified, and new users can start in rupiah over QRIS.",
    role: "PM, team lead and full-stack developer",
    date: "Mar to May 2026",
    stack: ["0G", "ERC-7857", "MCP", "Supabase"],
    image: "/images/work/zer0gig.jpg",
    imageAlt: "zer0Gig landing page: 'Turns AI into productive economy assets' over a dark galaxy, with a search bar for agents.",
    links: [
      { label: "Live app", href: "https://zer0gig.vercel.app" },
      { label: "Docs", href: "https://stylenecy.gitbook.io/zer0gig" },
      { label: "GitHub", href: "https://github.com/zer0Gig" },
      { label: "Demo video", href: "https://youtu.be/7c46_zbH2iY" },
    ],
  },
  {
    id: "sentrygate",
    title: "SentryGate",
    outcome: "Solo build on Base: browser-side encryption and x402 payments, deployed to Base Sepolia.",
    summary:
      "A document vault. Files are encrypted in the browser, stored on IPFS and anchored on Base. Access is paid per use with x402 in a rupiah stablecoin.",
    role: "Solo, full-stack and contracts",
    date: "Jan 2026",
    stack: ["Next.js", "Solidity", "Foundry", "IPFS", "Privy"],
    image: "/images/work/sentrygate.jpg",
    imageAlt: "SentryGate: a shield logo, a wallet status card and the Scan Document and Open Vault buttons.",
    links: [
      { label: "Live app", href: "https://sentry-gate-app.vercel.app/" },
      { label: "Docs", href: "https://shenhan.gitbook.io/sentrygate-dos/" },
      { label: "Repository", href: "https://github.com/Shenhan01-sys/SentryGate_Hackathon" },
    ],
  },
  {
    id: "erp-mbg",
    title: "ERP MBG",
    outcome: "Led 6 engineers to a tested 10-module MVP in a national internship at Synapse Labs.",
    summary:
      "A multi-kitchen ERP for Indonesia's national free-meals program. Each kitchen sees only its own data, and stock moves first in, first out, or first to expire.",
    role: "Project manager and lead architect, team of 6",
    date: "Feb to May 2026",
    stack: ["Laravel 12", "PostgreSQL", "RBAC", "Docker"],
    image: "/images/work/erp-mbg.jpg",
    imageAlt:
      "Pantau Dapur MBG landing page: students holding meal trays under the headline 'Membangun Generasi Emas dengan Nutrisi Terjamin'.",
    links: [],
    note: "Internal system, no public link.",
  },
  {
    id: "heliquant",
    title: "HeliQuant",
    outcome: "Started at the Mantle Turing Test Hackathon 2026, grown into a multi-desk trading system.",
    summary:
      "An AI trading agent that changes strategy with the market regime. XGBoost models, Pyth and Allora feeds, contracts written in Foundry, and a TimesFM volatility forecast.",
    role: "Builder",
    date: "2026",
    stack: ["Python", "XGBoost", "Solidity", "Next.js"],
    image: "/images/work/heliquant.jpg",
    imageAlt: "HeliQuant landing page: 'Most bots redline. Ours holds gear.' beside a gear diagram of trading desks.",
    links: [
      { label: "GitHub", href: "https://github.com/HeliQuant" },
      { label: "Demo video", href: "https://youtu.be/DKTNGtcDRj4" },
    ],
  },
  {
    id: "payshield",
    title: "Payshield",
    outcome: "Milestone escrow on Sui, built after the Sui developer workshop at UGM.",
    summary:
      "Clients lock payment in escrow and release it milestone by milestone. People without a wallet sign in with Privy.",
    role: "Builder",
    date: "Jan 2026",
    stack: ["React", "Move", "Sui", "Turso"],
    image: "/images/work/payshield.jpg",
    imageAlt: "Payshield landing page: 'Progressive Escrow for the Future of Work' on a dark background.",
    links: [{ label: "Live app", href: "https://pixel-perfect-hans.vercel.app/" }],
  },
];

export interface ArchiveProject {
  year: string;
  title: string;
  what: string;
  stack: string;
  image?: string;
  link?: Link;
}

export const archive: ArchiveProject[] = [
  { year: "2026", title: "Reeve", what: "Turns a business procedure written in plain language into code that runs on its own. An independent auditor tests the code with mutation testing before any money moves. Solo entry for the CreateOS and Stripe hackathon.", stack: "TypeScript, Python, Claude, CreateOS, Stripe" },
  { year: "2026", title: "JitsuinFi", what: "Private invoice financing on Zcash testnet that stops one invoice from being financed twice. Rust and WebAssembly; in development for ZECATHON 2026.", stack: "Rust, WebAssembly, Zcash" },
  { year: "2026", title: "Nusastakes", what: "A 3D city you can save in: each city is a yield vault on Monad testnet run by its mayor, with passkey sign-in and gas paid for you. Solo entry for Monad Metropolis.", stack: "Next.js, three.js, Solidity, Chainlink CRE", image: "/images/work/nusastakes.jpg", link: { label: "Live app", href: "https://nusastakes.vercel.app" } },
  { year: "2026", title: "Fluxa", what: "Uniswap v4 hook that gives real-world-asset tokens a path to exit liquidity. UHI10 capstone.", stack: "Solidity, Foundry, Uniswap v4", image: "/images/work/fluxa.jpg" },
  { year: "2026", title: "AMPERA", what: "Crowdfunding for village solar, micro-hydro and biomass. Did not pass PLN ICE 2026 qualification.", stack: "React, FastAPI, PostGIS, YOLOv8", image: "/images/work/ampera.jpg", link: { label: "Repository", href: "https://github.com/AetherSolar/frontend" } },
  { year: "2026", title: "Pacifica Colosseum", what: "Battle-royale trading game on Pacifica's perpetuals DEX. Team build on Solana testnet.", stack: "Next.js, Three.js, Solana", image: "/images/work/pacifica.jpg", link: { label: "Live app", href: "https://pacifica-colosseum.vercel.app" } },
  { year: "2026", title: "AVAL", what: "AI agent that verifies and prices B2B invoices so suppliers get stablecoin credit early.", stack: "Casper, x402", image: "/images/work/aval.jpg", link: { label: "Repository", href: "https://github.com/AVALcspr/AVAL" } },
  { year: "2026", title: "AEGIS-ERP", what: "Autonomous ERP for catering businesses with human approval gates. Led a team of 4 for PKM-KI.", stack: "Multi-agent AI, MCP", image: "/images/work/aegis-erp.jpg" },
  { year: "2026", title: "POS KebayaOma", what: "Tablet point of sale for a kebaya shop: QR label per garment, QRIS, offline mode. Freelance.", stack: "Next.js PWA, Supabase, Xendit", image: "/images/work/pos-kebaya.jpg" },
  { year: "2026", title: "KopiLoyalty", what: "Coffee loyalty app: pay by QR, earn points, find cafes nearby.", stack: "Monad, Solidity", image: "/images/work/kopiloyalty.jpg" },
  { year: "2026", title: "Confidential OTC Desk", what: "Two institutions trade a tokenized asset for tokenized cash in one private settlement.", stack: "Canton, Daml" },
  { year: "2026", title: "Gym3", what: "Fitness PWA with an AI coach, camera pose checks and progress badges on Base.", stack: "React, Groq, MediaPipe, Base", image: "/images/work/gym3.jpg", link: { label: "Repository", href: "https://github.com/Shenhan01-sys/FitnessAI_Hackathon" } },
  { year: "2025", title: "FitAI", what: "Workout, nutrition and sleep plans generated by IBM Granite.", stack: "React, Express, PostgreSQL", image: "/images/work/fitai.jpg", link: { label: "Live app", href: "https://fit-ai-ibm.netlify.app" } },
  { year: "2025", title: "SmartDev Academic", what: "LMS with admin, instructor, student and parent roles. PM of a team of 5.", stack: "Laravel 12, Sanctum, MySQL", image: "/images/work/smartdev.jpg", link: { label: "Repository", href: "https://github.com/Shenhan01-sys/Project_lmsRPL3_SmartDev-Academic" } },
  { year: "2025", title: "SimpleLMS", what: "Backend service for courses and learning materials with JWT auth and Swagger docs.", stack: "NestJS, PostgreSQL, Supabase", image: "/images/work/simplelms.jpg", link: { label: "Repository", href: "https://github.com/Shenhan01-sys/SimpleMicroserviceWithNetJS" } },
  { year: "Course", title: "JAKVAS-SAW", what: "Cardiovascular risk check scored by a two-stage SAW model.", stack: "Python, SAW", image: "/images/work/jakvas-saw.jpg", link: { label: "Live app", href: "https://saw-modeling-heart-disease-shenhan.vercel.app" } },
  { year: "2024", title: "TekoPerakku", what: "Platform for Kotagede's silver artisans: profiles, catalog and documentation. Capstone team.", stack: "Laravel 12, MySQL", image: "/images/work/tekoperakku.jpg", link: { label: "Kotagede news", href: "https://kotagedekec.jogjakota.go.id/detail/index/35940/kemantren-kotagede-dan-ukdw-lakukan-penjajagan-kerjasama-inovasi-teko-perakku-dalam-pelestarian-identitas-kotagede-sebagai-kota-perak-2024-10-10" } },
  { year: "2024", title: "StudiBase Mobile", what: "Mobile app with camera upload and offline storage.", stack: ".NET MAUI Blazor, SQLite", image: "/images/work/studibase.jpg" },
  { year: "2024", title: "Business process analysis", what: "Data flow and entity-relationship models for a business case.", stack: "DFD, ERD", image: "/images/work/dfd-erd.jpg", link: { label: "Document", href: "https://drive.google.com/file/d/17LwvxDB9uCbMyBPyFKmNzd54Jkhb0TE6/view?usp=drive_link" } },
];

/* ---------------- recognition ---------------- */

export interface Award {
  year: string;
  result: string;
  event: string;
  project?: string;
  proof?: Link;
  image?: string;
  imageAlt?: string;
  /** "screen" crops from the top like a screenshot, "paper" shows a whole certificate page */
  fit?: "screen" | "paper";
}

export const awards: Award[] = [
  { year: "2026", result: "2nd place", event: "Monad Blitz Jogja Vol. 2, Monad Foundation and Dev Web3 Jogja, Garuda Spark Innovation Hub, 24 October 2026", project: "PrintPitt", image: "/images/work/printpitt.jpg", imageAlt: "PrintPitt landing page: the headline 'The onchain print shop on Monad' beside an isometric photocopier.", fit: "screen" },
  { year: "2026", result: "Two projects in the final 10", event: "Indonesia Web3 Hackathon 2026, 228 submissions, Binance Academy and BNB Chain", project: "Fabius and Lencana", proof: { label: "Finalist post", href: "https://www.instagram.com/p/DejfuU4EzpC/" }, image: "/images/social/ig-DejfuU4EzpC.jpg", imageAlt: "Indonesia Web3 Hackathon cover, co-hosted by Binance Academy, BNB Chain and Coinvestasi, with participants working on laptops.", fit: "screen" },
  { year: "2026", result: "Paper presented, first author", event: "ICIC 2026, the 11th International Conference on Informatics and Computing, Universitas Atma Jaya Yogyakarta. Soon in IEEE Xplore.", project: "Applify", proof: { label: "Certificate", href: "/images/proof/cert-icic-2026.jpg" }, image: "/images/proof/cert-icic-2026.jpg", imageAlt: "ICIC 2026 certificate of appreciation for Hans Gunawan's paper on an applicant-centered autonomous AI agent for job applications.", fit: "paper" },
  { year: "2026", result: "1st place, Consumer & Viral DApps track", event: "Mantle Turing Test Hackathon, $8,500 prize", project: "Cult of the Digital Oracle", proof: { label: "Mantle post", href: "https://x.com/Mantle_Official/status/2075596029408514552" }, image: "/images/work/cult-oracle.jpg", imageAlt: "Cult of the Digital Oracle temple screen.", fit: "screen" },
  { year: "2026", result: "1st place", event: "Solve-It Challenge 2026, UKRIDA", project: "Applify", proof: { label: "UKDW news", href: "https://ukdw.ac.id/tim-triple-a-ukdw-raih-juara-1-solve-it-challenge-2026-lewat-inovasi-ai-applify/" }, image: "/images/work/applify.jpg", imageAlt: "Applify landing page.", fit: "screen" },
  { year: "2026", result: "Accepted, cohort 10", event: "Uniswap Hook Incubator, Atrium Academy and Uniswap Foundation", project: "Fluxa", image: "/images/work/uhi10-square.jpg", imageAlt: "Uniswap Hook Incubator cohort 10 acceptance graphic with Hans's photo.", fit: "paper" },
  { year: "2026", result: "Top 80 of 300+ teams", event: "0G APAC Hackathon, Agentic Economy track", project: "zer0Gig", proof: { label: "HackQuest", href: "https://www.hackquest.io/projects/zer0Gig" }, image: "/images/work/zer0gig.jpg", imageAlt: "zer0Gig landing page over a dark galaxy.", fit: "screen" },
  { year: "2026", result: "3rd place", event: "Udayana Business Plan Competition", project: "Applify" },
  { year: "2026", result: "Progressive Scholarship", event: "Dicoding Coding Camp, DBS Foundation", image: "/images/work/dicoding-camp.jpg", imageAlt: "Coding Camp 2026 powered by DBS Foundation banner.", fit: "paper" },
  { year: "2025", result: "2nd place, Outstanding Student (Pilmapres)", event: "UKDW, delegate to LLDIKTI Region V", proof: { label: "Certificate, PDF", href: "/DataSet/achievements/Juara 2_Seleksi kandidat Pilmapres_Hans Gunawan.pdf" }, image: "/images/proof/pilmapres-2025.jpg", imageAlt: "Pilmapres 2025 certificate, 2nd place.", fit: "paper" },
  { year: "2024", result: "3rd place, men's basketball", event: "Rector's Cup, UKDW", proof: { label: "Certificate, PDF", href: "/DataSet/achievements/Sertifikat Juara 3 Basket Rector Cup 2024_Hans Gunawan.pdf" }, image: "/images/proof/rector-cup-2024.jpg", imageAlt: "Rector's Cup 2024 certificate, 3rd place men's basketball.", fit: "paper" },
  { year: "2023", result: "2nd place, men's basketball", event: "Rector's Cup, UKDW", proof: { label: "Certificate, PDF", href: "/DataSet/achievements/Sertifikat Juara 2 Basket Rector Cup 2023_Hans Gunawan.pdf" }, image: "/images/proof/rector-cup-2023.jpg", imageAlt: "Rector's Cup 2023 certificate, 2nd place men's basketball.", fit: "paper" },
  { year: "2022", result: "2nd place, scientific writing", event: "Unit Klinik Tani Scientific Festival, Universitas Jenderal Soedirman. High-school competition for Central Java and DIY", proof: { label: "Certificate, PDF", href: "/DataSet/achievements/Sertifikat Juara 2 Lomba Karya Tulis Ilmiah_Hans Gunawan.pdf" }, image: "/images/proof/kti-2022.jpg", imageAlt: "Scientific writing competition certificate, 2nd place.", fit: "paper" },
  { year: "2021", result: "3rd place, scientific writing", event: "PHI 2021, Universitas Sanata Dharma", proof: { label: "Certificate, PDF", href: "/DataSet/achievements/Piagam Penghargaan Lomba Karya Tulis Ilmiah PHI 2021_Hans Gunawan.pdf" }, image: "/images/proof/phi-2021.jpg", imageAlt: "PHI 2021 award charter, 3rd place.", fit: "paper" },
];

export interface Paper {
  year: string;
  title: string;
  venue: string;
  role: string;
  link?: Link;
  /** first page of the paper; papers without one get a typeset title page */
  page?: string;
  figure?: string;
  /** short badge for a paper that is not out yet, such as "Soon published" */
  status?: string;
}

export const publications: Paper[] = [
  {
    year: "2026",
    title: "Development of an Applicant-Centered Autonomous AI Agent for Job Vacancy Application",
    venue: "ICIC-APTIKOM 2026, Yogyakarta",
    role: "First author. Presented on 8 to 9 October 2026, to be published in IEEE Xplore.",
    status: "Soon published",
    link: { label: "Certificate", href: "/images/proof/cert-icic-2026.jpg" },
    page: "/images/proof/paper-icic-2026.jpg",
  },
  {
    year: "2025",
    title: "A Study of Repetition on Virtual Tourism: Understanding the Effect on Memory and Visit Intention",
    venue: "IEEE",
    role: "Co-author, with UKDW and National Tsing Hua University researchers.",
    link: { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11101036" },
    page: "/images/proof/paper-virtual-tourism.jpg",
  },
  {
    year: "2024",
    title: "Metaverse and Behavioral Change Toward a Pro-Environmental Behavior: the Role of Avatar",
    venue: "Manuscript",
    role: "Co-author, with NTHU, UKDW and Chulalongkorn University researchers.",
    link: { label: "Manuscript, PDF", href: "/DataSet/Publication/Publikasi Jurnal Metaverse Pro-Environmental Behavior_Hans Gunawan.pdf" },
    page: "/images/proof/paper-metaverse.jpg",
  },
];

export interface School {
  years: string;
  school: string;
  detail: string;
  logo: string;
  logoAlt: string;
  /** "mark" sits on a light tile, "photo" fills the tile */
  kind: "mark" | "photo";
}

export const education: School[] = [
  { years: "2020 to 2023", school: "Kolese De Britto", detail: "Mathematics and Computer Science track. Formed by 1L+5C: leadership, with competence, conscience, compassion, commitment and consistency.", logo: "/images/debrittoLogo.png", logoAlt: "Kolese De Britto crest", kind: "mark" },
  { years: "2023 to 2027", school: "Universitas Kristen Duta Wacana", detail: "B.Sc. Information Systems, Faculty of Information Technology. GPA 3.79 / 4.00. Teaching assistant since 2025.", logo: "/images/ukdwLogo.png", logoAlt: "Universitas Kristen Duta Wacana crest", kind: "mark" },
  { years: "2026", school: "Dicoding Coding Camp", detail: "Full-Stack Web Developer track, powered by DBS Foundation. Progressive Scholarship.", logo: "/images/work/dicoding-camp.jpg", logoAlt: "Coding Camp 2026 banner", kind: "photo" },
  { years: "2026", school: "Uniswap Hook Incubator, cohort 10", detail: "Atrium Academy and Uniswap Foundation. Capstone: Fluxa, an exit-liquidity hook for real-world-asset tokens.", logo: "/images/work/uhi10-square.jpg", logoAlt: "Uniswap Hook Incubator acceptance graphic", kind: "photo" },
];

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  href: string;
  thumb: string;
}

export const certificates: Certificate[] = [
  { title: "Claude Code in Action", issuer: "Anthropic Academy", year: "2026", href: "/DataSet/achievements/Sertifikat Claude Code Action_Anthopic Academy - Hans Gunawan.pdf", thumb: "/images/proof/cert-claude-code.jpg" },
  { title: "MCP Fundamentals for Building AI Agents", issuer: "Educative", year: "2026", href: "/DataSet/achievements/MCP_BuildingAIAgents - Hans Gunawan.pdf", thumb: "/images/proof/cert-mcp-educative.jpg" },
  { title: "Build and Deploy a Website on EdgeOne", issuer: "CodePolitan", year: "2026", href: "/DataSet/achievements/CodepolitanSertif_HansGunawan_organized (1).pdf", thumb: "/images/proof/cert-codepolitan.jpg" },
  { title: "Intro to Software Engineering", issuer: "RevoU", year: "2026", href: "/DataSet/achievements/Sertifikat Into to Software Engireering_RevoU - Hans Gunawan.pdf", thumb: "/images/proof/cert-revou.jpg" },
  { title: "Basic Web Programming", issuer: "Dicoding", year: "2026", href: "/DataSet/achievements/Sertifikat Basic Web Programming_DIcoding - Hans Gunawan.pdf", thumb: "/images/proof/cert-dicoding.jpg" },
  { title: "Committee, FORPIMAWA national essay competition", issuer: "LLDIKTI Region V", year: "2025", href: "/DataSet/achievements/IMG-20251017-WA0037.pdf", thumb: "/images/proof/cert-forpimawa-2025.jpg" },
  { title: "AI Productivity and AI API Integration", issuer: "Maju Bareng AI, Hacktiv8", year: "2025", href: "/DataSet/achievements/Maju Bareng AI -  Hans Gunawan.pdf", thumb: "/images/proof/cert-maju-bareng-ai.jpg" },
  { title: "Code Generation and Optimization Using IBM Granite", issuer: "IBM SkillsBuild", year: "2025", href: "/DataSet/achievements/Sertifikat IBM SkillsBuild - Code Generation and Optimization Using IBM Granite_Hans Gunawan.pdf", thumb: "/images/proof/cert-ibm-granite.jpg" },
  { title: "Time Series Analysis Workshop", issuer: "APTIKOM", year: "2025", href: "/DataSet/achievements/Workshop Time Series APTIKOM 2025 - Sertifikat Hans Gunawan.pdf", thumb: "/images/proof/cert-aptikom.jpg" },
  { title: "Liaison Officer, BK2-PTKI National Meeting", issuer: "UKDW", year: "2025", href: "/DataSet/achievements/Sertifikat Liaison Officer Pertemuan Nasional BK2-PTKI 2025_Hans Gunawan.pdf", thumb: "/images/proof/cert-bk2ptki.jpg" },
  { title: "SAP Overview", issuer: "Edugate, SAP University Partnership", year: "2024", href: "/DataSet/achievements/Sertifikat SAP Overview EDUGATE_Hans Gunawan.pdf", thumb: "/images/proof/cert-sap.jpg" },
  { title: "PERKAM division, ISCD 2024", issuer: "Committee", year: "2024", href: "/DataSet/achievements/Sertifikat Divisi PERKAM ISCD 2024_Hans Gunawan.pdf", thumb: "/images/proof/cert-iscd.jpg" },
  { title: "Liga Mahasiswa basketball", issuer: "Player", year: "2023", href: "/DataSet/achievements/Sertifikat Liga Mahasiswa Basket 2023_Hans Gunawan.pdf", thumb: "/images/proof/cert-lima-2023.jpg" },
];

/* ---------------- experience ---------------- */

export interface Role {
  dates: string;
  title: string;
  org: string;
  text: string;
  tags?: string[];
  link?: Link;
}

export const experience: { group: string; roles: Role[] }[] = [
  {
    group: "Now",
    roles: [
      { dates: "Aug 2025 to now", title: "Teaching Assistant", org: "Faculty of Information Technology, UKDW", text: "Runs lab sessions on database design, SQL and web frameworks, and checks student work in labs and exams.", tags: ["SQL", "PL/SQL", "Laravel"] },
      { dates: "Oct 2025 to now", title: "Technical Division", org: "BCC UKDW, Blockchain Club Community", text: "Runs Web3 study groups on Move, Sui and Base, including a Base mini-app group before a Base hackathon in January 2026.", tags: ["Sui", "Base"], link: { label: "bccukdw.xyz", href: "https://bccukdw.xyz/" } },
      { dates: "Jan 2026 to now", title: "Founder", org: "AMPERA", text: "Designed a crowdfunding model that routes investor money into village solar, micro-hydro and biomass, with AI site surveys. The PLN ICE 2026 entry did not pass qualification.", tags: ["Energy", "Fintech"] },
      { dates: "Dec 2023 to now", title: "Fitness Coach", org: "PF Gym & Fitness", text: "Coaches members on technique and training programs, and looks after administration and equipment." },
    ],
  },
  {
    group: "2026",
    roles: [
      { dates: "Feb to Aug 2026", title: "Web3 Developer, internship", org: "PT Baliola", text: "Owned the multi-approver document stamping module in SignBaliola: an immutable event log, live status over server-sent events, browser-side hashing and QR verification.", tags: ["Smart contracts", "SSE", "Playwright"] },
      { dates: "Feb to May 2026", title: "Project Manager and Lead Architect", org: "Synapse Labs, national internship program", text: "Led 6 engineers to a tested 10-module ERP for the national free-meals program. Designed per-kitchen data isolation in PostgreSQL and FIFO and FEFO stock on Laravel 12.", tags: ["Laravel 12", "PostgreSQL", "Leadership"] },
      { dates: "2026", title: "Freelance Full-stack Developer", org: "Kebaya Oma", text: "Specified and built the front end of a tablet point of sale with QRIS payments, thermal receipts and offline sync. Backend integration is in progress.", tags: ["Next.js", "Supabase"] },
      { dates: "Jan to May 2026", title: "Project Lead", org: "AEGIS-ERP, PKM-KI 2026", text: "Led 4 students designing an autonomous catering ERP with MCP agents and human approval gates.", tags: ["MCP", "Multi-agent"] },
      { dates: "Jan to Oct 2026", title: "Hackathon builder", org: "Independent and team entries", text: "Shipped on Base, Sui, Mantle, BNB Chain, 0G, Solana testnet, Canton, Casper and Monad. Two finalists at the Indonesia Web3 Hackathon 2026." },
      { dates: "2026", title: "Guest Speaker", org: "Information Systems orientation, UKDW", text: "Talk for new students on using coursework as a starting point for hackathons, research and self-taught skills." },
    ],
  },
  {
    group: "2025",
    roles: [
      { dates: "Aug to Dec 2025", title: "Project Manager and Full-stack Developer", org: "SmartDev Academic LMS", text: "Led a team of 5 with a charter, WBS, Gantt chart and risk log. Built the Laravel back end with Sanctum and OpenAPI docs.", tags: ["Laravel 12", "Sanctum"] },
      { dates: "Aug to Dec 2025", title: "Project Manager", org: "King of the Court badminton open", text: "Ran a 100-player tournament with a 25-person committee. Closed an IDR 4.1M budget with an IDR 937K surplus, and 90% of players rated it satisfied." },
      { dates: "Jul 2025", title: "Liaison Officer", org: "BK2-PTKI National Meeting, hosted by UKDW", text: "Coordinated delegates from Christian universities across Indonesia." },
      { dates: "Mar to Dec 2025", title: "Student Staff", org: "Marketing Office, UKDW", text: "Answered prospective students online, entered admission data and helped run school visits." },
    ],
  },
  {
    group: "Earlier",
    roles: [
      { dates: "Aug to Dec 2024", title: "Student Staff", org: "Biro III, UKDW", text: "Processed room loans, scheduled the sports hall and reviewed student organisations' reports." },
      { dates: "2023 to 2025", title: "Point guard", org: "UKDW basketball", text: "2nd place at the Rector's Cup 2023 and 3rd in 2024. Played in Liga Mahasiswa." },
      { dates: "Jun to Aug 2023", title: "Operational Staff", org: "Galeri Oma Vintage Store", text: "Made product content for social media and helped customers choose." },
    ],
  },
];

/* ---------------- stack ---------------- */

export type FigureName = "hub" | "vault" | "terminal" | "cabinet" | "stack" | "riffle" | "plug";

export const stackPlates: { title: string; claim: string; tools: string[]; usedIn: string[]; figure: FigureName; figureLabel: string }[] = [
  {
    title: "Agentic AI",
    claim: "Agents that act on their own and stop for a human before anything they cannot undo.",
    tools: ["MCP", "Playwright", "Fastify", "Gemini", "Groq", "IBM Granite"],
    usedIn: ["Applify", "zer0Gig", "Fabius", "AEGIS-ERP"],
    figure: "hub",
    figureLabel: "Line drawing of a hub with eight linked tiles. Move the pointer over a tile to raise it.",
  },
  {
    title: "Smart contracts",
    claim: "Contracts on nine networks, written and tested in Foundry, Move and Daml.",
    tools: ["Solidity", "Foundry", "Move", "Daml", "Uniswap v4 hooks", "x402", "Privy", "wagmi"],
    usedIn: ["Fabius", "Lencana", "SentryGate", "Payshield", "Cult of the Digital Oracle"],
    figure: "vault",
    figureLabel: "Line drawing of a vault door with a dial. Circle the pointer around the dial to turn it.",
  },
  {
    title: "Full-stack web",
    claim: "From the database schema to the button, in React, Next.js, Node and Laravel.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind", "Express", "NestJS", "Laravel 12", "Supabase"],
    usedIn: ["POS KebayaOma", "SmartDev Academic", "FitAI"],
    figure: "terminal",
    figureLabel: "Line drawing of a terminal window. Move the pointer up and down to scroll its history.",
  },
  {
    title: "Data and ERP",
    claim: "Data models for organisations with many owners: kitchens, classes, desks.",
    tools: ["PostgreSQL", "MySQL", "PL/SQL", "Python", "XGBoost", "TimesFM"],
    usedIn: ["ERP MBG", "HeliQuant", "JAKVAS-SAW"],
    figure: "cabinet",
    figureLabel: "Line drawing of a server rack with twelve blades. Move the pointer to pull blades out.",
  },
];

export const delivery = {
  lead: "Delivery and leadership",
  text: "Project charter, WBS, Gantt and risk logs. Teams of 4 to 25. Teaching assistant since August 2025.",
};

/* ---------------- updates ---------------- */

export interface Update {
  date: string;
  title: string;
  text: string;
  image?: string;
  imageAlt?: string;
  link?: Link;
}

export const updates: Update[] = [
  { date: "2026-10-16", title: "Fabius and Lencana reach the Indonesia Web3 Hackathon final", text: "Two of the final 10 projects, out of 228 submissions, at the hackathon co-hosted by Binance Academy, BNB Chain and Coinvestasi.", image: "/images/work/fabius.jpg", imageAlt: "Fabius landing page.", link: { label: "Finalist post on Instagram", href: "https://www.instagram.com/p/DejfuU4EzpC/" } },
  { date: "2026-10-14", title: "Nusastakes submitted to Monad Metropolis", text: "A city you can save in: yield vaults on Monad testnet, passkey sign-in, gas paid for you.", image: "/images/work/nusastakes.jpg", imageAlt: "Nusastakes landing page with a floating 3D city tile.", link: { label: "Open Nusastakes", href: "https://nusastakes.vercel.app" } },
  { date: "2026-06-26", title: "Accepted into the Uniswap Hook Incubator", text: "Cohort 10, run by Atrium Academy and the Uniswap Foundation. Capstone: Fluxa, an exit-liquidity hook for real-world-asset tokens.", image: "/images/work/uhi10.jpg", imageAlt: "Uniswap Hook Incubator cohort 10 acceptance graphic with Hans's photo." },
  { date: "2026-06-18", title: "Applify wins the Solve-It Challenge 2026", text: "Team Triple A took 1st place with an MCP job-application agent that asks before it submits.", image: "/images/work/applify.jpg", imageAlt: "Applify landing page.", link: { label: "Read on ukdw.ac.id", href: "https://ukdw.ac.id/tim-triple-a-ukdw-raih-juara-1-solve-it-challenge-2026-lewat-inovasi-ai-applify/" } },
  { date: "2026-06-15", title: "1st place in a Mantle Turing Test track", text: "Cult of the Digital Oracle won the Consumer & Viral DApps track and $8,500.", image: "/images/work/cult-oracle.jpg", imageAlt: "Cult of the Digital Oracle temple screen.", link: { label: "Mantle's post on X", href: "https://x.com/Mantle_Official/status/2075596029408514552" } },
  { date: "2026-02-06", title: "Dicoding Progressive Scholarship", text: "Selected for the Full-Stack Web Developer track of Coding Camp 2026, powered by DBS Foundation.", image: "/images/work/dicoding-camp.jpg", imageAlt: "Coding Camp 2026 powered by DBS Foundation banner." },
  { date: "2026-01-23", title: "DutaWacana Web3 study group", text: "A Base SDK mini-app study group at UKDW to prepare for a Base hackathon.", image: "/images/DutaWacanaWeb3_Study1.jpeg", imageAlt: "Students at a Web3 study session at UKDW.", link: { label: "Instagram highlight", href: "https://www.instagram.com/stories/highlights/18088726982047605/" } },
  { date: "2026-01-20", title: "Payshield goes live", text: "Milestone escrow on Sui, with Privy sign-in for people who have no wallet yet.", image: "/images/work/payshield.jpg", imageAlt: "Payshield landing page.", link: { label: "Open Payshield", href: "https://pixel-perfect-hans.vercel.app/" } },
];

export type Embed = {
  title: string;
  date?: string;
  cover?: string;
  coverAlt?: string;
  /** cover shape: posts are square, reels and TikToks are tall, videos are wide */
  shape: "square" | "tall" | "wide" | "text";
} & (
  | { kind: "youtube"; id: string; start?: number }
  | { kind: "instagram"; url: string }
  | { kind: "tiktok"; id: string; user: string }
  | { kind: "linkedin"; urn: string }
  | { kind: "x"; url: string }
);

// Covers were saved to /images/social so the page sends nothing to the networks until a visitor asks.
export const embeds: Embed[] = [
  { kind: "instagram", url: "https://www.instagram.com/p/DejfuU4EzpC/", date: "2026-10-16", title: "Indonesia Web3 Hackathon 2026 finalists, with Fabius and Lencana", cover: "/images/social/ig-DejfuU4EzpC.jpg", coverAlt: "Indonesia Web3 Hackathon cover with participants working on laptops.", shape: "square" },
  { kind: "instagram", url: "https://www.instagram.com/p/DUQKLp4k6RV/", date: "2026-02-02", title: "Rector's Cup 2025: Information Systems A takes 3rd in men's basketball", cover: "/images/social/ig-DUQKLp4k6RV.jpg", coverAlt: "Rector's Cup 2025 poster with the Duta Wacana and Rector Cup logos.", shape: "square" },
  { kind: "x", url: "https://twitter.com/Moving_03/status/2013842227274108993", date: "2026-01-21", title: "Sui dev workshop at Gadjah Mada University, where Payshield started", shape: "text" },
  { kind: "instagram", url: "https://www.instagram.com/p/DTuce7zEw_b/", date: "2026-01-21", title: "UGM Blockchain Club and Sui Indonesia workshop", cover: "/images/social/ig-DTuce7zEw_b.jpg", coverAlt: "Event poster with the UGM Blockchain Club and Sui Indonesia logos and two participants.", shape: "square" },
  { kind: "linkedin", urn: "urn:li:ugcPost:7417940591713443840", date: "2026-01-16", title: "LinkedIn update", shape: "text" },
  { kind: "instagram", url: "https://www.instagram.com/p/DPibpu4EgUO/", date: "2025-10-08", title: "UKDW school visit to SMA Pangudi Luhur Yosef Surakarta", cover: "/images/social/ig-DPibpu4EgUO.jpg", coverAlt: "UKDW Goes To SMA Pangudi Luhur Yosef Surakarta poster.", shape: "square" },
  { kind: "youtube", id: "NTkOHlZ3-Jc", start: 15204, date: "2025", title: "Dies Natalis 63 ceremony at UKDW, with the Pilmapres awards", cover: "/images/social/yt-NTkOHlZ3-Jc.jpg", coverAlt: "Dies Natalis 63 Duta Wacana title card.", shape: "wide" },
  { kind: "instagram", url: "https://www.instagram.com/reel/DLjsVoXvwW3/", date: "2025-07-01", title: "UKDW admissions reel: going home from campus at night", cover: "/images/social/ig-DLjsVoXvwW3.jpg", coverAlt: "A student getting on a scooter in the campus parking area, with the caption UKDW seru, ora resiko.", shape: "tall" },
  { kind: "tiktok", id: "7481493441654836485", user: "pmbukdw", date: "2025-03-14", title: "UKDW admissions: who says Informatics students are not fun?", cover: "/images/social/tt-7481493441654836485.jpg", coverAlt: "A student talking to the camera in front of the UKDW sign.", shape: "tall" },
  { kind: "youtube", id: "dXo618X13Yk", start: 73, title: "UKDW signs an MoU with coaches and student-athletes", cover: "/images/social/yt-dXo618X13Yk.jpg", coverAlt: "UKDW basketball players in green jerseys at the MoU event.", shape: "wide" },
  { kind: "instagram", url: "https://www.instagram.com/p/C_8f3ZtTYyf/", date: "2024-09-20", title: "Liga Mahasiswa qualification game day", cover: "/images/social/ig-C_8f3ZtTYyf.jpg", coverAlt: "A UKDW player in the Liga Mahasiswa jersey holding a basketball.", shape: "square" },
  { kind: "instagram", url: "https://www.instagram.com/p/DCHfEK2z786/", date: "2024-09-15", title: "UKDW basketball official roster", cover: "/images/social/ig-DCHfEK2z786.jpg", coverAlt: "The UKDW basketball team in green jerseys under the words Official roster.", shape: "square" },
];

/* ---------------- your own AI (MCP) ---------------- */

export const mcp = {
  title: "Bring your own AI",
  lede:
    "This portfolio is also a Model Context Protocol server. Connect Claude, Cursor or any MCP client and ask about my work in your own words. Every answer comes from the same data you see on this page.",
  points: [
    { title: "Read only", text: "Six tools that list and read. Nothing can write, send or change anything." },
    { title: "No keys, no sign-in", text: "Point your client at the address and it works." },
    { title: "Your AI does the thinking", text: "Your chat stays in your client. Only tool calls reach this site." },
    { title: "Same data as the page", text: "Projects, recognition, experience and contact, kept in one file." },
  ],
};

/* ---------------- contact ---------------- */

export const contact = {
  headline: "Write to me.",
  intro: "I read every message and reply within a day, by email or LinkedIn.",
  audiences: [
    { who: "Hiring for AI or Web3 engineering", ask: "Send the role and the team. My CV and code are linked on this page." },
    { who: "Forming a hackathon team", ask: "Tell me the chain, the track and the role you need." },
    { who: "A business that needs software", ask: "Describe the workflow: point of sale, ERP, LMS or a landing site." },
    { who: "Research or scholarship panels", ask: "My papers and CV are linked on this page. Ask for anything else." },
  ],
};
