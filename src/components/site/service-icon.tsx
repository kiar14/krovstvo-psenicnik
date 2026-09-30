import { AppWindow, Construction, Droplets, Hammer, House, Zap, type LucideIcon } from "lucide-react"

const serviceIcons: Record<string, LucideIcon> = {
  krovstvo: House,
  kleparstvo: Droplets,
  tesarstvo: Hammer,
  stresnaOkna: AppWindow,
  strelovodi: Zap,
  visinskaDela: Construction,
}

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = serviceIcons[name] ?? House
  return <Icon className={className} strokeWidth={1.75} aria-hidden="true" />
}
