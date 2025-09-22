import { motion, useReducedMotion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import clsx from "clsx";

type NavItem = { id: string; label: string };

type NavbarProps = {
  className?: string;
  navItems: NavItem[];
};

export default function Navbar({ className = "", navItems }: NavbarProps) {
  const { active, clickSet } = useActiveSection(navItems.map((n) => n.id));
  const reduce = useReducedMotion();

  return (
    <nav className={clsx("w-full", className)}>
      <ul className="relative flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.id} className="relative">
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                clickSet(item.id);
              }}
              className={clsx("px-1 py-0.5", active === item.id ? "text-brand-starkAccent" : "text-brand-primary")}
            >
              {item.label}
            </a>
            {active === item.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-0 right-0 -bottom-1 h-0.5 bg-brand-starkAccent"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}