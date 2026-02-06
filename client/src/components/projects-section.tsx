import { motion } from "framer-motion";
import {
  fadeInVariants,
  staggerContainer,
  projectCardVariants,
} from "@/lib/animations";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: Array<{ name: string; color: string }>;
  liveUrl?: string;
  githubUrl?: string;
  mobileAppsUrl?: string;
  Docs?: string;
  Detail?: string;
}

const projects: Project[] = [
  {
    title: "Fit AI IBM App",
    description:
      "AI-powered fitness application integrating IBM Watson for personalized workout recommendations and progress tracking.",
    image:
      "/images/fitAi-profile.png",
    technologies: [
      { name: "React", color: "primary" },
      { name: "IBM Replicate", color: "accent" },
      { name: "Node.js", color: "primary" },
    ],
    liveUrl: "https://fit-ai-ibm.netlify.app",
  },
  {
    title: "Business Process Analysis - DFD & ERD",
    description:
      "Comprehensive analysis of business processes using Data Flow Diagrams (DFD) and Entity-Relationship Diagrams (ERD) to optimize workflows and data management.",
    image:
      "/images/UAS_PROSESBISNIS.png",
    technologies: [
      { name: "React", color: "primary" },
      { name: "IBM Replicate", color: "accent" },
    ],
    liveUrl: "https://drive.google.com/file/d/17LwvxDB9uCbMyBPyFKmNzd54Jkhb0TE6/view?usp=drive_link",
  },
  {
    title: "SmartDev Academic",
    description:
      "Interactive platform for academic research and collaboration between students, parents, and educators.",
    image: "/images/SmartDevAcademic-profile.png",
    technologies: [
      { name: "Laravel", color: "accent" },
      { name: "MySQL", color: "primary" },
      { name: "Chart.js", color: "accent" },
      { name: "Vanilla.js", color: "primary" },
      { name: "Tailwind CSS", color: "accent" },
      { name: "JWT Auth", color: "primary" },
      { name: "RestAPI", color: "accent" },
      { name: "Microservices", color: "primary" },
    ],
    githubUrl:
      "https://portohansgunawan.my.id/docs/frontend-guiding/testing_landingPage/index.html",
  },
  {
    title: "StudiBase Mobile App",
    description:
      "StudiBase Mobile is a freeze application built using .NET MAUI Blazor Hybrid to demonstrate the deep integration of a modern web interface (Blazor) with the native capabilities of mobile devices.",
    image: "/images/StudiBaseMobileApp-profile.png",
    technologies: [
      { name: ".NET MAUI Blazor Hybrid", color: "accent" },
      { name: "SQLite", color: "primary" },
      { name: "Razor", color: "accent" },
    ],
    githubUrl:
      "https://github.com/Shenhan01-sys/Mobile_Integrasi-API-upload-dengan-Camera_72230649?tab=readme-ov-file#-studibase-mobile-app",
  },
  {
    title: "Gym3",
    description:
      "Hackathon project about fitness PWA redefines home workouts by combining Groq AI-powered coaching with real-time camera pose detection. We leverage the Base blockchain to reward progress with NFT badges, providing a seamless, installable app experience without the need for an app store.",
    image:
      "/images/fit-ai-evolution-pwa-main-profile.png",
    technologies: [
      { name: "React", color: "primary" },
      { name: "Groq AI API Integration", color: "accent" },
      { name: "Base smart contract", color: "accent" },
      { name: "Node.js", color: "primary" },
      { name: "MediaPipe", color: "accent" },
      { name: "Base blockchain", color: "primary" },
      { name: "Tailwind CSS", color: "accent" },
      { name: "YOLO26n", color: "primary" },
    ],
    githubUrl: " https://github.com/Shenhan01-sys/FitnessAI_Hackathon",
  },
  {
    title: "Tekoperakku - capstone group project",
    description:
      "Capstone project web platform that serves as a center for documentation and promotion of the local silver industry through an integrated data management system, artisan profiles, and product catalog.",
    image:
      "/images/TekoperakkuProfilePicture.png",
    technologies: [
      { name: "Laravel 12", color: "primary" },
      { name: "Monolithic", color: "accent" },
      { name: "Tailwind CSS", color: "accent" },
      { name: "MySQL", color: "primary" },
    ],
    githubUrl: " https://github.com/Shenhan01-sys/FitnessAI_Hackathon",
    Detail: "https://kotagedekec.jogjakota.go.id/detail/index/35940/kemantren-kotagede-dan-ukdw-lakukan-penjajagan-kerjasama-inovasi-teko-perakku-dalam-pelestarian-identitas-kotagede-sebagai-kota-perak-2024-10-10",
    Docs: "https://drive.google.com/file/d/1BBZqa4VlMnz_XAu7eXd6j1bI9n2hxxhe/view?usp=drive_link",
  },
  {
    title: "Payshield - Progressive Escrow",
    description:
      "Secure milestone-based payments powered by Sui blockchain & escrow features. Using privy to authenticate users if you don't have a wallet yet.",
    image:
      "/images/EscrowProfilePicture.png",
    technologies: [
      { name: "React", color: "primary" },
      { name: "Move Smart Contract", color: "accent" },
      { name: "Node.js", color: "primary" },
      { name: "Turso (SqLite cloud)", color: "accent" },
      { name: "Sui Blockchain", color: "primary" },
      { name: "Tailwind CSS", color: "accent" },
    ],
    liveUrl: "https://pixel-perfect-hans.vercel.app/",
  },
  {
    title: "SentryGate - Smart & Transparent Digital Vault",
    description:
      "SentryGate is an Onchain Mini App built on the Base network that redefines how we store and verify our most critical documents. By combining military-grade encryption with decentralized storage and a seamless onchain payment gateway, SentryGate turns your wallet into a bulletproof digital vault",
    image:
      "/images/SentryGateProfilePicture.png",
    technologies: [
      { name: "React", color: "primary" },
      { name: "Solidity Smart Contract", color: "accent" },
      { name: "Node.js", color: "primary" },
      { name: "MySQL", color: "accent" },
      { name: "Base Blockchain", color: "primary" },
      { name: "Tailwind CSS", color: "accent" },
      { name: "IPFS Storage", color: "primary" },
      { name: "AES-256 Encryption", color: "accent" },
      { name: "Express.js", color: "primary" },
    ],
    liveUrl: "https://sentry-gate-app.vercel.app/",
    mobileAppsUrl: "https://base.app/app/https:/sentry-gate-app.vercel.app",
    Docs: "https://shenhan.gitbook.io/sentrygate-dos/",
  },
  {
    title: "SimpleLMS Microservice with Nest.js",
    description:
      "A Backend microservice for managing online courses and learning materials, built with modern tech stack and enterprise-grade security with Nest.js environment.",
    image:
      "/images/simpleLMSProfilePicture.png",
    technologies: [
      { name: "Nest.js", color: "primary" },
      { name: "RestAPI", color: "accent" },
      { name: "SweaggerUI", color: "accent" },
      { name: "Node.js", color: "primary" },
      { name: "Microservices", color: "accent" },
      { name: "PostgreSQL", color: "primary" },
      { name: "Supabase", color: "primary" },
      { name: "JWT Auth", color: "accent" },
    ],
    githubUrl: "https://github.com/Shenhan01-sys/SimpleMicroserviceWithNetJS",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="projects-title"
          >
            Featured Projects
          </motion.h2>

          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="break-inside-avoid project-card bg-background/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-lg hover:border-primary/50 transition-all duration-300"
                variants={projectCardVariants}
                whileHover={{ y: -5 }}
                data-testid={`project-card-${index}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} Interface`}
                    className="w-full h-36 sm:h-40 md:h-48 object-cover transition-transform duration-500 hover:scale-110"
                    data-testid={`project-image-${index}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3
                    className="heading-font text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-foreground"
                    data-testid={`project-title-${index}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed"
                    data-testid={`project-description-${index}`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech.name}
                        className={`bg-${tech.color}/10 text-${tech.color} px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium`}
                        data-testid={`project-tech-${index}-${techIndex}`}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 text-center text-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        data-testid={`project-live-demo-${index}`}
                      >
                        {project.liveUrl === "coming soon!"
                          ? "Coming Soon"
                          : "Live Demo"}
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] bg-secondary text-secondary-foreground py-2 px-4 rounded-lg font-medium hover:bg-secondary/80 transition-colors duration-300 text-center text-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        data-testid={`project-github-${index}`}
                      >
                        See GitHub Repo
                      </motion.a>
                    )}
                    {project.mobileAppsUrl && (
                      <motion.a
                        href={project.mobileAppsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-center text-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        data-testid={`project-mobile-app-${index}`}
                      >
                        <i className="fas fa-mobile-alt mr-1"></i> Mini App
                      </motion.a>
                    )}
                    {project.Docs && (
                      <motion.a
                        href={project.Docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[100px] bg-accent/20 text-accent py-2 px-4 rounded-lg font-medium hover:bg-accent/30 transition-colors duration-300 text-center text-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        data-testid={`project-docs-${index}`}
                      >
                        <i className="fas fa-book mr-1"></i> Docs
                      </motion.a>
                    )}
                    {project.Detail && (
                      <motion.a
                        href={project.Detail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[100px] border border-border text-foreground py-2 px-4 rounded-lg font-medium hover:bg-secondary/50 transition-colors duration-300 text-center text-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        data-testid={`project-details-${index}`}
                      >
                        <i className="fas fa-info-circle mr-1"></i> Details
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
