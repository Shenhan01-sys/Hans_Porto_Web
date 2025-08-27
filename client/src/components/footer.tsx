import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";

export default function Footer() {
  return (
    <footer className="bg-card py-8 border-t border-border">
      <div className="container mx-auto px-6 text-center">
        <motion.p 
          className="text-muted-foreground"
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
