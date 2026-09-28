"use server"

import { z } from "zod"
import { inquirySchema } from "@/lib/schemas"

/**
 * Demo: validates on the server exactly like the client, then stops.
 * Production (B1/B2): deliver via Resend or an n8n webhook here.
 */
export async function submitInquiry(input: unknown) {
  const parsed = inquirySchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, errors: z.flattenError(parsed.error).fieldErrors }
  }
  await new Promise((r) => setTimeout(r, 600))
  return { ok: true as const }
}
