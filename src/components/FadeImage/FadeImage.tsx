import { motion } from "framer-motion";
import clsx from "clsx";

type PositionValue =
  | "0"
  | "px"
  | "full"
  | "1/2"
  | "1/3"
  | "2/3"
  | "1/4"
  | "3/4"
  | (string & {}); // fallback for arbitrary values like "10%" or "32px"

type FadeImageProps = {
  src: string;
  alt?: string;
  className?: string;
  top?: PositionValue;
  bottom?: PositionValue;
  left?: PositionValue;
  right?: PositionValue;
};

export default function FadeImage({
  src,
  alt = "",
  className = "",
  top,
  bottom,
  left,
  right,
}: FadeImageProps) {
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
    <motion.img
      src={src}
      alt={alt}
      className={clsx("w-full rounded-2xl", className, positionClasses)}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      loading="lazy"
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.2 }}
    />
  );
}