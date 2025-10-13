import { useState } from "react";
import clsx from "clsx";
import { PanelItem } from "./PanelItem";
import { usePanelAnimation } from "./usePanelAnimation";
import { expansionStrategies } from "./panelBehaviors";
import type { HoverPanelProps } from "./HoverPanel.types";

export function HoverPanel({
  panels,
  className = "",
  behavior = "overlay",
  animationType = "fade",
}: HoverPanelProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const animate = usePanelAnimation(animationType);
  const behaviorStrategy = expansionStrategies[behavior];

  const togglePanel = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id));

  return (
    <div
      className={clsx("flex flex-col lg:flex-row gap-4 h-[80vh]", className)}
      onMouseLeave={() => {
        setHoveredId(null);
        setActiveId(null);
      }}
    >
      {panels.map((panel) => (
        <PanelItem
          key={panel.id}
          panel={panel}
          expanded={behaviorStrategy.isExpanded(
            panel.id,
            activeId,
            hoveredId
          )}
          onHover={() =>
            behaviorStrategy.onHover(panel.id, setHoveredId, setActiveId)
          }
          onToggle={() => togglePanel(panel.id)}
          animation={animate}
        />
      ))}
    </div>
  );
}
