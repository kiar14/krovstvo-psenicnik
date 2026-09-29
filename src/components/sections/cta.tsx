import { ArrowRight, Phone } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { site } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"

export async function Cta() {
  const t = await getTranslations("cta")
  const tn = await getTranslations("nav")
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 600 300"
        className="pointer-events-none absolute -top-10 left-1/2 w-[46rem] -translate-x-1/2 text-white/[0.05]"
      >
        <path d="M20 300 300 20l280 280" fill="none" stroke="currentColor" strokeWidth="34" />
      </svg>
      <Reveal className="relative mx-auto flex max-w-[1320px] flex-col items-center px-5 py-16 text-center md:px-8 md:py-20">
        <h2 id="cta-title" className="font-display-tight text-[clamp(2.4rem,5vw,4rem)] font-extrabold uppercase">
          <span className="mask-line">
            <span data-reveal="mask" className="block">{t("title")}</span>
          </span>
        </h2>
        <p data-reveal="rise" className="mt-4 text-lg text-on-navy">
          {t("text")}
        </p>
        <div data-reveal="rise" className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={site.phoneHref}
            className="inline-flex h-13 items-center gap-2 rounded-lg bg-spruce px-6 text-[1.05rem] font-bold text-navy-ink transition-colors hover:bg-spruce-hover"
          >
            <Phone className="size-5" aria-hidden="true" />
            {tn("phone")}
          </a>
          <a
            href="#povprasevanje"
            className="group inline-flex h-13 items-center gap-2 rounded-lg px-6 text-[1.05rem] font-bold ring-1 ring-white/50 transition-colors ring-inset hover:bg-white hover:text-navy-ink"
          >
            {t("button")}
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
