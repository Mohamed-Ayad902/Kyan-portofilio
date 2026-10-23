import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CtaField } from "@/components/CtaField";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { equipment, equipmentSlugs, familyMembers, isEquipmentSlug } from "@/content/catalog";
import { getDictionary } from "@/dictionaries";
import { hasLocale, href, locales } from "@/lib/i18n";
import { serviceLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) => equipmentSlugs.map((slug) => ({ locale, slug })));
}
export const dynamicParams = false;

async function load(params: Promise<{ locale: string; slug: string }>) {
  const { locale, slug } = await params;
  if (!hasLocale(locale) || !isEquipmentSlug(slug)) notFound();
  return { locale, slug, dict: await getDictionary(locale) };
}

export async function generateMetadata({ params }: PageProps<"/[locale]/equipment/[slug]">): Promise<Metadata> {
  const { locale, slug, dict } = await load(params);
  const item = dict.equipment.items[slug];
  return pageMetadata(locale, dict, `/equipment/${slug}`, { title: item.seoTitle, description: item.seoDescription });
}

export default async function EquipmentPage({ params }: PageProps<"/[locale]/equipment/[slug]">) {
  const { locale, slug, dict } = await load(params);
  const e = dict.equipment;
  const item = e.items[slug];
  const media = equipment[slug];
  const path = `/equipment/${slug}`;
  const related = familyMembers(media.family).filter((s) => s !== slug);

  return (
    <>
      <PageHead
        locale={locale}
        titleLines={[item.name]}
        lead={item.intro}
        band={
          media.scene
            ? { kind: "split", image: media.scene, alt: item.name }
            : { kind: "split", image: media.photo, alt: item.singular, tag: dict.common.illustrative }
        }
        crumbLabel={dict.common.breadcrumb}
        crumbs={[
          { name: dict.common.home, path: "/" },
          { name: dict.nav.equipment, path: "/equipment" },
          { name: item.name, path },
        ]}
        aside={
          <>
            <p className="muted">{e.families[media.family].title}</p>
            <Link className="btn btn--accent" href={`${href(locale, "/contact")}?equipment=${slug}`}>
              {dict.common.requestQuote}
            </Link>
          </>
        }
      />

      <section className="axis-section" aria-labelledby="applications">
        {media.scene ? (
          <figure className="axis-section__side photo-figure" data-reveal>
            <Image src={media.photo} alt={item.singular} sizes="(min-width: 900px) 30vw, 100vw" placeholder="blur" />
            <figcaption>{dict.common.illustrative}</figcaption>
          </figure>
        ) : (
          <p className="axis-section__side" data-reveal>
            {e.detail.photoNote}
          </p>
        )}
        <h2 id="applications" className="axis-section__title" data-reveal>
          {e.detail.applications}
        </h2>
        <div className="axis-section__body">
          <ul className="plain-list" data-reveal>
            {item.applications.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="axis-section" aria-labelledby="specifics">
        <h2 id="specifics" className="visually-hidden">
          {e.detail.requirements}
        </h2>
        <div className="axis-section__body spec">
          <div className="spec__block" data-reveal>
            <h3 className="spec__heading">{e.detail.requirements}</h3>
            <ul className="plain-list">
              {item.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="spec__block" data-reveal>
            <h3 className="spec__heading">{e.detail.considerations}</h3>
            <ul className="plain-list">
              {item.considerations.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="axis-section" aria-labelledby="availability">
        <h2 id="availability" className="axis-section__title" data-reveal>
          {e.detail.specs}
        </h2>
        <div className="axis-section__body">
          <p className="lead" data-reveal>
            {e.detail.specsBody}
          </p>
        </div>
      </section>

      {related.length ? (
        <nav className="related" aria-labelledby="related">
          <h2 id="related" data-reveal>
            {e.detail.related}
          </h2>
          <ul>
            {related.map((s) => (
              <li key={s} data-reveal>
                <Link href={href(locale, `/equipment/${s}`)}>{e.items[s].name}</Link>
              </li>
            ))}
            <li data-reveal>
              <Link href={href(locale, "/equipment")}>{dict.common.allEquipment}</Link>
            </li>
          </ul>
        </nav>
      ) : null}

      <CtaField locale={locale} dict={dict} heading={e.detail.ctaHeading} body={e.detail.ctaBody} query={`equipment=${slug}`} />
      <JsonLd data={serviceLd(locale, item.seoTitle, item.seoDescription, path)} />
    </>
  );
}
