import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Mesh } from "three";
import ButtonBookCall from "@/components/ui/ButtonBookCall";

function RabbitModel() {
  const { scene } = useGLTF("/rabbit.glb");

  // Clone the scene to avoid conflicts
  const clonedScene = scene.clone();

  // Traverse through all materials and fix them with proper typing
  clonedScene.traverse((child) => {
    if (child instanceof Mesh && child.material) {
      // Make sure materials are properly set
      child.material.needsUpdate = true;

      // If the model appears black, try these fixes:
      if ("color" in child.material) {
        child.material.color.setHex(0xffffff); // Set to white
      }
      if ("emissive" in child.material) {
        child.material.emissive.setHex(0x000000); // Remove emissive
      }

      // Enable shadows if needed
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive
      object={clonedScene}
      scale={2}
      position={[0, -0.5, 0]} // Adjust position if needed
      rotation={[0, 0, 0]} // Adjust rotation if needed
    />
  );
}

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobile detection function
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Show content after expansion completes
    const contentTimeout = setTimeout(() => {
      setShowContent(true);
    }, 1700);

    // Show 3D model after content is visible (only if not mobile)
    const modelTimeout = setTimeout(() => {
      if (!isMobile) {
        setShow3D(true);
      }
    }, 2500);

    return () => {
      clearTimeout(contentTimeout);
      clearTimeout(modelTimeout);
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [isMobile]);

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
        <div className="w-full h-full flex flex-col mt-[-13%] items-center justify-center text-center px-4 relative">
          {showContent && (
            <>
              {/* Name */}
              <motion.h1
                className="text-5xl mt-60 md:mt-0 md:text-[10em] md:absolute md:top-[87%] md:left-15 tracking-tight text-jet-black font-bold"
                initial={{ x: -1200 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, duration: 2.2 }}
              >
                Danilo Zabalet
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ x: 1200 }}
                animate={{ x: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 2.2,
                }}
                className="mt-6 max-w-xl md:max-w-4xl text-lg md:text-5xl md:text-right md:absolute md:right-15 md:top-55 text-stone-base"
              >
                I'm a full-stack developer based in Argentina, currently exploring Solidity and blockchain development.
              </motion.p>

              {/* Button */}
              <motion.div
                initial={{ x: 1200 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, duration: 1.8 }}
                className="mt-10 mb-4 md:absolute bottom-50 right-35 "
              >
                <ButtonBookCall />
              </motion.div>
            </>
          )}

          {/* 3D Rabbit - Absolutely positioned at bottom, hidden on mobile */}
          {!isMobile && show3D && (
            <motion.div
              initial={{ x: -1200 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.1, duration: 1.8 }}
              className="absolute top-10 right-95 h-[600px] w-full pointer-events-none"
            >
              <Canvas
                camera={{
                  position: [3, 1, 3],
                  fov: 50,
                }}
                style={{ background: "transparent" }}
              >
                {/* Better lighting setup for the rabbit */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                <directionalLight position={[-5, 3, -5]} intensity={0.4} />

                {/* Point light for better illumination */}
                <pointLight position={[0, 2, 0]} intensity={0.5} color="#ffffff" />

                <RabbitModel />

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate={true}
                  autoRotateSpeed={1}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 4}
                />
              </Canvas>
            </motion.div>
          )}

          {isMobile && (
            <motion.div
              initial={{ y: -600 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.2, duration: 1.8 }}
              className="absolute bottom-120 left-0 h-[400px] w-full pointer-events-none"
            >
              <Canvas
                camera={{
                  position: [3, 1, 3],
                  fov: 50,
                }}
                style={{ background: "transparent" }}
              >
                {/* Better lighting setup for the rabbit */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                <directionalLight position={[-5, 3, -5]} intensity={0.4} />

                {/* Point light for better illumination */}
                <pointLight position={[0, 2, 0]} intensity={0.5} color="#ffffff" />

                <RabbitModel />

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate={true}
                  autoRotateSpeed={1}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 4}
                />
              </Canvas>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
