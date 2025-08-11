import { motion } from "motion/react";
import { useScrollY } from "@/hooks/useScrollY";

const Footer = () => {
  const scrolled = useScrollY(80);

  return (
    <motion.footer
      animate={{ opacity: scrolled ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 w-full z-30 py-6 md:py-8
                 flex items-center justify-center text-jet-black text-md
                 pointer-events-none"
      style={{ pointerEvents: scrolled ? "none" : "auto" }}
    >
      <p>© {new Date().getFullYear()} Danilo Zabalet. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
