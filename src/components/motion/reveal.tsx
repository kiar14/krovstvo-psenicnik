import type { CSSProperties, ElementType } from "react"

/**
 * Marks a group whose descendants with data-reveal animate in (styles in globals.css):
 *   "rise"  – fades up
 *   "mask"  – slides up from behind an invisible line (headline lines)
 *   "line"  – draws from the left (the chalk line)
 *   "pop"   – scales in (badges)
 * on="load" plays straight away in CSS, so it needs no JavaScript. on="scroll" waits for
 * <RevealObserver>. Content is always rendered visible; motion only runs when it's allowed.
 * Within a "load" group, give each element its place in the stagger with style={{ "--i": n }}.
 */
export function Reveal({
  as: Tag = "div",
  on = "scroll",
  delay = 0,
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType
  on?: "scroll" | "load"
  delay?: number
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      data-reveal-root={on}
      className={className}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}s` } as CSSProperties) : style}
      {...rest}
    >
      {children}
    </Tag>
  )
}
