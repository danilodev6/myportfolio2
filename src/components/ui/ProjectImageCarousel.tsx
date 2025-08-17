import { useEffect, useState } from "react";

interface ProjectImageCarouselProps {
  projectId: string;
  className?: string;
}

const ProjectImageCarousel = ({ projectId, className = "" }: ProjectImageCarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define image paths for each project - adjust these based on your actual folder structure
  const projectImages = {
    "auction-app": ["/project1-1.png", "/project1-2.png", "/project1-3.png"],
    "supply-chain-dapp": ["/project2-1.png"],
    "crowdfunding-dapp": ["/project3-1.png", "/project3-2.png", "/project3-3.png", "/project3-4.png"],
    "portfolio-3d": ["/project4-1.png", "/project4-2.png", "/project4-3.png"],
    "movie-finder": ["/project5-1.png", "/project5-2.png"],
  };

  // Get images for current project, fallback to empty array
  const images = projectImages[projectId as keyof typeof projectImages] || [];

  // Auto-rotate images every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return; // Don't rotate if only one or no images

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // If no images, show placeholder
  if (images.length === 0) {
    return (
      <div
        className={`w-full h-32 md:h-40 bg-gradient-to-br from-white-platinum/5 to-white-platinum/20 rounded-2xl border border-white-platinum/10 flex items-center justify-center ${className}`}
      >
        <span className="text-white-platinum/40 text-lg">&lt;img/&gt;</span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full md:w-[60%] h-45 md:h-90 rounded-2xl border border-white-platinum/10 overflow-hidden ${className}`}
    >
      {images.map((imageSrc, index) => (
        <img
          key={index}
          src={imageSrc}
          alt={`Project ${projectId} - number ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.style.display = "none";
          }}
        />
      ))}

      {/* Optional: Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white-platinum" : "bg-white-platinum/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectImageCarousel;
