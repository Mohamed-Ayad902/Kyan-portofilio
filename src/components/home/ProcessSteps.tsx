import Link from "next/link";

import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { Arrow } from "../Arrow";
import { SectionHead } from "../SectionHead";

/** Three steps as cards with a brand edge, in the order a request travels. */
export function ProcessSteps({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const p = dict.home.process;
  return (
    <section className="home-steps" aria-labelledby="process-title">
      <SectionHead id="process-title" title={p.heading} />
      <p className="section-lead" data-reveal>
        {p.body}
      </p>
      <ol className="home-steps__list">
        {p.zones.map((z, i) => (
          <li className="home-steps__item" key={z.name} data-reveal>
            <span className="home-steps__index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="home-steps__title">{z.name}</h3>
            <p>{z.body}</p>
          </li>
        ))}
      </ol>
      <Link className="arrow-link section-more" href={href(locale, "/rental-process")}>
        {p.link}
        <Arrow />
      </Link>
    </section>
  );
}
