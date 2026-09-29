import { Plus } from "lucide-react"
import { getMessages, getTranslations } from "next-intl/server"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"

type FaqItem = { q: string; a: string }

export async function getFaqItems(): Promise<FaqItem[]> {
  const messages = (await getMessages()) as { faq?: { items?: FaqItem[] } }
  return messages.faq?.items ?? []
}

/** Centred heading over one quiet column of questions divided by hairlines. */
export async function Faq() {
  const t = await getTranslations("faq")
  const items = await getFaqItems()

  return (
    <section id="vprasanja" aria-labelledby="vprasanja-title" className="scroll-mt-20 bg-paper py-20 md:py-28">
      <Reveal className="mx-auto max-w-[1320px] px-5 md:px-8">
        <SectionHeading id="vprasanja-title" title={t("title")} intro={t("intro")} />

        <div className="mx-auto mt-12 max-w-[64rem] border-t border-hairline md:mt-14">
          {items.map((item) => (
            <details key={item.q} data-reveal="rise" name="faq" className="faq-item group border-b border-hairline">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-1 py-5 text-left md:px-4 md:py-6 [&::-webkit-details-marker]:hidden">
                <span className="text-[1.08rem] leading-snug font-semibold text-graphite transition-colors group-hover:text-bronze-ink md:text-[1.15rem]">
                  {item.q}
                </span>
                <Plus
                  className="size-5 shrink-0 text-bronze-ink transition-transform duration-300 group-open:rotate-45"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-[52rem] px-1 pb-6 text-[1.02rem] leading-relaxed text-slate md:px-4">{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
