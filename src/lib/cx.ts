/** Joins class names. Client components use this instead of `cn` so the Tailwind merge engine stays off the client. */
export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
