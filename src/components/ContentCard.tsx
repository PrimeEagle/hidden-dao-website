import { motion } from "framer-motion";
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export function ContentCard({ children }: CardProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-xl bg-brand-light p-4 sm:p-6 shadow"

    >
      {children}
    </motion.div>
  );
}