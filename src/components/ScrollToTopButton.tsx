import { useEffect, useState, useRef } from "react";
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
  threshold = 300,
  fadeDelay = 2500,
  stickAtBottom = true,
  bottomOffset = 24,
  rightOffset = 24,
  size = 48,
  desktopBreakpoint = 768,
}: ScrollToTopButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getResponsiveValue = (value: ResponsiveValue): number => {
    if (typeof value === "number") return value;
    return isDesktop ? value.desktop : value.mobile;
  };

  const startFadeOutTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShow(false), fadeDelay);
  };

  const isAtBottom = () =>
    typeof window !== "undefined" &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight;

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    setIsDesktop(window.innerWidth >= desktopBreakpoint);

    const handleResize = () =>
      setIsDesktop(window.innerWidth >= desktopBreakpoint);

    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setVisible(true);
        setShow(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (!(stickAtBottom && isAtBottom())) startFadeOutTimer();
      } else {
        setVisible(false);
        setShow(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [threshold, fadeDelay, stickAtBottom, desktopBreakpoint]);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    setShow(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null; // avoid SSR mismatch

  const buttonSize = getResponsiveValue(size);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: show ? 1 : 0,
            scale: show ? 1 : 0.8,
            pointerEvents: show ? "auto" : "none",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="z-50 rounded-full bg-brand-light text-brand-secondary border-2 border-brand-secondary shadow-lg fixed flex items-center justify-center"
          style={{
            bottom: `${getResponsiveValue(bottomOffset)}px`,
            right: `${getResponsiveValue(rightOffset)}px`,
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            fontSize: `${buttonSize * 0.5}px`,
          }}
        >
          <LuChevronUp />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
