import { NextResponse, type NextRequest } from "next/server";

import { hasLocale, type Locale } from "@/lib/i18n";
import { clean, summarizeQuote, validateQuote, type QuoteInput } from "@/lib/quote";

/**
 * Receives quote requests. Validates with the same rules as the browser, filters bots, limits
 * repeat submissions, and emails the request through Resend when RESEND_API_KEY, QUOTE_TO_EMAIL and
 * QUOTE_FROM_EMAIL are configured. Without them it answers 503 `not_configured`, and the form
 * offers email / WhatsApp / phone instead — it never reports a send that did not happen.
 */

const MAX_BODY = 16_000;
const MIN_FILL_MS = 3_000;
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;

// Per-instance memory: enough to stop casual abuse and double submits. Use a shared store
// (e.g. Upstash/Redis) if the site runs on many instances and abuse becomes a problem.
const hits = new Map<string, number[]>();
const seen = new Map<string, number>();

function limited(ip: string, now: number): boolean {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function duplicate(key: string, now: number): boolean {
  for (const [k, t] of seen) if (now - t > WINDOW_MS) seen.delete(k);
  if (seen.has(key)) return true;
  seen.set(key, now);
  return false;
}

const json = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) return json({ code: "forbidden" }, 403);

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY) return json({ code: "too_large" }, 413);

  let raw: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY) return json({ code: "too_large" }, 413);
    raw = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return json({ code: "bad_request" }, 400);
  }

  const now = Date.now();
  // Bots: a filled honeypot or an impossibly fast fill. Answer like a success so they move on.
  const startedAt = Number(raw.startedAt);
  if (clean(raw.website) || !Number.isFinite(startedAt) || now - startedAt < MIN_FILL_MS) return json({ code: "ok" });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0]?.trim() || "unknown";
  if (limited(ip, now)) return json({ code: "rate_limited" }, 429);

  const locale: Locale = typeof raw.locale === "string" && hasLocale(raw.locale) ? raw.locale : "en";
  const input: QuoteInput = {
    name: clean(raw.name),
    company: clean(raw.company),
    email: clean(raw.email),
    phone: clean(raw.phone),
    equipment: clean(raw.equipment),
    location: clean(raw.location),
    duration: clean(raw.duration),
    startDate: clean(raw.startDate),
    operator: raw.operator === true,
    message: clean(raw.message, true),
    preferred: clean(raw.preferred),
    locale,
  };
  const errors = validateQuote(input);
  if (Object.keys(errors).length) return json({ code: "invalid", errors }, 422);

  const key = clean(raw.idempotencyKey).slice(0, 80);
  if (key && duplicate(key, now)) return json({ code: "ok", duplicate: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    if (key) seen.delete(key);
    return json({ code: "not_configured" }, 503);
  }

  // Delivery is always in English so Kayan's inbox reads the same whatever the site language.
  const text = summarizeQuote(
    input,
    {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      equipment: "Equipment",
      location: "Project location",
      duration: "Rental period",
      startDate: "Start date",
      operator: "Operator",
      message: "Project description",
      preferred: "Preferred contact",
    },
    {
      equipment: input.equipment,
      duration: input.duration,
      preferred: input.preferred,
      operator: input.operator ? "Requested" : "Not requested",
    },
  );
  const subject = `Quote request: ${input.equipment} — ${input.name}`.replace(/[\r\n]+/g, " ").slice(0, 160);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text: `${text}\n\nSite language: ${locale}`,
        ...(input.email ? { reply_to: input.email } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  } catch (error) {
    console.error("[quote] delivery failed", error instanceof Error ? error.message : error);
    if (key) seen.delete(key);
    return json({ code: "delivery_failed" }, 502);
  }

  return json({ code: "ok" });
}
