import { ReactNode, useEffect, useMemo, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import clsx from "clsx";
import { ContentCard } from "@/components/ContentCard";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

type ContentSliderProps<T> = {
  className?: string;
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

export default function ContentSlider<T>({ className = "", data, renderItem }: ContentSliderProps<T>) {
  const [hoverCapable, setHoverCapable] = useState(false);
  const [current, setCurrent] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const m = typeof window !== "undefined" ? window.matchMedia("(hover: hover) and (pointer: fine)") : null;
    setHoverCapable(!!m && m.matches);
    if (m) {
      const fn = (e: MediaQueryListEvent) => setHoverCapable(e.matches);
      m.addEventListener?.("change", fn);
      return () => m.removeEventListener?.("change", fn);
    }
  }, []);

  const options = useMemo(
    () => ({
      loop: true,
      drag: true,
      slides: { perView: 1, spacing: 16 },
      breakpoints: {
        "(min-width: 640px)": { slides: { perView: 2, spacing: 16 } },
        "(min-width: 1024px)": { slides: { perView: 3, spacing: 24 } },
      },
    }),
    []
  );

  const [containerRef, instanceRef] = useKeenSlider<HTMLDivElement>(options, [
    (s) => {
      setCurrent(s.track.details.rel);
      setPages(s.track.details.maxIdx + 1);
      s.on("slideChanged", () => setCurrent(s.track.details.rel));
      s.on("updated", () => setPages(s.track.details.maxIdx + 1));
      s.on("destroyed", () => {
        setCurrent(0);
        setPages(1);
      });
    },
  ]);

  return (
    <div className={clsx("w-full", className)}>
      <div ref={containerRef} className="keen-slider">
        {data.map((item, i) => (
          <div key={i} className="keen-slider__slide">
            <ContentCard>{renderItem(item, i)}</ContentCard>
          </div>
        ))}
      </div>

      {hoverCapable && (
        <div className="mt-4 flex items-center justify-between">
          <button onClick={() => instanceRef.current?.prev()} className="rounded-lg bg-brand-light p-2 shadow">
            <MdArrowBackIos />
          </button>
          <button onClick={() => instanceRef.current?.next()} className="rounded-lg bg-brand-light p-2 shadow">
            <MdArrowForwardIos />
          </button>
        </div>
      )}

      {pages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`h-3 w-3 rounded-full ${current === idx ? "bg-brand-starkAccent" : "bg-brand-light"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}