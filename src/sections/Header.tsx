import { motion } from "motion/react";
import MenuHamb from "@/components/MenuHamb";
import { useScrollY } from "@/hooks/useScrollY";
import { useEffect, useState } from "react";

const nav = [
  { href: "#about", text: "About" },
  { href: "#projects", text: "Projects" },
  { href: "#contact", text: "Contact" },
];

const Header = () => {
  const scrolled = useScrollY(80);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* DESKTOP NAV – always rendered */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: scrolled ? -100 : 0, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-40 py-6 hidden md:flex items-center justify-center"
      >
        <motion.nav
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <ul className="flex space-x-8 text-xl">
            {nav.map(({ href, text }) => (
              <li key={text}>
                <a href={href} className="relative px-8 py-3 text-jet-black font-semibold uppercase group">
                  <span className="relative z-10 group-hover:text-white-platinum">{text}</span>
                  <span className="absolute inset-0 bg-jet-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-400 ease-out -z-10" />
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </motion.header>

      {/* HAMBURGER – always rendered */}

      <motion.div
        initial={{ opacity: 0.5, y: -100 }}
        animate={{ opacity: 1, y: scrolled || isMobile ? 0 : -100 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50"
        style={{ pointerEvents: scrolled || isMobile ? "auto" : "none" }}
      >
        <MenuHamb />
      </motion.div>
    </>
  );
};

export default Header;

// import { motion } from "motion/react";
// import MenuHamb from "@/components/MenuHamb";
//
// const Header = () => {
//   return (
//     <>
//       {/* Desktop Header */}
//       <motion.header
//         initial={{ opacity: 0, y: -100 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
//         className="fixed top-0 left-0 w-full z-50 py-6 md:py-8 items-center justify-center hidden md:flex"
//       >
//         {/* Navigation */}
//         <nav>
//           <ul className="flex space-x-8 text-xl">
//             <li>
//               <a
//                 href="#about"
//                 className="relative inline-block px-8 py-3 text-jet-black font-semibold uppercase tracking-wider transition-colors duration-300 z-10 group"
//               >
//                 <span className="relative z-10 transition-colors duration-300 group-hover:text-white">About</span>
//                 <span className="absolute top-0 left-0 w-full h-full bg-jet-black rounded-full transform scale-0 origin-center transition-transform duration-300 group-hover:scale-100 -z-10"></span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#projects"
//                 className="relative inline-block px-8 py-3 text-black font-semibold uppercase tracking-wider transition-colors duration-300 z-10 group"
//               >
//                 <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Projects</span>
//                 <span className="absolute top-0 left-0 w-full h-full bg-black rounded-full transform scale-0 origin-center transition-transform duration-300 group-hover:scale-100 -z-10"></span>
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#contact"
//                 className="relative inline-block px-8 py-3 text-jet-black font-semibold uppercase tracking-wider transition-colors duration-300 z-10 group"
//               >
//                 <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Contact</span>
//                 <span className="absolute top-0 left-0 w-full h-full bg-jet-black rounded-full transform scale-0 origin-center transition-transform duration-300 group-hover:scale-100 -z-10"></span>
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </motion.header>
//
//       {/* Mobile Hamburger Menu */}
//       <MenuHamb />
//     </>
//   );
// };
//
// export default Header;
