import { MapPin } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { towns } from "@/lib/site"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/site/section-heading"

// Rough positions (lon/lat projected onto an 800 × 420 box). A drawn map, not a survey.
const points = {
  Libeliče: { x: 223, y: 118, anchor: "end", dx: -14, dy: -10 },
  Dravograd: { x: 372, y: 213, anchor: "start", dx: 14, dy: -8 },
  "Otiški vrh": { x: 300, y: 250, anchor: "end", dx: -12, dy: 22 },
  "Ravne na Koroškem": { x: 253, y: 348, anchor: "middle", dx: 10, dy: 30 },
  Prevalje: { x: 151, y: 339, anchor: "end", dx: -12, dy: 6 },
  Vuzenica: { x: 688, y: 186, anchor: "middle", dx: 0, dy: -16 },
} as const

export async function Area() {
  const t = await getTranslations("area")

  return (
    <section aria-labelledby="obmocje-title" className="bg-cement py-24 md:py-32">
      <Reveal className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <SectionHeading id="obmocje-title" title={t("title")} intro={t("intro")} align="stack" />
          <ul data-reveal="rise" className="mt-7 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {towns.map((town) => (
              <li key={town} className="flex items-center gap-2 font-bold text-graphite">
                <MapPin className="size-4 text-terracotta" aria-hidden="true" />
                {town}
              </li>
            ))}
          </ul>
          <p data-reveal="rise" className="mt-4 text-slate">
            {t("alsoAustria")}
          </p>
        </div>

        <figure data-reveal="rise" className="hidden overflow-hidden rounded-2xl bg-navy p-5 shadow-card sm:block">
          <svg viewBox="0 0 800 420" role="img" aria-label={`${t("title")}: ${towns.join(", ")}`} className="h-auto w-full">
            <defs>
              <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
                <line x1="0" y1="0" x2="0" y2="10" stroke="rgb(255 255 255 / 0.06)" strokeWidth="2" />
              </pattern>
            </defs>

            {/* Austria, north of the border */}
            <path d="M0 0H800V36L620 44 520 52 430 66 330 70 250 85 200 98 120 105 0 70Z" fill="url(#hatch)" />
            <path
              d="M0 70 120 105 200 98 250 85 330 70 430 66 520 52 620 44 800 36"
              fill="none"
              stroke="rgb(255 255 255 / 0.55)"
              strokeWidth="2"
              strokeDasharray="7 7"
            />
            <text x="24" y="40" fill="rgb(255 255 255 / 0.7)" fontSize="15" fontWeight="700" letterSpacing="3">
              {t("austria").toUpperCase()}
            </text>
            <text x="776" y="396" textAnchor="end" fill="rgb(255 255 255 / 0.45)" fontSize="15" fontWeight="700" letterSpacing="3">
              {t("slovenia").toUpperCase()}
            </text>

            {/* Rivers: Drava, Meža, Mislinja */}
            <g fill="none" stroke="#7d9be0" strokeLinecap="round" opacity="0.7">
              <path d="M150-10C200 40 240 70 280 120S350 200 372 213 520 205 600 195 690 180 820 200" strokeWidth="5" />
              <path d="M40 430C100 380 140 345 151 339S230 350 253 348 300 310 330 270 360 230 372 213" strokeWidth="3" />
              <path d="M430 430C405 330 385 260 372 213" strokeWidth="3" />
            </g>

            {/* Towns */}
            {Object.entries(points).map(([name, p]) =>
              name === "Libeliče" ? null : (
                <g key={name}>
                  <circle cx={p.x} cy={p.y} r="7" fill="#fff" stroke="#002d8a" strokeWidth="3" />
                  <text
                    x={p.x + p.dx}
                    y={p.y + p.dy}
                    textAnchor={p.anchor}
                    fill="#fff"
                    fontSize="19"
                    fontWeight="700"
                    dominantBaseline="middle"
                  >
                    {name}
                  </text>
                </g>
              ),
            )}

            {/* Home base */}
            <g transform={`translate(${points.Libeliče.x} ${points.Libeliče.y})`}>
              <circle r="30" fill="#ba3201" opacity="0.22" />
              <circle r="17" fill="#ba3201" />
              <path d="M-9 5 0-5 9 5" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
              <text x="-26" y="2" textAnchor="end" fill="#fff" fontSize="21" fontWeight="800">
                Libeliče
              </text>
              <text x="-26" y="22" textAnchor="end" fill="#d9a864" fontSize="14" fontWeight="700">
                {t("base")}
              </text>
            </g>
          </svg>
        </figure>
      </Reveal>
    </section>
  )
}
