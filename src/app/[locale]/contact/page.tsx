import type { Metadata } from "next";
import { Suspense } from "react";

import crew from "@/assets/images/site-crew-concrete-deck.jpg";
import { PageHead } from "@/components/PageHead";
import { QuoteForm } from "@/components/QuoteForm";
import { equipmentSlugs } from "@/content/catalog";
import { loadPage } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";
import { company, mapsUrl, whatsappUrl } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, dict, "/contact", dict.meta.contact);
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale, dict } = await loadPage(params);
  const c = dict.contact;
  const wa = whatsappUrl();
  const equipment = equipmentSlugs.map((slug) => ({ value: slug, label: dict.equipment.items[slug].name }));

  return (
    <>
      <PageHead
        locale={locale}
        titleLines={c.titleLines}
        lead={c.lead}
        band={{ kind: "split", image: crew, alt: "", position: "50% 40%" }}
        crumbLabel={dict.common.breadcrumb}
        crumbs={[
          { name: dict.common.home, path: "/" },
          { name: dict.nav.contact, path: "/contact" },
        ]}
      />
      <div className="contact-layout">
        <aside className="contact-direct" aria-labelledby="direct">
          <h2 id="direct">{c.directHeading}</h2>
          <dl>
            <div>
              <dt>{c.phones}</dt>
              <dd>
                {company.phones.map((p) => (
                  <a key={p.e164} href={`tel:${p.e164}`} dir="ltr">
                    {p.display}
                  </a>
                ))}
              </dd>
            </div>
            <div>
              <dt>{c.emailLabel}</dt>
              <dd>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </dd>
            </div>
            <div>
              <dt>{c.address}</dt>
              <dd>
                <address>
                  {c.addressLines.map((line) => (
                    <span key={line} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </address>
              </dd>
            </div>
          </dl>
          <div className="contact-direct__quick">
            <a className="btn btn--plain" href={`tel:${company.phones[0]!.e164}`}>
              {dict.common.call}
            </a>
            {wa ? (
              <a className="btn btn--plain" href={wa} target="_blank" rel="noopener">
                {dict.common.whatsapp}
              </a>
            ) : null}
            <a className="btn btn--plain" href={mapsUrl} target="_blank" rel="noopener">
              {dict.common.openMap}
            </a>
          </div>
          <ul className="plain-list">
            {c.instructions.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </aside>
        <Suspense fallback={null}>
          <QuoteForm locale={locale} labels={c.form} equipment={equipment} />
        </Suspense>
      </div>
    </>
  );
}
