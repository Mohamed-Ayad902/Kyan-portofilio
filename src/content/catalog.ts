import type { StaticImageData } from "next/image";

import accessPlatforms from "@/assets/images/access-platforms-site.jpg";
import excavatorFleet from "@/assets/images/excavator-fleet-row.jpg";
import projectAlamein from "@/assets/images/project-alamein-downtown.jpg";
import projectCbd from "@/assets/images/project-cbd.jpg";
import projectElite from "@/assets/images/project-elite-solar.jpg";
import projectSailun from "@/assets/images/project-sailun-egypt.jpg";
import projectSunrev from "@/assets/images/project-sunrev-solar.jpg";
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

/**
 * Projects named in Kayan's portfolio. Each image is the one the portfolio places beside that
 * project name. Scope, dates, location and equipment supplied are not documented yet — add them
 * to the dictionaries' `projects.items[slug].details` once Kayan confirms them; the pages render
 * those fields only when present.
 */
export const projects: Record<ProjectSlug, { image: StaticImageData; sector: "commercial" | "highrise" | "solar" | "industrial" }> = {
  cbd: { image: projectCbd, sector: "commercial" },
  "alamein-downtown-towers": { image: projectAlamein, sector: "highrise" },
  "sunrev-solar": { image: projectSunrev, sector: "solar" },
  "elite-solar": { image: projectElite, sector: "solar" },
  "sailun-egypt-tyre": { image: projectSailun, sector: "industrial" },
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
