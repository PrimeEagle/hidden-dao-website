export type LibraryComponents = Record<string, React.ComponentType<any>>

export type ComponentOverrides = {
  [K in keyof LibraryComponents]?: {
    component?: React.ComponentType<React.ComponentProps<LibraryComponents[K]>>
    defaultProps?: Partial<React.ComponentProps<LibraryComponents[K]>>
  }
}
