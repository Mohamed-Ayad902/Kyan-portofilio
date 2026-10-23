/**
 * Quote-request validation, shared by the browser form and the /api/quote route handler,
 * so both enforce exactly the same rules.
 */
import { equipmentSlugs, rentalDurations } from "@/content/catalog";
import type { Locale } from "@/lib/i18n";

export const preferredMethods = ["phone", "email", "whatsapp"] as const;
export type PreferredMethod = (typeof preferredMethods)[number];

export const UNSURE = "unsure";

export type QuoteInput = {
  name: string;
  company: string;
  email: string;
  phone: string;
  equipment: string;
  location: string;
  duration: string;
  startDate: string;
  operator: boolean;
  message: string;
  preferred: string;
  locale: Locale;
};

export type QuoteErrorKey =
  | "name"
  | "contact"
  | "email"
  | "phone"
  | "equipment"
  | "location"
  | "duration"
  | "message"
  | "tooLong"
  | "startDate";

export type QuoteErrors = Partial<Record<keyof QuoteInput, QuoteErrorKey>>;

export const limits = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  location: 200,
  message: 4000,
} as const;

const minMessage: Record<Locale, number> = { en: 20, ar: 20, zh: 10 };

const EMAIL = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const PHONE = /^\+?[0-9\s\-().]{7,}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Strip control characters (keeping newlines in the message) and trim. */
export function clean(value: unknown, multiline = false): string {
  if (typeof value !== "string") return "";
  const stripped = multiline
    ? value.replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : value.replace(/[\u0000-\u001F\u007F]/g, " ");
  return stripped.trim();
}

const digits = (phone: string) => phone.replace(/\D/g, "").length;

export function validateQuote(input: QuoteInput): QuoteErrors {
  const errors: QuoteErrors = {};
  const tooLong = (key: keyof typeof limits) => input[key].length > limits[key];

  if (!input.name) errors.name = "name";
  else if (tooLong("name")) errors.name = "tooLong";

  if (tooLong("company")) errors.company = "tooLong";

  if (!input.email && !input.phone) {
    errors.email = "contact";
    errors.phone = "contact";
  }
  if (input.email) {
    if (tooLong("email")) errors.email = "tooLong";
    else if (!EMAIL.test(input.email)) errors.email = "email";
  }
  if (input.phone) {
    if (tooLong("phone")) errors.phone = "tooLong";
    else if (!PHONE.test(input.phone) || digits(input.phone) < 7 || digits(input.phone) > 15) errors.phone = "phone";
  }

  if (input.equipment !== UNSURE && !(equipmentSlugs as readonly string[]).includes(input.equipment)) {
    errors.equipment = "equipment";
  }

  if (!input.location) errors.location = "location";
  else if (tooLong("location")) errors.location = "tooLong";

  if (!(rentalDurations as readonly string[]).includes(input.duration)) errors.duration = "duration";

  if (input.startDate && (!DATE.test(input.startDate) || Number.isNaN(Date.parse(input.startDate)))) {
    errors.startDate = "startDate";
  }

  if (input.message.length < minMessage[input.locale]) errors.message = "message";
  else if (input.message.length > limits.message) errors.message = "tooLong";

  if (!(preferredMethods as readonly string[]).includes(input.preferred)) input.preferred = "phone";

  return errors;
}

/** Plain-text summary used for the email body and the WhatsApp/mailto fallbacks. */
export function summarizeQuote(
  input: QuoteInput,
  labels: {
    name: string;
    company: string;
    email: string;
    phone: string;
    equipment: string;
    location: string;
    duration: string;
    startDate: string;
    operator: string;
    message: string;
    preferred: string;
  },
  values: { equipment: string; duration: string; preferred: string; operator: string },
): string {
  const lines: [string, string][] = [
    [labels.name, input.name],
    [labels.company, input.company],
    [labels.email, input.email],
    [labels.phone, input.phone],
    [labels.equipment, values.equipment],
    [labels.location, input.location],
    [labels.duration, values.duration],
    [labels.startDate, input.startDate],
    [labels.operator, values.operator],
    [labels.preferred, values.preferred],
  ];
  const head = lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`);
  return [...head, "", `${labels.message}:`, input.message].join("\n");
}
