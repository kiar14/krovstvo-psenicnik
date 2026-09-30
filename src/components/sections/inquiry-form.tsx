"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, ChevronDown, LoaderCircle } from "lucide-react"
import { cx } from "@/lib/cx"
import { validateInquiry, type InquiryErrors, type InquiryField } from "@/lib/schemas"
import { submitInquiry } from "@/lib/actions/inquiry"
import { SELECT_SERVICE_EVENT } from "./service-link"

export type InquiryFormLabels = {
  name: string
  phone: string
  service: string
  servicePlaceholder: string
  other: string
  message: string
  optional: string
  messagePlaceholder: string
  submit: string
  sending: string
  /** Contains {name} */
  successTitle: string
  successText: string
  again: string
  errorGeneric: string
  errors: Record<InquiryField, string>
}

const field =
  "block w-full rounded-lg border border-input bg-white px-4 text-[1.02rem] text-graphite transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-slate/70 hover:border-slate/60 focus:border-navy focus:shadow-[0_0_0_3px_rgb(0_22_63/0.15)] aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_3px_rgb(180_35_24/0.12)]"

const order: InquiryField[] = ["name", "phone", "service", "message"]

export function InquiryForm({
  labels,
  services,
}: {
  labels: InquiryFormLabels
  services: { key: string; title: string }[]
}) {
  const form = useRef<HTMLFormElement>(null)
  const [service, setService] = useState("")
  const [errors, setErrors] = useState<InquiryErrors>({})
  // Like react-hook-form's defaults: check on submit, then re-check as the user corrects
  const [attempted, setAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const [serverError, setServerError] = useState(false)

  const read = () => ({ ...Object.fromEntries(new FormData(form.current ?? undefined)), service })

  useEffect(() => {
    const onSelect = (e: Event) => {
      setService((e as CustomEvent<string>).detail)
      setDone(null)
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect)
  }, [])

  // Re-check once the service changes after a failed attempt (other fields re-check on input)
  useEffect(() => {
    if (attempted && form.current) setErrors(validateInquiry(read()).errors)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when the service changes
  }, [service])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAttempted(true)
    setServerError(false)
    const { data, errors: found } = validateInquiry(read())
    setErrors(found)
    const firstInvalid = order.find((k) => found[k])
    if (firstInvalid) {
      document.getElementById(`f-${firstInvalid}`)?.focus()
      return
    }
    setSubmitting(true)
    try {
      const res = await submitInquiry(data)
      if (res.ok) setDone(data.name.split(" ")[0])
      else setServerError(true)
    } catch {
      setServerError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const again = () => {
    setService("")
    setErrors({})
    setAttempted(false)
    setDone(null)
  }

  const err = (key: InquiryField) =>
    errors[key] ? (
      <p id={`f-${key}-err`} className="mt-1.5 text-sm font-bold text-destructive">
        {labels.errors[key]}
      </p>
    ) : null

  const aria = (key: InquiryField) => ({
    "aria-invalid": !!errors[key],
    "aria-describedby": errors[key] ? `f-${key}-err` : undefined,
  })

  if (done) {
    return (
      <div
        role="status"
        className="flex h-full min-h-[22rem] animate-in flex-col items-start justify-center duration-500 ease-(--ease-out-expo) fade-in slide-in-from-bottom-4 motion-reduce:animate-none"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-navy text-white">
          <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <p className="font-display-tight mt-6 text-5xl font-extrabold text-graphite uppercase">
          {labels.successTitle.replace("{name}", done)}
        </p>
        <p className="mt-3 max-w-md text-lg text-slate">{labels.successText}</p>
        <button
          type="button"
          onClick={again}
          className="mt-8 font-bold text-bronze-ink underline decoration-bronze-ink/40 hover:decoration-bronze-ink"
        >
          {labels.again}
        </button>
      </div>
    )
  }

  return (
    <form
      ref={form}
      noValidate
      onSubmit={onSubmit}
      onInput={() => attempted && setErrors(validateInquiry(read()).errors)}
      className="flex h-full animate-in flex-col gap-6 duration-300 fade-in motion-reduce:animate-none"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="f-name" className="mb-2 block font-bold text-graphite">
            {labels.name}
          </label>
          <input id="f-name" name="name" autoComplete="name" className={cx(field, "h-13")} {...aria("name")} />
          {err("name")}
        </div>

        <div>
          <label htmlFor="f-phone" className="mb-2 block font-bold text-graphite">
            {labels.phone}
          </label>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={cx(field, "h-13 tabular-nums")}
            {...aria("phone")}
          />
          {err("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="f-service" className="mb-2 block font-bold text-graphite">
          {labels.service}
        </label>
        <div className="relative">
          <select
            id="f-service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className={cx(field, "h-13 cursor-pointer appearance-none pr-11")}
            {...aria("service")}
          >
            <option value="" disabled>
              {labels.servicePlaceholder}
            </option>
            {services.map(({ key, title }) => (
              <option key={key} value={key}>
                {title}
              </option>
            ))}
            <option value="drugo">{labels.other}</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-slate"
            aria-hidden="true"
          />
        </div>
        {err("service")}
      </div>

      {/* Grows to fill the column, so the form ends level with the dark panel beside it */}
      <div className="flex flex-1 flex-col">
        <label htmlFor="f-message" className="mb-2 block font-bold text-graphite">
          {labels.message} <span className="text-sm font-normal text-slate">{labels.optional}</span>
        </label>
        <textarea
          id="f-message"
          name="message"
          rows={4}
          placeholder={labels.messagePlaceholder}
          className={cx(field, "min-h-[8.5rem] flex-1 resize-y py-3 leading-relaxed")}
          {...aria("message")}
        />
        {err("message")}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-md bg-spruce px-6 text-[1.05rem] font-bold text-navy-ink transition-colors hover:bg-spruce-hover disabled:cursor-wait disabled:opacity-80 sm:w-auto"
        >
          {submitting ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
              {labels.sending}
            </>
          ) : (
            <>
              {labels.submit}
              <ArrowUpRight
                className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </>
          )}
        </button>
        {serverError && (
          <p role="alert" className="text-sm font-bold text-destructive">
            {labels.errorGeneric}
          </p>
        )}
      </div>
    </form>
  )
}
