import Image from "next/image";
import Link from "next/link";

import platforms from "@/assets/images/access-platforms-site.jpg";
import cranes from "@/assets/images/mobile-cranes-cluster.jpg";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { MaskedTitle } from "../MaskedTitle";
import { HeroVideo } from "./HeroVideo";

/**
 * Mosaic masthead with the title on the axis: an illustrative stock clip in the lead cell, butted
 * against a flat brand tile and portfolio photographs.
 */
export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.home.hero;
  const items = dict.equipment.items;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="mosaic" role="group" aria-label={h.mosaicLabel}>
        <div className="mosaic__cell mosaic__cell--lead">
          <HeroVideo label={h.videoLabel} pause={dict.common.pauseVideo} play={dict.common.playVideo} />
        </div>
        <div className="mosaic__cell mosaic__cell--accent" />
        <div className="mosaic__cell mosaic__cell--platforms">
          <Image src={platforms} alt={`${items.manlifts.name}, ${items["scissor-lifts"].name}`} sizes="(min-width: 768px) 34vw, 33vw" placeholder="blur" />
        </div>
        <div className="mosaic__cell mosaic__cell--crane">
          <Image src={cranes} alt={items.cranes.name} sizes="(min-width: 768px) 17vw, 33vw" placeholder="blur" />
        </div>
      </div>

      <div className="hero__body">
        <MaskedTitle as="h1" id="hero-title" className="hero__title" lines={h.titleLines} />
        <div className="hero__aside">
          <p className="hero__standfirst">{h.standfirst}</p>
          <div className="hero__actions">
            <Link className="btn btn--accent btn--large" href={href(locale, "/contact")}>
              {dict.common.requestQuote}
            </Link>
            <Link className="text-link" href={href(locale, "/equipment")}>
              {dict.common.explore}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
