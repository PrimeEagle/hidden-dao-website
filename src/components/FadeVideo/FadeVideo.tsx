import { motion } from "framer-motion";
import clsx from "clsx";

type FadeVideoProps = {
  src: string;
  title?: string;
  background: boolean;
  decorative: boolean;
  className?: string;
};

export function FadeVideo({
  src,
  title = "",
  background = false,
  decorative = false,
  className = "",
}: FadeVideoProps) {
  return (
    <motion.video
      src={src}
      title={decorative ? undefined : `${title}`}
      aria-hidden={decorative ? "true" : undefined}
      autoPlay
      loop
      muted
      playsInline
      className={clsx(
        className,
        background
          ? "absolute inset-0 h-full w-full object-cover -z-10"
          : "w-full rounded-2xl"
      )}
      initial={false}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.15, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.35 }}
    >
      Your browser does not support the video tag.
    </motion.video>
  );
}
