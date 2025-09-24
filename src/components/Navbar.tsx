import NavLinks, { NavItem } from "@/components/NavLinks";
import { useState, useEffect } from "react";
import useActiveSection from "@/hooks/useActiveSection";
import clsx from "clsx";

type NavbarProps = {
  className?: string;
  navItems: NavItem[];
};

export default function Navbar({ className = "", navItems }: NavbarProps) {
  const { active, clickSet } = useActiveSection(navItems.map((n) => n.id));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    clickSet(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className={clsx(
        "fixed inset-x-0 top-0 z-50 bg-brand-primary/80 backdrop-blur",
        className
      )}
    >
      {/* Desktop nav */}
      <NavLinks
        navItems={navItems}
        active={active}
        handleClick={handleClick}
        layoutId="nav-underline"
        className="hidden sm:flex relative mx-auto max-w-5xl justify-center gap-8 px-6 py-4 text-sm font-medium text-brand-softAccent"
      />

      {/* Mobile menu button */}
      <div className="flex sm:hidden justify-end px-6 py-4">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-starkAccent rounded p-2"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <NavLinks
          navItems={navItems}
          active={active}
          handleClick={handleClick}
          layoutId="nav-underline-mobile"
          className="sm:hidden flex flex-col items-end px-6 gap-4 py-4 text-sm font-medium text-brand-softAccent"
        />
      )}
    </nav>
  );
}