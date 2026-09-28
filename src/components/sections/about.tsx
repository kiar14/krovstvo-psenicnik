import { Camera } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { site } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"

export async function About() {
  const t = await getTranslations("about")

  const facts = [
    [t("idCompany"), site.name],
    [t("idAddress"), `${site.street}, ${site.postal} ${site.city}`],
    [t("idLead"), t("idLeadValue")],
    [t("idVat"), site.vat],
    [t("idReg"), site.reg],
  ] as const

  return (
    <section id="o-nas" aria-labelledby="o-nas-title" className="scroll-mt-20 bg-paper py-24 md:py-32">
      <Reveal className="mx-auto grid max-w-[1320px] gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        {/* PLACEHOLDER: replace with a real photo of Tomo and the team (4:5) */}
        <div data-reveal="rise" className="relative mb-10 lg:mb-0">
          <div className="relative flex aspect-[4/3] flex-col items-center justify-center pb-14 sm:aspect-[4/5] sm:pb-0 overflow-hidden rounded-2xl border-2 border-dashed border-spruce bg-[repeating-linear-gradient(-40deg,var(--color-cement)_0_18px,var(--color-cement-deep)_18px_19px)] text-center">
            <Camera className="size-10 text-navy/60" strokeWidth={1.5} aria-hidden="true" />
            <p className="font-display-tight mt-4 text-3xl font-extrabold text-navy uppercase">{t("photoPlaceholder")}</p>
            <p className="mt-1 text-slate">{t("photoNote")}</p>
          </div>
          <div className="absolute -right-2 -bottom-10 flex size-32 sm:-right-3 sm:-bottom-6 sm:size-36 flex-col items-center justify-center rounded-full bg-navy text-center text-white shadow-lift ring-4 ring-paper md:-right-8 md:size-40">
            <svg viewBox="0 0 24 14" className="h-3 w-6 text-spruce" aria-hidden="true">
              <path d="M1 13 12 2l11 11" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
            <span className="font-display-tight mt-2 text-2xl font-extrabold uppercase">{t("badge")}</span>
            <span className="mt-1 text-xs font-bold tracking-[0.12em] text-on-navy uppercase">{t("badgeSub")}</span>
            <span className="mt-1 text-xs font-bold text-spruce">OZS</span>
          </div>
        </div>

        <div className="lg:pt-6">
          <SectionHeading id="o-nas-title" title={t("title")} align="stack" />
          <div data-reveal="rise" className="mt-8 max-w-[38rem] space-y-5 text-lg leading-relaxed text-graphite">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
          </div>

          <div data-reveal="rise" className="mt-10 max-w-[38rem] rounded-xl border border-hairline bg-cement/60 p-6 md:p-7">
            <h3 className="text-sm font-bold tracking-[0.14em] text-slate uppercase">{t("idTitle")}</h3>
            <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-[auto_1fr]">
              {facts.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-slate">{k}</dt>
                  <dd className="font-bold text-graphite tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
