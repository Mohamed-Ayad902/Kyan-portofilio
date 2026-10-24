import type { Metadata } from "next";
import Image from "next/image";

import excavator from "@/assets/images/excavator-site-desert.jpg";
import { CtaField } from "@/components/CtaField";
import { PageHead } from "@/components/PageHead";
import { projects, projectSlugs } from "@/content/catalog";
import { loadPage } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, dict, "/projects", dict.meta.projects);
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale, dict } = await loadPage(params);
  const p = dict.projects;
  return (
    <>
      <PageHead
        locale={locale}
        titleLines={[p.page.title]}
        lead={p.page.lead}
        band={{ kind: "split", image: excavator, alt: "", position: "50% 62%" }}
        crumbLabel={dict.common.breadcrumb}
        crumbs={[
          { name: dict.common.home, path: "/" },
          { name: dict.nav.projects, path: "/projects" },
        ]}
      />
      {projectSlugs.map((slug) => {
        const item = p.items[slug];
        return (
          <article className="project" id={slug} key={slug} aria-labelledby={`project-${slug}`}>
            <h2 id={`project-${slug}`} className="project__name" data-reveal>
              {item.name}
            </h2>
            <div className="project__meta" data-reveal>
              <dl>
                <div>
                  <dt>{p.page.sectorLabel}</dt>
                  <dd>{p.sectors[projects[slug].sector]}</dd>
                </div>
                {item.details.map((d) => (
                  <div key={d.label}>
                    <dt>{d.label}</dt>
                    <dd>{d.value}</dd>
                  </div>
                ))}
              </dl>
              {item.details.length === 0 ? <p className="project__note">{p.page.detailsOnRequest}</p> : null}
            </div>
            <div className="project__media">
              {projects[slug].media.map((m, i) => (
                <figure className="project__picture" key={i} data-reveal>
                  <Image src={m.image} alt={item.name} sizes="(min-width: 1024px) 50vw, 100vw" placeholder="blur" />
                  <figcaption className={m.credit ? "project__credit" : "visually-hidden"}>{m.credit ?? p.page.imageNote}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        );
      })}
      <CtaField locale={locale} dict={dict} heading={dict.home.contact.question} body={dict.home.contact.sentence} />
    </>
  );
}
