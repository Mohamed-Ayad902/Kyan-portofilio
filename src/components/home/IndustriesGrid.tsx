import Image from "next/image";
import Link from "next/link";

import { industryEquipment, industryImage, industrySlugs } from "@/content/catalog";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { Arrow } from "../Arrow";
import { SectionHead } from "../SectionHead";

/** The types of work, four across, each title over its picture with the machines it calls for. */
export function IndustriesGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.industries;
  return (
    <section className="tiles-section" aria-labelledby="industries-title">
      <SectionHead id="industries-title" title={t.heading} />
      <p className="section-lead" data-reveal>
        {t.note}
      </p>
      <ul className="tiles tiles--industries">
        {industrySlugs.map((slug) => (
          <li key={slug} data-reveal>
            <Link className="tile tile--tall" href={`${href(locale, "/industries")}#${slug}`}>
              <Image src={industryImage[slug]} alt="" sizes="(min-width: 1100px) 25vw, (min-width: 600px) 50vw, 100vw" placeholder="blur" />
              <span className="tile__text">
                <span className="tile__title">{dict.industries.items[slug].title}</span>
                <span className="tile__list">
                  {industryEquipment[slug].map((e) => (
                    <span key={e}>{dict.equipment.items[e].name}</span>
                  ))}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link className="arrow-link section-more" href={href(locale, "/industries")}>
        {t.link}
        <Arrow />
      </Link>
    </section>
  );
}
