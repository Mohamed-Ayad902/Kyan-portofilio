import type { Metadata } from "next";
import Image from "next/image";

import crew from "@/assets/images/site-crew-concrete-deck.jpg";
import fleet from "@/assets/images/excavator-fleet-row.jpg";
import { CtaField } from "@/components/CtaField";
import { PageHead } from "@/components/PageHead";
import { loadPage } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, dict, "/about", dict.meta.about);
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale, dict } = await loadPage(params);
  const a = dict.about;
  return (
    <>
      <PageHead
        locale={locale}
        titleLines={a.titleLines}
        lead={a.lead}
        band={{ kind: "photo", image: crew, alt: "", position: "50% 35%" }}
        crumbLabel={dict.common.breadcrumb}
        crumbs={[
          { name: dict.common.home, path: "/" },
          { name: dict.nav.about, path: "/about" },
        ]}
      />

      <section className="axis-section" aria-labelledby="overview">
        <p className="axis-section__side" data-reveal>
          {dict.home.contact.cityLine}
        </p>
        <h2 id="overview" className="axis-section__title" data-reveal>
          {a.overviewHeading}
        </h2>
        <div className="axis-section__body columns-2">
          {a.overview.map((p) => (
            <p key={p} data-reveal>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className="axis-section" aria-labelledby="market">
        <h2 id="market" className="axis-section__title" data-reveal>
          {a.marketHeading}
        </h2>
        <div className="axis-section__body">
          <p className="lead" data-reveal>
            {a.market}
          </p>
        </div>
      </section>
      <figure className="wide-figure" data-reveal>
        <Image src={fleet} alt={dict.equipment.items.excavators.name} sizes="100vw" placeholder="blur" data-parallax />
      </figure>

      <section className="axis-section" aria-labelledby="approach">
        <h2 id="approach" className="axis-section__title" data-reveal>
          {a.approachHeading}
        </h2>
        <ul className="axis-section__body terms">
          {a.approach.map((item) => (
            <li key={item.title} data-reveal>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="priorities" aria-labelledby="priorities">
        <h2 id="priorities" className="section-title" data-reveal>
          {a.prioritiesHeading}
        </h2>
        <ul className="priorities__list">
          {a.priorities.map((item) => (
            <li key={item.title} data-reveal>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="axis-section" aria-labelledby="delivery">
        <h2 id="delivery" className="axis-section__title" data-reveal>
          {a.deliveryHeading}
        </h2>
        <div className="axis-section__body">
          <p className="lead" data-reveal>
            {a.delivery}
          </p>
        </div>
      </section>

      <CtaField locale={locale} dict={dict} heading={dict.home.contact.question} body={dict.home.contact.sentence} />
    </>
  );
}
