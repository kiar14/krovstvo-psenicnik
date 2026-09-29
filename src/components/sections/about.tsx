import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { getMessages, getTranslations } from "next-intl/server"
import { Reveal } from "@/components/motion/reveal"

/** Photo from a real job with a bronze stamp, beside a two-tone headline, the story and three short proof points. */
export async function About() {
  const t = await getTranslations("about")
  const messages = (await getMessages()) as { about?: { points?: string[] } }
  const points = messages.about?.points ?? []

  return (
    <section id="o-nas" aria-labelledby="o-nas-title" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <Reveal className="mx-auto grid max-w-[1240px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-24">
        <div data-reveal="rise" className="relative mr-3 sm:mr-8 lg:mr-0">
          <div className="relative aspect-[9/10] overflow-hidden rounded-xl bg-cement-deep">
            <Image
              src="/media/about-chimney.jpg"
              alt={t("imageAlt")}
              fill
              quality={80}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="font-display-tight absolute -right-3 bottom-8 max-w-[11.5rem] rounded-md bg-spruce px-6 py-5 text-[1.85rem] font-extrabold text-navy-ink uppercase shadow-card sm:-right-8 sm:max-w-[13rem] sm:text-[2.2rem]">
            {t("stamp")}
          </p>
        </div>

        <div>
          <h2
            id="o-nas-title"
            className="font-display-tight text-[clamp(2.6rem,5vw,4.3rem)] font-extrabold text-graphite uppercase"
          >
            <span className="mask-line">
              <span data-reveal="mask" className="block">
                {t("title")}
              </span>
            </span>
            <span className="mask-line">
              <span data-reveal="mask" className="block text-bronze-strong">
                {t("titleAccent")}
              </span>
            </span>
          </h2>

          <div data-reveal="rise" className="mt-7 max-w-[36rem] space-y-4 text-[1.08rem] leading-relaxed text-slate">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>

          <ol className="mt-8 max-w-[36rem] border-t border-hairline">
            {points.map((point, i) => (
              <li
                key={point}
                data-reveal="rise"
                className="flex items-baseline gap-5 border-b border-hairline py-4 font-semibold text-graphite"
              >
                <span className="w-6 shrink-0 text-sm font-bold text-bronze-ink tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {point}
              </li>
            ))}
          </ol>

          <a
            data-reveal="rise"
            href="#povprasevanje"
            className="group mt-9 inline-flex items-center gap-6 border-b border-bronze-ink pb-2 font-bold text-graphite transition-colors hover:text-bronze-ink"
          >
            {t("link")}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
