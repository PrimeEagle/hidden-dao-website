import { motion } from "framer-motion";
import clsx from "clsx";

type FadeIFrameProps = {
  src: string;
  className?: string;
};

export default function FadeIFrame({ src, className = "" }: FadeIFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.15, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.4 }}
      className={clsx("relative overflow-hidden rounded-2xl shadow-xl border border-brand-softAccent aspect-[16/9] transform transition duration-500", {className})}
    >
      <iframe
        src={src}
        className="h-full w-full"
        loading="lazy"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </motion.div>
  );
}