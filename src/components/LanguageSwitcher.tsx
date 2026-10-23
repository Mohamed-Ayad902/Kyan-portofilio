"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { hreflang, localeMeta, locales, switchLocalePath, type Locale } from "@/lib/i18n";

/** Real links to the same page in each language, so it also works without JavaScript. */
export function LanguageSwitcher({ locale, label, variant = "compact" }: { locale: Locale; label: string; variant?: "compact" | "full" }) {
  const pathname = usePathname() || `/${locale}`;
  return (
    <nav className={`lang lang--${variant}`} aria-label={label}>
      <ul>
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={switchLocalePath(pathname, l)}
              hrefLang={hreflang[l]}
              lang={localeMeta[l].htmlLang}
              aria-current={l === locale ? "true" : undefined}
              aria-label={localeMeta[l].label}
              prefetch={false}
              onClick={() => {
                try {
                  document.cookie = `kayan-locale=${l}; path=/; max-age=31536000; samesite=lax`;
                } catch {}
              }}
            >
              {variant === "full" ? localeMeta[l].label : localeMeta[l].short}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
