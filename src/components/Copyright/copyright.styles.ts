import clsx from "clsx";

export const copyrightStyles = {
  footer: (className?: string) => clsx(
    "mx-auto max-w-7xl px-4 text-center text-sm sm:text-base text-brand-primary space-y-2",
    className
  ),
  
  copyrightText: "text-brand-primary",
  
  navList: "flex flex-wrap justify-center gap-x-4 gap-y-1",
  
  navLink: "px-2 py-1 underline hover:text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-starkAccent rounded text-xs sm:text-sm"
};
