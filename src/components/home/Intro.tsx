import Image from "next/image";
import Link from "next/link";

import crew from "@/assets/images/site-crew-concrete-deck.jpg";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { Arrow } from "../Arrow";

/** Photograph cut to a plate shape against the start edge, statement and link beside it. */
export function Intro({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.home.intro;
  return (
    <section className="intro" aria-labelledby="intro-title">
      <figure className="intro__picture plate">
        <Image src={crew} alt="" sizes="(min-width: 900px) 48vw, 100vw" placeholder="blur" data-parallax />
      </figure>
      <div className="intro__copy">
        <h2 id="intro-title" className="wide-title" data-reveal>
          {t.headingLines.join(" ")}
        </h2>
        <p data-reveal>{t.body}</p>
        <p className="muted" data-reveal>
          {t.secondary}
        </p>
        <Link className="arrow-link" href={href(locale, "/about")} data-reveal>
          {t.link}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
