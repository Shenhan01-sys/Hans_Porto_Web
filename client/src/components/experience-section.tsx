import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";

interface Experience {
  company: string;
  position: string;
  period: string;
  icon: string;
  responsibilities: string[];
  skills?: string[];
}

const experienceData: Experience[] = [
  {
    company: "FTI UKDW",
    position: "Teacher Assistant - Database System Design",
    period: "August 2025 - December 2025",
    icon: "🎓",
    responsibilities: [
      "Guided students in advanced SQL implementations and PL/SQL development",
      "Designed technical modules for relational modeling and database objects",
      "Managed database security and integrity during lab sessions and exams"
    ],
    skills: ["SQL", "PL/SQL", "Oracle", "Database Design"]
  },
  {
    company: "Marketing UKDW",
    position: "Student Staff",
    period: "April 2025 - Present",
    icon: "📢",
    responsibilities: [
      "Assisted in handling inquiries from prospective students via social media and messaging apps",
      "Supported administrative tasks and admission data entry",
      "Helped organize promotional events, school visits"
    ],
    skills: ["Communication", "Social Media", "Administration"]
  },
  {
    company: "Biro III",
    position: "Student Staff",
    period: "August 2024 - December 2024",
    icon: "📋",
    responsibilities: [
      "Take care of the room loan letter",
      "Manage the sports hall loan schedule",
      "Manage LPJ and P3DK from organizations on campus"
    ],
    skills: ["Administration", "Scheduling", "Documentation"]
  },
  {
    company: "Physical Fitness & Gym",
    position: "Operational Staff & Coach",
    period: "December 2023 - Present",
    icon: "💪",
    responsibilities: [
      "Take care of administration in the gym",
      "Maintain equipment condition",
      "Help out members in practicing",
      "Gives program suggestions and ways to practice well"
    ],
    skills: ["Coaching", "Fitness", "Customer Service"]
  },
  {
    company: "Galeri Oma Vintage Store",
    position: "Operational Staff",
    period: "June 2023 - August 2023",
    icon: "🛍️",
    responsibilities: [
      "Create contents of the products in social media",
      "Provide solutions to customers regarding what products to buy",
      "Negotiation with customers"
    ],
    skills: ["Content Creation", "Sales", "Negotiation"]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-background relative overflow-hidden">
      {/* Floating Orbs Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[450px] h-[450px] rounded-full bg-primary/3 blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16 sm:mb-24"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2
              className="heading-font text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 gradient-text leading-tight"
              data-testid="experience-title"
            >
              Work Experience
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              My Professional Journey
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line - Center on large screens */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-transparent via-primary/60 to-transparent" />

            {/* Timeline Items */}
            <div className="space-y-8 sm:space-y-12 lg:space-y-20">
              {experienceData.map((exp, index) => {
                const isRight = index % 2 === 0;

                return (
                  <motion.div
                    key={index}
                    className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center`}
                    initial={{ opacity: 0, x: isRight ? 100 : -100, rotate: isRight ? 3 : -3 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.3, delay: index * 0.1 }}
                    data-testid={`experience-item-${index}`}
                  >
                    {/* Empty space for alternating layout */}
                    {isRight && <div className="hidden lg:block" />}

                    {/* Timeline Node - Center on desktop */}
                    <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-primary via-accent to-primary animate-pulse">
                        <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 animate-ping" />
                      </div>
                    </div>

                    {/* Connecting line from center to card */}
                    <div
                      className={`hidden lg:block absolute top-1/2 w-16 h-0.5 transform -translate-y-1/2 ${
                        isRight
                          ? "left-1/2 bg-gradient-to-r from-primary/50 to-transparent"
                          : "right-1/2 bg-gradient-to-l from-primary/50 to-transparent"
                      }`}
                    />

                    {/* Content Card */}
                    <motion.div
                      className={`relative bg-card/60 backdrop-blur-xl border border-border/30 rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 group hover:-translate-y-2 hover:border-primary/30 ${
                        !isRight ? "lg:text-right" : ""
                      }`}
                      style={{
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {/* Date Badge - Top */}
                      <div
                        className={`mb-4 ${!isRight ? "lg:text-right" : ""}`}
                      >
                        <span
                          className="inline-block bg-gradient-to-br from-primary/15 to-accent/15 backdrop-blur-sm border border-primary/30 mono-font text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full"
                          data-testid={`experience-period-${index}`}
                        >
                          {exp.period}
                        </span>
                      </div>

                      {/* Position & Company */}
                      <div
                        className={`flex items-start gap-4 sm:gap-6 mb-6 ${
                          !isRight ? "lg:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl sm:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20 group-hover:scale-105 transition-transform duration-300"
                        >
                          {exp.icon}
                        </div>
                        <div className={!isRight ? "lg:text-right" : ""}>
                          <h3
                            className="heading-font text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2"
                            data-testid={`experience-position-${index}`}
                          >
                            {exp.position}
                          </h3>
                          <p
                            className="text-base sm:text-lg text-primary font-medium"
                            data-testid={`experience-company-${index}`}
                          >
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <ul className={`space-y-2 mb-6 ${!isRight ? "lg:text-left" : ""}`}>
                        {exp.responsibilities.map((responsibility, respIndex) => (
                          <li
                            key={respIndex}
                            className="text-sm sm:text-base text-muted-foreground flex items-start"
                            data-testid={`experience-responsibility-${index}-${respIndex}`}
                          >
                            <span className="text-primary mr-3 mt-0.5">▹</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      {exp.skills && (
                        <div
                          className={`flex flex-wrap gap-2 sm:gap-3 ${
                            !isRight ? "lg:justify-end" : ""
                          }`}
                        >
                          {exp.skills.map((skill, skillIndex) => (
                            <motion.span
                              key={skillIndex}
                              className="bg-primary/10 border border-primary/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium text-primary/90 hover:bg-primary/20 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-default"
                              whileHover={{ scale: 1.05 }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </motion.div>

                    {/* Empty space for alternating layout */}
                    {!isRight && <div className="hidden lg:block" />}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <motion.div
            className="mt-16 sm:mt-24 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
          </motion.div>
        </div>
      </div>
    </section>
  );
}