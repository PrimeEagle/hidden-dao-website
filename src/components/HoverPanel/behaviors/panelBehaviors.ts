export const expansionStrategies = {
  overlay: {
    isExpanded: (id: string, activeId: string | null, hoveredId: string | null) =>
      id === hoveredId || id === activeId,
    onHover: (id: string, setHovered: any, setActive: any) => {
      setHovered(id);
      setActive((prev: string | null) => (prev && prev !== id ? null : prev));
    },
  },

  push: {
    isExpanded: (id: string, activeId: string | null) => id === activeId,
    onHover: (id: string, setHovered: any) => setHovered(id),
  },

  singleHover: {
    isExpanded: (id: string, _activeId: string | null, hoveredId: string | null) =>
      id === hoveredId,
    onHover: (id: string, setHovered: any) => setHovered(id),
  },
};
