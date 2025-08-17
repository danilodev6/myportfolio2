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
    <div ref={containerRef} className={`relative ${className}`} style={{ height: `${totalItems * 80}vh` }}>
      {/* Sticky container */}
      <div
        className="sticky w-full overflow-visible"
        style={{
          height: itemHeight,
          top: "130px",
          zIndex: 25,
        }}
      >
        {items.map((child, index) => {
          return (
            <ScrollStackCard
              key={`stack-item-${index}`}
              index={index}
              totalItems={totalItems}
              scrollYProgress={scrollYProgress}
            >
              {child}
            </ScrollStackCard>
          );
        })}
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

const ScrollStackCard = ({ children, index, totalItems, scrollYProgress }: ScrollStackCardProps) => {
  // Sequential progression - each card starts when previous one finishes
  const progressStart = index * 0.2;
  const progressEnd = progressStart + 0.2;

  // Y transform - cards slide up from bottom
  const y = useTransform(scrollYProgress, [progressStart, progressEnd], ["100%", "0%"]);

  // Visibility - fade in at the start of each card's animation
  const display = useTransform(scrollYProgress, [progressStart - 0.02, progressStart], [0, 1]);

  return (
    <motion.div
      className="absolute inset-0 w-[85%] mx-auto h-[85%] bg-jet-black2 rounded-4xl border-t border-white/10"
      style={{
        y,
        opacity: display,
        zIndex: index + 1,
      }}
    >
      <div className="p-6 md:p-8 h-full flex flex-col justify-center">{children}</div>
    </motion.div>
  );
};

export default ScrollStack;
