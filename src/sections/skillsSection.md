import { skills } from "@/constants/index.ts";

type Skill = {
  imageUrl: string;
  name: string;
  type: string;
};

        Skills Section
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          className="mt-10"
        >
          <h3 className="text-2xl md:text-3xl title tracking-tight text-white-platinum mb-6">Skills</h3>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-8 md:gap-12">
            {skills.map((skill: Skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: [0.76, 0, 0.24, 1],
                  delay: index * 0.05,
                }}
                className="group"
              >
                <div className="relative justify-center align-center flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white-platinum rounded-xl flex items-center justify-center group-hover:border-stone-500 transition-all duration-300 group-hover:scale-105">
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <p className="text-md text-white-platinum text-center mt-3 group-hover:text-stone-400 transition-colors duration-300">
                    {skill.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

