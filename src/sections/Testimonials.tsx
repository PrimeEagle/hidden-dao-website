import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Section from "../components/Section";
import { TestimonialSlider } from "../components/TestimonialSlider";
import { useState } from "react";

const testimonials = [
  {
    quote: "This school has completely transformed my discipline and fitness.",
    author: "Jane Doe",
    role: "Student",
  },
  {
    quote: "The instructors are patient, professional, and inspiring.",
    author: "John Smith",
    role: "Parent",
  },
  {
    quote: "Training here gave me strength, confidence, and new friends.",
    author: "Alex Lee",
    role: "Student",
  },
  {
    quote: "A truly supportive community that pushes you to grow.",
    author: "Maria Lopez",
    role: "Student",
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    slides: { perView: 1, spacing: 12 }, // mobile
    breakpoints: {
      "(min-width: 768px)": { slides: { perView: 2, spacing: 16 } }, // tablet/desktop: exactly 2 per page
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const pageCount = instanceRef.current
    ? instanceRef.current.track.details.slides.length -
      ((instanceRef.current.options.slides as any)?.perView ?? 1) +
      1
    : 0;

  return (
    <Section id="testimonials" title="Testimonials" subTitle="What Our Students Say">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          {loaded && (
            <button
              onClick={() => instanceRef.current?.prev()}
              disabled={currentSlide === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-softAccent text-brand-secondary transition-colors hover:bg-brand-starkAccent hover:text-brand-light disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-softAccent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* KEY: flex-1 + min-w-0 so the slider can shrink between arrows */}
          <div ref={sliderRef} className="keen-slider flex-1 min-w-0 w-full">
            {testimonials.map((t, i) => (
              <TestimonialSlider key={i} {...t} />
            ))}
          </div>

          {loaded && (
            <button
              onClick={() => instanceRef.current?.next()}
              disabled={currentSlide === pageCount - 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-softAccent text-brand-secondary transition-colors hover:bg-brand-starkAccent hover:text-brand-light disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-softAccent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        {loaded && pageCount > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {[...Array(pageCount).keys()].map((idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`h-3 w-3 rounded-full ${
                  currentSlide === idx ? "bg-brand-starkAccent" : "bg-brand-light"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
