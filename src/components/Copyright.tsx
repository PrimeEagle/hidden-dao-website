import clsx from "clsx";

type CopyrightProps = {
  entity: string;
  className?: string;
};

export default function Copyright({ entity, className = "" }: CopyrightProps) {
  const year = new Date().getFullYear();

  return (
    <div
      className={clsx("mx-auto max-w-7xl px-4 text-center text-sm text-brand-primary", {className})}
    >
      <p>
        &copy; {year} {entity}. All rights reserved.
      </p>
    </div>
  );
}