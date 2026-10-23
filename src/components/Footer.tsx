import Link from "next/link";

import { equipmentSlugs } from "@/content/catalog";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";
import { company, mapsUrl, whatsappUrl } from "@/lib/site";

import { primaryLinks } from "./Header";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pages = [
    ...primaryLinks(locale, dict),
    { href: href(locale, "/faq"), label: dict.nav.faq },
    { href: href(locale, "/contact"), label: dict.nav.contact },
  ];
  const wa = whatsappUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" data-theme-surface="inverse">
      <div className="site-footer__columns">
        <div className="site-footer__col site-footer__statement">
          <p>{dict.footer.statement}</p>
        </div>
        <div className="site-footer__col">
          <h2>{dict.footer.contactTitle}</h2>
          <ul>
            {company.phones.map((p) => (
              <li key={p.e164}>
                <a href={`tel:${p.e164}`} dir="ltr">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            {wa ? (
              <li>
                <a href={wa} rel="noopener" target="_blank">
                  {dict.common.whatsapp}
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <nav className="site-footer__col" aria-label={dict.common.footerNav}>
          <h2>{dict.footer.navTitle}</h2>
          <ul>
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-footer__col">
          <h2>{dict.footer.equipmentTitle}</h2>
          <ul>
            {equipmentSlugs.map((slug) => (
              <li key={slug}>
                <Link href={href(locale, `/equipment/${slug}`)}>{dict.equipment.items[slug].name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-footer__col">
          <h2>{dict.footer.officeTitle}</h2>
          <address>
            {dict.contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <a href={mapsUrl} rel="noopener" target="_blank">
            {dict.common.openMap}
          </a>
        </div>
      </div>
      <div className="site-footer__base">
        <svg className="site-footer__wordmark" viewBox="0 0 1000 205" role="img" aria-label="Kayan">
          <text x="500" y="187" textAnchor="middle" textLength="1000" lengthAdjust="spacingAndGlyphs">
            KA<tspan>Y</tspan>AN
          </text>
        </svg>
        <div className="site-footer__legal">
          <p>{dict.footer.legal.replace("{year}", String(year))}</p>
          <p>{dict.footer.imageCredit}</p>
        </div>
      </div>
    </footer>
  );
}
