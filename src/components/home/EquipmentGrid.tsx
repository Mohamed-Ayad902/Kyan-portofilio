import Image from "next/image";
import Link from "next/link";

import { equipment, equipmentSlugs } from "@/content/catalog";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { Arrow } from "../Arrow";
import { SectionHead } from "../SectionHead";

/** Nine photograph tiles, three across: the name in wide capitals over the picture, a line below it. */
export function EquipmentGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const s = dict.home.showcase;
  return (
    <section className="tiles-section" aria-labelledby="equipment-title">
      <SectionHead id="equipment-title" title={s.heading} />
      <p className="section-lead" data-reveal>
        {s.lead}
      </p>
      <ul className="tiles tiles--equipment">
        {equipmentSlugs.map((slug) => {
          const item = dict.equipment.items[slug];
          return (
            <li key={slug} data-reveal>
              <Link className="tile" href={href(locale, `/equipment/${slug}`)}>
                <Image src={equipment[slug].photo} alt="" sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw" placeholder="blur" />
                <span className="tile__text">
                  <span className="tile__title">{item.name}</span>
                  <span className="tile__body">{item.short}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link className="arrow-link section-more" href={href(locale, "/equipment")}>
        {dict.common.allEquipment}
        <Arrow />
      </Link>
    </section>
  );
}
