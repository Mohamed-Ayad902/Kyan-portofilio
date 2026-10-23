import type { Metadata } from "next";

import type { Dictionary } from "@/dictionaries/en";
import { defaultLocale, href, hreflang, localeMeta, locales, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export function absolute(path: string): string {
  return `${siteUrl()}${path}`;
}

/** Canonical + hreflang alternates for a route that exists in every locale. */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[hreflang[l]] = absolute(href(l, path));
  languages["x-default"] = absolute(href(defaultLocale, path));
  return { canonical: absolute(href(locale, path)), languages };
}

export function pageMetadata(
  locale: Locale,
  dict: Dictionary,
  path: string,
  { title, description, absoluteTitle = false }: { title: string; description: string; absoluteTitle?: boolean },
): Metadata {
  const url = absolute(href(locale, path));
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      url,
      siteName: dict.meta.siteName,
      title: absoluteTitle ? title : dict.meta.titleTemplate.replace("%s", title),
      description,
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      images: [{ url: absolute("/og/kayan-og.jpg"), width: 1200, height: 630, alt: dict.meta.siteName }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absolute("/og/kayan-og.jpg")] },
  };
}
