// Smooth scroll utility with custom easing
interface SmoothScrollOptions {
  duration?: number;
  easing?: "easeInOutCubic" | "easeOutQuart" | "easeInOutQuint";
  offset?: number;
}

const easingFunctions = {
  easeInOutCubic: (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
  easeOutQuart: (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  },
  easeInOutQuint: (t: number): number => {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
  },
};

export const smoothScrollTo = (targetY: number, options: SmoothScrollOptions = {}) => {
  const { duration = 1200, easing = "easeInOutCubic", offset = 0 } = options;

  // Respect user's motion preferences
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY + offset);
    return;
  }

  const startY = window.scrollY;
  const distance = targetY + offset - startY;
  const startTime = performance.now();
  const easingFunc = easingFunctions[easing];

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easedProgress = easingFunc(progress);
    const currentY = startY + distance * easedProgress;

    window.scrollTo(0, currentY);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

// Smooth scroll to element
export const smoothScrollToElement = (element: Element, options: SmoothScrollOptions = {}) => {
  const targetY = element.getBoundingClientRect().top + window.scrollY;
  smoothScrollTo(targetY, options);
};

// Smooth scroll to top
export const smoothScrollToTop = (options: SmoothScrollOptions = {}) => {
  smoothScrollTo(0, options);
};
