# React Component Library Architecture (2025)

This document defines the **structure, conventions, and customization patterns** for the reusable React + TypeScript component library.  
The architecture is designed around **modularity, composability, and scalable overrides** following principles inspired by *Bulletproof React* and *modern design system architectures (Radix UI, Chakra, Ark UI)*.

---

## 📂 Folder Structure

The library is organized around **self-contained component folders** with flat layouts by default.  
Complex components can include internal subfolders (for hooks, subcomponents, or behaviors).

```
src/
  components/
    Button/
      Button.tsx
      button.types.ts
      button.styles.ts
      useButton.ts
      index.ts
    Modal/
      Modal.tsx
      useModal.ts
      modal.types.ts
      index.ts
    Select/
      components/
        Option.tsx
        ListBox.tsx
        Trigger.tsx
      hooks/
        useSelect.ts
        useOption.ts
      Select.tsx
      select.types.ts
      index.ts
  hooks/
    useOutsideClick.ts
    useFocusRing.ts
  behaviors/
    overlay/
      useOverlayPosition.ts
      useOverlayTrigger.ts
  utils/
    mergeRefs.ts
    isBrowser.ts
  theme/
    tokens.ts
    ThemeProvider.tsx
  system/
    ComponentProvider.tsx
  index.ts
```

### Folder Purpose

| Folder | Description |
|---------|--------------|
| `components/` | Self-contained component modules, flat by default. |
| `hooks/` | Generic, cross-component React hooks. |
| `behaviors/` | Shared behavioral hooks or logic (e.g. overlay, interaction, motion). |
| `utils/` | Non-React helpers and utilities. |
| `theme/` | Design tokens, theme configuration, and theme provider. |
| `system/` | Global system components like `ComponentProvider` for overrides. |

---

## 🧩 Component Structure

Each component folder contains its own logic, styles, and types.  
Keep it **flat unless complexity requires subfolders**.

### Example: Flat component (Button)

```
Button/
├── Button.tsx
├── button.types.ts
├── button.styles.ts
├── useButton.ts
└── index.ts
```

### Example: Complex component (Select)

```
Select/
├── Select.tsx
├── components/
│   ├── Option.tsx
│   ├── ListBox.tsx
│   └── Trigger.tsx
├── hooks/
│   ├── useSelect.ts
│   └── useOption.ts
└── index.ts
```

---

## Naming Conventions

- Pascal Case for .tsx files
- Camel Case for all other files
- type files are always [name of main component in camel case].types.ts


---

## 🧠 Import and Dependency Rules

- Always use **direct imports** (avoid internal `index.ts` barrels).
- Only the **root `index.ts`** acts as the public API for the library.
- Components may import from `hooks/`, `behaviors/`, `utils/`, or `theme/`, but **never from other components**.

Example:
```ts
// ✅ Good
import { useOutsideClick } from "@/hooks/useOutsideClick"

// 🚫 Avoid
import { Modal } from "@/components/Modal"
```

---

## 🎨 Styling

- **TailwindCSS only** — no CSS files or preprocessors.
- Use variant-based APIs (e.g. `variant="primary"`) for consistency.
- Class names should always merge gracefully (`clsx` or `twMerge`).
- Support for app-level overrides via the `ComponentProvider`.

---

## 🧱 ComponentProvider Pattern

The library exports a `ComponentProvider` that allows **global overrides** of internal components (like `Button`, `Link`, `Input`) for full app-level consistency.

### In the Library

```tsx
// system/ComponentProvider.tsx
import React, { createContext, useContext } from "react"
import { Button } from "@/components/Button/Button"

type ComponentOverrides = {
  Button?: React.ComponentType<any>
}

const ComponentContext = createContext<ComponentOverrides>({})

export const ComponentProvider = ({
  components,
  children,
}: {
  components?: ComponentOverrides
  children: React.ReactNode
}) => (
  <ComponentContext.Provider value={components || {}}>
    {children}
  </ComponentContext.Provider>
)

export const useComponents = () => useContext(ComponentContext)
```

### In a Library Component

```tsx
import { useComponents } from "@/system/ComponentProvider"
import { Button as DefaultButton } from "@/components/Button/Button"

export const Modal = ({ onConfirm }: { onConfirm: () => void }) => {
  const { Button: OverrideButton } = useComponents()
  const Button = OverrideButton || DefaultButton
  return <Button onClick={onConfirm}>Confirm</Button>
}
```

### In the Application

```tsx
import { ComponentProvider } from "my-ui-lib"
import { MyBrandButton } from "./MyBrandButton"

<ComponentProvider components={{ Button: MyBrandButton }}>
  <App />
</ComponentProvider>
```

All library buttons — even those rendered inside complex components — automatically use the app’s override.

---

## ⚙️ Theming and Tokens

Themes define base design tokens (colors, spacing, fonts).  
Components consume tokens via Tailwind config or runtime theme context.

Example:
```ts
export const tokens = {
  colors: {
    primary: "var(--color-primary)",
    danger: "var(--color-danger)",
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
  },
}
```

---

## 🔄 Import Aliases

Use path aliases for consistency:

```json
"paths": {
  "@/*": ["src/*"]
}
```

Usage example:

```ts
import { Modal } from "@/components/Modal"
```

---

## ✅ Design Principles

1. **Flat-first, modular structure**
2. **Direct imports only** (avoid barrels except root)
3. **TailwindCSS for styling**
4. **SSR-safe and accessible**
5. **Global overrides via ComponentProvider**
6. **Theming via design tokens**
7. **Type-safe and composable APIs**
