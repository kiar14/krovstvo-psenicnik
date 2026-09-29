"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useLenis } from "lenis/react"
import {
  AppWindow,
  ArrowUpRight,
  ChevronDown,
  Construction,
  Droplets,
  Hammer,
  House,
  Menu,
  Phone,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "cn"
import { services, site } from "@/lib/site"
import { LogoFull } from "./logo"
import { LanguageSwitch } from "./language-switch"

const serviceIcons: Record<string, LucideIcon> = {
  krovstvo: House,
  kleparstvo: Droplets,
  tesarstvo: Hammer,
  stresnaOkna: AppWindow,
  strelovodi: Zap,
  visinskaDela: Construction,
}

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = serviceIcons[name] ?? House
  return <Icon className={className} strokeWidth={1.75} aria-hidden="true" />
}

const links = [
  { href: "#reference", key: "references" },
  { href: "#o-nas", key: "about" },
  { href: "#vprasanja", key: "faq" },
  { href: "#povprasevanje", key: "contact" },
] as const

const linkClass =
  "rounded-md px-3 py-2 text-[1.05rem] font-semibold text-graphite transition-colors hover:bg-graphite/5 hover:text-navy-ink"

/** "Storitve" is its own link; the chevron (or hovering) opens the list of services. */
function ServicesMenu() {
  const t = useTranslations("nav")
  const ts = useTranslations("services.items")
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLLIElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("pointerdown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const show = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120)
  }

  return (
    <li ref={root} className="relative flex items-center" onMouseEnter={show} onMouseLeave={hide}>
      <a href="#storitve" className={cn(linkClass, "pr-1")}>
        {t("services")}
      </a>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="services-menu"
        aria-label={t("servicesMenu")}
        className="inline-flex size-8 items-center justify-center rounded-md text-graphite transition-colors hover:bg-graphite/5"
      >
        <ChevronDown
          className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="services-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 z-50 pt-2"
          >
            <ul className="w-80 rounded-lg bg-white p-1.5 shadow-lift ring-1 ring-black/5">
              {services.map(({ key }) => (
                <li key={key}>
                  <a
                    href={`#storitev-${key}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 rounded-md px-2 py-2 font-semibold text-graphite transition-colors hover:bg-cement"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-navy text-spruce">
                      <ServiceIcon name={key} className="size-[1.1rem]" />
                    </span>
                    <span className="flex-1">{ts(`${key}.title`)}</span>
                    <ArrowUpRight
                      className="size-4 text-bronze-ink opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function Header() {
  const t = useTranslations("nav")
  const ts = useTranslations("services.items")
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, lenis])

  return (
    <>
      <a
        href="#vsebina"
        className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-md bg-spruce px-4 py-2 font-bold text-navy-ink focus:translate-y-0"
      >
        {t("skip")}
      </a>
      <header className="site-header">
        <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 2xl:px-10 xl:grid-cols-[1fr_auto_1fr]">
          <a href="#top" aria-label={t("home")} className="justify-self-start">
            <LogoFull tone="color" className="h-auto w-[168px] sm:w-[184px]" />
          </a>

          <nav aria-label="Glavna" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              <ServicesMenu />
              {links.map((l) => (
                <li key={l.key}>
                  <a href={l.href} className={linkClass}>
                    {t(l.key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 justify-self-end sm:gap-2">
            <LanguageSwitch className="hidden md:block" />
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 px-2 text-[1.02rem] font-bold whitespace-nowrap text-graphite tabular-nums transition-colors hover:text-bronze-ink lg:inline-flex"
            >
              <Phone className="size-4 text-bronze-ink" aria-hidden="true" />
              {t("phone")}
            </a>
            <a
              href="#povprasevanje"
              className="hidden h-10 items-center gap-2 rounded-md bg-spruce px-4 text-[0.98rem] font-bold whitespace-nowrap text-navy-ink transition-colors hover:bg-spruce-hover sm:inline-flex"
            >
              {t("inquiry")}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href={site.phoneHref}
              aria-label={`${t("call")}: ${t("phone")}`}
              className="inline-flex size-10 items-center justify-center rounded-md bg-spruce text-navy-ink lg:hidden"
            >
              <Phone className="size-5" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-md text-graphite ring-1 ring-graphite/15 ring-inset xl:hidden"
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
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy text-white"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
              <LogoFull tone="white" className="h-auto w-[168px]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="inline-flex size-10 items-center justify-center rounded-md ring-1 ring-white/40 ring-inset"
                autoFocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-6 py-8 text-center">
              {[{ href: "#storitve", key: "services" as const }, ...links].map((l, i) => (
                <motion.a
                  key={l.key}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display-tight py-1.5 text-5xl font-extrabold uppercase"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.05,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {t(l.key)}
                </motion.a>
              ))}
              <ul className="mt-5 flex max-w-md flex-wrap justify-center gap-x-4 gap-y-1 text-on-navy">
                {services.map(({ key }) => (
                  <li key={key}>
                    <a
                      href={`#storitev-${key}`}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      <ServiceIcon name={key} className="size-4 text-spruce" />
                      {ts(`${key}.title`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center justify-between border-t border-white/15 px-6 py-4">
              <LanguageSwitch tone="light" placement="up" align="start" />
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
