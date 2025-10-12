import { ReactNode } from "react";
import clsx from "clsx";

type SectionProps = {
  id: string;
  title?: string;
  subTitle?: string;
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  noPadding?: boolean;
};

export function Section({
  id,
  title = "",
  subTitle = "",
  children,
  fullWidth = false,
  className = "",
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        "relative flex flex-col",
        !noPadding && "py-14 px-4",
        fullWidth ? "w-full" : "mx-auto lg:max-w-4xl xl:max-w-7xl",
        className
      )}
    >
      {title.length > 0 || subTitle.length > 0 ? (
        <>
          {title && (
            <h2 className="text-xl sm:text-2xl font-body text-left text-brand-accent font-bold [font-variant:small-caps]">
              {title}
            </h2>
          )}
          {subTitle && (
            <h3 className="text-3xl sm:text-4xl font-heading text-left font-bold text-brand-secondary">
              {subTitle}
            </h3>
          )}
          <div className="mt-1 mb-5">
            <img src="/divider-short.png" width="175" />
          </div>
        </>
      ) : null}
      {children}
    </section>
  );
}
