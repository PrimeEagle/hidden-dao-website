import { motion } from "framer-motion";
import clsx from "clsx";

type TestimonialSliderProps = {
  quote: string;
  author: string;
  role: string;
  className?: string;
};

export function TestimonialSlide({
  quote,
  author,
  role,
  className = ""
}: TestimonialSliderProps) {
  return (
    <div className={clsx("keen-slider__slide", {className})}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded-xl bg-brand-light p-6 shadow"
      >
        <p className="italic">“{quote}”</p>
        <p className="mt-4 font-semibold">{author}</p>
        {role && <p className="text-sm text-brand-accent">{role}</p>}
      </motion.div>
    </div>
  );
}