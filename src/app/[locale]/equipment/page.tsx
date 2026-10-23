import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import platforms from "@/assets/images/site-loader-crane-forklift.jpg";
import { CtaField } from "@/components/CtaField";
import { EquipmentDrawing } from "@/components/EquipmentDrawing";
import { PageHead } from "@/components/PageHead";
import { equipment, equipmentFamilies, familyMembers } from "@/content/catalog";
import { href } from "@/lib/i18n";
import { loadPage } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/equipment">): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, dict, "/equipment", dict.meta.equipment);
}

export default async function EquipmentIndex({ params }: PageProps<"/[locale]/equipment">) {
  const { locale, dict } = await loadPage(params);
  const e = dict.equipment;
  return (
    <>
      <PageHead
        locale={locale}
        titleLines={[e.page.title]}
        lead={e.page.lead}
        band={{ kind: "photo", image: platforms, alt: "", position: "50% 45%" }}
        crumbLabel={dict.common.breadcrumb}
        crumbs={[
          { name: dict.common.home, path: "/" },
          { name: dict.nav.equipment, path: "/equipment" },
        ]}
        aside={<p className="muted">{e.page.verifyNote}</p>}
      />
      <div className="fleet">
        {equipmentFamilies.map((family) => (
          <section className="fleet__family" key={family} aria-labelledby={`family-${family}`}>
            <div className="fleet__family-head">
              <h2 id={`family-${family}`} data-reveal>
                {e.families[family].title}
              </h2>
              <p data-reveal>{e.families[family].sentence}</p>
            </div>
            <ul className="fleet__items">
              {familyMembers(family).map((slug) => {
                const item = e.items[slug];
                const photo = equipment[slug].photo;
                return (
                  <li key={slug} data-reveal>
                    <Link className="fleet__item" href={href(locale, `/equipment/${slug}`)}>
                      <div className="fleet__visual">
                        {photo ? (
                          <Image src={photo} alt="" sizes="(min-width: 1024px) 28vw, (min-width: 720px) 50vw, 100vw" placeholder="blur" />
                        ) : (
                          <EquipmentDrawing slug={slug} title="" />
                        )}
                      </div>
                      <div className="fleet__text">
                        <h3>{item.name}</h3>
                        <p>{item.short}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      <CtaField locale={locale} dict={dict} heading={e.detail.ctaHeading} body={e.detail.ctaBody} />
    </>
  );
}
