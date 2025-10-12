import { motion } from "framer-motion";
import clsx from "clsx";

type FadeIFrameProps = {
  src: string;
  title: string;
  className?: string;
};

export function FadeIFrame({ src, title, className = "" }: FadeIFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.15, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.4 }}
      className={clsx(
        "relative overflow-hidden rounded-2xl shadow-xl border border-brand-softAccent w-full h-full",
        className
      )}
    >
      <iframe
        src={src}
        className="w-full h-full"
        title={title}
        loading="lazy"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </motion.div>
  );
}
