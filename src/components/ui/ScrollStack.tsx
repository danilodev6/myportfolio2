import { motion, useScroll, useTransform } from "motion/react";
import { type ReactNode, useRef } from "react";

interface ScrollStackItemProps {
  children: ReactNode;
  className?: string;
}

export const ScrollStackItem = ({ children, className = "" }: ScrollStackItemProps) => {
  return <div className={`w-full h-full ${className}`}>{children}</div>;
};

interface ScrollStackProps {
  children: ReactNode[];
  className?: string;
  itemHeight?: string;
}

const ScrollStack = ({ children, className = "", itemHeight = "calc(100vh - 90px)" }: ScrollStackProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const items = Array.isArray(children) ? children : [children];
  const totalItems = items.length;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      // ⬇ de 80vh → 110vh por item (más colchón al final)
      style={{ height: `${totalItems * 110}vh` }}
    >
      <div
        className="sticky w-full overflow-visible"
        style={{
          height: itemHeight,
          top: "130px",
          zIndex: 25,
        }}
      >
        {items.map((child, index) => (
          <ScrollStackCard
            key={`stack-item-${index}`}
            index={index}
            totalItems={totalItems}
            scrollYProgress={scrollYProgress}
          >
            {child}
          </ScrollStackCard>
        ))}
      </div>
    </div>
  );
};

// Individual card component
interface ScrollStackCardProps {
  children: ReactNode;
  index: number;
  totalItems: number;
  scrollYProgress: any;
}

const ScrollStackCard = ({ children, index, scrollYProgress, totalItems }: ScrollStackCardProps) => {
  const segment = 1 / totalItems;

  const progressStart = index * segment;
  const progressEnd = progressStart + segment;

  // Movimiento Y del card
  const y = useTransform(scrollYProgress, [progressStart, progressEnd], ["100%", "0%"]);

  // Fade in rápido al entrar
  const opacity = useTransform(scrollYProgress, [progressStart, progressStart + segment * 0.2], [0, 1]);

  // Visibility: visible mientras el card está cubriendo parte de la pantalla.
  // Lo extendemos un poco después del "end" para dar tiempo a que el siguiente lo tape.
  const visibility = useTransform(
    scrollYProgress,
    [
      progressStart - segment * 0.5, // antes de entrar: hidden
      progressStart, // empieza a entrar: visible
      progressEnd, // durante: visible
      progressEnd + segment * 0.5 + 0.1, // después: hidden
    ],
    ["hidden", "visible", "visible", "hidden"],
  );

  return (
    <motion.div
      className="absolute inset-0 w-[85%] mx-auto h-[85%] bg-jet-black2 rounded-4xl border-t border-white/10 transform-gpu"
      style={{
        y,
        opacity,
        visibility,
        zIndex: index + 1,
        willChange: "transform, opacity",
        contain: "layout paint size style",
        backfaceVisibility: "hidden",
      }}
    >
      <div className="p-6 md:p-8 h-full flex flex-col justify-center">{children}</div>
    </motion.div>
  );
};

export default ScrollStack;
