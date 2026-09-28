import { setRequestLocale, getTranslations } from "next-intl/server"
import { site, towns } from "@/lib/site"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Inquiry } from "@/components/sections/inquiry"
import { Process } from "@/components/sections/process"
import { References } from "@/components/sections/references"
import { Brands } from "@/components/sections/brands"
import { About } from "@/components/sections/about"
import { Area } from "@/components/sections/area"
import { Cta } from "@/components/sections/cta"

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations("meta")

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    name: site.name,
    description: t("description"),
    url: site.url,
    telephone: "+386 41 757 179",
    email: site.email,
    image: `${site.url}/og.jpg`,
    foundingDate: "2010",
    vatID: site.vat,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: site.postal,
      addressLocality: site.city,
      addressCountry: "SI",
    },
    areaServed: [...towns.map((name) => ({ "@type": "Place", name })), { "@type": "AdministrativeArea", name: "Kärnten" }],
    // ASSUMED hours; confirm with the client before launch
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "16:00",
      },
    ],
  }

  return (
    <>
      <div id="top-sentinel" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24" />
      <Header />
      <main id="vsebina">
        <Hero />
        <Services />
        <Inquiry />
        <Process />
        <References />
        <Brands />
        <About />
        <Area />
        <Cta />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
