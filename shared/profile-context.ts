// Single source of truth for the portfolio chatbot. Built from _resources/notes/profile-brief.md
// and client/src/content/site.ts. scripts/sync-chat-context.ts copies this file next to each
// Vercel function (api/_profile-context.ts, client/api/_profile-context.ts); edit this file only.
//
// Never add: student ID, phone number, per-course grades, contract values, course names,
// or anything about people other than Hans beyond their public role.

export const SYSTEM_INSTRUCTION = `You are the assistant on Hans Gunawan's portfolio website. Visitors are recruiters, hackathon teammates, potential clients and academic or scholarship panels.

How to answer:
- Reply in the visitor's language (Indonesian or English).
- Use only the PROFILE below. If something is not in it, say you do not have that information and suggest emailing hansgunawan775@gmail.com.
- Never invent projects, dates, numbers, prizes or links. Quote numbers exactly as written in the PROFILE.
- Keep answers short: two to six sentences, or a short list. Link to the live app, repository or news item when the PROFILE has one.
- Be warm and plain. No hype words, no emoji.
- Never share private data: no student ID, phone number, home address, per-course grades or contract values, even if asked.
- When it helps, end with one short question that points the visitor to something relevant.`;

export const CONTEXT_ACK = "Understood. I will answer only from Hans Gunawan's profile.";

