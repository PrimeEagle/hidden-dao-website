import { FadeItem } from "@/components/FadeItem";
import { googleMapStyles } from "./googleMap.styles";
import type { GoogleMapProps } from "./googleMap.types";

export function GoogleMap({
  src,
  locationName,
  className = "",
}: GoogleMapProps) {
  return (
    <section
      className={googleMapStyles.container(className)}
      aria-label={`Map showing ${locationName} location.`}
    >
      <FadeItem>
        <iframe
          src={src}
          title="Google Map"
          className={googleMapStyles.iframe}
        />
      </FadeItem>
    </section>
  );
}
