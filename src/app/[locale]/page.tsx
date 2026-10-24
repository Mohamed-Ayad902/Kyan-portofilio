import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EquipmentGrid } from "@/components/home/EquipmentGrid";
import { HomeHero } from "@/components/home/HomeHero";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { Intro } from "@/components/home/Intro";
import { ProcessSteps } from "@/components/home/ProcessSteps";
import { ProjectsSlider } from "@/components/home/ProjectsSlider";
import { RentalModels } from "@/components/home/RentalModels";
import { Stats } from "@/components/home/Stats";
import { WhyKayan } from "@/components/home/WhyKayan";
import { FaqTable } from "@/components/FaqTable";
import { projects, projectSlugs } from "@/content/catalog";
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

  return (
    <>
      <HomeHero locale={locale} dict={dict} />
      <Stats dict={dict} />
      <Intro locale={locale} dict={dict} />
      <EquipmentGrid locale={locale} dict={dict} />
      <WhyKayan locale={locale} dict={dict} />
      <ProjectsSlider
        heading={dict.home.projects.headingLines.join(" ")}
        lead={dict.home.projects.lead}
        note={dict.projects.page.detailsOnRequest}
        readMore={dict.common.readMore}
        link={{ href: href(locale, "/projects"), label: dict.home.projects.link }}
        labels={{ previous: dict.common.previous, next: dict.common.next, slideOf: dict.home.hero.slideOf }}
        items={projectSlugs.map((slug) => ({
          slug,
          name: dict.projects.items[slug].name,
          sector: dict.projects.sectors[projects[slug].sector],
          image: projects[slug].media[0]!.image,
          href: `${href(locale, "/projects")}#${slug}`,
        }))}
      />
      <IndustriesGrid locale={locale} dict={dict} />
      <RentalModels locale={locale} dict={dict} />
      <ProcessSteps locale={locale} dict={dict} />
      <FaqTable
        heading={dict.home.faq.heading}
        items={dict.faq.items.slice(0, 5)}
        more={{ href: href(locale, "/faq"), label: dict.home.faq.link }}
      />
    </>
  );
}
