import { useEffect, useState } from "react";
import clsx from "clsx";

type Panel = {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  color: { base: string; hover: string };
  children?: React.ReactNode;
};

type HoverPanelsProps = {
  panels: Panel[];
  className?: string;
};

export default function HoverPanels({ panels, className = "" }: HoverPanelsProps) {
  const [active, setActive] = useState<string | null>(null);
  const [hoverCapable, setHoverCapable] = useState(false);

  useEffect(() => {
    const m = typeof window !== "undefined" ? window.matchMedia("(hover: hover) and (pointer: fine)") : null;
    setHoverCapable(!!m && m.matches);
    if (m) {
      const fn = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
      m.addEventListener?.("change", fn);
      return () => m.removeEventListener?.("change", fn);
    }
  }, []);

  const onEnter = (id: string) => {
    if (!hoverCapable) return;
    setActive(id);
  };

  const onLeave = () => {
    if (!hoverCapable) return;
    setActive(null);
  };

  const onTap = (id: string) => {
    if (hoverCapable) return;
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <div className={clsx("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {panels.map((panel) => {
        const isActive = active === panel.id;
        return (
          <div
            key={panel.id}
            onMouseEnter={() => onEnter(panel.id)}
            onMouseLeave={onLeave}
            onClick={() => onTap(panel.id)}
            className={clsx(
              "relative rounded-xl p-5 transition-colors",
              isActive ? panel.color.hover : panel.color.base
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{panel.title}</h3>
                <p className="text-sm opacity-80">{panel.subtitle}</p>
              </div>
            </div>

            {panel.description && (
              <p className={clsx("mt-2 text-sm", isActive ? "opacity-100" : "opacity-70")}>{panel.description}</p>
            )}

            <div className={clsx("mt-3 overflow-hidden transition-[max-height,opacity]", isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
              {panel.children}
            </div>
          </div>
        );
      })}
    </div>
  );
}