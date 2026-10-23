import { equipmentSlugs, rentalDurations } from "@/content/catalog";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { RequestSlip } from "./RequestSlip";

/** The colour page: the two rental arrangements, and the request slip that starts one. */
export function RentalModels({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const m = dict.home.models;
  return (
    <section className="models" aria-labelledby="models-title">
      <div className="models__text">
        <h2 id="models-title" className="section-title" data-reveal>
          {m.heading}
        </h2>
        <p className="lead" data-reveal>
          {m.body}
        </p>
        <dl className="models__pair">
          <div data-reveal>
            <dt>{m.short.title}</dt>
            <dd>{m.short.body}</dd>
          </div>
          <div data-reveal>
            <dt>{m.long.title}</dt>
            <dd>{m.long.body}</dd>
          </div>
        </dl>
        <p className="models__note" data-reveal>
          {m.operators}
        </p>
      </div>
      <div className="models__slip" data-reveal>
        <RequestSlip
          action={href(locale, "/contact")}
          labels={dict.home.slip}
          equipment={equipmentSlugs.map((slug) => ({ value: slug, label: dict.equipment.items[slug].name }))}
          durations={rentalDurations.map((d) => ({ value: d, label: dict.contact.form.durations[d] }))}
        />
      </div>
    </section>
  );
}
