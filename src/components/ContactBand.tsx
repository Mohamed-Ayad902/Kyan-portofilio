import Image from "next/image";
import Link from "next/link";

import crew from "@/assets/images/site-crew-concrete-deck.jpg";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";
import { company, whatsappUrl } from "@/lib/site";

/** Closing row: the invitation, one photograph of the work, and the ways to reach Kayan. */
export function ContactBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.home.contact;
  const wa = whatsappUrl();
  return (
    <section className="contact-band" aria-labelledby="contact-band-title">
      <p className="contact-band__sentence" data-reveal>
        {c.sentence}
      </p>
      <div className="contact-band__picture" data-reveal>
        <Image src={crew} alt="" sizes="(min-width: 1024px) 170px, 96px" placeholder="blur" />
      </div>
      <div className="contact-band__links" data-reveal>
        <h2 id="contact-band-title" className="contact-band__question">
          {c.question}
        </h2>
        <ul>
          <li>
            <a href={`tel:${company.phones[0]!.e164}`} dir="ltr">
              {company.phones[0]!.display}
            </a>
          </li>
          <li>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </li>
          {wa ? (
            <li>
              <a href={wa} target="_blank" rel="noopener">
                {dict.common.whatsapp}
              </a>
            </li>
          ) : null}
        </ul>
        <Link className="btn btn--accent" href={href(locale, "/contact")}>
          {dict.common.requestQuote}
        </Link>
        <p className="contact-band__city">{c.cityLine}</p>
      </div>
    </section>
  );
}
