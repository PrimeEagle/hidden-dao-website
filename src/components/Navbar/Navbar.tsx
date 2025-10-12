import { NavLinks,  NavItem } from "@/components/Navbar/NavLinks";
import { useState, useEffect, useRef } from "react";
import useActiveSection from "@/hooks/useActiveSection";
import clsx from "clsx";

type NavbarProps = {
  className?: string;
  navItems: NavItem[];
};

export function Navbar({ className = "", navItems }: NavbarProps) {
  const { active, clickSet } = useActiveSection(navItems.map((n) => n.id));
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (navRef.current) {
      const height = navRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height}px`
      );
    }
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    clickSet(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className={clsx(
        "fixed inset-x-0 top-0 xl:w-full z-50 bg-brand-primary/70 xl:bg-brand-primary/50 hover:bg-brand-primary/70 backdrop-blur",
        className
      )}
    >
      {" "}
      {/* Mobile: menu button always present by default */}{" "}
      <div className="flex justify-start px-6 py-1 sm:hidden">
        {" "}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-starkAccent rounded p-2"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {" "}
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {" "}
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
            )}{" "}
          </svg>{" "}
        </button>{" "}
      </div>{" "}
      {/* Mobile nav shown when open */}{" "}
      {menuOpen && (
        <NavLinks
          navItems={navItems}
          active={active}
          handleClick={handleClick}
          layoutId="nav-underline-mobile"
          className="flex flex-col items-start gap-4 px-6 py-4 text-sm font-medium text-brand-softAccent sm:hidden"
        />
      )}{" "}
      {/* Desktop nav appears at sm+ */}{" "}
      <NavLinks
        navItems={navItems}
        active={active}
        handleClick={handleClick}
        layoutId="nav-underline"
        className="hidden sm:flex relative mx-auto max-w-5xl justify-center gap-8 px-6 py-4 text-sm font-medium text-brand-softAccent"
      />{" "}
    </nav>
  );
}
