"use client"

import { useEffect, useState } from "react"
import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setSmooth(!mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  return (
    <ReactLenis root options={{ smoothWheel: smooth, anchors: { offset: -64 } }}>
      {children}
    </ReactLenis>
  )
}
