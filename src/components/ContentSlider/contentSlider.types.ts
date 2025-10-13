import { ReactNode } from "react"

export type ContentSliderProps<T> = {
  className?: string
  data: T[]
  renderItem: (item: T, index: number) => ReactNode
}
