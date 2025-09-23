import { motion } from "framer-motion"
import clsx from "clsx";

type FadeImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

export default function FadeImage({ src, alt = "", className = "" }: FadeImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={clsx("w-full rounded-2xl", className)}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      loading="lazy"
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
    />
  )
}