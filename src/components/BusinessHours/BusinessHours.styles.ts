import clsx from "clsx";

export const businessHoursStyles = {
  container: (className?: string) => clsx(
    "max-w-md mx-auto rounded-xl bg-brand-light p-2 shadow p-4",
    className
  ),
  
  title: (title: string) => title === "" 
    ? "sr-only" 
    : "text-2xl font-semibold mb-4 text-center text-brand-primary",
  
  dayLabel: "font-medium text-base sm:text-lg text-brand-primary",
  
  timeValue: (time: string) => clsx(
    "text-base sm:text-lg",
    time === "Closed"
      ? "text-brand-starkAccent"
      : "text-brand-primary"
  ),
  
  entryContainer: "flex justify-between py-3 sm:py-4",
  
  hoursList: "divide-y divide-brand-softAccent"
};
