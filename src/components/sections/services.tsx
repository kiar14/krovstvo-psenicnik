import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { services } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { ServiceLink } from "./service-link"

export async function Services() {
  const t = await getTranslations("services")

  return (
    <section id="storitve" aria-labelledby="storitve-title" className="scroll-mt-20 bg-cement py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <SectionHeading id="storitve-title" title={t("title")} intro={t("intro")} />
        </Reveal>

        <Reveal as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-6">
          {services.map(({ key, image }) => (
            <li key={key} id={`storitev-${key}`} data-reveal="rise" className="scroll-mt-24">
              <ServiceLink
                service={key}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-card transition-[box-shadow,translate] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cement-deep">
                  <Image
                    src={image}
                    alt={t(`items.${key}.title`)}
                    fill
                    quality={70}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-display-tight text-[1.9rem] font-extrabold text-graphite uppercase">
                    {t(`items.${key}.title`)}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="chalk-line mt-3 w-10 origin-left scale-x-50 transition-transform duration-500 ease-(--ease-out-expo) group-hover:scale-x-100"
                  />
                  <p className="mt-4 text-slate">{t(`items.${key}.text`)}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 font-bold text-bronze-ink">
                    {t("ask")}
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </ServiceLink>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
