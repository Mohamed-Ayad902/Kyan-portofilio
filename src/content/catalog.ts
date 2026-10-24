import type { StaticImageData } from "next/image";

import accessPlatforms from "@/assets/images/access-platforms-site.jpg";
import excavatorFleet from "@/assets/images/excavator-fleet-row.jpg";
import cbd1 from "@/assets/images/project-media/cbd-1.jpg";
import cbd2 from "@/assets/images/project-media/cbd-2.jpg";
import cbd3 from "@/assets/images/project-media/cbd-3.jpg";
import alamein1 from "@/assets/images/project-media/alamein-1.jpg";
import alamein2 from "@/assets/images/project-media/alamein-2.jpg";
import alamein3 from "@/assets/images/project-media/alamein-3.jpg";
import sunrev1 from "@/assets/images/project-media/sunrev-1.jpg";
import sunrev2 from "@/assets/images/project-media/sunrev-2.jpg";
import sunrev3 from "@/assets/images/project-media/sunrev-3.jpg";
import sunrev4 from "@/assets/images/project-media/sunrev-4.jpg";
import elite1 from "@/assets/images/project-media/elite-1.jpg";
import elite2 from "@/assets/images/project-media/elite-2.jpg";
import elite3 from "@/assets/images/project-media/elite-3.jpg";
import elite4 from "@/assets/images/project-media/elite-4.jpg";
import sailun1 from "@/assets/images/project-media/sailun-1.jpg";
import sailun2 from "@/assets/images/project-media/sailun-2.jpg";
import sailun3 from "@/assets/images/project-media/sailun-3.jpg";
import siteMixed from "@/assets/images/site-loader-crane-forklift.jpg";
import bulldozers from "@/assets/images/stock/equipment-bulldozers.jpg";
import clarks from "@/assets/images/stock/equipment-clarks.jpg";
import cranes from "@/assets/images/stock/equipment-cranes.jpg";
import dumpTrucks from "@/assets/images/stock/equipment-dump-trucks.jpg";
import excavators from "@/assets/images/stock/equipment-excavators.jpg";
import forklifts from "@/assets/images/stock/equipment-forklifts.jpg";
import manlifts from "@/assets/images/stock/equipment-manlifts.jpg";
import rollers from "@/assets/images/stock/equipment-rollers.jpg";
import scissorLifts from "@/assets/images/stock/equipment-scissor-lifts.jpg";
import indConstruction from "@/assets/images/stock/industry-construction.jpg";
import indEarthworks from "@/assets/images/stock/industry-earthworks.jpg";
import indElevated from "@/assets/images/stock/industry-elevated-access.jpg";
import indIndustrial from "@/assets/images/stock/industry-industrial.jpg";
import indInfrastructure from "@/assets/images/stock/industry-infrastructure.jpg";
import indHandling from "@/assets/images/stock/industry-material-handling.jpg";
import indRoadwork from "@/assets/images/stock/industry-roadwork.jpg";
import indSolar from "@/assets/images/stock/industry-solar.jpg";

/**
 * Structural content: slugs, groupings and media. All words live in the dictionaries
 * (src/dictionaries/*), keyed by these slugs, so each language is edited in one file.
 */

export const equipmentFamilies = ["earthmoving", "lifting", "access"] as const;
export type EquipmentFamily = (typeof equipmentFamilies)[number];

export const equipmentSlugs = [
  "excavators",
  "bulldozers",
  "dump-trucks",
  "rollers",
  "cranes",
  "forklifts",
  "clarks",
  "manlifts",
  "scissor-lifts",
] as const;
export type EquipmentSlug = (typeof equipmentSlugs)[number];

export const isEquipmentSlug = (value: string): value is EquipmentSlug =>
  (equipmentSlugs as readonly string[]).includes(value);

/**
 * Media for each category. `photo` is a licensed stock photograph (Pexels, see
 * src/assets/images/stock/CREDITS.md): it shows the kind of machine, never a Kayan unit, and is
 * always captioned as illustrative. `scene` is a site photograph from Kayan's portfolio, where one
 * exists; pages without one use the stock photo in the masthead instead.
 */
export const equipment: Record<
  EquipmentSlug,
  { family: EquipmentFamily; photo: StaticImageData; scene: StaticImageData | null }
