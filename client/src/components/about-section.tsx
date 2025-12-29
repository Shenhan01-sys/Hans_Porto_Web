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
            Tentang Saya
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
            </motion.div>

            <motion.div
              variants={slideUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="about-paragraph-1">
                Saya adalah mahasiswa Sistem Informasi di Universitas Kristen Duta Wacana yang berfokus pada implementasi bisnis
                nyata melalui pengembangan solusi teknologi informasi. Sebagai pengembang dengan AI-native mindset, saya percaya
                bahwa di era transformasi digital, teknologi bukan sekadar alat bantu, melainkan solusi strategis untuk meningkatkan
                efisiensi operasional dari berbagai sudut pandang data.
              </p>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="about-paragraph-2">
                Keahlian teknis saya mencakup Full-stack Development (Laravel/React) serta eksplorasi framework .NET MAUI untuk
                solusi mobile yang terintegrasi dengan fitur native (Kamera & GPS). Dengan prinsip hidup 1L + 5C, saya berkomitmen
                untuk terus berevolusi melampaui teori akademis guna menjawab tantangan industri masa kini. Pengalaman saya sebagai
                coach gym dan staf operasional telah membentuk karakter yang resilien, disiplin, dan adaptif dalam kepemimpinan maupun
                pemecahan masalah teknis.
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
