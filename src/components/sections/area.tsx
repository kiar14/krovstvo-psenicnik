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
      <Reveal className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <SectionHeading id="obmocje-title" title={t("title")} intro={t("intro")} align="left" />
          <ul data-reveal="rise" className="mt-7 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {towns.map((town) => (
              <li key={town} className="flex items-center gap-2 font-bold text-graphite">
                <MapPin className="size-4 text-bronze-ink" aria-hidden="true" />
                {town}
              </li>
            ))}
          </ul>
          <p data-reveal="rise" className="mt-4 text-slate">
            {t("alsoAustria")}
          </p>
          <a
            data-reveal="rise"
            href={`https://www.google.com/maps/search/?api=1&query=${query}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-bold text-bronze-ink underline decoration-bronze-ink/40 hover:decoration-bronze-ink"
          >
            {t("openMap")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <figure data-reveal="rise" className="overflow-hidden rounded-2xl bg-navy p-3 shadow-card md:p-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cement-deep sm:aspect-[16/10]">
            <iframe
              title={t("mapTitle")}
              src={`https://maps.google.com/maps?q=${query}&t=m&z=11&hl=${locale}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
              allowFullScreen
            />
          </div>
        </figure>
      </Reveal>
    </section>
  )
}
