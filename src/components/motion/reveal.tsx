"use client"

import { useRef, type ElementType } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

/**
 * Animates descendants marked with data-reveal:
 *   "rise"  – fades up
 *   "mask"  – slides up from behind its overflow-hidden parent (headline lines)
 *   "line"  – draws from the left (the chalk line)
 *   "pop"   – scales in (badges)
 * Content is rendered visible; the animation only runs with motion allowed.
 */
export function Reveal({
  as: Tag = "div",
  on = "scroll",
  delay = 0,
  className,
  children,
  ...rest
}: {
  as?: ElementType
  on?: "scroll" | "load"
  delay?: number
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = scope.current
      if (!root) return
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          delay,
          paused: on === "scroll",
          defaults: { ease: "expo.out", duration: 1.1 },
        })
        const q = (k: string) => root.querySelectorAll<HTMLElement>(`[data-reveal="${k}"]`)
        const mask = q("mask")
        const rise = q("rise")
        const line = q("line")
        const pop = q("pop")
        if (mask.length) tl.from(mask, { yPercent: 110, stagger: 0.09 }, 0)
        if (line.length) tl.from(line, { scaleX: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }, 0.15)
        if (rise.length) tl.from(rise, { y: 28, autoAlpha: 0, stagger: 0.07 }, 0.1)
        if (pop.length) tl.from(pop, { scale: 0.6, autoAlpha: 0, duration: 0.7, ease: "back.out(1.6)", stagger: 0.1 }, 0.2)

        // Once the lines have slid in, stop clipping so text shadows and accents aren't cut
        tl.eventCallback("onComplete", () => mask.forEach((m) => m.parentElement?.style.setProperty("overflow", "visible")))

        if (on === "scroll") {
          ScrollTrigger.create({ trigger: root, start: "top 82%", once: true, onEnter: () => tl.play() })
        }
      })
      mm.add("(prefers-reduced-motion: reduce)", () => {
        root.querySelectorAll<HTMLElement>('[data-reveal="mask"]').forEach((m) => m.parentElement?.style.setProperty("overflow", "visible"))
      })
    },
    { scope },
  )

  return (
    <Tag ref={scope} className={className} {...rest}>
      {children}
    </Tag>
  )
}
