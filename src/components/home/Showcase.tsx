import Image from "next/image";
import Link from "next/link";

import { equipment, equipmentFamilies, familyField, familyMembers } from "@/content/catalog";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

/**
 * One full-bleed chapter per equipment family, as the portfolio groups them. Each chapter's
 * figure is a set of illustrative stock photographs, every one a link to its equipment page.
 */
export function Showcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="showcase" aria-labelledby="showcase-title">
      <div className="showcase__intro">
        <h2 id="showcase-title" className="section-title" data-reveal>
          {dict.home.showcase.heading}
        </h2>
        <p className="lead" data-reveal>
          {dict.home.showcase.lead}
        </p>
      </div>
      {equipmentFamilies.map((family) => {
        const f = dict.equipment.families[family];
        const members = familyMembers(family);
        return (
          <article className="chapter" data-chapter key={family} aria-labelledby={`chapter-${family}`}>
            <div className="chapter__panel" data-chapter-panel style={{ "--field": familyField[family] } as React.CSSProperties}>
              <h3 id={`chapter-${family}`} className="chapter__title">
                {f.title}
              </h3>
              <ul className={`chapter__figure chapter__figure--${members.length}`} data-chapter-picture>
                {members.map((slug) => (
                  <li key={slug}>
                    <Link href={href(locale, `/equipment/${slug}`)} className="chapter__machine">
                      <span className="chapter__photo">
                        <Image src={equipment[slug].photo} alt="" sizes="(min-width: 1024px) 26vw, 50vw" placeholder="blur" />
                      </span>
                      <span className="chapter__name">{dict.equipment.items[slug].name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="chapter__sentence">
                {f.sentence}
                <span className="chapter__note">{dict.common.illustrative}</span>
              </p>
              <Link className="chapter__all" href={href(locale, "/equipment")}>
                {dict.common.allEquipment}
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}
