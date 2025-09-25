import { useEffect, useState } from "react";

export function useScrollY(threshold = 0) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      setPast(scrollY > threshold);
    };

    // Check initial state
    updateScroll();

    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [threshold]);

  return past;
}
