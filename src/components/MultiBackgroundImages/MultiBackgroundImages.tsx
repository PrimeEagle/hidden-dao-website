import { FadeItem } from "@/components/FadeItem"
import { multiBackgroundImagesStyles } from "./multiBackgroundImages.styles"
import type { MultiBackgroundImagesProps } from "./multiBackgroundImages.types"
import clsx from "clsx"

export function MultiBackgroundImages({
  images,
  className = "",
}: MultiBackgroundImagesProps) {
  return (
    <div className={multiBackgroundImagesStyles.container(className)}>
      {images.map((img, i) => (
        <FadeItem key={i}>
          <img
            src={img.src}
            alt={img.alt}
            className={clsx(
              "absolute",
              img.top && `top-[${img.top}]`,
              img.bottom && `bottom-[${img.bottom}]`,
              img.left && `left-[${img.left}]`,
              img.right && `right-[${img.right}]`,
              multiBackgroundImagesStyles.image(img.className)
            )}
          />
        </FadeItem>
      ))}
    </div>
  )
}
