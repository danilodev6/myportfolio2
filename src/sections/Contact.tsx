import { motion } from "motion/react";
import ButtonBookCall from "../components/ui/ButtonBookCall";

export const Contact = () => {
  return (
    <section
      id={"contact"}
      className="relative w-full min-h-screen bg-white-platinum flex items-center z-10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto mt-20 md:my-auto px-6 md:px-12 relative text-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative z-10"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-jet-black leading-tight">
            Let's Make it happen /
          </h2>
        </motion.div>

        {/* Intro paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative z-10 flex flex-col md:flex-row items-center justify-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-2xl text-3xl md:text-4xl font-light leading-relaxed text-jet-black relative z-10"
          >
            Get in touch! You can reach me via email
          </motion.p>

          {/* (ABOUT ME) label + paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="relative z-10 max-w-5xl md:ml-3 md:mb-5 md:gap-8"
          >
            {/* Label */}
            <p className="text-sm mt-2 md:text-left uppercase tracking-widest font-medium text-jet-black opacity-60">
              (Contact Me)
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex place-content-center mt-8"
        >
          <ButtonBookCall />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-0 left-0 w-full z-30 py-6 md:py-8 flex items-center justify-center text-jet-black text-md"
      >
        <p>© {new Date().getFullYear()} Danilo Zabalet. All rights reserved.</p>
      </motion.div>
    </section>
  );
};
