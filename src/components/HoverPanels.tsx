import { useState } from "react";
import clsx from "clsx";

type Panel = {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  color: {
    base: string;
    hover: string;
  };
  children?: React.ReactNode;
};

type HoverPanelsProps = {
  panels: Panel[];
  className?: string;
};

export default function HoverPanels({
  panels,
  className = "",
}: HoverPanelsProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={clsx("flex w-full overflow-hidden rounded-xl", className)}>
      {panels.map((panel) => (
        <div
          key={panel.id}
          className="relative flex-1 h-full flex items-start justify-center transition-all duration-500 cursor-pointer group"
          onMouseEnter={() => setHovered(panel.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            backgroundImage: `url(${panel.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`absolute inset-0 transition-colors duration-500 ${
              hovered === panel.id ? panel.color.hover : panel.color.base
            }`}
          />

          <div className="relative z-10 text-center text-white px-6 pt-12 w-full">
            <div className="mx-auto min-h-[4.5rem] flex items-start justify-center">
              <h2 className="text-3xl font-bold overflow-hidden font-heading">
                {panel.title}
              </h2>
            </div>

            <div
              className={`transition-all duration-500 ${
                hovered === panel.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <div className="mt-2 min-h-[1.25rem] flex items-start justify-center overflow-hidden">
                <p className="text-sm uppercase tracking-wide font-body font-bold">
                  {panel.subtitle}
                </p>
              </div>

              {panel.children ? (
                <div className="mt-2">{panel.children}</div>
              ) : (
                panel.description && (
                  <p className="mt-2 text-base font-body">{panel.description}</p>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}