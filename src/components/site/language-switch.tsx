"use client"

import { useLocale, useTranslations } from "next-intl"
import { cn } from "cn"
import { Link, usePathname } from "@/i18n/navigation"
import { FlagDE, FlagSI } from "./flags"

const options = [
  { locale: "sl", label: "SL", Flag: FlagSI },
  { locale: "de", label: "DE", Flag: FlagDE },
] as const

export function LanguageSwitch({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()
  const t = useTranslations("nav")

  return (
    <nav aria-label={t("language")} className={cn("flex items-center gap-1", className)}>
      {options.map(({ locale: l, label, Flag }) => {
        const active = l === locale
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-sm font-bold tracking-wide transition-colors",
              tone === "light"
                ? active
                  ? "text-white"
                  : "text-white/60 hover:text-white"
                : active
                  ? "text-navy"
                  : "text-slate hover:text-navy",
            )}
          >
            <Flag className={cn("h-3.5 w-[21px] rounded-[2px] shadow-[0_0_0_1px_rgb(0_0_0/0.15)]", !active && "opacity-70")} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
