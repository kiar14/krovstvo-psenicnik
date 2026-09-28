"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

/** A still image until clicked; the YouTube player only loads on demand. */
export function YouTubeLite({ id, title, playLabel, poster }: { id: string; title: string; playLabel: string; poster: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 size-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0 text-left" aria-label={`${playLabel}: ${title}`}>
      <Image
        src={poster}
        alt=""
        fill
        quality={70}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_22_63/0.78),rgb(0_22_63/0.2))]" />
      <span className="absolute inset-0 flex items-center gap-5 p-6 md:p-8">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-terracotta text-white shadow-lift transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-110">
          <Play className="ml-1 size-7 fill-current" aria-hidden="true" />
        </span>
        <span className="font-display-tight text-3xl font-extrabold text-white uppercase md:text-4xl">{title}</span>
      </span>
    </button>
  )
}
