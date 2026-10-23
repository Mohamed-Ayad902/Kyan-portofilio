"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import type { Dictionary } from "@/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { UNSURE, clean, limits, summarizeQuote, validateQuote, type QuoteErrors, type QuoteInput } from "@/lib/quote";
import { company, mailtoUrl, whatsappUrl } from "@/lib/site";

type Labels = Dictionary["contact"]["form"];
type Status = "idle" | "sending" | "success" | "unavailable" | "failure" | "rate_limited";

const FIELD_ORDER: (keyof QuoteInput)[] = ["name", "company", "email", "phone", "equipment", "location", "duration", "startDate", "message"];

function newKey() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export function QuoteForm({
  locale,
  labels,
  equipment,
}: {
  locale: Locale;
  labels: Labels;
  equipment: { value: string; label: string }[];
}) {
  const id = useId();
  const params = useSearchParams();
  const initial = useMemo(() => {
    const eq = params.get("equipment") ?? "";
    const duration = params.get("duration") ?? "";
    return {
      equipment: equipment.some((o) => o.value === eq) ? eq : "",
      duration: ["days", "weeks", "months", "year"].includes(duration) ? duration : "",
      location: (params.get("location") ?? "").slice(0, limits.location),
      operator: params.get("operator") === "1",
    };
  }, [params, equipment]);

  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    equipment: initial.equipment,
    location: initial.location,
    duration: initial.duration,
    startDate: "",
    operator: initial.operator,
    message: "",
    preferred: "phone",
    website: "",
  });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(0);
  const key = useRef("");
  useEffect(() => {
    startedAt.current = Date.now();
    key.current = newKey();
  }, []);
  const inFlight = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const input: QuoteInput = {
    name: clean(values.name),
    company: clean(values.company),
    email: clean(values.email),
    phone: clean(values.phone),
    equipment: values.equipment,
    location: clean(values.location),
    duration: values.duration,
    startDate: values.startDate,
    operator: values.operator,
    message: clean(values.message, true),
    preferred: values.preferred,
    locale,
  };

  const equipmentName = equipment.find((o) => o.value === values.equipment)?.label ?? (values.equipment === UNSURE ? labels.equipmentUnsure : "");
  const summary = summarizeQuote(
    input,
    {
      name: labels.name,
      company: labels.company,
      email: labels.email,
      phone: labels.phone,
      equipment: labels.equipment,
      location: labels.location,
      duration: labels.duration,
      startDate: labels.startDate,
      operator: labels.operator,
      message: labels.message,
      preferred: labels.preferred,
    },
    {
      equipment: equipmentName,
      duration: values.duration ? labels.durations[values.duration as keyof Labels["durations"]] : "",
      preferred: labels.preferredOptions[values.preferred as keyof Labels["preferredOptions"]] ?? "",
      operator: values.operator ? labels.yes : "",
    },
  );
  const mailto = mailtoUrl(labels.summarySubject, summary);
  const wa = whatsappUrl(`${labels.summarySubject}\n\n${summary}`);

  function set<K extends keyof typeof values>(name: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [name]: value }));
    if (submitted && name in input) {
      const cleaned = typeof value === "string" ? clean(value, name === "message") : value;
      setErrors(validateQuote({ ...input, [name]: cleaned } as QuoteInput));
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    setSubmitted(true);
    const found = validateQuote({ ...input });
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, website: values.website, startedAt: startedAt.current, idempotencyKey: key.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { code?: string; errors?: QuoteErrors };
      if (res.ok && data.code === "ok") setStatus("success");
      else if (res.status === 503 || data.code === "not_configured") setStatus("unavailable");
      else if (res.status === 429) setStatus("rate_limited");
      else if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      } else setStatus("failure");
    } catch {
      setStatus("failure");
    } finally {
      inFlight.current = false;
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function reset() {
    setValues((v) => ({ ...v, message: "", startDate: "" }));
    setSubmitted(false);
    setErrors({});
    setStatus("idle");
    key.current = newKey();
    startedAt.current = Date.now();
  }

  const errorText = (name: keyof QuoteInput) => {
    const k = errors[name];
    return k ? labels.errors[k] : undefined;
  };
  const describedBy = (name: string, hint?: boolean) =>
    [hint ? `${id}-${name}-hint` : "", errors[name as keyof QuoteInput] ? `${id}-${name}-error` : ""].filter(Boolean).join(" ") || undefined;
  const errorList = FIELD_ORDER.filter((f) => errors[f]);

  if (status === "success") {
    return (
      <div className="quote" ref={resultRef} tabIndex={-1} role="status">
        <div className="notice notice--success">
          <h3>{labels.success.title}</h3>
          <p>{labels.success.body}</p>
          <div className="notice__actions">
            <button type="button" className="btn btn--plain" onClick={reset}>
              {labels.success.another}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const fallbacks = (
    <div className="notice__actions">
      <a className="btn btn--plain" href={mailto}>
        {labels.emailInstead}
      </a>
      {wa ? (
        <a className="btn btn--plain" href={wa} target="_blank" rel="noopener">
          {labels.whatsappInstead}
        </a>
      ) : null}
      <a className="btn btn--plain" href={`tel:${company.phones[0]!.e164}`}>
        {labels.callInstead}
      </a>
    </div>
  );

  return (
    <form className="quote" noValidate onSubmit={onSubmit} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{labels.heading}</h2>

      {submitted && errorList.length ? (
        <div className="notice notice--error" ref={summaryRef} tabIndex={-1} role="alert">
          <p>
            <strong>{labels.errors.summary}</strong>
          </p>
          <ul className="plain-list">
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${id}-${f}`}>{errorText(f)}</a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === "unavailable" || status === "failure" || status === "rate_limited" ? (
        <div className="notice notice--error" ref={resultRef} tabIndex={-1} role="alert">
          <h3>{status === "unavailable" ? labels.unavailable.title : labels.failure.title}</h3>
          <p>{status === "unavailable" ? labels.unavailable.body : status === "rate_limited" ? labels.rateLimited : labels.failure.body}</p>
          {fallbacks}
        </div>
      ) : null}

      <div className="quote__grid">
        <Field id={`${id}-name`} label={labels.name} required requiredLabel={labels.required} error={errorText("name")}>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            maxLength={limits.name}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
          />
        </Field>
        <Field id={`${id}-company`} label={labels.company} optionalLabel={labels.optional} error={errorText("company")}>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            maxLength={limits.company}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy("company")}
          />
        </Field>
        <p className="field__hint quote__wide" id={`${id}-contact-hint`}>
          {labels.contactHint}
        </p>
        <Field id={`${id}-email`} label={labels.email} error={errorText("email")}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            maxLength={limits.email}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={[`${id}-contact-hint`, describedBy("email")].filter(Boolean).join(" ")}
          />
        </Field>
        <Field id={`${id}-phone`} label={labels.phone} error={errorText("phone")}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            dir="ltr"
            maxLength={limits.phone}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={[`${id}-contact-hint`, describedBy("phone")].filter(Boolean).join(" ")}
          />
        </Field>
        <Field id={`${id}-equipment`} label={labels.equipment} required requiredLabel={labels.required} error={errorText("equipment")}>
          <select
            id={`${id}-equipment`}
            name="equipment"
            required
            value={values.equipment}
            onChange={(e) => set("equipment", e.target.value)}
            aria-invalid={errors.equipment ? true : undefined}
            aria-describedby={describedBy("equipment")}
          >
            <option value="" disabled>
              {labels.equipmentPlaceholder}
            </option>
            {equipment.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
            <option value={UNSURE}>{labels.equipmentUnsure}</option>
          </select>
        </Field>
        <Field id={`${id}-location`} label={labels.location} required requiredLabel={labels.required} error={errorText("location")}>
          <input
            id={`${id}-location`}
            name="location"
            required
            autoComplete="off"
            maxLength={limits.location}
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            aria-invalid={errors.location ? true : undefined}
            aria-describedby={describedBy("location")}
          />
        </Field>
        <Field id={`${id}-duration`} label={labels.duration} required requiredLabel={labels.required} error={errorText("duration")}>
          <select
            id={`${id}-duration`}
            name="duration"
            required
            value={values.duration}
            onChange={(e) => set("duration", e.target.value)}
            aria-invalid={errors.duration ? true : undefined}
            aria-describedby={describedBy("duration")}
          >
            <option value="" disabled>
              {labels.durationPlaceholder}
            </option>
            {(Object.keys(labels.durations) as (keyof Labels["durations"])[]).map((d) => (
              <option key={d} value={d}>
                {labels.durations[d]}
              </option>
            ))}
          </select>
        </Field>
        <Field id={`${id}-startDate`} label={labels.startDate} optionalLabel={labels.optional} error={errorText("startDate")}>
          <input
            id={`${id}-startDate`}
            name="startDate"
            type="date"
            value={values.startDate}
            onChange={(e) => set("startDate", e.target.value)}
            aria-invalid={errors.startDate ? true : undefined}
            aria-describedby={describedBy("startDate")}
          />
        </Field>
        <label className="check quote__wide">
          <input type="checkbox" name="operator" checked={values.operator} onChange={(e) => set("operator", e.target.checked)} />
          <span>{labels.operator}</span>
        </label>
        <div className="quote__wide">
          <Field id={`${id}-message`} label={labels.message} required requiredLabel={labels.required} error={errorText("message")} hintId={`${id}-message-hint`} hint={labels.messageHint}>
            <textarea
              id={`${id}-message`}
              name="message"
              required
              rows={6}
              maxLength={limits.message}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={describedBy("message", true)}
            />
          </Field>
        </div>
        <fieldset className="chips quote__wide">
          <legend>{labels.preferred}</legend>
          {(Object.keys(labels.preferredOptions) as (keyof Labels["preferredOptions"])[])
            .filter((m) => m !== "whatsapp" || company.whatsapp)
            .map((m) => (
              <label className="chip" key={m}>
                <input type="radio" name="preferred" value={m} checked={values.preferred === m} onChange={() => set("preferred", m)} />
                <span>{labels.preferredOptions[m]}</span>
              </label>
            ))}
        </fieldset>
        <div className="quote__trap" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
          </label>
        </div>
      </div>

      <p className="quote__consent">{labels.consent}</p>
      <div className="quote__submit">
        <button type="submit" className="btn btn--accent btn--large" disabled={status === "sending"} aria-busy={status === "sending"}>
          {status === "sending" ? labels.sending : labels.submit}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  requiredLabel,
  optionalLabel,
  error,
  hint,
  hintId,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  requiredLabel?: string;
  optionalLabel?: string;
  error?: string;
  hint?: string;
  hintId?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? (
          <small aria-hidden="true"> *</small>
        ) : optionalLabel ? (
          <small>({optionalLabel})</small>
        ) : null}
        {required && requiredLabel ? <span className="visually-hidden"> ({requiredLabel})</span> : null}
      </label>
      {hint ? (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
