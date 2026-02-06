import { motion } from "framer-motion";
import { fadeInVariants, staggerContainer, skillBarVariants } from "@/lib/animations";
import { useEffect, useState } from "react";

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  iconColor: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    icon: "fab fa-react",
    iconColor: "text-primary",
    skills: [
      { name: "React.js", level: 88, color: "primary" },
      { name: "HTML/CSS", level: 80, color: "primary" },
      { name: "JavaScript", level: 85, color: "primary" },
      { name: "Blade", level: 75, color: "primary" },
    ]
  },
  {
    title: "Backend Development",
    icon: "fas fa-server",
    iconColor: "text-accent",
    skills: [
      { name: "Node.js", level: 85, color: "primary" },
      { name: "Express.js", level: 82, color: "primary" },
      { name: "PHP", level: 80, color: "primary" },
      { name: "C#", level: 90, color: "primary" },
    ]
  },
  {
    title: "Full-Stack Frameworks",
    icon: "fas fa-layer-group",
    iconColor: "text-primary",
    skills: [
      { name: "Laravel", level: 80, color: "primary" },
      { name: "MERN Stack", level: 83, color: "primary" },
    ]
  },
  {
    title: "Database & Storage",
    icon: "fas fa-database",
    iconColor: "text-accent",
    skills: [
      { name: "MongoDB", level: 78, color: "primary" },
      { name: "MySQL/SQL", level: 90, color: "primary" },
    ]
  },
  {
    title: "Tools & Technologies",
    icon: "fas fa-tools",
    iconColor: "text-primary",
    skills: [
      { name: "Git", level: 85, color: "primary" },
      { name: "Docker", level: 75, color: "primary" },
      { name: "Figma", level: 80, color: "primary" },
    ]
  },
  {
    title: "Soft Skills",
    icon: "fas fa-lightbulb",
    iconColor: "text-accent",
    skills: [
      { name: "Communication", level: 95, color: "primary" },
      { name: "Customer Relations", level: 88, color: "primary" },
      { name: "Fast Adaptation", level: 90, color: "primary" },
    ]
  }
];

const techIcons = [
  { icon: "fab fa-react", color: "hover:text-primary" },
  { icon: "fab fa-node-js", color: "hover:text-accent" },
  { icon: "fab fa-laravel", color: "hover:text-primary" },
  { icon: "fab fa-php", color: "hover:text-accent" },
  { icon: "fab fa-js-square", color: "hover:text-primary" },
  { icon: "fab fa-html5", color: "hover:text-accent" },
  { icon: "fab fa-css3-alt", color: "hover:text-primary" },
  { icon: "fab fa-docker", color: "hover:text-accent" },
  { icon: "fab fa-git-alt", color: "hover:text-primary" },
  { icon: "fab fa-figma", color: "hover:text-accent" },
];

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="heading-font text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 gradient-text"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            data-testid="skills-title"
          >
            Technical Skills
          </motion.h2>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="bg-card rounded-xl p-4 sm:p-6 md:p-8 hover:bg-secondary transition-colors duration-300"
                variants={fadeInVariants}
                whileHover={{ scale: 1.02 }}
                data-testid={`skill-category-${categoryIndex}`}
              >
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <i className={`${category.icon} ${category.iconColor} text-lg sm:text-xl md:text-2xl`}></i>
                  </div>
                  <h3 className="heading-font text-base sm:text-lg md:text-xl font-semibold mb-2">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill.name}</span>
                        <span className={`text-${skill.color}`}>{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          className={`skill-bar bg-gradient-to-r from-${skill.color} to-${skill.color === 'primary' ? 'accent' : 'primary'} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ 
                            duration: 1.5, 
                            ease: [0.4, 0, 0.2, 1],
                            delay: categoryIndex * 0.2 + skillIndex * 0.1
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Technology Icons */}
          <motion.div 
            className="mt-8 sm:mt-12 md:mt-16 text-center"
            variants={fadeInVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="heading-font text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 md:mb-8 text-muted-foreground">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              {techIcons.map((tech, index) => (
                <motion.div
                  key={index}
                  className="tech-icon group"
                  whileHover={{ 
                    scale: 1.2,
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                  data-testid={`tech-icon-${index}`}
                >
                  <i className={`${tech.icon} text-2xl sm:text-3xl md:text-4xl text-muted-foreground group-hover:${tech.color} transition-colors duration-300`}></i>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
