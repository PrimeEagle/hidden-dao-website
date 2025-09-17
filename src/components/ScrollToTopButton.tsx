import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTopButton({
  threshold = 300,
  fadeDelay = 2500,
  stickAtBottom = true,
  bottomOffset = 24,
  rightOffset = 24,
  size = 48,
  desktopBreakpoint = 768,
}) {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= desktopBreakpoint
  );
  const timeoutRef = useRef<number | null>(null);
  const checkRef = useRef<number | null>(null);

  const getResponsiveValue = (value: any) => {
    if (typeof value === "number") return value;
    if (typeof value === "object") {
      return isDesktop ? (value.desktop ?? value.mobile) : value.mobile;
    }
    return 24;
  };

  const startFadeOutTimer = () => {
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShow(false), fadeDelay);
  };

  const isAtBottom = () => {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= desktopBreakpoint);
    };

    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setVisible(true);
        setShow(true);
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

        if (!(stickAtBottom && isAtBottom())) {
          startFadeOutTimer();
        }
      } else {
        setVisible(false);
        setShow(false);
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      if (checkRef.current !== null) clearInterval(checkRef.current);
    };
  }, [threshold, fadeDelay, stickAtBottom, desktopBreakpoint]);

  const scrollToTop = () => {
    setShow(true);
    if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);

    window.scrollTo({ top: 0, behavior: "smooth" });

    checkRef.current = setInterval(() => {
      if (window.scrollY === 0) {
        startFadeOutTimer();

        if (checkRef.current !== null) {
          clearInterval(checkRef.current);
        }

        checkRef.current = null;
      }
    }, 150);
  };

  const buttonSize = getResponsiveValue(size);

  return (
    <AnimatePresence>
      {visible && show && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="rounded-full bg-brand-secondary text-brand-light shadow-lg fixed flex items-center justify-center"
          style={{
            bottom: `${getResponsiveValue(bottomOffset)}px`,
            right: `${getResponsiveValue(rightOffset)}px`,
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            fontSize: `${buttonSize * 0.5}px`,
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}