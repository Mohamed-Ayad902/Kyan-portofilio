"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

export type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

const isCurrent = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/**
 * Header links in wide capitals. An item with children opens a panel on hover, on keyboard focus,
 * or from its chevron button (for touch and screen readers); Escape and route changes close it.
 */
export function NavLinks({ links, submenuLabel, className = "nav-links" }: { links: NavItem[]; submenuLabel: string; className?: string }) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {links.map((link) =>
        link.children ? (
          <NavGroup key={link.href} item={link} pathname={pathname} buttonLabel={submenuLabel.replace("{label}", link.label)} />
        ) : (
          <li key={link.href}>
            <Link className="nav-link" href={link.href} aria-current={isCurrent(pathname, link.href) ? "page" : undefined}>
              {link.label}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
}

function NavGroup({ item, pathname, buttonLabel }: { item: NavItem; pathname: string; buttonLabel: string }) {
  // Remembering the route the panel was opened on closes it when the route changes.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof value === "function" ? value(open) : value) ? pathname : null);
  const root = useRef<HTMLLIElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        root.current?.querySelector("button")?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const current = isCurrent(pathname, item.href) || item.children!.some((c) => isCurrent(pathname, c.href));

  return (
    <li className="nav-group" ref={root} data-open={open || undefined} onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}>
      <Link className="nav-link" href={item.href} aria-current={pathname === item.href ? "page" : current ? "true" : undefined}>
        {item.label}
      </Link>
      <button type="button" className="nav-group__toggle" aria-expanded={open} aria-controls={panelId} aria-label={buttonLabel} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </button>
      <div className="nav-group__panel" id={panelId}>
        <ul>
          {item.children!.map((c) => (
            <li key={c.href}>
              <Link href={c.href} aria-current={pathname === c.href ? "page" : undefined}>
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
