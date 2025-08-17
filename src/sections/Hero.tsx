import { motion } from "motion/react";
import { useEffect, useState } from "react";
import ButtonBookCall from "@/components/ui/ButtonBookCall";
import TextType from "@/components/ui/TextType";

const Hero = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after expansion completes
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 1700); // 0.5s delay + 1.2s duration

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative w-full h-screen bg-jet-black sticky top-0 z-0">
      {/* White layer effect */}
      <motion.div
        initial={{ height: "0%" }}
        animate={{ height: "100%" }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 w-full bg-white-platinum z-20 flex items-center justify-center"
        style={{ transformOrigin: "top" }}
      >
        {/* Content */}
        <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
          {showContent && (
            <>
              {/* Name */}
              <TextType
                text={["Danilo Zabalet"]}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                variableSpeed={{ min: 130, max: 240 }}
                className="text-5xl md:text-8xl tracking-tight title text-jet-black"
                textColors={["text-jet-black"]}
                initialDelay={2000}
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="mt-6 max-w-xl text-lg md:text-xl text-stone-base"
              >
                I'm a full-stack developer based in Argentina, currently exploring Solidity and blockchain development.{" "}
              </motion.p>

              {/* Botón */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 1.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="mt-10"
              >
                {" "}
                <ButtonBookCall />
              </motion.div>

              {/* Placeholder 3D */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1,
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="mt-16 h-40 w-40 md:h-60 md:w-60 rounded-xl bg-gradient-to-br from-stone-200 to-stone-400 flex items-center justify-center text-stone-600 text-lg shadow-lg"
              >
                (3D Model)
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
