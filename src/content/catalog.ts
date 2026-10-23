import type { StaticImageData } from "next/image";

import accessPlatforms from "@/assets/images/access-platforms-site.jpg";
import boomLifts from "@/assets/images/crop-boom-lifts.jpg";
import excavator from "@/assets/images/crop-excavator.jpg";
import forklift from "@/assets/images/crop-forklift.jpg";
import mobileCrane from "@/assets/images/crop-mobile-crane.jpg";
import scissorLifts from "@/assets/images/crop-scissor-lifts.jpg";
import excavatorFleet from "@/assets/images/excavator-fleet-row.jpg";
import projectAlamein from "@/assets/images/project-alamein-downtown.jpg";
import projectCbd from "@/assets/images/project-cbd.jpg";
import projectElite from "@/assets/images/project-elite-solar.jpg";
import projectSailun from "@/assets/images/project-sailun-egypt.jpg";
import projectSunrev from "@/assets/images/project-sunrev-solar.jpg";
import siteMixed from "@/assets/images/site-loader-crane-forklift.jpg";

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

/** Where the drawing/photo of a category comes from. `photo: null` means a drawn elevation stands in. */
export const equipment: Record<
  EquipmentSlug,
  { family: EquipmentFamily; photo: StaticImageData | null; scene: StaticImageData | null }
> = {
  excavators: { family: "earthmoving", photo: excavator, scene: excavatorFleet },
  bulldozers: { family: "earthmoving", photo: null, scene: null },
  "dump-trucks": { family: "earthmoving", photo: null, scene: null },
  rollers: { family: "earthmoving", photo: null, scene: null },
  cranes: { family: "lifting", photo: mobileCrane, scene: siteMixed },
  forklifts: { family: "lifting", photo: forklift, scene: null },
  clarks: { family: "lifting", photo: null, scene: null },
  manlifts: { family: "access", photo: boomLifts, scene: accessPlatforms },
  "scissor-lifts": { family: "access", photo: scissorLifts, scene: accessPlatforms },
};

export const familyMembers = (family: EquipmentFamily): EquipmentSlug[] =>
  equipmentSlugs.filter((slug) => equipment[slug].family === family);

export const familyImage: Record<EquipmentFamily, StaticImageData> = {
  earthmoving: excavator,
  lifting: mobileCrane,
  access: scissorLifts,
};

/** Flat field colour for each showcase chapter: the darkest large tone of its picture. */
export const familyField: Record<EquipmentFamily, string> = {
  earthmoving: "#2a2622",
  lifting: "#1d2733",
  access: "#24282b",
};

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
