export const serviceOptions = [
  "krovstvo",
  "kleparstvo",
  "tesarstvo",
  "stresnaOkna",
  "strelovodi",
  "visinskaDela",
  "drugo",
] as const

export type InquiryInput = { name: string; phone: string; service: string; message?: string }
export type InquiryField = keyof InquiryInput
/** Error values are translation keys under form.errors. */
export type InquiryErrors = Partial<Record<InquiryField, InquiryField>>

const phonePattern = /^[+()\d\s/.-]{6,24}$/

/**
 * Checks an inquiry the same way on the client and in the server action.
 * Plain code instead of a schema library keeps the form's client bundle small.
 */
export function validateInquiry(input: unknown): { data: InquiryInput; errors: InquiryErrors } {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "")
  const data: InquiryInput = {
    name: str(raw.name),
    phone: str(raw.phone),
    service: str(raw.service),
    message: str(raw.message) || undefined,
  }

  const errors: InquiryErrors = {}
  if (data.name.length < 2 || data.name.length > 80) errors.name = "name"
  if (!phonePattern.test(data.phone) || data.phone.replace(/\D/g, "").length < 6) errors.phone = "phone"
  if (!(serviceOptions as readonly string[]).includes(data.service)) errors.service = "service"
  if ((data.message?.length ?? 0) > 1000) errors.message = "message"
  return { data, errors }
}
