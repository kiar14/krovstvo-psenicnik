import { getTranslations } from "next-intl/server"
import { BrandMarquee } from "./brand-marquee"

/** A short strip: one line of copy over the drifting brand logos. */
export async function Brands() {
  const t = await getTranslations("brands")
  return (
    <section aria-labelledby="kritine-title" className="border-t border-hairline bg-cement py-12 md:py-14">
      <h2
        id="kritine-title"
        className="px-5 text-center text-sm font-bold tracking-[0.16em] text-bronze-ink uppercase md:text-[0.95rem]"
      >
        {t("title")}
      </h2>
      <div className="mt-6 md:mt-7">
        <BrandMarquee label={t("title")} />
      </div>
    </section>
  )
}
