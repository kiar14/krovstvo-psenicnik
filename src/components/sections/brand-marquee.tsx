"use client"

import { useEffect, useRef } from "react"
import { brands } from "@/lib/site"

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {brands.map((b) => (
        <li key={b} className="flex items-center">
          <span className="font-display-tight px-8 text-[2.4rem] font-bold whitespace-nowrap text-slate/55 uppercase transition-colors duration-300 hover:text-navy md:px-12 md:text-[2.9rem]">
            {b}
          </span>
          <svg viewBox="0 0 24 14" className="h-3 w-5 text-spruce" aria-hidden="true">
            <path d="M1 13 12 2l11 11" fill="none" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </li>
      ))}
    </ul>
  )
}

/** One line of brand names drifting right to left. Pauses offscreen and on hover. */
export function BrandMarquee({ label }: { label: string }) {
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      el.style.animationPlayState = e.isIntersecting ? "" : "paused"
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      aria-label={label}
      role="region"
      className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div
        ref={track}
        className="flex w-max animate-[marquee_48s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
      >
        <Row />
        <div className="flex motion-reduce:hidden">
          <Row hidden />
        </div>
      </div>
    </div>
  )
}
