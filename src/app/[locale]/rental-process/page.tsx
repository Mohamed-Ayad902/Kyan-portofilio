import type { Metadata } from "next";

import mixed from "@/assets/images/site-loader-crane-forklift.jpg";
import { CtaField } from "@/components/CtaField";
import { PageHead } from "@/components/PageHead";
import { loadPage } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/rental-process">): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, dict, "/rental-process", dict.meta.process);
}

export default async function ProcessPage({ params }: PageProps<"/[locale]/rental-process">) {
  const { locale, dict } = await loadPage(params);
  const p = dict.process;
  const c = p.compare;
  return (
    <>
      <PageHead
        locale={locale}
        titleLines={p.titleLines}
        lead={p.lead}
        band={{ kind: "split", image: mixed, alt: "", position: "60% 40%" }}
        crumbLabel={dict.common.breadcrumb}
        crumbs={[
          { name: dict.common.home, path: "/" },
          { name: dict.nav.process, path: "/rental-process" },
        ]}
        aside={<p className="muted">{p.guidance}</p>}
      />

      <section className="axis-section" aria-labelledby="steps">
        <h2 id="steps" className="axis-section__title" data-reveal>
          {dict.home.process.heading}
        </h2>
        <ol className="axis-section__body steps">
          {p.steps.map((step) => (
            <li key={step.title} data-reveal>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="axis-section" aria-labelledby="models">
        <h2 id="models" className="axis-section__title" data-reveal>
          {p.modelsHeading}
        </h2>
        <div className="axis-section__body table-scroll" data-reveal>
          <table className="compare">
            <caption>{c.caption}</caption>
            <thead>
              <tr>
                <td />
                <th scope="col">{c.short}</th>
                <th scope="col">{c.long}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td data-label={c.short}>{row.short}</td>
                  <td data-label={c.long}>{row.long}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="axis-section" aria-labelledby="prepare">
        <h2 id="prepare" className="axis-section__title" data-reveal>
          {p.prepareHeading}
        </h2>
        <div className="axis-section__body">
          <ul className="plain-list" data-reveal>
            {p.prepare.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <CtaField locale={locale} dict={dict} heading={dict.equipment.detail.ctaHeading} body={dict.equipment.detail.ctaBody} />
    </>
  );
}
