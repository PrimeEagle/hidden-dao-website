import { useEffect, useRef } from "react";
import { animationStrategies } from "./animationStrategies";

export function usePanelAnimation(
  type: keyof typeof animationStrategies = "fade"
) {
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }
  }, []);

  return (el: HTMLDivElement | null, expanded: boolean) => {
    if (!el) return;
    const transition = prefersReducedMotion.current
      ? "none"
      : "all 0.3s ease";

    el.style.transition = transition;
    animationStrategies[type](el, expanded);
  };
}
