import { motion } from "framer-motion";
import clsx from "clsx";
import { ReactNode } from "react";

type PositionValue =
  | "0"
  | "px"
  | "full"
  | "1/2"
  | "1/3"
  | "2/3"
  | "1/4"
  | "3/4"
  | (string & {});

type FadeObjectProps = {
  children: ReactNode;
  className?: string;
  top?: PositionValue;
  bottom?: PositionValue;
  left?: PositionValue;
  right?: PositionValue;
};

export default function FadeObject({
  children,
  className = "",
  top,
  bottom,
  left,
  right,
}: FadeObjectProps) {
  const makeClass = (side: string, value?: PositionValue) => {
    if (!value) return null;

    const standardTokens = [
      "0",
      "px",
      "full",
      "1/2",
      "1/3",
      "2/3",
      "1/4",
      "3/4",
    ];
    if (standardTokens.includes(value)) return `${side}-${value}`;

    return `${side}-[${value}]`;
  };

  const positionClasses = [
    makeClass("top", top),
    makeClass("bottom", bottom),
    makeClass("left", left),
    makeClass("right", right),
  ];

  return (
    <motion.div
      className={clsx("relative w-full", className, positionClasses)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
