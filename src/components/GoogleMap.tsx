import FadeIFrame from "@/components/FadeIFrame";
import clsx from "clsx";

type MapProps = {
  src: string;
  className?: string;
};

export default function GoogleMap({ src, className = "" }: MapProps) {
  return (
    <div className={clsx("relative mt-8 hover:brightness-105", className)}>
      <FadeIFrame src={src} />
    </div>
  );
}