import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { projectsData } from "@/constants/projectsData.ts";
import ProjectImageCarousel from "../components/ui/ProjectImageCarousel";

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentProject, setCurrentProject] = useState(1);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRect.height;
      const scrollProgress = Math.abs(sectionRect.top) / sectionHeight;
      const projectIndex = Math.min(Math.floor(scrollProgress * projectsData.length) + 1, projectsData.length);
      setCurrentProject(projectIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const hideHeader = useTransform(scrollYProgress, [0.1, 0.85], [1, 0]);
  const hideHeader2 = useTransform(scrollYProgress, [0.05, 0.06], [1, 0]);
  const hideHeader3 = useTransform(scrollYProgress, [0.1, 0.25], [0.04, 0]);

  return (
    <section ref={sectionRef} id={"projects"} className="relative w-full bg-jet-black z-10 rounded-b-4xl">
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
              className="text-lg md:text-2xl font-medium md:mb-8 uppercase tracking-widest text-white-platinum"
            >
              (0{projectsData.length})
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="sticky top-50 z-15 bg-jet-black" style={{ opacity: hideHeader2 }}>
        <div className="relative md:flex px-6 md:ml-[33%] max-w-6xl mx-auto pb-16">
          {!isMobile && (
            <motion.h3
              style={{ opacity: hideHeader3 }}
              className="hidden md:block absolute top-40 right-110 text-[12rem] font-extrabold tracking-tight leading-none select-none text-white-platinum pointer-events-none"
            >
              PROJECTS
            </motion.h3>
          )}
          {isMobile && (
            <motion.h3
              style={{ opacity: hideHeader3 }}
              className="md:hidden absolute top-[22rem] left-[28%] transform -translate-x-1/2 text-[3.5rem] title font-extrabold tracking-tight leading-none select-none text-white-platinum pointer-events-none"
            >
              PROJECTS
            </motion.h3>
          )}

          <motion.p
            className="text-sm text-right md:text-xl mb-2 md:mt-1 md:mr-2 text-white-platinum font-medium tracking-widest uppercase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: isMobile ? 0.9 : 1.5 }}
          >
            (Scroll to explore)
          </motion.p>

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

      <div className="sticky top-44 z-30 flex justify-end pr-8 md:pr-20 md:mb-60">
        <span className="text-5xl md:text-8xl font-light text-white-platinum">
          {String(currentProject).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-20">
        {projectsData.map((project) => (
          <div key={project.id} className="min-h-screen py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
              <div className="text-white-platinum">
                <div className="mb-6 md:mb-8">
                  <h3 className="text-2xl md:text-4xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm uppercase tracking-widest opacity-60 font-medium">{project.year}</p>
                </div>

                <div>
                  <p className="text-lg md:text-xl leading-relaxed mb-6 md:mb-8 max-w-2xl">{project.description}</p>

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

                  <div className="hidden md:block mb-8">
                    <div className="relative">
                      <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden">
                        <ProjectImageCarousel projectId={project.id} className="!h-full" />
                      </div>
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
          </div>
        ))}
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
