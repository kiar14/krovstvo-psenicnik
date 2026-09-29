"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import { Menu, Phone, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "cn"
import { site } from "@/lib/site"
import { LogoFull } from "./logo"
import { LanguageSwitch } from "./language-switch"

const links = [
  { href: "#storitve", key: "services" },
  { href: "#reference", key: "references" },
  { href: "#o-nas", key: "about" },
  { href: "#vprasanja", key: "faq" },
  { href: "#povprasevanje", key: "contact" },
] as const

export function Header() {
  const t = useTranslations("nav")
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  // Light glass once the top sentinel leaves the viewport. One observer, no scroll listener.
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
        className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-md bg-spruce px-4 py-2 font-bold text-navy-ink focus:translate-y-0"
      >
        {t("skip")}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,height] duration-500 ease-(--ease-out-expo)",
          solid ? "h-[76px] border-graphite/10 bg-paper/75" : "h-[88px] border-white/15 bg-navy-ink/30",
        )}
      >
        <div className="mx-auto grid h-full max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 md:px-8 xl:grid-cols-[1fr_auto_1fr]">
          <a href="#top" aria-label={t("home")} className="justify-self-start">
            <LogoFull
              tone={light ? "white" : "color"}
              className={cn("h-auto transition-[width] duration-500", solid ? "w-[200px] md:w-[230px]" : "w-[210px] md:w-[260px]")}
            />
          </a>

          <nav aria-label="Glavna" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.key}>
                  <a
                    href={l.href}
                    className={cn(
                      "rounded-lg px-3.5 py-2 text-[1.15rem] font-semibold transition-colors",
                      light ? "text-white hover:bg-white/10" : "text-graphite hover:bg-graphite/5",
                    )}
                  >
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5 justify-self-end">
            <LanguageSwitch tone={light ? "light" : "dark"} className="hidden md:block" />
            <a
              href={site.phoneHref}
              className="hidden h-11 items-center gap-2 rounded-full bg-spruce px-5 text-[1.05rem] font-bold text-navy-ink transition-colors hover:bg-spruce-hover md:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              {t("phone")}
            </a>
            <a
              href={site.phoneHref}
              aria-label={`${t("call")}: ${t("phone")}`}
              className="inline-flex size-11 items-center justify-center rounded-full bg-spruce text-navy-ink md:hidden"
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full ring-1 ring-inset xl:hidden",
                light ? "text-white ring-white/40" : "text-graphite ring-graphite/15",
              )}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
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
            <div className="flex h-[88px] items-center justify-between px-5">
              <LogoFull tone="white" className="h-auto w-[200px]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="inline-flex size-11 items-center justify-center rounded-full ring-1 ring-white/40 ring-inset"
                autoFocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-6 text-center">
              {links.map((l, i) => (
                <motion.a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display-tight py-2 text-5xl font-extrabold uppercase sm:text-6xl"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t(l.key)}
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-white/15 px-6 py-5">
              <LanguageSwitch tone="light" placement="up" />
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
