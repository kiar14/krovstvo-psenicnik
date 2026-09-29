import { Phone, Plus } from "lucide-react"
import { getMessages, getTranslations } from "next-intl/server"
import { site } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"

type FaqItem = { q: string; a: string }

export async function getFaqItems(): Promise<FaqItem[]> {
  const messages = (await getMessages()) as { faq?: { items?: FaqItem[] } }
  return messages.faq?.items ?? []
}

/** Two columns: sticky heading + phone on the left, a numbered hairline list of questions on the right. */
export async function Faq() {
  const t = await getTranslations("faq")
  const tn = await getTranslations("nav")
  const items = await getFaqItems()

  return (
    <section id="vprasanja" aria-labelledby="vprasanja-title" className="scroll-mt-20 bg-paper py-24 md:py-32">
      <Reveal className="mx-auto grid max-w-[1320px] gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="vprasanja-title" title={t("title")} intro={t("intro")} align="left" />
          <div data-reveal="rise" className="mt-10 border-t border-hairline pt-8">
            <p className="text-lg font-bold text-graphite">{t("stillTitle")}</p>
            <p className="mt-1 text-slate">{t("stillText")}</p>
            <a
              href={site.phoneHref}
              className="mt-4 inline-flex items-center gap-2.5 text-[1.35rem] font-bold text-graphite tabular-nums transition-colors hover:text-bronze-ink"
            >
              <Phone className="size-5 text-bronze-ink" aria-hidden="true" />
              {tn("phone")}
            </a>
          </div>
        </div>

        <div className="border-t border-hairline">
          {items.map((item, i) => (
            <details
              key={item.q}
              data-reveal="rise"
              name="faq"
              open={i === 0}
              className="faq-item group border-b border-hairline"
            >
              <summary className="flex cursor-pointer list-none items-baseline gap-5 py-6 text-left [&::-webkit-details-marker]:hidden md:gap-7 md:py-7">
                <span className="font-display-tight w-8 shrink-0 text-[1.35rem] font-extrabold text-bronze-strong tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[1.15rem] leading-snug font-bold text-graphite transition-colors group-hover:text-bronze-ink md:text-[1.3rem]">
                  {item.q}
                </span>
                <Plus
                  className="size-6 shrink-0 self-center text-graphite transition-transform duration-300 group-open:rotate-45"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </summary>
              <p className="pr-10 pb-7 pl-[3.25rem] text-[1.05rem] leading-relaxed text-slate md:pl-[3.75rem]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
