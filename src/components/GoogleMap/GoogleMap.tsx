import { FadeIFrame } from "@/components/FadeIFrame/FadeIFrame";
import { googleMapStyles } from "./googleMap.styles";
import type { GoogleMapProps } from "./googleMap.types";

export function GoogleMap({ src, locationName, className = "" }: GoogleMapProps) {
  return (
    <section
      className={googleMapStyles.container(className)}
      aria-label={`Map showing ${locationName} location.`}
    >
      <FadeIFrame src={src} title="Google Map" className={googleMapStyles.iframe} />
    </section>
  );
}