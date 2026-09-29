import { ArrowUpRight, MapPin } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import { site, towns } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"

const query = encodeURIComponent(`${site.street}, ${site.postal} ${site.city}, Slovenija`)

export async function Area() {
  const t = await getTranslations("area")
  const locale = await getLocale()

  return (
    <section aria-labelledby="obmocje-title" className="bg-cement py-24 md:py-32">
      <Reveal className="mx-auto max-w-[1320px] px-5 md:px-8">
        <SectionHeading id="obmocje-title" title={t("title")} intro={t("intro")} />

        <div
          data-reveal="rise"
          className="relative mt-12 aspect-[4/5] overflow-hidden rounded-2xl bg-cement-deep shadow-card ring-1 ring-hairline sm:aspect-[16/9] md:mt-14 lg:aspect-[21/9]"
        >
          <iframe
            title={t("mapTitle")}
            src={`https://maps.google.com/maps?q=${query}&t=m&z=11&hl=${locale}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
            allowFullScreen
          />
        </div>

        <ul data-reveal="rise" className="mt-8 flex flex-wrap justify-center gap-2.5">
          {towns.map((town) => (
            <li
              key={town}
              className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-semibold text-graphite ring-1 ring-hairline"
            >
              <MapPin className="size-4 text-bronze-ink" aria-hidden="true" />
              {town}
            </li>
          ))}
        </ul>
        <p data-reveal="rise" className="mt-5 text-center text-slate">
          {t("alsoAustria")}{" "}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-bronze-ink underline decoration-bronze-ink/40 hover:decoration-bronze-ink"
          >
            {t("openMap")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </p>
      </Reveal>
    </section>
  )
}
