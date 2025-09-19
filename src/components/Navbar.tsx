import { motion } from "framer-motion";
import { useActiveSection } from "@/hooks/useActiveSection";
import clsx from "clsx";

type NavItem = {
  id: string;
  label: string;
};

type NavbarProps = {
  className?: string;
  navItems: NavItem[];
};

export default function Navbar({ className = "", navItems }: NavbarProps) {
  const { active, clickSet } = useActiveSection(navItems.map((n) => n.id));

  return (
    <nav
      className={clsx(
        "fixed inset-x-0 top-0 z-50 bg-brand-primary/80 backdrop-blur",
        className
      )}
    >
      <ul className="relative mx-auto flex max-w-5xl justify-center gap-8 px-6 py-4 text-sm font-medium text-brand-softAccent">
        {navItems.map((item) => (
          <li key={item.id} className="relative">
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
                clickSet(item.id);
              }}
              className={
                active === item.id ? "text-brand-light" : "text-brand-light/70"
              }
            >
              {item.label}
            </a>
            {active === item.id && (
              <motion.div
                layoutId="nav-underline"
                className="absolute left-0 right-0 -bottom-1 h-0.5 bg-brand-starkAccent"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}