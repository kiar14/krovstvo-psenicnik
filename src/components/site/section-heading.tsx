import { cn } from "cn"

/** Heading + the spruce chalk line. Place inside a <Reveal> for the line to draw in. */
export function SectionHeading({
  id,
  title,
  intro,
  tone = "dark",
  align = "split",
  className,
}: {
  id: string
  title: string
  intro?: string
  tone?: "dark" | "light"
  align?: "split" | "stack"
  className?: string
}) {
  return (
    <div
      className={cn(
        align === "split" ? "grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-end md:gap-12" : "max-w-3xl",
        className,
      )}
    >
      <div>
        <h2
          id={id}
          className={cn(
            "font-display-tight text-[clamp(2.4rem,5vw,4rem)] font-extrabold uppercase",
            tone === "dark" ? "text-navy" : "text-white",
          )}
        >
          <span className="mask-line">
            <span data-reveal="mask" className="block">
              {title}
            </span>
          </span>
        </h2>
        <span data-reveal="line" aria-hidden="true" className="chalk-line mt-4" />
      </div>
      {intro && (
        <p
          data-reveal="rise"
          className={cn(
            "max-w-[36rem] text-lg leading-relaxed",
            tone === "dark" ? "text-slate" : "text-on-navy",
            align === "stack" && "mt-5",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
