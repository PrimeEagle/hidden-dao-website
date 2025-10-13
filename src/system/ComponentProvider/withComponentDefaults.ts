import * as React from "react"

export function withComponentDefaults<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  defaultProps?: Partial<P>
): React.ComponentType<P> {
  const ComponentWithDefaults = (props: P) => {
    return React.createElement(WrappedComponent, {
      ...(defaultProps as P),
      ...props,
    })
  }

  ComponentWithDefaults.displayName = `withComponentDefaults(${
    (WrappedComponent as any).displayName ||
    (WrappedComponent as any).name ||
    "Component"
  })`

  return ComponentWithDefaults
}
