import type { Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const MenuHamb = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Animation variants for the full-screen menu
  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
  };

  // Animation variants for menu items
  const itemVariants: Variants = {
    closed: { opacity: 0, x: 50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    }),
  };

  // Hamburger lines animation
  const line1Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, x: 1, y: 11.5 },
  };

  const line2Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const line3Variants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, x: 1, y: -11.5 },
  };

  return (
    <div>
      {/* Hamburger Button - Bigger and more visible */}
      <motion.button
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
        onClick={toggleMenu}
        className="fixed button top-6 right-6 md:top-10 md:right-20 z-[70] w-13 h-13 flex flex-col justify-center items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
        aria-label="Toggle menu"
      >
        <motion.span
          variants={line1Variants}
          animate={isOpen ? "open" : "closed"}
          className="w-7 h-1 bg-white-platinum origin-center rounded-full"
          transition={{ duration: 0.3 }}
        />
        <motion.span
          variants={line2Variants}
          animate={isOpen ? "open" : "closed"}
          className="w-7 h-1 bg-white-platinum origin-center rounded-full"
          transition={{ duration: 0.3 }}
        />
        <motion.span
          variants={line3Variants}
          animate={isOpen ? "open" : "closed"}
          className="w-7 h-1 bg-white-platinum origin-center rounded-full"
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-white-platinum z-[60] flex items-center justify-center"
          >
            <nav className="text-center">
              <ul className="flex flex-col space-y-8">
                {[
                  { href: "#about", text: "About" },
                  { href: "#projects", text: "Projects" },
                  { href: "#contact", text: "Contact" },
                ].map((item, index) => (
                  <motion.li key={item.text} custom={index} variants={itemVariants} initial="closed" animate="open">
                    <a
                      href={item.href}
                      onClick={toggleMenu}
                      className="relative inline-block px-8 py-4 text-jet-black font-bold uppercase tracking-wider transition-colors duration-300 z-10 group text-4xl md:text-5xl"
                    >
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        {item.text}
                      </span>
                      <span className="absolute top-0 left-0 w-full h-full bg-jet-black rounded-full transform scale-0 origin-center transition-transform duration-300 group-hover:scale-100 -z-10"></span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuHamb;
