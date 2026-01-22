import { motion } from "framer-motion";
import { fadeInVariants, slideUpVariants } from "@/lib/animations";

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
              <div className="relative items-start gap-8">
                <img
                  src="/images/profile_image.png"
                  alt="Hans Gunawan - Professional Portrait"
                  className="rounded-2xl shadow-2xl w-full max-w-sm self-start lg:max-w-none"
                  data-testid="profile-image"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>

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
                I am an Information Systems student at Universitas Kristen Duta Wacana, focused on real-world business implementation
                through IT solution development. As a developer with an AI-native mindset, I believe that in the era of digital
                transformation, technology is not just a tool, but a strategic solution to enhance operational efficiency from
                various data perspectives.
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="about-paragraph-2">
                My technical expertise includes Full-stack Development (Laravel/React) and exploration of the .NET MAUI framework
                for mobile solutions integrated with native features (Camera & GPS). With the life principle of 1L + 5C, I am committed
                to continuously evolving beyond academic theory to address today's industry challenges. My experience as a gym coach
                and operational staff has shaped a resilient, disciplined, and adaptive character in both leadership and technical
                problem-solving.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  className="text-center p-6 bg-muted rounded-xl hover:bg-secondary transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  data-testid="stat-experience"
                >
                  <div className="text-3xl font-bold text-primary mb-2">2+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </motion.div>
                <motion.div
                  className="text-center p-6 bg-muted rounded-xl hover:bg-secondary transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  data-testid="stat-projects"
                >
                  <div className="text-3xl font-bold text-accent mb-2">10+</div>
                  <div className="text-sm text-muted-foreground">Projects & Events Completed</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
