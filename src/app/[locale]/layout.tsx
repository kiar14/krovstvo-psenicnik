import type { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { Big_Shoulders, Source_Sans_3 } from "next/font/google"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { site } from "@/lib/site"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import "../globals.css"

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
  preload: false,
})

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
      languages: { sl: "/", de: "/de", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      siteName: site.shortName,
      title: t("title"),
      description: t("description"),
      url: path,
      locale: locale === "de" ? "de_AT" : "sl_SI",
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
      <body>
        <NextIntlClientProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
