import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Big_Shoulders, Source_Sans_3 } from "next/font/google"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { site } from "@/lib/site"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { RevealObserver } from "@/components/motion/reveal-observer"
import "../globals.css"

/**
 * Runs before first paint: the browser must not restore the old scroll position, and a reload
 * of a URL with #section must not jump down either. First visits to a #section link still jump.
 */
const startAtTop = `(function(){try{history.scrollRestoration="manual";var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"&&location.hash){history.replaceState(history.state,"",location.pathname+location.search)}window.scrollTo(0,0)}catch(e){}})()`

const body = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
  fallback: ["Verdana", "system-ui", "sans-serif"],
})

const display = Big_Shoulders({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  axes: ["opsz"],
  display: "swap",
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif"],
  // The hero headline uses it: preloaded so it doesn't swap in late and nudge the text below
  preload: true,
})

const ogLocales = { sl: "sl_SI", de: "de_AT", en: "en_GB" } as const

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const viewport: Viewport = {
  themeColor: "#00163f",
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "meta" })
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`
  return {
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: path,
      languages: { sl: "/", de: "/de", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: site.shortName,
      title: t("title"),
      description: t("description"),
      url: path,
      locale: ogLocales[locale as keyof typeof ogLocales] ?? "sl_SI",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image" },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  return (
    <html lang={locale} className={`${body.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: startAtTop }} />
      </head>
      <body>
        {/* No NextIntlClientProvider: client components get their strings as props, so the
            translations and the message formatter stay on the server */}
        <SmoothScroll>{children}</SmoothScroll>
        <RevealObserver />
      </body>
    </html>
  )
}
