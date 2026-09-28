"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { Menu, Phone, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "cn"
import { site } from "@/lib/site"
import { Logo } from "./logo"
import { LanguageSwitch } from "./language-switch"

const links = [
  { href: "#storitve", key: "services" },
  { href: "#reference", key: "references" },
  { href: "#o-nas", key: "about" },
  { href: "#povprasevanje", key: "contact" },
] as const

export function Header() {
  const t = useTranslations("nav")
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  // Solid once the top sentinel leaves the viewport. One observer, no scroll listener.
  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel")
    if (!sentinel) return
    const io = new IntersectionObserver(([entry]) => setSolid(!entry.isIntersecting))
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, lenis])

  const light = !solid

  return (
    <>
      <a
        href="#vsebina"
        className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-md bg-terracotta px-4 py-2 font-bold text-white focus:translate-y-0"
      >
        {t("skip")}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height] duration-500 ease-(--ease-out-expo)",
          solid ? "h-16 bg-paper shadow-[0_1px_0_var(--color-hairline),0_8px_24px_-16px_rgb(0_22_63/0.35)]" : "h-20 bg-transparent",
        )}
      >
        <div className="mx-auto flex h-full max-w-[1320px] items-center gap-6 px-5 md:px-8">
          <a href="#top" aria-label={t("home")} className="shrink-0">
            <Logo tone={light ? "white" : "color"} className={cn("h-auto transition-[width] duration-500", solid ? "w-[150px]" : "w-[172px] md:w-[196px]")} />
          </a>

          <nav aria-label="Glavna" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-[0.98rem] font-bold transition-colors",
                      light ? "text-white/90 hover:text-white" : "text-graphite hover:text-navy",
                    )}
                  >
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitch tone={light ? "light" : "dark"} className="ml-auto hidden md:flex lg:ml-2" />

          <a
            href={site.phoneHref}
            className="hidden h-11 items-center gap-2 rounded-lg bg-terracotta px-4 font-bold text-white shadow-[0_6px_16px_-8px_rgb(186_50_1/0.8)] transition-colors hover:bg-terracotta-deep md:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {t("phone")}
          </a>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <a
              href={site.phoneHref}
              aria-label={`${t("call")}: ${t("phone")}`}
              className="inline-flex size-11 items-center justify-center rounded-full bg-terracotta text-white"
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full border",
                light ? "border-white/40 text-white" : "border-hairline text-navy",
              )}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("menu")}
            aria-expanded={open}
            className={cn(
              "hidden size-11 items-center justify-center rounded-full border md:inline-flex lg:hidden",
              light ? "border-white/40 text-white" : "border-hairline text-navy",
            )}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            className="fixed inset-0 z-[60] flex flex-col bg-navy text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-20 items-center justify-between px-5">
              <Logo tone="white" className="h-auto w-[172px]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/40"
                autoFocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display-tight py-2 text-6xl font-extrabold uppercase"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t(l.key)}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-white/15 px-6 py-5">
              <LanguageSwitch tone="light" />
              <a href={site.phoneHref} className="inline-flex items-center gap-2 font-bold">
                <Phone className="size-4 text-spruce" aria-hidden="true" />
                {t("phone")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
