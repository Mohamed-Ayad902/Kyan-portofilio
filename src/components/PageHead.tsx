import Image, { type StaticImageData } from "next/image";

import type { Locale } from "@/lib/i18n";

import { Breadcrumbs } from "./Breadcrumbs";
import { MaskedTitle } from "./MaskedTitle";

/** `tag` labels a stock photograph as illustrative, over the picture itself. `kind` is kept for callers; both render full bleed. */
type Band = { kind: "photo" | "split"; image: StaticImageData; alt: string; position?: string; tag?: string };

/**
 * Inner-page masthead: a full-bleed photograph under the floating header, with the breadcrumbs and
 * title in condensed capitals over its lower edge, cut by the same V as the home masthead.
 */
export function PageHead({
  locale,
  titleLines,
  lead,
  band,
  crumbs,
  crumbLabel,
  aside,
}: {
  locale: Locale;
  titleLines: readonly string[];
  lead?: string;
  band: Band;
  crumbs: { name: string; path: string }[];
  crumbLabel: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="page-head" data-overlay-head>
      <div className="page-head__band">
        <div className="page-head__photo">
          <Image
            src={band.image}
            alt={band.alt}
            preload
            fetchPriority="high"
            sizes="100vw"
            placeholder="blur"
            style={band.position ? { objectPosition: band.position } : undefined}
          />
          {band.tag ? <span className="media-tag">{band.tag}</span> : null}
        </div>
        <div className="page-head__over">
          <Breadcrumbs locale={locale} label={crumbLabel} items={crumbs} />
          <MaskedTitle as="h1" className="page-head__title" lines={titleLines} />
        </div>
      </div>
      {aside || lead ? (
        <div className="page-head__body">
          {lead ? <p className="page-head__lead">{lead}</p> : null}
          {aside ? <div className="page-head__aside">{aside}</div> : null}
        </div>
      ) : null}
    </header>
  );
}
