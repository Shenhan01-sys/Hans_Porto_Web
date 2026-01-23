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
    title: "SmartDev Academic",
    description:
      "Interactive platform for academic research and collaboration between students, parents, and educators.",
    image: "/images/SmartDevAcademic-profile.png",
    technologies: [
      { name: "Laravel", color: "accent" },
      { name: "MySQL", color: "primary" },
      { name: "Chart.js", color: "accent" },
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
    title: "Data Insights Platform",
    description:
      "Interactive data visualization platform for business intelligence and predictive analytics.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
    technologies: [
      { name: "MERN Stack", color: "primary" },
      { name: "D3.js", color: "accent" },
      { name: "MongoDB", color: "primary" },
    ],
    liveUrl: "coming soon!",
  },
  {
    title: "Fit AI Evolution pwa",
    description:
      "Our fitness PWA redefines home workouts by combining Groq AI-powered coaching with real-time camera pose detection. We leverage the Base blockchain to reward progress with NFT badges, providing a seamless, installable app experience without the need for an app store.",
    image:
      "/images/fit-ai-evolution-pwa-main-profile.png",
    technologies: [
      { name: "React", color: "primary" },
      { name: "IBM Replicate", color: "accent" },
      { name: "Base smart contract", color: "accent" },
      { name: "Node.js", color: "primary" },
      { name: "MediaPipe", color: "accent" },
      { name: "Base blockchain", color: "primary" },
      { name: "Tailwind CSS", color: "accent" },
      { name: "YOLO11n", color: "primary" },
    ],
    githubUrl: "https://github.com/Shenhan01-sys/fit-ai-evolution-pwa?tab=readme-ov-file#%EF%B8%8F-fitai-evolution---ai-powered-fitness-pwa",
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
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="heading-font text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="projects-title"
          >
            Featured Projects
          </motion.h2>

          <motion.div
            className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
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
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    data-testid={`project-image-${index}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3
                    className="heading-font text-xl font-semibold mb-3 text-foreground"
                    data-testid={`project-title-${index}`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-muted-foreground mb-4 text-sm leading-relaxed"
                    data-testid={`project-description-${index}`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech.name}
                        className={`bg-${tech.color}/10 text-${tech.color} px-3 py-1 rounded-full text-xs font-medium`}
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
                    <motion.button
                      className="flex-1 min-w-[100px] border border-border text-foreground py-2 px-4 rounded-lg font-medium hover:bg-secondary/50 transition-colors duration-300 text-center text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      data-testid={`project-details-${index}`}
                    >
                      Details
                    </motion.button>
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
