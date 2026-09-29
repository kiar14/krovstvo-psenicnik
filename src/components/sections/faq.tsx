import { Plus } from "lucide-react"
import { getMessages, getTranslations } from "next-intl/server"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"

type FaqItem = { q: string; a: string }

export async function getFaqItems(): Promise<FaqItem[]> {
  const messages = (await getMessages()) as { faq?: { items?: FaqItem[] } }
  return messages.faq?.items ?? []
}

export async function Faq() {
  const t = await getTranslations("faq")
  const items = await getFaqItems()

  return (
    <section id="vprasanja" aria-labelledby="vprasanja-title" className="scroll-mt-20 bg-paper py-24 md:py-32">
      <Reveal className="mx-auto max-w-[1320px] px-5 md:px-8">
        <SectionHeading id="vprasanja-title" title={t("title")} intro={t("intro")} />

        <div className="mx-auto mt-12 max-w-3xl space-y-3 md:mt-14">
          {items.map((item, i) => (
            <details
              key={item.q}
              data-reveal="rise"
              name="faq"
              open={i === 0}
              className="group rounded-xl bg-cement/70 ring-1 ring-hairline transition-colors open:bg-white open:shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-[1.15rem] font-bold text-graphite [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-spruce text-navy-ink transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-5" aria-hidden="true" />
                </span>
              </summary>
              <p className="px-6 pb-6 text-[1.05rem] leading-relaxed text-slate">{item.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
