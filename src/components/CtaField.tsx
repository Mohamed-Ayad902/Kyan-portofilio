import Link from "next/link";

import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";
import { company, whatsappUrl } from "@/lib/site";

/** Closing call to action on inner pages: a whole field of brand orange. */
export function CtaField({
  locale,
  dict,
  heading,
  body,
  query,
}: {
  locale: Locale;
  dict: Dictionary;
  heading: string;
  body: string;
  query?: string;
}) {
  const wa = whatsappUrl();
  return (
    <section className="cta-field" aria-labelledby="cta-title">
      <h2 id="cta-title" data-reveal>
        {heading}
      </h2>
      <p data-reveal>{body}</p>
      <div className="cta-field__actions" data-reveal>
        <Link className="btn btn--ink btn--large" href={`${href(locale, "/contact")}${query ? `?${query}` : ""}`}>
          {dict.common.requestQuote}
        </Link>
        <a className="text-link" href={`tel:${company.phones[0]!.e164}`} dir="ltr">
          {company.phones[0]!.display}
        </a>
        {wa ? (
          <a className="text-link" href={wa} target="_blank" rel="noopener">
            {dict.common.whatsapp}
          </a>
        ) : null}
      </div>
    </section>
  );
}
