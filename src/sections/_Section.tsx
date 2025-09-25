import { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  subTitle?: string;
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
};

export default function Section({
  id,
  title = "",
  subTitle = "",
  children,
  fullWidth = false,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`relative py-18 px-4 ${className}`}>
      <div className={fullWidth ? "" : "mx-auto max-w-3xl"}>
        {title.length > 0 || subTitle.length > 0 ? (
          <>
            {title && (
              <h2 className="text-2xl font-body text-left text-brand-accent font-bold [font-variant:small-caps]">
                {title}
              </h2>
            )}
            {subTitle && (
              <h3 className="text-4xl font-heading text-left font-bold text-brand-secondary">
                {subTitle}
              </h3>
            )}
            <div className="mt-1 mb-5">
              <img src="/divider-short.png" width="175" />
            </div>
          </>
        ) : null}
        <div className="text-base text-brand-primary leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
