import { ReactNode } from "react"

type ContentCardProps = {
  children: ReactNode
}

export function ContentCard({ children }: ContentCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-softAccent bg-brand-light p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      {children}
    </div>
  )
}
