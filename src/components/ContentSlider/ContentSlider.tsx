import { useState, ReactNode } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import clsx from "clsx";
import { ContentCard } from "@/components/ContentCard";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

type ContentSliderProps<T> = {
  className?: string;
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

export default function ContentSlider<T>({
  className = "",
  data,
  renderItem,
}: ContentSliderProps<T>) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slides: { perView: 1, spacing: 12 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 16 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
      requestAnimationFrame(() => {
        instanceRef.current?.update();
      });
    },
  });

  const pageCount = instanceRef.current
    ? instanceRef.current.track.details.slides.length -
      ((instanceRef.current.options.slides as any)?.perView ?? 1) +
      1
    : 0;

  return (
    <div className={clsx("mx-auto", className)}>
      <div className="flex items-center gap-3">
        {loaded && (
          <button
            aria-label="Previous slide"
            onClick={() => instanceRef.current?.prev()}
            disabled={currentSlide === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-softAccent text-brand-secondary transition-colors hover:bg-brand-starkAccent hover:text-brand-light disabled:opacity-40"
          >
            <MdArrowBackIos className="translate-x-[3px]" />
          </button>
        )}

        <div
          ref={sliderRef} 
          className="keen-slider flex-1 min-w-0 w-full"
          role="region"
          aria-label="Content slider"
          aria-live="polite">
          {data.map((item, i) => (
            <div key={i} className="keen-slider__slide">
              <ContentCard>{renderItem(item, i)}</ContentCard>
            </div>
          ))}
        </div>

        {loaded && (
          <button
            aria-label="Next slide"
            onClick={() => instanceRef.current?.next()}
            disabled={currentSlide === pageCount - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-softAccent text-brand-secondary transition-colors hover:bg-brand-starkAccent hover:text-brand-light disabled:opacity-40"
          >
            <MdArrowForwardIos />
          </button>
        )}
      </div>

      {loaded && pageCount > 1 && (
        <div
          className="mt-6 flex justify-center gap-2"
          role="tablist"
          aria-label="Slide navigation"
        >
          {[...Array(pageCount).keys()].map((idx) => (
            <button
              key={idx}
              role="tab"
              aria-label={`Go to slide ${idx + 1}`}
              aria-selected={currentSlide === idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`h-3 w-3 rounded-full focus:ring-brand-starkContrast ${currentSlide === idx ? "bg-brand-starkAccent" : "bg-brand-light"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}