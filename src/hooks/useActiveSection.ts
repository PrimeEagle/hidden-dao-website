import { useEffect, useState, useRef } from "react"

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0])
  const lastScrollY = useRef(0)
  const lockUntil = useRef(0)

  function clickSet(id: string) {
    setActive(id)
    if (typeof window !== "undefined") {
      lastScrollY.current = window.scrollY
      lockUntil.current = Date.now() + 600 // lock for 600ms
    }
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    lastScrollY.current = window.scrollY

    function onScroll() {
      if (Date.now() < lockUntil.current) return // ⏱ ignore scroll during lock

      const currentY = window.scrollY
      if (currentY === lastScrollY.current) return
      lastScrollY.current = currentY

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.bottom > 0) {
            setActive(id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener("scroll", onScroll)
  }, [sectionIds])

  return { active, clickSet }
}
