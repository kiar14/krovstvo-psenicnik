import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { BrandMarquee } from "./brand-marquee"

export async function Brands() {
  const t = await getTranslations("brands")
  return (
    <section aria-labelledby="kritine-title" className="border-t border-hairline bg-cement py-20 md:py-24">
      <Reveal className="mx-auto max-w-[1320px] px-5 md:px-8">
        <SectionHeading id="kritine-title" title={t("title")} intro={t("intro")} />
      </Reveal>
      <div className="mt-12 md:mt-14">
        <BrandMarquee label={t("title")} />
      </div>
    </section>
  )
}
