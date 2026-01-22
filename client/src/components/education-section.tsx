import { motion } from "framer-motion";
import { fadeInVariants, staggerContainer } from "@/lib/animations";

interface Education {
  institution: string;
  degree: string;
  period: string;
  location?: string;
  image?: string;
}

const educationData: Education[] = [
  {
    institution: "Universitas Kristen Duta Wacana",
    degree: "Information Systems Major",
    period: "2023 - Present",
    location: "Yogyakarta",
    image: "/images/ukdwLogo.png"
  },
  {
    institution: "SMA Kolese De Britto",
    degree: "Mathematics Major",
    period: "2020 - 2023",
    location: "Yogyakarta",
    image: "/images/debrittoLogo.png"  
  }
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="heading-font text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="education-title"
          >
            Education
          </motion.h2>

          <motion.div 
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-background rounded-xl p-8 hover:bg-secondary transition-colors duration-300"
                variants={fadeInVariants}
                whileHover={{ scale: 1.02 }}
                data-testid={`education-item-${index}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  {/* Institution Logo */}
                  {edu.image && (
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-card border border-border p-3 flex items-center justify-center overflow-hidden">
                        <img 
                          src={edu.image} 
                          alt={`${edu.institution} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Institution Info */}
                  <div className="flex-1">
                    <h3 className="heading-font text-xl font-semibold mb-2" data-testid={`education-institution-${index}`}>
                      {edu.institution}
                    </h3>
                    <p className="text-primary font-medium mb-2" data-testid={`education-degree-${index}`}>
                      {edu.degree}
                    </p>
                    {edu.location && (
                      <p className="text-muted-foreground text-sm" data-testid={`education-location-${index}`}>
                        📍 {edu.location}
                      </p>
                    )}
                  </div>
                  
                  {/* Period Badge */}
                  <div className="md:mt-0">
                    <span className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium" data-testid={`education-period-${index}`}>
                      {edu.period}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}