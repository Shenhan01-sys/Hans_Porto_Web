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
    title: "Outstanding student at Unit Klinik Tani Scientific Festival 2022",
    category: "Paper Competition",
    description: "2nd place at central Java level scientific paper competition",
    icon: "fas fa-trophy",
    color: "accent"
  },
  {
    title: "Outstanding student at PHI 2021 (Paket Hari Ilmiah)",
    category: "Paper Competition",
    description: "3nd place at central Java level scientific paper competition",
    icon: "fas fa-trophy",
    color: "accent"
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
    description: "Co-Author, Metaverse and Behavioral Change Toward a ProEnvironmental Behavior: the Role of Avatar",
    icon: "fas fa-book",
    color: "accent"
  },
  {
    title: "Research Publications",
    category: "Academic Research",
    description: "CO-Author, A Study of Repetition on Virtual Tourism: Understanding the Effect on Memory and Visit Intention",
    icon: "fas fa-book",
    color: "accent"
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
                      <p className="text-muted-foreground text-sm text-center leading-relaxed" data-testid={`achievement-description-${index}`}>
                        {achievement.description}
                      </p>
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