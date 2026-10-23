import Image, { type StaticImageData } from "next/image";

import type { Locale } from "@/lib/i18n";

import { Breadcrumbs } from "./Breadcrumbs";
import { MaskedTitle } from "./MaskedTitle";

/** `tag` labels a stock photograph as illustrative, over the picture itself. */
type Band = { kind: "photo" | "split"; image: StaticImageData; alt: string; position?: string; tag?: string };

/** Inner-page masthead: a picture band across the top, then the title on the 42% axis. */
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
    <header className="page-head">
      <div className={`page-head__band ${band.kind === "split" ? "page-head__band--split" : ""}`}>
        <div className="page-head__photo">
          <Image
            src={band.image}
            alt={band.alt}
            preload
            fetchPriority="high"
            sizes={band.kind === "split" ? "67vw" : "100vw"}
            placeholder="blur"
            style={band.position ? { objectPosition: band.position } : undefined}
          />
          {band.tag ? <span className="media-tag">{band.tag}</span> : null}
        </div>
        {band.kind === "split" ? <div aria-hidden="true" /> : null}
      </div>
      <div className="page-head__body">
        <Breadcrumbs locale={locale} label={crumbLabel} items={crumbs} />
        <MaskedTitle as="h1" className="page-head__title" lines={titleLines} />
        {aside ? <div className="page-head__aside">{aside}</div> : null}
        {lead ? <p className="page-head__lead">{lead}</p> : null}
      </div>
    </header>
  );
}
