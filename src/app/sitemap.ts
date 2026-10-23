import type { MetadataRoute } from "next";

import { equipmentSlugs } from "@/content/catalog";
import { href, hreflang, locales } from "@/lib/i18n";
import { absolute } from "@/lib/seo";

const staticPaths = ["/", "/about", "/equipment", "/industries", "/projects", "/rental-process", "/faq", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...equipmentSlugs.map((slug) => `/equipment/${slug}`)];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absolute(href(locale, path)),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path.startsWith("/equipment") || path === "/contact" ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((l) => [hreflang[l], absolute(href(l, path))]),
          ["x-default", absolute(href("en", path))],
        ]),
      },
    })),
  );
}
