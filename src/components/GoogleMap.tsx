import FadeIFrame from "@/components/FadeIFrame";
import clsx from "clsx";

type MapProps = {
  src: string;
  className?: string;
};

export default function GoogleMap({ src, className = "" }: MapProps) {
  return (
    <div
      className={clsx(
        "hover:brightness-105 w-full h-full rounded-lg shadow overflow-hidden",
        className
      )}
    >
      <FadeIFrame src={src} className="w-full h-full" />
    </div>
  );
}
