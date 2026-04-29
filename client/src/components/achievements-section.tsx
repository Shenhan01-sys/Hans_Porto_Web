import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";

interface Achievement {
  title: string;
  category: string;
  description?: string;
  icon: string;
  color: string;
  fileUrl?: string; // Add fileUrl property for PDF links
}

const achievementsData: Achievement[] = [
  {
    title: "Outstanding Student (Pilmapres) 2025",
    category: "Academic Excellence",
    description: "2nd Place at university level, represented at LLDIKTI Region V",
    icon: "fas fa-trophy",
    color: "primary",
    fileUrl: "/DataSet/achievements/Juara 2_Seleksi kandidat Pilmapres_Hans Gunawan.pdf"
  },
  {
    title: "Claude Code Completion Course",
    category: "Academic Excellence",
    description: "Lesson Completion Certificate : Building AI Agent Applications with Claude Code",
    icon: "fas fa-trophy",
    color: "primary",
    fileUrl: "/DataSet/achievements/Sertifikat Claude Code Action_Anthopic Academy - Hans Gunawan.pdf"
  },
  {
    title: "Dicoding Basic Web Programming Completion Course",
    category: "Academic Excellence",
    description: "Lesson Completion Certificate : Building Mini Portfolio Website",
    icon: "fas fa-trophy",
    color: "primary",
    fileUrl: "/DataSet/achievements/Sertifikat Basic Web Programming_DIcoding - Hans Gunawan.pdf"
  },
  {
    title: "Outstanding Student (Pilmapres) 2025",
    category: "Academic Excellence",
    description: "2nd Place at university level, represented at LLDIKTI Region V",
    icon: "fas fa-trophy",
    color: "primary",
    fileUrl: "/DataSet/achievements/Juara 2_Seleksi kandidat Pilmapres_Hans Gunawan.pdf"
  },
  {
    title: "CodePolitan Completion Scholarship Course",
    category: "Academic Excellence",
    description: "Lesson Completion Certificate : Build & Deploy webiste on EdgeOne",
    icon: "fas fa-code",
    color: "primary",
    fileUrl: "/DataSet/achievements/CodepolitanSertif_HansGunawan_organized (1).pdf"
  },
  {
    title: "Educative Completion MCP Building AI Agent Course",
    category: "Academic Excellence",
    description: "Lesson Completion Certificate : Building AI Agents with LLMs",
    icon: "fas fa-square-binary",
    color: "primary",
    fileUrl: "/DataSet/achievements/MCP_BuildingAIAgents - Hans Gunawan.pdf"
  },
  {
    title: "Outstanding Student - Unit Klinik Tani 2022",
    category: "Paper Competition",
    description: "2nd Place scientific paper competition",
    icon: "fas fa-trophy",
    color: "accent",
    fileUrl: "/DataSet/achievements/Sertifikat Juara 2 Lomba Karya Tulis Ilmiah_Hans Gunawan.pdf"
  },
  {
    title: "Outstanding Student - PHI 2021",
    category: "Paper Competition",
    description: "3rd Place scientific paper competition",
    icon: "fas fa-trophy",
    color: "accent",
    fileUrl: "/DataSet/achievements/Piagam Penghargaan Lomba Karya Tulis Ilmiah PHI 2021_Hans Gunawan.pdf"
  },
  {
    title: "Publications: Repetition on Virtual Tourism",
    category: "Academic Research",
    description: "Co-Author, Understanding the Effect on Memory and Visit Intention",
    icon: "fas fa-book",
    color: "primary",
    fileUrl: "https://ieeexplore.ieee.org/document/11101036/authors#authors"
  },
  {
    title: "Maju Bareng AI",
    category: "Technology",
    description: "Certificate of Participation",
    icon: "fas fa-robot",
    color: "accent",
    fileUrl: "/DataSet/achievements/Maju Bareng AI -  Hans Gunawan.pdf"
  },
  {
    title: "IBM SkillsBuild: Code Gen & Optimization",
    category: "Professional Development",
    description: "Using IBM Granite",
    icon: "fas fa-code-branch",
    color: "primary",
    fileUrl: "/DataSet/achievements/Sertifikat IBM SkillsBuild - Code Generation and Optimization Using IBM Granite_Hans Gunawan.pdf"
  },
  {
    title: "SAP Overview EDUGATE",
    category: "Professional Development",
    description: "Course Completion Certificate",
    icon: "fas fa-certificate",
    color: "accent",
    fileUrl: "/DataSet/achievements/Sertifikat SAP Overview EDUGATE_Hans Gunawan.pdf"
  },
  {
    title: "Workshop Time Series APTIKOM 2025",
    category: "Professional Development",
    description: "Participant",
    icon: "fas fa-chart-line",
    color: "primary",
    fileUrl: "/DataSet/achievements/Workshop Time Series APTIKOM 2025 - Sertifikat Hans Gunawan.pdf"
  },
  {
    title: "Liaison Officer - BK2-PTKI 2025",
    category: "Leadership",
    description: "National Meeting Committee",
    icon: "fas fa-handshake",
    color: "accent",
    fileUrl: "/DataSet/achievements/Sertifikat Liaison Officer Pertemuan Nasional BK2-PTKI 2025_Hans Gunawan.pdf"
  },
  {
    title: "PERKAM Division - ISCD 2024",
    category: "Event Organization",
    description: "Committee Member",
    icon: "fas fa-users-cog",
    color: "primary",
    fileUrl: "/DataSet/achievements/Sertifikat Divisi PERKAM ISCD 2024_Hans Gunawan.pdf"
  },
  {
    title: "2nd Place - Rector Cup 2023",
    category: "Sports (Basketball)",
    description: "Achievement in University Basketball Tournament",
    icon: "fas fa-basketball-ball",
    color: "accent",
    fileUrl: "/DataSet/achievements/Sertifikat Juara 2 Basket Rector Cup 2023_Hans Gunawan.pdf"
  },
  {
    title: "3rd Place - Rector Cup 2024",
    category: "Sports (Basketball)",
    description: "Achievement in University Basketball Tournament",
    icon: "fas fa-basketball-ball",
    color: "accent",
    fileUrl: "/DataSet/achievements/Sertifikat Juara 3 Basket Rector Cup 2024_Hans Gunawan.pdf"
  },
  {
    title: "LIGA MAHASISWA Basketball 2023",
    category: "Sports (Basketball)",
    description: "Player Participation",
    icon: "fas fa-basketball-ball",
    color: "primary",
    fileUrl: "/DataSet/achievements/Sertifikat Liga Mahasiswa Basket 2023_Hans Gunawan.pdf"
  },
  {
    title: "Biofair 2022",
    category: "Participation",
    description: "Certificate of Participation",
    icon: "fas fa-leaf",
    color: "accent",
    fileUrl: "/DataSet/achievements/Sertifikat Peserta Biofair 2022_Hans Gunawan.pdf"
  },
  {
    title: "Science Film Festival 2021",
    category: "Participation",
    description: "Certificate of Participation",
    icon: "fas fa-film",
    color: "primary",
    fileUrl: "/DataSet/achievements/Sertifikat Partisipasi Science Film Festival 2021_Hans Gunawan.pdf"
  },
  {
    title: "School Visit UNY Münster",
    category: "International Exposure",
    description: "Visit Certificate",
    icon: "fas fa-plane",
    color: "accent",
    fileUrl: "/DataSet/achievements/Sertifikat School Visit UNY Münster_Hans Gunawan.pdf"
  }
];

