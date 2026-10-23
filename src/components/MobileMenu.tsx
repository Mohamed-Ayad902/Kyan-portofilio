"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

type Labels = {
  menu: string;
  close: string;
  nav: string;
  language: string;
  quote: string;
  quoteHref: string;
  theme: { toggle: string; light: string; dark: string };
};

export function MobileMenu({ links, locale, labels }: { links: { href: string; label: string }[]; locale: Locale; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close when the route changes.
  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);

  return (
    <>
      <button type="button" className="menu-button" aria-haspopup="dialog" aria-expanded={open} onClick={() => dialog.current?.showModal()}>
        {labels.menu}
      </button>
      <dialog
        ref={dialog}
        className="menu-dialog"
        aria-label={labels.nav}
        onClose={() => setOpen(false)}
        onToggle={(e) => setOpen((e.target as HTMLDialogElement).open)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
      >
        <div className="menu-dialog__inner">
          <div className="menu-dialog__top">
            <LanguageSwitcher locale={locale} label={labels.language} variant="full" />
            <button type="button" className="menu-button" onClick={() => dialog.current?.close()}>
              {labels.close}
            </button>
          </div>
          <nav aria-label={labels.nav}>
            <ul className="menu-dialog__links">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} onClick={() => dialog.current?.close()}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-dialog__foot">
            <Link className="btn btn--accent" href={labels.quoteHref} onClick={() => dialog.current?.close()}>
              {labels.quote}
            </Link>
            <ThemeToggle labels={labels.theme} />
          </div>
        </div>
      </dialog>
    </>
  );
}
