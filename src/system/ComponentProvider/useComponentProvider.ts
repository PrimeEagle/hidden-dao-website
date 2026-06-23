import { useComponentContext } from "./ComponentProvider"
import type { LibraryComponents } from "./componentProvider.types"

export const useComponentProvider = <K extends keyof LibraryComponents>(
  key: K
): React.ComponentType<React.ComponentProps<LibraryComponents[K]>> | undefined => {
  const { components, defaults } = useComponentContext()
  const override = components?.[key]
  const fallback = defaults?.[key]
  return (override?.component as any) || (fallback as any)
}
