import { useMemo } from "react";
import type { BusinessHourEntry } from "./businessHours.types";

export function useBusinessHours(
  hours: BusinessHourEntry[], 
  hideClosed?: boolean
) {
  const filteredHours = useMemo(() => {
    if (!hideClosed) return hours;
    return hours.filter(entry => entry.time !== "Closed");
  }, [hours, hideClosed]);

  const hasClosedHours = useMemo(() => {
    return hours.some(entry => entry.time === "Closed");
  }, [hours]);

  return {
    filteredHours,
    hasClosedHours,
  };
}
