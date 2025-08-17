import { motion, useScroll, useTransform } from "motion/react";
import { useId, useRef } from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { useScrollY } from "@/hooks/useScrollY";

const projectsData = [
  {
    id: "defi-dashboard",
    title: "DeFi Dashboard",
    description: "A comprehensive DeFi analytics platform built with React and Web3 integration",
    tech: ["React", "TypeScript", "Web3.js", "TailwindCSS"],
    year: "2024",
  },
  {
    id: "nft-marketplace",
    title: "NFT Marketplace",
    description: "Full-stack NFT marketplace with smart contracts and modern UI",
    tech: ["Next.js", "Solidity", "IPFS", "Ethers.js"],
    year: "2024",
  },
  {
    id: "crypto-portfolio",
    title: "Crypto Portfolio Tracker",
    description: "Real-time cryptocurrency portfolio tracking with advanced analytics",
    tech: ["React", "Node.js", "MongoDB", "CoinGecko API"],
    year: "2023",
  },
  {
    id: "dao-governance",
    title: "DAO Governance Platform",
    description: "Decentralized voting system with smart contract integration",
    tech: ["React", "Solidity", "Hardhat", "The Graph"],
    year: "2023",
  },
  {
    id: "blockchain-explorer",
    title: "Blockchain Explorer",
    description: "Custom blockchain explorer with transaction analysis tools",
    tech: ["Vue.js", "Express.js", "PostgreSQL", "Web3.py"],
    year: "2023",
  },
];

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionId = useId();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Header animation
  const headerOpacity = useTransform(sectionProgress, [0, 0.05], [0, 1]);

  // Animated text that disappears when first card appears - longer duration
  const animatedTextOpacity = useTransform(sectionProgress, [0.02, 0.25], [1, 0]);
  const animatedTextY = useTransform(sectionProgress, [0.02, 0.25], [0, -30]);

  const scrolled = useScrollY(4680);
  const scrolled2 = useScrollY(2470);

  return (
    <section ref={sectionRef} id={sectionId} className="relative w-full bg-jet-black z-10 rounded-b-4xl">
      {/* Sticky Header */}
      <motion.div
        className="sticky top-0 z-20 bg-jet-black rounded-b-4xl"
        style={{
          opacity: headerOpacity,
        }}
      >
        <div className="max-w-6xl mb-8 mx-auto px-6 md:px-12 py-4 md:py-6">
          <motion.div
            animate={{ opacity: scrolled || window.innerWidth < 768 ? 0 : 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-end gap-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1.5 }}
              className="text-3xl md:text-6xl font-bold tracking-tight text-white-platinum leading-tight"
            >
              SELECTED WORKS /
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 1.5 }}
              className="text-lg md:text-2xl font-medium mb-8 uppercase tracking-widest text-white-platinum"
            >
              (0{projectsData.length})
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated Filler Text - Big Background Style */}
      <motion.div
        animate={{ opacity: scrolled2 || window.innerWidth < 768 ? 0 : 1 }}
        transition={{ duration: 1.5 }}
        className="sticky flex w-[60%] ml-[40%] top-[27%] z-15 pointer-events-none"
      >
        {/* Huge faint PROJECTS behind everything */}
        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.04, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="hidden md:block absolute top-[13rem] left-[-10%] transform -translate-x-1/2 md:text-[12rem] title font-extrabold tracking-tight leading-none select-none text-white-platinum pointer-events-none"
        >
          PROJECTS
        </motion.h3>

        {/* Subtle scroll indicator */}
        <motion.p
          className="text-sm md:text-xl text-white-platinum/40 font-light tracking-widest uppercase mt-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          (Scroll to explore)
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="max-w-2xl text-lg md:text-2xl font-light leading-relaxed text-white-base mb-16 md:ml-4 md:mb-20 relative z-10"
        >
          Featured projects that have been thoughtfully developed to combine functionality, performance, and design.
          Each solution demonstrates a balance between technical expertise and strategic thinking, showcasing the
          ability to deliver reliable, scalable, and impactful results. These works reflect a commitment to excellence
          and a focus on creating meaningful value for both users and businesses.
        </motion.p>
      </motion.div>

      {/* ScrollStack Container */}
      <div className="relative z-30">
        <ScrollStack itemHeight="calc(110vh - 120px)">
          {projectsData.map((project) => (
            <ScrollStackItem key={project.id}>
              <div className="max-w-6xl mx-auto px-6 md:px-12">
                <div className="flex flex-col justify-between h-full">
                  {/* Project Header */}
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-bold text-white-platinum mb-2">{project.title}</h3>
                      <p className="text-sm uppercase tracking-widest text-white-platinum/60 font-medium">
                        {project.year}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-5xl md:text-7xl font-light text-white-platinum/20">
                        {String(projectsData.findIndex((p) => p.id === project.id) + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-lg md:text-xl leading-relaxed text-white-base mb-6 md:mb-8 max-w-2xl">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.tech.map((tech) => (
                        <span
                          key={`${project.id}-${tech}`}
                          className="px-3 md:px-4 py-2 bg-white-platinum/10 text-white-platinum text-sm font-medium rounded-full border border-white-platinum/20 backdrop-blur-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Image Placeholder */}
                    <div className="w-full h-32 md:h-40 bg-gradient-to-br from-white-platinum/5 to-white-platinum/20 rounded-2xl border border-white-platinum/10 flex items-center justify-center mb-8">
                      <span className="text-white-platinum/40 text-lg">&lt;img/&gt;</span>
                    </div>
                  </div>

                  {/* Project Footer */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-white-platinum/10">
                    <button
                      type="button"
                      className="group relative px-6 py-3 text-white-platinum font-medium uppercase tracking-wider text-sm transition-all duration-300"
                    >
                      <span className="relative z-10 group-hover:text-jet-black transition-colors duration-300">
                        View Project
                      </span>
                      <span className="absolute inset-0 bg-white-platinum transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                    </button>
                    <button
                      type="button"
                      className="text-white-platinum/60 hover:text-white-platinum transition-colors duration-300 text-sm uppercase tracking-widest"
                    >
                      Live Demo →
                    </button>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

// import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
//
// export const Projects = () => (
//   <section className="relative w-full min-h-screen bg-jet-black z-10 overflow-hidden">
//     <div className="max-w-6xl mx-auto mt-20 md:mt-20 px-6 md:px-12">
//       <div className="flex">
//         <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white-platinum leading-tight">
//           SELECTED WORKS /
//         </h2>
//         <p className="text-4xl font-medium mt-2 ml-4 uppercase text-start tracking-widest text-white-platinum opacity-60 md:min-w-[160px]">
//           (5)
//         </p>
//       </div>
//
//       <div className="mt-12">
//         <ScrollStack>
//           <ScrollStackItem>
//             <h2 className="text-white text-2xl mb-2">Project 1</h2>
//             <p className="text-white/70">Short description here</p>
//           </ScrollStackItem>
//           <ScrollStackItem>
//             <h2 className="text-white text-2xl mb-2">Project 2</h2>
//             <p className="text-white/70">Short description here</p>
//           </ScrollStackItem>
//           <ScrollStackItem>
//             <h2 className="text-white text-2xl mb-2">Project 3</h2>
//             <p className="text-white/70">Short description here</p>
//           </ScrollStackItem>
//           <ScrollStackItem>
//             <h2 className="text-white text-2xl mb-2">Project 4</h2>
//             <p className="text-white/70">Short description here</p>
//           </ScrollStackItem>
//           <ScrollStackItem>
//             <h2 className="text-white text-2xl mb-2">Project 5</h2>
//             <p className="text-white/70">Short description here</p>
//           </ScrollStackItem>
//         </ScrollStack>
//       </div>
//     </div>
//   </section>
// );
