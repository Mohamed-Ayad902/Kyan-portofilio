import Link from "next/link";

import { equipmentSlugs } from "@/content/catalog";
import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { HeaderState } from "./HeaderState";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks, type NavItem } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function primaryLinks(locale: Locale, dict: Dictionary) {
  return [
    { href: href(locale, "/equipment"), label: dict.nav.equipment },
    { href: href(locale, "/industries"), label: dict.nav.industries },
    { href: href(locale, "/projects"), label: dict.nav.projects },
    { href: href(locale, "/about"), label: dict.nav.about },
    { href: href(locale, "/rental-process"), label: dict.nav.process },
  ];
}

/**
 * Announcement strip, then links split either side of a centred mark. The header floats over a
 * photographic masthead and turns solid once the page scrolls (see HeaderState).
 */
export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const start: NavItem[] = [
    {
      href: href(locale, "/equipment"),
      label: dict.nav.equipment,
      children: [
        ...equipmentSlugs.map((slug) => ({ href: href(locale, `/equipment/${slug}`), label: dict.equipment.items[slug].name })),
        { href: href(locale, "/equipment"), label: dict.common.allEquipment },
      ],
    },
    { href: href(locale, "/industries"), label: dict.nav.industries },
    { href: href(locale, "/projects"), label: dict.nav.projects },
  ];
  const end: NavItem[] = [
    {
      href: href(locale, "/about"),
      label: dict.nav.about,
      children: [
        { href: href(locale, "/about"), label: dict.nav.about },
        { href: href(locale, "/rental-process"), label: dict.nav.process },
        { href: href(locale, "/faq"), label: dict.nav.faq },
      ],
    },
    { href: href(locale, "/contact"), label: dict.nav.contact },
  ];
  const allLinks = [...primaryLinks(locale, dict), { href: href(locale, "/faq"), label: dict.nav.faq }, { href: href(locale, "/contact"), label: dict.nav.contact }];
  const themeLabels = { toggle: dict.common.themeToggle, light: dict.common.themeLight, dark: dict.common.themeDark };

  return (
    <header className="site-header">
      <HeaderState />
      <Link className="announce" href={href(locale, "/contact")}>
        <span>{dict.common.announcement}</span>
        <svg className="arrow" viewBox="0 0 16 12" width="14" height="11" aria-hidden="true">
          <path d="M0 6h14M9 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </Link>
      <nav className="site-header__bar" aria-label={dict.common.primaryNav}>
        <NavLinks links={start} submenuLabel={dict.common.submenu} className="nav-links nav-links--start" />
        <Link className="brand-block" href={href(locale)} aria-label={`${dict.meta.siteName}, ${dict.common.home}`}>
          <Logo ground="page" alt="" />
        </Link>
        <div className="site-header__end">
          <NavLinks links={end} submenuLabel={dict.common.submenu} />
          <div className="header-tools">
            <LanguageSwitcher locale={locale} label={dict.common.language} />
            <ThemeToggle labels={themeLabels} />
          </div>
          <MobileMenu
            links={allLinks}
            locale={locale}
            labels={{ menu: dict.common.menu, close: dict.common.close, nav: dict.common.primaryNav, language: dict.common.language, quote: dict.common.requestQuote, quoteHref: href(locale, "/contact"), theme: themeLabels }}
          />
        </div>
      </nav>
    </header>
  );
}
