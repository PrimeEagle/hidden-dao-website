import clsx from "clsx";

export const footerStyles = {
  container: (className?: string) =>
    clsx(
      "relative z-10 min-h-40 flex flex-col items-center justify-center",
      className
    ),
  dividerWrapper: "mb-3",
  dividerImage: "w-[1000px]", // keep width intent while allowing Tailwind control
};


