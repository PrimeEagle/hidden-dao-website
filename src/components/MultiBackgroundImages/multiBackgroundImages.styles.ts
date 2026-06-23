import clsx from "clsx";

export const multiBackgroundImagesStyles = {
  container: (className?: string) => clsx("absolute inset-0 -z-10", className),
  image: (className?: string) => clsx("absolute", className),
};


