import { ReactNode } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

type SectionProps = {
  id: string;
  title?: string;
  subTitle?: string;
  children: ReactNode;
  fullWidth?: boolean;
  hideBackToTop?: boolean;
  className?: string;
};

export default function Section({
  id,
  title = "",
  subTitle = "",
  children,
  fullWidth = false,
  hideBackToTop = true,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`relative py-18 px-4 ${className}`}>
      <div className={fullWidth ? "" : "mx-auto max-w-3xl"}>
        {title && (
          <h2 className="text-2xl font-body text-left text-brand-accent font-bold [font-variant:small-caps]">
            {title}
          </h2>
        )}
        {subTitle && (
          <h3 className="text-4xl font-heading mb-5 text-left font-bold text-brand-secondary">
            {subTitle}
          </h3>
        )}
        <div className="text-base text-brand-primary leading-relaxed">
          {children}
        </div>
        {hideBackToTop ? (
          ""
        ) : (
          <a href="#hero">
            <MdKeyboardDoubleArrowUp color="#0000FF" size="16px" />
          </a>
        )}
      </div>
    </section>
  );
}