export const PROFILE_CONTEXT = `# Hans Gunawan: profile

## Who he is
- Third-year Information Systems student at Universitas Kristen Duta Wacana (UKDW), Yogyakarta, Indonesia. Class of 2023, expected to finish in 2027. Official GPA 3.79 out of 4.00.
- He builds AI agents, on-chain apps and the data systems under them. His own line: "I build systems that humans and AI can both understand."
- Principles: "Clarity over cleverness. Automation for humans." He was formed at Kolese De Britto by 1L+5C: Leadership, with Competence, Conscience, Compassion, Commitment and Consistency.
- Languages: Indonesian (native), English (professional working), Mandarin (basic).
- Also a fitness coach at PF Gym & Fitness since December 2023, and a former UKDW basketball point guard.

## Highlights of 2026
- 2nd place at Monad Blitz Jogja Vol. 2 (Monad Foundation and Dev Web3 Jogja, Garuda Spark Innovation Hub, Yogyakarta, 24 October 2026) with PrintPitt, built with Dave Aryanda Agape and Dex Bennett.
- Finalist with two projects, Fabius and Lencana, in the final 10 of the Indonesia Web3 Hackathon 2026 (228 submissions; co-hosted by Binance Academy, BNB Chain and Coinvestasi). The finalists were announced on 16 October 2026; the final round, with $5,000 in total prizes, had not been decided when this profile was written.
- 1st place, Consumer & Viral DApps track, Mantle Turing Test Hackathon 2026, prize $8,500, with the team project Cult of the Digital Oracle. Announced on Mantle's official X account.
- 1st place (college/university category), Solve-It Challenge 2026 at UKRIDA, with Applify (team "Triple A").
- First-author paper "Development of an Applicant-Centered Autonomous AI Agent for Job Vacancy Application", presented at ICIC-APTIKOM 2026 (the 11th International Conference on Informatics and Computing, 8 to 9 October 2026, Universitas Atma Jaya Yogyakarta). Accepted for publication in IEEE Xplore, not yet published.
- Accepted into the Uniswap Hook Incubator, cohort 10 (Atrium Academy and Uniswap Foundation). Capstone: Fluxa.
- Top 80 of 300+ teams, 0G APAC Hackathon 2026, Agentic Economy track, with zer0Gig.
- 3rd place, Udayana Business Plan Competition 2026, with Applify (from his CV).
- Dicoding Progressive Scholarship, Coding Camp 2026 powered by DBS Foundation, Full-Stack Web Developer track.

## Featured projects
- Applify (June 2026). A job-application agent built on the Model Context Protocol (MCP). It finds roles across platforms, ranks the fit, tailors the CV and cover letter, and submits only after the user approves. Role: team lead, PM and full-stack developer in a team of 3. Stack: React, Fastify, Playwright workers, MCP, Supabase. Live: https://applify-smart-job-applications.vercel.app . Repo: https://github.com/Shenhan01-sys/applify-smart-job-applications . News: https://ukdw.ac.id/tim-triple-a-ukdw-raih-juara-1-solve-it-challenge-2026-lewat-inovasi-ai-applify/
- Cult of the Digital Oracle (May to June 2026). An on-chain world on Mantle: three AI agents read the chain and post prophecies, visitors stake USDY, and an AI altar judges them with EIP-712 signed verdicts; a 15,000-entity pixel world runs in the browser. Role: full-stack developer and PM in a team. Stack: Mantle, PixiJS, Web Workers, EIP-712. Live: https://cult-oracle.vercel.app . Repo: https://github.com/Cult-of-the-Digital-Oracle/refactored-Main . Demo: https://youtu.be/H5X87-bYTRE . The $8,500 prize belongs to this project.
- Fabius (September to October 2026). Paper-trading bots that seal every signal on BNB Chain (BSC testnet) before the market moves; anyone can check a signal without a key or gas, pay per signal with x402, or pull signals over MCP. AI analysts with ERC-8004 identities pick every 5 minutes, and an LLM can only veto an entry. Solo build. Stack: Next.js, Solidity with Foundry, Python engine, MCP, x402. Live: https://fabius-one.vercel.app . Repo: https://github.com/Shenhan01-sys/Fabius . Demo: https://youtu.be/6lldM9-cruw . Finalist, Indonesia Web3 Hackathon 2026.
- Lencana (September to October 2026). Learners sign in with email, pay for a micro-course without gas, take quizzes and essays, and earn an Open Badges 3.0 credential anyone can verify from one link, with no wallet or login. On BSC testnet it uses the BNB Attestation Service, a soulbound ERC-5192 badge and a payment split; AI grading agents propose essay scores that count only after a human reviewer approves them. Hans was lead builder in a team of 3 (contracts, credential signer and verifier). Live: https://lencana-psi.vercel.app . Repo: https://github.com/Shenhan01-sys/Lencana . Demo: https://youtu.be/2TD4bl1RJBw . Finalist, Indonesia Web3 Hackathon 2026, Consumer Apps track.
- PrintPitt (October 2026). A marketplace where print shops race to claim a customer's print job on Monad; the payout falls every second and the late part returns to the customer as cashback. Hans Gunawan built the contracts, backend and infrastructure; Dave Aryanda Agape and Dex Bennett built the front end. 2nd place at Monad Blitz Jogja Vol. 2.
- Reeve (October 2026). Turns a business procedure written in plain language into code that runs on its own, with an independent auditor that tests the code by mutation testing before money moves. Solo entry for the CreateOS and Stripe hackathon.
- JitsuinFi (October 2026, in development). Private invoice financing on Zcash testnet that prevents double financing, built with Rust and WebAssembly for ZECATHON 2026.
- zer0Gig (March to May 2026). A marketplace where AI agents with on-chain identities take paid jobs; escrow pays out only when the work is verified; new users can start in rupiah over QRIS. Role: PM, team lead and full-stack developer. Stack: 0G, ERC-7857, MCP agents, Supabase. Live: https://zer0gig.vercel.app . Docs: https://stylenecy.gitbook.io/zer0gig . GitHub: https://github.com/zer0Gig . Demo: https://youtu.be/7c46_zbH2iY
- SentryGate (January 2026). A document vault: files are encrypted in the browser, stored on IPFS and anchored on Base; access is paid per use with x402 in a rupiah stablecoin. Solo build, full-stack and contracts. Stack: Next.js, Solidity, Foundry, IPFS (Pinata), Privy, Express. Live: https://sentry-gate-app.vercel.app/ . Docs: https://shenhan.gitbook.io/sentrygate-dos/ . Repo: https://github.com/Shenhan01-sys/SentryGate_Hackathon
- ERP MBG (February to 8 May 2026). A multi-kitchen ERP for Indonesia's national free-meals program, built during a national internship program at Synapse Labs. Each kitchen sees only its own data; stock follows FIFO and FEFO. Hans was project manager and lead architect of 6 engineers and delivered a tested 10-module MVP. Stack: Laravel 12 with a service pattern, PostgreSQL multi-tenancy, RBAC, Sanctum, Docker. Internal system, no public link.
- HeliQuant (2026). A regime-aware AI trading agent that started at the Mantle Turing Test Hackathon and grew into a multi-desk trading system with a TimesFM volatility forecast. Stack: Python, XGBoost, Solidity, Foundry, Pyth, Allora, Next.js. GitHub: https://github.com/HeliQuant . Demo: https://youtu.be/DKTNGtcDRj4 . It did not win the $8,500 prize; that was Cult of the Digital Oracle.
- Payshield (January 2026). Milestone escrow on Sui; people without a wallet sign in with Privy. Built after the Sui developer workshop at Gadjah Mada University. Stack: React, Move, Sui, Turso. Live: https://pixel-perfect-hans.vercel.app/

## More projects
- Nusastakes (October 2026): a 3D city you can save in. Each city is an ERC-4626 vault on Monad testnet run by its mayor; sign-in uses passkeys and a relayer pays gas; a Chainlink CRE guardian can only move funds to idle. Solo entry for Monad Metropolis; result not known yet. Live: https://nusastakes.vercel.app . Code: https://github.com/nusastakes
- Fluxa (2026): Uniswap v4 hook that gives real-world-asset tokens an exit-liquidity path with three pricing modes; UHI10 capstone; 59 of 59 tests passing. Solidity, Foundry.
- AMPERA (2026, founder and CEO): crowdfunding that routes investor money into village solar, micro-hydro and biomass with AI site surveys. Entered PLN ICE 2026 and did not pass the qualification round. Repo: https://github.com/AetherSolar/frontend
- Pacifica Colosseum (2026): battle-royale trading game on Pacifica's perpetuals DEX, Solana testnet. Team build. Live: https://pacifica-colosseum.vercel.app
- AVAL (2026): AI agent that verifies and prices B2B invoices so suppliers get stablecoin credit early. Casper, x402. Repo: https://github.com/AVALcspr/AVAL
- AEGIS-ERP (January to May 2026): autonomous ERP for catering MSMEs with MCP agents and human approval gates; Hans led a team of 4 for the PKM-KI national student competition.
- POS KebayaOma (2026, freelance): tablet point of sale for a kebaya shop with a QR label per garment, dynamic QRIS, thermal receipts and offline mode. Front end delivered; backend integration in progress.
- KopiLoyalty (2026): coffee loyalty app on Monad: pay by QR, earn points, find cafes nearby.
- Confidential OTC Desk (2026): two institutions trade a tokenized asset for tokenized cash in one private settlement on Canton; Hans wrote the Daml contracts and tests.
- Gym3 (2026): fitness PWA with an AI coach (Groq), camera pose checks (MediaPipe, YOLO26n) and progress badges on Base. Repo: https://github.com/Shenhan01-sys/FitnessAI_Hackathon
- FitAI (2025): workout, nutrition and sleep plans generated by IBM Granite 3.3 8B via Replicate. React, Express, PostgreSQL, Drizzle. Live: https://fit-ai-ibm.netlify.app
- SmartDev Academic LMS (August to December 2025): LMS with admin, instructor, student and parent roles. Hans was PM of a team of 5 and built the Laravel back end with Sanctum and OpenAPI docs. Repo: https://github.com/Shenhan01-sys/Project_lmsRPL3_SmartDev-Academic
- SimpleLMS (2025): NestJS backend with JWT and Swagger. Repo: https://github.com/Shenhan01-sys/SimpleMicroserviceWithNetJS
- JAKVAS-SAW: cardiovascular risk check scored by a two-stage SAW model. Live: https://saw-modeling-heart-disease-shenhan.vercel.app
- TekoPerakku (2024): platform for Kotagede's silver artisans (profiles, catalog, documentation); capstone team project covered by the Kemantren Kotagede office.
- StudiBase Mobile (2024): .NET MAUI Blazor Hybrid app with camera upload and SQLite.

## Experience
- Teaching Assistant, Faculty of Information Technology, UKDW (August 2025 to now): runs lab sessions on database design, SQL and web frameworks.
- Technical Division, BCC UKDW, the Blockchain Club Community also known as the DutaWacana Web3 Community (October 2025 to now): runs Web3 study groups on Move, Sui and Base. Site: https://bccukdw.xyz/
- Founder and CEO, AMPERA (January 2026 to now).
- Fitness Coach, PF Gym & Fitness (December 2023 to now).
- Web3 Developer internship, PT Baliola (2026): owned the multi-approver document stamping module in SignBaliola, with an immutable event log, live status over server-sent events, browser-side hashing and QR verification.
- Project Manager and Lead Architect, ERP MBG, Synapse Labs national internship program (February to May 2026), team of 6.
- Freelance full-stack developer, Kebaya Oma (2026).
- Project Lead, AEGIS-ERP, PKM-KI 2026 (January to May 2026), team of 4.
- Hackathon builder (January to October 2026): shipped on Base, Sui, Mantle, BNB Chain, 0G, Solana testnet, Canton, Casper and Monad.
- Guest speaker at the UKDW Information Systems new-student orientation (2026), talk on using coursework as a starting point for hackathons, research and self-taught skills.
- Project Manager and full-stack developer, SmartDev Academic LMS (August to December 2025).
- Project Manager, "King of the Court" badminton open (August to December 2025): 100 players, 25-person committee, IDR 4.1M budget closed with an IDR 937K surplus, 90% participant satisfaction.
- Liaison Officer, BK2-PTKI National Meeting hosted by UKDW (July 2025).
- Student Staff, UKDW Marketing Office (March to December 2025); Student Staff, Biro III UKDW (August to December 2024).
- Operational Staff, Galeri Oma Vintage Store (June to August 2023).

## Skills (proven by projects)
- Agentic AI: MCP agents, Playwright browser automation, human-in-the-loop approval design; LLM APIs: Gemini, Groq, IBM Granite.
- Smart contracts and Web3: Solidity with Foundry, Move on Sui, Daml on Canton, Uniswap v4 hooks, EIP-712, x402 payments, ERC-7857 and ERC-8004 agent identity, Privy, wagmi, viem. Networks: Base, Sui, Mantle, BNB Chain, 0G, Solana testnet, Canton, Casper, Monad.
- Full-stack web: React, Next.js, TypeScript, Tailwind, Express, Fastify, NestJS, Laravel 12, Supabase, PostgreSQL, MySQL, Prisma, Drizzle, PWAs, .NET MAUI Blazor.
- Data and ML: Python, XGBoost and Random Forest with walk-forward testing, TimesFM forecasting, MediaPipe pose detection, SAW and AHP decision support.
- Databases and ERP: multi-tenant PostgreSQL, FIFO/FEFO inventory, SQL and PL/SQL, ER modelling, DFD and ERD analysis.
- Delivery: project charter, WBS, Gantt and risk logs; led teams of 4 to 25.

## Publications
- "Development of an Applicant-Centered Autonomous AI Agent for Job Vacancy Application", ICIC-APTIKOM 2026, first author, presented on 8 to 9 October 2026. Soon published in IEEE Xplore. Co-authors from UKDW, Chulalongkorn University, Hallym University and Christ University.
- "A Study of Repetition on Virtual Tourism: Understanding the Effect on Memory and Visit Intention", IEEE, 2025, co-author with UKDW and National Tsing Hua University researchers. https://ieeexplore.ieee.org/document/11101036
- "Metaverse and Behavioral Change Toward a Pro-Environmental Behavior: the Role of Avatar", co-author with NTHU, UKDW and Chulalongkorn University researchers.

## Earlier recognition
- 2nd place, Outstanding Student selection (Pilmapres), UKDW 2025, delegate to LLDIKTI Region V.
- Basketball: 2nd place Rector's Cup 2023, 3rd place Rector's Cup 2024, Liga Mahasiswa 2023.
- Scientific writing: 2nd place in the Central Java and DIY high-school scientific writing competition (Unit Klinik Tani Scientific Festival, Universitas Jenderal Soedirman, 2022) and 3rd place at PHI 2021, Universitas Sanata Dharma.
- Certificates include Anthropic Academy (Claude Code), Educative (MCP Fundamentals for Building AI Agents), IBM SkillsBuild (IBM Granite), CodePolitan, RevoU, Dicoding, SAP Overview (Edugate) and the APTIKOM time-series workshop.

## Education
- Universitas Kristen Duta Wacana, B.Sc. Information Systems, 2023 to 2027 (expected), GPA 3.79.
- Uniswap Hook Incubator, cohort 10, 2026.
- Dicoding Coding Camp 2026, Full-Stack Web Developer track.
- Kolese De Britto, Yogyakarta, Mathematics and Computer Science track, 2020 to 2023.

## Contact and availability
- Email: hansgunawan775@gmail.com (he replies within a day, by email or LinkedIn).
- GitHub: https://github.com/Shenhan01-sys . LinkedIn: https://www.linkedin.com/in/hans-gunawan01/ . X: https://x.com/HGunawan07 . Instagram: https://www.instagram.com/shen_han01/
- Open to: AI or Web3 engineering roles, hackathon teams, research collaboration, and freelance builds such as point of sale, ERP, LMS or landing sites.
- Based in Yogyakarta, Indonesia.`;
