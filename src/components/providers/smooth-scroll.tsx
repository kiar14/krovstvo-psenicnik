"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ReactLenis, useLenis, type LenisRef } from "lenis/react"
import { useReducedMotion } from "motion/react"
import "lenis/dist/lenis.css"

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update)
  return null
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    // Positions shift once the web fonts swap in
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, smoothWheel: !reduced, anchors: { offset: -64 } }}>
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  )
}
