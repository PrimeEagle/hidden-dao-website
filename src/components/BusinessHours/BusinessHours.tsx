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
        "max-w-md mx-auto rounded-xl bg-brand-light p-2 shadow",
        className
      )}
    >
      <div className="p-2">
        {title === "" ? (
          <h2 className="sr-only">Business Hours</h2>
        ) : (
          <h2 className="text-2xl font-semibold mb-4 text-center text-brand-primary">
            {title}
          </h2>
        )}
        <dl className="divide-y divide-brand-softAccent" aria-label="Business hours">
          {hours.map((entry, i) =>
            hideClosed && entry.time === "Closed" ? null : (
              <div key={i} className="flex justify-between py-3 sm:py-4">
                <dt className="font-medium text-base sm:text-lg text-brand-primary">
                  {entry.day}
                </dt>
                <dd
                  className={clsx(
                    "text-base sm:text-lg",
                    entry.time === "Closed"
                      ? "text-brand-starkAccent"
                      : "text-brand-primary"
                  )}
                >
                  {entry.time}
                </dd>
              </div>
            )
          )}
        </dl>
      </div>
    </div>
  );
}