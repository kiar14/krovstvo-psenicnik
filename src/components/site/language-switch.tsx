"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, ChevronDown } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "cn"
import { Link, usePathname } from "@/i18n/navigation"
import { FlagDE, FlagGB, FlagSI } from "./flags"

const options = [
  { locale: "sl", code: "SL", Flag: FlagSI },
  { locale: "de", code: "DE", Flag: FlagDE },
  { locale: "en", code: "EN", Flag: FlagGB },
] as const

/**
 * Compact switch: flag + two letters. Tapping it opens a small menu with the other languages.
 * `tone` matches the surface underneath, `placement` opens the menu up (footer) or down (header).
 */
export function LanguageSwitch({
  tone = "dark",
  placement = "down",
  align = "end",
  className,
}: {
  tone?: "light" | "dark"
  placement?: "down" | "up"
  /** Which edge of the button the menu lines up with. "responsive" = start on mobile, end from md up. */
  align?: "start" | "end" | "responsive"
  className?: string
}) {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations("nav")
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const current = options.find((o) => o.locale === locale) ?? options[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t("languageToggle")}: ${t(`languageNames.${current.locale}`)}`}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-md px-2 text-[0.98rem] font-bold transition-colors",
          tone === "light" ? "text-white hover:bg-white/10" : "text-graphite hover:bg-graphite/5",
        )}
      >
        <current.Flag className="h-3.5 w-[21px] rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" />
        {current.code}
        <ChevronDown className={cn("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: placement === "down" ? -6 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "down" ? -6 : 6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute z-50 min-w-44 overflow-hidden rounded-lg bg-white p-1.5 text-graphite shadow-lift ring-1 ring-black/5",
              placement === "down" ? "top-full mt-2" : "bottom-full mb-2",
              align === "start" && "left-0",
              align === "end" && "right-0",
              align === "responsive" && "left-0 md:right-0 md:left-auto",
            )}
          >
            {options.map(({ locale: l, code, Flag }) => {
              const active = l === locale
              return (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  hrefLang={l}
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 font-semibold transition-colors",
                    active ? "bg-cement" : "hover:bg-cement",
                  )}
                >
                  <Flag className="h-3.5 w-[21px] rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" />
                  <span className="w-6 font-bold">{code}</span>
                  <span className="flex-1 text-slate">{t(`languageNames.${l}`)}</span>
                  {active && <Check className="size-4 text-bronze-ink" aria-hidden="true" />}
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
