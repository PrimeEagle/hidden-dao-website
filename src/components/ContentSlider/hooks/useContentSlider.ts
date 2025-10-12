import { useState } from "react"
import { useKeenSlider } from "keen-slider/react"

export function useContentSlider<T>(data: T[]) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slides: { perView: 1, spacing: 12 },
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 16 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
      requestAnimationFrame(() => instanceRef.current?.update())
    },
  })

  const pageCount = instanceRef.current
    ? instanceRef.current.track.details.slides.length -
      ((instanceRef.current.options.slides as any)?.perView ?? 1) +
      1
    : 0

  return { sliderRef, instanceRef, currentSlide, loaded, pageCount }
}
