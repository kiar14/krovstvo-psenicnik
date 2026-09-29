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

        <Reveal
          on="load"
          delay={0.15}
          className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col px-5 pt-28 pb-6 md:justify-center md:px-8 md:pt-20 md:pb-[var(--trust-h)]"
        >
          <div className="flex h-full max-w-[36rem] flex-col justify-between md:block md:h-auto md:rounded-2xl md:bg-navy-ink/40 md:p-10 md:ring-1 md:ring-white/15 md:backdrop-blur-md">
            <h1 id="hero-title" className="font-display-tight rounded-xl bg-navy-ink/40 p-5 text-[clamp(2.7rem,6.4vw,4.6rem)] font-extrabold text-white uppercase ring-1 ring-white/15 backdrop-blur-md md:rounded-none md:bg-transparent md:p-0 md:ring-0 md:backdrop-blur-none">
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
            <p data-reveal="rise" className="mt-6 hidden text-lg leading-relaxed text-white md:block">
              {t("lead")}
            </p>
            <div data-reveal="rise" className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3 md:mt-8">
              <a
                href="#povprasevanje"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-spruce px-6 text-[1.05rem] font-bold text-navy-ink transition-colors hover:bg-spruce-hover"
              >
                {t("cta")}
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-lg bg-white/10 px-5 text-[1.05rem] font-bold text-white ring-1 ring-white/60 backdrop-blur-md transition-colors ring-inset hover:bg-white hover:text-navy-ink"
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
