import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronUp } from "react-icons/lu";

type ResponsiveValue = number | { desktop: number; mobile: number };

interface ScrollToTopButtonProps {
  threshold?: number;
  fadeDelay?: number;
  stickAtBottom?: boolean;
  bottomOffset?: ResponsiveValue;
  rightOffset?: ResponsiveValue;
  size?: ResponsiveValue;
  desktopBreakpoint?: number;
}

export default function ScrollToTopButton({
  threshold = 240,
  fadeDelay = 1400,
  stickAtBottom = true,
  bottomOffset = { desktop: 32, mobile: 20 },
  rightOffset = { desktop: 32, mobile: 20 },
  size = { desktop: 48, mobile: 44 },
  desktopBreakpoint = 1024,
}: ScrollToTopButtonProps) {
  const [show, setShow] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getResponsiveValue = (v: ResponsiveValue) => {
    if (typeof v === "number") return v;
    return isDesktop ? v.desktop : v.mobile;
  };

  useEffect(() => {
    const hasWin = typeof window !== "undefined" && typeof document !== "undefined";
    if (!hasWin) return;

    const atBottom = () =>
      window.innerHeight + window.scrollY >= Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

    const computeIsDesktop = () => setIsDesktop(window.innerWidth >= desktopBreakpoint);

    const scheduleHide = () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (fadeDelay <= 0) return;
      if (stickAtBottom && atBottom()) return;
      hideTimer.current = setTimeout(() => setShow(false), fadeDelay);
    };

    const handleScroll = () => {
      const scrolledPast = window.scrollY > threshold;
      const bottom = atBottom();
      if (stickAtBottom && bottom) {
        setShow(true);
        if (hideTimer.current) clearTimeout(hideTimer.current);
        return;
      }
      setShow(scrolledPast);
      if (scrolledPast) scheduleHide();
    };

    const handleResize = () => {
      computeIsDesktop();
      handleScroll();
    };

    computeIsDesktop();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [threshold, fadeDelay, stickAtBottom, desktopBreakpoint]);

  const onClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          aria-label="Scroll to top"
          onClick={onClick}
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ duration: 0.2 }}
          className="fixed z-50 rounded-full shadow-md bg-brand-starkAccent text-white"
          style={{
            bottom: `${getResponsiveValue(bottomOffset)}px`,
            right: `${getResponsiveValue(rightOffset)}px`,
            width: `${getResponsiveValue(size)}px`,
            height: `${getResponsiveValue(size)}px`,
            fontSize: `${getResponsiveValue(size) * 0.5}px`,
          }}
        >
          <LuChevronUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}