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
  });

  const { friction = 0.92, acceleration = 0.12, sensitivity = 0.2 } = options;

  useEffect(() => {
    const scrollData = scrollDataRef.current;

    // Wheel event handler
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollData.velocity += e.deltaY * sensitivity;
    };

    // Touch event handlers for mobile
    let startY = 0;
    let lastY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      lastY = startY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY;

      scrollData.velocity += deltaY * (sensitivity * 2);
      lastY = currentY;
    };

    // Animation loop
    const animate = () => {
      if (!scrollData.isActive) return;

      // Apply momentum physics
      scrollData.targetY += scrollData.velocity;
      scrollData.velocity *= friction;

      // Clamp scroll bounds (get fresh values each frame)
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      scrollData.targetY = Math.max(0, Math.min(scrollData.targetY, maxScroll));

      // Smooth interpolation
      scrollData.scrollY += (scrollData.targetY - scrollData.scrollY) * acceleration;

      // Apply scroll to window (this preserves all your existing effects!)
      window.scrollTo(0, scrollData.scrollY);

      requestAnimationFrame(animate);
    };

    // Start animation
    scrollData.isActive = true;
    animate();

    // Add event listeners
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    // Cleanup
    return () => {
      scrollData.isActive = false;
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [friction, acceleration, sensitivity]);

  return null; // No refs needed since we're using native scroll
};
