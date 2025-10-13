import { Copyright } from "@/components/Copyright";
import clsx from "clsx";

type FooterProps = {
  entity: string;
  className?: string;
};

export function Footer({ entity, className = "" }: FooterProps) {
  return (
    <footer
      id="site-footer"
      className={clsx(
        "relative z-10 min-h-40 flex flex-col items-center justify-center",
        className
      )}
    >
      <div className="mb-3">
        <img src="/divider-long.png" width="1000" />
      </div>
      <div>
        <Copyright
          entity={`${entity}`}
          terms={[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
          ]}
        />
      </div>
    </footer>
  );
}
