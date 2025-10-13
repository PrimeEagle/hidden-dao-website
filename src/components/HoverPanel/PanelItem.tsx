import clsx from "clsx";
import type { Panel } from "./hoverPanel.types";

type PanelItemProps = {
  panel: Panel;
  expanded: boolean;
  onHover: () => void;
  onToggle: () => void;
  animation: (el: HTMLDivElement | null, expanded: boolean) => void;
};

export function PanelItem({
  panel,
  expanded,
  onHover,
  onToggle,
  animation,
}: PanelItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-controls={`${panel.id}-content`}
      className={clsx(
        "relative flex-1 min-h-0 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 motion-reduce:transition-none",
        expanded ? "flex-[2]" : "flex-[1]"
      )}
      onClick={onToggle}
      onMouseEnter={onHover}
      onFocus={onHover}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
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

      <div className="relative z-10 flex flex-col justify-start items-center h-full p-4 text-center text-brand-light">
        <div className="bg-brand-primary/5 backdrop-blur-sm rounded-xl px-4 py-2 max-w-md">
          <h3 className="text-4xl font-bold font-logo">{panel.title}</h3>
          <div
            id={`${panel.id}-content`}
            ref={(el) => animation(el, expanded)}
            className="overflow-hidden"
            style={{ maxHeight: 0, opacity: 0, marginTop: 0 }}
          >
            {panel.subtitle && (
              <p className="text-xl font-medium mt-2 font-heading">
                {panel.subtitle}
              </p>
            )}
            {panel.description && (
              <p className="mt-2 text-body sm:text-sm text-left font-body">
                {panel.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
