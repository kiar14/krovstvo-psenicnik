import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { cn } from "cn"
import { references, site } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"
import { YouTubeLite } from "./youtube-lite"

export async function References() {
  const t = await getTranslations("references")
  const photos = references.slice(0, 5)
  const tail = references.slice(5)

  const Tile = ({ id, big }: { id: string; big?: boolean }) => (
    <li
      data-reveal="rise"
      className={cn(
        "relative overflow-hidden rounded-xl bg-cement-deep",
        big ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3] md:aspect-auto",
      )}
    >
      <figure className="group absolute inset-0">
        <Image
          src={`/media/${id}.jpg`}
          alt={t(`items.${id}` as "items.ref-06")}
          fill
          quality={70}
          sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
          className="object-cover transition-transform duration-700 ease-(--ease-out-expo) group-hover:scale-[1.04]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgb(0_22_63/0.78),rgb(0_22_63/0))] px-4 pt-10 pb-3 text-sm font-bold text-white md:text-[0.95rem]">
          {t(`items.${id}` as "items.ref-06")}
        </figcaption>
      </figure>
    </li>
  )

  return (
    <section id="reference" aria-labelledby="reference-title" className="scroll-mt-20 bg-cement py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <SectionHeading id="reference-title" title={t("title")} intro={t("intro")} />
        </Reveal>

        <Reveal
          as="ul"
          className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:grid-rows-[repeat(3,minmax(0,15.5rem))] md:gap-4"
        >
          {photos.map((p) => (
            <Tile key={p.id} id={p.id} big={p.span === "big"} />
          ))}
          <li data-reveal="rise" className="relative col-span-2 aspect-video overflow-hidden rounded-xl bg-navy md:aspect-auto">
            <YouTubeLite id={site.youtubeId} title={t("video")} playLabel={t("videoPlay")} poster="/media/ref-11.jpg" />
          </li>
          {tail.map((p) => (
            <Tile key={p.id} id={p.id} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
