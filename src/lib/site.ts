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

export const brands = [
  "Tondach",
  "Creaton",
  "Bramac",
  "Decra",
  "Prefa",
  "Rheinzink",
  "Braas",
  "Erlus",
  "Jungmeier",
  "Terran",
  "Gerard",
  "Tegola",
  "Eternit",
  "Esal",
] as const

export const towns = ["Libeliče", "Dravograd", "Otiški vrh", "Ravne na Koroškem", "Prevalje", "Vuzenica"] as const
