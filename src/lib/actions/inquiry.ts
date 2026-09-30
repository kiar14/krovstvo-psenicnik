"use server"

import { validateInquiry } from "@/lib/schemas"

/**
 * Validates on the server exactly like the client, then stops.
 * NOT DELIVERED YET: before launch (B1/B2) send it via Resend or an n8n webhook here.
 */
export async function submitInquiry(input: unknown) {
  const { errors } = validateInquiry(input)
  if (Object.keys(errors).length) return { ok: false as const, errors }
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true as const }
}
