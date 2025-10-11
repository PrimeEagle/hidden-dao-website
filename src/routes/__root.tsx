/// <reference types="vite/client" />
import React from "react";
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import appCss from "../styles/app.css?url";
import Navbar from "../components/Navbar";
import HeaderCustomContent from "../components/HeaderCustomContent";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
    </div>
  );
}

function RootComponent() {
  const location = useLocation();
  const hideNavbar = ["/privacy", "/terms"].includes(location.pathname);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "styles", label: "Styles" },
    { id: "faq", label: "FAQ" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <RootDocument>
      {!hideNavbar && <Navbar navItems={navItems} />}
      <main className="pt-[var(--navbar-height) w-full max-w-full overflow-x-clip">
        <Outlet />
      </main>
      <Footer entity="Hidden Dao Martial Arts" />
    </RootDocument>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hidden Dao Martial Arts" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <HeaderCustomContent
          googleFonts={[
            { family: "Kaushan Script", preload: false },
            { family: "Quattrocento", weights: [400, 700], preload: true },
            {
              family: "Quattrocento Sans",
              weights: [400, 700],
              axes: [{ name: "ital" }],
              preload: true,
            },
            { family: "Yuji Mai", 
              weights: [400],
              preload: true },
          ]}
          favicon={[
            { type: "image/svg+xml", href: "/favicon.svg" },
            { type: "image/png", href: "/favicon.png" },
          ]}
          meta={[
            {
              name: "description",
              content: "Martial Arts Academy – Discipline, balance, tradition.",
            },
            { property: "og:title", content: "Martial Arts Academy" },
          ]}
        />
      </head>
      <body className="relative min-h-screen bg-white text-gray-900 antialiased">
        <div
          className="absolute inset-0 bg-[url('/xuan.png')] bg-repeat opacity-40 pointer-events-none z-0"
          aria-hidden="true"
        />
        {children}
        <Scripts />
      </body>
    </html>
  );
}
