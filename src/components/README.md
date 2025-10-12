# Component Architecture and Naming Guide (2025)

This document defines how all React + TypeScript components are structured and named in this project.  
The goal is **consistency, modularity, type safety, and full automation**

---

## 📂 Folder Structure

Each top-level component lives in its own folder:

```
src/components/[ComponentName]/
```

Typical layout:

```
[ComponentName]/
├── [ComponentName].tsx           → main component
├── components/                   → visual subcomponents only
├── hooks/                        → required internal logic or lifecycle hooks
├── behaviors/                    → optional or variant logic (animations, autoplay, transitions)
│   ├── [behaviorGroup]/          → related variants (e.g., animations/, transitions/, autoplay/)
│   │   ├── fade.ts
│   │   ├── slide.ts
│   │   ├── zoom.ts
│   │   └── shift.ts
├── utils/                        → stateless non-React helpers
└── types/                        → TypeScript definitions
```


---

## 🧩 Naming Conventions

| Type | Pattern | Example |
|------|----------|----------|
| Components | PascalCase | `ContentSlider.tsx` |
| Hooks | `use[ComponentName][Purpose].ts` | `useContentSliderController.ts` |
| Behaviors | camelCase | `fade.ts`, `slide.ts`, `zoom.ts`, `shift.ts` |
| Utilities | camelCase | `calculateOffset.ts` |
| Types | `[componentName].types.ts` | `hoverPanel.types.ts` |

Each behavior variant file exports exactly one function or object.  

---

## ⚙️ Logic Layers

**Main Component** — renders layout and composes props  
**Hooks** — required logic or lifecycle (e.g. state, refs, effects)  
**Behaviors** — optional or variant logic grouped by type  
**Utilities** — stateless helpers shared across layers  

---

## 🧠 Variant Selection (Option B Model)

There are **no runtime strategy objects**.  
All behaviors are imported as **namespace maps** using `* as` imports:

```ts
import * as animationStrategies from "@/components/HoverPanel/behaviors/animations";
import * as expansionStrategies from "@/components/HoverPanel/behaviors/expansion";
import * as autoplayStrategies  from "@/components/HoverPanel/behaviors/autoplay";
```

Define variant types directly from those namespaces:

```ts
type AnimationType = keyof typeof animationStrategies;
type ExpansionType = keyof typeof expansionStrategies;
```

Usage examples:

### Static
```tsx
<HoverPanel animationType="fade" />
```

### Dynamic
```tsx
const [animation, setAnimation] = useState("slide");
<HoverPanel animationType={animation} />;
```

### Custom (Injected)
```tsx
<HoverPanel
  animationType="fade"
  customAnimation={(el, expanded) => {
    el.style.transition = "all 400ms ease";
    el.style.transform = expanded ? "rotate(0)" : "rotate(-3deg)";
  }}
/>
```

This maintains full type safety with no runtime maps.

---

## ⚖️ Path Aliases

Always use alias-based imports:

```ts
import { PanelItem } from "@/components/HoverPanel/components";
```

`tsconfig.json`:

```json
"paths": {
  "@/*": ["src/*"]
}
```

---

## 🎨 Styling & Presentation

- TailwindCSS only — no external `.css` or `.scss`
- Mobile-first, responsive layouts
- Accessible by default (`aria-*`, keyboard, focus-visible)
- Flexible composition via children or render props

---

## 🌐 SSR & Accessibility

- No `window` or `document` access outside effects  
- Include ARIA roles and keyboard navigation  
- Respect `prefers-reduced-motion` for transitions  

---

## 🧱 Core Principles

1. Single responsibility per file  
2. **Named exports only** — never default  
3. Tailwind-only styling  
4. SSR-safe and A11y-compliant  
5. Behavioral modularity via per-file variants  
6. Variants imported as namespaces (`import * as`)  
7. Type-driven selection (`keyof typeof namespace`)

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
    │   ├── animations/
    │   │   ├── fade.ts
    │   │   ├── slide.ts
    │   │   ├── zoom.ts
    │   │   ├── shift.ts
    │   │   └── index.ts
    │   ├── expansion/
    │   │   ├── overlay.ts
    │   │   ├── push.ts
    │   │   ├── singleHover.ts
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

This structure ensures every component is:

- Modular and extensible  
- Consistent in naming and imports  
- SSR-compatible and accessible  
- Type-safe and optionally extensible through `import * as` namespace behavior maps
