import Link from "next/link";

import type { Dictionary } from "@/dictionaries/en";
import { href, type Locale } from "@/lib/i18n";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
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

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = primaryLinks(locale, dict);
  const allLinks = [...links, { href: href(locale, "/faq"), label: dict.nav.faq }, { href: href(locale, "/contact"), label: dict.nav.contact }];
  const themeLabels = { toggle: dict.common.themeToggle, light: dict.common.themeLight, dark: dict.common.themeDark };

  return (
    <header className="site-header">
      <Link className="brand-block" href={href(locale)} aria-label={`${dict.meta.siteName}, ${dict.common.home}`}>
        <Logo ground="ink" alt="" />
      </Link>
      <nav className="nav-tab" aria-label={dict.common.primaryNav}>
        <NavLinks links={links} />
      </nav>
      <div className="header-tools">
        <LanguageSwitcher locale={locale} label={dict.common.language} />
        <ThemeToggle labels={themeLabels} />
        <Link className="btn btn--accent header-cta" href={href(locale, "/contact")}>
          {dict.common.quote}
        </Link>
        <MobileMenu
          links={allLinks}
          locale={locale}
          labels={{ menu: dict.common.menu, close: dict.common.close, nav: dict.common.primaryNav, language: dict.common.language, quote: dict.common.requestQuote, quoteHref: href(locale, "/contact"), theme: themeLabels }}
        />
      </div>
    </header>
  );
}
