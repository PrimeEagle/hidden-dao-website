import { ContentCard } from "./components/ContentCard"
import { NavButton } from "./components/NavButton"
import { PaginationDots } from "./components/PaginationDots"
import { useContentSlider } from "./hooks/useContentSlider"
import clsx from "clsx"
import { ContentSliderProps } from "./types/contentSlider.types"

export function ContentSlider<T>({
  className = "",
  data,
  renderItem,
}: ContentSliderProps<T>) {
  const { sliderRef, instanceRef, currentSlide, pageCount, loaded } = useContentSlider(data)

  return (
    <div className={clsx("mx-auto", className)}>
      <div className="flex items-center gap-3">
        {loaded && (
          <NavButton
            direction="prev"
            disabled={currentSlide === 0}
            onClick={() => instanceRef.current?.prev()}
          />
        )}

        <div
          ref={sliderRef}
          className="keen-slider flex-1 min-w-0 w-full"
          role="region"
          aria-label="Content slider"
          aria-live="polite"
        >
          {data.map((item, i) => (
            <div key={i} className="keen-slider__slide">
              <ContentCard>{renderItem(item, i)}</ContentCard>
            </div>
          ))}
        </div>

        {loaded && (
          <NavButton
            direction="next"
            disabled={currentSlide === pageCount - 1}
            onClick={() => instanceRef.current?.next()}
          />
        )}
      </div>

      {loaded && pageCount > 1 && (
        <PaginationDots
          count={pageCount}
          activeIndex={currentSlide}
          onSelect={(idx) => instanceRef.current?.moveToIdx(idx)}
        />
      )}
    </div>
  )
}
