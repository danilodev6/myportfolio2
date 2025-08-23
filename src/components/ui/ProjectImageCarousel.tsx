// ProjectImageCarousel.tsx
import { useEffect, useRef, useState } from "react";

interface ProjectImageCarouselProps {
  projectId: string;
  className?: string;
}

const ProjectImageCarousel = ({ projectId, className = "" }: ProjectImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const projectImages: Record<string, string[]> = {
    "auction-app": ["/project1-1.png", "/project1-2.png", "/project1-3.png"],
    "supply-chain-dapp": ["/project2-1.png", "/project2-2.png", "/project2-3.png"],
    "crowdfunding-dapp": ["/project3-1.png", "/project3-2.png", "/project3-3.png", "/project3-4.png"],
    "portfolio-3d": ["/project4-1.png", "/project4-2.png", "/project4-3.png"],
    "movie-finder": ["/project5-1.png", "/project5-2.png"],
  };

  const images = projectImages[projectId as keyof typeof projectImages] || [];

  // Observa visibilidad para pausar el intervalo offscreen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.25),
      { threshold: [0, 0.25, 0.5, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ⏱ Corre el autoplay sólo cuando es visible
  useEffect(() => {
    if (!isVisible || images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentImageIndex((p) => (p + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, [isVisible, images.length]);

  if (images.length === 0) {
    return (
      <div
        ref={rootRef}
        className={`w-full h-32 md:h-40 bg-gradient-to-br from-white-platinum/5 to-white-platinum/20 rounded-2xl border border-white-platinum/10 flex items-center justify-center ${className}`}
      >
        <span className="text-white-platinum/40 text-lg">&lt;img/&gt;</span>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`relative w-full md:w-[60%] h-45 md:h-90 rounded-2xl border border-white-platinum/10 overflow-hidden transform-gpu ${className}`}
      style={{ willChange: "opacity, transform", contain: "layout paint size style" }}
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Project ${projectId} - ${index + 1}`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentImageIndex ? "bg-white-platinum" : "bg-white-platinum/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectImageCarousel;
