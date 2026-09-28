import { ArrowRight, Award, CalendarCheck, House, Layers, MapPin, Phone } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { site } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { HeroCompare } from "./hero-compare"

const trustItems = [
  { key: "master", Icon: Award },
  { key: "deadline", Icon: CalendarCheck },
  { key: "since", Icon: House },
  { key: "allInOne", Icon: Layers },
  { key: "austria", Icon: MapPin },
] as const

async function TrustList({ variant }: { variant: "bar" | "grid" }) {
  const t = await getTranslations("trust")
  return (
    <ul
      className={
        variant === "bar"
          ? "mx-auto flex max-w-[1320px] items-stretch justify-between gap-2 px-8"
          : "grid grid-cols-2 gap-x-5 gap-y-6 px-5 py-8"
      }
    >
      {trustItems.map(({ key, Icon }, i) => (
        <li
          key={key}
          data-reveal="rise"
          className={
            variant === "bar"
              ? "flex flex-1 items-center gap-3 py-5 text-white"
              : `flex items-start gap-3 text-white ${i === trustItems.length - 1 ? "col-span-2" : ""}`
          }
        >
          {variant === "bar" && i > 0 && <span aria-hidden="true" className="pitch-rule mr-3 shrink-0 text-white" />}
          <Icon className="size-6 shrink-0 text-spruce" strokeWidth={1.75} aria-hidden="true" />
          <span className="leading-tight">
            <span className="block font-bold">{t(`${key}.title`)}</span>
            <span className="block text-sm text-on-navy">{t(`${key}.text`)}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export async function Hero() {
  const t = await getTranslations("hero")
  const tn = await getTranslations("nav")

  return (
    <>
      <section
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate h-[92svh] min-h-[620px] overflow-hidden bg-navy-ink [--trust-h:84px] md:h-svh md:min-h-[700px] md:max-h-[1100px]"
      >
        <HeroCompare
          labels={{ before: t("before"), after: t("after"), compare: t("compare"), alt: t("imageAlt") }}
        />

        {/* Legibility scrims: top-down on phones, left-to-right on larger screens */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(0_22_63/0.82)_0%,rgb(0_22_63/0.55)_38%,rgb(0_22_63/0)_62%)] md:bg-[linear-gradient(90deg,rgb(0_22_63/0.86)_0%,rgb(0_22_63/0.62)_34%,rgb(0_22_63/0)_62%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(0deg,rgb(0_22_63/0.85),rgb(0_22_63/0))] md:h-56 md:bg-[linear-gradient(0deg,rgb(0_22_63/0.6),rgb(0_22_63/0))]"
        />

        <Reveal
          on="load"
          delay={0.15}
          className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col px-5 pt-24 pb-6 md:justify-center md:px-8 md:pt-16 md:pb-[var(--trust-h)]"
        >
          <div className="flex h-full max-w-[40rem] flex-col justify-between md:block md:h-auto">
            <h1 id="hero-title" className="font-display-tight text-[clamp(2.9rem,7.2vw,5.25rem)] font-extrabold text-white uppercase">
              <span className="mask-line">
                <span data-reveal="mask" className="block">{t("line1")}</span>
              </span>
              <span className="mask-line">
                <span data-reveal="mask" className="block">{t("line2")}</span>
              </span>
              <span className="mask-line">
                <span data-reveal="mask" className="block text-spruce">{t("line3")}</span>
              </span>
            </h1>
            <p data-reveal="rise" className="mt-7 hidden max-w-[31rem] text-lg leading-relaxed text-white/90 md:block">
              {t("lead")}
            </p>
            <div data-reveal="rise" className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3 md:mt-9">
              <a
                href="#povprasevanje"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-terracotta px-6 text-[1.02rem] font-bold text-white shadow-[0_10px_24px_-10px_rgb(186_50_1/0.9)] transition-colors hover:bg-terracotta-deep"
              >
                {t("cta")}
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-navy-ink/30 px-5 text-[1.02rem] font-bold text-white ring-1 ring-white/60 transition-colors ring-inset hover:bg-white hover:text-navy"
              >
                <Phone className="size-5" aria-hidden="true" />
                {tn("phone")}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Trust strip, part of the hero on larger screens */}
        <Reveal on="load" delay={0.9} className="absolute inset-x-0 bottom-0 z-10 hidden h-[var(--trust-h)] bg-navy/95 md:block">
          <TrustList variant="bar" />
        </Reveal>
      </section>

      {/* On phones the trust strip follows the picture */}
      <Reveal className="bg-navy md:hidden">
        <TrustList variant="grid" />
      </Reveal>
    </>
  )
}
