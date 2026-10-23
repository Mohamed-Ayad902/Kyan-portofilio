import type { Dictionary } from "@/dictionaries/en";
import { href, localeMeta, type Locale } from "@/lib/i18n";
import { absolute } from "@/lib/seo";
import { company } from "@/lib/site";

const orgId = () => absolute("/#organization");

/** Organization + LocalBusiness: Kayan has a published office address and phone numbers. */
export function organizationLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": orgId(),
    name: dict.meta.siteName,
    alternateName: ["Kayan", "كيان"],
    url: absolute(href(locale)),
    logo: absolute("/kayan-logo.png"),
    image: absolute("/og/kayan-og.jpg"),
    description: dict.meta.defaultDescription,
    email: company.email,
    telephone: company.phones[0]?.e164,
    contactPoint: company.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.e164,
      contactType: "sales",
      areaServed: "EG",
      availableLanguage: ["en", "ar"],
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.district,
      addressRegion: company.address.city,
      addressCountry: company.address.countryCode,
    },
    areaServed: { "@type": "Country", name: "Egypt" },
    inLanguage: localeMeta[locale].htmlLang,
  };
}

export function breadcrumbLd(items: { name: string; path: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(href(locale, item.path)),
    })),
  };
}

export function serviceLd(locale: Locale, name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: absolute(href(locale, path)),
    provider: { "@id": orgId() },
    areaServed: { "@type": "Country", name: "Egypt" },
    inLanguage: localeMeta[locale].htmlLang,
  };
}

export function faqLd(items: { q: string; a: string }[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeMeta[locale].htmlLang,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
