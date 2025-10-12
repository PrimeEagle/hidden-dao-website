import { FadeImage } from "@/components/FadeImage/FadeImage";
import clsx from "clsx";

type PositionValue =
  | "0"
  | "px"
  | "full"
  | "1/2"
  | "1/3"
  | "2/3"
  | "1/4"
  | "3/4"
  | (string & {});

type BackgroundImage = {
  src: string;
  alt: string;
  className?: string;
  top?: PositionValue;
  bottom?: PositionValue;
  left?: PositionValue;
  right?: PositionValue;
};

type MultiBackgroundImagesProps = {
  images: BackgroundImage[];
  className?: string;
};

export function MultiBackgroundImages({
  images,
  className = "",
}: MultiBackgroundImagesProps) {
  return (
    <div className={clsx("absolute inset-0 -z-10", className)}>
      {images.map((img, i) => (
        <FadeImage
          key={i}
          src={img.src}
          alt={img.alt}
          className={clsx("absolute", img.className)}
          top={img.top}
          bottom={img.bottom}
          left={img.left}
          right={img.right}
        />
      ))}
    </div>
  );
}