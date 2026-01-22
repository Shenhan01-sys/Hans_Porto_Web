import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";

export default function Navigation() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.nav 
      className="floating-nav fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-card/90 rounded-full px-6 py-3"
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      data-testid="main-navigation"
    >
      <ul className="flex space-x-6 text-sm font-medium">
        <li>
          <a 
            href="#home" 
            className="hover:text-primary transition-colors duration-300"
            onClick={(e) => handleNavClick(e, "#home")}
            data-testid="nav-home"
          >
            Home
          </a>
        </li>
        <li>
          <a 
            href="#about" 
            className="hover:text-primary transition-colors duration-300"
            onClick={(e) => handleNavClick(e, "#about")}
            data-testid="nav-about"
          >
            About
          </a>
        </li>
        <li>
          <a 
            href="#education" 
            className="hover:text-primary transition-colors duration-300"
            onClick={(e) => handleNavClick(e, "#education")}
            data-testid="nav-education"
          >
            Education
          </a>
        </li>
        <li>
          <a 
            href="#skills" 
            className="hover:text-primary transition-colors duration-300"
            onClick={(e) => handleNavClick(e, "#skills")}
            data-testid="nav-skills"
          >
            Skills
          </a>
        </li>
        <li>
          <a 
            href="#experience" 
            className="hover:text-primary transition-colors duration-300"
            onClick={(e) => handleNavClick(e, "#experience")}
            data-testid="nav-experience"
          >
            Experience
          </a>
        </li>
        <li>
          <a 
            href="#projects" 
            className="hover:text-primary transition-colors duration-300"
            onClick={(e) => handleNavClick(e, "#projects")}
            data-testid="nav-projects"
          >
            Projects
          </a>
        </li>
        <li>
          <a 
            href="#news" 
            className="hover:text-primary transition-colors duration-300"
            onClick={(e) => handleNavClick(e, "#news")}
            data-testid="nav-news"
          >
            News
          </a>
        </li>
        <li>
          <a 
            href="#contact" 
            className="hover:text-primary transition-colors duration-300"
            onClick={(e) => handleNavClick(e, "#contact")}
            data-testid="nav-contact"
          >
            Contact
          </a>
        </li>
      </ul>
    </motion.nav>
  );
}
