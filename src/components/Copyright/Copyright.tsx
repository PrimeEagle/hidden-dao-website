import clsx from "clsx";
import { Link } from "@tanstack/react-router"


type CopyrightProps = {
  entity: string;
  className?: string;
  terms?: { label: string; href: string }[];
};

export function Copyright({
  entity,
  className = "",
  terms = [],
}: CopyrightProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className={clsx(
        "mx-auto max-w-7xl px-4 text-center text-sm sm:text-base text-brand-primary space-y-2",
        className
      )}
    >
      <p>
        &copy; {year} {entity}. All rights reserved.
      </p>
      {terms.length > 0 && (
        <nav aria-label="Legal links">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {terms.map((term, i) => (
              <li key={i}>
                <Link
                  to={term.href}
                  className="px-2 py-1 underline hover:text-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-starkAccent rounded text-xs sm:text-sm"
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