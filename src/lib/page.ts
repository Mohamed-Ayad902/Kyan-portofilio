import "server-only";

import { notFound } from "next/navigation";

import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";

/** Resolve the locale param (404 on anything unknown) and load its dictionary. */
export async function loadPage(params: Promise<{ locale: string }>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return { locale, dict: await getDictionary(locale) };
}
