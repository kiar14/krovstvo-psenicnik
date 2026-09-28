import Image from "next/image"

/** Horizontal logo without the tagline. `tone` picks the version for light or navy backgrounds. */
export function Logo({ tone = "color", className }: { tone?: "color" | "white"; className?: string }) {
  return (
    <Image
      src={tone === "white" ? "/brand/logo-compact-white.svg" : "/brand/logo-compact.svg"}
      alt="PŠENIČNIK"
      width={1010}
      height={174}
      unoptimized
      className={className}
    />
  )
}

export function LogoFull({ tone = "color", className }: { tone?: "color" | "white"; className?: string }) {
  return (
    <Image
      src={tone === "white" ? "/brand/logo-white.svg" : "/brand/logo.svg"}
      alt="PŠENIČNIK – krovstvo, kleparstvo, tesarstvo"
      width={1012}
      height={210}
      unoptimized
      className={className}
    />
  )
}
