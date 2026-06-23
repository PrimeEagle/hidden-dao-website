import { Copyright } from "@/components/Copyright/Copyright";
import { footerStyles } from "./footer.styles";
import type { FooterProps } from "./footer.types";

export function Footer({ entity, className = "" }: FooterProps) {
  return (
    <footer id="site-footer" className={footerStyles.container(className)}>
      <div className={footerStyles.dividerWrapper}>
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
