import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactBand } from "@/components/ContactBand";
import { EquipmentTicker } from "@/components/home/EquipmentTicker";
import { HomeHero } from "@/components/home/HomeHero";
import { IndustriesDeck } from "@/components/home/IndustriesDeck";
import { Intro } from "@/components/home/Intro";
import { ProcessDiagram } from "@/components/home/ProcessDiagram";
import { ProjectsIndex } from "@/components/home/ProjectsIndex";
import { RentalModels } from "@/components/home/RentalModels";
import { Showcase } from "@/components/home/Showcase";
import { WhyKayan } from "@/components/home/WhyKayan";
import { FaqTable } from "@/components/FaqTable";
import { equipmentSlugs, industryEquipment, industryImage, industrySlugs, projects, projectSlugs } from "@/content/catalog";
import { getDictionary } from "@/dictionaries";
import { hasLocale, href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return pageMetadata(locale, dict, "/", { ...dict.meta.home, absoluteTitle: true });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const p = dict.home.process;

  return (
    <>
      <HomeHero locale={locale} dict={dict} />
      <EquipmentTicker
        label={dict.nav.equipment}
        items={equipmentSlugs.map((slug) => ({ href: href(locale, `/equipment/${slug}`), name: dict.equipment.items[slug].name }))}
      />
      <Intro locale={locale} dict={dict} />
      <Showcase locale={locale} dict={dict} />
      <IndustriesDeck
        heading={dict.home.industries.heading}
        note={dict.home.industries.note}
        link={{ href: href(locale, "/industries"), label: dict.home.industries.link }}
        equipmentLabel={dict.industries.page.equipmentLabel}
        cards={industrySlugs.map((slug) => ({
          slug,
          title: dict.industries.items[slug].title,
          body: dict.industries.items[slug].body,
          image: industryImage[slug],
          equipment: industryEquipment[slug].map((e) => ({ name: dict.equipment.items[e].name, href: href(locale, `/equipment/${e}`) })),
        }))}
      />
      <WhyKayan locale={locale} dict={dict} />
      <RentalModels locale={locale} dict={dict} />
      <ProjectsIndex
        headingLines={dict.home.projects.headingLines}
        lead={dict.home.projects.lead}
        link={{ href: href(locale, "/projects"), label: dict.home.projects.link }}
        items={projectSlugs.map((slug) => ({
          slug,
          name: dict.projects.items[slug].name,
          sector: dict.projects.sectors[projects[slug].sector],
          image: projects[slug].media[0]!.image,
          href: `${href(locale, "/projects")}#${slug}`,
        }))}
      />
      <section className="process" aria-labelledby="process-title">
        <div className="process__head">
          <h2 id="process-title" className="section-title" data-reveal>
            {p.heading}
          </h2>
          <p data-reveal>{p.body}</p>
        </div>
        <div className="process__figure" data-reveal>
          <ProcessDiagram label={p.figureLabel} />
        </div>
        <ol className="process__zones">
          {p.zones.map((z) => (
            <li key={z.name} data-reveal>
              <h3>{z.name}</h3>
              <p>{z.body}</p>
            </li>
          ))}
        </ol>
        <Link className="text-link" href={href(locale, "/rental-process")} data-reveal>
          {p.link}
        </Link>
      </section>
      <FaqTable
        heading={dict.home.faq.heading}
        items={dict.faq.items.slice(0, 5)}
        more={{ href: href(locale, "/faq"), label: dict.home.faq.link }}
      />
      <ContactBand locale={locale} dict={dict} />
    </>
  );
}
