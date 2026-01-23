import { motion } from "framer-motion";
import { fadeInVariants, slideUpVariants } from "@/lib/animations";
import ProfileCard from "@/components/ui/ProfileCard";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="heading-font text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="about-title"
          >
            About Me
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              variants={fadeInVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Interactive Profile Card with Tech Orbit */}
              <ProfileCard 
                imageSrc="/images/profile_image.png" 
                name="Hans Gunawan" 
              />

              {/* CV Download Section */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-muted rounded-xl p-6 text-center">
                  <h3
                    className="heading-font text-lg font-semibold mb-3"
                    data-testid="cv-section-title"
                  >
                    Curriculum Vitae
                  </h3>
                  <p
                    className="text-muted-foreground text-sm mb-4"
                    data-testid="cv-section-description"
                  >
                    Download my full CV to view details of my experience and education
                  </p>
                  <motion.a
                    href="https://drive.google.com/file/d/1P0FPfOsv6XAQIibwTxa2dTPqIbZ_F7vu/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold hover:bg-accent/90 transition-all duration-300 glow-effect"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid="button-download-cv"
                  >
                    <i className="fas fa-download"></i>
                    Unduh CV
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={slideUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="about-paragraph-1">
                I am a Management student (HRM) and 2nd Winner of PILMAPRES UKDW 2025, dedicated to bridging organizational strategy with cutting-edge IT. 
                I have evolved from Full-stack development (React/TS/Laravel) to engineering Agentic AI systems using the Model Context Protocol (MCP) to build modular, 
                intelligent agents.
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="about-paragraph-2">
                As the Technical Coordinator of the DutaWacana Web3 Community, I specialize in Web3 Engineering (Move/Sui & Base L2), 
                developing decentralized solutions like Progressive Escrow, 
                Fit-AI Evolution, and Secure Onchain Vault (utilizing x402 and Privy).
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="about-paragraph-3">
                My leadership is proven through roles as Project Manager for SmartDev Academic and Dabminton, 
                a National Liaison Officer for BK2-PTKI, and an Assistant Lecturer for Database Design. 
                Guided by the 1L + 5C principle and the discipline of a Fitness Coach, 
                I create transformative technology strategically designed for the future of work and finance.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="text-center p-4 bg-muted rounded-xl hover:bg-secondary transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  data-testid="stat-experience"
                >
                  <div className="text-2xl font-bold text-primary mb-1">2+</div>
                  <div className="text-xs text-muted-foreground">Years Experience</div>
                </motion.div>
                <motion.div
                  className="text-center p-4 bg-muted rounded-xl hover:bg-secondary transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  data-testid="stat-projects"
                >
                  <div className="text-2xl font-bold text-accent mb-1">10+</div>
                  <div className="text-xs text-muted-foreground">Projects & Events</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
