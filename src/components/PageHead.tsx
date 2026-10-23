import Image, { type StaticImageData } from "next/image";

import type { EquipmentSlug } from "@/content/catalog";
import type { Locale } from "@/lib/i18n";

import { Breadcrumbs } from "./Breadcrumbs";
import { EquipmentDrawing } from "./EquipmentDrawing";
import { MaskedTitle } from "./MaskedTitle";

type Band =
  | { kind: "photo"; image: StaticImageData; alt: string; position?: string }
  | { kind: "split"; image: StaticImageData; alt: string; position?: string }
  | { kind: "drawing"; slug: EquipmentSlug; title: string };

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
      {band.kind === "drawing" ? (
        <div className="page-head__band page-head__band--drawing">
          <EquipmentDrawing slug={band.slug} title={band.title} />
        </div>
      ) : (
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
          </div>
          {band.kind === "split" ? <div aria-hidden="true" /> : null}
        </div>
      )}
      <div className="page-head__body">
        <Breadcrumbs locale={locale} label={crumbLabel} items={crumbs} />
        <MaskedTitle as="h1" className="page-head__title" lines={titleLines} />
        {aside ? <div className="page-head__aside">{aside}</div> : null}
        {lead ? <p className="page-head__lead">{lead}</p> : null}
      </div>
    </header>
  );
}
