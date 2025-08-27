import { motion } from "framer-motion";
import { fadeInVariants, staggerContainer } from "@/lib/animations";

interface Achievement {
  title: string;
  category: string;
  description?: string;
  icon: string;
  color: string;
}

const achievementsData: Achievement[] = [
  {
    title: "Outstanding Student (Pilmapres) 2025",
    category: "Academic Excellence",
    description: "2nd Place at university level, represented at LLDIKTI Region V",
    icon: "fas fa-trophy",
    color: "primary"
  },
  {
    title: "Basketball Achievements",
    category: "Sports",
    description: "2nd Place RECTOR CUP 2023, 3rd Place RECTOR CUP 2024, Player LIGA MAHASISWA Basketball 2023",
    icon: "fas fa-basketball-ball",
    color: "accent"
  },
  {
    title: "SAP Course Completion Certificate",
    category: "Professional Development",
    description: "SAP Overview from EDUGATE",
    icon: "fas fa-certificate",
    color: "primary"
  },
  {
    title: "Liaison Officer (LO)",
    category: "Leadership",
    description: "BK2-PTKI National Meeting 2025",
    icon: "fas fa-handshake",
    color: "accent"
  },
  {
    title: "PERKAM Division",
    category: "Event Organization",
    description: "ISCD 2024 event ('Python Coding Adventure...')",
    icon: "fas fa-code",
    color: "primary"
  },
  {
    title: "Research Publications",
    category: "Academic Research",
    description: "Co-Author on Metaverse research and Virtual Tourism studies",
    icon: "fas fa-book",
    color: "accent"
  }
];

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="heading-font text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="achievements-title"
          >
            Prestasi & Penghargaan
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {achievementsData.map((achievement, index) => (
              <motion.div
                key={index}
                className="bg-background rounded-xl p-6 hover:bg-secondary transition-colors duration-300"
                variants={fadeInVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                data-testid={`achievement-item-${index}`}
              >
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 bg-${achievement.color}/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${achievement.icon} text-${achievement.color} text-2xl`}></i>
                  </div>
                  <span className={`bg-${achievement.color}/20 text-${achievement.color} px-3 py-1 rounded-full text-xs font-medium`} data-testid={`achievement-category-${index}`}>
                    {achievement.category}
                  </span>
                </div>
                <h3 className="heading-font text-lg font-semibold mb-3 text-center" data-testid={`achievement-title-${index}`}>
                  {achievement.title}
                </h3>
                {achievement.description && (
                  <p className="text-muted-foreground text-sm text-center leading-relaxed" data-testid={`achievement-description-${index}`}>
                    {achievement.description}
                  </p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}