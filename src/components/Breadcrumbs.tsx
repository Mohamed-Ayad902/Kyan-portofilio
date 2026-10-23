import Link from "next/link";

import { href, type Locale } from "@/lib/i18n";
import { breadcrumbLd } from "@/lib/jsonld";

import { JsonLd } from "./JsonLd";

export function Breadcrumbs({ locale, label, items }: { locale: Locale; label: string; items: { name: string; path: string }[] }) {
  return (
    <>
      <nav className="breadcrumbs" aria-label={label}>
        <ol>
          {items.map((item, i) =>
            i === items.length - 1 ? (
              <li key={item.path} aria-current="page">
                {item.name}
              </li>
            ) : (
              <li key={item.path}>
                <Link href={href(locale, item.path)}>{item.name}</Link>
              </li>
            ),
          )}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items, locale)} />
    </>
  );
}
