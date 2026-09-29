/** Small drawn flags for the language switch (emoji flags don't render on Windows). */
export function FlagSI({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <rect y="6.67" width="30" height="6.67" fill="#0000CC" />
      <rect y="13.33" width="30" height="6.67" fill="#D80000" />
      <path d="M6.2 3.6h5.6v4.5c0 2.6-1.5 3.9-2.8 4.6-1.3-.7-2.8-2-2.8-4.6z" fill="#0000CC" stroke="#D80000" strokeWidth=".45" />
      <path d="M6.8 9.6 8 8.2l.6.7.4-.9.4.9.6-.7 1.2 1.4c-.3.9-1 1.6-2.2 2.2-1.2-.6-1.9-1.3-2.2-2.2z" fill="#fff" />
      <circle cx="7.9" cy="5" r=".35" fill="#FFDD00" />
      <circle cx="10.1" cy="5" r=".35" fill="#FFDD00" />
      <circle cx="9" cy="6" r=".35" fill="#FFDD00" />
    </svg>
  )
}

export function FlagDE({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="6.67" fill="#000" />
      <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
      <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
    </svg>
  )
}

export function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <clipPath id="flag-gb-clip">
        <rect width="30" height="20" />
      </clipPath>
      <g clipPath="url(#flag-gb-clip)">
        <rect width="30" height="20" fill="#012169" />
        <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
        <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.4" />
        <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6" />
        <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.4" />
      </g>
    </svg>
  )
}
