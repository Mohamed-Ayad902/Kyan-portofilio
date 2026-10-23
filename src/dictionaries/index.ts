import "server-only";

import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./en";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en").then((m) => m.default),
  ar: () => import("./ar").then((m) => m.default),
  zh: () => import("./zh").then((m) => m.default),
};

export const getDictionary = (locale: Locale): Promise<Dictionary> => loaders[locale]();
export type { Dictionary };
