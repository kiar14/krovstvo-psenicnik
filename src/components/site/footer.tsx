import { Mail, MapPin, Phone } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { services, site } from "@/lib/site"
import { LogoFull } from "./logo"
import { LanguageSwitch } from "./language-switch"

export async function Footer() {
  const t = await getTranslations("footer")
  const ts = await getTranslations("services.items")
  const tn = await getTranslations("nav")

  return (
    <footer className="bg-navy-ink text-on-navy">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 pt-16 pb-10 md:grid-cols-2 md:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <LogoFull tone="white" className="h-auto w-[250px]" />
          <p className="mt-5 max-w-xs">{t("tagline")}</p>
        </div>

        <div>
          <h2 className="font-bold text-white">{t("services")}</h2>
          <ul className="mt-4 space-y-2">
            {services.map(({ key }) => (
              <li key={key}>
                <a href="#storitve" className="transition-colors hover:text-white">
                  {ts(`${key}.title`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-white">{t("contact")}</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-2 transition-colors hover:text-white">
                <Phone className="size-4 text-spruce" aria-hidden="true" />
                <span className="tabular-nums">{tn("phone")}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 break-all transition-colors hover:text-white">
                <Mail className="size-4 shrink-0 text-spruce" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-1 size-4 shrink-0 text-spruce" aria-hidden="true" />
              <span>
                {site.street}
                <br />
                {site.postal} {site.city}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-white">{t("hours")}</h2>
          {/* ASSUMED hours, typical for local trades. Confirm with the client. */}
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 tabular-nums">
            <dt>{t("weekdays")}</dt>
            <dd className="text-white">7:00–16:00</dd>
            <dt>{t("saturday")}</dt>
            <dd className="text-white">{t("byAppointment")}</dd>
            <dt>{t("sunday")}</dt>
            <dd className="text-white">{t("closed")}</dd>
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 py-6 text-sm md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © 2026 {site.name} · {site.street}, {site.postal} {site.city} · ID za DDV {site.vat} · MŠ {site.reg}. {t("rights")}
          </p>
          <LanguageSwitch tone="light" placement="up" align="responsive" />
        </div>
      </div>
    </footer>
  )
}
