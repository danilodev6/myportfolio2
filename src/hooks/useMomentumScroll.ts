import { useEffect, useRef } from "react";

interface MomentumScrollOptions {
  friction?: number;
  acceleration?: number;
  sensitivity?: number;
}

export const useMomentumScroll = (options: MomentumScrollOptions = {}) => {
  const scrollDataRef = useRef({
    scrollY: 0,
    targetY: 0,
    velocity: 0,
    isActive: false,
    isNavigating: false,
  });

  const { friction = 0.92, acceleration = 0.12, sensitivity = 0.2 } = options;

  useEffect(() => {
    const scrollData = scrollDataRef.current;

    // Initialize scroll position
    scrollData.scrollY = window.scrollY;
    scrollData.targetY = window.scrollY;

    // Handle scroll to top programmatically
    const scrollToTop = () => {
      scrollData.isNavigating = true;
      const startPosition = scrollData.scrollY;
      const distance = -startPosition; // Distance to top
      const duration = 1200;
      const startTime = performance.now();

      const animateScroll = () => {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

        const currentPosition = startPosition + distance * easeInOutCubic(progress);

        scrollData.scrollY = currentPosition;
        scrollData.targetY = currentPosition;
        scrollData.velocity = 0;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          scrollData.isNavigating = false;
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const scrollToY = (y: number) => {
      scrollData.isNavigating = true;
      const startPosition = scrollData.scrollY;
      const distance = y - startPosition;
      const duration = 1200;
      const startTime = performance.now();

      const animateScroll = () => {
        const currentTime = performance.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

        const currentPosition = startPosition + distance * easeInOutCubic(progress);

        scrollData.scrollY = currentPosition;
        scrollData.targetY = currentPosition;
        scrollData.velocity = 0;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          scrollData.isNavigating = false;
        }
      };

      requestAnimationFrame(animateScroll);
    };

    // Expose helpers globally
    (window as any).customScrollTo = scrollToY;
    (window as any).customScrollToTop = scrollToTop;

    // Expose scrollToTop globally for menu components
    (window as any).customScrollToTop = scrollToTop;

    // Handle anchor navigation
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.hash) {
        e.preventDefault();

        const targetElement = document.querySelector(target.hash) as HTMLElement;
        if (targetElement) {
          scrollData.isNavigating = true;
          const targetPosition = targetElement.offsetTop;

          // Smooth scroll to target
          const startPosition = scrollData.scrollY;
          const distance = targetPosition - startPosition;
          const duration = 1200; // 1.2 seconds
          const startTime = performance.now();

          const animateScroll = () => {
            const currentTime = performance.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-in-out-cubic)
            const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

            const currentPosition = startPosition + distance * easeInOutCubic(progress);

            // Update scroll data to prevent momentum interference
            scrollData.scrollY = currentPosition;
            scrollData.targetY = currentPosition;
            scrollData.velocity = 0;

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            } else {
              scrollData.isNavigating = false;
            }
          };

          requestAnimationFrame(animateScroll);
        }
      }
    };

    // Wheel event handler
    const handleWheel = (e: WheelEvent) => {
      if (scrollData.isNavigating) return; // Don't interfere with navigation

      e.preventDefault();
      scrollData.velocity += e.deltaY * sensitivity;
    };

    // Touch event handlers for mobile
    let startY = 0;
    let lastY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (scrollData.isNavigating) return;
      startY = e.touches[0].clientY;
      lastY = startY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (scrollData.isNavigating) return;

      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY;

      scrollData.velocity += deltaY * (sensitivity * 2);
      lastY = currentY;
    };

    // Sync with native scroll events (for cases where native scroll occurs)
    const handleScroll = () => {
      if (scrollData.isNavigating) return;

      const currentScrollY = window.scrollY;
      // Only sync if there's a significant difference (prevents interference)
      if (Math.abs(currentScrollY - scrollData.scrollY) > 5) {
        scrollData.scrollY = currentScrollY;
        scrollData.targetY = currentScrollY;
      }
    };

    // Animation loop
    const animate = () => {
      if (!scrollData.isActive) return;

      if (!scrollData.isNavigating) {
        // Apply momentum physics only when not navigating
        scrollData.targetY += scrollData.velocity;
        scrollData.velocity *= friction;

        // Clamp scroll bounds (get fresh values each frame)
        const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        scrollData.targetY = Math.max(0, Math.min(scrollData.targetY, maxScroll));

        // Smooth interpolation
        scrollData.scrollY += (scrollData.targetY - scrollData.scrollY) * acceleration;
      }

      // Always apply scroll to window (whether navigating or using momentum)
      window.scrollTo(0, scrollData.scrollY);

      (window as any).__virtualScrollY = scrollData.scrollY;
      window.dispatchEvent(new CustomEvent<number>("vs", { detail: scrollData.scrollY }));

      requestAnimationFrame(animate);
    };

    // Start animation
    scrollData.isActive = true;
    animate();

    // Add event listeners
    document.addEventListener("click", handleAnchorClick, true); // Use capture phase
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup
    return () => {
      scrollData.isActive = false;
      // Clean up global reference
      delete (window as any).customScrollToTop;
      document.removeEventListener("click", handleAnchorClick, true);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [friction, acceleration, sensitivity]);

  return null;
};
