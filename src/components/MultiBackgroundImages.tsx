import FadeImage from "./FadeImage"

type Position = number | string // e.g. 200, "20%"

type BackgroundImage =
  | { src: string; alt: string; top?: Position; bottom?: never; left?: Position; right?: never }
  | { src: string; alt: string; top?: Position; bottom?: never; right?: Position; left?: never }
  | { src: string; alt: string; bottom?: Position; top?: never; left?: Position; right?: never }
  | { src: string; alt: string; bottom?: Position; top?: never; right?: Position; left?: never }

interface BackgroundLayerProps {
  images: BackgroundImage[]
}



export default function MultiBackgroundImages({ images }: BackgroundLayerProps) {
  return (
    <div className="absolute inset-0 -z-10">
      {images.map((img, i) => {
        const style: React.CSSProperties = {
          top: img.top,
          bottom: img.bottom,
          left: img.left,
          right: img.right,
        }

        return (
          <FadeImage
            key={i}
            src={img.src}
            alt={img.alt}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={style}
          />
        )
      })}
    </div>
  )
}
