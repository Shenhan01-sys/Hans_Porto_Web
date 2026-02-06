import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";

export default function Footer() {
  return (
  <footer className="bg-card py-6 sm:py-8 border-t border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.p 
          className="text-muted-foreground text-xs sm:text-sm md:text-base"
          variants={fadeInVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          data-testid="footer-text"
        >
          &copy; 2024 <span className="gradient-text font-semibold">Hans Gunawan</span>. 
          Built with passion using React and Tailwind CSS.
        </motion.p>
      </div>
    </footer>
  );
}
