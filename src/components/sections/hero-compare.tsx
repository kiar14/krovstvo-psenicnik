"use client"

import { useEffect, useRef, useState } from "react"

type Phase = "idle" | "loading" | "play" | "fade" | "done"

/**
 * Old roof → new roof, played once by itself. The "after" photo is fetched only after the page
 * has loaded (the "before" photo is the LCP), decoded off the main thread, then wiped in behind a
 * chalk line that carries small Before / After tags. Everything moves with transforms, so the
 * wipe runs on the compositor. With reduced motion it simply fades in.
 */
export function HeroCompare({
  srcSet,
  mobileSrcSet,
  src,
  sizes,
  imgClassName,
  labels,
}: {
  srcSet?: string
  mobileSrcSet?: string
  src: string
  sizes?: string
  imgClassName: string
  labels: { before: string; after: string }
}) {
  const [phase, setPhase] = useState<Phase>("idle")
  const started = useRef(false)

  useEffect(() => {
    const load = () => setPhase("loading")
    if (document.readyState === "complete") {
      const id = window.setTimeout(load, 0)
      return () => window.clearTimeout(id)
    }
    window.addEventListener("load", load, { once: true })
    return () => window.removeEventListener("load", load)
  }, [])

  const start = async (img: HTMLImageElement) => {
    if (started.current) return
    started.current = true
    await img.decode().catch(() => {})
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Nobody would see the wipe once the hero is mostly scrolled away
    const inView = window.scrollY < window.innerHeight * 0.6
    setPhase(reduce ? "fade" : inView ? "play" : "done")
  }

  if (phase === "idle") return null

  return (
    <div data-phase={phase} className="hero-compare pointer-events-none absolute inset-0">
      <div className="hero-after absolute inset-0 overflow-hidden">
        <picture className="hero-after-inner absolute inset-0">
          {mobileSrcSet && <source media="(max-width: 767px)" srcSet={mobileSrcSet} sizes={sizes} />}
          <img
            ref={(img) => {
              if (img?.complete && img.naturalWidth) void start(img)
            }}
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt=""
            decoding="async"
            fetchPriority="low"
            onLoad={(e) => void start(e.currentTarget)}
            className={imgClassName}
          />
        </picture>
      </div>

      {/* The chalk line with its tags; only visible while it moves */}
      <div aria-hidden="true" className="hero-sweep absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[3px] -translate-x-1/2 bg-spruce shadow-[0_0_24px_4px_rgb(217_168_100/0.55)]" />
        <div className="absolute top-[44%] left-0 w-0 md:top-auto md:bottom-[calc(var(--trust-h)+2.5rem)]">
          <span className="absolute right-4 rounded-full bg-spruce px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] whitespace-nowrap text-navy-ink uppercase shadow-lift">
            {labels.after}
          </span>
          <span className="absolute left-4 rounded-full bg-navy-ink/80 px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] whitespace-nowrap text-white uppercase ring-1 ring-white/25 ring-inset">
            {labels.before}
          </span>
        </div>
      </div>
    </div>
  )
}
