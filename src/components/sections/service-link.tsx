"use client"

import type { ServiceKey } from "@/lib/site"

export const SELECT_SERVICE_EVENT = "psenicnik:select-service"

/** Jumps to the inquiry form and preselects the service there. */
export function ServiceLink({
  service,
  className,
  children,
  ...rest
}: { service: ServiceKey; className?: string; children: React.ReactNode } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href="#povprasevanje"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service }))}
      {...rest}
    >
      {children}
    </a>
  )
}
