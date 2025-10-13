import React, { createContext, useContext, useMemo } from "react"
import type { ComponentOverrides, LibraryComponents } from "./componentProvider.types"

const ComponentContext = createContext<ComponentOverrides>({})

export const ComponentProvider = ({
  components = {},
  defaults = {},
  children,
}: {
  components?: ComponentOverrides
  defaults?: LibraryComponents
  children: React.ReactNode
}) => {
  const value = useMemo(
    () => ({ components, defaults }),
    [components, defaults]
  )

  return (
    <ComponentContext.Provider value={value as any}>
      {children}
    </ComponentContext.Provider>
  )
}

export const useComponentContext = () =>
  useContext(ComponentContext) as { components: ComponentOverrides; defaults: LibraryComponents }
