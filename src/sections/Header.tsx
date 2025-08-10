import { motion } from "motion/react";
import MenuHamb from "@/components/MenuHamb";

const Header = () => {
  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 w-full z-50 py-6 md:py-8 items-center justify-center hidden md:flex"
      >
        {/* Navigation */}
        <nav>
          <ul className="flex space-x-8 text-xl">
            <li>
              <a
                href="#about"
                className="relative inline-block px-8 py-3 text-jet-black font-semibold uppercase tracking-wider transition-colors duration-300 z-10 group"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">About</span>
                <span className="absolute top-0 left-0 w-full h-full bg-jet-black rounded-full transform scale-0 origin-center transition-transform duration-300 group-hover:scale-100 -z-10"></span>
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="relative inline-block px-8 py-3 text-black font-semibold uppercase tracking-wider transition-colors duration-300 z-10 group"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Projects</span>
                <span className="absolute top-0 left-0 w-full h-full bg-black rounded-full transform scale-0 origin-center transition-transform duration-300 group-hover:scale-100 -z-10"></span>
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="relative inline-block px-8 py-3 text-jet-black font-semibold uppercase tracking-wider transition-colors duration-300 z-10 group"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Contact</span>
                <span className="absolute top-0 left-0 w-full h-full bg-jet-black rounded-full transform scale-0 origin-center transition-transform duration-300 group-hover:scale-100 -z-10"></span>
              </a>
            </li>
          </ul>
        </nav>
      </motion.header>

      {/* Mobile Hamburger Menu */}
      <MenuHamb />
    </>
  );
};

export default Header;
