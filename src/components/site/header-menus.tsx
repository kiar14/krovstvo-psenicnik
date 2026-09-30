"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useLenis } from "lenis/react"
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react"
import { cx } from "@/lib/cx"
import { site } from "@/lib/site"
import type { Locale } from "@/i18n/routing"
import { LogoFull } from "./logo"
import { LanguageSwitch } from "./language-switch"
import { linkClass } from "./nav-link"
import { ServiceIcon } from "./service-icon"

type ServiceItem = { key: string; title: string }

/** "Storitve" is its own link; the chevron (or hovering) opens the list of services. */
export function ServicesMenu({
  label,
  toggleLabel,
  items,
}: {
  label: string
  toggleLabel: string
  items: ServiceItem[]
}) {
  const [open, setOpen] = useState(false)
  // The list is mounted on first open, then kept so it can fade out
  const [used, setUsed] = useState(false)
  const root = useRef<HTMLLIElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false)
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

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const show = () => {
    window.clearTimeout(closeTimer.current)
    setUsed(true)
    setOpen(true)
  }
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120)
  }

  return (
    <li
      ref={root}
      className="relative flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      // Tabbing past the last service closes the list
      onBlur={(e) => !root.current?.contains(e.relatedTarget as Node | null) && setOpen(false)}
    >
      <a href="#storitve" className={cx(linkClass, "pr-1")}>
        {label}
      </a>
      <button
        ref={toggle}
        type="button"
        onClick={() => {
          setUsed(true)
          setOpen((v) => !v)
        }}
        aria-expanded={open}
        aria-controls={used ? "services-menu" : undefined}
        aria-label={toggleLabel}
        className="inline-flex size-8 items-center justify-center rounded-md text-graphite transition-colors hover:bg-graphite/5"
      >
        <ChevronDown
          className={cx("size-4 transition-transform duration-300", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {/* Once mounted it stays, so it can fade out; `invisible` keeps it out of the tab order while closed */}
      {used && (
        <div
          id="services-menu"
          data-open={open || undefined}
          className="invisible absolute top-full left-0 z-50 -translate-y-1.5 pt-2 opacity-0 transition-[opacity,translate,visibility] duration-200 ease-(--ease-out-expo) data-open:visible data-open:translate-y-0 data-open:opacity-100 data-open:starting:-translate-y-1.5 data-open:starting:opacity-0"
        >
          <ul className="w-80 rounded-xl bg-white p-1.5 shadow-lift ring-1 ring-black/5">
            {items.map(({ key, title }) => (
              <li key={key}>
                <a
                  href={`#storitev-${key}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 rounded-lg px-2 py-2 font-semibold text-graphite transition-colors hover:bg-cement focus-visible:bg-cement"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-spruce/15 text-bronze-ink ring-1 ring-spruce/25 transition-colors duration-200 ring-inset group-hover:bg-spruce group-hover:text-navy-ink group-hover:ring-spruce group-focus-visible:bg-spruce group-focus-visible:text-navy-ink group-focus-visible:ring-spruce">
                    <ServiceIcon name={key} className="size-[1.1rem]" />
                  </span>
                  <span className="flex-1">{title}</span>
                  <ArrowUpRight
                    className="size-4 -translate-x-1 text-bronze-ink opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

const MENU_MS = 550

/** Full-screen menu below xl. Mounted only while open (or closing), so it adds nothing to the initial DOM. */
export function MobileMenu({
  locale,
  links,
  services,
  labels,
}: {
  locale: Locale
  links: { href: string; label: string }[]
  services: ServiceItem[]
  labels: { menu: string; close: string; phone: string; language: string }
}) {
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed")
  const lenis = useLenis()
  const trigger = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDivElement>(null)
  const timer = useRef<number | undefined>(undefined)
  const mounted = phase !== "closed"

  const close = (returnFocus = true) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setPhase("closing")
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(
      () => {
        setPhase("closed")
        if (returnFocus) trigger.current?.focus()
      },
      reduce ? 0 : MENU_MS,
    )
  }

  useEffect(() => {
    if (!mounted) return
    lenis?.stop()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      // Keep Tab inside the dialog
      if (e.key === "Tab" && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      lenis?.start()
    }
  }, [mounted, lenis])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // A link jumps to its section; the menu closes without stealing focus back
  const onNavigate = () => close(false)

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={() => setPhase("open")}
        aria-label={labels.menu}
        aria-expanded={phase === "open"}
        className="inline-flex size-10 items-center justify-center rounded-md text-graphite ring-1 ring-graphite/15 ring-inset xl:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {/* Portalled: the header's backdrop-filter would otherwise trap position: fixed inside it */}
      {mounted &&
        createPortal(
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={labels.menu}
            data-closing={phase === "closing" || undefined}
            className="mobile-menu fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-navy text-white"
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
              <LogoFull tone="white" className="h-auto w-[168px]" />
              <button
                type="button"
                onClick={() => close()}
                aria-label={labels.close}
                className="inline-flex size-10 items-center justify-center rounded-md ring-1 ring-white/40 ring-inset"
                autoFocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-1 px-6 py-8 text-center">
              {links.map((l, i) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={onNavigate}
                  style={{ animationDelay: `${150 + i * 50}ms` }}
                  className="mobile-menu-link font-display-tight py-1.5 text-5xl font-extrabold uppercase"
                >
                  {l.label}
                </a>
              ))}
              <ul className="mt-5 flex max-w-md flex-wrap justify-center gap-x-4 gap-y-1 text-on-navy">
                {services.map(({ key, title }) => (
                  <li key={key}>
                    <a
                      href={`#storitev-${key}`}
                      onClick={onNavigate}
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      <ServiceIcon name={key} className="size-4 text-spruce" />
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center justify-between border-t border-white/15 px-6 py-4">
              <LanguageSwitch locale={locale} label={labels.language} tone="light" placement="up" align="start" />
              <a href={site.phoneHref} className="inline-flex items-center gap-2 font-bold">
                <Phone className="size-4 text-spruce" aria-hidden="true" />
                {labels.phone}
              </a>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
