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
  fileUrl?: string; // Menambahkan properti fileUrl untuk link PDF
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", speed: 6 });
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Auto-play/auto-scroll
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 2500); // Ganti 2500 ke ms yang diinginkan
    return () => clearInterval(interval);
  }, [emblaApi]);

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

          {/* Slider dengan tombol navigasi kiri-kanan */}
          <div className="relative mb-4">
            {/* Tombol kiri */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-3 py-1 rounded bg-secondary hover:bg-primary/80 transition"
              aria-label="Sebelumnya"
            >
              {"<"}
            </button>
            {/* Tombol kanan */}
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-3 py-1 rounded bg-secondary hover:bg-primary/80 transition"
              aria-label="Berikutnya"
            >
              {">"}
            </button>
            {/* Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6 pr-6">
                {achievementsData.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className={`min-w-[300px] max-w-xs flex-shrink-0 bg-background rounded-xl p-6 hover:bg-secondary transition-colors duration-300 ${index === achievementsData.length - 1 ? "mr-8 md:mr-6" : ""}`}
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
                      <p className="text-muted-foreground text-sm text-center leading-relaxed mb-4" data-testid={`achievement-description-${index}`}>
                        {achievement.description}
                      </p>
                    )}

                    {achievement.fileUrl && (
                      <div className="flex justify-center mt-auto">
                        <a
                          href={achievement.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs font-medium text-${achievement.color} border border-${achievement.color} px-4 py-2 rounded-full hover:bg-${achievement.color} hover:text-background transition-colors duration-300 flex items-center gap-2`}
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
