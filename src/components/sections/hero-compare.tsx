"use client"

import { useEffect, useRef } from "react"
import { getImageProps } from "next/image"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ChevronsLeftRight } from "lucide-react"
import { cn } from "cn"

gsap.registerPlugin(useGSAP)

type Labels = { before: string; after: string; compare: string; alt: string }

function artDirected(desktop: string, mobile: string, alt: string, lcp: boolean) {
  const common = { alt, sizes: "100vw", quality: 80, fetchPriority: lcp ? ("high" as const) : undefined }
  const {
    props: { srcSet: mobileSet },
  } = getImageProps({ ...common, src: mobile, width: 1122, height: 1402 })
  const { props } = getImageProps({ ...common, src: desktop, width: 1672, height: 941, loading: "eager" })
  return { mobileSet, props }
}

/**
 * Old roof → new roof. The "after" layer is clipped by --reveal (0 = old, 1 = new).
 * On load a chalk line sweeps across once; the Pred/Po switch replays it either way.
 */
export function HeroCompare({ labels }: { labels: Labels }) {
  const scope = useRef<HTMLDivElement>(null)
  const state = useRef({ reveal: 0 })
  const tween = useRef<gsap.core.Tween | null>(null)
  const beforeBtn = useRef<HTMLButtonElement>(null)
  const afterBtn = useRef<HTMLButtonElement>(null)
  const line = useRef<HTMLDivElement>(null)

  const before = artDirected("/media/hero-before-desktop.webp", "/media/hero-before-mobile.webp", labels.alt, true)
  const after = artDirected("/media/hero-after-desktop.webp", "/media/hero-after-mobile.webp", "", false)

  const apply = () => {
    const el = scope.current
    if (!el) return
    const r = state.current.reveal
    el.style.setProperty("--reveal", String(r))
    el.dataset.state = r > 0.5 ? "after" : "before"
    if (line.current) line.current.style.opacity = r > 0.01 && r < 0.99 ? "1" : "0"
    beforeBtn.current?.setAttribute("aria-pressed", String(r <= 0.5))
    afterBtn.current?.setAttribute("aria-pressed", String(r > 0.5))
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        tween.current = gsap.to(state.current, {
          reveal: 1,
          duration: 2.4,
          delay: 1.1,
          ease: "power3.inOut",
          onUpdate: apply,
        })
      })
      mm.add("(prefers-reduced-motion: reduce)", () => {
        state.current.reveal = 1
        apply()
      })
    },
    { scope },
  )

  // Event handler: refs are read on click, not during render
  const go = (to: 0 | 1) => {
    tween.current?.kill()
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    tween.current = gsap.to(state.current, {
      reveal: to,
      duration: reduce ? 0 : 1.4,
      ease: "power3.inOut",
      onUpdate: apply,
    })
  }

  useEffect(() => () => void tween.current?.kill(), [])

  return (
    <div
      ref={scope}
      data-state="before"
      style={{ "--reveal": 0 } as React.CSSProperties}
      className="group/compare absolute inset-0"
    >
      <picture className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet={before.mobileSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
        <img {...before.props} className="size-full object-cover object-[72%_center] md:object-[center_60%]" />
      </picture>

      <picture
        className="absolute inset-0 [clip-path:inset(0_calc((1_-_var(--reveal))_*_100%)_0_0)]"
      >
        <source media="(max-width: 767px)" srcSet={after.mobileSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative duplicate of the image above */}
        <img {...after.props} className="size-full object-cover object-[72%_center] md:object-[center_60%]" />
      </picture>

      {/* The chalk line: visible only while it moves */}
      <div
        ref={line}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[calc(var(--reveal)*100%)] w-0 opacity-0 transition-opacity duration-300"
      >
        <div className="absolute inset-y-0 -left-px w-[3px] bg-spruce shadow-[0_0_24px_4px_rgb(217_168_100/0.55)]" />
        <div className="absolute top-1/2 -left-6 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-spruce text-navy-ink shadow-lift">
          <ChevronsLeftRight className="size-5" />
        </div>
      </div>

      {/* Pred / Po switch */}
      <div
        role="group"
        aria-label={labels.compare}
        className="absolute right-5 bottom-[9.5rem] z-20 sm:bottom-24 flex rounded-full bg-navy-ink/70 p-1 text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur-sm md:right-8 md:bottom-[calc(var(--trust-h)_+_1.5rem)]"
      >
        {(
          [
            [0, labels.before, beforeBtn],
            [1, labels.after, afterBtn],
          ] as const
        ).map(([to, label, ref]) => (
          <button
            key={to}
            ref={ref}
            type="button"
            aria-pressed={to === 0}
            onClick={() => go(to)}
            className={cn(
              "min-w-16 rounded-full px-4 py-2 transition-colors duration-300",
              "aria-pressed:bg-spruce aria-pressed:text-navy-ink",
              "hover:text-white aria-pressed:hover:text-navy-ink",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
