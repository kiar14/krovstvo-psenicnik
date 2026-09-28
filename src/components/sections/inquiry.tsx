import { ArrowUpRight, Phone } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { site } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { InquiryForm } from "./inquiry-form"

export async function Inquiry() {
  const t = await getTranslations("form")
  const tn = await getTranslations("nav")

  return (
    <section
      id="povprasevanje"
      aria-labelledby="povprasevanje-title"
      className="scroll-mt-16 border-y border-hairline bg-cement-deep py-20 md:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        <Reveal className="grid overflow-hidden rounded-2xl bg-paper shadow-[0_2px_4px_rgb(0_22_63/0.06),0_32px_64px_-32px_rgb(0_22_63/0.35)] ring-1 ring-hairline lg:grid-cols-[38%_1fr]">
          {/* Left: the promise and the phone number */}
          <div className="relative overflow-hidden bg-navy px-7 py-10 text-white md:px-12 md:py-14">
            <svg
              aria-hidden="true"
              viewBox="0 0 400 240"
              className="pointer-events-none absolute -right-16 -bottom-10 w-[26rem] text-white/[0.05]"
            >
              <path d="M10 230 200 20l190 210" fill="none" stroke="currentColor" strokeWidth="26" />
              <path d="M120 230 230 110M160 230 250 130" fill="none" stroke="currentColor" strokeWidth="6" />
            </svg>
            <h2 id="povprasevanje-title" className="font-display-tight relative text-[clamp(2.6rem,4.4vw,3.6rem)] font-extrabold uppercase">
              <span className="mask-line">
                <span data-reveal="mask" className="block">{t("line1")}</span>
              </span>
              <span className="mask-line">
                <span data-reveal="mask" className="block">{t("line2")}</span>
              </span>
              <span className="mask-line">
                <span data-reveal="mask" className="block text-spruce">{t("line3")}</span>
              </span>
            </h2>
            <p data-reveal="rise" className="relative mt-6 max-w-[24rem] text-lg leading-relaxed text-on-navy">
              {t("lead")}
            </p>
            <div data-reveal="rise" className="relative mt-9 border-t border-white/15 pt-8">
              <p className="text-sm font-bold tracking-[0.14em] text-on-navy uppercase">{t("callLabel")}</p>
              <a href={site.phoneHref} className="group mt-3 inline-flex items-center gap-3">
                <Phone className="size-6 text-spruce" strokeWidth={1.75} aria-hidden="true" />
                <span className="font-display-tight text-[2.6rem] font-extrabold tabular-nums group-hover:text-spruce">
                  {tn("phone")}
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 flex items-center gap-2 text-on-navy transition-colors hover:text-white"
              >
                {site.email}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: the form */}
          <div data-reveal="rise" className="px-6 py-10 md:px-12 md:py-14">
            <InquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
