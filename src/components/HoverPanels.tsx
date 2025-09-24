import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type Panel = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  color: { base: string; hover: string };
  children: React.ReactNode;
};

type HoverPanelsProps = {
  panels: Panel[];
  className?: string;
};

export default function HoverPanels({
  panels,
  className = "",
}: HoverPanelsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const togglePanel = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    Object.entries(contentRefs.current).forEach(([id, el]) => {
      if (!el) return;
      const transition = prefersReducedMotion.current
        ? "none"
        : "max-height 0.3s ease, opacity 0.3s ease, margin 0.3s ease";
      el.style.transition = transition;

      if (activeId === id || hoveredId === id) {
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.opacity = "1";
        el.style.marginTop = "0.5rem";
      } else {
        el.style.maxHeight = "0px";
        el.style.opacity = "0";
        el.style.marginTop = "0";
      }
    });
  }, [activeId, hoveredId]);

  return (
    <div
      className={clsx(
        "flex flex-col sm:flex-row gap-4 max-w-7xl mx-auto",
        className
      )}
      onMouseLeave={() => {
        setHoveredId(null);
        setActiveId(null);
      }}
    >
      {panels.map((panel) => {
        const isActive = activeId === panel.id;
        const isHovered = hoveredId === panel.id;
        const expanded = isHovered || isActive;

        return (
          <div
            key={panel.id}
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            aria-controls={`${panel.id}-content`}
            className={clsx(
              "relative flex-1 min-h-[200px] rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 motion-reduce:transition-none",
              panel.color.base,
              expanded ? ["sm:flex-[2]", panel.color.hover] : "sm:flex-[1]"
            )}
            onClick={() => togglePanel(panel.id)}
            onMouseEnter={() => {
              setHoveredId(panel.id);
              if (activeId && activeId !== panel.id) setActiveId(null);
            }}
            onMouseLeave={() => setHoveredId(null)}
            onFocus={() => {
              setHoveredId(panel.id);
              if (activeId && activeId !== panel.id) setActiveId(null);
            }}
            onBlur={() => setHoveredId(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                togglePanel(panel.id);
              }
            }}
          >
            <div className="absolute inset-0">{panel.children}</div>

            <div
              className={clsx(
                "absolute inset-0 transition-colors duration-300",
                expanded ? panel.color.hover : panel.color.base
              )}
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex flex-col justify-start items-center h-full p-4 text-center text-white">
              <h3 className="text-xl font-bold">{panel.title}</h3>

              <div
                id={`${panel.id}-content`}
                ref={(el) => {
                  contentRefs.current[panel.id] = el;
                }}
                className="overflow-hidden"
                style={{ maxHeight: 0, opacity: 0, marginTop: 0 }}
                aria-live="polite"
              >
                {panel.subtitle && (
                  <p className="text-lg font-medium">{panel.subtitle}</p>
                )}
                {panel.description && (
                  <p className="mt-2 text-sm sm:text-base max-w-md">
                    {panel.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
