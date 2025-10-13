import clsx from "clsx";

export const googleMapStyles = {
  container: (className?: string) =>
    clsx(
      "hover:brightness-105 w-full h-full rounded-lg shadow overflow-hidden",
      className
    ),
  iframe: "w-full h-full",
};


