"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { brands } from "@/lib/site"

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {brands.map((b) => (
        <li key={b.name} className="flex h-24 items-center px-10 md:px-14">
          <Image
            src={b.src}
            alt={hidden ? "" : b.name}
            width={b.w}
            height={b.h}
            unoptimized={b.src.endsWith(".svg")}
            sizes="200px"
            style={{ height: b.display, width: "auto" }}
            className="max-w-none select-none"
            draggable={false}
          />
        </li>
      ))}
    </ul>
  )
}

/** One line of real brand logos drifting right to left. Pauses offscreen and on hover. */
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
        className="flex w-max animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center"
      >
        <Row />
        <div className="flex motion-reduce:hidden">
          <Row hidden />
        </div>
      </div>
    </div>
  )
}
