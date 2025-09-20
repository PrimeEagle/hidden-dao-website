import clsx from "clsx";

type BusinessHourEntry = { day: string; time: string };

type BusinessHoursProps = {
  title?: string;
  hours: BusinessHourEntry[];
  hideClosed?: boolean;
  className?: string;
};

export default function BusinessHours({
  title = "",
  hours,
  hideClosed,
  className = "",
}: BusinessHoursProps) {
  return (
    <div
      className={clsx(
        "max-w-md mx-auto rounded-xl bg-brand-light shadow",
        className
      )}
    >
      <div className="p-2">
        {title === "" ? "" : (
        <h2 className="text-2xl font-semibold mb-4 text-center text-brand-primary">
          {title}
        </h2>
        )}
        <ul className="divide-y divide-brand-softAccent">
          {hours.map((entry, i) =>
            hideClosed && entry.time === "Closed" ? (
              ""
            ) : (
              <li key={i} className="flex justify-between py-2">
                <span className="font-medium text-brand-primary">
                  {entry.day}
                </span>
                <span
                  className={
                    entry.time === "Closed"
                      ? "text-brand-starkAccent"
                      : "text-brand-primary"
                  }
                >
                  {entry.time}
                </span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}