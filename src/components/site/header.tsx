import { ArrowUpRight, Phone } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { services, site } from "@/lib/site"
import { LogoFull } from "./logo"
import { LanguageSwitch } from "./language-switch"
import { MobileMenu, ServicesMenu } from "./header-menus"
import { linkClass } from "./nav-link"

const links = [
  { href: "#reference", key: "references" },
  { href: "#o-nas", key: "about" },
  { href: "#vprasanja", key: "faq" },
  { href: "#povprasevanje", key: "contact" },
] as const

/** Rendered on the server; only the services dropdown, the language switch and the mobile menu hydrate. */
export async function Header() {
  const t = await getTranslations("nav")
  const ts = await getTranslations("services.items")
  const locale = (await getLocale()) as Locale
  const serviceItems = services.map(({ key }) => ({ key, title: ts(`${key}.title`) }))
  const navLinks = links.map((l) => ({ href: l.href, label: t(l.key) }))

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

          <nav aria-label={t("mainNav")} className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              <ServicesMenu label={t("services")} toggleLabel={t("servicesMenu")} items={serviceItems} />
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 justify-self-end sm:gap-2">
            <LanguageSwitch locale={locale} label={t("languageToggle")} className="hidden md:block" />
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
            <MobileMenu
              locale={locale}
              links={[{ href: "#storitve", label: t("services") }, ...navLinks]}
              services={serviceItems}
              labels={{ menu: t("menu"), close: t("close"), phone: t("phone"), language: t("languageToggle") }}
            />
          </div>
        </div>
      </header>
    </>
  )
}
