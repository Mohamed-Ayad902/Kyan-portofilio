import { equipmentSlugs, industrySlugs, projectSlugs } from "@/content/catalog";
import type { Dictionary } from "@/dictionaries/en";

/**
 * Figures strip under the masthead. Every number is counted from the site's own catalogue (no
 * invented totals): categories, types of work, portfolio projects, and the two rental models.
 */
export function Stats({ dict }: { dict: Dictionary }) {
  const s = dict.home.stats;
  const figures = [
    { value: equipmentSlugs.length, label: s.equipment },
    { value: industrySlugs.length, label: s.industries },
    { value: projectSlugs.length, label: s.projects },
    { value: 2, label: s.models },
  ];
  return (
    <section className="stats" aria-label={s.label}>
      <dl className="stats__list">
        {figures.map((f) => (
          <div className="stats__item" key={f.label} data-reveal>
            <dt className="stats__label">{f.label}</dt>
            <dd className="stats__value" data-count={f.value}>
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
