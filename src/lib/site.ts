export const site = {
  name: "PŠENIČNIK storitve d.o.o.",
  shortName: "Pšeničnik",
  // Until the domain is connected (B4), canonical and share URLs use the Vercel address
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://www.krovstvo-psenicnik.si"),
  phone: "041 757 179",
  phoneHref: "tel:+38641757179",
  email: "tomo.psenicnik@gmail.com",
  street: "Libeliče 11",
  postal: "2372",
  city: "Libeliče",
  vat: "SI35531428",
  reg: "5205137000",
  youtubeId: "_OUYnEGb5m8",
} as const

export const services = [
  { key: "krovstvo", image: "/media/service-krovstvo.webp" },
  { key: "kleparstvo", image: "/media/service-kleparstvo.webp" },
  { key: "tesarstvo", image: "/media/service-tesarstvo.webp" },
  { key: "stresnaOkna", image: "/media/service-stresna-okna.webp" },
  { key: "strelovodi", image: "/media/service-strelovodi.webp" },
  { key: "visinskaDela", image: "/media/service-visinska-dela.webp" },
] as const

export type ServiceKey = (typeof services)[number]["key"]

/** Reference mosaic, in visual order. `span` drives the desktop grid. */
export const references = [
  { id: "ref-06", span: "big" },
  { id: "ref-09", span: "one" },
  { id: "ref-12", span: "one" },
  { id: "ref-04", span: "one" },
  { id: "ref-08", span: "one" },
  { id: "ref-01", span: "one" },
  { id: "ref-10", span: "one" },
] as const

/** Real brand logos (public/brands). `h` is the display height in px, tuned so they read as equal weight. */
export const brands = [
  { name: "Wienerberger (Tondach)", src: "/brands/wienerberger.svg", w: 644, h: 101, display: 30 },
  { name: "Creaton", src: "/brands/creaton.png", w: 520, h: 146, display: 46 },
  { name: "Braas", src: "/brands/braas.svg", w: 760, h: 340, display: 52 },
  { name: "Prefa", src: "/brands/prefa.png", w: 320, h: 320, display: 66 },
  { name: "Erlus", src: "/brands/erlus.svg", w: 1026, h: 332, display: 42 },
  { name: "Rheinzink", src: "/brands/rheinzink.png", w: 318, h: 56, display: 30 },
  { name: "Eternit", src: "/brands/eternit.svg", w: 336, h: 96, display: 40 },
] as const

export const towns = ["Libeliče", "Dravograd", "Otiški vrh", "Ravne na Koroškem", "Prevalje", "Vuzenica"] as const
