import { motion, Transition } from "framer-motion";
import clsx from "clsx";

type FadeItemProps = {
  className?: string;
  style?: React.CSSProperties;
  transitionDuration?: number;
  once?: boolean;
  viewportAmount?: number;
  yOffset?: number;
  children: React.ReactNode;
};

export function FadeItem({
  className = "",
  style,
  transitionDuration = 1,
  once = false,
  viewportAmount = 0.3,
  yOffset = 0,
  children,
}: FadeItemProps) {
  const transition: Transition = {
    duration: transitionDuration,
    ease: [0.25, 0.1, 0.25, 1],
  };

  return (
    <motion.div
      className={clsx("w-full", className)}
      style={style}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={transition}
      viewport={{ once, amount: viewportAmount }}
    >
      {children}
    </motion.div>
  );
}
