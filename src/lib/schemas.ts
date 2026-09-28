import { z } from "zod"
export const serviceOptions = [
  "krovstvo",
  "kleparstvo",
  "tesarstvo",
  "stresnaOkna",
  "strelovodi",
  "visinskaDela",
  "drugo",
] as const

/** Error messages are translation keys under form.errors. */
export const inquirySchema = z.object({
  name: z.string().trim().min(2, { error: "name" }).max(80, { error: "name" }),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s/.-]{6,24}$/, { error: "phone" })
    .refine((v) => v.replace(/\D/g, "").length >= 6, { error: "phone" }),
  service: z.string().refine((v) => (serviceOptions as readonly string[]).includes(v), { error: "service" }),
  message: z.string().trim().max(1000, { error: "message" }).optional(),
})

export type InquiryInput = z.infer<typeof inquirySchema>