export default function AchievementsSection() {

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Auto-play/auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 2500); // Change 2500 to desired ms
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="achievements" className="py-12 sm:py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="achievements-title"
          >
            Achievements & Awards
          </motion.h2>

          {/* Slider dengan tombol navigasi kiri-kanan */}
          <div className="relative mb-4 px-8 sm:px-10 md:px-12">
            {/* Left Button */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-primary/80 transition text-sm sm:text-base"
              aria-label="Previous"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            {/* Right Button */}
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-primary/80 transition text-sm sm:text-base"
              aria-label="Next"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            {/* Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-3 sm:gap-4 md:gap-6">
                {achievementsData.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className={`min-w-[260px] sm:min-w-[280px] md:min-w-[300px] max-w-[85vw] sm:max-w-xs flex-shrink-0 bg-background rounded-xl p-4 sm:p-5 md:p-6 hover:bg-secondary transition-colors duration-300 ${index === achievementsData.length - 1 ? "mr-4 sm:mr-6 md:mr-8" : ""}`}
                    variants={fadeInVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    data-testid={`achievement-item-${index}`}
                  >
                    <div className="text-center mb-3 sm:mb-4">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-${achievement.color}/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                        <i className={`${achievement.icon} text-${achievement.color} text-lg sm:text-xl md:text-2xl`}></i>
                      </div>
                      <span className={`bg-${achievement.color}/20 text-${achievement.color} px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium`} data-testid={`achievement-category-${index}`}>
                        {achievement.category}
                      </span>
                    </div>
                    <h3 className="heading-font text-sm sm:text-base md:text-lg font-semibold mb-2 sm:mb-3 text-center line-clamp-2" data-testid={`achievement-title-${index}`}>
                      {achievement.title}
                    </h3>
                    {achievement.description && (
                      <p className="text-muted-foreground text-xs sm:text-sm text-center leading-relaxed mb-3 sm:mb-4 line-clamp-3" data-testid={`achievement-description-${index}`}>
                        {achievement.description}
                      </p>
                    )}

                    {achievement.fileUrl && (
                      <div className="flex justify-center mt-auto">
                        <a
                          href={achievement.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-[10px] sm:text-xs font-medium text-${achievement.color} border border-${achievement.color} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-${achievement.color} hover:text-background transition-colors duration-300 flex items-center gap-1.5 sm:gap-2`}
                        >
                          <i className="fas fa-eye"></i> View Certificate
                        </a>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
