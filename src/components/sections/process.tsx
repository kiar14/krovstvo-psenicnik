import { getTranslations } from "next-intl/server"
import { Reveal } from "@/components/motion/reveal"

const steps = ["1", "2", "3", "4"] as const

export async function Process() {
  const t = await getTranslations("process")

  return (
    <section aria-labelledby="postopek-title" className="bg-paper py-24 md:py-32">
      <Reveal className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="text-center">
          {/* Label layout requested to match the client's reference */}
          <p data-reveal="rise" className="flex items-center justify-center gap-4 text-sm font-bold tracking-[0.2em] text-slate uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-terracotta" />
            {t("eyebrow")}
            <span aria-hidden="true" className="h-px w-8 bg-terracotta" />
          </p>
          <h2
            id="postopek-title"
            className="font-display-tight mt-5 text-[clamp(2.6rem,5.4vw,4.4rem)] font-extrabold text-graphite uppercase"
          >
            <span className="mask-line">
              <span data-reveal="mask" className="block">{t("title")}</span>
            </span>
          </h2>
        </div>

        <ol className="relative mt-16 grid gap-10 md:mt-20 md:grid-cols-4 md:gap-8">
          {/* Connecting line: horizontal through the badges on desktop, vertical on phones */}
          <span
            aria-hidden="true"
            data-reveal="line"
            className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-hairline md:block"
          />
          <span aria-hidden="true" className="absolute top-7 bottom-7 left-7 w-px bg-hairline md:hidden" />

          {steps.map((n) => (
            <li key={n} className="relative flex gap-6 md:flex-col md:items-center md:gap-0 md:text-center">
              <span
                data-reveal="pop"
                className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-xl bg-terracotta font-bold tracking-wider text-white tabular-nums shadow-[0_8px_18px_-8px_rgb(186_50_1/0.8)]"
              >
                0{n}
              </span>
              <div data-reveal="rise" className="md:mt-8">
                <h3 className="text-[1.3rem] font-bold text-graphite">{t(`steps.${n}.title`)}</h3>
                <p className="mt-2 text-slate md:mx-auto md:max-w-[17rem]">{t(`steps.${n}.text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  )
}
