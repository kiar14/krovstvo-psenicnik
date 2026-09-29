import { ArrowRight, Award, CalendarCheck, Layers, MapPin, Phone } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { cn } from "cn"
import { site } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { HeroCompare } from "./hero-compare"

const trustItems = [
  { key: "master", Icon: Award },
  { key: "allInOne", Icon: Layers },
  { key: "deadline", Icon: CalendarCheck },
  { key: "austria", Icon: MapPin },
] as const

/** Trust bar: a big year first, then icon + title + subtitle columns split by hairlines. */
async function TrustList({ variant }: { variant: "bar" | "grid" }) {
  const t = await getTranslations("trust")
  const bar = variant === "bar"
  return (
    <ul
      className={cn(
        bar
          ? "mx-auto grid h-full max-w-[1440px] grid-cols-5 px-6 lg:px-10"
          : "grid grid-cols-2 gap-y-8 px-5 py-9",
      )}
    >
      <li
        data-reveal="rise"
        className={cn(
          "flex flex-col items-center justify-center px-3 text-center",
          !bar && "col-span-2 border-b border-white/10 pb-8",
        )}
      >
        <span className="font-display-tight text-[3rem] leading-none font-extrabold text-spruce tabular-nums">2010</span>
        <span className="mt-2 text-sm text-on-navy">{t("since.caption")}</span>
      </li>
      {trustItems.map(({ key, Icon }) => (
        <li
          key={key}
          data-reveal="rise"
          className={cn(
            "flex flex-col items-center justify-center px-3 text-center",
            bar && "border-l border-white/12 my-5",
          )}
        >
          <Icon className="size-6 text-spruce" strokeWidth={1.5} aria-hidden="true" />
          <span className="mt-2.5 text-[1.12rem] leading-tight font-semibold text-white">{t(`${key}.title`)}</span>
          <span className="mt-1 text-sm leading-snug text-on-navy">{t(`${key}.text`)}</span>
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
        className="relative isolate h-[92svh] min-h-[620px] overflow-hidden bg-navy-ink [--trust-h:136px] md:h-svh md:min-h-[720px] md:max-h-[1100px]"
      >
        <HeroCompare
          labels={{ before: t("before"), after: t("after"), compare: t("compare"), alt: t("imageAlt") }}
        />

        <Reveal
          on="load"
          delay={0.15}
          className="relative z-10 flex h-full flex-col px-5 pt-24 pb-6 md:pl-14 lg:pl-20 2xl:pl-28 [text-shadow:0_2px_28px_rgb(0_22_63/0.55),0_1px_3px_rgb(0_22_63/0.35)] sm:px-6 md:justify-center md:pt-16 md:pb-[var(--trust-h)]"
        >
          <div className="flex h-full max-w-[40rem] flex-col justify-between md:block md:h-auto">
            <h1
              id="hero-title"
              className="font-display-tight text-[clamp(3rem,7vw,5.5rem)] font-extrabold text-white uppercase"
            >
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
            <p data-reveal="rise" className="mt-6 hidden max-w-[32rem] text-[1.2rem] leading-relaxed font-medium text-white md:block">
              {t("lead")}
            </p>
            <div
              data-reveal="rise"
              className="flex flex-col gap-2.5 [text-shadow:none] sm:flex-row sm:flex-wrap sm:gap-3 md:mt-9"
            >
              <a
                href="#povprasevanje"
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-md bg-spruce px-6 text-[1.05rem] font-bold text-navy-ink transition-colors hover:bg-spruce-hover"
              >
                {t("cta")}
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex h-13 items-center justify-center gap-2 rounded-md bg-navy-ink/25 px-5 text-[1.05rem] font-bold text-white ring-1 ring-white/70 backdrop-blur-sm transition-colors ring-inset hover:bg-white hover:text-navy-ink"
              >
                <Phone className="size-5" aria-hidden="true" />
                {tn("phone")}
              </a>
            </div>
          </div>
        </Reveal>

        {/* Trust bar, part of the hero on larger screens */}
        <Reveal
          on="load"
          delay={0.9}
          className="absolute inset-x-0 bottom-0 z-10 hidden h-[var(--trust-h)] bg-navy-ink/85 backdrop-blur-md md:block"
        >
          <TrustList variant="bar" />
        </Reveal>
      </section>

      {/* On phones the trust bar follows the picture */}
      <Reveal className="bg-navy-ink md:hidden">
        <TrustList variant="grid" />
      </Reveal>
    </>
  )
}
