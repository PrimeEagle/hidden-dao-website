import { businessHoursStyles } from "./BusinessHours.styles";
import { useBusinessHours } from "./useBusinessHours";
import type { BusinessHoursProps } from "./businessHours.types";

export function BusinessHours({
  title = "",
  hours,
  hideClosed,
  className = "",
}: BusinessHoursProps) {
  const { filteredHours } = useBusinessHours(hours, hideClosed);

  return (
    <div className={businessHoursStyles.container(className)}>
      <div className="p-2">
        {title === "" ? (
          <h2 className={businessHoursStyles.title(title)}>Business Hours</h2>
        ) : (
          <h2 className={businessHoursStyles.title(title)}>
            {title}
          </h2>
        )}
        <dl className={businessHoursStyles.hoursList} aria-label="Business hours">
          {filteredHours.map((entry, i) => (
            <div key={i} className={businessHoursStyles.entryContainer}>
              <dt className={businessHoursStyles.dayLabel}>
                {entry.day}
              </dt>
              <dd className={businessHoursStyles.timeValue(entry.time)}>
                {entry.time}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}