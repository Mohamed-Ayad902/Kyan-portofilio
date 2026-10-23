import Image from "next/image";
import Link from "next/link";

import crew from "@/assets/images/site-crew-concrete-deck.jpg";
import fleet from "@/assets/images/excavator-fleet-row.jpg";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

/** The heading's second line crosses onto the photograph; a smaller picture answers it below. */
export function Intro({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.intro;
  return (
    <section className="intro" aria-labelledby="intro-title">
      <figure className="intro__picture">
        <Image src={crew} alt="" sizes="(min-width: 1024px) 50vw, 75vw" placeholder="blur" data-parallax />
      </figure>
      <h2 id="intro-title" className="intro__title" data-reveal>
        <span>{t.headingLines[0]}</span> <span className="intro__title-cross">{t.headingLines[1]}</span>
      </h2>
      <div className="intro__copy">
        <p className="lead" data-reveal>
          {t.body}
        </p>
        <p data-reveal>{t.secondary}</p>
        <Link className="text-link" href={href(locale, "/about")} data-reveal>
          {t.link}
        </Link>
      </div>
      <figure className="intro__small" data-reveal>
        <Image src={fleet} alt="" sizes="(min-width: 1024px) 28vw, 50vw" placeholder="blur" />
      </figure>
    </section>
  );
}
