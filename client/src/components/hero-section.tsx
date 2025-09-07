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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full mix-blend-screen filter blur-xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="heading-font text-5xl md:text-7xl font-bold mb-6 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.5, duration: 1 }}
            data-testid="hero-title"
          >
            Hans Gunawan
          </motion.h1>
          
          <motion.div 
            className="text-xl md:text-2xl text-muted-foreground mb-4"
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
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 4, duration: 0.8 }}
            data-testid="hero-description"
          >
            Mahasiswa Sistem Informasi UKDW yang passionate dalam manajemen data dan pengembangan solusi inovatif 
            berbasis teknologi informasi untuk meningkatkan efisiensi bisnis.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={slideUpVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 4.5, duration: 0.8 }}
          >
            <motion.a 
              href="#projects" 
              className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 glow-effect"
              onClick={handleScrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-view-projects"
            >
              Lihat Proyek
            </motion.a>
            <motion.a 
              href="#contact" 
              className="border border-gray-700 text-foreground px-8 py-4 rounded-full font-semibold hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
              onClick={handleScrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="button-contact-me"
            >
              Hubungi Saya
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        data-testid="scroll-indicator"
      >
        <i className="fas fa-chevron-down text-primary text-xl"></i>
      </motion.div>
    </section>
  );
}
