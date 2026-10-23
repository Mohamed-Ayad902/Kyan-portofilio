import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, hasLocale } from "@/lib/i18n";

/**
 * Locale-less URLs (/, /about, /equipment/cranes …) redirect to their English page, the default.
 * A returning visitor who picked another language is sent to that one instead.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (hasLocale(first)) return;

  const saved = request.cookies.get("kayan-locale")?.value;
  const locale = saved && hasLocale(saved) ? saved : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (images, robots.txt, sitemap.xml…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
