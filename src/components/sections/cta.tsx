import { ArrowRight, Phone } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { site } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"

/** Closing call to action: one dark card with the promise, the inquiry button and the phone number. */
export async function Cta() {
  const t = await getTranslations("cta")
  const tn = await getTranslations("nav")
  return (
    <section aria-labelledby="cta-title" className="bg-paper px-5 py-20 md:px-8 md:py-24">
      <Reveal className="relative mx-auto grid max-w-[1320px] items-center gap-8 overflow-hidden rounded-2xl bg-navy px-6 py-10 text-white ring-1 ring-white/10 sm:px-10 md:py-12 lg:grid-cols-[auto_1fr_auto] lg:gap-10 lg:px-14">
        <svg
          aria-hidden="true"
          viewBox="0 0 600 300"
          className="pointer-events-none absolute -right-24 -bottom-24 w-[34rem] text-white/[0.04]"
        >
          <path d="M20 300 300 20l280 280" fill="none" stroke="currentColor" strokeWidth="34" />
        </svg>

        <span
          data-reveal="pop"
          aria-hidden="true"
          className="hidden size-16 items-center justify-center self-start rounded-full bg-spruce text-navy-ink sm:flex"
        >
          <Phone className="size-7" strokeWidth={1.75} />
        </span>

        <div className="relative">
          <h2 id="cta-title" className="font-display-tight text-[clamp(2.2rem,4.4vw,3.6rem)] font-extrabold uppercase">
            <span className="mask-line">
              <span data-reveal="mask" className="block">{t("title")}</span>
            </span>
          </h2>
          <p data-reveal="rise" className="mt-4 max-w-[36rem] text-lg text-on-navy">
            {t("text")}
          </p>
        </div>

        <div data-reveal="rise" className="relative flex flex-col items-stretch gap-4 sm:items-center">
          <a
            href="#povprasevanje"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-md bg-spruce px-7 text-[1.05rem] font-bold text-navy-ink transition-colors hover:bg-spruce-hover"
          >
            {t("button")}
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center justify-center gap-2 text-[1.1rem] font-bold tabular-nums transition-colors hover:text-spruce"
          >
            <Phone className="size-5 text-spruce" aria-hidden="true" />
            {tn("phone")}
          </a>
        </div>
      </Reveal>
    </section>
  )
}
