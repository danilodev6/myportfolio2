import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed bottom-0 left-0 w-full z-50 py-6 md:py-8 flex items-center justify-center text-jet-black text-md"
    >
      <p>© {new Date().getFullYear()} Danilo Zabalet. All rights reserved.</p>
    </motion.footer>
  );
};

export default Footer;
