import { FadeImage } from "@/components/FadeImage/FadeImage";
import { multiBackgroundImagesStyles } from "./multiBackgroundImages.styles";
import type { MultiBackgroundImagesProps } from "./multiBackgroundImages.types";

export function MultiBackgroundImages({
  images,
  className = "",
}: MultiBackgroundImagesProps) {
  return (
    <div className={multiBackgroundImagesStyles.container(className)}>
      {images.map((img, i) => (
        <FadeImage
          key={i}
          src={img.src}
          alt={img.alt}
          className={multiBackgroundImagesStyles.image(img.className)}
          top={img.top}
          bottom={img.bottom}
          left={img.left}
          right={img.right}
        />
      ))}
    </div>
  );
}