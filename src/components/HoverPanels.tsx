import React, { useState } from "react";

type Panel = {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  color: {
    base: string; // e.g. "bg-red-600/50"
    hover: string; // e.g. "bg-red-800/70"
  };
  children?: React.ReactNode;
};

interface HoverPanelsProps {
  panels: Panel[];
}

const HoverPanels: React.FC<HoverPanelsProps> = ({ panels }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {panels.map((panel) => (
        <div
          key={panel.id}
          className="relative flex-1 flex items-center justify-center transition-all duration-500 cursor-pointer group"
          onMouseEnter={() => setHovered(panel.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            backgroundImage: `url(${panel.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay tint */}
          <div
            className={`absolute inset-0 transition-colors duration-500 ${
              hovered === panel.id ? panel.color.hover : panel.color.base
            }`}
          />

          {/* Content */}
          <div className="relative z-10 text-center text-white p-6">
            <h2 className="text-3xl font-bold">{panel.title}</h2>
            <div
              className={`transition-all duration-500 ${
                hovered === panel.id
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-sm uppercase tracking-wide mt-2">
                {panel.subtitle}
              </p>
              {panel.children ? (
                <div className="mt-2">{panel.children}</div>
              ) : (
                panel.description && (
                  <p className="mt-2 text-base">{panel.description}</p>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoverPanels;
