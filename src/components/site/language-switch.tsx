"use client"

import { useEffect, useRef, useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cx } from "@/lib/cx"
import { routing, type Locale } from "@/i18n/routing"
import { FlagDE, FlagGB, FlagSI } from "./flags"

const options = [
  { locale: "sl", code: "SL", name: "Slovenščina", Flag: FlagSI },
  { locale: "de", code: "DE", name: "Deutsch", Flag: FlagDE },
  { locale: "en", code: "EN", name: "English", Flag: FlagGB },
] as const

const hrefFor = (l: Locale) => (l === routing.defaultLocale ? "/" : `/${l}`)

/** The middleware redirects by this cookie, so it has to follow the user's choice (next-intl's Link did this). */
function rememberLocale(l: Locale) {
  document.cookie = `NEXT_LOCALE=${l};path=/;samesite=lax`
}

/**
 * Compact switch: flag + two letters. Tapping it opens a small menu with the other languages.
 * `tone` matches the surface underneath, `placement` opens the menu up (footer) or down (header).
 */
export function LanguageSwitch({
  locale,
  label,
  tone = "dark",
  placement = "down",
  align = "end",
  className,
}: {
  locale: Locale
  /** Accessible name of the toggle, e.g. "Choose language" */
  label: string
  tone?: "light" | "dark"
  placement?: "down" | "up"
  /** Which edge of the button the menu lines up with. "responsive" = start on mobile, end from md up. */
  align?: "start" | "end" | "responsive"
  className?: string
}) {
  const [open, setOpen] = useState(false)
  // The menu is mounted on first open, then kept so it can fade out
  const [used, setUsed] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const current = options.find((o) => o.locale === locale) ?? options[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      setOpen(false)
      // Focus would otherwise stay on a link that is now hidden
      if (root.current?.contains(document.activeElement)) toggle.current?.focus()
    }
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={root} className={cx("relative", className)}>
      <button
        ref={toggle}
        type="button"
        onClick={() => {
          setUsed(true)
          setOpen((v) => !v)
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${label}: ${current.name}`}
        className={cx(
          "inline-flex h-10 items-center gap-1.5 rounded-md px-2 text-[0.98rem] font-bold transition-colors",
          tone === "light" ? "text-white hover:bg-white/10" : "text-graphite hover:bg-graphite/5",
        )}
      >
        <current.Flag className="h-3.5 w-[21px] rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" />
        {current.code}
        <ChevronDown
          className={cx("size-3.5 transition-transform duration-300", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {used && (
        <div
          role="menu"
          data-open={open || undefined}
          className={cx(
            "invisible absolute z-50 min-w-44 overflow-hidden rounded-lg bg-white p-1.5 text-graphite opacity-0 shadow-lift ring-1 ring-black/5",
            "transition-[opacity,translate,visibility] duration-200 ease-(--ease-out-expo) data-open:visible data-open:translate-y-0 data-open:opacity-100 data-open:starting:opacity-0",
            placement === "down"
              ? "top-full mt-2 -translate-y-1.5 data-open:starting:-translate-y-1.5"
              : "bottom-full mb-2 translate-y-1.5 data-open:starting:translate-y-1.5",
            align === "start" && "left-0",
            align === "end" && "right-0",
            align === "responsive" && "left-0 md:right-0 md:left-auto",
          )}
        >
          {options.map(({ locale: l, code, name, Flag }) => {
            const active = l === locale
            return (
              <a
                key={l}
                href={hrefFor(l)}
                hrefLang={l}
                lang={l}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  rememberLocale(l)
                  setOpen(false)
                }}
                className={cx(
                  "flex items-center gap-2.5 rounded-md px-3 py-2 font-semibold transition-colors focus-visible:bg-cement",
                  active ? "bg-cement" : "hover:bg-cement",
                )}
              >
                <Flag className="h-3.5 w-[21px] rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" />
                <span className="w-6 font-bold">{code}</span>
                <span className="flex-1 text-slate">{name}</span>
                {active && <Check className="size-4 text-bronze-ink" aria-hidden="true" />}
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