> = {
  excavators: { family: "earthmoving", photo: excavators, scene: excavatorFleet },
  bulldozers: { family: "earthmoving", photo: bulldozers, scene: null },
  "dump-trucks": { family: "earthmoving", photo: dumpTrucks, scene: null },
  rollers: { family: "earthmoving", photo: rollers, scene: null },
  cranes: { family: "lifting", photo: cranes, scene: siteMixed },
  forklifts: { family: "lifting", photo: forklifts, scene: null },
  clarks: { family: "lifting", photo: clarks, scene: null },
  manlifts: { family: "access", photo: manlifts, scene: accessPlatforms },
  "scissor-lifts": { family: "access", photo: scissorLifts, scene: null },
};

export const familyMembers = (family: EquipmentFamily): EquipmentSlug[] =>
  equipmentSlugs.filter((slug) => equipment[slug].family === family);

export const projectSlugs = ["cbd", "alamein-downtown-towers", "sunrev-solar", "elite-solar", "sailun-egypt-tyre"] as const;
export type ProjectSlug = (typeof projectSlugs)[number];

/** One picture of a project. `credit` is printed under it when the picture is not Kayan's own. */
export type ProjectMedia = { image: StaticImageData; credit?: string };

/**
 * Projects named in Kayan's portfolio. `media` is an ordered list of pictures of the project
 * itself, chosen by the owner from press and partner sources; each `credit` names its source. The
 * first entry leads wherever a single picture is shown; the projects page shows them all. Record
 * every picture in src/assets/images/CREDITS.md. Scope, dates, location and equipment supplied are
 * not documented yet — add them to the dictionaries' `projects.items[slug].details` once Kayan confirms them; the
 * pages render those fields only when present.
 */
export const projects: Record<ProjectSlug, { media: ProjectMedia[]; sector: "commercial" | "highrise" | "solar" | "industrial" }> = {
  cbd: { media: [{ image: cbd1, credit: "Facebook" }, { image: cbd2, credit: "CSCEC" }, { image: cbd3, credit: "Africa Intelligence" }], sector: "commercial" },
  "alamein-downtown-towers": { media: [{ image: alamein1, credit: "City Edge Developments" }, { image: alamein2, credit: "realestate.gov.eg" }, { image: alamein3, credit: "realestate.gov.eg" }], sector: "highrise" },
  "sunrev-solar": { media: [{ image: sunrev1, credit: "pv magazine" }, { image: sunrev2, credit: "TaiyangNews" }, { image: sunrev3, credit: "Seetao" }, { image: sunrev4, credit: "Seetao" }], sector: "solar" },
  "elite-solar": { media: [{ image: elite1, credit: "Daily News Egypt" }, { image: elite2, credit: "LinkedIn" }, { image: elite3, credit: "LinkedIn" }, { image: elite4, credit: "ent.news" }], sector: "solar" },
  "sailun-egypt-tyre": { media: [{ image: sailun1, credit: "SCZONE" }, { image: sailun2, credit: "Automir" }, { image: sailun3, credit: "Facebook" }], sector: "industrial" },
};

export const industrySlugs = [
  "construction",
  "infrastructure",
  "solar",
  "industrial",
  "earthworks",
  "material-handling",
  "roadwork",
  "elevated-access",
] as const;
export type IndustrySlug = (typeof industrySlugs)[number];

/** Illustrative stock photograph for each industry (Pexels). Not a Kayan project. */
export const industryImage: Record<IndustrySlug, StaticImageData> = {
  construction: indConstruction,
  infrastructure: indInfrastructure,
  solar: indSolar,
  industrial: indIndustrial,
  earthworks: indEarthworks,
  "material-handling": indHandling,
  roadwork: indRoadwork,
  "elevated-access": indElevated,
};

export const industryEquipment: Record<IndustrySlug, EquipmentSlug[]> = {
  construction: ["excavators", "cranes", "dump-trucks", "manlifts"],
  infrastructure: ["excavators", "bulldozers", "dump-trucks", "rollers"],
  solar: ["excavators", "forklifts", "cranes", "scissor-lifts"],
  industrial: ["forklifts", "clarks", "cranes", "scissor-lifts"],
  earthworks: ["excavators", "bulldozers", "dump-trucks"],
  "material-handling": ["forklifts", "clarks", "cranes"],
  roadwork: ["bulldozers", "rollers", "dump-trucks"],
  "elevated-access": ["manlifts", "scissor-lifts"],
};

export const rentalDurations = ["days", "weeks", "months", "year"] as const;
export type RentalDuration = (typeof rentalDurations)[number];
