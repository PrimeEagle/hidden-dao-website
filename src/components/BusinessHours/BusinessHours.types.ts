export type BusinessHourEntry = { 
  day: string; 
  time: string; 
};

export type BusinessHoursProps = {
  title?: string;
  hours: BusinessHourEntry[];
  hideClosed?: boolean;
  className?: string;
};
