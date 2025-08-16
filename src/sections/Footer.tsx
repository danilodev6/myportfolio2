import { motion } from "motion/react";
import { useScrollY } from "@/hooks/useScrollY";

const Footer = () => {
  const scrolled = useScrollY(80);

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{
        opacity: scrolled ? 0 : 1,
        y: scrolled ? 50 : 0,
      }}
      transition={{
        delay: scrolled ? 0 : 2.3,
        duration: scrolled ? 0.2 : 0.3,
        ease: scrolled ? "easeOut" : [0.76, 0, 0.24, 1],
      }}
      className="fixed bottom-0 left-0 w-full z-30 py-6 md:py-8
                 flex items-center justify-center text-jet-black text-md"
      style={{ pointerEvents: scrolled ? "none" : "auto" }}
    >
      <p>© {new Date().getFullYear()} Danilo Zabalet. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
