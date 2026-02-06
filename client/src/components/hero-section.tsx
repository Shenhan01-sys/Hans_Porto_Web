import { motion } from "framer-motion";
import { fadeInVariants, slideUpVariants } from "@/lib/animations";

export default function HeroSection() {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-10 sm:top-20 left-5 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="heading-font text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5, duration: 1 }}
            data-testid="hero-title"
          >
            Hans Gunawan
          </motion.h1>
          
          <motion.div 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-3 sm:mb-4"
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 3.5, duration: 0.8 }}
            data-testid="hero-subtitle"
          >
            <span className="gradient-text font-semibold">Information System Student</span> & 
            <span className="gradient-text font-semibold"> Data Management Enthusiast</span>
          </motion.div>
          
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 4, duration: 0.8 }}
            data-testid="hero-description"
          >
            An Information Systems student at UKDW, passionate about data management and developing innovative 
            technology-driven solutions to enhance business efficiency.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center px-4 sm:px-0"
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 4.5, duration: 0.8 }}
          >
            <motion.a 
              href="#projects" 
              className="bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 glow-effect text-sm sm:text-base"
              onClick={handleScrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-view-projects"
            >
              View Projects
            </motion.a>
            <motion.a 
              href="#contact" 
              className="border border-gray-700 text-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 text-sm sm:text-base"
              onClick={handleScrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-contact-me"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        data-testid="scroll-indicator"
      >
        <i className="fas fa-chevron-down text-primary text-lg sm:text-xl"></i>
      </motion.div>
    </section>
  );
}
