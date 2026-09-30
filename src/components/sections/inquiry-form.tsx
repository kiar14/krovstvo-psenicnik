"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react"
import { cx } from "@/lib/cx"
import { validateInquiry, type InquiryErrors, type InquiryField } from "@/lib/schemas"
import { submitInquiry } from "@/lib/actions/inquiry"
import { SELECT_SERVICE_EVENT } from "./service-link"

export type InquiryFormLabels = {
  name: string
  phone: string
  services: string
  servicesHint: string
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

const order: InquiryField[] = ["name", "phone", "services", "message"]

export function InquiryForm({
  labels,
  services: serviceList,
}: {
  labels: InquiryFormLabels
  services: { key: string; title: string }[]
}) {
  const allServices = [...serviceList, { key: "drugo", title: labels.other }]
  const form = useRef<HTMLFormElement>(null)
  const [services, setServices] = useState<string[]>([])
  const [errors, setErrors] = useState<InquiryErrors>({})
  // Like react-hook-form's defaults: check on submit, then re-check as the user corrects
  const [attempted, setAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const [serverError, setServerError] = useState(false)

  const read = () => ({ ...Object.fromEntries(new FormData(form.current ?? undefined)), services })

  const toggle = (key: string) =>
    setServices((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))

  useEffect(() => {
    const onSelect = (e: Event) => {
      // "Inquire" on a service card adds it; several cards build up a selection
      const key = (e as CustomEvent<string>).detail
      setServices((prev) => (prev.includes(key) ? prev : [...prev, key]))
      setDone(null)
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect)
  }, [])

  // Re-check once the services change after a failed attempt (other fields re-check on input)
  useEffect(() => {
    if (attempted && form.current) setErrors(validateInquiry(read()).errors)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when the services change
  }, [services])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAttempted(true)
    setServerError(false)
    const { data, errors: found } = validateInquiry(read())
    setErrors(found)
    const firstInvalid = order.find((k) => found[k])
    if (firstInvalid) {
      // For the services, the first chip takes focus
      const id = firstInvalid === "services" ? `f-services-${allServices[0].key}` : `f-${firstInvalid}`
      document.getElementById(id)?.focus()
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
    setServices([])
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

      <fieldset aria-describedby={errors.services ? "f-services-err" : undefined}>
        <legend className="mb-2 font-bold text-graphite">
          {labels.services} <span className="text-sm font-normal text-slate">{labels.servicesHint}</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {allServices.map(({ key, title }) => {
            const on = services.includes(key)
            return (
              <label
                key={key}
                className={cx(
                  "inline-flex h-11 cursor-pointer items-center gap-1.5 rounded-full border px-4 text-[0.98rem] font-semibold transition-[background-color,border-color,color] duration-200 select-none has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-bronze-ink",
                  on
                    ? "border-navy bg-navy text-white"
                    : errors.services
                      ? "border-destructive bg-white text-graphite"
                      : "border-input bg-white text-graphite hover:border-slate/60",
                )}
              >
                <input
                  id={`f-services-${key}`}
                  type="checkbox"
                  name="services"
                  value={key}
                  checked={on}
                  onChange={() => toggle(key)}
                  className="sr-only"
                />
                {on && <Check className="-ml-1 size-4 text-spruce" strokeWidth={2.5} aria-hidden="true" />}
                {title}
              </label>
            )
          })}
        </div>
        {err("services")}
      </fieldset>

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
          className={cx(field, "min-h-[7.5rem] flex-1 resize-y py-3 leading-relaxed")}
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
