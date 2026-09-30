"use client"

import { useEffect } from "react"

const kinds = ["mask", "rise", "line", "pop"] as const

/**
 * One IntersectionObserver for every <Reveal on="scroll"> on the page. Groups that are already on
 * screen when it starts are left alone; the rest are held back ("armed") and play as they scroll in.
 * It only writes attributes and never reads layout, so it causes no forced reflows.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const root = entry.target as HTMLElement
          if (!("armed" in root.dataset)) {
            if (entry.boundingClientRect.top < window.innerHeight) {
              io.unobserve(root)
              continue
            }
            for (const kind of kinds) {
              root
                .querySelectorAll<HTMLElement>(`[data-reveal="${kind}"]`)
                .forEach((el, i) => el.style.setProperty("--i", String(i)))
            }
            root.dataset.armed = ""
          } else if (entry.isIntersecting) {
            root.dataset.in = ""
            io.unobserve(root)
          }
        }
      },
      // Plays once the group's top passes 82% of the viewport height
      { rootMargin: "0px 0px -18% 0px" },
    )
    document.querySelectorAll('[data-reveal-root="scroll"]').forEach((el) => io.observe(el))

    // Tabbing into a group that hasn't played yet shows it at once
    const onFocus = (e: FocusEvent) => {
      const root = (e.target as Element).closest?.<HTMLElement>("[data-reveal-root][data-armed]:not([data-in])")
      if (!root) return
      root.dataset.in = ""
      io.unobserve(root)
    }
    document.addEventListener("focusin", onFocus)
    return () => {
      io.disconnect()
      document.removeEventListener("focusin", onFocus)
    }
  }, [])

  return null
}
