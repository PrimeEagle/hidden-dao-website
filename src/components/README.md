
# Component Architecture and Naming Guide (Updated 2025)

This document defines how all React + TypeScript components are structured and named in this project.  
The goal is consistency, clarity, modularity, and reusability.

---

## 📂 Folder Structure

Each top-level component lives in its own folder under:

`src/components/[ComponentName]/`

A component folder can include the following:

```
[ComponentName]/
├── [ComponentName].tsx           → main component
├── components/                   → visual subcomponents only
├── hooks/                        → required internal logic or lifecycle hooks
├── behaviors/                    → optional or variant logic (e.g., animations, autoplay, transitions)
│   ├── [behaviorGroup]/          → folder for related variants (e.g., animations/, transitions/, autoplay/)
│   │   ├── fade.ts
│   │   ├── slide.ts
│   │   ├── zoom.ts
│   │   ├── shift.ts
│   │   └── index.ts              → aggregates all variants into a single strategies object
├── utils/                        → stateless non-React helpers
├── types/                        → all TypeScript type definitions
└── index.ts                      → barrel export (named exports only)
```

Use **Barrelsby** to maintain `index.ts` files automatically.

---

## 🧩 Naming Conventions

| Type | Pattern | Example | Notes |
|------|----------|----------|-------|
| Components | PascalCase | `ContentSlider.tsx` | One per folder |
| Hooks | `use[ComponentName][Purpose].ts` | `useContentSliderController.ts` | Required logic |
| Behaviors | `use[ComponentName][Behavior].ts` | `useContentSliderFade.ts` | Optional or variant logic |
| Variant Behavior Files | `camelCase` filenames | `fade.ts`, `slide.ts`, `zoom.ts` | Each variant lives in its own file |
| Utilities | `camelCase` | `calculateOffset.ts` | Pure helpers, no React imports |
| Types | `[componentName].types.ts` | `contentSlider.types.ts` | All type definitions |
| Barrels | `index.ts` | — | Export **named exports only**, no defaults |

---

## ⚙️ Logic Layers

**Main Component**  
Handles rendering, layout, and prop composition.

**Hooks (Required)**  
Contain lifecycle or internal logic (e.g., state, refs, effects).  
Example: `useContentSliderController.ts`

**Behaviors (Optional)**  
Encapsulate variants or optional features such as autoplay, transitions, or animations.  
Each behavior group (e.g., `animations/`, `autoplay/`, `transitions/`) contains multiple variant files and an aggregator index file.

Example of an aggregator:

```ts
export const animationStrategies = {
  fade,
  slide,
  zoom,
  shift,
}

export const autoplayStrategies = {
  linear,
  pulse,
  reverse,
}
```

---

## 🧠 Variant Selection

Variants can be selected in three ways:

### A. Static (default)
```tsx
<HoverPanel animationType="fade" />
```

### B. Dynamic (user-controlled)
```tsx
const [animation, setAnimation] = useState("slide")
<HoverPanel animationType={animation} />
```

### C. Custom (injected)
```tsx
<HoverPanel
  animationType="fade"
  customAnimation={(el, expanded) => {
    el.style.transition = "all 400ms ease";
    el.style.transform = expanded ? "rotate(0)" : "rotate(-3deg)";
  }}
/>
```

Your hooks (e.g., `usePanelBehavior`) should accept both string keys and custom functions:

```ts
export function usePanelBehavior<T extends keyof typeof animationStrategies>(
  type: T,
  custom?: (el: HTMLElement, active: boolean) => void
)
```

---

## ⚖️ Path Aliases

Always use alias imports instead of relative paths:

```ts
import { NavButton } from "@/components/ContentSlider/components/NavButton"
```

Ensure `tsconfig.json` includes:

```json
"paths": {
  "@/*": ["src/*"]
}
```

---

## 🎨 Styling and Presentation

- **TailwindCSS only** — no `.css` or `.scss` files  
- Responsive, mobile-first design  
- Accessible by default (`aria-*`, keyboard navigation, focus-visible states)  
- Use **render props** or **children** for flexible external rendering  

---

## 🌐 SSR and Accessibility

- Avoid `window`, `document`, or DOM APIs outside effects.  
- Provide `aria` attributes and keyboard navigation.  
- Ensure focus-visible rings and motion-reduced transitions for accessibility.  

---

## 🧱 Core Principles

1. One responsibility per file  
2. Named exports only — never default exports  
3. TailwindCSS for all visual styling  
4. SSR-safe and A11y-compliant  
5. Behavioral modularity — each variant behavior has its own file and aggregator  
6. Components can accept behaviors via props or injected strategy maps  

---

## ✅ Example Layout

```
src/components/
└── HoverPanel/
    ├── HoverPanel.tsx
    ├── components/
    │   └── PanelItem.tsx
    ├── hooks/
    │   ├── useHoverPanelController.ts
    │   └── usePanelAnimation.ts
    ├── behaviors/
    │   ├── panelBehaviors.ts
    │   ├── animations/
    │   │   ├── fade.ts
    │   │   ├── slide.ts
    │   │   ├── zoom.ts
    │   │   ├── shift.ts
    │   │   └── index.ts
    │   └── autoplay/
    │       ├── linear.ts
    │       ├── pulse.ts
    │       ├── reverse.ts
    │       └── index.ts
    ├── types/
    │   └── hoverPanel.types.ts
    ├── utils/
    │   └── calculateOffset.ts
    └── index.ts
```

---

## 🧾 Summary

This structure ensures that each component is:

- Modular and extensible  
- Consistent in naming and imports  
- SSR-compatible and accessible  
- Organized for Barrelsby auto-export  
- Easy to extend with new **behaviors**, **animations**, or **strategy variants**
