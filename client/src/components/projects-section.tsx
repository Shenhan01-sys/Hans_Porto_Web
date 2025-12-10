import { motion } from "framer-motion";
import { fadeInVariants, staggerContainer, projectCardVariants } from "@/lib/animations";

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
    description: "AI-powered fitness application integrating IBM Watson for personalized workout recommendations and progress tracking.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
    technologies: [
      { name: "React", color: "primary" },
      { name: "IBM Replicate", color: "accent" },
      { name: "Node.js", color: "primary" },
    ],
    liveUrl: "https://fit-ai-ibm.netlify.app",
  },
  {
    title: "SmartDev Academic",
    description: "Interactive platform for academic research and collaboration between students, parents, and educators.",
    image: "/SmartDevAcademic-profile.png",
    technologies: [
      { name: "Laravel", color: "accent" },
      { name: "MySQL", color: "primary" },
      { name: "Chart.js", color: "accent" },
    ],
    liveUrl: "https://portohansgunawan.my.id/docs/frontend-guiding/testing_landingPage/index.html",
  },
  {
    title: "Data Insights Platform",
    description: "Interactive data visualization platform for business intelligence and predictive analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=400",
    technologies: [
      { name: "MERN Stack", color: "primary" },
      { name: "D3.js", color: "accent" },
      { name: "MongoDB", color: "primary" },
    ],
    liveUrl: "coming soon!",
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="project-card bg-background rounded-xl overflow-hidden shadow-lg"
                variants={projectCardVariants}
                data-testid={`project-card-${index}`}
              >
                <img 
                  src={project.image} 
                  alt={`${project.title} Interface`} 
                  className="w-full h-48 object-cover"
                  data-testid={`project-image-${index}`}
                />
                <div className="p-6">
                  <h3 className="heading-font text-xl font-semibold mb-3" data-testid={`project-title-${index}`}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4" data-testid={`project-description-${index}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={tech.name}
                        className={`bg-${tech.color}/20 text-${tech.color} px-3 py-1 rounded-full text-sm`}
                        data-testid={`project-tech-${index}-${techIndex}`}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <motion.a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 text-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-testid={`project-live-demo-${index}`}
                      >
                        {project.liveUrl === "coming soon!" ? "Coming Soon" : "Live Demo"}
                      </motion.a>
                    )}
                    <motion.button 
                      className="flex-1 border border-gray-700 text-foreground py-2 px-4 rounded-lg font-medium hover:bg-secondary transition-colors duration-300 text-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid={`project-details-${index}`}
                    >
                      Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CV Download Section */}
          <motion.div 
            className="mt-16 text-center"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-background rounded-xl p-8 max-w-md mx-auto">
              <h3 className="heading-font text-xl font-semibold mb-4" data-testid="cv-section-title">
                Curriculum Vitae
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="cv-section-description">
                Unduh CV lengkap untuk melihat detail pengalaman dan pendidikan saya.
              </p>
              <motion.a 
                href="https://drive.google.com/file/d/11NjqPWMcTskm_PxPUueqnDPp76Ah_UiK/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-full font-semibold hover:bg-accent/90 transition-all duration-300 glow-effect"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid="button-download-cv"
              >
                <i className="fas fa-download"></i>
                Unduh CV
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
