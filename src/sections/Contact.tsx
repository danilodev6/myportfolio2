import { motion } from "motion/react";
import ButtonBookCall from "../components/ui/ButtonBookCall";

export const Contact = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <section
      id={"contact"}
      className="relative w-full min-h-screen bg-white-platinum flex items-center justify-center z-10 overflow-hidden"
    >
      <div className="max-w-6xl md:max-w-7xl w-full mt-20 md:my-auto px-6 relative">
        {/* Title - Left aligned */}
        <motion.div
          initial={{ x: isMobile ? "-100%" : -1400 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 1.8 }}
          className="relative z-10 w-full flex justify-start mb-14"
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-jet-black leading-tight">
            Let's Make it happen /
          </h2>
        </motion.div>

        {/* Button - Center aligned */}
        <motion.div
          initial={{ x: isMobile ? "-100%" : -1400 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 1.8 }}
          className="w-full flex justify-center mb-14"
        >
          <ButtonBookCall />
        </motion.div>

        {/* Text - Right aligned */}
        <motion.div
          initial={{ x: isMobile ? "100%" : 1400 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 1.8 }}
          className="relative z-10 w-full flex justify-end"
        >
          <div className="text-right flex">
            {/* Contact Me label */}
            <div className="relative z-10 mt-3">
              <p className="text-sm uppercase tracking-widest font-medium text-jet-black opacity-60">(Contact Me)</p>
            </div>

            <p className="max-w-2xl text-3xl md:text-4xl font-light leading-relaxed text-jet-black relative z-10">
              Get in touch! You can reach me via email
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
