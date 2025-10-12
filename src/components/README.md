# Component Architecture and Naming Guide

This document defines how all React + TypeScript components are structured and named in this project.  
The goal is consistency, clarity, modularity, and reusability.

---

## Folder Structure

Each top-level component lives in its own folder under:

src/components/[ComponentName]/

A component folder can include the following:

[ComponentName]/
  [ComponentName].tsx           → main component
  components/                   → visual subcomponents only
  hooks/                        → required internal logic or lifecycle hooks
  behaviors/                    → optional or variant behaviors (e.g., animation, autoplay)
  utils/                        → stateless non-React helpers
  types/                        → all TypeScript type definitions
  index.ts                      → barrel export (named exports only)

Use Barrelsby to maintain index.ts files automatically.

---

## Naming Conventions

| Type | Pattern | Example | Notes |
|------|----------|----------|-------|
| Components | PascalCase | ContentSlider.tsx | One per folder |
| Hooks | use[ComponentName][Purpose].ts | useContentSliderController.ts | Describes what the hook does |
| Behaviors | same as hooks | useContentSliderFade.ts, useContentSliderCube.ts | Optional or variant features |
| Utilities | camelCase | calculateOffset.ts | Pure helper functions; no React imports |
| Types | [componentName].types.ts | contentSlider.types.ts | Co-located with component |
| Barrels | index.ts | — | Export named members only (export { Foo } from "./Foo") |

Never use default exports. Named exports ensure consistency and safe refactoring.

---

## Logic Layers

Main Component  
Handles layout, rendering, and prop composition.

Hooks (Required)  
Contain lifecycle or internal logic (e.g., initialization, data flow, state).  
Example: useContentSliderController.ts

Behaviors (Optional)  
Encapsulate features or variants that can be swapped or injected, such as different animation styles or autoplay behavior.

Utilities  
Non-React helpers used for calculations or formatting.

Types  
All interfaces and prop definitions.

---

## Path Aliases

Use alias-based imports instead of relative paths:

import { NavButton } from "@/components/ContentSlider/components/NavButton"

Example configuration in tsconfig.json:

"paths": {
  "@/*": ["src/*"]
}

---

## Styling and Presentation

- TailwindCSS only — no .css or .scss files  
- Responsive and mobile-first classes (sm:, md:, etc.)  
- Accessibility included (aria-*, keyboard navigation, focus-visible rings)  
- Components should support render customization via children or render props  

---

## Example Layout

src/components/
  ContentSlider/
    ContentSlider.tsx
    components/
      ContentCard.tsx
      NavButton.tsx
      PaginationDots.tsx
    hooks/
      useContentSliderController.ts
    behaviors/
      useContentSliderFade.ts
      useContentSliderCube.ts
    utils/
      calculateOffset.ts
    types/
      contentSlider.types.ts
    index.ts

---

## Core Principles

1. One responsibility per file  
2. Named exports only — never default exports  
3. No external CSS files — Tailwind only  
4. SSR-safe code — no direct DOM access outside effects  
5. Accessibility and responsiveness are required for all visual elements  

---

## Summary

This structure ensures each component is:

- Easy to locate and reason about  
- Consistent in naming and imports  
- SSR-safe, accessible, and responsive  
- Simple to extend with optional behaviors
