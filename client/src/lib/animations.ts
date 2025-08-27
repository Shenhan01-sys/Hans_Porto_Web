export const fadeInVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const slideUpVariants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const skillBarVariants = {
  initial: { width: 0 },
  animate: { width: "var(--skill-width)" },
  transition: { duration: 1.5, ease: [0.4, 0, 0.2, 1] }
};

export const projectCardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  whileHover: {
    y: -8,
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

export const typewriterVariants = {
  initial: { width: 0 },
  animate: { 
    width: "100%",
    transition: { 
      duration: 3, 
      ease: "linear",
      repeat: 0
    }
  }
};
