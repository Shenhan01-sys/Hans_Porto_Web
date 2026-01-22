import { motion } from "framer-motion";
import { fadeInVariants, staggerContainer } from "@/lib/animations";

interface Experience {
  company: string;
  position: string;
  period: string;
  responsibilities: string[];
}

const experienceData: Experience[] = [
  {
    company: "Marketing UKDW",
    position: "Student Staff",
    period: "April 2025 - Present",
    responsibilities: [
      "Assisted in handling inquiries from prospective students via social media and messaging apps",
      "Supported administrative tasks and admission data entry",
      "Helped organize promotional events, school visits"
    ]
  },
  {
    company: "Biro III",
    position: "Student Staff",
    period: "August 2024 - December 2024",
    responsibilities: [
      "Take care of the room loan letter",
      "Manage the sports hall loan schedule",
      "Manage LPJ and P3DK from organizations on campus"
    ]
  },
  {
    company: "Physical Fitness & Gym",
    position: "Operational Staff & Coach",
    period: "December 2023 - Present",
    responsibilities: [
      "Take care of administration in the gym",
      "Maintain equipment condition",
      "Help out members in practicing",
      "Gives program suggestions and ways to practice well"
    ]
  },
  {
    company: "Galeri Oma Vintage Store",
    position: "Operational Staff",
    period: "June 2023 - August 2023",
    responsibilities: [
      "Create contents of the products in social media",
      "Provide solutions to customers regarding what products to buy",
      "Negotiation with customers"
    ]
  },
  {
    company: "FTI UKDW",
    position: "Teacher Assistant - Database System Design",
    period: "August 2025 - December 2025",
    responsibilities: [
      "Guided students in advanced SQL implementations and PL/SQL development",
      "Designed technical modules for relational modeling and database objects",
      "Managed database security and integrity during lab sessions and exams"
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="heading-font text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="experience-title"
          >
            Work Experience
          </motion.h2>

          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {experienceData.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-card rounded-xl p-8 hover:bg-secondary transition-colors duration-300"
                variants={fadeInVariants}
                whileHover={{ scale: 1.01 }}
                data-testid={`experience-item-${index}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="heading-font text-xl font-semibold mb-2" data-testid={`experience-company-${index}`}>
                      {exp.company}
                    </h3>
                    <p className="text-primary font-medium mb-2" data-testid={`experience-position-${index}`}>
                      {exp.position}
                    </p>
                  </div>
                  <span className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium lg:mt-0 mt-2 w-fit" data-testid={`experience-period-${index}`}>
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.responsibilities.map((responsibility, respIndex) => (
                    <li key={respIndex} className="text-muted-foreground flex items-start" data-testid={`experience-responsibility-${index}-${respIndex}`}>
                      <span className="text-primary mr-2 mt-1.5">•</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}