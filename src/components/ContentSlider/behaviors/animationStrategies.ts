import { Variants } from "framer-motion"

export const animationStrategies: Record<string, Variants> = {
  default: { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slide: { hidden: { x: 50, opacity: 0 }, visible: { x: 0, opacity: 1 } },
}
