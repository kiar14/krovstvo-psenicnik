import { cn } from "cn"

/** Centred section title + bronze chalk line + optional intro. Place inside a <Reveal> for the entrance. */
export function SectionHeading({
  id,
  title,
  intro,
  tone = "dark",
  className,
}: {
  id: string
  title: string
  intro?: string
  tone?: "dark" | "light"
  className?: string
}) {
  return (
    <div className={cn("mx-auto flex max-w-3xl flex-col items-center text-center", className)}>
      <h2
        id={id}
        className={cn(
          "font-display-tight text-[clamp(2.4rem,5vw,4rem)] font-extrabold uppercase",
          tone === "dark" ? "text-graphite" : "text-white",
        )}
      >
        <span className="mask-line">
          <span data-reveal="mask" className="block">
            {title}
          </span>
        </span>
      </h2>
      <span data-reveal="line" aria-hidden="true" className="chalk-line mt-5" />
      {intro && (
        <p
          data-reveal="rise"
          className={cn("mt-5 max-w-[40rem] text-lg leading-relaxed", tone === "dark" ? "text-slate" : "text-on-navy")}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
