import { motion } from "framer-motion";
import clsx from "clsx";

type FadeVideoProps = {
  src: string;
  background: boolean;
  className?: string;
};

export default function FadeVideo({
  src,
  background = false,
  className = "",
}: FadeVideoProps) {
  return (
    <motion.video
      src={src}
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.15, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.35 }}
    />
  );
}
