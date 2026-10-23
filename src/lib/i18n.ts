export const locales = ["en", "ar", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeMeta: Record<Locale, { dir: "ltr" | "rtl"; htmlLang: string; ogLocale: string; label: string; short: string }> = {
  en: { dir: "ltr", htmlLang: "en", ogLocale: "en_US", label: "English", short: "EN" },
  ar: { dir: "rtl", htmlLang: "ar-EG", ogLocale: "ar_EG", label: "العربية", short: "ع" },
  zh: { dir: "ltr", htmlLang: "zh-Hans", ogLocale: "zh_CN", label: "简体中文", short: "中" },
};

/** hreflang codes used in <link rel="alternate"> and the sitemap. */
export const hreflang: Record<Locale, string> = { en: "en", ar: "ar", zh: "zh-Hans" };

/** Build a locale-prefixed path: href("ar", "/equipment") -> "/ar/equipment". */
export function href(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/** Swap the locale segment of a pathname, keeping the rest of the route. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/");
  if (parts[1] && hasLocale(parts[1])) parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join("/") || `/${to}`;
}
