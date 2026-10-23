import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactBand } from "@/components/ContactBand";
import { FaqTable } from "@/components/FaqTable";
import { JsonLd } from "@/components/JsonLd";
import { faqLd } from "@/lib/jsonld";
import { loadPage } from "@/lib/page";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const { locale, dict } = await loadPage(params);
  return pageMetadata(locale, dict, "/faq", dict.meta.faq);
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale, dict } = await loadPage(params);
  return (
    <>
      <div className="faq-page__head">
        <Breadcrumbs
          locale={locale}
          label={dict.common.breadcrumb}
          items={[
            { name: dict.common.home, path: "/" },
            { name: dict.nav.faq, path: "/faq" },
          ]}
        />
        <p className="lead">{dict.faq.lead}</p>
      </div>
      <FaqTable as="h1" heading={dict.faq.title} items={dict.faq.items} />
      <ContactBand locale={locale} dict={dict} />
      <JsonLd data={faqLd(dict.faq.items, locale)} />
    </>
  );
}
