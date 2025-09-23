import FadeIFrame from "@/components/FadeIFrame";
import clsx from "clsx";

type MapProps = {
  src: string;
  locationName: string;
  className?: string;
};

export default function GoogleMap({ src, locationName, className = "" }: MapProps) {
  return (
    <section
      className={clsx(
        "hover:brightness-105 w-full h-full rounded-lg shadow overflow-hidden",
        className
      )}
      aria-label={`Map showing ${locationName} location.`}
    >
      <FadeIFrame src={src} title="Google Map" className="w-full h-full" />
    </section>
  );
}