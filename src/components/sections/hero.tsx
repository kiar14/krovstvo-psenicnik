import type { CSSProperties } from "react"
import { getImageProps } from "next/image"
import { ArrowRight, Award, CalendarCheck, Layers, Phone } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { site } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { HeroCompare } from "./hero-compare"

const imgClassName = "size-full object-cover object-[72%_center] brightness-[0.9] md:object-[center_60%]"

/** Desktop and phone crops of one photo; `lcp` marks the one the page is judged by. */
function artDirected(desktop: string, mobile: string, alt: string, lcp: boolean) {
  const common = { alt, sizes: "100vw", quality: 70, fetchPriority: lcp ? ("high" as const) : ("low" as const) }
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, src: mobile, width: 1122, height: 1402 })
  const { props } = getImageProps({ ...common, src: desktop, width: 1672, height: 941, loading: lcp ? "eager" : "lazy" })
  return { mobileSrcSet, props }
}

/** Why trust us with the roof: track record, qualification, materials and a fixed plan. */
const proof = [
  { key: "master", Icon: Award },
  { key: "materials", Icon: Layers },
  { key: "upfront", Icon: CalendarCheck },
] as const

const i = (n: number) => ({ "--i": n }) as CSSProperties

export async function Hero() {
  const t = await getTranslations("hero")
  const tt = await getTranslations("trust")
  const tn = await getTranslations("nav")

  const before = artDirected("/media/hero2-before-desktop.webp", "/media/hero2-before-mobile.webp", t("imageAlt"), true)
  const after = artDirected("/media/hero2-after-desktop.webp", "/media/hero2-after-mobile.webp", "", false)

  return (
    <>
      <section
        id="top"
        aria-labelledby="hero-title"
        className="relative isolate -mt-[var(--header-h)] h-svh min-h-[calc(620px+var(--header-h))] overflow-hidden bg-navy-ink md:min-h-[calc(720px+var(--header-h))] md:max-h-[calc(1100px+var(--header-h))]"
      >
        <picture className="absolute inset-0">
          <source media="(max-width: 767px)" srcSet={before.mobileSrcSet} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
          <img {...before.props} className={imgClassName} />
        </picture>
        <HeroCompare
          src={after.props.src}
          srcSet={after.props.srcSet}
          sizes={after.props.sizes}
          mobileSrcSet={after.mobileSrcSet}
          imgClassName={imgClassName}
          labels={{ before: t("before"), after: t("after") }}
        />

        <Reveal
          on="load"
          delay={0.15}
          className="relative z-10 flex h-full flex-col px-5 pt-[calc(var(--header-h)+2.25rem)] pb-6 md:pl-14 lg:pl-20 2xl:pl-28 [text-shadow:0_2px_28px_rgb(0_22_63/0.55),0_1px_3px_rgb(0_22_63/0.35)] sm:px-6 md:justify-center md:pt-[var(--header-h)] md:pb-[var(--trust-h)]"
        >
          <div className="flex h-full max-w-[40rem] flex-col justify-between md:block md:h-auto">
            <h1
              id="hero-title"
              className="font-display-tight text-[clamp(3rem,7vw,5.5rem)] font-extrabold text-white uppercase"
            >
              <span className="mask-line">
                <span data-reveal="mask" style={i(0)} className="block">{t("line1")}</span>
              </span>
              <span className="mask-line">
                <span data-reveal="mask" style={i(1)} className="block">{t("line2")}</span>
              </span>
              <span className="mask-line">
                <span data-reveal="mask" style={i(2)} className="block text-spruce">{t("line3")}</span>
              </span>
            </h1>
            <p data-reveal="rise" style={i(0)} className="mt-6 hidden max-w-[32rem] text-[1.2rem] leading-relaxed font-medium text-white md:block">
              {t("lead")}
            </p>
            <div
              data-reveal="rise"
              style={i(1)}
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
      </section>

      {/* Proof strip: glass over the bottom of the photo from md up (it may grow taller when copy wraps),
          a plain navy band below it on phones */}
      <Reveal
        on="load"
        delay={0.9}
        className="relative z-10 bg-navy-ink md:-mt-[var(--trust-h)] md:bg-navy-ink/85 md:backdrop-blur-md"
      >
        <ul aria-label={tt("label")} className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-8 px-5 py-9 md:min-h-[var(--trust-h)] md:grid-cols-4 md:gap-y-0 md:px-6 md:py-0 lg:px-10">
          <li data-reveal="rise" style={i(0)} className="flex flex-col items-center justify-center px-3 text-center">
            <span className="font-display-tight text-[3rem] leading-none font-extrabold text-spruce tabular-nums">2010</span>
            <span className="mt-2 text-sm text-on-navy">{tt("since")}</span>
          </li>
          {proof.map(({ key, Icon }, n) => (
            <li
              key={key}
              data-reveal="rise"
              style={i(n + 1)}
              className="flex flex-col items-center justify-center px-3 text-center md:my-5 md:border-l md:border-white/12"
            >
              <Icon className="size-6 text-spruce" strokeWidth={1.5} aria-hidden="true" />
              <span className="mt-2.5 text-[1.12rem] leading-tight font-semibold text-white">{tt(`${key}.title`)}</span>
              <span className="mt-1 text-sm leading-snug text-on-navy">{tt(`${key}.text`)}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </>
  )
}
