import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative w-full min-h-screen bg-jet-black rounded-t-4xl flex items-center z-10 overflow-hidden ">
      {/* Huge faint ABOUT behind titles */}
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 0.04, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="hidden md:block absolute top-[20%] left-[50%] title text-[12rem] font-extrabold tracking-tight leading-none select-none text-white-platinum pointer-events-none"
      >
        ABOUT
      </motion.h2>

      <div className="max-w-6xl mx-auto mt-20 md:my-auto px-6 md:px-12 relative">
        {/* Titles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white-platinum leading-tight">
            Web Developer
          </h2>
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white-platinum leading-tight mb-8 md:mb-16">
            Blockchain Developer
          </h2>
        </motion.div>

        {/* Intro paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl text-lg md:text-2xl font-light leading-relaxed text-white-base mb-16 md:ml-20 relative z-10"
        >
          With a passion for building innovative applications, I take projects from concept to deployment, ensuring a
          seamless process that delivers high-performing, scalable, and impactful solutions in both the Web2 and Web3
          space.
        </motion.p>

        {/* (ABOUT ME) label + paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 flex flex-col md:flex-row max-w-5xl md:ml-10 gap-4 md:gap-8"
        >
          {/* Label */}
          <p className="text-sm mt-1 text-right uppercase tracking-widest font-medium text-white-platinum opacity-60 md:min-w-[160px]">
            (About Me)
          </p>

          {/* Paragraphs */}
          <div className="space-y-8 max-w-2xl">
            <p className="text-base md:text-lg leading-relaxed font-normal text-white-base">
              An enthusiastic developer specializing in both front-end and back-end development, currently exploring
              Solidity and blockchain technologies. I build clean, responsive, and scalable applications with a focus on
              performance, usability, and real-world impact.
            </p>
            <p className="text-base md:text-lg leading-relaxed font-normal text-white-base">
              When I’m not immersed in code, I’m learning new tools in the Web3 space, refining my skills, or training
              with high-intensity workouts at the gym. I’m always open to collaborating with like-minded people who
              share a passion for technology and innovation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
