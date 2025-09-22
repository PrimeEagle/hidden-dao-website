import FadeImage from "@/components/FadeImage";

type Position = number | string;

type BackgroundImage =
  | { src: string; alt: string; top?: Position; bottom?: never; left?: Position; right?: never }
  | { src: string; alt: string; top?: Position; bottom?: never; right?: Position; left?: never }
  | { src: string; alt: string; bottom?: Position; top?: never; left?: Position; right?: never }
  | { src: string; alt: string; bottom?: Position; top?: never; right?: Position; left?: never };

interface BackgroundLayerProps {
  images: BackgroundImage[];
}

function fmt(v?: Position) {
  if (v === undefined) return "";
  return typeof v === "number" ? `${v}px` : v;
}

export default function MultiBackgroundImages({ images }: BackgroundLayerProps) {
  return (
    <div className="absolute inset-0 -z-10">
      {images.map((img, i) => {
        const classes = [
          "absolute",
          img.top !== undefined ? `top-[${fmt(img.top)}]` : "",
          img.bottom !== undefined ? `bottom-[${fmt(img.bottom)}]` : "",
          img.left !== undefined ? `left-[${fmt(img.left)}]` : "",
          img.right !== undefined ? `right-[${fmt(img.right)}]` : "",
          "-translate-x-1/2",
          "-translate-y-1/2",
          "max-w-full",
        ].join(" ");

        return <FadeImage key={i} src={img.src} alt={img.alt} className={classes} />;
      })}
    </div>
  );
}