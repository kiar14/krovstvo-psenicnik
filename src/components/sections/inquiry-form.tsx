"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Check, ChevronDown, LoaderCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { cn } from "cn"
import { services } from "@/lib/site"
import { inquirySchema, type InquiryInput } from "@/lib/schemas"
import { submitInquiry } from "@/lib/actions/inquiry"
import { SELECT_SERVICE_EVENT } from "./service-link"

const field =
  "block w-full rounded-lg border border-input bg-white px-4 text-[1.02rem] text-graphite transition-[border-color,box-shadow] duration-200 outline-none placeholder:text-slate/70 hover:border-slate/60 focus:border-navy focus:shadow-[0_0_0_3px_rgb(0_45_138/0.15)] aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_3px_rgb(180_35_24/0.12)]"

export function InquiryForm() {
  const t = useTranslations("form")
  const ts = useTranslations("services.items")
  const [done, setDone] = useState<string | null>(null)
  const [serverError, setServerError] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", phone: "", service: "", message: "" },
  })

  useEffect(() => {
    const onSelect = (e: Event) => {
      const key = (e as CustomEvent<string>).detail
      setValue("service", key, { shouldValidate: true })
      setDone(null)
    }
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect)
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect)
  }, [setValue])

  const onSubmit = async (values: InquiryInput) => {
    setServerError(false)
    try {
      const res = await submitInquiry(values)
      if (res.ok) setDone(values.name.split(" ")[0])
      else setServerError(true)
    } catch {
      setServerError(true)
    }
  }

  const err = (key: keyof InquiryInput) => {
    const msg = errors[key]?.message
    return msg ? t(`errors.${msg}` as "errors.name") : null
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {done ? (
        <motion.div
          key="done"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex min-h-[22rem] flex-col items-start justify-center"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-navy text-white">
            <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
          </span>
          <p className="font-display-tight mt-6 text-5xl font-extrabold text-graphite uppercase">{t("successTitle", { name: done })}</p>
          <p className="mt-3 max-w-md text-lg text-slate">{t("successText")}</p>
          <button
            type="button"
            onClick={() => {
              reset()
              setDone(null)
            }}
            className="mt-8 font-bold text-bronze-ink underline decoration-bronze-ink/40 hover:decoration-bronze-ink"
          >
            {t("again")}
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="grid gap-x-6 gap-y-6 md:grid-cols-2"
        >
          <div>
            <label htmlFor="f-name" className="mb-2 block font-bold text-graphite">
              {t("name")}
            </label>
            <input
              id="f-name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "f-name-err" : undefined}
              className={cn(field, "h-13")}
              {...register("name")}
            />
            {err("name") && (
              <p id="f-name-err" className="mt-1.5 text-sm font-bold text-destructive">
                {err("name")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="f-phone" className="mb-2 block font-bold text-graphite">
              {t("phone")}
            </label>
            <input
              id="f-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "f-phone-err" : undefined}
              className={cn(field, "h-13 tabular-nums")}
              {...register("phone")}
            />
            {err("phone") && (
              <p id="f-phone-err" className="mt-1.5 text-sm font-bold text-destructive">
                {err("phone")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="f-service" className="mb-2 block font-bold text-graphite">
              {t("service")}
            </label>
            <div className="relative">
              <select
                id="f-service"
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "f-service-err" : undefined}
                className={cn(field, "h-13 cursor-pointer appearance-none pr-11")}
                {...register("service")}
              >
                <option value="" disabled>
                  {t("servicePlaceholder")}
                </option>
                {services.map(({ key }) => (
                  <option key={key} value={key}>
                    {ts(`${key}.title`)}
                  </option>
                ))}
                <option value="drugo">{t("other")}</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-slate"
                aria-hidden="true"
              />
            </div>
            {err("service") && (
              <p id="f-service-err" className="mt-1.5 text-sm font-bold text-destructive">
                {err("service")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="f-message" className="mb-2 block font-bold text-graphite">
              {t("message")} <span className="text-sm font-normal text-slate">{t("optional")}</span>
            </label>
            <textarea
              id="f-message"
              rows={4}
              placeholder={t("messagePlaceholder")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "f-message-err" : undefined}
              className={cn(field, "min-h-[8.5rem] resize-y py-3 leading-relaxed")}
              {...register("message")}
            />
            {err("message") && (
              <p id="f-message-err" className="mt-1.5 text-sm font-bold text-destructive">
                {err("message")}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 self-end md:col-start-1 md:row-start-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex h-13 w-full items-center justify-center gap-2 rounded-lg bg-spruce px-6 text-[1.05rem] font-bold text-navy-ink transition-colors hover:bg-spruce-hover disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:self-start"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
                  {t("sending")}
                </>
              ) : (
                <>
                  {t("submit")}
                  <ArrowUpRight
                    className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
            {serverError && (
              <p role="alert" className="text-sm font-bold text-destructive">
                {t("errorGeneric")}
              </p>
            )}
          </div>

          <p className="self-end text-sm leading-snug text-slate md:col-start-2 md:row-start-3 md:max-w-[15rem] md:justify-self-end md:text-right">
            {t("demoNote")}
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
