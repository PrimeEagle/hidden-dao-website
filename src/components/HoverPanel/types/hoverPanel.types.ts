export type Panel = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  color: { base: string; hover: string };
  children: React.ReactNode;
};

export type HoverPanelsProps = {
  panels: Panel[];
  className?: string;
  behavior?: "overlay" | "push" | "singleHover";
  animationType?: "fade" | "slide" | "zoom" | "shift";
};
