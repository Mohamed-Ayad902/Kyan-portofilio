import Link from "next/link";

import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

/** Statement cell beside dark rows: each reason, what it means, and three terms. */
export function WhyKayan({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const w = dict.home.why;
  return (
    <section className="why" aria-labelledby="why-title">
      <div className="why__statement">
        <h2 id="why-title" className="why__title" data-reveal>
          {w.headingLines.map((line, i) => (
            <span key={i} className={`why__line why__line--${i}`}>
              {line}
            </span>
          ))}
        </h2>
        <div className="why__foot">
          <p data-reveal>{w.body}</p>
          <Link className="btn btn--accent" href={href(locale, "/contact")} data-reveal>
            {dict.common.requestQuote}
          </Link>
        </div>
      </div>
      <ul className="why__rows">
        {w.rows.map((row) => (
          <li className="why__row" key={row.title} data-reveal>
            <h3>{row.title}</h3>
            <p>{row.body}</p>
            <ul className="why__terms">
              {row.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
