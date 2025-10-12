import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"
import clsx from "clsx"

type NavButtonProps = {
  direction: "prev" | "next"
  disabled?: boolean
  onClick: () => void
}

export function NavButton({ direction, disabled, onClick }: NavButtonProps) {
  const Icon = direction === "prev" ? MdArrowBackIos : MdArrowForwardIos

  return (
    <button
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "flex h-10 w-10 items-center justify-center rounded-full border border-brand-softAccent text-brand-secondary transition-colors hover:bg-brand-starkAccent hover:text-brand-light disabled:opacity-40",
        direction === "prev" ? "left-4 pl-2" : "right-4"
      )}
    >
      <Icon
        className={clsx(
          "text-xl",
          direction === "prev" ? "-translate-x-[1px]" : "translate-x-[1px]"
        )}
      />
    </button>
  )
}
