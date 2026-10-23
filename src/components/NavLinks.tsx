"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ links, className = "nav-links" }: { links: { href: string; label: string }[]; className?: string }) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {links.map((link) => {
        const current = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <li key={link.href}>
            <Link href={link.href} aria-current={current ? "page" : undefined}>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
