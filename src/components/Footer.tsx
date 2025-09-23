import Copyright from "@/components/Copyright";
import clsx from "clsx";

type FooterProps = {
  entity: string;
  className?: string;
};

export default function Footer({ entity, className = "" }: FooterProps) {
  return (
    <footer
      id="site-footer"
      className={clsx(
        "relative z-10 min-h-40 flex items-center justify-center before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-brand-secondary before:to-transparent",
        className
      )}
    >
      <Copyright
        entity={`${entity}`}
        terms={[
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ]}
      />
    </footer>
  );
}