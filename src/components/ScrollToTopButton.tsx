import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronUp } from "react-icons/lu";

type ResponsiveValue<T> = T | { desktop: T; mobile: T };

function isResponsiveObject<T>(
  value: ResponsiveValue<T>
): value is { desktop: T; mobile: T } {
  return (
    typeof value === "object" &&
    value !== null &&
    "desktop" in value &&
    "mobile" in value
  );
}

function getResponsiveValue<T>(
  value: ResponsiveValue<T>,
  isDesktop: boolean
): T {
  if (isResponsiveObject(value)) {
    return isDesktop ? value.desktop : value.mobile;
  }
  return value;
}

type ScrollToTopButtonProps = {
  threshold?: number;
  fadeDelay?: number;
  stickAtBottom?: boolean;
  bottomOffset?: ResponsiveValue<number>;
  rightOffset?: ResponsiveValue<number>;
  size?: ResponsiveValue<number>;
  desktopBreakpoint?: number;
};

export default function ScrollToTopButton({
  threshold = 200,
  fadeDelay = 2000,
  stickAtBottom = true,
  bottomOffset = { desktop: 32, mobile: 24 },
  rightOffset = { desktop: 32, mobile: 16 },
  size = { desktop: 48, mobile: 64 },
  desktopBreakpoint = 768,
}: ScrollToTopButtonProps) {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const media = window.matchMedia(`(min-width: ${desktopBreakpoint}px)`);
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [mounted, desktopBreakpoint]);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const handleScroll = () => {
      const y = window.scrollY;

      if (stickAtBottom) {
        setShow(y > threshold);
        return;
      }

      if (y > threshold) {
        setShow(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setShow(false), fadeDelay);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted, threshold, fadeDelay, stickAtBottom]);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Home" || (e.ctrlKey && e.key === "ArrowUp")) {
        scrollToTop();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mounted]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!mounted) return null;

  const buttonSize = getResponsiveValue(size, isDesktop);

  const handleHoverIn = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  };

  const handleHoverOut = () => {
    if (!stickAtBottom) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShow(false), fadeDelay);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, pointerEvents: "auto" }}
          exit={{ opacity: 0, scale: 0.8, pointerEvents: "none" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          onMouseEnter={isDesktop ? handleHoverIn : undefined}
          onMouseLeave={isDesktop ? handleHoverOut : undefined}
          className="z-50 fixed flex items-center justify-center rounded-full bg-brand-light text-brand-secondary border-2 border-brand-secondary shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-starkAccent"
          style={{
            bottom: `${getResponsiveValue(bottomOffset, isDesktop)}px`,
            right: `${getResponsiveValue(rightOffset, isDesktop)}px`,
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