import { motion } from "framer-motion";

export type NavItem = {
  id: string;
  label: string;
};

export default function NavLinks({
  navItems,
  active,
  handleClick,
  layoutId,
  className = "",
}: {
  navItems: NavItem[];
  active: string;
  handleClick: (id: string) => void;
  layoutId: string;
  className?: string;
}) {
  return (
    <ul className={className}>
      {navItems.map((item) => (
        <li key={item.id} className="relative">
          <a
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(item.id);
            }}
            className={
              active === item.id
                ? "text-brand-light"
                : "text-brand-light/70"
            }
          >
            {item.label}
          </a>
          {active === item.id && (
            <motion.div
              layoutId={layoutId}
              className="absolute left-0 right-0 -bottom-1 h-0.5 bg-brand-starkAccent"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </li>
      ))}
    </ul>
  );
}