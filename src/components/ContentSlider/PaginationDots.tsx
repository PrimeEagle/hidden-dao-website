type PaginationDotsProps = {
  count: number
  activeIndex: number
  onSelect: (index: number) => void
}

export function PaginationDots({ count, activeIndex, onSelect }: PaginationDotsProps) {
  return (
    <div
      className="mt-6 flex justify-center gap-2"
      role="tablist"
      aria-label="Slide navigation"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <button
          key={idx}
          role="tab"
          aria-label={`Go to slide ${idx + 1}`}
          aria-selected={activeIndex === idx}
          onClick={() => onSelect(idx)}
          className={`h-3 w-3 rounded-full focus:ring-brand-starkContrast ${
            activeIndex === idx ? "bg-brand-starkAccent" : "bg-brand-light"
          }`}
        />
      ))}
    </div>
  )
}
