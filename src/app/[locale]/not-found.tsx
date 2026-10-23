import Link from "next/link";
import { locale as rootLocale } from "next/root-params";

import { getDictionary } from "@/dictionaries";
import { hasLocale, href, defaultLocale } from "@/lib/i18n";

export default async function NotFound() {
  const value = await rootLocale();
  const locale = value && hasLocale(value) ? value : defaultLocale;
  const dict = await getDictionary(locale);
  return (
    <section className="not-found">
      <h1>{dict.notFound.title}</h1>
      <p className="lead">{dict.notFound.body}</p>
      <Link className="btn btn--accent" href={href(locale)}>
        {dict.notFound.back}
      </Link>
    </section>
  );
}
