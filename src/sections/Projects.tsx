import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { projectsData } from "@/constants/projectsData.ts";
import ProjectImageCarousel from "../components/ui/ProjectImageCarousel";

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection properly
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const hideHeader = useTransform(scrollYProgress, [0.1, 0.85], [1, 0]);
  const hideHeader2 = useTransform(scrollYProgress, [0.1, 0.15], [1, 0]);
  const hideHeader3 = useTransform(scrollYProgress, [0.1, 0.25], [0.04, 0]);

  return (
    <section ref={sectionRef} id={"projects"} className="relative w-full bg-jet-black z-10 rounded-b-4xl">
      {/* Sticky Header - Disappears when scrolled on both mobile and desktop */}
      <motion.div className="sticky md:top-0 top-5 z-20 bg-jet-black rounded-b-4xl">
        <div className="max-w-6xl mb-8 mx-auto px-6 md:px-12 py-4 md:py-6">
          <motion.div className="flex items-end gap-4" style={{ opacity: hideHeader }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: isMobile ? 0.3 : 1.5 }}
              className="text-3xl md:text-6xl font-bold tracking-tight text-white-platinum leading-tight"
            >
              SELECTED WORKS /
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: isMobile ? 0.3 : 1.5 }}
              className="text-lg md:text-2xl font-medium md:mb-8 mb-2 uppercase tracking-widest text-white-platinum"
            >
              (0{projectsData.length})
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Sticky Content Section - Both description and scroll indicator */}
      <motion.div className="sticky top-50 z-15 bg-jet-black" style={{ opacity: hideHeader2 }}>
        <div className="md:flex px-6 md:ml-[33%] max-w-6xl mx-auto pb-16 ">
          {/* Scroll indicator - visible on both mobile and desktop */}
          <motion.p
            className="text-sm text-right md:text-xl mb-2 md:mt-1 md:mr-2 text-white-platinum  font-medium tracking-widest uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: isMobile ? 0.9 : 1.5 }}
          >
            (Scroll to explore)
          </motion.p>

          {/* Description Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: isMobile ? 0.6 : 1.2 }}
            className="max-w-2xl text-base md:text-2xl leading-relaxed text-white-base mb-8 md:mb-12"
          >
            Featured projects that have been thoughtfully developed to combine functionality, performance, and design.
            Each solution demonstrates a balance between technical expertise and strategic thinking, showcasing the
            ability to deliver reliable, scalable, and impactful results. These works reflect a commitment to excellence
            and a focus on creating meaningful value for both users and businesses.
          </motion.p>
        </div>
      </motion.div>

      {/* Desktop Background Text - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          className="sticky w-[60%] ml-[40%] top-[27%] z-15 pointer-events-none"
          style={{ opacity: hideHeader3 }}
        >
          <motion.h3 className="absolute top-[12rem] left-[-10%] transform -translate-x-1/2 text-[12rem] title font-extrabold tracking-tight leading-none select-none text-white-platinum pointer-events-none">
            PROJECTS
          </motion.h3>
        </motion.div>
      )}

      {/* Mobile Background Text - Hidden on desktop */}
      {isMobile && (
        <motion.div
          style={{ opacity: hideHeader3 }}
          className="sticky w-[60%] ml-[40%] top-[27%] z-15 pointer-events-none"
        >
          <motion.h3 className="absolute top-[22rem] left-[28%] transform -translate-x-1/2 text-[3.5rem] title font-extrabold tracking-tight leading-none select-none text-white-platinum pointer-events-none">
            PROJECTS
          </motion.h3>
        </motion.div>
      )}

      {/* ScrollStack Container */}
      <div className="relative z-30">
        <ScrollStack itemHeight="calc(110vh - 120px)">
          {projectsData.map((project, idx) => (
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
                        {String(idx + 1).padStart(2, "0")}
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

                    {/* Image Container with Button - Desktop Layout */}
                    <div className="hidden md:block mb-8">
                      <div className="relative">
                        {/* Updated ProjectImageCarousel with wider aspect ratio for desktop */}
                        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden">
                          <ProjectImageCarousel projectId={project.id} className="!h-full" />
                        </div>
                        {/* Button positioned at bottom-right corner of image */}
                        <div className="absolute bottom-4 right-4">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <button
                              type="button"
                              className="group relative px-6 py-3 text-white-platinum font-medium uppercase tracking-wider text-sm transition-all duration-300 rounded-full"
                            >
                              <span className="relative z-10 group-hover:text-jet-black transition-colors duration-300">
                                View Project →
                              </span>
                              <span className="absolute inset-0 bg-white-platinum transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Layout - Image and Button Stacked */}
                    <div className="md:hidden">
                      <ProjectImageCarousel projectId={project.id} className="mb-6" />
                      <div className="flex justify-center">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <button
                            type="button"
                            className="group relative px-6 py-3 text-white-platinum font-medium uppercase tracking-wider text-sm transition-all duration-300"
                          >
                            <span className="relative z-10 group-hover:text-jet-black transition-colors duration-300">
                              View Project →
                            </span>
                            <span className="absolute inset-0 bg-white-platinum transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                          </button>
                        </a>
                      </div>
                    </div>
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
