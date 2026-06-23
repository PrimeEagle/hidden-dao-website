import { Link } from "@tanstack/react-router";
import { copyrightStyles } from "./copyright.styles";
import { useCopyright } from "./useCopyright";
import type { CopyrightProps } from "./copyright.types";

export function Copyright({
  entity,
  className = "",
  terms = [],
}: CopyrightProps) {
  const { copyrightText, hasTerms } = useCopyright({ entity, terms });

  return (
    <footer
      role="contentinfo"
      className={copyrightStyles.footer(className)}
    >
      <p className={copyrightStyles.copyrightText}>
        {copyrightText}
      </p>
      {hasTerms && (
        <nav aria-label="Legal links">
          <ul className={copyrightStyles.navList}>
            {terms.map((term, i) => (
              <li key={i}>
                <Link
                  to={term.href}
                  className={copyrightStyles.navLink}
                >
                  {term.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </footer>
  );
}