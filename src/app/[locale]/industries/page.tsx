import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import platforms from "@/assets/images/access-platforms-site.jpg";
import { CtaField } from "@/components/CtaField";
import { PageHead } from "@/components/PageHead";
import { industryEquipment, industryImage, industrySlugs } from "@/content/catalog";
import { href } from "@/lib/i18n";
import { loadPage } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/industries">): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, dict, "/industries", dict.meta.industries);
}

export default async function IndustriesPage({ params }: PageProps<"/[locale]/industries">) {
  const { locale, dict } = await loadPage(params);
  const ind = dict.industries;
  return (
    <>
      <PageHead
        locale={locale}
        titleLines={[ind.page.title]}
        lead={ind.page.lead}
        band={{ kind: "photo", image: platforms, alt: "", position: "50% 30%" }}
        crumbLabel={dict.common.breadcrumb}
        crumbs={[
          { name: dict.common.home, path: "/" },
          { name: dict.nav.industries, path: "/industries" },
        ]}
        aside={<p className="muted">{ind.page.guidanceNote}</p>}
      />
      <div className="industries-list">
        {industrySlugs.map((slug) => (
          <section className="industry" id={slug} key={slug} aria-labelledby={`ind-${slug}`}>
            <h2 id={`ind-${slug}`} data-reveal>
              {ind.items[slug].title}
            </h2>
            <p data-reveal>{ind.items[slug].body}</p>
            <p className="industry__label" data-reveal>
              {ind.page.equipmentLabel}
            </p>
            <ul className="industry__equipment" data-reveal>
              {industryEquipment[slug].map((e) => (
                <li key={e}>
                  <Link href={href(locale, `/equipment/${e}`)}>
                    {dict.equipment.items[e].name}
                  </Link>
                </li>
              ))}
            </ul>
            <figure className="industry__figure photo-figure">
              <Image src={industryImage[slug]} alt="" sizes="(min-width: 900px) 58vw, 100vw" placeholder="blur" />
            </figure>
          </section>
        ))}
      </div>
      <CtaField locale={locale} dict={dict} heading={dict.equipment.detail.ctaHeading} body={dict.equipment.detail.ctaBody} />
    </>
  );
}
