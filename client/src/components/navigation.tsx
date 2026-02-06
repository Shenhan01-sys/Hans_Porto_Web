import { motion, AnimatePresence } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#news", label: "News" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        className="floating-nav fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 bg-card/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 hidden md:block"
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        data-testid="main-navigation"
      >
        <ul className="flex space-x-3 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.href}>
              <a 
                href={item.href}
                className="hover:text-primary transition-colors duration-300"
                onClick={(e) => handleNavClick(e, item.href)}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Mobile Hamburger Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 md:hidden w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-border"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        variants={fadeInVariants}
        initial="initial"
        animate="animate"
        aria-label="Toggle menu"
      >
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-foreground`}></i>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu */}
            <motion.nav
              className="absolute top-16 left-4 right-4 bg-card/95 backdrop-blur-md rounded-2xl p-4 border border-border shadow-xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ul className="flex flex-col space-y-1">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a 
                      href={item.href}
                      className="block py-3 px-4 rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-300 text-sm font-medium"
                      onClick={(e) => handleNavClick(e, item.href)}
                      data-testid={`nav-mobile-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
