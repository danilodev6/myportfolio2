import { useEffect, useState } from "react";

export function useScrollY(threshold = 0) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const getY = () => (window as any).__virtualScrollY ?? window.scrollY ?? window.pageYOffset ?? 0;

    const updateFromNative = () => setPast(getY() > threshold);

    const updateFromVirtual = (e: Event) => {
      const y = (e as CustomEvent<number>).detail ?? getY();
      setPast(y > threshold);
    };

    updateFromNative();
    window.addEventListener("scroll", updateFromNative, { passive: true });
    window.addEventListener("vs", updateFromVirtual as EventListener);

    return () => {
      window.removeEventListener("scroll", updateFromNative);
      window.removeEventListener("vs", updateFromVirtual as EventListener);
    };
  }, [threshold]);

  return past;
}
