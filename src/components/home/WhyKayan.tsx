import Link from "next/link";

import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { SectionHead } from "../SectionHead";

/** Reasons set like a statement of values: a numeral, the reason in wide capitals, then its terms. */
export function WhyKayan({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const w = dict.home.why;
  return (
    <section className="values" aria-labelledby="why-title">
      <SectionHead id="why-title" title={w.headingLines.join(" ")} />
      <p className="values__lead" data-reveal>
        {w.body}
      </p>
      <ol className="values__list">
        {w.rows.map((row, i) => (
          <li className="values__item" key={row.title} data-reveal>
            <span className="values__index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="values__title">{row.title}</h3>
            <p>{row.body}</p>
            <ul className="values__terms">
              {row.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <Link className="btn btn--accent btn--arrow" href={href(locale, "/contact")} data-reveal>
        {dict.common.requestQuote}
      </Link>
    </section>
  );
}
