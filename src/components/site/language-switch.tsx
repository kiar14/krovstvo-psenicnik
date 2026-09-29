"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, ChevronDown } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { cn } from "cn"
import { Link, usePathname } from "@/i18n/navigation"
import { FlagDE, FlagSI } from "./flags"

const options = [
  { locale: "sl", Flag: FlagSI },
  { locale: "de", Flag: FlagDE },
] as const

/**
 * Shows the current language as a full word. Tapping it opens a small menu to pick the other one.
 * `tone` matches the surface underneath, `placement` opens the menu up (footer) or down (header).
 */
export function LanguageSwitch({
  tone = "light",
  placement = "down",
  className,
}: {
  tone?: "light" | "dark"
  placement?: "down" | "up"
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
          "inline-flex h-11 items-center gap-2 rounded-full px-3.5 text-[1.05rem] font-semibold ring-1 transition-colors ring-inset",
          tone === "light"
            ? "text-white ring-white/35 hover:bg-white/10"
            : "text-graphite ring-graphite/15 hover:bg-graphite/5",
        )}
      >
        <current.Flag className="h-3.5 w-[21px] rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" />
        {t(`languageNames.${current.locale}`)}
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: placement === "down" ? -6 : 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === "down" ? -6 : 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute right-0 z-50 min-w-48 overflow-hidden rounded-xl bg-white/90 p-1.5 text-graphite shadow-lift ring-1 ring-black/5 backdrop-blur-xl",
              placement === "down" ? "top-full mt-2 origin-top-right" : "bottom-full mb-2 origin-bottom-right",
            )}
          >
            {options.map(({ locale: l, Flag }) => {
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
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[1.02rem] font-semibold transition-colors",
                    active ? "bg-cement" : "hover:bg-cement",
                  )}
                >
                  <Flag className="h-3.5 w-[21px] rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" />
                  <span className="flex-1">{t(`languageNames.${l}`)}</span>
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
